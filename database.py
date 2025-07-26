import sqlite3

def create_table():
    connection = sqlite3.connect('expenses.db')
    cursor = connection.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            date TEXT NOT NULL
        )
    ''')

    connection.commit()
    connection.close()

# Run this to create the DB
if __name__ == '__main__':
    create_table()
