/*-----------------------------------------------------
 *
 	単一検査画面を出す（未判定箇所）
 *
------------------------------------------------------*/
javascript:(function(){
	var src = document.getElementById("source").innerHTML;
	var div_pat = "(<div.+)(.+jisCHECK.+?)(><\/div>)(<div.+?>)(.+?)(<\/div>)";
	var div_text = regx_search_return(div_pat, src, 0);
	var tg_pat = "(<div.+><\/div>)(<div.+>.+<\/div>)";
	var tg_text = regx_search_return(tg_pat, div_text, 2);

	var id_pat = "(id=\")(.+?)(\")";
	var id_text = regx_search_return(id_pat, tg_text, 2);

	document.getElementById(id_text).click();

	function regx_search_return(pat_str, str, idx) {
	  var pat = new RegExp(pat_str);
	  var mt = str.match(pat);
	  if(pat.test(str)) {
	    return mt[idx];
	  } else {
	    return str;
	  }
	}
})();