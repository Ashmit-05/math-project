from langchain_community.document_loaders import PyPDFLoader

file_path = "/Users/ashmit/Downloads/year9-handwriting.pdf"
loader = PyPDFLoader(file_path)

docs = loader.load()

print(len(docs))
print(f"{docs[0].page_content[:]}\n")
print(docs[0].metadata)
