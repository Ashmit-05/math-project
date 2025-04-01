import boto3
import json

client = boto3.client('s3')
response = client.get_object(
        Bucket='math-project-images',
        Key='year9-handwriting.pdf'
        )
print(json.dumps(response,indent=4,default=str))
