from flask import Flask, jsonify, render_template,request,redirect
import webbrowser
from nltk.chat.util import Chat 
from flask import send_file
import base64
import re
import uuid
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
from flask import Flask,render_template,Response,redirect
import cv2
import face_recognition
import numpy as np
import os
app=Flask(__name__)
CORS(app)
import time
names=[0,0]
# Load known faces from "known_faces" directory

""" def generate_frames():
    global known_face_encodings, known_face_names

    video_capture = cv2.VideoCapture(0)

    # Initialize some variables
    face_locations = []
    face_encodings = []
    face_names = []
    process_this_frame = True

    while True:
        success, frame = video_capture.read()
        if not success:
            break
        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)

        # Only process every other frame of video to save time
        if process_this_frame:
            # Find all the faces and face encodings in the current frame of video
            face_locations = face_recognition.face_locations(rgb_small_frame)
            print(face_locations)
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

            face_names = []
            for face_encoding in face_encodings:
                # See if the face is a match for the known face(s)
                matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
                name = "Unknown"

                # If a match was found in known_face_encodings, just use the first one.
                if True in matches:
                    first_match_index = matches.index(True)
                    name = known_face_names[first_match_index]
                if name=="Unknown":
                    names[0]=names[0]+2
                else:
                    names[1]=names[1]+1
                #print(names)
			

                face_names.append(name)

        process_this_frame = not process_this_frame

        # Draw the rectangles and labels on the frame
        for (top, right, bottom, left), name in zip(face_locations, face_names):
            # Scale back up face locations since the frame we detected in was scaled to 1/4 size
            top *= 4
            right *= 4
            bottom *= 4
            left *= 4

            # Draw a box around the face
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

            # Draw a label with a name below the face
            cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

        # Return the frame in byte format
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    
    # Release the video capture and destroy any remaining windows
    video_capture.release()
    cv2.destroyAllWindows()
@app.route('/api/face_recognition', methods=['GET'])

def face_recognition_api():
    # Your existing code to process video frames and perform face recognition

    # Return the results in JSON format
    return jsonify({'names': names})
     @app.route('/video')
def video():
    return Response(generate_frames(),mimetype='multipart/x-mixed-replace; boundary=frame')
# Connect to MySQL database
@app.route('/video_url')
def video_url():
    return jsonify('http://localhost:5000/video') """
      

@app.route('/')

@app.route('/Access')
def home():
    if names[0]<names[1]:
        names[0]=0
        names[1]=0
        webbrowser.open("localhost:3000/")    
    else:
        return render_template('denied.html')
        




db = mysql.connector.connect(
        host="localhost",
user="simplebot",
password ="22098.Achw",
database="PCD"
)

@app.route('/speaker')
def speak_answer():
    engine.say("proposez votre question")
    engine.runAndWait()
def speak_answer(answer):
    engine.say(answer)
    engine.runAndWait()
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

engine = pyttsx3.init()
voices = engine.getProperty('voices')
engine.setProperty('rate', 155)     # setting up new voice rate
engine.setProperty('volume',1.0)    # setting up volume level  between 0 and 1
engine.setProperty('voice', voices[26].id)

# Fonction pour parler la réponse prédite


def base(table):
    # Create a cursor object
    cursor = db.cursor()
    # Execute the query
    cursor.execute(f"SELECT question,reponse FROM {table}")

   # Retrieve the results
    results = cursor.fetchall()
    X=[row[0] for row in results]
    y=[row[1] for row in results]
   

    

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
        #print(answer)
    text = request.json['message']
    print(text)

    if text!="bye":
            predicted_answer = predict_answer(text)
            speak_answer(predicted_answer)
            print(predicted_answer)  # Uncomment this line to speak the answer

            return jsonify({'answer': predicted_answer})
            #return (predicted_answer)
    else:

           speak_answer("à très bientôt")
           webbrowser.open("http://localhost:3000/")
      
