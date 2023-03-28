
import mysql.connector
import nltk
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
from nltk.corpus import stopwords
import speech_recognition as sr
import pyttsx3
import spacy
import json
from fuzzywuzzy import fuzz


nltk.download('stopwords')
#nlp = spacy.load("xx_ent_wiki_sm")

# Connect to MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="simplebot",
    password ="22098.Achw",
    database="anotherbot"
)

# Get teacher information data from MySQL database
cursor = db.cursor()
cursor.execute("SELECT name, info FROM ensinfo")
result = cursor.fetchall()

# Create lists of teacher names and their corresponding information
teachers = []
teacher_info = []
for row in result:
    teachers.append(row[0])
    teacher_info.append(row[1])

# Define function to preprocess data for SVM



def recognize_speech():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Please say something...")
        r.adjust_for_ambient_noise(source, duration=0.2)

        audio = r.listen(source, phrase_time_limit=5)
    
    try:
        text = r.recognize_google(audio, language='fr-FR')
        if text:

            return(text)
        else:
            print("No speech detected")
    except sr.UnknownValueError:
        print("Speech recognition could not understand audio")
    except sr.RequestError as e:
        print("Could not request results from Google Speech Recognition service; {0}".format(e))
        



def speak(text):
    engine = pyttsx3.init()
    engine.setProperty('rate', 125)  # adjust the speaking rate as desired
    engine.say(text)
    engine.runAndWait()

def preprocess_data(data):
    stop_words = set(stopwords.words('english'))
    preprocessed_data = []
    for sentence in data:
        # Tokenize sentence and remove stopwords
        tokens = nltk.word_tokenize(sentence.lower())
        filtered_tokens = [token for token in tokens if token not in stop_words]
        preprocessed_data.append(" ".join(filtered_tokens))
    return preprocessed_data

# Preprocess teacher information data
teacher_info_processed = preprocess_data(teacher_info)


# Create TfidfVectorizer and fit to teacher information data
vectorizer = TfidfVectorizer()
tfidf = vectorizer.fit_transform(teacher_info_processed)

# Train SVC on teacher information data
classifier = SVC(kernel='linear', C=10.0, gamma='scale')
classifier.fit(tfidf, teachers)

# Define function to get teacher name from query using SVC
def get_teacher_name(query):
   
   
    # If no match found, use SVC to predict teacher name

    # Preprocess query
    query_processed = preprocess_data([query])[0]

    # Transform query using TfidfVectorizer
    query_tfidf = vectorizer.transform([query_processed])

    # Use SVC to predict teacher name
    prediction = classifier.predict(query_tfidf)


    print(prediction[0])
    return prediction[0]


# Define function to handle user input and output teacher information
def chat():
    print("Hi! How can I help you with teachers information?")
    while True:
        #query =  recognize_speech()
        query=input("ask me \t")
        if query == "bye":
            break
        teacher_name = get_teacher_name(query)
        cursor.execute(f"SELECT info FROM ensinfo WHERE name = '{teacher_name}'")
        result = cursor.fetchone()
        if result is None:
            print("Sorry, I couldn't find information on that teacher.")
        else:

            teacher_info = result[0]
            speak(teacher_info)
            print(teacher_info)

# Start chat
chat()

# Close database connection
db.close() 