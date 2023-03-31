from flask import Flask, jsonify, render_template,request
import webbrowser
from nltk.chat.util import reflections,Chat 
import speech_recognition as sr
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
import pyttsx3 
import speech_recognition as sr
from sklearn.model_selection import train_test_split
import jsonlines
import mysql.connector
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


@app.route('/open_website')

def open_website():

    result= "http://localhost:3000/result"
    sujet = "http://localhost:3000/sujet"
    profil = "http://localhost:3000/profil"
    with jsonlines.open("choix.jsonl") as f:
        data = list(f)
    # Diviser les données en entrées (X) et sorties (y)

    X = [d['question'] for d in data]
    y = [d['reponse'] for d in data]
    x=X
    # Définir les hyperparamètres
    C = 10.0  # Paramètre de régularisation
    kernel = 'linear'  # Noyau SVM
    gamma = 'scale'
    # Divisez les données en ensembles d'entraînement et de test
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Préparez les données pour l'entraînement SVM en utilisant NLP
    vectorizer = TfidfVectorizer()
    X_train_tfidf = vectorizer.fit_transform(X_train)

    # Entraîner le modèle SVM
    model = SVC(kernel='linear', C=10.0, gamma='scale')
    model.fit(X_train_tfidf, y_train)

    # Testez le chatbot
    X_test_tfidf = vectorizer.transform(X_test)
    y_pred = model.predict(X_test_tfidf)


    # Initialiser le moteur de synthèse vocale
    engine = pyttsx3.init()

    # engine.setProperty('voice', voices[2h].id)  # Set to a French voice
    engine.setProperty('rate', 155)     # setting up new voice rate
    engine.setProperty('volume',1.0)    # setting up volume level  between 0 and 1

    voices = engine.getProperty('voices')       #getting details of current voice
    engine.setProperty('voice', voices[26].id)
    def rec():
        r = sr.Recognizer()
        with sr.Microphone() as source:
            try:
                print('Say something...')
                audio = r.listen(source,  phrase_time_limit=5)
                text = r.recognize_google(audio, language='fr-FR')
                print(text)
                return text
            except sr.WaitTimeoutError:
                print("Sorry, I didn't hear anything. Please try again.")
            except sr.UnknownValueError:
                print("Sorry, I couldn't understand what you said. Please try again.")
            except sr.RequestError:
                print("Sorry, there was an issue with the speech recognition service. Please try again later.")
            except sr.MicrophoneError:
                print("Sorry, the microphone is not connected or is not working properly. Please check your microphone and try again.")
            except sr.AudioTimeoutError:
                print("Sorry, the audio input timed out. Please try again.")


    # Fonction pour prédire la réponse à une question donnée
    def predict_answer(question):
        question_vec = vectorizer.transform([question])
        if question_vec.nnz == 0:
            return {"question": question,"question_data":"unknown", "answer": "unknown"}
        answer = model.predict(question_vec)
        pos=0
        for a in y:
            if a==answer:
                question_data=x[pos]
                break
            pos+=1
        return {"question": question,"question_data":question_data, "answer": answer[0]}

    # Fonction pour parler la réponse prédite
    def speak_answer(answer):
        engine.say(answer)
        engine.runAndWait()
    # Exemple d'utilisation
    while True:
        speak_answer("Proposer votre question")
        question = rec()
        #question=input("donner   ")
        result = predict_answer(question)
        print("Question Proposée est:", result["question_data"])
        print("reponse :", result["answer"])
        speak_answer(result["answer"])
        print(result)
        if result['answer']=='profil':
            webbrowser.open(profil)
            break
        elif result['answer']=="result":
            webbrowser.open(result)
            break
        elif result['answer']=="sujet":
            webbrowser.open(sujet)
            break
        

