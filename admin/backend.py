from flask import Flask, render_template, request, redirect, url_for, session,jsonify
from flask_mysqldb import MySQL
from flask import send_from_directory

import json
import jsonpickle
import MySQLdb.cursors
from flask_jwt_extended import JWTManager, get_jwt_identity, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash 
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
import os

import re
app = Flask(__name__,template_folder='template')
CORS(app)
jwt = JWTManager(app)

# Change this to your secret key (can be anything, it's for extra protection)
app.secret_key = '1234'
# Enter your database connection details below
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '22098achw'
app.config['MYSQL_DB'] = 'PCD'


# Intialize MySQL
mysql = MySQL(app)
bcrypt = Bcrypt(app)



app.config['UPLOAD_FOLDER'] =os.path.abspath('/home/achwak/Desktop/SchoolAssistant-pcd-project/admin') + '/../faces'
app.config['UPLOAD_FOLDER1'] =os.path.abspath('/home/achwak/Desktop/SchoolAssistant-pcd-project/admin') + '/../emploi'
app.config['UPLOAD_FOLDER2'] =os.path.abspath('/home/achwak/Desktop/SchoolAssistant-pcd-project/admin') + '/../emploiexam'




@app.route('/images/<path:filename>')                       #####" Giving image an url : localhost:5000/images/..."
def serve_image(filename):
    
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)



###########################      login & registration         ############################################



@app.route("/register", methods=["POST"])
def register_user():
   
    # Output message if something goes wrong...
    msg = ''
    # Check if "username", "password" and "email" POST requests exist (user submitted form)
    if request.method == 'POST' and 'username' in request.json and 'password' in request.json and 'email' in request.json:
        # Create variables for easy access
        username = request.json['username']
        password= request.json['password']
        password2 = generate_password_hash(password)

        email = request.json['email']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM accounts WHERE username = %s', (username,))
        account = cursor.fetchone()
        # If account exists show error and validation checks
        if account:
            msg = 'Account already exists!'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            msg = 'Invalid email address!'
        elif not re.match(r'[A-Za-z0-9]+', username):
            msg = 'Username must contain only characters and numbers!'
        elif not username or not password or not email:
            msg = 'Please fill out the form!'
        else:
            # Account doesnt exists and the form data is valid, now insert new account into accounts table
            cursor.execute('INSERT INTO accounts VALUES (NULL, %s, %s, %s)', (username, password2, email,))
            mysql.connection.commit()
            msg = 'You have successfully registered!'
        if not check_password_hash(str(password2), password): return jsonify({"Error": "email/password son incorrectos"}), 400

        access_token = create_access_token(identity=account['id'])

        data = {
                "access_token": access_token,
                "user": account
            }


    if account: return jsonify(data), 201

    elif request.method == 'POST':
        # Form is empty... (no POST data)
        msg = 'Please fill out the form!'
    # Show registration form with message (if any)
  

 
@app.route('/Login', methods=['POST'])
def login():

    if request.method == 'POST' and 'email' in request.json and 'password' in request.json :

        email = request.json['email']
        password = request.json['password']
        if not email: return jsonify({ "Error": "Email is required"}), 400

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM accounts WHERE email = %s', (email,))
        user = cursor.fetchone()
        if user :

           passw =user['password']
           print(passw)
        if not user: return jsonify({"Error": "email is incorrect"}), 401
        """   password2 = generate_password_hash(passw)
         print(password2) """

        if not check_password_hash(passw, str(password)):  return jsonify({"Error": "email/password es incorrecto!"}), 401

        access_token = create_access_token(identity=user['id'])
        data = {
                "access_token": access_token,
                "user": user,
            }
        return jsonify(data), 200

      
          
       

        

    else:
        return jsonify({"Error": "Inicio de sesión invalido"}), 200



####################################"         STUDENT          ########################################"

@app.route('/upload-image-student', methods=['POST'])
def upload_image_image():
    if 'image' not in request.files:
        return jsonify({"error" : "No image provided."})

    f = request.files['image']
    ff=os.path.splitext(f.filename)[0]
    type=os.path.splitext(f.filename)[1]
    f.save(os.path.join(app.config['UPLOAD_FOLDER'], ff+'_STUDENT'+type))

    return jsonify({"message" : "Image uploaded successfully.", "filename" : ff+'_STUDENT'+type})


