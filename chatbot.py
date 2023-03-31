from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
import jsonlines
import pyttsx3 
import numpy as np
from sklearn.metrics import precision_score
import speech_recognition as sr
import mysql.connector

# Charger les données d'entraînement
db = mysql.connector.connect(
    host="localhost",
    user="simplebot",
    password ="",
    database="PCD"
)

# Get teacher information data from MySQL database
cursor = db.cursor()
cursor.execute("SELECT Nom, Info FROM prof")
result = cursor.fetchall()

# Create lists of teacher names and their corresponding information
teachers = []
teacher_info = []
for row in result:
    teachers.append(row[0])
    teacher_info.append(row[1])
# Diviser les données en entrées (X) et sorties (y)



# Définir les hyperparamètres
C = 10.0  # Paramètre de régularisation
kernel = 'linear'  # Noyau SVM
gamma = 'scale'

# Préparez les données pour l'entraînement SVM
X = np.array(teachers)
y = np.array(teacher_info)    
x=X

# Divisez les données en ensembles d'entraînement et de test
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Préparez les données pour l'entraînement SVM en utilisant NLP
vectorizer = TfidfVectorizer()
X_train_tfidf = vectorizer.fit_transform(X_train)

# Créer le vecteur Tfidf
#vectorizer = TfidfVectorizer()
#X = vectorizer.fit_transform(X)

# Entraînez SVM
#clf = SVC(kernel='linear')
#clf.fit(X_train_tfidf, y_train)

# Entraîner le modèle SVM
model = SVC(kernel='linear', C=10.0, gamma='scale')
model.fit(X_train_tfidf, y_train)

# Testez le chatbot
X_test_tfidf = vectorizer.transform(X_test)
y_pred = model.predict(X_test_tfidf)

# Évaluez les performances du chatbot
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Precision:", precision_score(y_test, y_pred, average='macro'))
print("Recall:", recall_score(y_test, y_pred, average='macro'))
print("F1 score:", f1_score(y_test, y_pred, average='macro'))

# Initialiser le moteur de synthèse vocale
engine = pyttsx3.init()
voices = engine.getProperty('voices')       #getting details of current voice


# engine.setProperty('voice', voices[2h].id)  # Set to a French voice
engine.setProperty('rate', 150)     # setting up new voice rate
engine.setProperty('volume',1.0)    # setting up volume level  between 0 and 1

#engine.setProperty('voice', voices[0].id)  #changing index, changes voices. o for male
engine.setProperty('voice', voices[26].id)   #changing index, changes voices. 1 for female

def rec():
   
    r = sr.Recognizer()

    with sr.Microphone() as source:
        print("Speak in French...")
        audio = r.listen(source, phrase_time_limit=5)

    try:
        text = r.recognize_google(audio, language='fr-FR')
        return(text)
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
    except sr.RequestError as e:
        print("Could not request results from Google Speech Recognition service; {0}".format(e))
    


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
    speak_answer("donner une question")
    question = rec()
    result = predict_answer(question)
    print("Question :", result["question"])
    print("Question Proposed:", result["question_data"])
    print("Answer:", result["answer"])
    print("Question is")
    print(result["question"])
    print("Question Proposed is")
    print(result["question_data"])
    print("Answer is")
    speak_answer(result["answer"])
    
# Close database connection
db.close()
# Start chat
chat()

# Close database connection
db.close() 
