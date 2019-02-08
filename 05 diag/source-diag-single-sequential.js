/*--------------------------------------

    上から順番にチェックポイントのダイアログを開く

    regist: 現在開いているCH番号を保存
    open: メイン処理(ダイアログを順に開く)
    clear: 後始末

--------------------------------------*/
javascript:(function(){
	var opr="open";/*regist,open,clear*/
	function singleDiagOpenUtil() {
		this.storage = localStorage;
		this.d = document;
		this.src = this.d.getElementById("source");
		this.ds = this.src.getElementsByTagName("div");
		this.pt_opened = new RegExp(/.*iconSELECT\.png.*/);
		this.lsname = "crTargetNum";
	}
	singleDiagOpenUtil.prototype = {
		get_current: function() {
			return Number(this.storage.getItem(this.lsname));
		},
		set_current: function(new_idx) {
			this.storage.removeItem(this.lsname);
			this.storage.setItem(this.lsname, new_idx+"");
		},
		open: function() {
			var idx = this.get_current();
			if(idx == null) idx = 0;
			for(var i=0; i<this.ds.length; i+=2) {
				var dv = this.ds.item(i + 1);
				if(i == idx) {
					dv.click();
					this.set_current(i + 2);
					break;
				}
			}
		},
		regist: function() {
			this.storage.removeItem(this.lsname);
			for(var i=0; i<this.ds.length; i+=2) {
				var dv = this.ds.item(i + 1);
				var stattr = dv.getAttribute("style");
				if(this.pt_opened.test(stattr)) {
					this.storage.setItem(this.lsname, i+"");
					break;
				}
			}
		},
		clear: function() {
			this.storage.removeItem(this.lsname);
		}
	};
	var app = new singleDiagOpenUtil();
	var operation_str = "";
	if(opr=="regist") operation_str = "regist()";
	else if(opr=="open") operation_str = "open()";
	else operation_str = "clear()";
	eval("app." + operation_str + ";");

})();