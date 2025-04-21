from fastapi import FastAPI, HTTPException, UploadFile, Form
from aws_functions.aws_get_object_url import get_object_url
from aws_functions.aws_uploadfile import upload_file_to_s3_bucket
from dotenv import dotenv_values
from helper_functions.gemini_ai import gemini_evaluate, gemini_image_evaluate
from helper_functions.groq import groq_evaluate
from helper_functions.openrouter import openrouter_models_evaluate
from pymongo import MongoClient
from io import BytesIO
import logging
import requests
import json

from helper_functions.calculate_score import calculate_score
from helper_functions.open_ai import openai_evaluate
from helper_functions.pdf_2_image import get_images_urls
from models import PDFModel
# from helper_functions.qwen_model import evaluate_images_with_qwen


# setting up logger
logging.basicConfig(
    level=logging.INFO,  # Log INFO and above
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# Example log to verify
logging.info("Logging is configured successfully!")

config = dotenv_values(".env")
app = FastAPI()

@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(config["ATLAS_URI"])
    app.database = app.mongodb_client[config["DB_NAME"]]
    print("Connected to the MongoDB database!")


@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()


@app.get("/")
def read_root():
    return {"Hello": "World1322"}


# test with these models :
# 1. gpt-4-turbo
# 2. claude-3-opus
# 3. mistral-large
# 4. gemini-pro


@app.post(
        path="/upload",
        response_model=PDFModel,
        )
async def upload_pdf(file: UploadFile, name: str = Form(...)):
    logging.info(msg=f"File headers : {file.headers}")
    if file.headers["content-type"] != "application/pdf":
        print(file.headers["content-type"])
        raise HTTPException(status_code=415,detail="Expecting a PDF input")
    try:
        logging.info(msg="Starting upload_pdf function")
        file_upload_response = upload_file_to_s3_bucket(file)
        if file_upload_response == False:
            logging.error("Unable to upload file")
            raise HTTPException(status_code=500,detail="Failed to upload file. Please try again")
        logging.info(msg=f"S3 upload response : {file_upload_response}")
        filename = file.filename or ""
        file_url = get_object_url(filename)
        logging.info(msg=f"File url : {file_url}")
        if file_url == "":
            raise HTTPException(status_code=500,detail="Try uploading the file again")

        # download pdf from s3 url
        pdf = requests.get(file_url)
        pdf.raise_for_status()
        logging.info(msg="Downloaded pdf from S3 bucket")
        
        # convert pdf to images
        pdf_bytes = BytesIO(pdf.content)
        image_urls = get_images_urls(pdf_bytes,filename)
        logging.info(msg=f"Image urls : {image_urls}")
        
        # get evaluation from OpenAI
        content = openai_evaluate(image_urls)
        logging.info(msg=f"Model response = {content}")
        
        # calculate actual score
        actual_score = calculate_score(content)
        logging.info(msg=f"Actual score = {actual_score}")
        
        # parse the content to JSON
        evaluations = json.loads(content)
        
        # create PDFModel instance
        pdf_model = PDFModel(
            pdf_url=file_url,
            name=name,
            evaluations=evaluations,
            actual_score=actual_score
        )
        
        # store in MongoDB
        result = app.database.pdfs.insert_one(pdf_model.dict())
        logging.info(f"Stored PDF evaluation in MongoDB with id: {result.inserted_id}")
        
        return pdf_model
    except Exception as e:
        logging.error(f"Unexpected error occurred in main.py upload_pdf function: {e}")
        raise HTTPException(status_code=500,detail="Encountered an unexpected error")
