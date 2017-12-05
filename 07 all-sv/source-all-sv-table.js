/*-----------------------------------------------------
 *
 	自動一括検査（一覧表ページ）
 *
------------------------------------------------------*/
javascript:(function(){
  var flag = "PASS";
  var cp_flag = "no";

  function allDialogTableUtil() {
    this.tbl = document.getElementsByTagName("table").item(2);
    this.hash = {
      "PASS": "PASS_HC",
      "PASS2": "PASS2",
      "FAIL": "FAIL_HC",
      "FAIL2": "FAIL2",
      "NA": "NA_HC",
      "UNCOMP": "CHECK"
    };
    this.cp_hash = {
      "yes": "1",
      "no": "0"
    };
  }

  allDialogTableUtil.prototype = {

    get_rows: function() {
      return this.tbl.rows;
    },
    get_cols: function(row) {
      return row.cells;
    },
    _get_select: function(cols, n) {
      var col = cols.item(n);
      return col.getElementsByTagName("select").item(0);
    },
    get_survey: function(cols) {
      var select = this._get_select(cols, 2);
      var current = select.options[select.selectedIndex].value;
      for(var key in this.hash) {
        if(this.hash[key] === current) return key;
      }
      return null;
    },
    _get_textarea: function(cols, n) {
      var col = cols.item(n);
      return col.getElementsByTagName("textarea").item(0).value;
    },
    get_comment: function(cols) {
      return this._get_textarea(cols, 3);
    },
    get_description: function(cols) {
      return this._get_textarea(cols, 4);
    },
    get_srccode: function(cols) {
      return this._get_textarea(cols, 5);
    },
    set_survey: function(cols, flag) {
      var hash_val = this.hash[flag];
      var select = this._get_select(cols, 2);
      for(var i=0; i<select.options.length; i++) {
        var opt = select.options[i];
        if(opt.value === hash_val) {
          select.selectedIndex = i;
          var event = document.createEvent("HTMLEvents");
          event.initEvent("change", true, false);
          select.dispatchEvent(event);
          break;
        }
      }
    },
    set_survey_copy: function(cols, flag) {
      var cp_hash_val = this.cp_hash[flag];
      var cp_name_pt = new RegExp(/(copy_)([0-9]+)/);
      var col = cols.item(2);
      var ips = col.getElementsByTagName("input");
      for(var i=0; i<ips.length; i++) {
        var ip = ips.item(i);
        var ip_name = ip.name;
        var ip_value = ip.value;
        if(cp_name_pt.test(ip_name) && ip_value === cp_hash_val) {
          ip.checked = true;
          break;
        }
      }
    },
    _set_textarea: function(cols, n, str) {
      var col = cols.item(n);
      col.getElementsByTagName("textarea").item(0).value = str;
    },
    set_comment: function(cols, str) {
      this._set_textarea(cols, 3, str);
    },
    set_description: function(cols, str) {
      this._set_textarea(cols, 4, str);
    },
    set_srccode: function(cols, str) {
      this._set_textarea(cols, 5, str);
    }

  };

  var util = new allDialogTableUtil();
  var rows = util.get_rows();
  for(var i=0; i<rows.length; i++) {
    if(i < 1) continue;
    var row = rows.item(i);
    var cols = util.get_cols(row);
    util.set_survey(cols, flag);
    switch(flag) {
      case "PASS":
        util.set_comment(cols, "");
        util.set_srccode(cols, "");
        break;
      case "NA":
        util.set_comment(cols, "判定すべき対象コンテンツが使用されていない");
        break;
    }
  }

})();