/*-----------------------------------------------------
 *
 	見出しの自動検査
 *
------------------------------------------------------*/
javascript:(function(){
	var type="up",flag="適合(注記)";
	function surveyDialogUtil() {
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

	function headingTagUtil() {
	}
	headingTagUtil.prototype = {
		util: new surveyDialogUtil(),
		pat:  new RegExp(/(<h)([1-6])(.*?>)(.+?)(<\/h)([1-6])(>)/m),

		up: function(flag_word) {
			var key = this.util.get_survey_key(flag_word);
			this.util.set_survey(key);
			if(this.util.get_srccode()==="") {
				this.util.set_srccode(this.util.get_description());
			}
			var src = this.util.text_clean(this.util.get_srccode());
			this.util.set_srccode(src);
			if(!this.pat.test(src)) return;
			var mt = src.match(this.pat);
			var hnum = Number(mt[2].toString());
			hnum--;
			if(hnum > 6 || hnum < 1) {
				alert("これ以上レベルは変更できません");
				return;
			}
			this.util.set_comment("見出しの階層レベルが正しくない。文書構造上、この見出しはh" + hnum + "要素にすべき");
			var new_src = mt[1] + hnum + mt[3] + mt[4] + mt[5] + hnum + mt[7];
			this.util.set_srccode(new_src);
		},

		down: function(flag_word) {
			var key = this.util.get_survey_key(flag_word);
			this.util.set_survey(key);
			if(this.util.get_srccode()==="") {
				this.util.set_srccode(this.util.get_description());
			}
			var src = this.util.text_clean(this.util.get_srccode());
			this.util.set_srccode(src);
			if(!this.pat.test(src)) return;
			var mt = src.match(this.pat);
			var hnum = Number(mt[2].toString());
			hnum++;
			if(hnum > 6 || hnum < 1) {
				alert("これ以上レベルは変更できません");
				return;
			}
			this.util.set_comment("見出しの階層レベルが正しくない。文書構造上、この見出しはh" + hnum + "要素にすべき");
			var new_src = mt[1] + hnum + mt[3] + mt[4] + mt[5] + hnum + mt[7];
			this.util.set_srccode(new_src);
		}
	};

	var util = new headingTagUtil();
	if(type === "up") util.up(flag);
	else if(type === "down") util.down(flag);

})();