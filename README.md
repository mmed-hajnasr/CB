# ISI Chatbot

## Table of Contents

1. Project Management
1. System Flow
1. Features
1. Technology Stack

## Project Management

- We are using GitHub for version control, with the project divided into three primary branches to facilitate development and maintain clear workflows:
  The project is composed of 3 main componenents :

  - LLM (which can be found in the LLAMA git branch):

    Selecting a Local LLAMA Model :
    In our project, the main priority was ensuring data privacy and security to comply with GDPR regulations. Hosting a large language model (LLM) locally allows us to avoid transmitting sensitive data over the internet, which reduces the risk of data leakage. This approach is particularly important in our use case, where we handle user-generated queries that might include sensitive information. Choosing a local model empowers us with full control over data management while ensuring privacy and compliance with regulatory standards.
    Model Testing and Optimization
    Testing LLAMA Model Variants :
    We explored different versions of the LLAMA model, specifically the 13B and 7B models, to balance computational efficiency and model performance. The 7B model provided a good trade-off between response accuracy and resource requirements, making it the optimal choice for our use case, given hardware constraints.

    Using Quantization for Efficiency :
    To make the model more resource-efficient, we experimented with various quantization techniques, including Q2_k, Q3_k_l, and Q4. Quantization helps reduce the model’s size and memory footprint, allowing us to run it more smoothly on local hardware without significantly sacrificing performance. Ultimately, we selected the LLAMA-2 7B model with Q2_k quantization as it provided the most efficient balance of accuracy and resource usage.

    Hosting Strategy and Challenges :
    Our first attempt to host the model was on Google Colab, but we faced limitations due to the large size of the model and Colab's resource constraints. While Colab is suitable for smaller models, the demand for continuous, reliable access to a larger model like LLAMA proved to be too intensive, highlighting the need for a more robust solution.

    Transition to a Local Machine Using LM Studio :
    To overcome these limitations, we transitioned to hosting the model on a local machine, utilizing LM Studio to manage the model server. LM Studio offered a stable environment for deploying large models and allowed us to run LLAMA smoothly on local hardware. This setup provided the necessary computational power and control, ensuring that our system could handle queries in real-time while keeping data securely on-premises.

    Application and interactions with other components
    Using a Flask App to Interface with the RAG pipeline
    For managing user interactions, we implemented a Flask application that serves as the interface for handling incoming queries. The Flask app receives user inputs, forwards them to the LLAMA model hosted in LM Studio, and then processes the model’s responses to send back clear and relevant answers. This setup allows seamless communication between the RAG and the model while maintaining efficiency and simplicity

  - RAG Pipline (which can be found in the master git branch):

    This documentation describes the RAG (Retrieval-Augmented Generation) pipeline that powers the university chatbot, which leverages a local LLaMA-based Language Model (LLM) for answering user questions based on the extracted university data.

    ## Overview of the RAG Pipeline

    The Retrieval-Augmented Generation (RAG) pipeline enhances the chatbot's ability to answer specific, domain-related questions by combining traditional retrieval methods with generative responses. This pipeline involves the following main steps:

    1. **Data Extraction**
    2. **Data Chunking**
    3. **Embedding Creation**
    4. **Vector Database Storage**
    5. **Question Answering with RAG**

    ### 1. Data Extraction

    All relevant data was provided as a series of PDF files located in a shared drive folder. This data was scraped and extracted programmatically to produce plain text, making it easier to analyze and store.

    ### 2. Data Chunking

    The extracted text was divided into manageable chunks using LangChain's Recursive Character Text Splitter. Each chunk was configured to contain 300 characters with a 50-character overlap between consecutive chunks.

    The overlap is critical for **context preservation**, ensuring that the continuity of information across chunks is maintained, which is essential for effective query matching.

    ### 3. Embedding Creation with `bge-m3`

    Each chunk was then embedded into vector form using the **`bge-m3` model**. The choice of `bge-m3` was strategic, as it offers several advantages over other embedding models:

    - **Better Semantic Understanding**: `bge-m3` captures context and semantics more effectively than standard embedding models, particularly for domain-specific content, which improves retrieval accuracy.
    - **Optimized for Question-Answering**: This model is known for excelling in question-answering tasks, where semantic nuances play a crucial role in matching user queries to relevant document chunks.
    - **Enhanced Performance with Minimal Resources**: `bge-m3` strikes a balance between computational efficiency and high-quality embeddings, making it suitable for local deployment without requiring extensive computational resources.

### 4. Vector Storage with ChromaDB

The embeddings were stored in **ChromaDB**, a vector database chosen for its robust feature set, which supports effective retrieval in RAG architectures. Some of the key advantages of using ChromaDB include:

