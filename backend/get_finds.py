import sqlite3

def get_finds():
    findlist = []
    con = sqlite3.connect("../database/shroomscout")
    cur = con.cursor()
    cur.execute("SELECT * FROM findLog")
    rows = cur.fetchall()
    for row in rows:
        findlist.append(list(row)) 
    con.close() 
    return findlist


if __name__ == "__main__":
    print(get_finds())