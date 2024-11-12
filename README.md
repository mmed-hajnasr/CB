# ISI Chatbot

## Table of Contents

1. Project Management
1. System Flow
1. Features
1. Technology Stack

## Project Management

- We are utilizing GitHub for version control, with the project divided into three primary branches to facilitate development and maintain clear workflows:
  Branches:

      - ML (Machine Learning):
          Focuses on creating the server that hosts the LLM (Large Language Model).
          We researched and selected a model optimized for minimal resource consumption while maintaining a response time of less than 5 seconds.

      - Client:
          Handles the client-side server, including UI development and user authentication.
          Implements accessibility features such as text-to-speech (TTS) and speech-to-text (STT) functionalities for users with visual impairments.

      - Database Server:
          Manages a ChromaDB database containing processed documents.
          Allows efficient searching and retrieval of relevant text using an optimized search engine.

## System Flow

The interaction flow of the chatbot is as follows:

1. The user inputs a query through the client interface.
1. The query is sent to the Database Server, which retrieves the most relevant documents based on the content stored in ChromaDB.
1. The retrieved documents are forwarded to the LLM Server.
1. The LLM server uses only the information provided by the database to generate a context-aware response.
1. The response is returned to the client and displayed to the user.

## Features

- Accessibility:

  - The chatbot is accessible from any device with a web browser and internet connection.
  - Includes text-to-speech and speech-to-text capabilities for users with visual impairments.

- Speed:

  - Capable of answering queries within 5 seconds or less.

- Blockchain Integration:

  - A blockchain system is planned to securely store user data (currently under development).

- Multilingual Support

  - The chatbot can seamlessly handle queries in both French and English.

## Technology Stack

Below is a breakdown of the technologies used in the project:

| Technology   | Description                                                        |
| ------------ | ------------------------------------------------------------------ |
| Python       | Main programming language used for the entire project.             |
| Flask        | Web framework used to implement the backend servers.               |
| React        | JavaScript library used for building a responsive client-side UI.  |
| Chroma       | Vector database for storing and retrieving processed documents.    |
| Firebase     | NoSQL database used for user authentication and data storage.      |
| Docker       | Containerization platform for deploying and managing servers.      |
| Tesseract    | OCR Optical Character Recognition for extracting text from images. |
| Hugging Face | Platform for NLP models and document processing.                   |

## Future Enhancements

    - Complete the integration of blockchain for secure user data storage.
    - Optimize the LLM server to reduce response times further.
    - Add more administrative automatisations using the chatbot.
