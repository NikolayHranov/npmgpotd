from datetime import datetime
from pyscript import document

def today():
    now = datetime.now()
    date = now.day
    month = now.month
    year = now.year
    return f"{year}/{month}/{date}"


daypath = today()

categories = ["physics", "astronomy", "math"]
link_elements = []
for category in categories:
    url = f"problems/{daypath}/{category}.pdf"
    link_element = document.getElementById(f"{category}-today")
    link_element.href = url
    link_elements.append(link_element)