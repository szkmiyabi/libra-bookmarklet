/*-----------------------------------------------------
 *
 	特定の要素を強調表示する
 *
------------------------------------------------------*/
javascript:(function(){
	var type = "label_check";
	var base = document;

	var funcs = {
		"paragraph" : function () {
			var ps = base.getElementsByTagName("p");
			for(var i=0; i<ps.length; i++) {
			  var p = ps.item(i);
			  p.setAttribute("style", "border:2px dotted red; position: relative;");
			  add_label(p, i);
			}
		},
		"list" : function () {
			var tags = ["ul", "ol", "dl", "dt", "dd"];
			var idx = tags.length;
			var in_funcs = new Array();
			for(var i=0; i<idx; i++) {
				var val = tags[i];
				in_funcs.push(make_funcs(val));
			}
			function make_funcs(tag) {
				return function() {
					var ts = base.getElementsByTagName(tag);
					for(var i=0; i<ts.length; i++) {
					  var t = ts.item(i);
					  t.setAttribute("style", "border:2px dotted red; position: relative;");
					  add_label(t, i);
					  if(tag === "dt") {
					  	var span = document.getElementById("bkm-dt-span-" + i);
					  	var old_css_text = span.getAttribute("style");
					  	var new_css_text = old_css_text.replace("left:2px;", "left:20px;");
					  	span.setAttribute("style", new_css_text);
					  }
					  if(tag === "dd") {
					  	var span = document.getElementById("bkm-dd-span-" + i);
					  	var old_css_text = span.getAttribute("style");
					  	var new_css_text = old_css_text.replace("left:2px;", "left:20px;");
					  	span.setAttribute("style", new_css_text);
					  }
					}
				}
			}
			for(var i=0; i<idx; i++) {
				in_funcs[i]();
			}
		},
		"semantic" : function () {
			var tags = ["strong","em"];
			var idx = tags.length;
			var in_funcs = new Array();
			for(var i=0; i<idx; i++) {
				var val = tags[i];
				in_funcs.push(make_funcs(val))
			}
			function make_funcs(tag) {
				return function() {
					var ts = base.getElementsByTagName(tag);
					for(var i=0; i<ts.length; i++) {
					  var t = ts.item(i);
					  t.setAttribute("style", "border:2px dotted red; position: relative;");
					  add_label(t, i);
					}
				}
			}
			for(var i=0; i<idx; i++) {
				in_funcs[i]();
			}
		},
		"link-img" : function () {
			var alt_flg = false;
			var a = document.getElementsByTagName("a");
			for(var i=0; i<a.length; i++) {
				var atag = a.item(i);
				var img = atag.getElementsByTagName("img");
				if(img.length > 0 && alt_flg) {
					atag.setAttribute("style", "position:relative");
					add_label(atag, i);
				}
				for(var j=0; j<img.length; j++) {
					var imgtag = img.item(j);
					imgtag.setAttribute("style", "border:2px dotted red;");
					if(alt_flg) {
						var span = document.getElementById("bkm-a-span-" + i);
						span.innerHTML = imgtag.getAttribute("alt");
					}
				}
			}
		},
		"heading" : function () {
			var tags = ["h1","h2","h3","h4","h5","h6"];
			var idx = tags.length;
			var in_funcs = new Array();
			for(var i=0; i<idx; i++) {
				var val = tags[i];
				in_funcs.push(make_funcs(val));
			}
			function make_funcs(tag) {
				return function() {
					var ts = base.getElementsByTagName(tag);
					for(var i=0; i<ts.length; i++) {
					  var t = ts.item(i);
					  t.setAttribute("style", "border:2px dotted red; position: relative;");
					  add_label(t, i);
					}
				}
			}
			for(var i=0; i<idx; i++) {
				in_funcs[i]();
			}
		},
		"table" : function () {
			var in_funcs = [
				function() {
					var tbls = base.getElementsByTagName("table");
					for(var i=0; i<tbls.length; i++) {
						var tbl = tbls.item(i);
						tbl.setAttribute("style", "border:2px dotted red; position: relative;");
						add_label(tbl, i);
					}
					for(var i=0; i<tbls.length; i++) {
						var tbl = tbls.item(i);
						var smry = tbl.getAttribute("summary");
						var span = document.getElementById("bkm-table-span-" + i);
						var now_label_text = span.innerHTML;
						var new_label_text = (smry === null) ? now_label_text : now_label_text + ", summary:" + smry;
						span.innerHTML = new_label_text;
					  	var span = document.getElementById("bkm-table-span-" + i);
					  	var old_css_text = span.getAttribute("style");
					  	var new_css_text = old_css_text.replace("top:2px;", "top:-20px;");
					  	span.setAttribute("style", new_css_text);
					}
				},
				function() {
					var cps = base.getElementsByTagName("caption");
					for(var i=0; i<cps.length; i++) {
						var cp = cps.item(i);
						cp.setAttribute("style", "border:2px dotted red; position: relative;");
						add_label(cp, i);
					}
					for(var i=0; i<cps.length; i++) {
						var cp = cps.item(i);

					  	var span = document.getElementById("bkm-caption-span-" + i);
					  	var old_css_text = span.getAttribute("style");
					  	var new_css_text = old_css_text.replace("top:2px;", "top:-20px;");
					  	new_css_text = new_css_text.replace("left:2px;", "right:2px;");
					  	span.setAttribute("style", new_css_text);
					}

				},
				function() {
					var ths = base.getElementsByTagName("th");
					for(var i=0; i<ths.length; i++) {
						var th = ths.item(i);
						th.setAttribute("style", "border:2px dotted red; position: relative;");
						add_label(th, i);
					}
					for(var i=0; i<ths.length; i++) {
						var th = ths.item(i);
						var scope = th.getAttribute("scope");
						var span = document.getElementById("bkm-th-span-" + i);
						var now_label_text = span.innerHTML;
						var new_label_text = (scope===null) ? now_label_text : now_label_text + ", scope:" + scope;
						span.innerHTML = new_label_text;
					}
				}
			];
			for(var i=0; i<in_funcs.length; i++) {
				in_funcs[i]();
			}
		},
		"img-fname" : function () {
			var alt_flg = false;
			var fname_flg = true;
			var img = document.getElementsByTagName("img");
			for(var i=0; i<img.length; i++) {
				var imgtag = img.item(i);
				imgtag.setAttribute("style", "border:1px solid red;");
				var rect = imgtag.getBoundingClientRect();
				var top_rect = rect.top + window.pageYOffset;
				var left_rect = rect.left + window.pageXOffset;
				var span = document.createElement("span");
				span.id = "bkm-img-span-" + i;
				var src_val = imgtag.getAttribute("src");
				var fname = get_img_filename(src_val);
				var alt_val = imgtag.getAttribute("alt");
				var html_str = "";
				if(alt_flg) {
					html_str += "alt: " + alt_val;
				}
				if(fname_flg) {
					if(html_str !== "") {
						html_str += ", filename: " + fname;
					} else {
						html_str += "filename: " + fname;
					}
				}
				span.innerHTML = html_str;
				var css_txt = "position:absolute;";
				css_txt += "top:" + top_rect + "px;" + "left:" + left_rect + "px;";
				css_txt += "color:#000;font-size:90%;opacity:0.8;border:1px solid red;padding:1px;background:yellow;";
				span.setAttribute("style", css_txt);
				imgtag.parentNode.insertBefore(span, img.nextSibling);
			}
			function get_img_filename(str) {
				var ret = "";
				var pat = new RegExp(/(.+)\/(.+\.)(JPG|jpg|GIF|gif|PNG|png|BMP|bmp)$/);
				if(pat.test(str)) {
					var arr = str.match(pat);
					ret += arr[2] + arr[3];
				}
				return ret;
			}
		},
		"lang-check": function () {
			var body = document.getElementsByTagName("body").item(0);
			var datas = [];
			child_nodes(body);
			for(var i=0; i<datas.length; i++) {
				var elm = datas[i];
				if(is_parent_elm(elm)) continue;
				var text = in_clean_text(elm.innerHTML);
				if(inc_alpha(text)) {
					if(!is_tagcode(text)) {
						elm.setAttribute("style", "color:red; border:2px dotted red; background-color: yellow;");
					}
				}
			}
			function child_nodes(obj) {
				for(var i=0; i<obj.children.length; i++) {
					var ch = obj.children[i];
					datas.push(ch);
					if(ch.hasChildNodes()) {
						child_nodes(ch);
					}
				}
			}
			function inc_alpha(str) {
				var pat = new RegExp(/[a-zA-Zａ-ｚＡ-Ｚ]+/mg);
				if(pat.test(str)) return true;
				else return false;
			}
			function is_tagcode(str) {
				var pat = new RegExp(/<.+?>/);
				if(pat.test(str)) return true;
				else return false;
			}
			function is_parent_elm(obj) {
				var out_list = ["ul", "ol", "dl", "table", "tbody", "tr"];
				var tn = obj.tagName.toLowerCase();
				for(var i=0; i<out_list.length; i++) {
					if(out_list[i] === tn) return true;
				}
				return false;
			}
			function in_clean_text(str) {
				var pat = new RegExp(/(<br.*?>|<img.*?>|<\/*a.*?>|<\/*p.*?>|<\/*strong.*?>|<\/*span.*?>|<\/*em.*?>|<\/*b.*?>|<\/*u.*?>|<\/*i.*?>|<\/*font.*?>|&nbsp;|&gt;|&lt;|&amp;)/mg);
				return str.replace(pat, "");
			}
			/* ---debug--- */
			function var_dump(arr) {
				var cl = "";
				for(var i=0; i<arr.length; i++) {
					var row = arr[i];
					cl += row + "\n";
				}
				console.log(cl);
			}
		},
		label_check: function() {
			var in_funcs = [
				function() {
					var lbs = base.getElementsByTagName("label");
					for(var i=0; i<lbs.length; i++) {
						var lb = lbs.item(i);
						lb.setAttribute("style", "border:2px dotted red; position: relative;");
						add_label(lb, i);
					}
					for(var i=0; i<lbs.length; i++) {
						var lb = lbs.item(i);
						var forattr = lb.getAttribute("for");
						var span = document.getElementById("bkm-label-span-" + i);
						var csstext = span.getAttribute("style");
						var newcsstext = csstext + "display:block; width: 200px;";
						span.setAttribute("style", newcsstext);
						var now_label_text = span.innerHTML;
						var new_label_text = (forattr===null) ? now_label_text : now_label_text + ", for:" + forattr;
						span.innerHTML = new_label_text;
					}
				},
				function() {
					var ips = base.getElementsByTagName("input");
					for(var i=0; i<ips.length; i++) {
						var ip =  ips.item(i);
						var typeattr = ip.getAttribute("type");
						if(typeattr==="text" || typeattr==="radio" || typeattr==="check") {
							ip.setAttribute("style", "border:2px dotted red; position: relative;");
						}
					}
					for(var i=0; i<ips.length; i++) {
						var ip = ips.item(i);
						var typeattr = ip.getAttribute("type");
						if(typeattr==="text") {
							var id = ip.getAttribute("id");
							var now_label_text = ip.value;
							var new_label_text = (id===null) ? now_label_text : now_label_text + "id:" + id;
							ip.value = new_label_text;
						} else if(typeattr==="radio" || typeattr==="check") {
							var id = ip.getAttribute("id");
							var label_text = (id===null) ? "" : "id:" + id;
							var span = document.createElement("span");
							var css_txt = "color:#000;font-size:90%;opacity:0.8;border:1px solid red;padding:1px;background:yellow;";
							span.innerHTML = label_text;
							span.setAttribute("style", css_txt);
							ip.parentNode.insertBefore(span, ip.nextSibling);
						}
					}
				},
				function() {
					var tas = base.getElementsByTagName("textarea");
					for(var i=0; i<tas.length; i++) {
						var ta =  tas.item(i);
						ta.setAttribute("style", "border:2px dotted red; position: relative;");
					}
					for(var i=0; i<tas.length; i++) {
						var ta = tas.item(i);
						var id = ta.getAttribute("id");
						var now_label_text = ta.value;
						var new_label_text = (id===null) ? now_label_text : now_label_text + "id:" + id;
						ta.value = new_label_text;
					}
				},
				function() {
					var sls = base.getElementsByTagName("select");
					for(var i=0; i<sls.length; i++) {
						var sl = sls.item(i);
						sl.setAttribute("style", "border:2px dotted red; position: relative;");
					}
					for(var i=0; i<sls.length; i++) {
						var sl = sls.item(i);
						var id = sl.getAttribute("id");
						var label_text = (id===null) ? "" : "id:" + id;
						var span = document.createElement("span");
						var css_txt = "color:#000;font-size:90%;opacity:0.8;border:1px solid red;padding:1px;background:yellow;";
						span.innerHTML = label_text;
						span.setAttribute("style", css_txt);
						sl.parentNode.insertBefore(span, sl.nextSibling);
					}
				}
			];
			for(var i=0; i<in_funcs.length; i++) {
				in_funcs[i]();
			}
		}
	};

	function add_label(obj, cnt) {
		var d = document;
		var span = d.createElement("span");
		var tag_name = obj.tagName;
			tag_name = tag_name.toLowerCase();
		var span_id = "bkm-" + tag_name + "-span-" + cnt;
		var css_txt = "color:#000;font-size:90%;opacity:0.8;display:block;border:1px solid red;padding:1px;background:yellow;position:absolute;top:2px;left:2px;";
		span.innerHTML = '&lt;' + tag_name + '&gt;';
		span.id = span_id;
		span.setAttribute("style", css_txt);
		obj.appendChild(span);
	}

	switch(type) {
		case "paragraph":
			funcs["paragraph"]();
			break;
		case "list":
			funcs["list"]();
			break;
		case "semantic":
			funcs["semantic"]();
			break;
		case "link-img":
			funcs["link-img"]();
			break;
		case "heading":
			funcs["heading"]();
			break;
		case "table":
			funcs["table"]();
			break;
		case "img-fname":
			funcs["img-fname"]();
			break;
		case "lang-check":
			funcs["lang-check"]();
			break;
		case "label_check":
			funcs["label_check"]();
			break;
		default:
			break;
	}
})();
