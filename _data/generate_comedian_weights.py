#!/usr/bin/env python3
"""
Usage:
    python generate_comedian_weights.py
"""

import json
from datetime import datetime, timedelta

import pytz

DATE_FORMAT = "%Y-%m-%d"

if __name__ == '__main__':
    today_date = datetime.now(pytz.timezone("America/Los_Angeles")).date()
    today = today_date.strftime(DATE_FORMAT)
    half_year_ago = (today_date - timedelta(days=183)).strftime(DATE_FORMAT)
    one_year_ago = (today_date - timedelta(days=365)).strftime(DATE_FORMAT)

    half_year_count = dict()
    one_year_count = dict()
    total_count = dict()
    open_mics = json.load(open("open_mic_records.json"))
    for dt, record in open_mics.items():
        if dt == "pre_2022-04-15":
            for name, count in record.items():
                total_count[name] = total_count.get(name, 0) + count
            continue
        within_half_year = (half_year_ago < dt <= today)
        within_one_year = (one_year_ago < dt <= today)
        has_happened = (dt <= today)
        for name in record.split(","):
            name = name.strip()
            if within_half_year:
                half_year_count[name] = half_year_count.get(name, 0) + 1
            if within_one_year:
                one_year_count[name] = one_year_count.get(name, 0) + 1
            if has_happened:
                total_count[name] = total_count.get(name, 0) + 1

    comedians = json.load(open("comedians.json"))
    for c in comedians:
        name = c["title"]
        c["weight"] = (
            half_year_count.get(name, 0) * 1_000_000
            + one_year_count.get(name, 0) * 1_000
            + total_count.get(name, 0)
        )
    with open("comedians.json", "w") as file:
        file.write(json.dumps(comedians, indent=4, ensure_ascii=False) + "\n")
        file.close()
