#!/usr/bin/env python3
"""
Download the team roster spreadsheet as CSV, then run this script.

Usage:
  generate_team.py <input_path> <output_path>
"""

import pandas as pd
import json

from docopt import docopt


if __name__ == '__main__':
    arguments = docopt(__doc__)

    df = pd.read_csv(arguments["<input_path>"])

    df.rename(columns={
        "分组": "group",
        "姓名": "name",
        "艺名": "nickname",
        "头衔": "title",
        "介绍": "description",
        "照片": "image",
    }, inplace=True)

    df.dropna(subset=["group"], inplace=True)
    df = df.loc[df["group"] != 'comment']

    df["nickname"].fillna(df["name"], inplace=True)
    df.drop("name", axis=1, inplace=True)

    df.fillna({
        "nickname": "佚名",
        "title": "Volunteer",
        "description": "",
        "image": "https://via.placeholder.com/300?text=(%20^_^%20)",
    }, inplace=True)

    data = df.groupby("group").apply(lambda df: df.drop(
        "group", axis=1).to_dict(orient="records")).to_dict()

    with open(arguments["<output_path>"], "w") as f:
        json.dump(data, f, indent=4, sort_keys=True)
        f.write("\n")
