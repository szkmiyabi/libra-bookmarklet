/*-----------------------------------------------------
 *
 	W3Cバリデータをかける（オプション設定含める）
 *
------------------------------------------------------*/
javascript:(function(){
	var url = location.href;
	var w3curl = '';
	w3curl += 'http://validator.w3.org/check?uri=';
	w3curl += url;
	w3curl += '&charset=%28detect+automatically%29&doctype=Inline&ss=1&group=1&verbose=1';
	w3curl += '&user-agent=W3C_Validator%2F1.3+http%3A%2F%2Fvalidator.w3.org%2Fservices';
	window.open(w3curl, "_blank");
})();
