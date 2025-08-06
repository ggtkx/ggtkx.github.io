---
layout: page
title: 理事会公告
permalink: /board/
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