@app.route('/openprof')
def openprof():

   
    etudiant = "http://localhost:3000/etud"
    prof = "http://localhost:3000/prof"
    with jsonlines.open("chix2.jsonl") as f:
        data = list(f)
    # Diviser les données en entrées (X) et sorties (y)

    X = [d['question'] for d in data]
    y = [d['reponse'] for d in data]
    x=X
    # Définir les hyperparamètres
    C = 10.0  # Paramètre de régularisation
    kernel = 'linear'  # Noyau SVM
    gamma = 'scale'
    # Divisez les données en ensembles d'entraînement et de test
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Préparez les données pour l'entraînement SVM en utilisant NLP
    vectorizer = TfidfVectorizer()
    X_train_tfidf = vectorizer.fit_transform(X_train)

    # Entraîner le modèle SVM
    model = SVC(kernel='linear', C=10.0, gamma='scale')
    model.fit(X_train_tfidf, y_train)

    # Testez le chatbot
    X_test_tfidf = vectorizer.transform(X_test)
    y_pred = model.predict(X_test_tfidf)


    # Initialiser le moteur de synthèse vocale
    engine = pyttsx3.init()

    # engine.setProperty('voice', voices[2h].id)  # Set to a French voice
    engine.setProperty('rate', 155)     # setting up new voice rate
    engine.setProperty('volume',1.0)    # setting up volume level  between 0 and 1

    voices = engine.getProperty('voices')       #getting details of current voice
    engine.setProperty('voice', voices[26].id)
    def rec():
        r = sr.Recognizer()
        with sr.Microphone() as source:
            try:
                print('Say something...')
                audio = r.listen(source,  phrase_time_limit=5)
                text = r.recognize_google(audio, language='fr-FR')
                print(text)
                return text
            except sr.WaitTimeoutError:
                print("Sorry, I didn't hear anything. Please try again.")
            except sr.UnknownValueError:
                print("Sorry, I couldn't understand what you said. Please try again.")
            except sr.RequestError:
                print("Sorry, there was an issue with the speech recognition service. Please try again later.")
            except sr.MicrophoneError:
                print("Sorry, the microphone is not connected or is not working properly. Please check your microphone and try again.")
            except sr.AudioTimeoutError:
                print("Sorry, the audio input timed out. Please try again.")


    # Fonction pour prédire la réponse à une question donnée
    def predict_answer(question):
        question_vec = vectorizer.transform([question])
        if question_vec.nnz == 0:
            return {"question": question,"question_data":"unknown", "answer": "unknown"}
        answer = model.predict(question_vec)
        pos=0
        for a in y:
            if a==answer:
                question_data=x[pos]
                break
            pos+=1
        return {"question": question,"question_data":question_data, "answer": answer[0]}

    # Fonction pour parler la réponse prédite
    def speak_answer(answer):
        engine.say(answer)
        engine.runAndWait()
    # Exemple d'utilisation
    while True:
        speak_answer("Proposer votre question")
        question = rec()
        #question=input("donner   ")
        result = predict_answer(question)
        print("Question Proposée est:", result["question_data"])
        print("reponse :", result["answer"])
        speak_answer(result["answer"])
        if result['answer']=='professeur':
            webbrowser.open(prof)
            break
        elif result['answer']=="etudiants":
            webbrowser.open(etudiant)
            break
       
            
