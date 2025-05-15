from pydantic import BaseModel
from typing import List, Optional

class MathRule(BaseModel):
    id: str
    topic: str
    subtopic: Optional[str]
    rule: str
    explanation: str
    examples: List[str]
    common_mistakes: List[str]
    keywords: List[str]