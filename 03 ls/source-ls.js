/*-----------------------------------------------------
 *
 	検査チェックポイントを一覧ポップアップ表示
 *
------------------------------------------------------*/
javascript:(function(d) {
	function trgr() {
        (function($) {
			var rid = 'All_link_check';
			if(document.getElementById(rid)) {
				return;
			}
			function e(t) {
				return document.getElementsByTagName(t);
			}
			var r = document.createElement('div');
			var divcss = 'font-family:\'メイリオ\',sans-serif;font-size:90%;padding:5px;position:absolute;top:0;left:0;background:#fff;border:solid #ccc 1px;z-index:2999;width:760px;height:390px;';
			var tacss = ' style=\'width:750px; height: 390px;\'';
			var btnfunc = 'this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);';
			r.id = rid;
			r.style.cssText = divcss;
				var src=document.getElementById("source");
				var dch=src.childNodes;
				var str="";
				for(var i=0;i<dch.length;i++){
				  if(dch.item(i).id){
					var cname = dch.item(i).className;
					switch(sb_typecheck(cname)) {
						case "before":
							str+="(未検査）";
							break;
						case "ok":
							str+="適合";
							break;
						case "na":
							str+="非適用";
							break;
						case "fail":
							str+="不適合";
							break;
					}
				    var j=i+1;
				    if(dch.item(j).nodeValue!=null){
				      str+="▼"+"\r\n";
				      str+=dch.item(j).nodeValue+"\r\n";
				    }
				  }
				}
			r.innerHTML = '<div style=\'padding:3px;background:#eee;height:19px;\'><span style=\'float:left;\'><strong>診断箇所一覧</strong></span><a style=\'float:right;\' onclick=\"' + btnfunc + '\">閉じる' + '</a></div><textarea' +tacss + '>' + str + '</textarea>';
			e('body')[0].appendChild(r);
			$('#All_link_check').draggable();
            window.scrollTo(0, 0);
        })(jQuery)
	}
	function sb_typecheck(str) {
		var tp = "";
		var pt_bf = new RegExp(/jisCHECK$/);
		var pt_ok = new RegExp(/(jisPASS|jisPASS_HC)$/);
		var pt_na = new RegExp(/(jisNA|jisNA_HC)$/);
		var pt_fail = new RegExp(/(jisFAIL|jisFAIL_HC|jisFAIL_AC)$/);
		if(pt_bf.test(str)) tp = "before";
		if(pt_ok.test(str)) tp = "ok";
		if(pt_na.test(str)) tp = "na";
		if(pt_fail.test(str)) tp = "fail";
		return tp;
	}
	if(typeof jQuery == 'undefined') {
		var j = d.createElement('script');
		j.type = 'text/javascript';
		j.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js';
		d.body.appendChild(j);
		j.onload = trgr;
	} else {
		trgr();
	}
})(document);