@app.route('/opensujet')
def opensujet():

   
    pcd = "http://localhost:3000/sujet_pcd"
    pfe = "http://localhost:3000/sujet_pfe"
    pe="http://localhost:3000/sujet_pe"
    with jsonlines.open("sujet.jsonl") as f:
        data = list(f)
    # Diviser les données en entrées (X) et sorties (y)

    X = [d['question'] for d in data]
    y = [d['reponse'] for d in data]
    x=X
    # Définir les hyperparamètres
    C = 10.0  # Paramètre de régularisation
    kernel = 'linear'  # Noyau SVM
    gamma = 'scale'
    # Divisez les données en ensembles d'entraînement et de test
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Préparez les données pour l'entraînement SVM en utilisant NLP
    vectorizer = TfidfVectorizer()
    X_train_tfidf = vectorizer.fit_transform(X_train)

    # Entraîner le modèle SVM
    model = SVC(kernel='linear', C=10.0, gamma='scale')
    model.fit(X_train_tfidf, y_train)

    # Testez le chatbot
    X_test_tfidf = vectorizer.transform(X_test)
    y_pred = model.predict(X_test_tfidf)


    # Initialiser le moteur de synthèse vocale
    engine = pyttsx3.init()

    # engine.setProperty('voice', voices[2h].id)  # Set to a French voice
    engine.setProperty('rate', 155)     # setting up new voice rate
    engine.setProperty('volume',1.0)    # setting up volume level  between 0 and 1

    voices = engine.getProperty('voices')       #getting details of current voice
    engine.setProperty('voice', voices[26].id)
    def rec():
        r = sr.Recognizer()
        with sr.Microphone() as source:
            try:
                print('Say something...')
                audio = r.listen(source,  phrase_time_limit=5)
                text = r.recognize_google(audio, language='fr-FR')
                print(text)
                return text
            except sr.WaitTimeoutError:
                print("Sorry, I didn't hear anything. Please try again.")
            except sr.UnknownValueError:
                print("Sorry, I couldn't understand what you said. Please try again.")
            except sr.RequestError:
                print("Sorry, there was an issue with the speech recognition service. Please try again later.")
            except sr.MicrophoneError:
                print("Sorry, the microphone is not connected or is not working properly. Please check your microphone and try again.")
            except sr.AudioTimeoutError:
                print("Sorry, the audio input timed out. Please try again.")


    # Fonction pour prédire la réponse à une question donnée
    def predict_answer(question):
        question_vec = vectorizer.transform([question])
        if question_vec.nnz == 0:
            return {"question": question,"question_data":"unknown", "answer": "unknown"}
        answer = model.predict(question_vec)
        pos=0
        for a in y:
            if a==answer:
                question_data=x[pos]
                break
            pos+=1
        return {"question": question,"question_data":question_data, "answer": answer[0]}

    # Fonction pour parler la réponse prédite
    def speak_answer(answer):
        engine.say(answer)
        engine.runAndWait()
    # Exemple d'utilisation
    while True:
        speak_answer("Proposer votre question")
        question = rec()
        #question=input("donner   ")
        result = predict_answer(question)
        print("Question Proposée est:", result["question_data"])
        print("reponse :", result["answer"])
        speak_answer(result["answer"])
        if result['answer']=='sujet_pcd':
            webbrowser.open(pcd)
            break
        elif result['answer']=="sujet_pfe":
            webbrowser.open(pfe)
            break
        elif result['answer']=="sujet_pe":
            webbrowser.open(pe)
            break
       
       
            

# Charger les données d'entraînement
engine = pyttsx3.init()
voices = engine.getProperty('voices')

# Connect to MySQL database
db = mysql.connector.connect(
        host="localhost",
user="simplebot",
password ="22098.Achw",
database="PCD"

)
engine.setProperty('rate', 155)     # setting up new voice rate
engine.setProperty('volume',1.0)    # setting up volume level  between 0 and 1

engine.setProperty('voice', voices[26].id)
@app.route('/recognize_speech', methods=['POST'])
def recognize_speech():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        try:
            print('Say something...')
            audio = r.listen(source,  phrase_time_limit=5)
            text = r.recognize_google(audio, language='fr-FR')
            print(text)
            return text
        except sr.WaitTimeoutError:
            print("Sorry, I didn't hear anything. Please try again.")
        except sr.UnknownValueError:
            print("Sorry, I couldn't understand what you said. Please try again.")
        except sr.RequestError:
            print("Sorry, there was an issue with the speech recognition service. Please try again later.")
        except sr.MicrophoneError:
            print("Sorry, the microphone is not connected or is not working properly. Please check your microphone and try again.")
        except sr.AudioTimeoutError:
            print("Sorry, the audio input timed out. Please try again.")

        response = {
                'text': text
            }
        return json.dumps(response)