@app.route("/addstudent", methods=["POST"])
def addstudent():
        if request.method == 'POST':
            print(request.json)
            Nom=request.json['Nom']
            Info=request.json['Info']
            Image=request.json['Image']

            Email=request.json['Email']


            cursor = mysql.connection.cursor()
            cursor.execute('SELECT * FROM etudiant WHERE Nom= %s', [Nom])
            account = cursor.fetchone()
            if account:
                msg='profile already exists'
            else:
                 query="INSERT INTO etudiant (Nom, Info, Image, Email) VALUES (%s, %s, %s, %s)"
                 
                 data=(Nom,Info,Image,Email)
                 print(data)
                 cursor.execute(query, data)
                 mysql.connection.commit()
                 msg = 'You have successfully addes a student!'

            return jsonify(msg)
@app.route("/getstudent", methods=["GET"])
def getstudent():


       
    try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM etudiant ')
            profil = cursor.fetchall()
            
            return jsonify(profil)

    except Exception as e:
		    print(e)
	
@app.route('/update/student/<id>',methods=["PUT"])
def editt_view(id):
    try:
      if request.method == 'PUT':
            data = request.json
            Nom=request.json['Nom']
            Info=request.json['Info']

            Email=request.json['Email']

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            sql="UPDATE etudiant SET Nom=%s,Info=%s,Email=%s WHERE id=%s"
            data=(Nom,Info,Email,id)
            cursor.execute(sql,data)
            mysql.connection.commit()
            cursor.execute("SELECT * FROM etudiant")
            mysql.connection.commit()
            row = cursor.fetchall()
      return jsonify(row)

      print('\n # Update successful # \n')
    
    except Exception as e:
	      print(e)

	

@app.route('/delete/student/<id>',methods=['DELETE'])
def delete_user(id):
	try:

		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute("DELETE FROM etudiant WHERE id='"+ id +"'")
		mysql.connection.commit()

		
		cursor.execute("SELECT * FROM etudiant")
		mysql.connection.commit()
		row = cursor.fetchall()
        
		return jsonify(row)
	except Exception as e:
		print(e)
	finally:
		cursor.close()
	
       ##############  enseignant #############""
@app.route('/upload-image-prof', methods=['POST'])
def upload_image_prof():
    if 'image' not in request.files:
        return jsonify({"error" : "No image provided."})

    f = request.files['image']
    ff=os.path.splitext(f.filename)[0]
    type=os.path.splitext(f.filename)[1]
    f.save(os.path.join(app.config['UPLOAD_FOLDER'], ff+'_PROF'+type))

    return jsonify({"message" : "Image uploaded successfully.", "filename" : ff+'_PROF'+type})


@app.route("/getprof", methods=["GET"])
def getprof():


       
    try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM prof ')
            profil = cursor.fetchall()
            
            return jsonify(profil)

    except Exception as e:
		    print(e)
@app.route("/addprof", methods=["POST"])
def addprof():
        if request.method == 'POST':
            print(request.json)
            Nom=request.json['Nom']
            Info=request.json['Info']
            Image=request.json['Image']
            Contact=request.json['Contact']

            Email=request.json['Email']
            print(Image)

            try:
                cursor = mysql.connection.cursor()
                cursor.execute('SELECT * FROM prof WHERE Nom= %s', [Nom])
                account = cursor.fetchone()
                if account:
                    msg='profile already exists'
                else:
                    query = "INSERT INTO prof (Nom, Info, Image, Contact,Email) VALUES (%s, %s, %s, %s,%s)"
                    values = (Nom, Info, Image, Contact,Email)
                    cursor.execute(query, values)
                    mysql.connection.commit()

                    return jsonify({"message" : "Prof added successfully."})

            except:
                mysql.connection.rollback()
                return jsonify({"error" : "An error occurred while adding the prof."})
                    
@app.route('/delete/prof/<id>',methods=['DELETE'])
def delete_prof(id):
	try:

		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute("DELETE FROM prof WHERE id='"+ id +"'")
		mysql.connection.commit()

		
		cursor.execute("SELECT * FROM prof")
		mysql.connection.commit()
		row = cursor.fetchall()
        
		return jsonify(row)
	except Exception as e:
		print(e)
	finally:
		cursor.close()
