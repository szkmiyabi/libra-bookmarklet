/*-----------------------------------------------------
 *
 	W3Cレポート整形
 *
------------------------------------------------------*/
javascript:(function(){
	class appClass {
		w3c_report() {
			var str = "";
            var crurl = location.href;
            if(crurl.indexOf(".org/nu/") > 0) {
                var rep_wrapper = document.getElementById("results");
                var errcnt = 0;
                var linept = new RegExp(/(From|At)( line )([0-9]+?)(,)/);
                var inwrap = rep_wrapper.getElementsByTagName("ol")[0];
                var rows = inwrap.getElementsByTagName("li");
                for(var i=0; i<rows.length; i++) {
                    var row = rows.item(i);
                    var atr = row.getAttribute("class");
                    if(atr === "error") {
                        errcnt++;
                        var emsg = row.getElementsByTagName("p")[0].getElementsByTagName("span")[0].innerText;
                        var eline = row.getElementsByClassName("location")[0].getElementsByTagName("a")[0].innerText;
                        var elinestr = "";
                        if(linept.test(eline)) {
                            elinestr = eline.match(linept)[3];
                        }
                        elinestr += "行目";
                        var esrc = row.getElementsByClassName("extract")[0].getElementsByTagName("code")[0].innerText;
                        str += elinestr + "\n" + emsg + "\n\n" + esrc + "\n\n\n";
                    }
                }
            } else {
                var rep_wrapper = document.getElementById("error_loop");
                var errcnt = 0;
                var linept = new RegExp(/(Line )([0-9]+?)(,)/);
                var rows = rep_wrapper.getElementsByTagName("li");
                for(var i=0; i<rows.length; i++) {
                    var row = rows.item(i);
                    var atr = row.getAttribute("class");
                    if(atr === "msg_err") {
                        errcnt++;
                        var eline = row.getElementsByTagName("em")[0].innerText;
                        var elinestr = "";
                        if(linept.test(eline)) {
                            elinestr = eline.match(linept)[2];
                        }
                        elinestr += "行目";
                        var emsg = row.getElementsByClassName("msg")[0].innerText;
                        var esrc = row.getElementsByTagName("pre")[0].getElementsByTagName("code")[0].innerText;
                        str += elinestr + "\n" + emsg + "\n\n" + esrc + "\n\n\n";
                    }
                }
            }
            show_bkmk_dialog("presv-addon-w3c-ui", "W3C Report", str);
			function show_bkmk_dialog(id, title, str) {
				var divcss = 'font-family:\'メイリオ\',sans-serif;font-size:90%;padding:5px;position:absolute;top:0;left:0;background:#fff;border:solid #ccc 1px;z-index:2999;width:760px;height:390px;';
				var tacss = ' style=\'width:750px; height: 390px;\'';
				var btnfunc = 'this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);';
				var panel_start = '<div style=\'padding:3px;background:#eee;height:19px;\'><span style=\'float:left;\'><strong>' + title + '</strong></span><a style=\'float:right;\' onclick=\"' + btnfunc + '\">閉じる' + '</a></div><textarea' + tacss + '>';
				var panel_end = '</textarea>';
				var elm = document.createElement("div");
				elm.id = id;
				elm.style.cssText = divcss;
				elm.innerHTML = panel_start + str + panel_end;
				document.getElementsByTagName("body")[0].appendChild(elm);
			}
		}
	}
	let app = new appClass();
	app.w3c_report();
})();