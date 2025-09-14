---
layout: page
title: 社区公告
permalink: /announce/
---

<ul>
  {% assign notices = site.announce | sort: "date" | reverse %}
  {% for notice in notices %}
    <li>
      <a href="{{ notice.url }}">{{ notice.title }}</a>
      <span>{{ notice.date | date: "%Y-%m-%d" }}</span>
    </li>
  {% endfor %}
</ul> 