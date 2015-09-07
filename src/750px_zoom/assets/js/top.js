'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TOP = (function () {
	function TOP() {
		_classCallCheck(this, TOP);

		this.AndroidPar = 1;
		this.CurrentURL = location.href;
		this.Init();
		this.SpInit();
	}

	TOP.prototype.Init = function Init() {
		var _that = this;
		$(window).on('scroll', function () {});
		this.DocH = document.body.clientHeight ? document.body.clientHeight / this.AndroidPar : $(document).height() / this.AndroidPar;
		this.DocW = document.body.clientWidth ? document.body.clientWidth / this.AndroidPar : $(document).width() / this.AndroidPar;
		this.WinH = window.innerHeight ? window.innerHeight : $(window).height();
		this.WinW = window.innerWidth ? window.innerWidth : $(window).width();
	};

	TOP.prototype.SpInit = function SpInit() {
		var _that = this;
		var agent = navigator.userAgent;
		var contentWidth = 750;
		if (agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1 || agent.search(/iPod/) != -1) {
			var min_scale = Math.round(window.screen.width / contentWidth * 10000) / 10000;
			var max_scale = Math.round(window.screen.height / contentWidth * 10000) / 10000;
			var _str = '<meta name="viewport" id="viewport" content="width=' + contentWidth + ', user-scalable=no">';
			$("head").prepend(_str);
			$('body').addClass('iphone');
		} else if (agent.search(/Android/) != -1) {
			$("head").prepend('<meta name="viewport" content="initial-scale=0.5,width=device-width,minimum-scale=1.0,maximum-scale=1.0" />');
			$(window).bind('resize load', function () {
				$("html").css("zoom", $(window).width() / contentWidth);
			});
			_that.AndroidPar = $(window).width() / 750;
			if ($(window).width() >= 500) {
				$('body').addClass('android-tab');
			} else {
				$('body').addClass('android');
			}
		}
	};

	TOP.prototype.SetWidget = function SetWidget() {
		var _that = this;
		var changeWidget = function changeWidget() {
			var twFrame = $('iframe.twitter-timeline');
			if (twFrame.length > 0) {
				twFrame.css({
					'width': '640px'
				});
				if (!! ~navigator.userAgent.indexOf('Android')) {
					twFrame.contents().find('body').css({
						'zoom': _that.AndroidPar
					});
				}
				twFrame.contents().find('.SandboxRoot').css({
					'max-width': '580',
					'width': '580'
				});
				twFrame.contents().find('.root.timeline').css({
					'max-width': '580',
					'width': '580'
				});
				twFrame.contents().find('#twitter-widget-1').css({
					'max-width': '580',
					'width': '580'
				});
				twFrame.contents().find('.e-entry-title,.profile .p-name').css({
					'font-size': '24px',
					'line-height': '1.6em'
				});
				twFrame.contents().find('.p-author ,.dt-updated,.customisable-highlight').css({
					'font-size': '20px',
					'line-height': '1.6em'
				});
				twFrame.contents().find('.header').css({
					'padding-left': '50px'
				});
				twFrame.contents().find('.e-entry-content').css({
					'padding-left': '50px'
				});
				twFrame.contents().find('.header .avatar').css({
					'width': '97px',
					'height': '97px'
				});
			} else {
				setTimeout(changeWidget, 500);
			}
		};
		changeWidget();
	};

	TOP.prototype.TopSlider = function TopSlider() {
		$("#Glide").glide({
			type: "carousel",
			autoplay: 6000
		});
	};

	return TOP;
})();

var Top;
$(function () {
	Top = new TOP();
});
$(window).on('load', function () {
	setTimeout(function () {
		Top.SetWidget();
	}, 1500);
	setTimeout(function () {
		Top.TopSlider();
	}, 1500);
});