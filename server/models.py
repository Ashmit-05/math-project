from typing import List, Dict, Any
from bson import ObjectId
from pydantic import BaseModel
from pydantic.fields import Field

class PDFModel(BaseModel):
    # id: ObjectId = Field(alias="_id",default=None)
    pdf_url: str = Field(...)
    name: str = Field(...)
    evaluations: Dict[str, Any] = Field(...)
    actual_score: int = Field(...)

    class Config:
        arbitrary_types_allowed = True

class PDFCollection(BaseModel):
    results:List[PDFModel]
