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

		for(var i=0; i<add_btn.length; i++) {
			var el = add_btn[i];
			var btn = document.createElement("a");
			btn.setAttribute("id", `comment_clear_btn_${i}`);
			btn.setAttribute("href", `javascript:void(0)`);
			btn.innerHTML = `<span class="badge badge-pill badge-warning m-l-3">クリア</span>`;
			var btn_scr = `
				(function(){
					document.querySelector('textarea[id^="comment_${i}"]').value = "";
				})();
			`;
			btn.setAttribute("onclick", btn_scr);
			el.parentElement.insertBefore(btn, el.nextSibling);
		}

		for(var i=0; i<cp_btn.length; i++) {
			var el = cp_btn[i];
			var btn = document.createElement("a");
			btn.setAttribute("id", `updsrc_clear_btn_${i}`);
			btn.setAttribute("href", `javascript:void(0)`);
			btn.innerHTML = `<span class="badge badge-pill badge-warning m-l-3">クリア</span>`;
			var btn_scr1 = `
				(function(){
					document.querySelector('textarea[id^="updsrc_${i}"]').value = "";
				})();
			`;
			btn.setAttribute("onclick", btn_scr1);
			el.parentElement.insertBefore(btn, el.nextSibling);
			var btn1 = document.querySelector(`#updsrc_clear_btn_${i}`);
			var btn = document.createElement("a");
			btn.innerHTML = `<span class="badge badge-pill badge-info m-l-3">空alt</span>`;
			btn.setAttribute("id", `alt_clear_btn_${i}`);
			btn.setAttribute("href", `javascript:void(0)`);
			var btn_scr2 = `
				(function(){
					var src = document.querySelector('textarea[id^="updsrc_${i}"]');
					var srctxt = src.value;
					src.value = srctxt.replace(/alt=".+?"/mg, 'alt=""');
				})();
			`;
			btn.setAttribute("onclick", btn_scr2);
			el.parentElement.insertBefore(btn, btn1.nextSibling);
		}
	};
	sv_ui_tool();

})();
