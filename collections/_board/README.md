# _board 目录说明

本目录用于存放 Jekyll collection 类型的理事会公告（board notices）。

## 为什么用下划线？

Jekyll 约定：下划线开头的目录（如 `_board/`）会被识别为 collection（集合），这样可以用 `site.board` 变量在模板中遍历所有公告，并获得更灵活的内容管理能力。

## 如何配置

在 `_config.yml` 里添加：

```yaml
collections:
  board:
    output: true
    permalink: /board/:name/
```

## 如何添加公告

1. 在本目录下新建 md 文件，每个文件代表一条公告。
2. 文件头部需有 YAML front matter，例如：

```markdown
---
title: 2025年6月18日理事会公告
date: 2025-06-18
---
正文内容……
```

## 如何生成公告列表页

在根目录下新建 `board/index.md`，内容如下：

```markdown
---
layout: default
title: 理事会公告
---

<ul>
  {% assign notices = site.board | sort: "date" | reverse %}
  {% for notice in notices %}
    <li>
      <a href="{{ notice.url }}">{{ notice.title }}</a>
      <span>{{ notice.date | date: "%Y-%m-%d" }}</span>
    </li>
  {% endfor %}
</ul>
```

## 参考
- [Jekyll 官方文档：Collections](https://jekyllrb.com/docs/collections/) 