- **Efficient Storage and Retrieval**: ChromaDB is optimized for fast vector storage and retrieval, which is crucial in RAG pipelines where speed impacts the user experience.
- **Persistent Storage**: The database supports data persistence, allowing for continuous data storage and updates without needing to re-index or re-embed.
- **Seamless Integration with LangChain**: ChromaDB integrates easily with LangChain, which makes it ideal for embedding workflows and pipelines built using LangChain’s suite of tools.
- **Scalability**: ChromaDB is designed to scale horizontally, making it possible to expand the database to handle a growing number of embeddings as the chatbot's knowledge base grows.

### 5. Question Answering with RAG

When a user asks a question, the RAG pipeline performs the following steps:

- **Retrieval**: The user's question is embedded and matched against the embeddings stored in ChromaDB to retrieve the 5 most relevant chunks. then provided to the LLM to reformulate them and get a clean answer out of them then provided and that answer is provided as a response by the fastapi API we created.
- **Generation**: The retrieved context is passed to the LLaMA-based LLM, which generates a coherent and accurate answer that is then provided as a response by the fastapi API we created.

The combination of precise retrieval and advanced language modeling enables the chatbot to provide relevant and accurate responses based on university-specific information.

      ## Summary

The RAG pipeline enhances the chatbot’s ability to deliver accurate answers by leveraging advanced embedding techniques and optimized vector storage. The use of `bge-m3` for embeddings and ChromaDB for vector storage has proven effective in providing reliable, high-quality responses in a user-friendly interface.

- ChatBot frontend (which can be found in UI branch):
  We initially developed the chatbot using **Streamlit** for rapid prototyping, which allowed us to quickly implement core functionality. However, we soon encountered limitations with Streamlit, particularly its lack of flexibility in building a fully responsive and visually appealing user interface. This led us to switch to **React**, which offered us greater control over the design and functionality. With React, we were able to create a more dynamic, elegant, and user-friendly interface, ensuring a seamless experience across devices.

The chatbot supports both **French** and **English**, providing users with an option to interact in their preferred language. To make the experience even more engaging and accessible, we integrated **text-to-speech** and **speech-to-text** capabilities. This allows users to interact with the chatbot through voice input and hear responses, catering to different accessibility needs and enhancing the overall user experience.

For user authentication, we integrated **Firebase** to enable easy login via **Google**. This streamlined the sign-in process, allowing users to quickly access the chatbot without the need for additional registration. Firebase also ensures secure management of user data.

To secure and enhance the transparency of chat history, we implemented an **Ethereum-based smart contract**. By leveraging blockchain technology, the chat history is stored in a decentralized manner, ensuring that the data is tamper-proof and fully transparent. This use of Ethereum’s smart contract also adds an extra layer of security, protecting user data from unauthorized access or manipulation.

Together, these technologies work to create a **secure**, **user-friendly**, and **accessible** chatbot with a **robust** and **transparent storage solution**.

## System Flow

The interaction flow of the chatbot is as follows:

1. The user inputs a query through the client interface in either french or english or through speech
1. The query is sent to the fastApi API which queries chromaDB which retrieves the most relevant documents based on the content
1. The retrieved documents are forwarded to the LLM with the appropriate prompt , in case the user answers with yes or no to a question the previous response is also sent to give the RAG some context.
1. The LLM server uses only the information provided by the database to generate a context-aware response.
1. The response is returned to the client and displayed to the user.

## Features

- Accessibility:

- The chatbot is accessible from any device with a web browser and internet connection.
- Includes text-to-speech and speech-to-text capabilities for users with visual impairments.

- Speed:

- Blockchain Integration:

- A blockchain system is planned to securely store user data (currently under development).

- Multilingual Support

- The chatbot can seamlessly handle queries in both French and English.

## Technology Stack

Below is a breakdown of the technologies used in the project:

| Technology   | Description                                                        |
| ------------ | ------------------------------------------------------------------ |
| FastApi      | Python backend web framework used to create fast REST APIs.        |
| Flask        | Web framework used to implement the backend servers.               |
| React        | JavaScript library used for building a responsive client-side UI.  |
| Chroma       | Vector database for storing and retrieving processed documents.    |
| Firebase     | NoSQL database used for user authentication and data storage.      |
| Docker       | Containerization platform for deploying and managing servers.      |
| Tesseract    | OCR Optical Character Recognition for extracting text from images. |
| Hugging Face | Platform for NLP models and document processing.                   |
| Langchain    | Python library designed to help building RAGs and LLMs             |

## Future Enhancements

- Complete the integration of blockchain for secure user data storage.
- Optimize the LLM server to reduce response times further.
- Add more administrative automatisations using the chatbot.