def baseemploi(table):
    # Create a cursor object
    cursor = db.cursor()
    # Execute the query
    cursor.execute(f"SELECT question,reponse FROM {table}")

   # Retrieve the results
    results = cursor.fetchall()
    X=[row[0] for row in results]
    y=[row[1] for row in results]
   

    

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
        #print(answer)
    text = request.json['message']
    """   
       while True:
       speak_answer("Sur quoi vous voulez s'informer ?")
        question = rec()
        #question=input("question  ")
        if (not question):
             question = rec()

     result = predict_answer(question) """
    """   if result["answer"]=="bye":
           speak_answer("à très bientôt")
           
        print("Question Proposée est:", result["question_data"])  """
        #speak_answer(result["answer"])

    if text!="bye":
                predicted_answer = predict_answer(text)
                speak_answer("voila l'emploi de temps de "+text)
                print(predicted_answer)  # Uncomment this line to speak the answer


                return jsonify({'answer': predicted_answer})
                #return (predicted_answer)
    else:

            speak_answer("à très bientôt")
            webbrowser.open("http://localhost:3000/")
    
   



def direction(file,choices):
    with jsonlines.open(file) as f:
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
    # Exemple d'utilisation
    while True:
        speak_answer("Sur quoi vous voulez s'informer ?")
        question = rec()
        #question=input("question  ")
        if (not question):
             question = rec()

        result = predict_answer(question)
        if result["answer"]=="bye":
           speak_answer("à très bientôt")
           
        print("Question Proposée est:", result["question_data"])
        print("reponse :", result["answer"])
        #speak_answer(result["answer"])
        if result["answer"]!="unknown":
            webbrowser.open(choices[result["answer"]])
            #return(choices[result["answer"]])
        if result["answer"]=="bye":
           speak_answer("â très bientôt")
           return("http://localhost:3000/")
        


       
       
@app.route('/open_website')

def open_website():
    speak_answer("Bienvenue.")
    result= "http://localhost:3000/result"
    sujet = "http://localhost:3000/sujet"
    profil = "http://localhost:3000/profil"
    choices={}
    choices['result']=result
    choices['sujet']=sujet
    choices['profil']=profil
    choices['bye']='/'
    direction("choix.jsonl",choices)
    return ""

@app.route('/openprofil')
def openprof():

    print("openprofile")
    speak_answer("voila l'espace profil.")
    etudiant = "http://localhost:3000/etud"
    prof = "http://localhost:3000/prof"
    choices={}
    choices['etudiant']=etudiant
    choices['professeur']=prof
    choices['bye']='http://localhost:3000/'

    direction("chix2.jsonl",choices)
    return ""

@app.route('/opensujet')
def opensujet():
    speak_answer("voila l'espace sujet.")

    pcd = "http://localhost:3000/sujet_pcd"
    pfe = "http://localhost:3000/sujet_pfe"
    pe="http://localhost:3000/sujet_pe"
    choices={}
    choices['sujet_pcd']=pcd
    choices['sujet_pe']=pe
    choices['sujet_pfe']=pfe
    choices['bye']='http://localhost:3000/'

    direction("sujet.jsonl",choices)
    return ""


@app.route('/openresult')
def openresult():
    speak_answer("voila l'espace résultat.")

    print("open website")
    pcd= "http://localhost:3000/result_pcd"
    pfe = "http://localhost:3000/result_pfe"
    exam = "http://localhost:3000/result_exam"
    choices={}
    choices['result_pcd']=pcd
    choices['result_pfe']=pfe
    choices['result_exam']=exam
    choices['unknown']='google.com'
    return jsonify(message=direction("main_page.jsonl",choices))
@app.route ('/answerschedule', methods=['POST'])
def schedule() :
 
    table="emploitemps"
    return baseemploi(table)

@app.route('/answerprof', methods=['POST'])
def professeur():
    table="prof"
    return base(table)

@app.route('/answeretud', methods=['POST'])
def etudiant():
    table="etudiant"
    return base(table)

