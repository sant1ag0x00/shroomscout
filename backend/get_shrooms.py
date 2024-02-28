import sqlite3

def get_shrooms():
    shroomlist = []
    con = sqlite3.connect("../database/shroomscout")
    cur = con.cursor()
    cur.execute("SELECT * FROM mushrooms")
    rows = cur.fetchall()
    columns = [column[0] for column in cur.description]
    for row in rows:
        row_dict = dict(zip(columns, row))
        shroomlist.append(row_dict)
    con.close()
    return {"data": shroomlist}


if __name__ == "__main__":
    print(get_shrooms())