/*---------------------------------

    mockup ブックマークレット

----------------------------------*/
javascript:(function(){
	var lb_url = "http://jis.infocreate.co.jp";
	window.open(lb_url + document.getElementById("sample").getAttribute("src"), "_blank");
})();