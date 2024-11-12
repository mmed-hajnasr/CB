from langchain_chroma import Chroma
import google.generativeai as genai
from langchain_huggingface import HuggingFaceEmbeddings
from singleton_metaclass import SingletonMeta
from requests import post


class PromptCreation(metaclass = SingletonMeta) : 

    LLM_URL = "https://c437-35-185-245-5.ngrok-free.app/predict"
    embedding_function = HuggingFaceEmbeddings(model_name="pvl/labse_bert")
    db = Chroma(collection_name="pdf_collection",persist_directory="chroma_storage", embedding_function=embedding_function)

    ZERO_RESULT_PROMPT  = """
Vous etes un assistant qui aide les etudiants a comprendre les documents administratifs de l'ISI.\
Vous avez recu cette question: {query}
notre database n'a pas pu trouver de fichiers correspondant a cette question.\
Votre job est de demander a l'etudiant de reformuler sa question.\
1. Vous devez etre respectueux et poli.\
2. Vous devez etre clair et precis.\
3. Vos qustions doivent etre limitees par la requete de l'etudiant et peut etre repondu par oui ou non.\
"""
    PROMPT_RESULTS_PRESENT = """
Vous etes un assistant qui aide les etudiants a comprendre les documents administratifs de l'ISI.\
Vous avez recu cette question: {query}
notre database a trouve ces fichiers correspondant a cette question.\
Votre job est de les presenter a l'etudiant.\
la reponse doit etre derivee de ces données là: {filtered_results} \
1. Vous devez etre respectueux et poli.\
2. Vous devez etre clair et precis.\
3. Votre repense doit etre limitees par la requete de l'etudiant et les fichiers que vous presentez.\
"""

    PROMPT_IN_RESPONSE = """
Vous etes un assistant qui aide les etudiants a comprendre les documents administratifs de l'ISI.\
Vous avez repondu comme ceci et vous avez poser la question suivante : {previous_response}\
l'etudiant a repondu a votre question comme ceci : {user_response}\
votre job et de determiner ce que vous devez dire a l'utilisateur pour mieux comprendre sa question\
1. Vous devez etre respectueux et poli.\
2. Vous devez etre clair et precis.\
3. Vos qustions doivent etre limitees par la requete de l'etudiant et peut etre repondu par oui ou non.\
"""

    PROMPT_FOR_MORE_INFO = """
Vous etes un assistant qui aide les etudiants a comprendre les documents administratifs de l'ISI.\
Vous avez repondu comme ceci et vous avez poser la question suivante : {previous_response}\
l'etudiant a demander plus d'informations et plus de details\
here are the new results that you can present to the student: {filtered_results}\
1. Vous devez etre respectueux et poli.\
2. Vous devez etre clair et precis.\
3. Vos qustions doivent etre limitees par la requete de l'etudiant et peut etre repondu par oui ou non.\
"""

    def get_results(self, query,nb_results=3):
        results = self.db.similarity_search_with_relevance_scores(query,nb_results)
        if len(results) == 0:
            return None
        filtered_results = [(doc, score) for doc, score in results if score > 0.3]
        return filtered_results
    

    def get_llm_response(self,prompt):
        genai.configure(api_key="AIzaSyDsYW2ol6PB6RrNz9N0RTUyCLX8ZtzJhBM")
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        print(response.text)
        

    def respond(self, query,previous_response=None):
        if query in ["oui", "yes","non","no"]:
            prompt = PromptCreation.PROMPT_IN_RESPONSE.format(previous_response=previous_response, user_response=query)
            return self.get_llm_response(prompt),prompt
        elif query in ["plus d'informations", "more information"]:
            filtered_results = self.get_results(query, nb_results=5)
            prompt = PromptCreation.PROMPT_FOR_MORE_INFO.format(previous_response=previous_response, filtered_results=filtered_results)
            return self.get_llm_response(prompt),prompt
        else :
            filtered_results = self.get_results(query)
            if filtered_results is None:
                prompt = PromptCreation.ZERO_RESULT_PROMPT.format(query=query)
            else : 
                results = [doc.page_content for doc, _ in filtered_results]
                prompt = PromptCreation.PROMPT_RESULTS_PRESENT.format(query=query, filtered_results=results)
                return self.get_llm_response(prompt),prompt
        
        
    






