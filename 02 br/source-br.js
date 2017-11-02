/*-----------------------------------------------------
 *
 	別タブで診断対象ページを表示する
 *
------------------------------------------------------*/
javascript:(function(){
	function brUtil() {
		url = window.location.href;
		d = document;
	}
	brUtil.prototype = {
		is_survey_page: function() {
			var pat1 = new RegExp(/\/diagnose\/indexv2\/index\/projID\/[0-9]+/);
			var pat2 = new RegExp(/\/diagnose\/indexv2\/index\/reset\/false\/projID\/[0-9]+/);
			if(pat1.test(url) || pat2.test(url)) return true;
			else return false;
		},
		is_detail_page: function() {
			var pat = new RegExp(/\/diagnose\/indexv2\/report2\/projID\/[0-9]+\/controlID\//);
			if(pat.test(url)) return true;
			else return false;
		},
		survey_page_br: function() {
			var burl = "";
			var elm = d.getElementById("urlList");
			for(var i=0; i<elm.options.length; i++) {
				var op = elm.options[i];
				if(op.selected) {
					burl = elm.options[i].text;
					break;
				}
			}
			burl = this.get_simple_url(burl);
			window.open(burl, "_blank");
		},
		detail_page_br: function() {
			var tbl = d.getElementsByTagName("table").item(1);
			var trs = tbl.rows;
			var row = trs.item(1);
			var cell = row.cells.item(1);
			var burl = cell.innerHTML;
			burl = burl.trim();
			burl = this.get_simple_url(burl);
			window.open(burl, "_blank");
		},
		get_simple_url: function(str) {
			var pt = new RegExp(/http.*\/\/.*/);
			if(pt.test(str)) {
				var mt = str.match(pt);
				return mt[0].toString();
			}
			return "";
		}
	};

	var util = new brUtil();
	if(util.is_survey_page()) util.survey_page_br();
	else if(util.is_detail_page) util.detail_page_br();

})();