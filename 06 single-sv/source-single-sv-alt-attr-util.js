/*-----------------------------------------------------
 *
 	単一自動判定をする  （多彩な処理の雛形）
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


	/* 個別処理のオブジェクトを定義 */
	function altAttrUtil() {
		/* プロパティをthis keywordで定義 */
		this.sv = "不適合";
		this.util = new surveyDialogUtil();
		this.pat1 = new RegExp(/(<img.)(.+?)( *\/*>)/);
		this.pat2 = new RegExp(/(alt=""|alt=".+?")/);
	}
	/* 具体処理をprototypeで定義 */
	altAttrUtil.prototype = {
		/* メソッドを定義、1個だけなのでexecと命名 */
		exec: function() {
			var key = this.util.get_survey_key(this.sv);
			this.util.set_survey(key);
			var mystr = prompt("alt属性値を入力してください");
			if(mystr==="") this.util.set_comment("支援技術が無視すべき画像にも、alt属性値を付与し値は空にする。");
			else this.util.set_comment("alt属性が不適切");
			var old_src = this.util.text_clean(this.util.get_srccode());
			if(!this.pat1.test(old_src)) return;
			var old_img = old_src.match(this.pat1)[0];
			var new_img = "";
			if(this.pat2.test(old_img)) {
				new_img = old_img.replace(this.pat2, 'alt="' + mystr + '"');
			} else {
				var tmp = old_img.match(this.pat1);
				new_img = tmp[1] + tmp[2] + ' alt="' + mystr + '"' + tmp[3];
			}
			this.util.set_srccode(new_img);
		}
	};
	/* オブジェクトをインスタンス化して実行 */
	var app = new altAttrUtil();
	app.exec();

})();