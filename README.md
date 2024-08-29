## How the project works
OpenAI api does not allow you to directly work with PDFs. As a workaround, we extract images from the pdf and send the image file as a message to the OpenAI API call.
    1. Upload the PDF to S3 bucket
    2. Use pdf2image to extract images
    3. Upload the images to S3 bucket
    4. Get the image URLs and query them to OpenAI API call
    5. Store the results in a database

## Why use AWS?
OpenAI API does not accept image file input directly. It takes in an image URL. Therefore, we use an AWS S3 bucket to store images temporarily on the cloud and get the URL from S3, and query this URL to the OpenAI API call.

## Setting up AWS
There are a few things you need to take care of when setting up your S3 bucket.
- To be able to access objects inside the bucket, you need them to be public by default
- This can be achieved by selecting your bucket, going to permissions and adding this to the bucket policy
```
{
    "Version": "2012-10-17",
        "Id": "Policy1724880538356",
        "Statement": [
        {
            "Sid": "Stmt1724880533926",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::math-project-images/*"
        }
        ]
}
```
- Note that you require only a single bucket, and that bucket name is hardcoded in the project(math-project-images). If you wish to use another name, make the changes


## To be decided
- Lifecycle for images and pdfs(ideally, remove the images soon, but keep the pdf for longer)
- How to store the results in db(result and pdf link)
