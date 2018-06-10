/*-----------------------------------------------------
 *
 	検査メイン画面でのメモ用bkmk
 *
------------------------------------------------------*/
javascript:(function(){
	var op = "urlno";
	function surveyDialogUtil() {
		url = window.location.href;
		form = document.forms["diag_form"];
		comment = document.getElementById("comments");
		description = document.getElementById("description");
		srccode = document.getElementById("srccode");
		hash = {
			"PASS":"適合",
			"PASS2":"適合(注記)",
			"FAIL":"不適合",
			"FAIL2":"不適合(要再判定)",
			"NA":"非適用"
		};
		cp_hash = {
			"1":"yes",
			"0":"no",
		};
		urlList = document.getElementById("urlList");
	}
	surveyDialogUtil.prototype = {
		get_survey: function() {
			var key = "";
			for(var i=0; i<form.elements.length; i++) {
				var ip = form.elements[i];
				if(ip.checked==true) {
					key = ip.value;
					break;
				}
			}
			if(key!=="") return hash[key];
			else return "";
		},
		get_survey_cp: function() {
			var key = "";
			var rdos = document.getElementsByName("copy");
			if(rdos === "undefined") return "";
			for(var i=0; i<rdos.length; i++) {
				var rdo = rdos.item(i);
				if(rdo.checked==true) {
					key = rdo.value;
					break;
				}
			}
			if(key!=="") return cp_hash[key];
			else return "";
		},
		get_comment: function() {
			return comment.value;
		},
		get_description: function() {
			return description.value;
		},
		get_srccode: function() {
			return srccode.value;
		},
		set_survey: function(flag) {
			for(var i=0; i<form.elements.length; i++) {
				var ip = form.elements[i];
				var val = ip.value;
				if(val===flag) {
					this.diag_clean(flag);
					ip.click();
					break;
				}
			}
		},
		set_comment: function(str) {
			comment.value = str;
		},
		set_description: function(str) {
			description.value = str;
		},
		set_srccode: function(str) {
			srccode.value = str;
		},
		set_survey_copy: function(flag) {
			var rds = document.getElementsByName("copy");
			if(rds !== "undefined") {
				for(var i=0; i<rds.length; i++) {
					var val = rds[i].value;
					if(val===flag) {
						rds[i].click();
						break;
					}
				}
			}
		},
		save: function() {
			for(var i=0; i<form.elements.length; i++) {
				var ip = form.elements[i];
				var tp = ip.type;
				if(tp==="submit") {
					ip.click();
					break;
				}
			}
		},
		text_clean: function(str) {
		    str=str.replace(/^ +/m,"");
		    str=str.replace(/\t+/m,"");
		    str=str.replace(/(\r\n|\r|\n)/g,""); 
		    return str;
		},
		diag_clean: function(flag) {
			switch(flag) {
				case "PASS":
					this.set_comment("");
					this.set_srccode("");
					break;
				case "NA":
					this.set_comment("");
					this.set_description("");
					this.set_srccode("");
					break;
			}
		},
		get_survey_key: function(flag_word) {
			var ret_key = "";
			for(var key in hash) {
				var val = hash[key];
				if(val === flag_word) {
					ret_key = key;
					break;
				}
			}
			return ret_key;
		},
		get_survey_cp_key: function(flag_word) {
			var ret_key = "";
			for(var key in cp_hash) {
				var val = cp_hash[key];
				if(val === flag_word) {
					ret_key = key;
					break;
				}
			}
			return ret_key;
		},
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
		get_survey_url: function() {
			var long_url = "";
			var sv_url = "";
			var pt = new RegExp(/(\[[a-zA-Z0-9]+\])(.+)/);
			long_url = urlList.options[urlList.selectedIndex].text;
			if(pt.test(long_url)) {
				var mt = long_url.match(pt);
				sv_url = mt[2].toString().trim();
			}
			return sv_url;
		},
		get_num: function() {
			var num = "";
			var pt = new RegExp(/(\[)([a-zA-Z0-9]+)(\])(.+)/);
			var urlList = document.getElementById("urlList");
			var cr_num = urlList.options[urlList.selectedIndex].text;
			if(pt.test(cr_num)) {
				var mt = cr_num.match(pt);
				num = mt[2].toString().trim();
			}
			return num;
		},
		get_guideline: function() {
			var guideline = "";
			var guidelineList = document.getElementById("guideline");
			guideline = guidelineList.options[guidelineList.selectedIndex].value;
			guideline = guideline.replace(/【完】/,"");
			guideline = guideline.replace(/\(A+\)/,"");
			return guideline;
		},
		get_tech: function() {
			var tech = "";
			var techList = document.getElementById("techList");
			tech = techList.options[techList.selectedIndex].value;
			tech = tech.replace(/【完】/,"");
			return tech;
		},
		get_safe_value: function(val) {
			if(typeof val === "undefined") return "";
			else return val;
		}
	};

	function extendsUtil() {
		this.util = new surveyDialogUtil();
		this.urlno = "";
		this.urltxt = "";
		this.url_pt = new RegExp(/(\[)([a-zA-Z0-9]+)(\])( )(.+)/);
		this.alltxt = urlList.options[urlList.selectedIndex].text;
		try { this.urlno = this.alltxt.match(this.url_pt)[2]; } catch(e) {}
		try { this.urltxt = this.alltxt.match(this.url_pt)[5]; } catch(e) {}
	}

	extendsUtil.prototype = {
		show_diag: function(str) {
			jAlert(str);
		},
		disp_urlno: function() {
			if(this.urlno !== "") this.show_diag(this.urlno);
		}
	};

	var cmdd = new extendsUtil();
	eval("cmdd.disp_" + op + "();");


})();