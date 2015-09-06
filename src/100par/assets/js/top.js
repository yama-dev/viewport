'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TOP = (function () {
	function TOP() {
		_classCallCheck(this, TOP);

		this.CurrentURL = location.href;
		this.Init();
		this.SpInit();
		this.BindFunc();
	}

	TOP.prototype.BindFunc = function BindFunc() {
		var _this = this;

		$(window).on('scroll', function () {});
		$(window).on('load', function () {
			_this.TopSlider();
		});
	};

	TOP.prototype.Init = function Init() {
		var _that = this;
		this.DocH = document.body.clientHeight ? document.body.clientHeight / this.AndroidPar : $(document).height() / this.AndroidPar;
		this.DocW = document.body.clientWidth ? document.body.clientWidth / this.AndroidPar : $(document).width() / this.AndroidPar;
	};

	TOP.prototype.SpInit = function SpInit() {
		this.WinH = window.innerHeight ? window.innerHeight : $(window).height();
		this.WinW = window.innerWidth ? window.innerWidth : $(window).width();
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