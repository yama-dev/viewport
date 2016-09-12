class TOP {
	constructor(){
    this.BindFunc();
	}
  BindFunc(){
    $(window).on('load',()=>{
    	this.TopSlider();
    });
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
