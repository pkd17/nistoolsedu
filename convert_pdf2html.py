from pdfminer.high_level import extract_text
from pdfminer.layout import LAParams
from bs4 import BeautifulSoup
import os

def convert_pdf_to_html(pdf_path, html_path):
    # Extract text from PDF
    laparams = LAParams()
    text = extract_text(pdf_path, laparams=laparams)
    
    # Create a BeautifulSoup object
    soup = BeautifulSoup('<html><body></body></html>', 'html.parser')
    body = soup.body
    
    # Add extracted text to the body of the HTML
    for line in text.split('\n'):
        p = soup.new_tag('p')
        p.string = line
        body.append(p)
    
    # Write the HTML content to a file
    with open(html_path, 'w', encoding='utf-8') as file:
        file.write(str(soup.prettify()))

# Specify the paths
pdf_path = 'input.pdf'
html_path = 'output.html'

# Convert PDF to HTML
convert_pdf_to_html(pdf_path, html_path)

print(f'Conversion completed! HTML file saved at {os.path.abspath(html_path)}')

