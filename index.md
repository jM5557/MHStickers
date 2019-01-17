---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

<div id = "main_wrapper">
	
	<div id="sidebar">

		<button id="sticker_toggle">Display Inline</button>

		{% include instructions.html %}

	</div>

	<div id = "side_content">

	{% assign i = 1 %}
	{% for image in site.static_files %}
		{% if image.path contains '/img/stickers' %}
		<div class="sticker_wrapper">
			<img src="{{ site.baseurl }}{{ image.path }}" alt="image" class = "sticker__img" />
			
			{% if i < 10 %}
				<input class = "sticker__text" value = "[](//#0{{ i }})" readonly/>
				{% else %}
				<input class = "sticker__text" value = "[](//#{{ i }})" readonly />
			{% endif %}
		</div>
			
		{% assign i = i | plus: 1 %}
		{% endif %}
	{% endfor %}

	</div>

</div>