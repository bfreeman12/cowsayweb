import sqlite3
import subprocess
import os

# Initialize counter
counter = 0

# Check if the database file exists. If not, create it and initialize the table for fortunes.
if not os.path.isfile('fortune.db'):
    conn = sqlite3.connect('fortune.db')
    c = conn.cursor()
    c.execute("CREATE TABLE fortunes (fortune TEXT UNIQUE);")
    conn.commit()
    conn.close()

while counter < 1000:  # replace 10 with the desired number of iterations
    # Get a new fortune
    new_fortune = subprocess.getoutput('fortune')

    conn = sqlite3.connect('fortune.db')
    c = conn.cursor()

    # Check if the fortune is already in the database
    c.execute("SELECT fortune FROM fortunes WHERE fortune = ?", (new_fortune,))
    data = c.fetchone()

    if data is None:
        # If the fortune is not in the database, insert it
        c.execute("INSERT INTO fortunes (fortune) VALUES (?)", (new_fortune,))
        conn.commit()

    # Increment counter
    counter += 1

conn.close()