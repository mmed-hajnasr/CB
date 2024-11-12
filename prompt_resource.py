from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from prompt_creation import PromptCreation
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)



class QueryPayload(BaseModel):
    query: str
    previous_response: Optional[str] = None
    

@app.post("/generate-prompt")
async def generate_prompt(query_payload: QueryPayload):
    prompt_creation = PromptCreation()
    return {"response": "This is the reponse of the server"}
    # response = prompt_creation.respond(query_payload.query, query_payload.previous_response)
    # if response:
    #     return {"response": response}
    # else:
    #     raise HTTPException(status_code=400, detail="Failed to generate prompt")