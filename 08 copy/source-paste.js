/*-----------------------------------------------------
 *
 	判定結果をペーストする
 	（判定ダイアログ、Bookmarkletter対応）
 *
------------------------------------------------------*/
javascript:(function(){
	function bookMarkletterUtil() {
		hash = {
			"0": "適合",
			"1": "適合(注記)",
			"2": "不適合",
			"3": "不適合(要再判定)",
			"4": "非適用"
		};
		cp_hash = {
			"1":"yes",
			"0":"no",
		};
	}
	bookMarkletterUtil.prototype = {
		set_survey: function(flag) {
			var rds = document.getElementsByName("bkm_result");
			for(var i=0; i<rds.length; i++) {
				var rd = rds.item(i);
				var val = rd.value;
				if(val === flag) {
					this.diag_clean(flag);
					rd.click();
					break;
				}
			}
		},
		set_survey_copy: function(flag) {
			var rds = document.getElementsByName("bkm_result_sync");
			for(var i=0; i<rds.length; i++) {
				var rd = rds.item(i);
				var val = rd.value;
				if(val === flag) {
					rd.click();
					break;
				}
			}
		},
		set_comment: function(str) {
			var obj = document.getElementById("bkm_comments");
			obj.value = str;
		},
		set_description: function(str) {
			var obj = document.getElementById("bkm_descript");
			obj.value = str;
		},
		set_srccode: function(str) {
			var obj = document.getElementById("bkm_srccode");
			obj.value = str;
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
		}
	};

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
	function surveyPackageUtil() {
		this.util = new surveyDialogUtil();

		this.survey_copy =  function() {
			var txt = "";
			var str_tech = "";
			var str_sv = "";
			var str_sv_cp = "";
			var str_comment = "";
			var str_description = "";
			var str_srccode = "";
			if(this.util.is_survey_page()) {
				str_tech = this.util.get_tech();
				str_sv = this.util.get_survey();
				str_sv_cp = this.util.get_survey_cp();
				str_comment = this.util.get_comment();
				str_description = this.util.get_description();
				str_srccode = this.util.get_srccode();
				txt = str_tech + "\t" + str_sv + "\t" + str_sv_cp + "\t" + "who" + "\t";
				txt += str_comment + "\t" + str_description + "\t" + str_srccode;
			} else if(this.util.is_detail_page()) {
				var sel = window.getSelection().toString();
				sel = sel.trim();
				if(!new RegExp(/\t/).test(sel)) return "";
				var arr = sel.split("\t");
				str_tech = arr[0];
				str_sv = arr[1];
				str_sv_cp = "no";
				str_comment = this.util.get_safe_value(arr[3]);
				str_description = this.util.get_safe_value(arr[4]);
				str_srccode = this.util.get_safe_value(arr[5]);
				txt = str_tech + "\t" + str_sv + "\t" + str_sv_cp + "\t" + "who" + "\t";
				txt += str_comment + "\t" + str_description + "\t" + str_srccode;
			}
			prompt("Ctrl+Cでコピーしてください。", txt);

		};
		this.survey_paste = function() {
			var src = prompt("コピーしたデータを貼り付けてください");
			src = src.trim();
			var arr = this.survey_paste_data_bind(src);
			var key = this.util.get_survey_key(arr[0]);
			this.util.set_survey(key);
			var cp_key = this.util.get_survey_cp_key(arr[1]);
			this.util.set_survey_copy(cp_key);
			this.util.set_comment(arr[2]);
			this.util.set_description(arr[3]);
			this.util.set_srccode(arr[4]);
		};
		this.survey_paste_data_bind = function(data) {
			var arr = new Array();
			var str_sv = "";
			var str_sv_cp = "";
			var str_comment = "";
			var str_description = "";
			var str_srccode = "";
			var tmp = data.split("\t");
			if(tmp != null) {
				str_sv = tmp[1].toString().trim();
				str_sv_cp = tmp[2].toString().trim();
				if(str_sv_cp === "") str_sv_cp = "no";
				str_comment = this.util.get_safe_value(tmp[4]);
				str_description = this.util.get_safe_value(tmp[5]);
				str_srccode = this.util.get_safe_value(tmp[6]);
				arr.push(str_sv);
				arr.push(str_sv_cp);
				arr.push(str_comment);
				arr.push(str_description);
				arr.push(str_srccode);
				return arr;
			} else {
				return null;
			}
		};
		this.survey_paste_bkmk = function() {
			this.bkm_util = new bookMarkletterUtil();
			var src = prompt("コピーしたデータを貼り付けてください");
			src = src.trim();
			var arr = this.survey_paste_data_bind(src);
			var key = this.bkm_util.get_survey_key(arr[0]);
			this.bkm_util.set_survey(key);
			var cp_key = this.bkm_util.get_survey_cp_key(arr[1]);
			this.bkm_util.set_survey_copy(cp_key);
			this.bkm_util.set_comment(arr[2]);
			this.bkm_util.set_description(arr[3]);
			this.bkm_util.set_srccode(arr[4]);
		};
	}

	var pkg = new surveyPackageUtil();
	if(document.getElementById("bkm") === null) {
		pkg.survey_paste();
	} else {
		pkg.survey_paste_bkmk();
	}
	
})();