/*-----------------------------------------------------
 *
 	ダイレクトにURL一覧貼り付け用テキストを生成
 *
------------------------------------------------------*/
javascript:(function(){
	let msg_data = [
		"URL一覧データタイプの指定\npageIDとURL=no-and-url、pageIDのみ=no-only",
		"no-and-url no-only"
	];
	let type=prompt(msg_data[0], msg_data[1]).trim();
	if(!new RegExp(/(^no\-only$|^no\-and\-url$)/).test(type)) {
		alert(type + ": 不正なオペレーション！");
		return;
	}
	function directUrlUtil() {
		this.urlarr = new Array();
		var tmpobj = document.getElementById("urlList").getElementsByTagName("option");
		for(var i=0; i<tmpobj.length; i++) {
			var opt = tmpobj.item(i);
			this.urlarr[i] = opt.text;
		}
		this.pagept = new RegExp(/\[[a-zA-Z0-9]+?\] /mg);
	}
	directUrlUtil.prototype = {
		get_pageID: function(str) {
			var mt = str.match(this.pagept);
			if(mt.length > 0) return mt[0].toString().match(/([a-zA-Z0-9]+)/)[1];
		},
		get_url: function(str) {
			return str.replace(this.pagept, "");
		},
		exec: function(type) {
			var str = "";
			for(var i=0; i<this.urlarr.length; i++) {
				var row = this.urlarr[i];
				var pageid = this.get_pageID(row);
				var url = this.get_url(row);
				if(type === "no-and-url") {
					str += pageid + "\t" + url + "\n";
				} else if(type === "no-only") {
					str += pageid + "\n";
				}
			}
			this.myAlert("directUrlListDialog", str);
		},
		myAlert: function(dialogID, txt) {
			var y = window.pageYOffset;
			var divcss = 'font-family:\'メイリオ\',Meiryo,sans-serif;font-size:90%;padding:5px;position:absolute;top:' + y + 'px;left:0;background:#fff;border:solid #ccc 1px;z-index:2999;width:760px;height:390px;';
			var tacss = ' style=\'width:750px; height: 355px;\'';
			var btnfunc = 'this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);';
			var panel_start = '<div style=\'padding:3px;background:#eee;height:19px;\'><span style=\'float:left;\'><strong>URL一覧</strong></span><a style=\'float:right;\' onclick=\"' + btnfunc + '\">閉じる' + '</a></div><textarea' + tacss + '>';
			var panel_end = '</textarea>';
			var elm = document.createElement("div");
			elm.id = dialogID;
			elm.style.cssText = divcss;
			elm.innerHTML = panel_start + txt + panel_end;
			document.getElementsByTagName("body")[0].appendChild(elm);
		},
	};
	let app = new directUrlUtil();
	app.exec(type);
})();