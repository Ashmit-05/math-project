import logging
import boto3
from botocore.exceptions import ClientError

def upload_file_to_s3_bucket_test(pdf, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    bucket = 'math-project-images'
    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = pdf.filename

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        print(type(pdf))
        s3_client.upload_fileobj(pdf,bucket,object_name)
    except ClientError as e:
        print("here")
        logging.error(e)
        return False
    return True

