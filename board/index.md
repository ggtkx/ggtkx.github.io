---
layout: default
title: 理事会公告
---

<h1>{{ page.title }}</h1>
<ul>
  {% assign notices = site.board | sort: "date" | reverse %}
  {% for notice in notices %}
    <li>
      <a href="{{ notice.url }}">{{ notice.title }}</a>
      <span>{{ notice.date | date: "%Y-%m-%d" }}</span>
    </li>
  {% endfor %}
</ul> 