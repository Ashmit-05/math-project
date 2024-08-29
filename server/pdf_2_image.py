from pdf2image import convert_from_path

def convert(filepath):
    images = convert_from_path(filepath)

    for i in range(len(images)):
        images[i].save(f'page{i}.png','PNG')

filepath = input("filepath:")
convert(filepath)
