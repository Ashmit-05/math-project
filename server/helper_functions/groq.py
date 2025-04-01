from groq import Groq
import requests
from PIL import Image
from io import BytesIO
import pytesseract

client = Groq(
    api_key='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'
)


def groq_evaluate(image_urls):
    messages = [
        {
            "role": "system",
            "content": "You are a helpful assistant."
        },
        {
            "role": "user",
            "content": "Evaluate these questions and provide the sum:\n\n"
        }
    ]

    extracted_texts = []
    
    # Extract text from images
    for url in image_urls:
        try:
            i = requests.get(url)
            image = Image.open(BytesIO(i.content))
            extracted_text = pytesseract.image_to_string(image)
            extracted_texts.append(extracted_text.strip())
        except Exception as e:
            extracted_texts.append(f"Error processing image: {str(e)}")

    # Add extracted text to the user message
    messages[1]["content"] += "\n\n".join(extracted_texts)

    # Send the request to the Groq model
    chat_completion = client.chat.completions.create(
        messages=messages,
        model="llama-3.3-70b-versatile",
    )

    return chat_completion.choices[0].message.content

