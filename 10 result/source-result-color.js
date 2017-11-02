/*-----------------------------------------------------
 *
 	検査結果詳細ページを色分け表示する
 *
------------------------------------------------------*/
javascript:(function(){
	function resultTableUtil() {
		tbl = document.getElementsByTagName("table").item(2);
		colors = {
			"適合": "background:#40FFFF",
			"適合(注記)": "background:#40FF40",
			"不適合": "background:#FF8080",
			"不適合(要確認)": "background:#FF0000",
			"非適用": "background:#C0C0C0"
		};
	}
	resultTableUtil.prototype = {
		survey_markup: function() {
			var tr = tbl.rows;
			for(var i=0; i<tr.length; i++) {
				var row = tr.item(i);
				if(i < 1) continue;
				var chk_col = row.cells.item(2);
				var chk_col_val = chk_col.innerHTML.trim();
				for(var j=0; j<row.cells.length; j++){
					var css_val = colors[chk_col_val];
					var col = row.cells.item(j);
					col.setAttribute("style", css_val);
				}
			}
		}
	};
	var util = new resultTableUtil();
	util.survey_markup();
})();