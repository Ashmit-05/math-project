from typing import List
from bson import ObjectId
from pydantic import BaseModel
from pydantic.fields import Field

class PDFModel(BaseModel):
    # id: ObjectId = Field(alias="_id",default=None)
    pdf_url: str = Field(...)
    pdf_title: str = Field(...)
    total_score: int = Field(...)
    correct_answers: str = Field(...)
    incorrect_answers: str = Field(...)
    
    #tbd
    # student_name: str = Field(...)
    # student_id: str = Field(...)    # might have to replace this with objectid if making a student class

class PDFCollection(BaseModel):
    results:List[PDFModel]
