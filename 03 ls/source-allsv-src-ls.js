/*-----------------------------------------------------
 *
 	一括検査画面で対象ソースコード一覧ポップアップ表示
 *
------------------------------------------------------*/
javascript:(function(){
	/* 基本クラス */
	class allSurveyByTable {
		constructor() {
			this.heading = document.getElementsByTagName("table").item(0);
			this.tbl = document.getElementsByTagName("table").item(2);
			this.hash = {
				"UNCOMP": "未判定",
				"PASS":"適合",
				"PASS2":"適合(注記)",
				"FAIL":"不適合",
				"NA":"非適用"
			};
			this.flags = {
				"UNCOMP": "CHECK",
				"PASS": "PASS_HC",
				"PASS2": "PASS2",
				"FAIL": "FAIL_HC",
				"NA": "NA_HC"
			};
			this.nmflags = {
				"CHECK": "0",
				"PASS_HC": "1",
				"PASS2": "2",
				"FAIL_HC": "3",
				"NA_HC": "4"
			};
		}

		init_datas() {
			return this.tbl.rows;
		}

		survey_obj(row_obj) {
			return row_obj.cells.item(2);
		}

		comment_obj(row_obj) {
			return row_obj.cells.item(3);
		}

		description_obj(row_obj) {
			return row_obj.cells.item(4);
		}

		srccode_obj(row_obj) {
			return row_obj.cells.item(5);
		}

		get_text(obj) {
			return obj.getElementsByTagName("textarea").item(0).value;
		}

		set_text(obj, str) {
			obj.getElementsByTagName("textarea").item(0).value = str;
		}

		clear_text(obj) {
			obj.getElementsByTagName("textarea").item(0).value = "";
		}

		set_survey(obj, flag) {
			var ts = obj.getElementsByTagName("select").item(0);
			var flag_key = "";
			for(var key in this.hash) {
				var vl = this.hash[key];
				if(vl == flag) {
					flag_key = key;
					break;
				}
			}
			var key_val = "";
			for(var key in this.flags) {
				if(key == flag_key) {
					key_val = this.flags[key];
					break;
				}
			}
			var key_nm = 0;
			for(var key in this.nmflags) {
				if(key == key_val) {
					key_nm = Number(this.nmflags[key]);
					break;
				}
			}
			for(var i=0; i<ts.length; i++) {
				if(ts.options[i].value == key_val) {
					ts.selectedIndex = key_nm;
					var event = document.createEvent("HTMLEvents");
					event.initEvent("change", true, false);
					ts.dispatchEvent(event);
					break;
				}
			}
		}

		get_survey(obj) {
			var ts = obj.getElementsByTagName("select").item(0);
			var idx = ts.selectedIndex + "";
			var primary_key = "";
			var secondary_key = "";
			var hash_val = "";
			for(var key in this.nmflags) {
				var val = this.nmflags[key] + "";
				if(idx === val) {
					primary_key = key;
					break;
				}
			}
			for(var key in this.flags) {
				var val = this.flags[key];
				if(primary_key === val) {
					secondary_key = key;
					break;
				}
			}
			for(var key in this.hash) {
				if(key == secondary_key) {
					hash_val = this.hash[key];
					break;
				}
			}
			return hash_val;
		}

		is_text_empty(obj) {
			var ta = obj.getElementsByTagName("textarea").item(0);
			if(ta.value === "" || ta.value === null) return true;
			else return false;
		}

		save() {
			var d = document.getElementsByTagName("input");
			for(var i=0; i < d.length; i++) {
				var itag = d.item(i);
				var ival = itag.value;
				if(ival == "一括登録") {
					itag.click();
				break;
				}
			}
		}

		clean_text(str) {
			str = str.replace(/^ +/mg, "");
			str = str.replace(/(\r\n|\n)/mg, "");
			str = str.replace(/\t/mg, "");
			return str;
		}

		get_tech_code() {
			var rows = this.heading.rows;
			var row = rows.item(0);
			return row.cells.item(5).innerText;
		}

		get_uniq_id() {
			var dt = new Date();
			return "uid_"+dt.getFullYear()+"-"+dt.getMonth()+"-"+dt.getDate()+"_"+dt.getHours()+"-"+dt.getMinutes()+"-"+dt.getSeconds();
		}

		show_dialog(title, str) {
			var divcss = 'font-family:\'メイリオ\',sans-serif;font-size:90%;padding:5px;position:absolute;top:0;left:0;background:#fff;border:solid #ccc 1px;z-index:2999;width:760px;height:390px;';
			var tacss = ' style=\'width:750px; height: 390px;\'';
			var btnfunc = 'this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);';
			var panel_start = '<div style=\'padding:3px;background:#eee;height:19px;\'><span style=\'float:left;\'>';
				panel_start += '<strong>' + title + '</strong></span><a style=\'float:right;\' onclick=\"' + btnfunc + '\">閉じる' + '</a></div><textarea' + tacss + '>';
			var panel_end = '</textarea>';
			var dialogID = this.get_uniq_id();
			var elm = document.createElement("div");
			elm.id = dialogID;
			elm.style.cssText = divcss;
			elm.innerHTML = panel_start + str + panel_end;
			document.getElementsByTagName("body")[0].appendChild(elm);
		}

	}

	let app = new allSurveyByTable();
	let arr = app.init_datas();
	let str = "";

	for(var i=0; i<arr.length; i++) {
		if(i == 0) continue;
		var row = arr.item(i);
		var survey_obj = app.survey_obj(row);
		var comment_obj = app.comment_obj(row);
		var description_obj = app.description_obj(row);
		var srccode_obj = app.srccode_obj(row);

		var description = app.clean_text(app.get_text(description_obj));
		str += description + "\r\n";		
	}

	app.show_dialog("対象ソースコード一覧", str);

})();