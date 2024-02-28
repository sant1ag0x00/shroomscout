import sqlite3

def get_finds():
    findlist = []
    con = sqlite3.connect("../database/shroomscout")
    cur = con.cursor()
    cur.execute("SELECT * FROM findLog")
    rows = cur.fetchall()
    # Fetch the column names from the cursor
    columns = [column[0] for column in cur.description]
    for row in rows:
        # Create a dictionary for each row with column names as keys
        row_dict = dict(zip(columns, row))
        findlist.append(row_dict)
    con.close()
    return findlist



if __name__ == "__main__":
    print(get_finds())