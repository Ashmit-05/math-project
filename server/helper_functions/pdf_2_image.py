from io import BytesIO
from pdf2image import convert_from_bytes
from aws_functions.aws_get_object_url import get_object_url
from aws_functions.aws_uploadfile import upload_file_to_s3_bucket

def get_images_urls(file,filename)->list[str]:
    images = convert_from_bytes(file.getvalue())
    urls = list()
    for i,image in enumerate(images):
        image_io = BytesIO()
        image.save(image_io,format='PNG')
        image_io.seek(0)
        r = upload_file_to_s3_bucket(image_io,f"{filename}/{i}.png")
        if r == True:
            url = get_object_url(f"{filename}/{i}.png")
            urls.append(url)
    return urls
