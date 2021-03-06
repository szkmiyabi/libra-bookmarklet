/* ------------------------------------------------
 *
 * 確認用検査結果画面ユーティリティ
 *
 * ページ番号 -> 検査画面別タブリンク化
 * 検査結果◎○△×未 -> 詳細別タブリンク化
 * 達成基準番号 -> 色付けトグルリンク化,参照済み色づけ
 * 詳細ページ -> 検査画面別タブで開く
 *
--------------------------------------------------*/
javascript:(function(){
	function resultTblUtil() {
		this.htbl = document.getElementsByTagName("table").item(1);
		this.tbl = document.getElementsByTagName("table").item(2);
		this.lbui_url = "http://jis.infocreate.co.jp/diagnose/indexv2/index/projID/";
		this.url = window.location.href;
		this.rep_detail_pt = new RegExp(/\/diagnose\/indexv2\/report2\/projID\/[0-9]+\/controlID\/[a-zA-Z0-9]+\/guideline\/[0-9\.]+/);
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
			scrtxt += 'cls.setAttribute("style", "background:yellow");';
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
			scrtxt += 'me.parentNode.setAttribute("style", "background: #ff4fa7");';
			scrtxt += '}';
			scrtxt += 'function change_line_color() {';
			scrtxt += 'var e = (window.event) ? window.event : arguments.callee.caller.arguments[0];';
			scrtxt += 'var me = e.target || e.srcElement;';
			scrtxt += 'var tr = me.parentNode.parentNode;';
			scrtxt += 'var tds = tr.getElementsByTagName("td");';
			scrtxt += 'for(var i=0; i<tds.length; i++) {';
			scrtxt += 'var cell = tds.item(i);';
			scrtxt += 'if(cell.getAttribute("style") === "white-space:nowrap") cell.removeAttribute("style");';
			scrtxt += 'if(cell.getAttribute("style") === null){';
			scrtxt += 'var csstxt = "";';
			scrtxt += 'if(i==0) csstxt = "background: #ff4fa7;white-space:nowrap;";';
			scrtxt += 'else csstxt = "background: #ff4fa7;";';
			scrtxt += 'cell.setAttribute("style", csstxt);';
			scrtxt += '} else if(cell.getAttribute("style") === "background:yellow") {';
			scrtxt += '} else {';
			scrtxt += 'cell.removeAttribute("style");';
			scrtxt += '}';
			scrtxt += '}';
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
		add_line_handle: function() {
			var trs = this.tbl.rows;
			for(var i=0; i<trs.length; i++) {
				if(i < 2) continue;
				var tr = trs.item(i);
				var td = tr.cells.item(0);
				td.setAttribute("style", "white-space:nowrap");
				var inhtml = td.innerHTML;
				var new_inhtml = '<input type="checkbox" onclick="change_line_color()">' + inhtml;
				td.innerHTML = new_inhtml;
			}
		},
		is_detail_pg: function() {
			if(this.rep_detail_pt.test(this.url)) return true;
			else return false;
		},
		get_page_num_detail_pg: function() {
			var obj = this.htbl.rows.item(1).cells.item(1);
			var tt = obj.innerHTML;
			var pt = new RegExp(/(\[)([a-zA-Z0-9]+)(\])(.+)/);
			if(pt.test(tt)) {
				return tt.match(pt)[2];
			}
		},
		browse_ui: function() {
			window.open(this.get_ui_link(this.get_page_num_detail_pg()), "_blank");
		},
	};

	function indexUtil(ui) { this.ui = ui; }
	indexUtil.prototype = {
		exec: function() {
			this.ui.add_target_b();
			this.ui.add_ui_link();
			this.ui.add_js();
			this.ui.add_handle();
			this.ui.add_line_handle();
		}
	};
	function detailUtil(ui) { this.ui = ui; }
	detailUtil.prototype = {
		exec: function() {
			this.ui.browse_ui();
		}
	};


	var ui = new resultTblUtil();
	var exe = null;

	if(ui.is_detail_pg()) {
		exe = new detailUtil(ui);
	} else {
		exe = new indexUtil(ui);
	}

	if(exe !== null) exe.exec();

})();