@app.route('/update/prof/<id>',methods=["PUT"])
def editt_prof(id):
    try:
      if request.method == 'PUT':
            id=int(id)
            data = request.json
            Nom=request.json['Nom']
            Info=request.json['Info']
            Contact=request.json['Contact']

            Email=request.json['Email']

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            sql="UPDATE prof SET Nom=%s,Info=%s,Email=%s ,Contact=%s WHERE id=%s"
            data=(Nom,Info,Email,Contact,id)
            print(data)
            cursor.execute(sql,data)
            mysql.connection.commit()
            cursor.execute("SELECT * FROM prof")
            mysql.connection.commit()
            row = cursor.fetchall()
            print(row)
      return jsonify(row)

      print('\n # Update successful # \n')
    
    except Exception as e:
	      print(e)

	
#######################""          event               ###############""

@app.route("/addevent", methods=["POST"])
def addevent():
            print(request.json)
      
            Nom=request.json['Nom']
            description=request.json['description']
            Date=request.json['Date']

            print("dd")

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM event WHERE Nom= %s', (Nom,))
            account = cursor.fetchone()
            if account:
                msg='event already exists'
                print(account)
            else:
                 data=(Date,Nom,description)
                 cursor.execute('INSERT INTO event  VALUES (NULL, %s, %s, %s)', data)
                 mysql.connection.commit()
                 msg = 'You have successfully addes a event!'

            return jsonify(msg)
@app.route("/getevent", methods=["GET"])
def getevent():
 
    try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM event ')
            event = cursor.fetchall()
            
            return jsonify(event)

    except Exception as e:
		    print(e)
      
@app.route('/update/event/<id>',methods=["PUT"])
def editt_event(id):
    try:
      if request.method == 'PUT':
            Nom=request.json['Nom']
            description=request.json['description']
            Date=request.json['Date']

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            sql="UPDATE event SET Nom=%s,description=%s,Date=%s WHERE id=%s"
            data=(description,Nom,Date)
            cursor.execute(sql,data)
            mysql.connection.commit()
            cursor.execute("SELECT * FROM event")
            mysql.connection.commit()
            row = cursor.fetchall()
            return jsonify(row)

      print('\n # Update successful # \n')
    
    except Exception as e:
	      print(e)

	

@app.route('/delete/event/<id>',methods=['DELETE'])
def delete_event(id):
	try:

		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute("DELETE FROM event WHERE id='"+ id +"'")
		mysql.connection.commit()

		
		cursor.execute("SELECT * FROM event")
		mysql.connection.commit()
		row = cursor.fetchall()
        
		return jsonify(row)
	except Exception as e:
		print(e)
	finally:
		cursor.close()
########################### RESULT ###############""
@app.route("/addresultexam", methods=["POST"])
def addresultexam():
        if request.method == 'POST':
            Etudiant=request.json['Etudiant']
            Moyenne=request.json['Moyenne']
            Remarque=request.json['Remarque']
            nbre_credit=request.json['nbre_credit']



            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM result_exam WHERE Etudiant= %s', [Etudiant])
            account = cursor.fetchone()
            if account:
                msg='resultexam already exists'
            else:
                 data=(Etudiant,Moyenne,Remarque,nbre_credit)
                 cursor.execute('INSERT INTO result_exam VALUES (NULL, %s, %s, %s,%s)', data)
                 mysql.connection.commit()
                 msg = 'You have successfully addes a resultexam!'

            return jsonify(msg)
@app.route("/getresultexam", methods=["GET"])
def getresultexam():
 
    try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM result_exam ')
            resultexam = cursor.fetchall()
            
            return jsonify(resultexam)

    except Exception as e:
		    print(e)
      





@app.route("/addresultpfe", methods=["POST"])
def addresultpfe():
        if request.method == 'POST':
            Nom=request.json['Nom']
            Moyenne=request.json['Moyenne']
            Remarque=request.json['Remarque']


            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM result_pfe WHERE Nom= %s', [Nom])
            account = cursor.fetchone()
            if account:
                msg='resultpfe already exists'
            else:
                 data=(Remarque,Nom,Moyenne)
                 cursor.execute('INSERT INTO result_pfe  VALUES (NULL, %s, %s, %s)', data)
                 mysql.connection.commit()
                 msg = 'You have successfully addes a resultpfe!'

            return jsonify(msg)
