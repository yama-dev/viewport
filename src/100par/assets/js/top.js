"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TOP = (function () {
	function TOP() {
		_classCallCheck(this, TOP);

		this.BindFunc();
	}

	TOP.prototype.BindFunc = function BindFunc() {
		var _this = this;

		$(window).on('load', function () {
			_this.TopSlider();
		});
	};

	TOP.prototype.TopSlider = function TopSlider() {
		$("#Glide").glide({
			type: "carousel",
			autoplay: 6000
		});
	};

	return TOP;
})();

$(function () {
	var Top = new TOP();
});