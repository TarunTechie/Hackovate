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
from dotenv import load_dotenv

load_dotenv()

def super_agent(user_request):

    complain_bodies=['Building violations','Electricity issues','Garbage collection','Illegal encroachments','Noise pollution','Road pothole complaints','Traffic management','Water supply issues']    
    prompt = f"""
    This is the user query:
    {user_request}
    Can you select the body to contact from the below
    {complain_bodies}
    based on the user selct which body should be contacted and give only the body name without any explanation or anything just the JSON should be returned
    Return only the body name which should be contacted as JSON "body_name": followed by name you selected.
    """
    
    openai.api_key = os.getenv("COGCACHE_API_KEY")
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini-2024-07-18",
        messages=[
            {"role": "system", "content": "You are a agent to generate complain letter and analyse which body to contact."},
            {"role": "user", "content": prompt}
        ]
    )
    
    result_text = response['choices'][0]['message']['content'].strip()
    clean_result = result_text.replace("```json", "").replace("```", "").strip()
    task_assignment = json.loads(clean_result)
    # id_code = task_assignment.get("id_code", "")
    # user_request=task_assignment.get("user_request","")
    # if id_code == "10101_DASHBOARD_GENERATION_0101":
    #     code=suggest_dashboard_plots(df, mode=mode, user_request=user_request)
    # elif id_code == "10101_PLOTTING_ANALYSIS_0101":
    #     code=analysis_plots(df, mode=mode, user_request=user_request)
        
    # status,data=excecuter_plotting_code(code,df,max_retries=3)
    print(task_assignment)
    return task_assignment