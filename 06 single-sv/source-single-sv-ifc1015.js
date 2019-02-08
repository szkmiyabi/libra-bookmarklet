/*-----------------------------------------------------
 *
 	単一自動判定をする  （IFC1015専用）
 *
------------------------------------------------------*/
javascript:(function(){
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
					var kval = cp_hash[val];
					if(kval===flag) {
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

	/* ---- メイン処理 ---- */

	/* ---- 以下はサンプルコードのため、実装時には撤去すること ---- */

	function extendsApp() {
		this.sv = "不適合";
		this.util = new surveyDialogUtil();
	}
	extendsApp.prototype = {
		get_pt_tag_a: function(link_type) {
			var comp = "";
			if(link_type == "text") {
				comp = "(<a.+?>)(.+?)(<\/a>)";
			} else if(link_type == "image") {
				comp = '(<a.+?>)(.*?)(<img .*alt=")(.+?)(".*?)(>)(.*?)(<\/a>)';
			}
			return new RegExp(comp);
		},
		get_pt_target_blank: function() {
			return new RegExp(/(target="_blank")/);
		},
		get_pt_pdf_link: function() {
			return new RegExp(/(href=")(.*\.)(pdf|PDF)(.*?)(")/);
		},
		get_pt_docs_link: function() {
			return new RegExp(/(href=")(.*\.)(pdf|PDF|doc|DOC|docx|DOCX|xls|XLS|xlsx|XLSX|ppt|PPT|pptx|PPTX|csv|CSV|zip|ZIP)(.*?)(")/);
		},
		is_target_blank_link: function(str) {
			var pt = this.get_pt_target_blank();
			if(pt.test(str)) {
				return true;
			} else {
				return false;
			}
		},
		is_pdf_link: function(str) {
			var pt = this.get_pt_pdf_link();
			if(pt.test(str)) {
				return true;
			} else {
				return false;
			}
		},
		is_docs_link: function(str) {
			var pt = this.get_pt_docs_link();
			if(pt.test(str)) {
				return true;
			} else {
				return false;
			}
		},
		is_target_blank_link_preguide(str) {
			if(new RegExp(/.*別ウィンドウ.*/).test(str)) return true;
			else return false;
		},
		is_pdf_link_preguide(str) {
			var pt = new RegExp(/PDF/);
			if(!pt.test(str)) return false;
			if(str.match(pt).length > 1) return true;
			else return false;
		},
		is_contain_img(str) {
			if(new RegExp(/<img.+? *>/).test(str)) return true;
			else return false;
		},
		exec: function() {
			var description = this.util.text_clean(this.util.get_description());
			if(this.is_target_blank_link(description)) {
				input_comment = "";
				input_srccode = "";
				if(this.is_target_blank_link_preguide(description)==false) {
					this.util.set_survey("FAIL");
					input_comment += "別ウィンドウで開くことを説明していない";
					if(this.is_contain_img(description) == true) {
						input_srccode = description.replace(this.get_pt_tag_a("image"), "$1$2$3$4(別ウィンドウ)$5$6$7$8");
					} else {
						input_srccode = description.replace(this.get_pt_tag_a("text"), "$1$2(別ウィンドウ)$3");
					}
					if(this.is_pdf_link(description)) {
						if(this.is_contain_img(description) == true) {
							input_srccode = description.replace(this.get_pt_tag_a("image"), "$1$2$3$4(PDF)$5$6$7$8");
						} else {
							input_srccode = description.replace(this.get_pt_tag_a("text"), "$1$2(PDF)$3");
						}
						input_comment += "\r\n" + "PDFであることを明示していない";
						//input_srccode = input_srccode.replace("(別ウィンドウ)", "(PDF)(別ウィンドウ)");
					}
					this.util.set_comment(input_comment);
					this.util.set_srccode(input_srccode);
				} else {
					if(this.is_pdf_link(description)) {
						if(this.is_pdf_link_preguide(description) == false) {
							this.util.set_survey("FAIL");
							input_comment += "PDFであることを明示していない";
							if(this.is_contain_img(description) == true) {
								input_srccode = description.replace(this.get_pt_tag_a("image"), "$1$2$3$4(PDF)$5$6$7$8");
							} else {
								input_srccode = description.replace(this.get_pt_tag_a("text"), "$1$2(PDF)$3");
							}
							this.util.set_comment(input_comment);
							this.util.set_srccode(input_srccode);
						} else {
							this.util.set_survey("PASS");
						}

					} else {
						this.util.set_survey("PASS");
					}
				}

			} else {}
			this.util.save();
		}
	};
	/* オブジェクトをインスタンス化して実行 */
	var app = new extendsApp();
	app.exec();
	/* ---- サンプルコードここまで ---- */

})();