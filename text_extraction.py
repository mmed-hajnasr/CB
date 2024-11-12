import segmentation as seg
from pdf2image import convert_from_path
from PIL import Image
import pandas as pd
import numpy as np
import pytesseract as ts

def get_image(file):
    if file.endswith(".pdf"):
        full_image = convert_from_path(file)
        image = full_image[0]
    else:
        image = Image.open(file)
    image = np.array(image)
    return image

def is_scanned(image):
    number_of_colors = len(np.unique(image.reshape(-1, image.shape[2]), axis=0))
    return number_of_colors < 1000


def get_final_image(file):
    image = get_image(file)
    if not is_scanned(image):
        image = seg.scan(image)
    return image

def file_to_text(file):
    image = get_final_image(file)
    return ts.image_to_string(image)
    