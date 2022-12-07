# 《载歌在谷》志愿者社区官方网站
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
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
- `pages`：这里存放了每个页面的内容。每个页面都是一个单独的 Markdown 文本文档。在每个文件开头，有个符合 YAML 语法的区块，叫“[front matter](https://jekyllrb.com/docs/front-matter/)“，是会被 Jekyll 特殊处理的“元数据”（metadata）。元数据包括（显示在浏览器标签页卡片上的）标题、布局（layout）名称等。对于布局，大部分的页面都可以使用 `layout: page`（例如[《关于我们》](https://github.com/zgzgorg/yj.zgzg.io/blob/68c1e9f1d7072eda10a20c168512daa451b29a22/pages/about.md?plain=1#L3)、[《常见问题》](https://github.com/zgzgorg/yj.zgzg.io/blob/68c1e9f1d7072eda10a20c168512daa451b29a22/pages/faq.md?plain=1#L3)）。
- `_data`：这里存放了任何需要被 enumerate （“枚举”/“罗列”/“用循环读出”）出来的信息。每个文件都是一个 YAML 文件。例如：
  - `data.yml`：定义了网站顶栏、底栏应该有哪些链接；我们有哪些伙伴社区、赞助商；春晚板块有哪些节目；歌手赛有哪些节目；云集板块有哪些栏目…… **这是最主要的、最杂的数据文件。** 当某个列表太大时，您也可以选择把它单独拆出来、成为一个单独的文件，就像下面两项这样👇
  - `past-events.yml`：定义了[《往届回顾》](https://www.zgzg.io/past-events/)页面的内容。
  - `trailer-images.yml`：罗列了一些春晚宣传片的拍摄花絮照片。

⚠️ **注意**：本代码库虽然包含一个 `images` 文件夹，但它仅应该被用来存放 svg 等源代码格式的图片。若需要存放 jpg、png 等二进制格式的图片，请使用我们自己的 Cloudinary 服务。

### 如果你想要开发网站功能
- `_layouts`：当朴素的 `layout: page` 难以满足您的表达需求时，您可以创建新的 layout，存放于这里。请参见下文“如何自由排版”一节。
- `_includes`：存放可复用的一些元件。复用可以发生在：
  - 几页之间。例如：**赞助商列表**（`_includes/sponsor-section.html`）被复用于歌手赛、游园、春晚等页面底部。
  - 一页之内。例如：**栏目卡片**（`_includes/programme.html`）被复用于首页。
  - 其他可复用的元件之内。例如，上述**栏目卡片**也在**云集节目列表**（`_includes/programmes.html`）里被复用：
    <img width="800" alt="image" src="https://user-images.githubusercontent.com/594058/194156682-19832792-da81-4f84-bcb7-a43cc2c3e5cf.png">
- `assets`：存放了一些脚本和样式表文件。
  - `assets/css/style.scss`：许多仅对《载歌在谷》有意义的样式（与“对其他网站也有用”相对），都被存放到了这里。如春晚横幅：https://github.com/zgzgorg/yj.zgzg.io/blob/d11235a52359996f299a1bdab37669251c10d21c/assets/css/style.scss#L357-L364
  - `assets/js/sidenotes.js`： is a pure-JavaScript plugin that puts `.footnotes` into `#sidebar`, aligning each piece of note at their corresponding superscript, developed by [@tslmy](https://github.com/tslmy).
- `_sass`：这里存放各种对其他网站也有复用意义的样式表。其实，本网站采用的即是他人制作的、现成的主题——由 [Robert Austin](https://github.com/zerostaticthemes) 制作的 [Serif](https://github.com/zerostaticthemes/jekyll-serif-theme)。

本网站托管于 [Netlify](https://www.netlify.com/) 之上，域名为 [zgzg.io](https://zgzg.io/)。请参见 [zgzg.link/site-notes](https://zgzg.link/site-notes) 更多信息，包括《载歌在谷》的所有网络服务资源、各代网站特点及制作背景等。（仅限内部访问。）

#### 如何自由地排版
当朴素的 `layout: page` 难以满足您的表达需求时，您可以创建新的 layout。

假设我们想做一个[《春晚》](https://www.zgzg.io/gala/)页面。通常，我们只需要创建一个 `pages/gala.md` 来提供内容。但是，假设这次我们想要做一些复杂的结构，如图所示：

![](https://user-images.githubusercontent.com/594058/194150455-816766bc-dd14-4b6f-9f59-4f2136b24fca.jpeg)

我们首先要做的是，在 `pages/gala.md` 的 front matter 上写明“请用一个叫 gala 的 layout 来渲染这个文档，而不是默认的叫 page 的那个 layout”：

https://github.com/zgzgorg/yj.zgzg.io/blob/d11235a52359996f299a1bdab37669251c10d21c/pages/gala.md?plain=1#L3

接下来，我们创建一个 `_layouts/gala.html` 文件。虽然这是一个 HTML 文档，但是我们依然可以写入 front matter。在它的 front matter 里，我们写“请把这个 layout 嵌套在叫 default 的那个 layout 里”：

https://github.com/zgzgorg/yj.zgzg.io/blob/d11235a52359996f299a1bdab37669251c10d21c/_layouts/gala.html#L1-L3

接下来的工作，就是常见的“写 HTML”了。其实，我们写的不会是纯粹的 HTML，而是一种叫 [Liquid](https://jekyllrb.com/docs/liquid/) 的“模板语言”（templating language）。模板语言提供一些高阶功能，比如引用一些模块。例如，在现今的 `_layouts/gala.html` 底部，我们就有引用两个模块：

https://github.com/zgzgorg/yj.zgzg.io/blob/d11235a52359996f299a1bdab37669251c10d21c/_layouts/gala.html#L32-L33

这些模块存放于 `_includes/` 文件夹下。例如，上面引用的第一个模块，就在 `_includes/galalist.html`：

https://github.com/zgzgorg/yj.zgzg.io/blob/d11235a52359996f299a1bdab37669251c10d21c/_includes/galalist.html#L1-L14

这个模块很好地体现了 Jekyll 里的“枚举”该怎么用。注意这一行：

https://github.com/zgzgorg/yj.zgzg.io/blob/d11235a52359996f299a1bdab37669251c10d21c/_includes/galalist.html#L7

它说：“请在本网站（`site`）的 `data` 文件夹下，找到叫 `data` 的 YAML 文件，读取其中的 `galalist` 列表。对于其中每个项目（以 `pic` 指代），重复渲染下述内容“。这里所指的”下述内容“，即是：

https://github.com/zgzgorg/yj.zgzg.io/blob/d11235a52359996f299a1bdab37669251c10d21c/_includes/galalist.html#L8-L12

它说：

> 放置一个 `galalist-section` 类型的分区（**div**ision，`div`）。在里面放：
> * 一个图片（`img`），图片链接为 `pic.image`；
> * 在那之后放一个三级标题（`h3`），内容为 `pic.title`；
> * 最后，把 `pic.description` 直接放上去。

这里，`galalist-section` 和 `galalist-pic` 是用来排版的。它们所对应的 CSS 规则在这里：

https://github.com/zgzgorg/yj.zgzg.io/blob/d11235a52359996f299a1bdab37669251c10d21c/assets/css/style.scss#L184-L190

（⚠️**注意**：我们采用 [SCSS](https://sass-lang.com/) 作为“样式语言”（styling language）。它是 CSS 的一种超集（superset）。）

## LICENSE
The MIT License (MIT).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="http://myli.page"><img src="https://avatars.githubusercontent.com/u/594058?v=4?s=100" width="100px;" alt="Ming"/><br /><sub><b>Ming</b></sub></a><br /><a href="#infra-tslmy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/zgzgorg/yj.zgzg.io/commits?author=tslmy" title="Tests">⚠️</a> <a href="https://github.com/zgzgorg/yj.zgzg.io/commits?author=tslmy" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/xubowenhaoren"><img src="https://avatars.githubusercontent.com/u/20229080?v=4?s=100" width="100px;" alt="Bowen Xu"/><br /><sub><b>Bowen Xu</b></sub></a><br /><a href="https://github.com/zgzgorg/yj.zgzg.io/commits?author=xubowenhaoren" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/rtq998916"><img src="https://avatars.githubusercontent.com/u/92650213?v=4?s=100" width="100px;" alt="rtq998916"/><br /><sub><b>rtq998916</b></sub></a><br /><a href="https://github.com/zgzgorg/yj.zgzg.io/commits?author=rtq998916" title="Code">💻</a></td>
      <td align="center"><a href="http://floraxue.github.io"><img src="https://avatars.githubusercontent.com/u/5152856?v=4?s=100" width="100px;" alt="Flora Xue"/><br /><sub><b>Flora Xue</b></sub></a><br /><a href="https://github.com/zgzgorg/yj.zgzg.io/commits?author=floraxue" title="Code">💻</a> <a href="https://github.com/zgzgorg/yj.zgzg.io/pulls?q=is%3Apr+reviewed-by%3Afloraxue" title="Reviewed Pull Requests">👀</a></td>
      <td align="center"><a href="https://github.com/ckt624"><img src="https://avatars.githubusercontent.com/u/13848196?v=4?s=100" width="100px;" alt="Kongtao Chen"/><br /><sub><b>Kongtao Chen</b></sub></a><br /><a href="https://github.com/zgzgorg/yj.zgzg.io/commits?author=ckt624" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
