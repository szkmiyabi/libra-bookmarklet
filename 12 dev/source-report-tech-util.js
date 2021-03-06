/*----------------------------------------------
 * 
 * 達成基準／実装番号を選択（report-utilの付随用）
 *
 ----------------------------------------------*/
javascript:(function(){
	var argv="7211|IFC1008";
	function lbuiUtil() {
		this.guideline = document.getElementById("guideline");
		this.tech = document.getElementById("techList");
	}
	lbuiUtil.prototype = {
		initialize: function() {
			if(this.guideline == null || this.guideline == null) {
				document.getElementById("submitURL").getElementsByTagName("button").click();
			}
		},
		is_tech_activate: function() {
			if(this.tech.getElementsByTagName("option").length < 2) return false;
			else return true;
		},
		parse_guideline: function(str) {
			var new_str = "";
			for(var i=0; i<str.length; i++) {
				new_str += str.substr(i, 1);
				if(i < (str.length - 1)) new_str += ".";
			}
			return new_str;
		},
		set_guideline: function(str) {
			var ops = this.guideline.getElementsByTagName("option");
			var key_str = this.parse_guideline(str);
			for(var i=0; i<ops.length; i++) {
				var op = ops.item(i);
				var attr = op.getAttribute("value");
				if(key_str === attr) {
					this.guideline.selectedIndex = i;
					this.event_ignite(this.guideline);
					break;
				}
			}
		},
		set_tech: function(str) {
			var key_str = str.toUpperCase();
			var ops = this.tech.getElementsByTagName("option");
			for(var i=0; i<ops.length; i++) {
				var op = ops.item(i);
				var attr = op.getAttribute("value");
				if(key_str === attr) {
					this.tech.selectedIndex = i;
					this.event_ignite(this.tech);
					break;
				}
			}
		},
		event_ignite: function(obj) {
			var event = document.createEvent("HTMLEvents");
			event.initEvent("change", true, false);
			obj.dispatchEvent(event);
		}
	};

	function mainUtil(ui, argv) {
		this.ui = ui;
		this.argv = argv.split("|");
		this.ui.initialize();
	}
	mainUtil.prototype = {
		exec: function() {
			if(!this.ui.is_tech_activate()) this.ui.set_guideline(this.argv[0]);
			else this.ui.set_tech(this.argv[1]);
		}
	}

	var exe = new mainUtil(new lbuiUtil(), argv);
	exe.exec();

})();