@app.route("/getresultpfe", methods=["GET"])
def getresultpfe():
 
    try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM result_pfe ')
            resultpfe = cursor.fetchall()
            
            return jsonify(resultpfe)

    except Exception as e:
		    print(e)
      
@app.route("/addresultpcd", methods=["POST"])
def addresultpcd():
        if request.method == 'POST':
            Nom=request.json['Nom']
            Moyenne=request.json['Moyenne']
            Remarque=request.json['Remarque']


            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM result_pcd WHERE Nom= %s', [Nom])
            account = cursor.fetchone()
            if account:
                msg='resultpcd already exists'
            else:
                 data=(Remarque,Nom,Moyenne)
                 cursor.execute('INSERT INTO result_pcd  VALUES (NULL, %s, %s, %s)', data)
                 mysql.connection.commit()
                 msg = 'You have successfully addes a resultpcd!'

            return jsonify(msg)
@app.route("/getresultpcd", methods=["GET"])
def getresultpcd():
 
    try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM result_pcd ')
            resultpcd = cursor.fetchall()
            
            return jsonify(resultpcd)

    except Exception as e:
		    print(e)
@app.route('/update/result_pcd/<id>',methods=["PUT"])
def editt_result_pcd(id):
    try:
      if request.method == 'PUT':
            Nom=request.json['Nom']
            Moyenne=request.json['Moyenne']
            Remarque=request.json['Remarque']

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            sql="UPDATE result_pcd SET Nom=%s,Moyenne=%s,Remarque=%s WHERE id=%s"
            data=(Remarque,Nom,Moyenne)
            cursor.execute(sql,data)
            mysql.connection.commit()
            cursor.execute("SELECT * FROM result_pcd")
            mysql.connection.commit()
            row = cursor.fetchall()
            return jsonify(row)

      print('\n # Update successful # \n')
    
    except Exception as e:
	      print(e)

	

@app.route('/delete/result_pcd/<id>',methods=['DELETE'])
def delete_result_pcd(id):
	try:

		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute("DELETE FROM result_pcd WHERE id='"+ id +"'")
		mysql.connection.commit()

		
		cursor.execute("SELECT * FROM result_pcd")
		mysql.connection.commit()
		row = cursor.fetchall()
        
		return jsonify(row)
	except Exception as e:
		print(e)
	finally:
		cursor.close() 


@app.route('/update/result_exam/<id>',methods=["PUT"])

def editt_result_exam(id):
    try:
      if request.method == 'PUT':
            Nom=request.json['Nom']
            Moyenne=request.json['Moyenne']
            Remarque=request.json['Remarque']
            nbre_credit=request.json['nbre_credit']

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            sql="UPDATE result_exam SET Nom=%s,Moyenne=%s,Remarque=%s,nbre_credit=%s WHERE id=%s"
            data=(Remarque,Nom,Moyenne,nbre_credit)
            cursor.execute(sql,data)
            mysql.connection.commit()
            cursor.execute("SELECT * FROM result_exam")
            mysql.connection.commit()
            row = cursor.fetchall()
            return jsonify(row)

      print('\n # Update successful # \n')
    
    except Exception as e:
	      print(e)

	

@app.route('/delete/result_exam/<id>',methods=['DELETE'])
def delete_result_exam(id):
	try:

		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute("DELETE FROM result_exam WHERE id='"+ id +"'")
		mysql.connection.commit()

		
		cursor.execute("SELECT * FROM result_exam")
		mysql.connection.commit()
		row = cursor.fetchall()
        
		return jsonify(row)
	except Exception as e:
		print(e)
	finally:
		cursor.close()                
@app.route('/update/result_pfe/<id>',methods=["PUT"])
def editt_result_pfe(id):
    try:
      if request.method == 'PUT':
            Nom=request.json['Nom']
            Moyenne=request.json['Moyenne']
            Remarque=request.json['Remarque']

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            sql="UPDATE result_pfe SET Nom=%s,Moyenne=%s,Remarque=%s WHERE id=%s"
            data=(Remarque,Nom,Moyenne)
            cursor.execute(sql,data)
            mysql.connection.commit()
            cursor.execute("SELECT * FROM result_pfe")
            mysql.connection.commit()
            row = cursor.fetchall()
            return jsonify(row)

      print('\n # Update successful # \n')
    
    except Exception as e:
	      print(e)

	

