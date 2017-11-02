/*-----------------------------------------------------
 *
 	単一検査画面を出す（先頭またはn番目指定）
 *
------------------------------------------------------*/
javascript:(function(){
	var n = 1;
	var dx = n - 1;
	var tx = n + dx;
	var src = document.getElementById("source");
	var div = src.getElementsByTagName("div");
	var cnt = 0;

	for(var i=0; i<div.length; i++) {
	  if(div.item(i).id == null) {
	    continue;
	  }
	  if(cnt == tx) {
	    div.item(i).click();
	    break;
	  }
	  cnt++;
	}
})();