/*-----------------------------------------------------
 *
 	達成基準を進む、戻す、TOPに戻す、BOTTOMに進む
 	class構文に差し替え済み
 *
------------------------------------------------------*/
javascript:(function(){
	var type="next-uncomp";

	class guidelineDropdownUtil {

		constructor() {
			this.guideline = document.getElementById("guideline");
			this.min = 0;
			this.max = this.guideline.options.length;
			this.idx = this.guideline.selectedIndex;
			this.pat = new RegExp(/【完】.+/);
		}

		select_next() {
			this.idx++;
			if(!this.is_max_ov(this.idx)) {
				this.guideline.selectedIndex = this.idx;
				this.event_ignite(this.guideline);
			} else {
				alert("これ以上進めません！");
			}
		}

		select_next_uncomp() {
			this.idx++;
			if(!this.is_max_ov(this.idx)){
				var row = this.guideline.options[this.idx].text;
				if(this.pat.test(row)) {
					this.select_next_uncomp();
				}
				this.guideline.selectedIndex = this.idx;
				this.event_ignite(this.guideline);
			} else {
				alert("これ以上進めません！");
			}
		};

		select_prev(){
			this.idx--;
			if(!this.is_min_ov(this.idx)) {
				this.guideline.selectedIndex = this.idx;
				this.event_ignite(this.guideline);
			} else {
				alert("これ以上戻れません！");
			}
		}

		select_prev_uncomp() {
			this.idx--;
			if(!this.is_min_ov(this.idx)){
				var row = this.guideline.options[this.idx].text;
				if(this.pat.test(row)) {
					this.select_prev_uncomp();
				}
				this.guideline.selectedIndex = this.idx;
				this.event_ignite(this.guideline);
			} else {
				alert("これ以上戻れません！");
			}
		}

		select_top() {
			this.guideline.selectedIndex = 1;
			this.event_ignite(this.guideline);
		}

		select_top_uncomp() {
			for(var i=0; i<this.guideline.options.length; i++) {
				if(i == 0) continue;
				if(i == this.idx) continue;
				var row = this.guideline.options[i].text;
				if(!this.pat.test(row)) {
					this.guideline.selectedIndex = i;
					this.event_ignite(this.guideline);
					break;
				}
			}
		}

		select_bottom() {
			this.guideline.selectedIndex = (this.max - 1);
			this.event_ignite(this.guideline);
		}

		event_ignite(obj) {
				var event = document.createEvent("HTMLEvents");
				event.initEvent("change", true, false);
				obj.dispatchEvent(event);
		};

		is_max_ov(num){
			if(num >= this.max) {
				return true;
			} else {
				return false;
			}
		}

		is_min_ov(num){
			if(num <= this.min) {
				return true;
			} else {
				return false;
			}
		}

		get_all_text() {
			var str = "";
			var pt = new RegExp(/[A-Z]+[0-9]+/);
			for(var i=1; i<this.guideline.options.length; i++) {
				var opt = this.guideline.options[i].text;
				var opt_text = pt.test(opt.trim()) ? opt.match(pt)[0] : "";
				str += opt_text + "\r\n";
			}
			return str;
		}
	}

	var diag = new guidelineDropdownUtil();
	switch(type) {
		case "next":
			diag.select_next();
			break;
		case "next-uncomp":
			diag.select_next_uncomp();
			break;
		case "prev":
			diag.select_prev();
			break;
		case "prev-uncomp":
			diag.select_prev_uncomp();
			break;
		case "top-uncomp":
			diag.select_top_uncomp();
			break;
		case "top":
			diag.select_top();
			break;
		case "bottom":
			diag.select_bottom();
			break;
		case "list":
			alert(diag.get_all_text());
			break;
	}

})();