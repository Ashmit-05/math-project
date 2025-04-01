import boto3

def get_object_url(key: str)->str:
    client = boto3.client('s3')
    location_response = client.get_bucket_location(Bucket='math-project-images')
    location = location_response["LocationConstraint"]
    if not location:
        return ""
    url = f"https://math-project-images.s3.{location}.amazonaws.com/{key}"
    return url

