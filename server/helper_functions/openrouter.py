import logging
from openai import OpenAI


def openrouter_models_evaluate(image_urls: list):
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key="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",
    )
    messages=list()
    messages.append({
        "role":"user",
        "content":[
            {
                "type":"text",
                "text":"For each question, the marks are given. Evaluate if the answer is correct and if it is, assign the marks. If it is wrong do not assign any marks to it."
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
    # end of foor loop

    response = client.chat.completions.create(
        model="deepseek/deepseek-v3-base:free",
        messages=messages,
        response_format={
            "response_format": {
                "type": "json_schema",
                "json_schema": {
                    "name": "evaluation_result",
                    # "strict": true,
                    "schema": {
                        "type": "object",
                        "properties": {
                            "questions": {
                                "type": "object",
                                "patternProperties": {
                                    "^[0-9]+_[a-zA-Z]+$": {
                                        "type": "object",
                                        "properties": {
                                            "marks": {
                                                "type": "number",
                                                "description": "Marks awarded for the specific question"
                                            },
                                            "comments": {
                                                "type": "string",
                                                "description": "Feedback or reason for the score"
                                            }
                                        },
                                        "required": ["marks", "comments"],
                                        # "additionalProperties": false
                                    }
                                }
                            },
                            "total_score": {
                                "type": "number",
                                "description": "Sum of all marks awarded"
                            },
                            "maximum_score": {
                                "type": "number",
                                "description": "Total possible score"
                            }
                        },
                        "required": ["questions", "total_score", "maximum_score"],
                        # "additionalProperties": false
                    }
                }
            }
        }
    )
    logging.info(msg=f"OpenRouter raw response = {response}")
    return response.choices[0].message.content
