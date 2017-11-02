/*-----------------------------------------------------
 *
 	ページ番号を指定して対象URLを切替える
 	（検査ページ、検査結果詳細ページ対応）
 *
------------------------------------------------------*/
javascript:(function(){
	function resultUtil() {
		url = window.location.href;
		d = document;
	}
	resultUtil.prototype = {
		is_survey_page: function() {
			var pat1 = new RegExp(/\/diagnose\/indexv2\/index\/projID\/\"*[0-9]+\"*/);
			var pat2 = new RegExp(/\/diagnose\/indexv2\/index\/reset\/(true|false)\/projID\/\"*[0-9]+\"*/);
			if(pat1.test(url) || pat2.test(url)) return true;
			else return false;
		},
		is_main_page: function() {
			var pat = new RegExp(/\/diagnose\/indexv2\/report\/projID\/[0-9]+/);
			if(pat.test(url)) return true;
			else return false;
		},
		is_detail_page: function() {
			var pat = new RegExp(/\/diagnose\/indexv2\/report2\/projID\/[0-9]+\/controlID\//);
			if(pat.test(url)) return true;
			else return false;
		},
		survey_page_change_url: function() {
			var src = prompt("URL番号を入力");
			var flg = false;
			var urls = d.getElementById("urlList");
			for(var i=0; i<urls.options.length; i++) {
				var url = urls.options[i].text;
				var url_nm = this.get_pageid(url);
				var pat = new RegExp("[a-zA-Z]*?" + src);
				if(pat.test(url_nm)) {
					urls.options[i].selected = true;
					flg = true;
					break;
				}
			}
			if(flg) {
				d.getElementById("submitURL").click();
			} else {
				alert("存在しないURL番号です！");
			}
		},
		get_pageid: function(str) {
			var pat = new RegExp(/\[(.+?)\]/);
			if(pat.test(str)) {
				return str.match(pat)[1];
			} else {
				return false;
			}
		},
		result_page_change_url: function() {
			var pat = new RegExp(/\/projID\/[0-9]+\/controlID\/(.+?)\/guideline\/(.+?)\//);
			var mt = url.match(pat);
			var pageID = mt[1];
			var guideline = mt[2];
			var new_pageID = prompt("URL番号を入力してください",pageID);
			if(new_pageID === "") return;
			if(!this.is_include_alpha(new_pageID)) {
				var prefix = this.get_alpha(pageID);
				new_pageID = prefix + new_pageID;
			}
			var new_url = url.replace(/(\/controlID\/)(.+?)(\/)/, "$1" + new_pageID + "$3");
			window.location.href = new_url;
		},
		is_include_alpha: function(str) {
			var pat = new RegExp(/[a-zA-Z]+/);
			if(pat.test(str)) return true;
			else return false;
		},
		get_alpha: function(str) {
			var pat = new RegExp(/([a-zA-Z]+)([0-9]+)/);
			var mt = str.match(pat);
			return mt[1];
		}
	};

	var util = new resultUtil();
	if(util.is_survey_page()) util.survey_page_change_url();
	else if(util.is_detail_page()) util.result_page_change_url();

})();
