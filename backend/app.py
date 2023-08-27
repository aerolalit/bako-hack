from fastapi import FastAPI, Query
from pydantic import BaseModel
import json
import pandas as pd
import openai  # Uncomment this when you are running this code with internet access
# from torch import ge  # This import was not used in your original code

app = FastAPI()
@app.post("/get_solution/")
async def get_solution(issue: str):
    system_message = "You are a helpful assistant. You are to provide one answer as 'Hast du probiert {Solutions}?' only from the list of {Solutions}. Limit answer to one sentence"
    fine_tuned_model_id = 'ft:gpt-3.5-turbo-0613:robert:issue-solution:7rprAtpO'
    test_messages = []
    test_messages.append({"role": "system", "content": system_message})
    test_messages.append({"role": "user", "content": issue})
    
    # Here's where you'd integrate with the OpenAI API to get the assistant's response.
    # Since I can't make network requests, I'll comment this out.
    # Uncomment and adapt this when you're running this code.
    response = openai.ChatCompletion.create(
        model=fine_tuned_model_id,
        messages=test_messages,
        temperature=0,
        max_tokens=100,
        api_key="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"
    )
    assistant_response = response["choices"][0]["message"]["content"]
    
    # Placeholder for the assistant's response. Replace this with the OpenAI API call.
    
    return {"assistant_response": assistant_response}
