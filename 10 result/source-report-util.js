/* ------------------------------------------------
 *
 * 確認用検査結果画面ユーティリティ
 *
 * ページ番号 -> 検査画面別タブリンク化
 * 検査結果◎○△×未 -> 詳細別タブリンク化
 * 達成基準番号 -> 色付けトグルリンク化,参照済み色づけ
 *
--------------------------------------------------*/
javascript:(function(){
	function resultTblUtil() {
		this.htbl = document.getElementsByTagName("table").item(1);
		this.tbl = document.getElementsByTagName("table").item(2);
		this.lbui_url = "http://jis.infocreate.co.jp/diagnose/indexv2/index/projID/";
	}
	resultTblUtil.prototype = {
		get_proj_code: function() {
			var obj = this.htbl.rows.item(0).cells.item(1);
			var tt = obj.innerHTML;
			var pt = new RegExp(/(\[)([0-9]+)(\])(.+)/);
			if(pt.test(tt)) {
				return tt.match(pt)[2];
			}
		},
		get_ui_link: function(page_num) {
			var pjc = this.get_proj_code();
			return this.lbui_url + pjc + '/controlID/"' + page_num + '"';
		},
		build_arr: function() {
			var arr = new Array();
			var trs = this.tbl.rows;
			for(var i=0; i<trs.length; i++) {
				if(i < 2) continue;
				var tr = trs.item(i);
				var in_arr = new Array();
				for(var j=0; j<tr.cells.length; j++) {
					var td = tr.cells.item(j);
					in_arr[j] = td.innerHTML;
				}
				arr.push(in_arr);
			}
			return arr;
		},
		add_target_b: function() {
			var trs = this.tbl.rows;
			for(var i=0; i<trs.length; i++) {
				if(i < 2) continue;
				var tr = trs.item(i);
				for(var j=0; j<tr.cells.length; j++) {
					if(j < 2) continue;
					var td = tr.cells.item(j);
					var atg = td.getElementsByTagName("a").item(0);
					atg.setAttribute("target", "_blank");
				}
			}
		},
		add_ui_link: function() {
			var trs = this.tbl.rows;
			for(var i=0; i<trs.length; i++) {
				if(i < 2) continue;
				var tr = trs.item(i);
				var cl = tr.cells.item(0);
				var ctx = cl.innerHTML.trim();
				ctx = '<a href=\'' + this.get_ui_link(ctx) + '\' target="_blank">' + ctx + "</a>";
				cl.innerHTML = ctx;
			}
		},
		add_js: function() {
			var scr = document.createElement("script");
			var scrtxt = "";
			scrtxt += 'function add_mark(num) {';
			scrtxt += 'var trs = document.getElementsByTagName("table").item(2).rows;';
			scrtxt += 'for(var i=0; i<trs.length; i++) {';
			scrtxt += 'if(i < 2) continue;';
			scrtxt += 'var tr = trs.item(i);';
			scrtxt += 'for(var j=0; j<tr.cells.length; j++) {';
			scrtxt += 'if(j < 2) continue;';
			scrtxt += 'var cls = tr.cells.item(j);';
			scrtxt += 'if(j == num) {';
			scrtxt += 'if(cls.getAttribute("style") === null) {';
			scrtxt += 'cls.setAttribute("style", "background: yellow");';
			scrtxt += 'cls.getElementsByTagName("a").item(0).setAttribute("onclick", "change_color()");';
			scrtxt += '} else {';
			scrtxt += 'cls.removeAttribute("style");';
			scrtxt += 'cls.getElementsByTagName("a").item(0).removeAttribute("onclick");';
			scrtxt += '}';
			scrtxt += 'break;';
			scrtxt += '}';
			scrtxt += '}';
			scrtxt += '}';
			scrtxt += '}';
			scrtxt += 'function change_color() {';
			scrtxt += 'var e = (window.event) ? window.event : arguments.callee.caller.arguments[0];';
			scrtxt += 'var me = e.target || e.srcElement;';
			scrtxt += 'me.parentNode.setAttribute("style", "background: #FF0080");';
			scrtxt += '}';
			scr.textContent = scrtxt;
			document.getElementsByTagName("body").item(0).appendChild(scr);
		},
		add_handle: function() {
			var trs = this.tbl.rows;
			var tr = trs.item(1);
			for(var j=0; j<tr.cells.length; j++) {
				var cls = tr.cells.item(j);
				var clstxt = cls.innerHTML;
				clstxt = '<a href="javascript:void(0)" onclick="add_mark(' + (j + 2) + ');return false;" style="text-decoration:none">' + clstxt + "</a>";
				cls.innerHTML = clstxt;
			}
		},
		add_mark: function(num) {
			var trs = this.tbl.rows;
			for(var i=0; i<trs.length; i++) {
				if(i < 2) continue;
				var tr = trs.item(i);
				for(var j=0; j<tr.cells.length; j++) {
					if(j < 2) continue;
					var cls = tr.cells.item(j);
					if(j == num) {
						console.log(cls.getAttribute("style"));
						if(cls.getAttribute("style") === null) {
							cls.setAttribute("style", "background: yellow");
						} else {
							cls.removeAttribute("style");
						}
						break;
					}
				}
			}
		},
		change_color: function() {
			var e = (window.event) ? window.event : arguments.callee.caller.arguments[0];
			var me = e.target || e.srcElement;
			me.setAttribute("style", "background: red");
		}
	};


	var ui = new resultTblUtil();
	ui.add_target_b();
	ui.add_ui_link();
	ui.add_js();
	ui.add_handle();

})();