@app.route('/answerprof', methods=['POST'])
def prof():
    # Create a cursor object
    cursor = db.cursor()
    # Execute the query
    cursor.execute("SELECT Nom,Info FROM prof")
    # Retrieve the results
    results = cursor.fetchall()
    X=[row[0] for row in results]
    y=[row[1] for row in results]
    x=X
    # Créer le vecteur Tfidf
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(X)

    # Entraîner le modèle SVM
    model = SVC(kernel='linear', C=1.0, gamma='scale')
    model.fit(X, y)

    # Fonction pour prédire la réponse à une question donnée
    def predict_answer(question):
        question_vec = vectorizer.transform([question])
        if question_vec.nnz == 0:
            return f"Answer is: Unknown"
        answer = model.predict(question_vec)
        return f"{answer[0]}"
    def speak_answer(answer):
        engine.say(answer)
        engine.runAndWait()
    text = request.json['message']
    predicted_answer = predict_answer(text)
    #speak_answer(predicted_answer)  # Uncomment this line to speak the answer
    print(predicted_answer)

    speak_answer(predicted_answer) 
    return jsonify({'answer': predicted_answer})


@app.route('/answeretud', methods=['POST'])
def etud():
    # Create a cursor object
    cursor = db.cursor()
    # Execute the query
    cursor.execute("SELECT Nom,Email FROM etudiant")
    # Retrieve the results
    results = cursor.fetchall()
    X=[row[0] for row in results]
    y=[row[1] for row in results]
    x=X
    # Créer le vecteur Tfidf
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(X)

    # Entraîner le modèle SVM
    model = SVC(kernel='linear', C=1.0, gamma='scale')
    model.fit(X, y)

    # Fonction pour prédire la réponse à une question donnée
    def predict_answer(question):
        question_vec = vectorizer.transform([question])
        if question_vec.nnz == 0:
            return f"Answer is: Unknown"
        answer = model.predict(question_vec)
        return f"{answer[0]}"
    def speak_answer(answer):
        engine.say(answer)
        engine.runAndWait()
    text = request.json['message']

    predicted_answer = predict_answer(text)
    #speak_answer(predicted_answer)  # Uncomment this line to speak the answer
    print(predicted_answer)

    speak_answer(predicted_answer) 
    return jsonify({'answer': predicted_answer})

@app.route('/answerpcd', methods=['POST'])
def pcd():
    # Create a cursor object
    cursor = db.cursor()
    # Execute the query
    cursor.execute("SELECT Nom , Encadrant FROM sujet_pcd")
    # Retrieve the results
    results = cursor.fetchall()
    X=[row[0] for row in results]
    y=[row[1] for row in results]
    x=X
    # Créer le vecteur Tfidf
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(X)
    if (y != None and x!= None):
            
        # Entraîner le modèle SVM
        model = SVC(kernel='linear', C=1.0, gamma='scale')
        model.fit(X, y)

        # Fonction pour prédire la réponse à une question donnée
        def predict_answer(question):
            question_vec = vectorizer.transform([question])
            if question_vec.nnz == 0:
                return f"Answer is: Unknown"
            answer = model.predict(question_vec)
            return f"{answer[0]}"
        def speak_answer(answer):
            engine.say(answer)
            engine.runAndWait()
        text = request.json['message']
        predicted_answer = predict_answer(text)
        print(predicted_answer)

        #speak_answer(predicted_answer)  # Uncomment this line to speak the answer

        speak_answer(predicted_answer) 
        return jsonify({'answer': predicted_answer})

    else :
        return jsonify({'answer': "aucune"})



app.run(port=80,debug=True)