# 《载歌在谷》志愿者社区官方网站
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/c7624c6e88564a0988cb2a0dd82ebd85)](https://www.codacy.com/gh/zgzgorg/yj.zgzg.io/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=zgzgorg/yj.zgzg.io&amp;utm_campaign=Badge_Grade)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/zgzgorg/yj.zgzg.io/main.svg)](https://results.pre-commit.ci/latest/github/zgzgorg/yj.zgzg.io/main)

The Website is served at [zgzg.io](http://zgzg.io/).

The Website is statically generated with [Jekyll](https://jekyllrb.com/). To serve it locally, run:

```shell
bundle exec jekyll serve
```


## Contributing
This repo uses [pre-commit hooks](https://pre-commit.com/) to automate many checks upon making a git commit. (See `.pre-commit-config.yaml` for a list of all hooks enabled.)

Assuming you have `pre-commit` installed (perhaps via `brew install pre-commit`), after cloning this repo to your local machine, you need to execute this command in the root directory of this repo:

```shell
pre-commit install
```

One of the hooks use the [ESLint](https://eslint.org/) tool to check JavaScript files, including enforcing the [Google JavaScript Code Style](https://google.github.io/styleguide/jsguide.html). (See `.eslintrc.json` for the exact config.) As a [npm package](https://www.npmjs.com/), ESLint is installed via npm and specified in the `package.json`.

This website uses the [Serif](https://github.com/zerostaticthemes/jekyll-serif-theme) theme by [Robert Austin](https://github.com/zerostaticthemes).

File organization:
- `assets/js/sidenotes.js` is a pure-JavaScript plugin that puts `.footnotes` into `#sidebar`, aligning each piece of note at their corresponding superscript.
- `_data/data.yml` defines almost all the information that you see in the website.

## LICENSE
The MIT License (MIT).