@app.route('/answerevent', methods=['POST'])
def event():
    table="event"
    return base(table)

@app.route('/answerreunion', methods=['POST'])
def reunion():
    table="reunion"
    return base(table)

@app.route('/answersujet_pcd', methods=['POST'])
def sujet_pcd():
    table="sujet_pcd"
    return base(table)

@app.route('/answersujet_pfe', methods=['POST'])
def sujet_pfe():
    table="sujet_pfe"
    return base(table)

@app.route('/answersujet_pe', methods=['POST'])
def sujet_pe():
    table="sujet_pe"
    return base(table)

@app.route('/answerresult_pcd', methods=['POST'])
def reuslt_pcd():
    table="result_pcd"
    return base(table)

@app.route('/answerresult_exam', methods=['POST'])
def reuslt_exam():
    table="result_exam"
    return base(table)

@app.route('/answerresult_pfe', methods=['POST'])
def reuslt_pfe():
    table="result_pfe"
    return base(table)

@app.route('/answergeneral', methods=['POST'])
def general():
    table="general"
    return base(table)



    
@app.route('/answerprof', methods=['POST'])
def prof():
    table="prof"
    return base(table)

@app.route('/answeretud', methods=['POST'])
def etud():
    table="etudiant"
    return base(table)

@app.route('/answerpcd', methods=['POST'])
def pcd():
    table="sujet_pcd"
    return base(table)

@app.route('/recognize_speech', methods=['POST'])
def recognize_speech():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        try:
            print('Say something...')
            audio = r.listen(source,  phrase_time_limit=5)
            text = r.recognize_google(audio, language='fr-FR')
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
app.config['UPLOAD_FOLDER'] =os.path.abspath('/home/achwak/Desktop/SchoolAssistant-pcd-project/UI') + '/../faces'

#known_faces_dir = "faces"
known_face_encodings = []
known_face_names = []

for filename in os.listdir(app.config['UPLOAD_FOLDER']):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        # Load image and compute its encoding
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image = face_recognition.load_image_file(image_path)
        encoding = face_recognition.face_encodings(image)[0]
        # Add encoding and name to arrays
        known_face_encodings.append(encoding)
        known_face_names.append(os.path.splitext(filename)[0])

  
 
       
known_faces = []
known_names = []
for filename in os.listdir(app.config['UPLOAD_FOLDER']):
        if filename.endswith(".jpg") or filename.endswith(".png"):

            image = face_recognition.load_image_file(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            face_encoding = face_recognition.face_encodings(image)[0]
            known_faces.append(face_encoding)
            
            known_names.append(os.path.splitext(filename)[0])

# Define a Flask route for the login page
state = "PUBLIC"

@app.route('/login', methods=['POST'])
def login():
    global state
    image_data_url = request.form['image']

    # Remove the data URL prefix to get the base64-encoded image data
    image_data = image_data_url.split(',')[1]
    # Decode the base64-encoded image data into a Numpy array
    image_bytes = base64.b64decode(image_data)
    image_np = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(image_np, cv2.IMREAD_COLOR)
    # Find all the faces in the image
    face_locations = face_recognition.face_locations(image)
    face_encodings = face_recognition.face_encodings(image, face_locations)

    face_names = []
    if face_encodings == []:
        msg = "You are unknown"
    else:
        # Loop through all the faces found in the image
        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_face_names[best_match_index]
                print(name)
            if name == "Unknown":
                msg = "You are unknown"
                print(msg)
            else:
                msg = name
                msgg = name.split('_')
                if len(msgg) < 2:
                    name = msgg[0]
                    print("Error: name does not contain underscore")
                else:
                    state = msgg[1]

                face_names.append(name)

        # Update state with the state of the last recognized face
    print(state)
    
    return jsonify([state, msgg[0]])           
@app.route('/get_state')
def get_state():
    global state
    print(state)
    return state
           
if __name__ == "__main__":
    app.run(debug=True,port=5000) 