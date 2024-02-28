import sqlite3

def get_shrooms():
    shroomlist = []
    con = sqlite3.connect("../database/shroomscout")
    cur = con.cursor()
    cur.execute("SELECT * FROM mushrooms")
    rows = cur.fetchall()
    for row in rows:
        shroomlist.append(list(row)) 
    con.close() 
    return shroomlist


if __name__ == "__main__":
    print(get_shrooms())