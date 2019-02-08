/*-----------------------------------------------------
 *
 	単一検査画面を出す（未判定箇所）
 *
------------------------------------------------------*/
javascript:(function(){
	var src = document.getElementById("source");
	var ds = src.getElementsByTagName("div");
	var ret="";
	var pt = new RegExp(/.*jisCHECK.*/mg);
	for(var i=0; i<ds.length; i+=2) {
		var tardiv = ds.item(i);
		var tarattr = tardiv.getAttribute("class");
		if(pt.test(tarattr)) {
			ds.item(i + 1).click();
			break;
		}
	}
})();
