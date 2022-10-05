# 《载歌在谷》志愿者社区官方网站
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/c7624c6e88564a0988cb2a0dd82ebd85)](https://www.codacy.com/gh/zgzgorg/yj.zgzg.io/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=zgzgorg/yj.zgzg.io&amp;utm_campaign=Badge_Grade)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/zgzgorg/yj.zgzg.io/main.svg)](https://results.pre-commit.ci/latest/github/zgzgorg/yj.zgzg.io/main)

为《载歌在谷》志愿者社区，本代码库托管[其官方网站](https://zgzg.io/)的源代码。

## 贡献指南

想要开发这个网站，需要用到以下工具：

### 在本地渲染该网站
本网站使用 [Jekyll](https://jekyllrb.com/) 渲染。安装 Jekyll 之后，您可以运行以下命令来在您的电脑上（“本地”）打开这个网站：

```shell
bundle exec jekyll serve
```

### Pre-commit hooks
本代码库使用 [pre-commit hooks](https://pre-commit.com/) 来自动化一些琐事。（请参见 `.pre-commit-config.yaml` 来熟悉一下都启用了哪些 hooks。）

Assuming you have `pre-commit` installed (perhaps via `brew install pre-commit`), after cloning this repo to your local machine, you need to execute this command in the root directory of this repo:

```shell
pre-commit install
```

One of the hooks use the [ESLint](https://eslint.org/) tool to check JavaScript files, including enforcing the [Google JavaScript Code Style](https://google.github.io/styleguide/jsguide.html). (See `.eslintrc.json` for the exact config.) As a [npm package](https://www.npmjs.com/), ESLint is installed via npm and specified in the `package.json`.

## 本代码库结构简介
根据您想要贡献的内容的类型划分，您可能想要专注于认识不同的部分。

### 如果你想要加入、更新内容
对于内容贡献者来说，最重要的几个文件夹是：
- `pages`：这里存放了每个页面的内容。每个页面都是一个单独的 Markdown 文本文档。在每个文件开头，有个符合 YAML 语法的区块，叫“[Front Matter](https://jekyllrb.com/docs/front-matter/)“，是会被 Jekyll 特殊处理的“元数据”（metadata）。元数据包括（显示在浏览器标签页卡片上的）标题、布局（layout）名称等。对于布局，大部分的页面都可以使用 `layout: page`（例如[《关于我们》](https://github.com/zgzgorg/yj.zgzg.io/blob/68c1e9f1d7072eda10a20c168512daa451b29a22/pages/about.md?plain=1#L3)、[《常见问题》](https://github.com/zgzgorg/yj.zgzg.io/blob/68c1e9f1d7072eda10a20c168512daa451b29a22/pages/faq.md?plain=1#L3)）。
- `_data`：这里存放了任何需要被 enumerate （“枚举”/“罗列”/“用循环读出”）出来的信息。每个文件都是一个 YAML 文件。例如：
  - `data.yml`：定义了网站顶栏、底栏应该有哪些链接；我们有哪些伙伴社区、赞助商；春晚板块有哪些节目；歌手赛有哪些节目；云集板块有哪些栏目…… **这是最主要的、最杂的数据文件。** 当某个列表太大时，您也可以选择把它单独拆出来、成为一个单独的文件，就像下面两项这样👇
  - `past-events.yml`：定义了[《往届活动》](https://www.zgzg.io/past-events/)页面的内容。
  - `trailer-images.yml`：罗列了一些春晚宣传片的拍摄花絮照片。

⚠️ **注意**：本代码库虽然包含一个 `images` 文件夹，但它已经被弃用了。若需要存放照片，请使用我们自己的 Cloudinary 服务。

### 如果你想要开发网站功能
- `_layouts`：当朴素的 `layout: page` 难以满足您的表达需求时，您可以创建新的 layout，存放于这里。
- `assets/js/sidenotes.js` is a pure-JavaScript plugin that puts `.footnotes` into `#sidebar`, aligning each piece of note at their corresponding superscript, developed by [@tslmy](https://github.com/tslmy).

The Website is served at [zgzg.io](https://zgzg.io/) via [Netlify](https://www.netlify.com/).
This website uses the [Serif](https://github.com/zerostaticthemes/jekyll-serif-theme) theme by [Robert Austin](https://github.com/zerostaticthemes).

See [zgzg.link/site-notes](https://zgzg.link/site-notes) for more information, including all websites owned by ZGZG, Netlify access, etc. (Internal access only.)

## LICENSE
The MIT License (MIT).
