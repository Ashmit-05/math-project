from openai import OpenAI

from models import PDFModel

def openai_evaluate(image_urls: list):
    client=OpenAI(api_key='')
    messages=list()
    messages.append({
        "role":"user",
        "content":[
            {
                "type":"text",
                "text":"For each question, the marks are given. Evaluate if the answer is correct and if it is, assign the marks. If it is wrong do not assign any marks to it. The output should be in this format : 'Answer <answer no.> is correct : <marks>' for correct answer and 'Answer <answer no.> is wrong : <marks>' for wrong answer"
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
            messages=messages
            )
    return response.choices[0].message