@app.route('/delete/result_pfe/<id>',methods=['DELETE'])
def delete_result_pfe(id):
	try:

		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute("DELETE FROM result_pfe WHERE id='"+ id +"'")
		mysql.connection.commit()

		
		cursor.execute("SELECT * FROM result_pfe")
		mysql.connection.commit()
		row = cursor.fetchall()
        
		return jsonify(row)
	except Exception as e:
		print(e)
	finally:
		cursor.close()       
       
####################################" SUBJECT "#################"###"

@app.route("/addsujetpfe", methods=["POST"])
def addsujetpfe():
        if request.method == 'POST':
            Nom=request.json['Nom']
            Description=request.json['Description']
            Encadrant=request.json['Encadrant']
            Domaine=request.json['Domaine']
            Mots_clés=request.json['Mots_clés']

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM sujet_pfe WHERE Nom= %s', [Nom])
            account = cursor.fetchone()
            if account:
                msg='sujetpfe already exists'
            else:
                 data=(Description,Nom,Encadrant,Domaine,Mots_clés)
                 cursor.execute('INSERT INTO sujet_pfe  VALUES (NULL, %s, %s, %s, %s, %s)', data)
                 mysql.connection.commit()
                 msg = 'You have successfully addes a sujetpfe!'

            return jsonify(msg)
@app.route("/getsujetpfe", methods=["GET"])
def getsujetpfe():
 
    try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM sujet_pfe ')
            sujetpfe = cursor.fetchall()
            
            return jsonify(sujetpfe)

    except Exception as e:
		    print(e)
@app.route("/addsujetpcd", methods=["POST"])
def addsujetpcd():
        if request.method == 'POST':
            Nom=request.json['Nom']
            Description=request.json['Description']
            Encadrant=request.json['Encadrant']
            Domaine=request.json['Domaine']
            Mots_clés=request.json['Mots_clés']

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM sujet_pcd WHERE Nom= %s', [Nom])
            account = cursor.fetchone()
            if account:
                msg='sujetpcd already exists'
            else:
                 data=(Description,Nom,Encadrant,Domaine,Mots_clés)
                 cursor.execute('INSERT INTO sujet_pcd  VALUES (NULL, %s, %s, %s, %s, %s)', data)
                 mysql.connection.commit()
                 msg = 'You have successfully addes a sujetpcd!'

            return jsonify(msg)
@app.route("/getsujetpcd", methods=["GET"])
def getsujetpcd():
 
    try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM sujet_pcd ')
            sujetpcd = cursor.fetchall()
            
            return jsonify(sujetpcd)

    except Exception as e:
		    print(e)                   
@app.route('/update/sujet_pfe/<id>',methods=["PUT"])
def editt_sujet_pfe(id):
    try:
      if request.method == 'PUT':
            Nom=request.json['Nom']
            Description=request.json['Description']
            Encadrant=request.json['Encadrant']
            Domaine=request.json['Domaine']
            Mots_clés=request.json['Mots_clés']

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            sql="UPDATE sujet_pfe SET Nom=%s,Mots_clés=%s,Domaine=%s Encadrant=%s Description=%s WHERE id=%s"
            data=(Description,Nom,Encadrant,Domaine,Mots_clés)
            cursor.execute(sql,data)
            mysql.connection.commit()
            cursor.execute("SELECT * FROM sujet_pfe")
            mysql.connection.commit()
            row = cursor.fetchall()
            return jsonify(row)

      print('\n # Update successful # \n')
    
    except Exception as e:
	      print(e)

	

