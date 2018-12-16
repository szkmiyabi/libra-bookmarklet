javascript:(function(){
	var wd="1280";
	var elm=document.getElementsByClassName("tabContainer").item(0);
	elm.setAttribute("style", "width:"+wd+"px!important;");
	document.getElementsByClassName("view_d").item(0).setAttribute("style", "width:unset!important;");
})();