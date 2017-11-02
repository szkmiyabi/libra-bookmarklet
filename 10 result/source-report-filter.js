/*-----------------------------------------------------
 *
 	確認用検査結果ページの一覧をフィルターする
 *
------------------------------------------------------*/
javascript:(function(){
  var datas = prompt("url番号一覧をペーストしてください", "meti0001 meti0002 meti0003 meti0004 meti0005 meti0006 meti0007 meti0008 meti0009 meti0012 meti0013 meti0014 meti0016 meti0017 meti0018 meti0019 meti0020 meti0021 meti0022 meti0023 meti0024 meti0025 meti0026 meti0027 meti0028 meti0029 meti0030 meti0031 meti0032 meti0033 meti0034 meti0035 meti0036 meti0037 meti0051 meti0052 meti0053 meti0054 meti0055 meti0056 meti0057 meti0058 meti0059 meti0060 meti0061 meti0064 meti0065 meti0066 meti0067 meti0068 meti0071 meti0072 meti0073 meti0075 meti0076 meti0083 meti0084 meti0085 meti0086 meti0087 meti0088 meti0089 meti0090 meti0092 meti0093 meti0094 meti0095 meti0096 meti0097 meti0098 meti0099 meti0100 meti0101 meti0104 meti0105 meti0106 meti0107 meti0108 meti0109 meti0110 meti0111 meti0130 meti0131 meti0132 meti0133 meti0134 meti0135 meti0136 meti0137 meti0138 meti0139 meti0140 meti0141 meti0142 meti0143 meti0144 meti0145 meti0146 meti0147 meti0148 meti0149 meti0150");
  var chkarr = datas.split(/( |\t)/);

  var delarr = new Array();
  function array_checker(arr, val) {
    for(var i=0; i<arr.length; i++) {
      var v = arr[i].toString();
      if(val == v) return true;
    }
    return false;
  }

  var tbl = document.getElementsByTagName("table").item(2);
  var tr = tbl.rows;
  for(var i=0; i<tr.length; i++){
    if(i < 2) continue;
    var row = tr.item(i);
    var celldata = row.cells.item(0).innerText;
    if(!array_checker(chkarr, celldata)) {
      delarr.push(celldata);
    }
  }

  for(var i=0; i<delarr.length; i++) {
    var idx = 0;
    var line = delarr[i].toString();
    idx = getDeleteTableRowNum(line);
    if(idx != 0) deleteTableRow(idx);
  }

  function getDeleteTableRowNum(key) {
    var idx = 0;
    var tbl = document.getElementsByTagName("table").item(2);
    var tr =tbl.rows;
    for(var j=0; j<tr.length; j++) {
      if(j < 2) continue;
      var row = tr.item(j);
      var celldata = row.cells.item(0).innerText;
      if(key == celldata) {
        idx = j;
        break;
      }
    }
    return idx;
  }

  function deleteTableRow(idx) {
    var tbl = document.getElementsByTagName("table").item(2);
    tbl.deleteRow(idx);
  }
})();


