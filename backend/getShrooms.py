import sqlite3

def getShrooms():
    shroomlist = []
    con = sqlite3.connect("../database/shroomscout")
    cur = con.cursor()
    cur.execute("SELECT * FROM mushrooms")
    rows = cur.fetchall()
    for row in rows:
        shroomlist.append(list(row)) 
    print(shroomlist)
    con.close() 
    return shroomlist


if __name__ == "__main__":
    print(getShrooms())