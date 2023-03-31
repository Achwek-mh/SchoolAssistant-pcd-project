@app.route('/update/result_exam/<id>',methods=["PUT"])
def editt_result_exam(id):
    try:
      if request.method == 'PUT':
            Nom=request.json['Nom']
            Moyenne=request.json['Moyenne']
            Remarque=request.json['Remarque']

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            sql="UPDATE result_exam SET Nom=%s,Moyenne=%s,Remarque=%s WHERE id=%s"
            data=(Remarque,Nom,Moyenne)
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