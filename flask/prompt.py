import openai
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import json
import re
from io import StringIO
import sys
import traceback
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

df=pd.read_csv(r"D:\PROGRAMS\hackovate\flask\final_complaints.csv")

def super_agent(user_request,city,state,user_name,user_address):

    complain_bodies=['Building violations','Electricity issues','Garbage collection','Illegal encroachments','Noise pollution','Road pothole complaints','Traffic management','Water supply issues']    
    prompt = f"""
    Classify the following complaint into one of these categories: {', '.join(complain_bodies)}.
    Complaint: "{user_request}"
    based on the user select which body should be contacted and give only the body name given the {city} and {state}.
    Generate a body and subject to draft a letter based on the users request.
    Return all the output only in JSON format and no explanations or extra text to be generated.
    JSON format: {{"body_name":"value","letter_subject":val,"letter_body":"value"}}
    The body_name should stricly contain only the classification choosen from the complain_bodies and should not contain anything else as it is used in SQL later on.
    Do not provide space for [your name] or [address] just give body without any salutation.
    Give a detailed exagurated letter body which is of medium size.
    Strictly return only the JSON data as output.
    """
    print("Getting in")
    openai.api_key = os.getenv("COGCACHE_API_KEY")
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini-2024-07-18",
        messages=[
            {"role": "system", "content": "You are an AI that categorizes complaints."},
            {"role": "user", "content": prompt}
        ]
    )
    print("Getting out")
    
    result_text = response['choices'][0]['message']['content'].strip()
    print(result_text)
    clean_result = result_text.replace("```json", "").replace("```", "").strip()
    task_assignment = json.loads(clean_result)
    branch= task_assignment.get("body_name","")
    print(branch)
    letter_s=task_assignment.get("letter_subject","")
    letter_b=task_assignment.get("letter_body","")

    dept=find_department(state=state,city=city,issue=branch)
    date=datetime.now().strftime("%d/%m/%Y")
    letter_template = f"""
    Date : {date}
    From:
    {user_name}
    {user_address}
    
    To:
    {dept}
    {city}
    {state}

    
    Subject: {letter_s}
    
    Dear Sir/Madam,
    
    {letter_b}
    
    Sincerely,
    {user_name}
    """
    letter_date=f"""
    Date : {date}

    """
    letter_from=f"""
    From:
    {user_name}
    {user_address}
    """
    letter_to=f"""
    To:
    {dept}
    {city}
    {state}
    """
    letter_sub=f"""
    Subject: {letter_s}
    """

    letter_body=f"""
    Dear Sir/Madam,
    
    {letter_b}
    
    Sincerely,
    {user_name}
    """
    print(letter_template)
    return {
        "date": letter_date,
        "from": letter_from,
        "to": letter_to,
        "subject": letter_sub,
        "body": letter_body,
        "full_letter": letter_template
    }



def find_department(state, city, issue):
    row = df[(df['state'] == state) & (df['City'] == city)]
    
    if not row.empty and issue in df.columns:
        return row[issue].values[0]
    else:
        raise ValueError("Department not found")