@app.route('/delete/sujet_pfe/<id>',methods=['DELETE'])
def delete_sujet_pfe(id):
	try:

		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute("DELETE FROM sujet_pfe WHERE id='"+ id +"'")
		mysql.connection.commit()

		
		cursor.execute("SELECT * FROM sujet_pfe")
		mysql.connection.commit()
		row = cursor.fetchall()
        
		return jsonify(row)
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
@app.route('/update/sujet_pcd/<id>',methods=["PUT"])
def editt_sujet_pcd(id):
    try:
      if request.method == 'PUT':
            Nom=request.json['Nom']
            Description=request.json['Description']
            Encadrant=request.json['Encadrant']
            Domaine=request.json['Domaine']
            Mots_clés=request.json['Mots_clés']

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            sql="UPDATE sujet_pfe SET Nom=%s,Mots_clés=%s,Domaine=%s Encadrant=%s Description=%s WHERE id=%s"
            data=(Description,Nom,Encadrant,Domaine,Mots_clés)
            cursor.execute(sql,data)
            mysql.connection.commit()
            cursor.execute("SELECT * FROM sujet_pcd")
            mysql.connection.commit()
            row = cursor.fetchall()
            return jsonify(row)

      print('\n # Update successful # \n')
    
    except Exception as e:
	      print(e)

	

@app.route('/delete/sujet_pcd/<id>',methods=['DELETE'])
def delete_sujet_pcd(id):
	try:

		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute("DELETE FROM sujet_pcd WHERE id='"+ id +"'")
		mysql.connection.commit()

		
		cursor.execute("SELECT * FROM sujet_pcd")
		mysql.connection.commit()
		row = cursor.fetchall()
        
		return jsonify(row)
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
                

########################### ONLINE_MEET ###############""
@app.route("/addonline", methods=["POST"])
def addonline():
        if request.method == 'POST':
            subject=request.json['subject']
            time=request.json['time']
     


            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM online_meet WHERE Subject= %s', [Subject])
            account = cursor.fetchone()
            if account:
                msg='online already exists'
            else:
                 data=(subject,time)
                 cursor.execute('INSERT INTO online_meet  VALUES (NULL, %s, %s)', data)
                 mysql.connection.commit()
                 msg = 'You have successfully addes a online!'

            return jsonify(msg)
@app.route("/getonline", methods=["GET"])
def getonline():
 
    try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM online_meet ')
            online = cursor.fetchall()
            
            return jsonify(online)

    except Exception as e:
		    print(e)
      


@app.route('/update/online_meet/<id>',methods=["PUT"])
def edittonline(id):
    try:
      if request.method == 'PUT':
            subject=request.json['subject']
            time=request.json['time']
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            sql="UPDATE online_meet SET subject=%s,time=%s WHERE id=%s"
            data=(subject,time)
            cursor.execute(sql,data)
            mysql.connection.commit()
            cursor.execute("SELECT * FROM online_meet")
            mysql.connection.commit()
            row = cursor.fetchall()
            return jsonify(row)

      print('\n # Update successful # \n')
    
    except Exception as e:
	      print(e)

	

@app.route('/delete/online_meet/<id>',methods=['DELETE'])
def delete_online_meet(id):
	try:

		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute("DELETE FROM online_meet WHERE id='"+ id +"'")
		mysql.connection.commit()

		
		cursor.execute("SELECT * FROM online_meet")
		mysql.connection.commit()
		row = cursor.fetchall()
        
		return jsonify(row)
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
@app.route("/addpresentiel", methods=["POST"])
def addpresentiel():
        if request.method == 'POST':
            subject=request.json['subject']
            time=request.json['time']
     


            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM presentiel_meet WHERE Subject= %s', [Subject])
            account = cursor.fetchone()
            if account:
                msg='presentiel already exists'
            else:
                 data=(subject,time)
                 cursor.execute('INSERT INTO presentiel_meet  VALUES (NULL, %s, %s)', data)
                 mysql.connection.commit()
                 msg = 'You have successfully addes a presentiel!'

            return jsonify(msg)
@app.route("/getpresentiel", methods=["GET"])
def getpresentiel():
 
    try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM presentiel_meet ')
            presentiel = cursor.fetchall()
            
            return jsonify(presentiel)

    except Exception as e:
		    print(e)
      

@app.route('/update/presentiel_meet/<id>',methods=["PUT"])
def edittpresentiel(id):
    try:
      if request.method == 'PUT':
            subject=request.json['subject']
            time=request.json['time']
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            sql="UPDATE presentiel_meet SET subject=%s,time=%s WHERE id=%s"
            data=(subject,time)
            cursor.execute(sql,data)
            mysql.connection.commit()
            cursor.execute("SELECT * FROM presentiel_meet")
            mysql.connection.commit()
            row = cursor.fetchall()
            return jsonify(row)

      print('\n # Update successful # \n')
    
    except Exception as e:
	      print(e)

	

