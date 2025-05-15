from openai import OpenAI

from models import PDFModel

def openai_evaluate(image_urls: list):
    client=OpenAI(api_key='')
    messages=list()
    messages.append({
        "role": "system",
        "content": "You are an expert evaluator of mathematical answers. For each question, evaluate if the answer is correct and assign marks accordingly. Provide detailed explanations for any mistakes, including what the correct approach should have been. Return your evaluation in the following JSON format: {'evaluations': [{'answer_number': 1, 'is_correct': true, 'marks': 5, 'reason': ''}, {'answer_number': 2, 'is_correct': false, 'marks': 0, 'reason': 'The student made an error in the integration by forgetting to add the constant of integration. The correct solution should include +C at the end.'}], 'total_marks': 5, 'maximum_marks': 10}"
    })
    messages.append({
        "role":"user",
        "content":[
            {
                "type":"text",
                "text":"For each question, evaluate if the answer is correct and assign marks accordingly. Return your evaluation in JSON format as specified. Calculate and include the total marks obtained and maximum possible marks."
            }
        ]
    })
    for image in image_urls:
        messages.append({
            "role":"user",
            "content":[
                {
                    "type":"image_url",
                    "image_url": {
                        "url" : image,
                    },
                },
            ],
        })

    response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            response_format={ "type": "json_object" }
    )
    return response.choices[0].message.content
