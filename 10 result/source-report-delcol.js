/*---------------------------------
    URL列を削除
----------------------------------*/
javascript:(function(){
	var tbl = document.getElementsByTagName("table").item(2);
	tbl.deleteRow(0);
	var trs = tbl.rows;
	for(var i=0; i<trs.length; i++) {
		var tr = trs.item(i);
		if(i===0) {
			tr.insertCell(0);
			tr.cells.item(0).setAttribute(
				"style", 
				"font-weight: bold; text-align: center; background: #FFFFCC"
			);
			tr.cells.item(0).innerText = "管理番号";
			continue;
		}
		tr.deleteCell(1);
	}
})();


javascript:(function(){var tbl = document.getElementsByTagName("table").item(2);tbl.deleteRow(0);var trs = tbl.rows;for(var i=0; i<trs.length; i++) {var tr = trs.item(i);if(i===0) {tr.insertCell(0);tr.cells.item(0).setAttribute("style", "font-weight: bold; text-align: center; background: #FFFFCC");tr.cells.item(0).innerText = "管理番号";continue;}tr.deleteCell(1);}})();