class TOP {
	constructor(){
		this.CurrentURL = location.href;
		this.Init();
		this.SpInit();
    this.BindFunc();
	}
  BindFunc(){
		$(window).on('scroll',()=>{
		});
    $(window).on('load',()=>{
    	this.TopSlider();
    });
  }
	Init(){
		var _that = this;
		this.DocH = document.body.clientHeight ? document.body.clientHeight/this.AndroidPar : $(document).height()/this.AndroidPar;
		this.DocW = document.body.clientWidth ? document.body.clientWidth/this.AndroidPar : $(document).width()/this.AndroidPar;
	}
	SpInit(){
    this.WinH = window.innerHeight ? window.innerHeight : $(window).height();
    this.WinW = window.innerWidth ? window.innerWidth : $(window).width();
	}
	TopSlider(){
		$("#Glide").glide({
			type: "carousel",
      autoplay: 6000
		});
	}
}
$(function(){
	var Top = new TOP();
});
