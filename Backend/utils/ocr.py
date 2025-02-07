import cv2
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'  # Update path

def extract_text(image_path):
    img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    text = pytesseract.image_to_string(img, config='--psm 6')  # Use Page Segmentation Mode (PSM)
    return text

text = extract_text(r"C:\Users\SHRI SAI\OneDrive\Desktop\WhatsApp Image 2025-02-07 at 22.36.39_88e38f82.jpg")
print("Extracted Text:", text)