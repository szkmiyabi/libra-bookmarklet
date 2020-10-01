/*-----------------------------------------------------
 *
 	検査結果詳細ページで単一実装番号に絞り込む
 *
------------------------------------------------------*/
javascript:(function(){
	var tbl = document.getElementsByTagName("table");
	var ctrltbl = tbl[1];
	var datatbl = tbl[2];
	var getTechArr = function(tbl) {
		var arr = new Array();
		for(var i=1; i<tbl.rows.length; i++) {
			var tr = tbl.rows[i];
			var xtd = tr.cells[1];
			var txt = xtd.innerHTML;
			var flg = false;
			if(arr.length<1) arr.push(txt);
			for(var j=0; j<arr.length; j++) {
				var r = arr[j].toString();
				if(txt == r) flg = true;
			}
			if(flg == false) arr.push(txt);
		}
		return arr;
	};
	var hideTechRow = function(tbl) {
		var tech = prompt("絞り込みたい実装番号を1つ入力してください");
		for(var i=1; i<datatbl.rows.length; i++) {
			var tr = datatbl.rows[i];
			var xtd = tr.cells[1];
			var txt = xtd.innerHTML;
			if(tech != txt) tr.setAttribute("style", "display:none");
		}
	};
	var techExplode = function(arr) {
		var str = "";
		for(var i=0; i<arr.length; i++) {
			str += arr[i].toString();
			if(i != (arr.length - 1)) str += "｜";
		}
		return str;
	};
	var addRow = function(tbl, val) {
		var arow = tbl.insertRow(-1);
		var th = document.createElement("th");
		th.innerHTML = "実装番号";
		th.id = "bkmk-repoFil-preloaded";
		arow.appendChild(th);
		arow.insertCell(-1);
		arow.cells[1].innerHTML = val;
	};
	var modeCheck = function() {
		if(document.getElementById("bkmk-repoFil-preloaded") == null) return "before";
		else return "after";
	};
	if(modeCheck() == "before") addRow(ctrltbl, techExplode(getTechArr(datatbl)));
	else hideTechRow(datatbl);

})();

