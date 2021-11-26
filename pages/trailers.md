---
title: 拍摄花絮
permalink: /trailer/
layout: page-no-sidebar
---
<div class="row">
{% for image in site.data.trailer-images %}
  <img class="col-12 mb-6 col-md-6 col-lg-4 align-self-center" src="{{image.src}}"/>
{% endfor %}
</div>
