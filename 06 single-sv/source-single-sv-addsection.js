/*-----------------------------------------------------
 *
 	判定を箇条書きに変更する
 	---mainクラスをclass構文に差し替え済み---
 *
------------------------------------------------------*/
javascript:(function(){
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

		get_survey(flag) {
			for(var i=0; i<this.form.elements.length; i++) {
				var ip = this.form.elements[i];
				var val = ip.value;
				if(val===flag) {
					this.diag_clean(flag);
					ip.click();
					break;
				}
			}
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
			for(var i=0; i<this.form.elements.length; i++) {
				var ip = this.form.elements[i];
				var val = ip.value;
				if(val===flag) {
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

		text_clean(str) {
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

	class singleSurveyAddSection extends singleSurvey {
		constructor(seq) {
			super();
			this.seq = seq;
		}

		dispatch(str) {
			return this.seq[0] + ".\r\n" + str + "\r\n" + this.seq[1] + ".\r\n";
		}

		exec() {
			let comment = this.get_comment();
			let description = this.get_description();
			let srccode = this.get_srccode();
			this.set_comment(this.dispatch(comment, null));
			this.set_description(this.dispatch(description, null));
			this.set_srccode(this.dispatch(srccode));
		}
	}

	try {
		let seq = "[" + prompt("input the number that start and end.", "1,2") + "]";
		let app = new singleSurveyAddSection(eval(seq));
		app.exec();
	} catch(e) {
		alert(e);
	}

})();