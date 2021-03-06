/*-----------------------------------------------------
 *
 	確認用検査結果詳細ページのCombo選択
 *
------------------------------------------------------*/
javascript:(function() {
	let sv = "不適合";
	class repoCombo {

		constructor() {
			this.d = document;
			this.hash = {
				"ALL": "全て",
				"CHECK": "未",
				"PASS": "適合",
				"PASS2": "適合(注記)",
				"FAIL": "不適合",
				"NA": "非適用"
			};
			this.combo = this.d.getElementsByName("target")[0];
		}

		get_current_key(str) {
			let ret = "";
			for(let key in this.hash) {
				if(this.hash[key] === str) {
					ret = key;
				}
			}
			return ret;
		}

		event_ignite(obj) {
			var event = document.createEvent("HTMLEvents");
			event.initEvent("change", true, false);
			obj.dispatchEvent(event);
		}

		combo_select_as(str) {
			let src = this.get_current_key(str);
			let cnt = 0;
			let opts = this.combo.getElementsByTagName("option");
			for(let opt of opts) {
				if(opt.getAttribute("value") === src) {
					this.combo.selectedIndex = cnt;
					this.event_ignite(opt);
					break;
				}
				cnt++;
			}
		}

	}

	let app = new repoCombo();
	app.combo_select_as(sv);

})();