"""
Take a screenshot for the given URL, saving as the given output file.

Usage:
  screenshot.py [--size=<s>] [URL] [FILENAME]
  screenshot.py -h | --help

Options:
  -h --help     Show this screen.
  --size=<s>    Size of image [default: 800].

Arguments:
  URL        URL to take a screenshot for [default: https://myli.page].
  FILENAME  Output filename [default: screenshot.png].
"""

import io

from docopt import docopt
from PIL import Image
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from usp.tree import sitemap_tree_for_homepage
from contextlib import contextmanager


@contextmanager
def init_driver():
    '''See https://stackoverflow.com/a/63508197/1147061.'''
    try:
        options = Options()
        options.headless = True
        driver = webdriver.Chrome(
            ChromeDriverManager().install(), options=options)
        driver.set_window_size(args["SIZE"] * 2, args["SIZE"] * 2)
        yield driver
    finally:
        driver.quit()


if __name__ == "__main__":
    # Read options.
    args = docopt(__doc__)
    if args["URL"] is None:
        args["URL"] = "https://myli.page"
    if args["FILENAME"] is None:
        args["FILENAME"] = "screenshot.png"
    args["SIZE"] = int(args["--size"])

    # Get the sitemap hierarchy found on the website.
    tree = sitemap_tree_for_homepage(args["URL"])
    for page in tree.all_pages():
        print(page.url.removeprefix(args["URL"]))
    exit()
    with init_driver() as driver:
        for page in tree.all_pages():
            # Take screenshot.
            driver.get(page.url)
            image = driver.get_screenshot_as_png()
            # Resize the screenshot.
            image = Image.open(io.BytesIO(image))
            image.thumbnail((args["SIZE"], args["SIZE"]))
            image.save(args["FILENAME"])
