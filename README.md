# Website for the _Silicomedy 硅谷脱口秀_
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/ggtkx/ggtkx.github.io/main.svg)](https://results.pre-commit.ci/latest/github/ggtkx/ggtkx.github.io/main)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

The Website is deployed to [GitHub pages](https://ggtkx.github.io/) and is served at [ggtkx.org](http://ggtkx.org/en/).

This project works with Ruby 3.1.2 and Jekyll 4.2.0.

The Website is statically generated with [Jekyll](https://jekyllrb.com/). To serve it locally, run:

```shell
bundle exec jekyll serve
```

## Contributing
This repo uses [pre-commit hooks](https://pre-commit.com/) to automate many checks upon making a git commit. (See `.pre-commit-config.yaml` for a list of all hooks enabled.) Assuming you have [Homebrew](https://brew.sh/) installed, you can install the `pre-commit` program via:


```shell
brew install pre-commit
```

Then, install the pre-commit hooks via:

```shell
pre-commit install
```

One of the hooks use the [ESLint](https://eslint.org/) tool to check JavaScript files, including enforcing the [Google JavaScript Code Style](https://google.github.io/styleguide/jsguide.html). (See `.eslintrc.json` for the exact config.) As a [npm package](https://www.npmjs.com/), ESLint is installed via npm and specified in the `package.json`. Install them by:

```shell
npm install
```

Data organization:
- `_data/comedians.json` stores information about each comedian in this club. It is updated automatically to sync up with a Google Sheet.
- `_data/friends.yml` stores links to our friends.
- `pages/` contains Markdown documents for each page.

Other technical details:
- `pull-sheet/` hosts the mechanism that updates `_data/comedians.json` from the roster.
- `sidenotes.js` is a pure-JavaScript plugin that puts `.footnotes` into `#sidebar`, aligning each piece of note at their corresponding superscript.

# References

[Ming](https://github.com/tslmy) has written several articles detailing the engineering aspects of this club:

- [How Engineers Build A Comedy Club - Part I: The Website](https://lmy.medium.com/how-engineers-build-a-comedy-club-part-i-the-website-321b76cc7d4)
- [How Engineers Build A Comedy Club - Part II: Comedian Data](https://lmy.medium.com/how-engineers-build-a-comedy-club-part-ii-comedian-data-9da0ceb8d088)
- [How Engineers Build A Comedy Club - Part III: Videos and Subtitles](https://lmy.medium.com/how-engineers-build-a-comedy-club-part-iii-videos-and-subtitles-3794a273b822)

The first 2 articles are most relevant to this repo.

# Acknowledgements
This website uses:

- these icons from [freeicons.io](https://freeicons.io/):
  - YouTube icon by [Raj Dev](https://freeicons.io/profile/714) on [freeicons.io](https://freeicons.io/).
  - Bilibili icon by [Anu Rocks](https://freeicons.io/profile/730)
  - LinkedIn icon by [Muhammad Haq](https://freeicons.io/profile/823)

- the [Serif](https://github.com/zerostaticthemes/jekyll-serif-theme) theme by [Robert Austin](https://github.com/zerostaticthemes).
- illustrations from the artwork collection, [unDraw](https://undraw.co/illustrations), by [Katerina Limpitsouni](https://twitter.com/ninaLimpi).

# License
The MIT License (MIT).
