/*-------------------------------------
 *
 * コントラスト比計測結果をプレビュー表示 *
 *
--------------------------------------*/
javascript:(function(){
	function contrastUtil() {
		this.selection = window.getSelection().toString();
		this.fcolor_pt = new RegExp(/(前景色:#)([a-zA-Z0-9]+)/);
		this.bcolor_pt = new RegExp(/(背景色:#)([a-zA-Z0-9]+)/);
	}
	contrastUtil.prototype = {
		clean_text: function(str) {
			str = str.replace(/^ +/mg, "");
			str = str.replace(/(\r\n|\n)/mg, "");
			str = str.replace(/\t/mg, "");
			return str;
		},
		get_color_hex_arr: function() {
			var arr = new Array();
			var srctxt = this.clean_text(this.selection);
			var fcs = srctxt.match(this.fcolor_pt)[2];
			var bcs = srctxt.match(this.bcolor_pt)[2];
			fcs = "#" + fcs;
			bcs = "#" + bcs;
			arr[0] = fcs;
			arr[1] = bcs;
			return arr;
		},
		get_html_tmpl: function() {
			var arr = this.get_color_hex_arr();
			var str = '<div style="background-color:' + arr[1];
			str += ';color:' + arr[0];
			str += ';width:300px;font-size:190%;text-align:center;line-height:3em;">';
			str += "あいうえお";
			str += "</div>";
			return str;
		},
		exec: function() {
			var src = this.get_html_tmpl();
			jAlert(src);
		}
	};

	var util = new contrastUtil();
	util.exec();
})();



