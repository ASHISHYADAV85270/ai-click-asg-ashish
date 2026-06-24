"""Run this script to create and seed the SQLite database."""

import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "mentions.db")
SEED_PATH = os.path.join(os.path.dirname(__file__), "..", "seed_data.sql")


def seed():
    conn = sqlite3.connect(DB_PATH)

    with open(SEED_PATH) as f:
        conn.executescript(f.read())

    conn.close()

if __name__ == "__main__":
    seed()
