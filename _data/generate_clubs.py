#!/usr/bin/env python3
"""
Download the club index spreadsheet as CSV, then run this script.

Usage:
  generate_clubs.py <input_path> <output_path>
"""

import pandas as pd
import numpy as np
import json

from docopt import docopt


if __name__ == '__main__':
    arguments = docopt(__doc__)

    df = pd.read_csv(arguments["<input_path>"])

    df.rename(columns={
        "地区": "physical_location",
        "名称": "name_chinese",
        "英文名": "name_english",
        "观众联系方式": "contacts_audiences",
        "演员报名方式": "contacts_comedians",
        "商务合作联系方式": "contacts_business",
        "地址": "physical_address",
        "专长（若有）": "specialities",
        "建立时间": "date_founded",
        "官方网站": "website",
        "Logo 文件（最好是SVG）": "logo",
    }, inplace=True)

    df.dropna(subset=["name_chinese"], inplace=True)
    df = df.loc[df["physical_location"] != 'comment']
    df["contacts_audiences"] = df["contacts_audiences"].str.split("\n")
    df["contacts_comedians"] = df["contacts_comedians"].str.split("\n")
    df["contacts_business"] = df["contacts_business"].str.split("\n")

    data = df.to_dict(orient="records")

    data = [{k: v for k, v in x.items() if v is not np.nan} for x in data]

    with open(arguments["<output_path>"], "w") as f:
        json.dump(data, f, indent=4, sort_keys=True, allow_nan=False)
        f.write("\n")
