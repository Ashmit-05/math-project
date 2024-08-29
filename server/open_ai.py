from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "Extract the text in the image. show both the typed and handwriting part and check if the answers are correct or not"},
        {
          "type": "image_url",
          "image_url": {
            "url": "https://math-project-images.s3.eu-north-1.amazonaws.com/dl_info.png",
          },
        },
      ],
    }
  ],
  max_tokens=300,
)

print(response.choices[0])
