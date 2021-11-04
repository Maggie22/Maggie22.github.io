{# 鼠标点击特效 #}
{% if theme.cursor_effect == "love" %}
  <script async src="/js/cursor/clicklove.js"></script>
{% elseif theme.cursor_effect == "text" %}
  <script async src="/js/cursor/text.js"></script>
{% endif %}