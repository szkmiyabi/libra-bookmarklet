/*---------------------------------------

  WAI-ARIA関連属性値を明示

-----------------------------------------*/
javascript:(function() {

	class presvUtil {

		wai_aria_attr() {
			function tag_with_role_attr() {
				var elm = document.getElementsByTagName("*");
				for(var i=0; i<elm.length; i++) {
					var el = elm.item(i);
					if(el.hasAttribute("role")) {
						var attr_text = el.getAttribute("role");
						el.setAttribute("style", "border:2px dotted #008080!important; position: relative;");
						add_label(el, i, "#279A9A", 'role: ' + attr_text);
					}
				}
			}
			function tag_with_aria_attr() {
				var elm = document.getElementsByTagName("*");
				var pt = new RegExp(/aria-.*/mg);
				for(var i=0; i<elm.length; i++) {
					var el = elm.item(i);
					var ret = "";
					var flg = false;
					var atts = el.attributes;
					for(var j=0; j<atts.length; j++) {
						var att = atts[j];
						if(pt.test(att.name)) {
							flg = true;
							ret += att.name + ": " + att.value + ", ";
						}
					}
					if(flg == true) {
						add_label(el, i, "#945E0E", ret);
					}
				}
			}
			function tag_with_tabindex_attr() {
				var elm = document.getElementsByTagName("*");
				var pt = new RegExp(/tabindex/mg);
				for(var i=0; i<elm.length; i++) {
					var el = elm.item(i);
					var ret = "";
					var flg = false;
					var atts = el.attributes;
					for(var j=0; j<atts.length; j++) {
						var att = atts[j];
						if(pt.test(att.name)) {
							flg = true;
							ret += att.name + ": " + att.value + ", ";
						}
					}
					if(flg == true) {
						add_label(el, i, "#C00000", ret);
					}
				}
			}
			function add_label(obj, cnt, colorcode, add_text) {
				var tag_name = obj.tagName;
					tag_name = tag_name.toLowerCase();
				var span_id = "bkm-" + tag_name + "-span-" + cnt;
				var css_txt = "color:#fff;font-size:90%!important;font-weight:normal!important;padding:1px;border-radius:3px;";
				css_txt += 'background:' + colorcode + ';';
				var html_str = tag_name + '要素, ' + add_text;
				var span = '<span id="' + span_id + '" style="' + css_txt + '">' + html_str + '</span>';
				var addelm = document.createElement("span");
				addelm.style.cssText = css_txt;
				addelm.innerHTML = span;
				obj.prepend(addelm);
			}
			tag_with_role_attr();
			tag_with_aria_attr();
			tag_with_tabindex_attr();
		}
	}
	let app = new presvUtil();
	app.wai_aria_attr();
})();
