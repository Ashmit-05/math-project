from io import BytesIO
import google.generativeai as genai
import os
import PIL.Image
import requests

genai.configure(api_key='AIzaSyAPXLNQMGF1-_uT9XTjbRfPguizib5q020')

def gemini_evaluate(content):
    genai.configure()

    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    response = model.generate_content(f"""
                                      {content}
                                      here are a few questions and their answers. also, the marks associated with each question if the given answer is correct. evaluate the answers, giving full marks for correct answer and 0 for wrong. the output should be in this format : 
                                      (if correct answer): answer <answer number> is correct and gets <marks> marks.
                                      (if wrong answer): <give a brief one line description of what the correct answer should be>
                                      total : <marks obtained>/<total marks>
                                      """)
    return response.text

def gemini_image_evaluate(image_urls):

    model = genai.GenerativeModel("gemini-1.5-flash")
    chat = model.start_chat(
            history=[{
                "role":"user",
                "parts":"""I will be sharing a few images that contain math questions along with the answers. The answers are handwritten. Evaluate the answers and give marks as specified(The marking scheme for each question is available in the image). List out all the correct answers first in this format : 
                Answer no. <answer number> is correct and gets <marks> marks
                Then list out all the wrong answers and give a brief one line description of what the correct answer should be."""
                },{
                    "role":"model",
                    "parts":"Understood. Ready to provide the response in the desired format. Please give the images"
                    }]
            )
    response = list()
    for url in image_urls:
        i = requests.get(url)
        image = PIL.Image.open(BytesIO(i.content))
        r = chat.send_message(["",image])
        response.append(r.text)
        
    r = chat.send_message("Sum up the score and provide the answer in this format : <marks obtained>/<total marks>")
    response.append(r.text)
    return response

