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

## File Structure

### Database server structure

```graphql

├── raw_data/
│   ├── *.pdf             # Original PDF files containing the full set of training data.
│   └── *.csv             # Raw CSV files with structured training data.
│
├── new_data/
│   ├── *.pdf             # Selective PDF files with higher-quality content for training.
│   └── *.csv             # Selective CSV files with refined data for improved training results.
│
├── database_creation.py  # Script for preprocessing data and generating the database using ChromaDB.
├── flake.nix             # Nix configuration file for creating a reproducible development environment.
├── prompt_creation.py    # Script for generating prompts by querying the database.
├── prompt_resource.py    # Flask-based server for providing prompt generation as a REST API.
├── segmentation.py       # Script for cleaning and segmenting documents to enhance text extraction.
└── text_extraction.py    # Functions for OCR and extracting text from images and PDFs.
```

#### Detailed Descriptions

- `raw_data/` : This directory contains the complete set of original data files used for initial training. The contents include PDFs and CSVs that might contain noise or irrelevant sections that require further filtering.
- `new_data/` : Contains a curated subset of the data from raw_data/, focusing on high-quality content to achieve better results in training. Files here are more selective and have undergone some manual refinement.
- `database_creation.py` : Preprocesses the raw data and creates an embedded database using ChromaDB. This includes cleaning, tokenizing, and storing text chunks for efficient retrieval.
- `flake.nix` : Ensures the development environment is fully reproducible for Nix users. It specifies dependencies, libraries, and environment configurations, enabling consistent setups across different systems.
- `prompt_creation.py` : Generates prompts by querying the ChromaDB database. This script is essential for transforming raw data into context-rich prompts used by the language model.
- `prompt_resource.py` : A Flask-based web server that provides an API endpoint for prompt generation. It leverages prompt_creation.py to serve prompts dynamically, making it accessible for other applications.
- `segmentation.py` : Cleans and segments documents to facilitate better text extraction. This includes removing headers, footers, and other non-content elements to improve the quality of text for downstream processing.
- `text_extraction.py` : Contains OCR and text extraction functions. This module handles extracting text from scanned PDFs, images, and other non-text sources, converting them into a machine-readable format.

### Client structure

#### Detailed Descriptions

- `smart-contract` : using blockchain technolgy to store the chat history for a more secure storage coupled with the firebase database.
- `chatbot-ui` : an amazing rensponsive chatbot UI in ReactJS custom-made to meet the requirements of the project like:
  - Text-to-speech and speech-to-text capabilities for users with visual impairments.
  - Multilingual support for both French and English.
  - buttons for fast response in case of a question by the model.

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
