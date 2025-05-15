from openai import OpenAI
from RAG.rag_evaluator import RAGEvaluator
from models import PDFModel
import os

def openai_evaluate(image_urls: list, topic: str = None):
    openai_api_key = os.getenv("OPENAI_API_KEY")
    client = OpenAI(api_key=openai_api_key)
    rag = RAGEvaluator()
    messages = list()
    
    # Get RAG context for evaluation
    evaluation_context = rag.get_evaluation_context("", topic)
    
    # System message with RAG context
    messages.append({
        "role": "system",
        "content": f"""You are an expert evaluator of mathematical answers. 
        
        Evaluation Rules and Context:
        {evaluation_context}
        
        For each question, evaluate if the answer is correct and assign marks accordingly. 
        Provide detailed explanations that reference the specific rules being applied.
        
        Return your evaluation in the following JSON format:
        {{
            'evaluations': [
                {{
                    'answer_number': number,
                    'is_correct': boolean,
                    'marks': number,
                    'reason': 'detailed explanation referencing specific rules'
                }}
            ],
            'total_marks': number,
            'maximum_marks': number
        }}"""
    })

    # User instruction
    messages.append({
        "role": "user",
        "content": [{
            "type": "text",
            "text": "Evaluate each answer using the provided rules and criteria. Return evaluation in JSON format with detailed explanations."
        }]
    })

    # Add images
    for image in image_urls:
        messages.append({
            "role": "user",
            "content": [{
                "type": "image_url",
                "image_url": {
                    "url": image,
                },
            }],
        })

    response = client.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=messages,
        response_format={"type": "json_object"}
    )

    return response.choices[0].message.content