@app.route('/delete/presentiel_meet/<id>',methods=['DELETE'])
def delete_presentiel_meet(id):
	try:

		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute("DELETE FROM presentiel_meet WHERE id='"+ id +"'")
		mysql.connection.commit()

		
		cursor.execute("SELECT * FROM presentiel_meet")
		mysql.connection.commit()
		row = cursor.fetchall()
        
		return jsonify(row)
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
########################### temps ###############""
@app.route('/upload-emploi', methods=['POST'])
def upload_emploi():
    if 'emploi' not in request.files:
        return jsonify({"error" : "No image provided."})

    f = request.files['emploi']
    ff=os.path.splitext(f.filename)[0]
    type=os.path.splitext(f.filename)[1]
    f.save(os.path.join(app.config['UPLOAD_FOLDER1'], ff+type))

    return jsonify({"message" : "Image uploaded successfully.", "filename" :  ff+type})
@app.route('/emplois/<path:filename>')                      
def serve_emploi(filename):
    
    return send_from_directory(app.config['UPLOAD_FOLDER1'], filename)




@app.route("/addemploi", methods=["POST"])
def addemploi():
        if request.method == 'POST':

            print(request.json)

            emploi=request.json['emploi']
            classe=request.json['classe']
            semestre=request.json['semestre']



            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM emploitemps WHERE emploi= %s', [emploi])
            account = cursor.fetchone()
            if account:
                msg='exam already exists'
            else:
                 data=(classe,semestre,emploi)
                 cursor.execute('INSERT INTO emploitemps VALUES (NULL, %s , %s, %s)', data)
                 mysql.connection.commit()
                 msg = 'You have successfully addes a exam!'

            return jsonify(msg)
        


@app.route("/getemploi", methods=["GET"])
def getemploi():
 
    try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM emploitemps ')
            exam = cursor.fetchall()
            
            return jsonify(exam)

    except Exception as e:
		    print(e)
      
@app.route('/delete/emploi/<id>',methods=['DELETE'])
def delete_exam(id):
	try:

		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute("DELETE FROM emploitemps WHERE id='"+ id +"'")
		mysql.connection.commit()

		
		cursor.execute("SELECT * FROM emploitemps")
		mysql.connection.commit()
		row = cursor.fetchall()
        
		return jsonify(row)
	except Exception as e:
		print(e)
	finally:
		cursor.close() 


@app.route('/upload-emploiexam', methods=['POST'])
def upload_emploiexam():
    if 'emploi' not in request.files:
        return jsonify({"error" : "No image provided."})

    f = request.files['emploi']
    ff=os.path.splitext(f.filename)[0]
    type=os.path.splitext(f.filename)[1]
    f.save(os.path.join(app.config['UPLOAD_FOLDER2'], ff+type))

    return jsonify({"message" : "Image uploaded successfully.", "filename" :  ff+type})
@app.route('/emploi/<path:filename>')                      
def serve_emploiexam(filename):
    
    return send_from_directory(app.config['UPLOAD_FOLDER2'], filename)


@app.route("/addemploiexam", methods=["POST"])
def addemploiexam():
        if request.method == 'POST':

            print(request.json)
            type=request.json['type']

            emploi=request.json['emploi']
            classe=request.json['classe']
            semestre=request.json['semestre']



            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM emploiexam WHERE emploi= %s', [emploi])
            account = cursor.fetchone()
            if account:
                msg='exam already exists'
            else:
                 data=(type,classe,semestre,emploi)
                 cursor.execute('INSERT INTO emploiexam VALUES (NULL, %s , %s, %s,%s)', data)
                 mysql.connection.commit()
                 msg = 'You have successfully addes a exam!'

            return jsonify(msg)
        


@app.route("/getemploiexam", methods=["GET"])
def getemploiexam():
 
    try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM emploiexam ')
            exam = cursor.fetchall()
            
            return jsonify(exam)

    except Exception as e:
		    print(e)
      



