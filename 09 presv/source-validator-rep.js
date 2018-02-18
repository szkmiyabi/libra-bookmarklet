/*-----------------------------------------------

  Html Validator のレポートを自動生成

------------------------------------------------*/
javascript:(function(){

	function htmlCheckerUtil() {
		this.url = location.href;
		this.bvpt = new RegExp(/http.*:\/\/validator.w3.org\/check\?/);
		this.nvpt = new RegExp(/http.*:\/\/validator.w3.org\/nu\/\?/);
		this.rep_wrapper = null;
		this.env = null;

	}
	htmlCheckerUtil.prototype = {
		init: function() {
			if(this.nvpt.test(this.url)) {
				this.env = "nu";
				this.rep_wrapper = document.getElementById("results");
			} else if(this.bvpt.test(this.url)) {
				this.env = "bs";
				this.rep_wrapper = document.getElementById("error_loop");
			}
		},
		exec: function() {
			switch(this.env) {
				case "nu":
					this.disp_nu_validator_errors();
					break;
				case "bs":
					this.disp_bs_validator_errors();
					break;
				default:
					break;
			}
		},
		browse_new_tab: function(str) {
			var nwd = window.open("","_blank").document;
			nwd.writeln('<DOCTYPE html>');
			nwd.writeln('<html lang="ja">');
			nwd.writeln('<head><meta charset="utf-8">');
			nwd.writeln('<title>BrNewTab</title>');
			nwd.writeln('<style>body{font-family:"メイリオ",Meiryo,sans-serif;}</style>');
			nwd.writeln('</head>');
			nwd.writeln('<body>');
			nwd.writeln(str);
			nwd.writeln('</body>');
			nwd.writeln('</html>');
		},
		text_encode: function(str) {
			return str.replace(/</,"&lt;").replace(/>/,"&gt;");
		},
		disp_nu_validator_errors: function() {
			var str = "";
			var errcnt = 0;
			var linept = new RegExp(/(From line )([0-9]+?)(,)/);
			var inwrap = this.rep_wrapper.getElementsByTagName("ol").item(0);
			var rows = inwrap.getElementsByTagName("li");
			for(var i=0; i<rows.length; i++) {
				var row = rows.item(i);
				var atr = row.getAttribute("class");
				if(atr === "error") {
					errcnt++;
					var emsg = row.getElementsByTagName("p").item(0).getElementsByTagName("span").item(0).textContent;
					var eline = row.getElementsByClassName("location").item(0).getElementsByTagName("a").item(0).textContent;
					var elinearr = eline.match(linept);
					var elinestr = elinearr[2] + "行目";
					var esrc = row.getElementsByClassName("extract").item(0).getElementsByTagName("code").item(0).textContent;
					str += elinestr + "\r\n" + emsg + "\r\n\r\n" + this.text_encode(esrc) + "\r\n\r\n\r\n";
				}
			}
			this.browse_new_tab("<h4>" + errcnt + "個のバリデートエラーがあります。</h4>" + "<pre>" + str + "</pre>");
		},
		disp_bs_validator_errors: function() {
			var str = "";
			var errcnt = 0;
			var linept = new RegExp(/(Line )([0-9]+?)(,)/);
			var rows = this.rep_wrapper.getElementsByTagName("li");
			for(var i=0; i<rows.length; i++) {
				var row = rows.item(i);
				var atr = row.getAttribute("class");
				if(atr === "msg_err") {
					errcnt++;
					var eline = row.getElementsByTagName("em").item(0).textContent;
					var elinearr = eline.match(linept);
					var elinestr = elinearr[2] + "行目";
					var emsg = row.getElementsByClassName("msg").item(0).textContent;
					var esrc = row.getElementsByTagName("pre").item(0).getElementsByTagName("code").item(0).textContent;
					str += elinestr + "\r\n" + emsg + "\r\n\r\n" + this.text_encode(esrc) + "\r\n\r\n\r\n";
				}
			}
			this.browse_new_tab("<h4>" + errcnt + "個のバリデートエラーがあります。</h4>" + "<pre>" + str + "</pre>");
		}
	};

	var util = new htmlCheckerUtil();
	util.init();
	util.exec();
})();