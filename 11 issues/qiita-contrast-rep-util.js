/* ---------------------------------------

   テキストデータ加工ユーティリティ

-----------------------------------------*/
javascript:(function(){
	function formUtil() {
		this.d = document;
		this.area = null;
		try { this.area = this.d.getElementsByClassName("editorMarkdown_textarea").item(0); } catch(e) {}
		this.selection = null;
		try { this.selection = window.getSelection().toString(); } catch(e) {}
	}
	formUtil.prototype = {
		cca_br_clean: function(){
			var src = this.area.value;
			src = this.br_encode(src);
			var pat = new RegExp(/(<bkmk:br><bkmk:br>)(コントラスト比:.+?<bkmk:br>)/g);
			if(!pat.test(src)) return;
			var mt = src.match(pat);
			src = src.replace(pat, '<bkmk:br>$2');
			src = this.br_decode(src);
			this.area.value = src;
		},
		br_encode: function(str) {
			return str.replace(/(\r\n|\n)/mg, "<bkmk:br>");
		},
		br_decode: function(str) {
			return str.replace(/<bkmk:br>/mg, "\r\n");
		}
	};

	var ut = new formUtil();
	ut.cca_br_clean();

})();

