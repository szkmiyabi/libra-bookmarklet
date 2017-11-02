/*-----------------------------------------------------
 *
 	自動一括検査（一覧表ページ）
 *
------------------------------------------------------*/
javascript:(function(){
  var flag = "PASS";
  if(mode_check() == "first") {
	  var tbl = document.getElementsByTagName("table").item(2);
	  var tr = tbl.rows;
	  for(var i=0; i<tr.length; i++) {
	    if(i == 0) continue;
	    var row = tr.item(i);

	    /* 検査結果列 */
	    var col3 = row.cells.item(2);
	    /* コメント列 */
	    var col4 = row.cells.item(3);
	    /* 対象ソースコード列 */
	    var col5 = row.cells.item(4);
	    /* 修正ソースコード列 */
	    var col6 = row.cells.item(5);

	    /* ======メイン処理======= */

	    /* 対象ソースコード取得 */
	    dropdown_select(col3, flag);
	    textarea_insert(col4, "");
      textarea_insert(col6, "");
	  }
	  click_save_btn();
  } else {
    click_close_btn();
  }

  /* テキストエリアのデータ取得 */
  function textarea_get(obj) {
   return obj.getElementsByTagName("textarea").item(0).value;
  }

  /* テキストエリアにデータ挿入 */
  function textarea_insert(obj, str) {
   obj.getElementsByTagName("textarea").item(0).value = str;
  }

  /* テキストエリアのデータ削除 */
  function textarea_clear(obj) {
   obj.getElementsByTagName("textarea").item(0).value = "";
  }

  /* 判定結果選択 */
  function dropdown_select(obj, key_str) {
   var ts = obj.getElementsByTagName("select").item(0);
   var flags = {
     "PASS": "PASS_HC",
     "PASS2": "PASS2",
     "FAIL": "FAIL_HC",
     "FAIL2": "FAIL2",
     "NA": "NA_HC"
   };
   var key_val = "";
   for(var key in flags) {
     if(key == key_str) {
       key_val = flags[key].toString();
       break;
     }
   }
   var nmflags = {
     "CHECK": "0",
     "PASS_HC": "1",
     "PASS2": "2",
     "FAIL_HC": "3",
     "FAIL2": "4",
     "NA_HC": "5"
   };
   var key_nm = 0;
   for(var key in nmflags) {
     if(key == key_val) {
       key_nm = Number(nmflags[key].toString());
       break;
     }
   }
   for(var i=0; i < ts.length; i++) {
     if(ts.options[i].value == key_val) {
       ts.selectedIndex = key_nm;
       var event = document.createEvent("HTMLEvents");
       event.initEvent("change", true, false);
       ts.dispatchEvent(event);
       break;
     }
   }
  }
  /* 保存ボタンクリック */
  function click_save_btn() {
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
  /* 閉じるボタンクリック */
  function click_close_btn() {
    var d = document.getElementsByTagName("input");
    for(var i=0; i < d.length; i++) {
      var itag = d.item(i);
      var ival = itag.value;
      if(ival == "閉じる") {
        itag.click();
        break;
      }
    }
  }
  /* 画面モードチェック */
  function mode_check() {
    var tmp = null;
    var regx = new RegExp("allupd/$");
    var tmp = regx.test(location.href);
    if(tmp == false) {
      return "first";
    } else if(tmp == true) {
      return "last";
    }
  }
})();