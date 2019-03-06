/*-----------------------------------------------------
 *
 	単一自動判定
 	2.4.4 IFC1015 PDF非明示,別ウィンドウ非明示
 	自動判定
 *
------------------------------------------------------*/
javascript:(function(){
	/* 基本クラス */
	class singleSurvey {
		constructor() {
			this.form = document.forms["diag_form"];
			this.comment = document.getElementById("comments");
			this.description = document.getElementById("description");
			this.srccode = document.getElementById("srccode");
			this.hash = {
				"PASS":"適合",
				"PASS2":"適合(注記)",
				"FAIL":"不適合",
				"FAIL2":"不適合(要再判定)",
				"NA":"非適用"
			};
			this.cp_hash = {
				"1":"yes",
				"0":"no",
			};
			this.techList = document.getElementById("techList");
		}

		get_survey() {
			var key = "";
			for(var i=0; i<this.form.elements.length; i++) {
				var ip = this.form.elements[i];
				if(ip.checked==true) {
					key = ip.value;
					break;
				}
			}
			if(key!=="") return this.hash[key];
			else return "";
		}

		get_survey_cp() {
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
			if(key!=="") return this.cp_hash[key];
			else return "";
		}

		get_comment() {
			return this.comment.value;
		}

		get_description() {
			return this.description.value;
		}

		get_srccode() {
			return this.srccode.value;
		}

		set_comment(str) {
			this.comment.value = str;
		}

		set_description(str) {
			this.description.value = str;
		}

		set_srccode(str) {
			this.srccode.value = str;
		}

		set_survey(flag) {
			var flag_val = "";
			for(var key in this.hash) {
				var key_vl = this.hash[key];
				if(flag === key_vl) {
					flag_val = key;
					break;
				}
			}
			for(var i=0; i<this.form.elements.length; i++) {
				var ip = this.form.elements[i];
				var val = ip.value;
				if(val===flag_val) {
					this.diag_clean(flag);
					ip.click();
					break;
				}
			}
		}

		set_survey_copy(flag) {
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
		}

		save() {
			for(var i=0; i<this.form.elements.length; i++) {
				var ip = this.form.elements[i];
				var tp = ip.type;
				if(tp==="submit") {
					ip.click();
					break;
				}
			}
		}

		clean_text(str) {
			str=str.replace(/^ +/m,"");
			str=str.replace(/\t+/m,"");
			str=str.replace(/(\r\n|\r|\n)/g,""); 
			return str;
		}

		diag_clean(flag) {
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

		get_survey_key(flag_word) {
			var ret_key = "";
			for(var key in this.hash) {
				var val = this.hash[key];
				if(val === flag_word) {
					ret_key = key;
					break;
				}
			}
			return ret_key;
		}

		get_survey_cp_key(flag_word) {
			var ret_key = "";
			for(var key in cp_hash) {
				var val = cp_hash[key];
				if(val === flag_word) {
					ret_key = key;
					break;
				}
			}
			return ret_key;
		}

		get_tech() {
			var tech = "";
			tech = this.techList.options[this.techList.selectedIndex].value;
			tech = tech.replace(/【完】/,"");
			return tech;
		}

		get_safe_value(val) {
			if(typeof val === "undefined") return "";
			else return val;
		}

	}

	/* 拡張クラス */
	class singleSurveyCustom extends singleSurvey {
		constructor() {
			super();
		}
		
		target_searcher(str) {
			var flag = false;
			var pts = [
				new RegExp(/(href=")(.+\.pdf.*)(")/g),
				new RegExp(/(target="_blank")/g)
			];
			for(var i=0; i<pts.length; i++) {
				var pt = pts[i];
				if(pts[i].test(str)) flag = true;
			}
			return flag;
		}

		target_category(str) {
			var tuple = [];
			var pts = {
				"notDefPdf": new RegExp(/(href=")(.+\.pdf.*)(")/g),
				"notDefTarget": new RegExp(/(target="_blank")/g),
			};
			for(var key in pts) {
				if(pts[key].test(str)) {
					tuple.push(key);
				}
			}
			return tuple;
		}

		target_is_img_link(str) {
			var pt = new RegExp(/(<a.+?>)(.*?<img.+?>.*?)(<\/a>)/);
			return (pt.test(str) === true) ? true : false;
		}

		target_is_definition(str) {
			var match_type = "";
			var pts = [
				new RegExp(/(別ウィンドウ)/),
				new RegExp(/(PDF)/),
			];
			if(pts[0].test(str)) match_type += "defTargetOK";
			if(pts[1].test(str)) match_type += "defPdfOK";
			return match_type;
		}

		get_a_pt(link_type) {
			if(link_type === "aimg") {
				return new RegExp(/(<a.+?>)(.*?<img.+?>.*?)(<\/a>)/);
			} else {
				return new RegExp(/(<a.+?>)(.+)(<\/a>)/);
			}
		}

	}

	let app = new singleSurveyCustom();
	let description = app.clean_text(app.get_description());
	let tech = app.get_tech();

	//IFC1015 true
	if(tech === "IFC1015") {

		//target, true
		if(app.target_searcher(description)) {
			var category_str = "";
			var new_survey = "";
			var new_srccode = "";
			var new_comment = "";
			var alt_attr_pt = new RegExp(/(alt=")(.*?)(")/g);
			var types = app.target_category(description);
			for(var i=0; i<types.length; i++) {
				category_str += types[i];
			}
			var link_type = (app.target_is_img_link(description) === true) ? "aimg" : "atext";
			var ds = description;

			//noDefPdf and noDefTarget
			if(category_str.indexOf("notDefPdf") !== -1 && category_str.indexOf("notDefPdf") !== -1) {
				if(app.target_is_definition(ds) === "") {
					switch(link_type) {
						case "aimg":
							new_srccode = 
							ds.match(app.get_a_pt(link_type))[1] + ds.match(app.get_a_pt(link_type))[2].replace(alt_attr_pt, "$1$2(PDF)(別ウィンドウ)$3") + 
							ds.match(app.get_a_pt(link_type))[3];
							break;
						case "atext":
							new_srccode = 
							ds.match(app.get_a_pt(link_type))[1] + ds.match(app.get_a_pt(link_type))[2] + "(PDF)(別ウィンドウ)" + 
							ds.match(app.get_a_pt(link_type))[3];
							break;
					}
					new_survey = "不適合";
					new_comment = "PDFであることを明示していない。\n別ウィンドウで開くことを明示していない。";
				} else if(app.target_is_definition(ds) === "defTargetOK") {
					switch(link_type) {
						case "aimg":
							new_srccode = 
							ds.match(app.get_a_pt(link_type))[1] + ds.match(app.get_a_pt(link_type))[2].replace(alt_attr_pt, "$1$2(PDF)$3") + 
							ds.match(app.get_a_pt(link_type))[3];
							break;
						case "atext":
							new_srccode = 
							ds.match(app.get_a_pt(link_type))[1] + ds.match(app.get_a_pt(link_type))[2] + "(PDF)" + 
							ds.match(app.get_a_pt(link_type))[3];
							break;
					}
					new_survey = "不適合";
					new_comment = "PDFであることを明示していない。";
				} else if(app.target_is_definition(ds) === "defPdfOK") {
					switch(link_type) {
						case "aimg":
							new_srccode = 
							ds.match(app.get_a_pt(link_type))[1] + ds.match(app.get_a_pt(link_type))[2].replace(alt_attr_pt, "$1$2(別ウィンドウ)$3") + 
							ds.match(app.get_a_pt(link_type))[3];
							break;
						case "atext":
							new_srccode = 
							ds.match(app.get_a_pt(link_type))[1] + ds.match(app.get_a_pt(link_type))[2] + "(別ウィンドウ)" + 
							ds.match(app.get_a_pt(link_type))[3];
							break;
					}
					new_survey = "不適合";
					new_comment = "別ウィンドウで開くことを明示していない。";
				} else {
					new_survey = "適合";
				}

			//noDefPdf
			} else if(category_str.indexOf("notDefPdf") !== -1 && category_str.indexOf("notDefTarget") === -1) {
				if(app.target_is_definition(ds) === "") {
					switch(link_type) {
						case "aimg":
							new_srccode = 
							ds.match(app.get_a_pt(link_type))[1] + ds.match(app.get_a_pt(link_type))[2].replace(alt_attr_pt, "$1$2(PDF)$3") + 
							ds.match(app.get_a_pt(link_type))[3];
							break;
						case "atext":
							new_srccode = 
							ds.match(app.get_a_pt(link_type))[1] + ds.match(app.get_a_pt(link_type))[2] + "(PDF)" + 
							ds.match(app.get_a_pt(link_type))[3];
							break;
					}
					new_survey = "不適合";
					new_comment = "PDFであることを明示していない。";
				} else {
					new_survey = "適合";
				}

			//noDefTarget
			} else if(category_str.indexOf("notDefPdf") === -1 && category_str.indexOf("notDefTarget") !== -1) {
				if(app.target_is_definition(ds) === "") {
					switch(link_type) {
						case "aimg":
							new_srccode = 
							ds.match(app.get_a_pt(link_type))[1] + ds.match(app.get_a_pt(link_type))[2].replace(alt_attr_pt, "$1$2(別ウィンドウ)$3") + 
							ds.match(app.get_a_pt(link_type))[3];
							break;
						case "atext":
							new_srccode = 
							ds.match(app.get_a_pt(link_type))[1] + ds.match(app.get_a_pt(link_type))[2] + "(別ウィンドウ)" + 
							ds.match(app.get_a_pt(link_type))[3];
							break;	
					}
					new_survey = "不適合";
					new_comment = "別ウィンドウで開くことを明示していない。";
				} else {
					new_survey = "適合";
				}
			}

			app.set_survey(new_survey);
			app.set_comment(new_comment);
			app.set_srccode(new_srccode);

		//target, false
		} else {

			app.set_survey("適合");
		}
	}
	app.save();

})();