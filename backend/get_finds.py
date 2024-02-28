import sqlite3

def get_finds():
    findlist = []
    con = sqlite3.connect("../database/shroomscout")
    cur = con.cursor()
    cur.execute("SELECT * FROM findLog")
    rows = cur.fetchall()
    columns = [column[0] for column in cur.description]
    for row in rows:
        row_dict = dict(zip(columns, row))
        findlist.append(row_dict)
    con.close()
    return {"data": findlist}

if __name__ == "__main__":
    print(get_finds())