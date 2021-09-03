# Website for the _Chinese Comedy at Silicon Valley_
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/ggtkx/ggtkx.github.io/main.svg)](https://results.pre-commit.ci/latest/github/ggtkx/ggtkx.github.io/main)

The Website is deployed to [GitHub pages](https://ggtkx.github.io/) and is served at [ggtkx.org](http://ggtkx.org/en/).

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
- `_team/` contains Markdown documents for each member of the core team.

Other technical details:
- `pull-sheet/` hosts the mechanism that updates `_data/comedians.json` from the roster.
- `sidenotes.js` is a pure-JavaScript plugin that puts `.footnotes` into `#sidebar`, aligning each piece of note at their corresponding superscript.
- This website uses the [Serif](https://github.com/zerostaticthemes/jekyll-serif-theme) theme by [Robert Austin](https://github.com/zerostaticthemes).

## LICENSE
The MIT License (MIT).
