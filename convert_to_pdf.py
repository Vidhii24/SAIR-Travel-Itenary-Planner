import os
import sys
import win32com.client
import pythoncom

def convert(docx_path, pdf_path):
    print(f"Converting '{docx_path}' to '{pdf_path}'...")
    pythoncom.CoInitialize()
    word = win32com.client.DispatchEx("Word.Application")
    word.Visible = False
    word.DisplayAlerts = 0
    try:
        doc = word.Documents.Open(os.path.abspath(docx_path), ReadOnly=1)
        # 17 is wdFormatPDF
        doc.SaveAs(os.path.abspath(pdf_path), FileFormat=17)
        doc.Close(SaveChanges=0)
        print("Conversion successful!")
    finally:
        word.Quit()
        pythoncom.CoUninitialize()

if __name__ == "__main__":
    docx = "Vidhi_Joshi_AI_TravelMate_University_Report.docx"
    pdf = "Vidhi_Joshi_AI_TravelMate_University_Report.pdf"
    convert(docx, pdf)
