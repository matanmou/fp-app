"""
Insert the 2026-27 Israeli Premier League (Ligat Ha'Al) teams into a MySQL table
created by a TypeORM entity with columns: id, teamName, pColor, sColor.

Install the driver first:
    pip install mysql-connector-python
"""

import importlib

try:
    mysql_connector = importlib.import_module("mysql.connector")
except ModuleNotFoundError as err:
    if err.name == "mysql":
        raise SystemExit(
            "MySQL connector is not installed. Run: pip install mysql-connector-python"
        ) from err
    raise

# --- Connection settings: edit these ---------------------------------------
DB_CONFIG = {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "matanmo93",
    "database": "ipldb",
}

# TypeORM names the table after the entity class in lowercase by default
# (e.g. class Team -> table "team"). Change this if yours differs.
TABLE_NAME = "iplpredict_teams"

# --- Teams: (teamName, primary color, secondary color) as hex codes --------
TEAMS = [
    ("Maccabi Tel Aviv",     "#FFD700", "#0038A8"),  # yellow / blue
    ("Maccabi Haifa",        "#00843D", "#FFFFFF"),  # green / white
    ("Hapoel Be'er Sheva",   "#E30613", "#FFFFFF"),  # red / white
    ("Beitar Jerusalem",     "#FFD700", "#000000"),  # yellow / black
    ("Hapoel Tel Aviv",      "#E30613", "#FFFFFF"),  # red / white
    ("Hapoel Haifa",         "#E30613", "#FFFFFF"),  # red / white
    ("Hapoel Jerusalem",     "#E30613", "#000000"),  # red / black
    ("Hapoel Petah Tikva",   "#0055A4", "#FFFFFF"),  # blue / white
    ("Maccabi Netanya",      "#FFD700", "#000000"),  # yellow / black
    ("Bnei Sakhnin",         "#E30613", "#FFFFFF"),  # red / white
    ("Ironi Kiryat Shmona",  "#0055A4", "#FFFFFF"),  # blue / white
    ("Ironi Tiberias",       "#5BC2E7", "#FFFFFF"),  # sky blue / white
    ("Maccabi Petah Tikva",  "#0055A4", "#FFFFFF"),  # blue / white (promoted)
    ("Hapoel Ramat Gan",     "#E30613", "#FFFFFF"),  # red / white (promoted)
]


def main():
    conn = mysql_connector.connect(**DB_CONFIG)
    cursor = conn.cursor()

    inserted, skipped = 0, 0
    try:
        for name, p_color, s_color in TEAMS:
            # Skip teams that are already in the table, so the script is safe to re-run
            cursor.execute(
                f"SELECT 1 FROM `{TABLE_NAME}` WHERE `teamName` = %s LIMIT 1",
                (name,),
            )
            if cursor.fetchone():
                skipped += 1
                continue

            cursor.execute(
                f"INSERT INTO `{TABLE_NAME}` (`teamName`, `pColor`, `sColor`) "
                f"VALUES (%s, %s, %s)",
                (name, p_color, s_color),
            )
            inserted += 1

        conn.commit()
        print(f"Done: {inserted} inserted, {skipped} already existed.")
    except mysql_connector.Error as err:
        conn.rollback()
        print(f"Error, rolled back: {err}")
    finally:
        cursor.close()
        conn.close()


if __name__ == "__main__":
    main()