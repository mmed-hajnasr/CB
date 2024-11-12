# import requests

# # Define the LM Studio API endpoint
# url = "http://127.0.0.1:1234/v1/chat/completions"  # Adjust this if LM Studio is running on a different port or endpoint

# # Define the prompt and additional parameters
# payload = {
#     "messages": [
#         { "role": "user", "content": "Why do you hate me?" }
#     ],
#     "temperature": 0.7,       # Controls randomness in response
#     "max_tokens": -1,         # -1 to use the model's default max tokens
#     "stream": False           # Disable streaming
# }

# try:
#     # Send the POST request to the LM Studio API
#     response = requests.post(url, json=payload)

#     # Check if the request was successful
#     if response.status_code == 200:
#         # Extract and print the response text
#         response_data = response.json()
#         print("Response from LM Studio:")
        
#         # Assuming the response contains "text" key for generated output
#         print(response_data["choices"][0]["message"]["content"])

#     else:
#         print(f"Error: Received status code {response.status_code}")
#         print("Response content:", response.content)

# except requests.exceptions.RequestException as e:
#     print("Error connecting to LM Studio API:", e)

from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Define the LM Studio API endpoint
lm_studio_url = "http://127.0.0.1:1234/v1/chat/completions"  # Update if necessary

@app.route("/generate", methods=["POST"])
def generate_text():
    data = request.json
    prompt = data.get("prompt", "")
    lang=data.get("lang", "")
    if(lang=='en'):
        prompt=prompt+"la réponse doit etre en anglais"
    
    # Check if prompt was provided
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    # Prepare the payload for LM Studio
    payload = {
        "messages": [
            { "role": "user", "content": prompt }
        ],
        "temperature": 0.7,
        "max_tokens": -1,
        "stream": False
    }

    try:
        # Send the POST request to the LM Studio API
        response = requests.post(lm_studio_url, json=payload)

        # Check if the request was successful
        if response.status_code == 200:
            response_data = response.json()
            generated_text = response_data["choices"][0]["message"]["content"]

            # Return the generated text as a JSON response
            return jsonify({"response": generated_text})
        else:
            return jsonify({"error": "Error from LM Studio", "status_code": response.status_code}), response.status_code

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Connection error", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
