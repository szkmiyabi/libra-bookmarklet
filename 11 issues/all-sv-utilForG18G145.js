/*------------------------------------*/
/* all-sv-utilForG18G145 */
/* 1.3.1 G18G145 総務省検査用 */
/*------------------------------------*/

javascript:(function(){
	function allDiagClass() {
		heading = document.getElementsByTagName("table").item(0);
		tbl = document.getElementsByTagName("table").item(2);
		flags = {
			"UNCOMP": "CHECK",
			"PASS": "PASS_HC",
			"PASS2": "PASS2",
			"FAIL": "FAIL_HC",
			"FAIL2": "FAIL2",
			"NA": "NA_HC"
		};
		nmflags = {
			"CHECK": "0",
			"PASS_HC": "1",
			"PASS2": "2",
			"FAIL_HC": "3",
			"FAIL2": "4",
			"NA_HC": "5"
		};
	}
	allDiagClass.prototype = {
		init_datas: function() {
			return tbl.rows;
		},
		survey_obj: function(row_obj) {
			return row_obj.cells.item(2);
		},
		comment_obj: function(row_obj) {
			return row_obj.cells.item(3);
		},
		description_obj: function(row_obj) {
			return row_obj.cells.item(4);
		},
		srccode_obj: function(row_obj) {
			return row_obj.cells.item(5);
		},
		get_text: function(obj) {
			return obj.getElementsByTagName("textarea").item(0).value;
		},
		set_text: function(obj, str) {
			obj.getElementsByTagName("textarea").item(0).value = str;
		},
		clear_text: function(obj) {
			obj.getElementsByTagName("textarea").item(0).value = "";
		},
		set_survey: function(obj, flag) {
			var ts = obj.getElementsByTagName("select").item(0);
			var key_val = "";
			for(var key in flags) {
				if(key == flag) {
					key_val = flags[key];
					break;
				}
			}
			var key_nm = 0;
			for(var key in nmflags) {
				if(key == key_val) {
					key_nm = Number(nmflags[key]);
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
		},
		get_survey: function(obj) {
			var ts = obj.getElementsByTagName("select").item(0);
			var idx = ts.selectedIndex + "";
			var primary_key = "";
			var secondary_key = "";
			for(var key in nmflags) {
				var val = nmflags[key] + "";
				if(idx === val) {
					primary_key = key;
					break;
				}
			}
			for(var key in flags) {
				var val = flags[key];
				if(primary_key === val) {
					secondary_key = key;
					break;
				}
			}
			return secondary_key;

		},
		is_text_empty: function(obj) {
			var ta = obj.getElementsByTagName("textarea").item(0);
			if(ta.value === "" || ta.value === null) return true;
			else return false;
		},
		save: function () {
			var d = document.getElementsByTagName("input");
			for(var i=0; i < d.length; i++) {
				var itag = d.item(i);
				var ival = itag.value;
				if(ival == "一括登録") {
					itag.click();
				break;
				}
			}
		},
		clean_text: function(str) {
			str = str.replace(/^ +/mg, "");
			str = str.replace(/(\r\n|\n)/mg, "");
			str = str.replace(/\t/mg, "");
			return str;
		},
		get_tech_code: function() {
			var rows = heading.rows;
			var row = rows.item(0);
			return row.cells.item(5).innerText;
		}
	};

	/* ---- mainルーチンひな形 ---- */
	var diag = new allDiagClass();
	var arr = diag.init_datas();
	for(var i=0; i<arr.length; i++) {
		if(i == 0) continue;
		var row = arr.item(i);
		var survey_obj = diag.survey_obj(row);
		var comment_obj = diag.comment_obj(row);
		var description_obj = diag.description_obj(row);
		var srccode_obj = diag.srccode_obj(row);

		/* ---- main処理 ---- */

		/* ---- 以下はサンプルコードのため、実装時には撤去すること ---- */

		/* 判定を取得 */
		var survey = diag.get_survey(survey_obj);

		var pt1 = new RegExp(/(src="\/main_content\/000000014\.gif"|src="\/main_content\/000000049.gif"|alt="文字サイズ変更"|alt="アクセシビリティ閲覧支援ツール")/);
		var pt2 = new RegExp(/(src="\/main_content\/000000014\.gif")/);
		var description = diag.get_text(description_obj);

		/* 未判定の場合のみ、処理を実行 */
		switch(diag.get_tech_code()) {
			case "G18":
					if(pt1.test(description)) {
						diag.set_survey(survey_obj, "PASS");
					} else {
						if(i != (arr.length - 1)) {
							diag.set_survey(survey_obj, "NA");
						}
					}
					/* ソース先頭は一覧表末尾なので、末尾判定 */
					if(i == (arr.length - 1)) {
						diag.set_survey(survey_obj, "PASS");
					}
				break;
			case "G145":
					if(pt2.test(description)) {
						diag.set_survey(survey_obj, "PASS");
					} else {
						diag.set_survey(survey_obj, "NA");
					}
				break;
		}

		/* ---- サンプルコードここまで ---- */

	}

})();