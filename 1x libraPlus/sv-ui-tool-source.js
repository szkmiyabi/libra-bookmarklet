//-----------------------------------------

// LibraPlus sv画面に機能を拡張

//-----------------------------------------
javascript:(function(){

	const sv_ui_tool = function() {
		var add_btn = document.querySelectorAll('a[id^="add_"]');
		var cp_btn = document.querySelectorAll('a[id^="src_copy_"]');
		var comment = document.querySelector('textarea[id^="comment_"]');
		var description = document.querySelector('textarea[id^="src_"]');
		var srccode = document.querySelector('textarea[id^="updsrc_"]');
		var disp_btn = document.querySelectorAll('button[id^="btn_dsp_"]');
		var src_label = document.querySelectorAll('label[for^="src_"]');
		var get_count = function(element) {
			var pt = new RegExp(/(_)([0-9]+)/);
			var idx = element.getAttribute("id");
			if(!pt.test(idx)) return;
			var nm = parseInt(idx.match(pt)[2]);
			return nm;
		};
		var get_count_for = function(element) {
			var pt = new RegExp(/(_)([0-9]+)/);
			var idx = element.getAttribute("for");
			if(!pt.test(idx)) return;
			var nm = parseInt(idx.match(pt)[2]);
			return nm;
		};

		for(var i=0; i<add_btn.length; i++) {
			var el = add_btn[i];
			var btn = document.createElement("a");
			var idx = get_count(el);
			btn.setAttribute("id", `comment_clear_btn_${idx}`);
			btn.setAttribute("href", `javascript:void(0)`);
			btn.innerHTML = `<span class="badge badge-pill badge-warning m-l-3">クリア</span>`;
			var btn_scr1 = `
				(function(){
					document.querySelector('textarea[id^="comment_${idx}"]').value = "";
				})();
			`;
			btn.setAttribute("onclick", btn_scr1);
			el.parentElement.insertBefore(btn, el.nextSibling);

			var btn1 = document.querySelector(`#comment_clear_btn_${idx}`);
			var btn = document.createElement("a");
			btn.innerHTML = `<span class="badge badge-pill badge-info m-l-3">改行</span>`;
			btn.setAttribute("id", `comment_br_btn_${idx}`);
			btn.setAttribute("href", `javascript:void(0)`);
			var btn_scr2 = `
				(function(){
					var src = document.querySelector('textarea[id^="comment_${idx}"]');
					var sentence = src.value;
					var len = sentence.length;
					var pos = src.selectionStart;
					var before = sentence.substr(0, pos);
					var after = sentence.substr(pos, len);
					sentence = before + "\\r\\n" + after;
					src.value = sentence;
				})();
			`;
			btn.setAttribute("onclick", btn_scr2);
			el.parentElement.insertBefore(btn, btn1.nextSibling);
		}

		for(var i=0; i<src_label.length; i++) {
			var el = src_label[i];
			var btn = document.createElement("a");
			var idx = get_count_for(el);
			btn.setAttribute("id", `srccode_clear_btn_${idx}`);
			btn.setAttribute("href", `javascript:void(0)`);
			btn.innerHTML = `<span class="badge badge-pill badge-warning m-l-3">クリア</span>`;
			var btn_scr1 = `
				(function(){
					document.querySelector('textarea[id^="src_${idx}"]').value = "";
				})();
			`;
			btn.setAttribute("onclick", btn_scr1);
			el.parentElement.insertBefore(btn, el.nextSibling);

			var btn1 = document.querySelector(`#srccode_clear_btn_${idx}`);
			var btn = document.createElement("a");
			btn.innerHTML = `<span class="badge badge-pill badge-info m-l-3">改行</span>`;
			btn.setAttribute("id", `srccode_br_btn_${idx}`);
			btn.setAttribute("href", `javascript:void(0)`);
			var btn_scr2 = `
				(function(){
					var src = document.querySelector('textarea[id^="src_${idx}"]');
					var sentence = src.value;
					var len = sentence.length;
					var pos = src.selectionStart;
					var before = sentence.substr(0, pos);
					var after = sentence.substr(pos, len);
					sentence = before + "\\r\\n" + after;
					src.value = sentence;
				})();
			`;
			btn.setAttribute("onclick", btn_scr2);
			el.parentElement.insertBefore(btn, btn1.nextSibling);
		}

		for(var i=0; i<cp_btn.length; i++) {
			var el = cp_btn[i];
			var btn = document.createElement("a");
			var idx = get_count(el);
			btn.setAttribute("id", `updsrc_clear_btn_${idx}`);
			btn.setAttribute("href", `javascript:void(0)`);
			btn.innerHTML = `<span class="badge badge-pill badge-warning m-l-3">クリア</span>`;
			var btn_scr1 = `
				(function(){
					document.querySelector('textarea[id^="updsrc_${idx}"]').value = "";
				})();
			`;
			btn.setAttribute("onclick", btn_scr1);
			el.parentElement.insertBefore(btn, el.nextSibling);

			var btn1 = document.querySelector(`#updsrc_clear_btn_${idx}`);
			var btn = document.createElement("a");
			btn.innerHTML = `<span class="badge badge-pill badge-info m-l-3">改行</span>`;
			btn.setAttribute("id", `updsrc_br_btn_${idx}`);
			btn.setAttribute("href", `javascript:void(0)`);
			var btn_scr2 = `
				(function(){
					var src = document.querySelector('textarea[id^="updsrc_${idx}"]');
					var sentence = src.value;
					var len = sentence.length;
					var pos = src.selectionStart;
					var before = sentence.substr(0, pos);
					var after = sentence.substr(pos, len);
					sentence = before + "\\r\\n" + after;
					src.value = sentence;
				})();
			`;
			btn.setAttribute("onclick", btn_scr2);
			el.parentElement.insertBefore(btn, btn1.nextSibling);

			var btn2 = document.querySelector(`#updsrc_br_btn_${idx}`);
			var btn = document.createElement("a");
			btn.innerHTML = `<span class="badge badge-pill badge-info m-l-3">空alt化</span>`;
			btn.setAttribute("id", `alt_clear_btn_${idx}`);
			btn.setAttribute("href", `javascript:void(0)`);
			var btn_scr3 = `
				(function(){
					var src = document.querySelector('textarea[id^="updsrc_${idx}"]');
					var srctxt = src.value;
					src.value = srctxt.replace(/alt=".+?"/mg, 'alt=""');
				})();
			`;
			btn.setAttribute("onclick", btn_scr3);
			el.parentElement.insertBefore(btn, btn2.nextSibling);

			var btn3 = document.querySelector(`#alt_clear_btn_${idx}`);
			var btn = document.createElement("a");
			btn.innerHTML = `<span class="badge badge-pill badge-info m-l-3">非リンク化</span>`;
			btn.setAttribute("id", `alt_clear_btn_${idx}`);
			btn.setAttribute("href", `javascript:void(0)`);
			var btn_scr4 = `
				(function(){
					var src = document.querySelector('textarea[id^="updsrc_${idx}"]');
					var srctxt = src.value;
					srctxt = srctxt.replace(/<a.*?>/mg, "").replace(/<\\/a>/mg, "");
					src.value = srctxt;
				})();
			`;
			btn.setAttribute("onclick", btn_scr4);
			el.parentElement.insertBefore(btn, btn3.nextSibling);
		}

		try {
			for(var i=0; i<disp_btn.length; i++) {
				var el = disp_btn[i];
				el.click();
			}
		} catch(e) {}

	};
	sv_ui_tool();

})();
