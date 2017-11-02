/*-----------------------------------------------------
 *
 	次のURLに進む
 *
------------------------------------------------------*/
javascript:(function(){
	var vector="next";
	var survey="all";
	var prompt_flag=false;
	function resultUtil() {
		url = window.location.href;
		d = document;
	}
	resultUtil.prototype = {
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
		is_bs_bkmk_on: function() {
			var trg = d.getElementById("BSurfin_diag");
			if(trg === "undefined" || trg === null) return false;
			else return true;
		},
		is_chk_bkmk_on: function() {
			var trg = d.getElementById("CheckTool_diag");
			if(trg === "undefined" || trg === null) return false;
			else return true;
		},
		survey_next: function() {
			var element = d.getElementById("urlList");
			for(var i=0; i<element.options.length;i++){
				var idx=i+1;
				if(idx == element.options.length){
					alert("これ以上進めません！");
					return;
				}
				if(element.options[i].selected){
					element.options[idx].selected = true;
					break;
				}
			}
			d.getElementById("submitURL").click();
		},
		survey_prev: function() {
			var element=d.getElementById("urlList");
			for(var i=0; i<element.options.length;i++){
				if(element.options[i].selected){
					var idx=i-1;
					if(idx<0){
						alert("これ以上戻れません！");
						return;
					}else{
						element.options[idx].selected = true;
						break;
					}
				}
			}
			d.getElementById("submitURL").click();
		},
		result_next: function() {
			var pat = new RegExp(/\/projID\/[0-9]+\/controlID\/(.+?)\/guideline\/(.+?)\//);
			var mt = url.match(pat);
			var pageID = mt[1];
			var guideline = mt[2];
			var new_pageID = this.pageid_recalc(pageID, "increment");
			var new_url = url.replace(/(\/controlID\/)(.+?)(\/)/, "$1" + new_pageID + "$3");
			window.location.href = new_url;
		},
		result_prev: function() {
			var pat = new RegExp(/\/projID\/[0-9]+\/controlID\/(.+?)\/guideline\/(.+?)\//);
			var mt = url.match(pat);
			var pageID = mt[1];
			var guideline = mt[2];
			var new_pageID = this.pageid_recalc(pageID, "decrement");
			var new_url = url.replace(/(\/controlID\/)(.+?)(\/)/, "$1" + new_pageID + "$3");
			window.location.href = new_url;
		},
		result_this: function() {
			var pat = new RegExp(/\/projID\/[0-9]+\/controlID\/(.+?)\/guideline\/(.+?)\//);
			var mt = url.match(pat);
			var pageID = mt[1];
			var guideline = mt[2];
			var new_pageID = prompt("URL番号を入力してください");
			if(new_pageID === "") return;
			if(!this.is_include_alpha(new_pageID)) {
				var prefix = this.get_alpha(pageID);
				new_pageID = prefix + new_pageID;
			}
			var new_url = url.replace(/(\/controlID\/)(.+?)(\/)/, "$1" + new_pageID + "$3");
			window.location.href = new_url;
		},
		is_include_alpha: function(str) {
			var pat = new RegExp(/[a-zA-Z]+/);
			if(pat.test(str)) return true;
			else return false;
		},
		get_alpha: function(str) {
			var pat = new RegExp(/([a-zA-Z]+)([0-9]+)/);
			var mt = str.match(pat);
			return mt[1];
		},
		pageid_recalc: function(str, type) {
			var pat = new RegExp(/([a-zA-Z\-_]+)([0-9]+)/);
			var mt = str.match(pat);
			var alphabet = mt[1];
			var num = mt[2];
			var num_length = num.length;
			num = Number(num);
			if(type === "increment") num++;
			else num--;
			var prefix = "";
			for(var i=0; i<num_length; i++) {
				prefix += "0";
			}
			var new_num = (prefix + num).slice(-1 * num_length);
			var new_pageid = alphabet + new_num;
			return new_pageid;
		},
		bs_page_next: function() {
			var obj = this.get_bs_object("next");
			if(obj !== null) obj.click();
		},
		bs_page_prev: function() {
			var obj = this.get_bs_object("prev");
			if(obj !== null) obj.click();
		},
		bs_page_this: function() {
			var trg = d.getElementById("pup_urls");
			var pageID = prompt("URL番号を入力してください");
			if(pageID === "") return;
			if(!this.is_include_alpha(pageID)) {
				var prefix = this.bs_get_alpha();
				pageID = prefix + pageID;
			}
			for(var i=0; i<trg.options.length; i++) {
				var opt = trg.options[i];
				var val = opt.getAttribute("value");
				if(val === pageID) {
					trg.selectedIndex = i;
					var event = document.createEvent("HTMLEvents");
					event.initEvent("change", true, false);
					trg.dispatchEvent(event);
					break;
				}
			}
		},
		bs_get_alpha: function() {
			var trg = d.getElementById("pup_urls");
			var sample_opt = trg.options[0];
			var sample_val = sample_opt.getAttribute("value");
			var pat = new RegExp(/([a-zA-Z]+)/);
			var mt = sample_val.match(pat);
			return mt[1];
		},
		get_bs_object: function(type) {
			var hash = {
				"next": "do_next()",
				"prev": "do_prev()"
			};
			var trg = d.getElementById("BSurfin_diag");
			var btns = trg.getElementsByTagName("button");
			for(var i=0; i<btns.length; i++) {
				var btn = btns.item(i);
				if(btn.getAttribute("onclick") === hash[type]) {
					return btn;
				}
			}
			return null;
		},
		chk_page_next: function() {
			var trg = this.get_chk_object("page");
			var idx = trg.selectedIndex;
			var max = trg.options.length;
			idx++;
			if(idx >= max) {
				alert("これ以上進めません");
				return;
			} else {
				trg.selectedIndex = idx;
				var event = document.createEvent("HTMLEvents");
				event.initEvent("change", true, false);
				trg.dispatchEvent(event);
			}
		},
		chk_page_prev: function() {
			var trg = this.get_chk_object("page");
			var idx = trg.selectedIndex;
			var min = 0;
			idx--;
			if(idx <= min) {
				alert("これ以上戻れません");
				return;
			} else {
				trg.selectedIndex = idx;
				var event = document.createEvent("HTMLEvents");
				event.initEvent("change", true, false);
				trg.dispatchEvent(event);
			}
		},
		chk_survey_select: function(type) {
			var arr = ["all", "uc", "ok", "ok2", "fail", "fail2", "na"];
			var num = 0;
			for(var i=0; i<arr.length; i++) {
				var row = arr[i];
				if(row === type) {
					num = i;
					break;
				}
			}
			var trg = this.get_chk_object("survey");
			trg.selectedIndex = i;
			var event = document.createEvent("HTMLEvents");
			event.initEvent("change", true, false);
			trg.dispatchEvent(event);
		},
		chk_btn_click: function(type) {
			var hash = {
				"browse": "do_reporting()",
				"clear": "clear_reporting()"
			};
			var trg = d.getElementById("CheckTool_diag");
			var btns = trg.getElementsByTagName("button");
			for(var i=0; i<btns.length; i++) {
				var btn = btns.item(i);
				if(btn.getAttribute("onclick") === hash[type]) btn.click();
			}
		},
		get_chk_object: function(elm) {
			if(elm === "page") return d.getElementById("pup_page_id");
			else if(elm === "survey") return d.getElementById("pup_survey_flag");
			else return null;
		}
	};

	var util = new resultUtil();
	if(util.is_survey_page()) {
		if(vector === "next") util.survey_next();
		else util.survey_prev();
	} else if(util.is_main_page()) {
		if(util.is_bs_bkmk_on()) {
			if(prompt_flag) {
				util.bs_page_this();
			} else {
				if(vector === "next") util.bs_page_next();
				else util.bs_page_prev();
			}
		} else if(util.is_chk_bkmk_on()) {
			if(vector === "next") {
				util.chk_page_next();
				if(survey !== "") util.chk_survey_select(survey);
				util.chk_btn_click("clear");
				util.chk_btn_click("browse");
			} else {
				util.chk_page_prev();
				if(survey !== "") util.chk_survey_select(survey);
				util.chk_btn_click("clear");
				util.chk_btn_click("browse");
			}
		}
	} else if(util.is_detail_page()) {
		if(prompt_flag) {
			util.result_this();
		} else {
			if(vector === "next") util.result_next();
			else util.result_prev();
		}
	}

})();