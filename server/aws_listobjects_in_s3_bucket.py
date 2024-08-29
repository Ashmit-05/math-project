import boto3
import json

client = boto3.client('s3')
response = client.list_objects_v2(Bucket='math-project-images')
location_response = client.get_bucket_location(
    Bucket='math-project-images',
)
location = location_response["LocationConstraint"]
urls = list()
for item in response["Contents"]:
    key = item["Key"]
    url = f"https://math-project-images.s3.{location}.amazonaws.com/{key}"
    urls.append(url)
# print(json.dumps(response["Contents"], indent=4, default=str))
print(urls)

# upload the pdf to s3 bucket
# use pdf2image
# upload images in the s3 bucket
# get image url and query them to openai api
# store the results
