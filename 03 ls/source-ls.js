/*-----------------------------------------------------
 *
 	検査チェックポイントを一覧ポップアップ表示
 *
------------------------------------------------------*/
javascript:(function() {

	function originalDialogUtil() {
		this.src = document.getElementById("source");
		this.divcss = 'font-family:\'メイリオ\',sans-serif;font-size:90%;padding:5px;position:absolute;top:0;left:0;background:#fff;border:solid #ccc 1px;z-index:2999;width:760px;height:390px;';
		this.tacss = ' style=\'width:750px; height: 390px;\'';
		this.btnfunc = 'this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);';
		this.panel_start = '<div style=\'padding:3px;background:#eee;height:19px;\'><span style=\'float:left;\'><strong>診断箇所一覧</strong></span><a style=\'float:right;\' onclick=\"' + this.btnfunc + '\">閉じる' + '</a></div><textarea' + this.tacss + '>';
		this.panel_end = '</textarea>';
	}

	originalDialogUtil.prototype = {

		showLsDialog: function(dialogID) {
			if(typeof document.getElementById(this.rid) === "undefined") return;
			var elm = document.createElement("div");
			elm.id = dialogID;
			elm.style.cssText = this.divcss;
			var dch = this.src.childNodes;
			var str = "";
			for(var i=0; i<dch.length; i++){
				if(dch.item(i).id){
					var cname = dch.item(i).className;
					switch(this.get_sv_type(cname)) {
						case "before":
							str += "(未検査）";
							break;
						case "ok":
							str += "適合";
							break;
						case "na":
							str += "非適用";
							break;
						case "fail":
							str += "不適合";
							break;
					}
					var j = i + 1;
					if(dch.item(j).nodeValue != null){
						str += "▼" + "\r\n";
						str += dch.item(j).nodeValue + "\r\n";
					}
				}
			}
			elm.innerHTML = this.panel_start + str + this.panel_end;
			document.getElementsByTagName("body")[0].appendChild(elm);
			$("#" + dialogID).draggable();
		},

		get_sv_type: function(str) {
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
	};

	var lsdiag = new originalDialogUtil();
	lsdiag.showLsDialog("lsDialog");

})();