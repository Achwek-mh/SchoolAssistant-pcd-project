""" import mysql.connector
import jsonlines

# Connect to MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="simplebot",
    password ="22098.Achw",
    database="PCD"
)

# Create a cursor object
cursor = db.cursor()



def jsonl_update():
    table=input("donner le nom de la table\n")
# Select all rows from the table
    query = f"SELECT * FROM {table}"
    cursor.execute(query)
    rows = cursor.fetchall()
    # Get the column names from the cursor description
    column_names = [x[0] for x in cursor.description]

    # Create a list of dictionaries to store the rows
    data = []
    for row in rows:
        row_dict = {}
        for i in range(len(column_names)):
            row_dict[column_names[i]] = row[i]
        data.append(row_dict)

    # Write the data to a JSONL file
    with jsonlines.open(f"{table}.jsonl", mode='w') as writer:
        writer.write_all(data)
        
        
        
def base_update():
    # Get the column names from the JSONL file
    jsonl=input("jsonL name : \n")
    with jsonlines.open(f"{jsonl}.jsonl") as f:
        data = list(f)
    column_names = list(data[0].keys())

    # Create the INSERT query with the same number of placeholders as columns
    query = "INSERT INTO event ({}) VALUES ({})".format(
        
        ", ".join(column_names),
        ", ".join(["%s"] * len(column_names))
    )

    # Insert the data into the table
    for row in data:
        values = tuple(row[column] for column in column_names)
        cursor.execute(query, values)
        db.commit()
        
        
choix=0
while choix not in {1,2}:
    print("choose 1 to create a jsonl from base ")
    print("choose 2 to update the base from jsonl")
    choix=int(input())
    if choix==1:
        jsonl_update()
        print("jsonl updated")
    elif choix==2:
        base_update()
        print("base updated")
    else:
        print("invalid do it again")
        
# Close the cursor and database connections
cursor.close()
db.close()
 """

import mysql.connector
import jsonlines

# Connect to MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="simplebot",
    password ="22098.Achw",
    database="PCD"
)

# Create a cursor object
cursor = db.cursor()



def jsonl_update():
    table=input("donner le nom de la table\n")
# Select all rows from the table
    with jsonlines.open(f"professeur (1).jsonl") as f:
        data = list(f)
    print(len(data))

    column_names = list(data[0].keys())
    for  i in range (1,len(data)) :
      print(data[i]['question'])
      query = "UPDATE prof SET Info =({}) where id =({}) ".format (data[i]['reponse'],i)
      print(query)
      cursor.execute(query)
      db.commit()
        
        
  
    # Get the column names from the cursor description
    column_names = [x[0] for x in cursor.description]

    # Create a list of dictionaries to store the rows
    """  data = []
    for row in rows:
        row_dict = {}
        for i in range(len(column_names)):
            row_dict[column_names[i]] = row[i]
        data.append(row_dict)
   """
    # Write the data to a JSONL file
    with jsonlines.open(f"{table}.jsonl", mode='w') as writer:
        writer.write_all(data)
        
        
        
def base_update():
    # Get the column names from the JSONL file
    jsonl=input("jsonL name : \n")
    with jsonlines.open(f"{jsonl}.jsonl") as f:
        data = list(f)
    column_names = list(data[0].keys())

    # Create the INSERT query with the same number of placeholders as columns
    query = "INSERT INTO event ({}) VALUES ({})".format(
        
        ", ".join(column_names),
        ", ".join(["%s"] * len(column_names))
    )

    # Insert the data into the table
    for row in data:
        values = tuple(row[column] for column in column_names)
        cursor.execute(query, values)
        db.commit()
        
        
choix=0
while choix not in {1,2}:
    print("choose 1 to create a jsonl from base ")
    print("choose 2 to update the base from jsonl")
    choix=int(input())
    if choix==1:
        jsonl_update()
        print("jsonl updated")
    elif choix==2:
        base_update()
        print("base updated")
    else:
        print("invalid do it again")
        
# Close the cursor and database connections
cursor.close()
db.close()