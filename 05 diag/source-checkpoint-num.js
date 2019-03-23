/*--------------------------------------

    チェックポイントに連番を付けて数える
    ソースコードビュー, 検査結果詳細ビューに対応

--------------------------------------*/
javascript:(function(){
	class checkPointUtil {
		
		constructor() {
			this.d = document;
			this.source_tab = this.d.getElementById("tabs-2");
			this.result_tab = this.d.getElementById("tabs-3");
			this.src = this.d.getElementById("source");
			this.ds = this.src.getElementsByTagName("div");
			this.tbl = this.d.getElementById("myTable");
			this.pt_opened = new RegExp(/.*iconSELECT\.png.*/);
			this.pt_fail = new RegExp(/.*iconFAIL_HC\.png.*/);
		}

		is_source_tab_visible() {
			var source_tab_cls = this.source_tab.getAttribute("class");
			if(new RegExp(/.*ui-tabs-hide.*/g).test(source_tab_cls)) return false;
			else return true;
		}

		is_result_tab_visible() {
			var result_tab_cls = this.result_tab.getAttribute("class");
			if(new RegExp(/.*ui-tabs-hide.*/g).test(result_tab_cls)) return false;
			else return true;
		}

		set_all_numbering() {
			if(this.is_source_tab_visible()) this.set_all_numbering_source_tab();
			else if(this.is_result_tab_visible()) this.set_all_numbering_result_tab();
		}

		set_all_numbering_source_tab() {
			var cnt = 1;
			var span_css = "margin-left:25px;font-weight:bold;padding:2px 10px;color:#fff;font-size:16px;background:#BF0000;border-radius:5px;";
			for(var i=0; i<this.ds.length; i+=2) {
				if(i == 0) continue;
				var span_id = "bkm-checkpoint-num-" + cnt;
				var span_html = "" + cnt;
				var span = '<span id="' + span_id + '" style="' + span_css + '">' + span_html + "</span>";
				var dv = this.ds.item(i + 1);
				dv.insertAdjacentHTML("beforebegin", span);
				cnt++;
			}
			var ldv = this.ds.item(1);
			var span_id = "bkm-checkpoint-num-" + cnt;
			var span_html = "" + cnt;
			var span = '<span id="' + span_id + '" style="' + span_css + '">' + span_html + "</span>";
			ldv.insertAdjacentHTML("beforebegin", span);
		}

		set_all_numbering_result_tab() {
			var cnt = 1;
			var span_css = "display:block;font-weight:bold;padding:2px 10px;color:#fff;font-size:16px;background:#BF0000;border-radius:5px;";
			var trs = this.tbl.rows;
			for(var i=0; i<trs.length; i++) {
				if(i == 0) continue;
				var tr = trs.item(i);
				var cl = tr.cells.item(0);
				var span_id = "bkm-checkpoint-num-" + cnt;
				var span_html = "" + cnt;
				var span = '<span id="' + span_id + '" style="' + span_css + '">' + span_html + "</span>";
				var in_atag = cl.getElementsByTagName("a").item(0);
				var in_itag = in_atag.getElementsByTagName("img").item(0);
				in_itag.insertAdjacentHTML("beforebegin", span);
				cnt++;
			}
		}
	}

	let app = new checkPointUtil();
	app.set_all_numbering();

})();