@app.route('/update/emploiexam/<id>',methods=["PUT"])
def edittexam(id):
    try:
      if request.method == 'PUT':
            schedule=request.json['schedule']
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            sql="UPDATE emploiexam SET schedule=%s WHERE id=%s"
            data=(schedule)
            cursor.execute(sql,data)
            mysql.connection.commit()
            cursor.execute("SELECT * FROM emploiexam")
            mysql.connection.commit()
            row = cursor.fetchall()
            return jsonify(row)

      print('\n # Update successful # \n')
    
    except Exception as e:
	      print(e)

	

@app.route('/delete/emploiexam/<id>',methods=['DELETE'])
def delete_emploiexam(id):
	try:

		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute("DELETE FROM emploiexam WHERE id='"+ id +"'")
		mysql.connection.commit()

		
		cursor.execute("SELECT * FROM emploiexam")
		mysql.connection.commit()
		row = cursor.fetchall()
        
		return jsonify(row)
	except Exception as e:
		print(e)
	finally:
		cursor.close() 







""" 






@app.route("/addexam", methods=["POST"])
def addexam():
        if request.method == 'POST':
            schedule=request.json['schedule']
     


            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM exam WHERE schedule= %s', [schedule])
            account = cursor.fetchone()
            if account:
                msg='exam already exists'
            else:
                 data=(schedule)
                 cursor.execute('INSERT INTO exam VALUES (NULL, %s)', data)
                 mysql.connection.commit()
                 msg = 'You have successfully addes a exam!'

            return jsonify(msg)
@app.route("/getexam", methods=["GET"])
def getexam():
 
    try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM exam ')
            exam = cursor.fetchall()
            
            return jsonify(exam)

    except Exception as e:
		    print(e)
      


@app.route("/addds", methods=["POST"])
def addds():
        if request.method == 'POST':
            schedule=request.json['schedule']
     


            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM ds WHERE schedule= %s', [schedule])
            account = cursor.fetchone()
            if account:
                msg='ds already exists'
            else:
                 data=(schedule)
                 cursor.execute('INSERT INTO ds VALUES (NULL, %s)', data)
                 mysql.connection.commit()
                 msg = 'You have successfully addes a ds!'

            return jsonify(msg)
@app.route("/getds", methods=["GET"])
def getds():
 
    try:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM ds ')
            ds = cursor.fetchall()
            
            return jsonify(ds)

    except Exception as e:
		    print(e)
      


@app.route('/update/exam/<id>',methods=["PUT"])
def edittexam(id):
    try:
      if request.method == 'PUT':
            schedule=request.json['schedule']
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            sql="UPDATE exam SET schedule=%s WHERE id=%s"
            data=(schedule)
            cursor.execute(sql,data)
            mysql.connection.commit()
            cursor.execute("SELECT * FROM exam")
            mysql.connection.commit()
            row = cursor.fetchall()
            return jsonify(row)

      print('\n # Update successful # \n')
    
    except Exception as e:
	      print(e)

	

@app.route('/delete/exam/<id>',methods=['DELETE'])
def delete_exam(id):
	try:

		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute("DELETE FROM exam WHERE id='"+ id +"'")
		mysql.connection.commit()

		
		cursor.execute("SELECT * FROM exam")
		mysql.connection.commit()
		row = cursor.fetchall()
        
		return jsonify(row)
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
@app.route('/update/ds/<id>',methods=["PUT"])
def edittds(id):
    try:
      if request.method == 'PUT':
            schedule=request.json['schedule']
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            sql="UPDATE ds SET schedule=%s WHERE id=%s"
            data=(schedule)
            cursor.execute(sql,data)
            mysql.connection.commit()
            cursor.execute("SELECT * FROM ds")
            mysql.connection.commit()
            row = cursor.fetchall()
            return jsonify(row)

      print('\n # Update successful # \n')
    
    except Exception as e:
	      print(e)

	

@app.route('/delete/ds/<id>',methods=['DELETE'])
def delete_ds(id):
	try:

		cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute("DELETE FROM ds WHERE id='"+ id +"'")
		mysql.connection.commit()

		
		cursor.execute("SELECT * FROM ds")
		mysql.connection.commit()
		row = cursor.fetchall()
        
		return jsonify(row)
	except Exception as e:
		print(e)
	finally:
		cursor.close() """
if __name__ == "__main__":
    app.run(debug=True,port=5001)