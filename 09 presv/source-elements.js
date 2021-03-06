/*-----------------------------------------------------
 *
 	特定の要素を強調表示する
 *
------------------------------------------------------*/
javascript:(function(){
	var opt="paragraph";
	var base=document;
	var alt_flg=true;
	var alt_chk=true;
	var fname_flg=false;
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
			var a = document.getElementsByTagName("a");
			for(var i=0; i<a.length; i++) {
				var atag = a.item(i);
				var img = atag.getElementsByTagName("img");
				for(var j=0; j<img.length; j++) {
					var imgtag = img.item(j);
					imgtag.setAttribute("style", "border:2px dotted red;");
					if(alt_flg) {
						var html_str = "";
						var alt_attr_tx = imgtag.getAttribute("alt");
						var span = document.createElement("span");
						var css_txt = "color:#fff;font-size:12px;padding:1px;background:#BF0000;";
						span.setAttribute("style", css_txt);
						span.id = "bkm-link-image-span-" + i;
						if(alt_attr_check(imgtag)) {
							html_str = "alt: " + alt_attr_tx;
						} else {
							html_str = "alt属性がない";
						}
						span.innerHTML = html_str;
						imgtag.parentNode.insertBefore(span, imgtag.nextSibling);
					}
				}
			}
			function alt_attr_check(imgtag) {
				var txt = imgtag.outerHTML;
				var pt1 = new RegExp(/alt=".*"/);
				var pt2 = new RegExp(/alt=/);
				if(pt1.test(txt) && pt2.test(txt)) return true;
				else return false;
			}
		},
		"image" : function () {
			var img = document.getElementsByTagName("img");
			for(var i=0; i<img.length; i++) {
				var imgtag = img.item(i);
				imgtag.setAttribute("style", "border:1px solid red;");
				var span = document.createElement("span");
				span.id = "bkm-img-span-" + i;
				var src_val = imgtag.getAttribute("src");
				var fname = get_img_filename(src_val);
				var alt_val = imgtag.getAttribute("alt");
				var html_str = "";
				if(alt_attr_check(imgtag)) {
					html_str += "alt: " + alt_val;
				} else {
					html_str += "alt属性がない";
				}
				if(fname_flg) {
					if(html_str !== "") {
						html_str += ", filename: " + fname;
					} else {
						html_str += "filename: " + fname;
					}
				}
				span.innerHTML = html_str;
				var css_txt = "color:#fff;font-size:12px;padding:1px;background:#BF0000;";
				span.setAttribute("style", css_txt);
				imgtag.parentNode.insertBefore(span, imgtag.nextSibling);
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
			function alt_attr_check(imgtag) {
				var txt = imgtag.outerHTML;
				var pt1 = new RegExp(/alt=".*"/);
				var pt2 = new RegExp(/alt=/);
				if(pt1.test(txt) && pt2.test(txt)) return true;
				else return false;
			}
		},
		"br": function() {
			var brs = base.getElementsByTagName("br");
			for(var i=0; i<brs.length; i++) {
				var br = brs.item(i);
				br.setAttribute("style", "border:2px dotted red; position: relative;");
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

	eval('funcs["' + opt + '"]();');

})();