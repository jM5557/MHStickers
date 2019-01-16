var _root = document.getElementById('sidebar');

var imgBtns = document.querySelectorAll(".sticker__img");
var imgText = document.querySelectorAll(".sticker__text");
var imgToggle = document.getElementById("sticker_toggle");

var displayInline = false;

// Polyfill from:
// https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode !== null)
          this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

var toggleInlineDisplay = function (arr) {
	
	for (let i = 0; i < arr.length; i++) {

		var str = arr[i].value;

		if (!displayInline && str.indexOf('/i') === -1) {
			str = str.slice(0, 3) + '/i' + str.slice(3);
		}

		else {
			str = str.slice(0, 3) + str.slice(5);
		}

		arr[i].value = str;
	} 

	return;
}

var removeEl = function (rt, _el) {
	rt.removeChild(_el);
}

var displayAlert = function (timer, msg, rt) {
	var el = document.createElement('div');
	el.className = 'alert_box';
	el.innerHTML = msg;
	el.style.animationDuration = timer/1000 + 's';

	rt.appendChild(el);

	window.setTimeout(function () { removeEl(rt, el) }.bind(this, rt, el), timer);
} 

imgToggle.addEventListener('click', function (event) {
	
	toggleInlineDisplay(imgText);

	displayAlert(3000, 'Inline Stickers ' + ((displayInline) ? 'Disabled' : 'Enabled'), _root);

	event.target.className = (displayInline) ? '' : 'enabled';

	displayInline = !displayInline;
});

for (let i = 0; i < imgBtns.length; i++) {

	imgBtns[i].addEventListener('click', function(event) {
		
		var copyTextarea = imgText[i]
		copyTextarea.focus();
		copyTextarea.select();

		displayAlert(1000, 'Sticker Copied!', _root);

		try {

			var outcome = document.execCommand('copy');
			var msg = outcome ? 'Success!' : 'Failed!';

		 	console.log(msg + copyTextarea.value);

		} catch (err) {

			console.log('Failed to copy!');

		}
	});


	
}