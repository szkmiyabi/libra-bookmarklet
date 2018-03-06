/*----------------------------------------

    水防災HP 地図のマーカーリンク自動判定

-----------------------------------------*/
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

	var fn_hash = {
		"circle_red": "雨量20mm以上",
		"circle_purple": "雨量10～19mm",
		"circle_org": "雨量5～9mm",
		"circle_blu": "雨量1～4mm",
		"circle_wht": "雨量0mm",
		"circle_blk": "雨量 休止・欠測等",
		"trigona_red": "危険,氾濫発生水位",
		"trigona_prp": "警戒,氾濫危険水位",
		"trigona_org": "注意,氾濫注意水位",
		"trigona_blu": "平常水位",
		"trigona_gry": "水位 休止・欠測等",
		"trigona_grn": "水防団待機水位",
		"arrow_up": "水位変化 上昇",
		"arrow_down": "水位変化 下降",
		"arrow_side": "水位 変化無し,無効",
		"icon_itv": "河川カメラ設置場所",
	};

	var this_file_in_hash = function(tag) {
		var pat = new RegExp(/(<img .*?)(src=")(.*?)(")(.*?>)/);
		var mt = tag.match(pat);
		var fname = mt[3];
		var extpat = new RegExp(/(.+\/)(.+?)(\.)(gif|jpg)/);
		var exmt = fname.match(extpat);
		var fnamebody = exmt[2];
		for(var h in fn_hash) {
			if(h === fnamebody) {
				return true;
			}
		}
		return false;
	};

	var this_img_exists_attrval = function(tag) {
		var pat = new RegExp(/(<img .*?)(alt=")(.*?)(")(.*?>)/);
		var mt = tag.match(pat);
		var attr = mt[3];
		if(attr==="") return false;
		else return true;
	};

	var get_custom_add_attrval = function(tag) {
		var atpat = new RegExp(/(<img .*?)(alt=")(.*?)(")(.*?>)/);
		var atmt = tag.match(atpat);
		var attr = atmt[3];
		var fnpat = new RegExp(/(<img .*?)(src=")(.*?)(")(.*?>)/);
		var fnmt = tag.match(fnpat);
		var fname = fnmt[3];
		var extpat = new RegExp(/(.+\/)(.+?)(\.)(gif|jpg)/);
		var exmt = fname.match(extpat);
		var fnamebody = exmt[2];
		var add_txt = fn_hash[fnamebody];
		var altval = attr + " " + add_txt;
		var ppat = new RegExp(/(alt=")(.*?)(")/);
		return tag.replace(ppat, 'alt="' + altval + "(ポップアップ表示します)" + '"');
	};

	for(var i=0; i<arr.length; i++) {
		if(i == 0) continue;
		var row = arr.item(i);
		var survey_obj = diag.survey_obj(row);
		var comment_obj = diag.comment_obj(row);
		var description_obj = diag.description_obj(row);
		var srccode_obj = diag.srccode_obj(row);

		/* ---- main処理 ---- */

		/* ---- 以下はサンプルコードのため、実装時には撤去すること ---- */
		var description = diag.clean_text(diag.get_text(description_obj));
		if(this_file_in_hash(description) && this_img_exists_attrval(description)) {
			diag.set_survey(survey_obj, "FAIL");
			/* 判定コメントをセット */
			diag.set_text(comment_obj, "代替えテキストが不適切\r\nポップアップウィンドウが開くことを明示していない");
			var nsrc = get_custom_add_attrval(description);
			diag.set_text(srccode_obj, nsrc);
		}
		/* ---- サンプルコードここまで ---- */

	}

})();