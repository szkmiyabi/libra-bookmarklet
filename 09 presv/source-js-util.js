/*-------------------------------
    Javascript display util
 -------------------------------*/
javascript:(function(){
	function jsUtil() {
		this.url = location.href;
		this.scs = document.getElementsByTagName("script");
		this.sa = window.getSelection().toString();
		this.lb_url = "http://jis.infocreate.co.jp";
		this.anasv_url = "https://stg.test.aswbe-d.ana.co.jp";
	}
	jsUtil.prototype = {
		get_root: function() {
			var pt = new RegExp(/http.*:\/\/.+?\//);
			return this.url.match(pt)[0];
		},
		get_data_arr: function() {
			var arr = new Array();
			for(var i=0; i<this.scs.length; i++) {
				var htm = this.scs.item(i).outerHTML;
				var src = this.scs.item(i).getAttribute("src");
				var in_arr = new Array();
				in_arr[0] = htm;
				in_arr[1] = src;
				arr[i] = in_arr;
			}
			return arr;
		},
		browse_new_tab: function(str) {
			var nwd = window.open("","_blank").document;
			nwd.writeln('<DOCTYPE html>');
			nwd.writeln('<html lang="ja">');
			nwd.writeln('<head><meta charset="utf-8">');
			nwd.writeln('<title>BrNewTab</title>');
			nwd.writeln('<style>body{font-family:"メイリオ",Meiryo,sans-serif;word-break:break-all;}');
			nwd.writeln('.flex-table div { display: flex; }');
			nwd.writeln('.flex-table div p { margin-right: 25px; }');
			nwd.writeln('.flex-table div p:last-child { margin-right: none; }');
			nwd.writeln('</style>');
			nwd.writeln('</head>');
			nwd.writeln('<body>');
			nwd.writeln('<section class="flex-table">');
			nwd.writeln(str);
			nwd.writeln('</section>');
			nwd.writeln('</body>');
			nwd.writeln('</html>');
		},
		src_encode: function(str) {
			return str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
		},
		is_js_lk: function(str) {
			if(new RegExp(/(src=".+?")/).test(str)) return true;
			else return false;
		},
		is_libra_dm: function(str) {
			var pat = new RegExp("^" + this.lb_url + ".*");
			if(pat.test(str)) return true;
			else return false;
		},
		path_encode: function(str) {
			if(new RegExp(/^http/).test(str)) {
				return str;
			} else {
				if(this.is_libra_dm(this.url)) {
					return this.anasv_url + str;
				} else {
					return this.get_root() + str;
				}
			}
		},
		near_path_encode: function(str) {
			if(new RegExp(/^http/).test(str)) {
				return str;
			} else {
				return this.url.match(new RegExp(/http.*:\/\/.+\//))[0] + str;
			}
		}
	};

	var uti = new jsUtil();
	var arr = uti.get_data_arr();
	var str = "";
	for(var i=0; i<arr.length; i++){
		var iarr = arr[i];
		var htm = uti.src_encode(iarr[0]);
		var src = uti.path_encode(iarr[1]);
		if(uti.is_js_lk(htm)) {
			str += "<div><p>" + htm + "</p>";
			str += '<p><a href="' + src + '" target="_blank">' + src + "</a></p></div>";
		}
	}

	if(uti.sa != "") {
		window.open(uti.near_path_encode(uti.sa), "_blank");
	} else {
		uti.browse_new_tab(str);
	}

})();