javascript:(function(){
	exec();
	function exec() {
		d = window.open().document;
		d.writeln(`
		<!DOCTYPE html>
		<html lang="ja">
		<head>
		<meta charset="utf-8">
		<style type="text/css">
		* {font-family:"メイリオ",Meiryo,sans-serif;}
		input,textarea,label{font-size: 90%;}
		button#bkm_create_btn {font-size:110%;}
		dd {margin-left: 0;}
		#bkm {border-collapse: collapse;width: 600px;}
		#bkm th {background: #eee;border:3px solid #fff;padding: 5px;}
		#bkm td {background: #FFFFE0;border:3px solid #fff;padding: 5px;}
		#bkm_comments,#bkm_srccode,#regx_after_text,#regx_text,#bkm_descript {width: 430px;}
		#bkm td.btnarea {text-align: center;background: #eee;}
		#bkm td.codeare {background: #eee;}
		#bkm_code {width: 600px; height: 10em;}
		</style>
		</head>
		<body>
		<script type="text/javascript">
		function bkm_create(){
			var bkm_body = "javascript:(function(){";
			var bkm_results = document.getElementsByName("bkm_result");
			var bkm_result_val = "";
			for(var i=0; i<bkm_results.length; i++){
			if(bkm_results[i].checked==true){
				bkm_result_val = bkm_results[i].value;
				break;
			}
			}
			var bkm_comments_status = document.getElementsByName("bkm_comment_status");
			var bkm_comment_status_val = "";
			for(var i=0; i<bkm_comments_status.length; i++){
			if(bkm_comments_status.item(i).checked==true){
				bkm_comment_status_val = bkm_comments_status[i].value;
				break;
			}
			}
			var bkm_descripts_status = document.getElementsByName("bkm_descript_status");
			var bkm_descript_status_val = "";
			for(var i=0; i<bkm_descripts_status.length; i++){
			if(bkm_descripts_status[i].checked==true){
				bkm_descript_status_val = bkm_descripts_status[i].value;
				break;
			}
			}
			var bkm_srccodes_status = document.getElementsByName("bkm_srccode_status");
			var bkm_srccode_status_val = "";
			for(var i=0; i<bkm_srccodes_status.length; i++){
			if(bkm_srccodes_status[i].checked==true){
				bkm_srccode_status_val = bkm_srccodes_status[i].value;
				break;
			}
			}
			var bkm_autosaves = document.getElementsByName("bkm_autosave");
			var bkm_autosave_val = "";
			for(var i=0; i<bkm_autosaves.length; i++){
			if(bkm_autosaves[i].checked==true){
				bkm_autosave_val = bkm_autosaves[i].value;
				break;
			}
			}
			switch(bkm_result_val){
				case "1":
				bkm_body += 'var result = document.querySelector(\\'select[id^="result_"]\\');var opts = result.getElementsByTagName("option");for(var i=0; i<opts.length; i++){var opt = opts[i];if(opt.value == "1"){result.selectedIndex = i;break;}}';
				break;
				case "9":
				bkm_body += 'var result = document.querySelector(\\'select[id^="result_"]\\');var opts = result.getElementsByTagName("option");for(var i=0; i<opts.length; i++){var opt = opts[i];if(opt.value == "9"){result.selectedIndex = i;break;}}';
				break;
				case "2":
				bkm_body += 'var result = document.querySelector(\\'select[id^="result_"]\\');var opts = result.getElementsByTagName("option");for(var i=0; i<opts.length; i++){var opt = opts[i];if(opt.value == "2"){result.selectedIndex = i;break;}}';
				break;
				case "3":
				bkm_body += 'var result = document.querySelector(\\'select[id^="result_"]\\');var opts = result.getElementsByTagName("option");for(var i=0; i<opts.length; i++){var opt = opts[i];if(opt.value == "3"){result.selectedIndex = i;break;}}';
				break;
			}
			if(bkm_comment_status_val=="0"){
				var val1 = document.getElementById("bkm_comments").value;
			val1 = br_escape(val1);
				if(document.getElementsByName("bkm_comment_overwrite").item(0).checked==true) {
				var ov_pos_src = document.getElementById("bkm_comment_overwrite_pos");
				var ov_pos = ov_pos_src.getElementsByTagName("option").item(ov_pos_src.selectedIndex).value;
				if(ov_pos === "after") {
					bkm_body += 'var tmpv1=document.querySelector(\\'textarea[id^="comment"]\\').value;';
					bkm_body += 'document.querySelector(\\'textarea[id^="comment"]\\').value = tmpv1 + "\\\\n\\\\n" + \\'';
					bkm_body += val1 + '\\';';
				} else {
					bkm_body += 'var tmpv1=document.querySelector(\\'textarea[id^="comment"]\\').value;';
					bkm_body += 'document.querySelector(\\'textarea[id^="comment"]\\').value = ' + "'" + val1 + "'";
					bkm_body += ' + "\\\\n\\\\n" + tmpv1;';
				}
				}else{
				bkm_body += 'document.querySelector(\\'textarea[id^="comment"]\\').value=\\'';
				bkm_body += val1 + '\\';';
				}
			}
			if(bkm_descript_status_val=="0"){
			var val2 = document.getElementById("bkm_descript").value;
			val2 = br_escape(val2);
				if(document.getElementsByName("bkm_srccode_overwrite").item(0).checked==true) {
				bkm_body += 'var tmpv2=document.querySelector(\\'textarea[id^="src_"]\\').value;';
				bkm_body += 'document.querySelector(\\'textarea[id^="src_"]\\').value = tmpv2 + "\\\\n\\\\n" + \\'';
				bkm_body += val2 + '\\';';
				}else{
				bkm_body += 'document.querySelector(\\'textarea[id^="src_"]\\').value=\\'';
				bkm_body += val2 + '\\';';
				}
			}
			if(bkm_srccode_status_val=="0"){
				var val3 = document.getElementById("bkm_srccode").value;
			val3 = br_escape(val3);
			if(document.getElementsByName("bkm_srccode_overwrite").item(0).checked==true) {
				bkm_body += 'var tmpv3=document.querySelector(\\'textarea[id^="src_"]\\').value;';
				bkm_body += 'document.querySelector(\\'textarea[id^="updsrc_"]\\').value = tmpv3 + "\\\\n\\\\n" + \\'';
				bkm_body += val3 + '\\';';
			} else {
				bkm_body += 'document.querySelector(\\'textarea[id^="updsrc_"]\\').value=\\'';
				bkm_body += val3 + '\\';';
			}
			} else if(bkm_srccode_status_val=="2") {
			var patval = document.getElementById("regx_text").value;
			var repval = document.getElementById("regx_after_text").value;
			bkm_body += 'var pat=new RegExp(' + patval + ');';
			bkm_body += 'var regx_before_text=document.querySelector(\\'textarea[id^="src_"]\\').value;';
			bkm_body += 'var regx_after_text=regx_before_text.replace(pat, \\'' + repval + '\\');';
			bkm_body += 'document.querySelector(\\'textarea[id^="updsrc_"]\\').value=regx_after_text;'
			}
			if(bkm_autosave_val=="0"){
				bkm_body += 'document.querySelector(\\'button[name="update"]\\').click();';
			}
		
			bkm_body += "})();"
			document.getElementById("bkm_code").value = bkm_body;
		}
		function clear_this_text(obj){
			document.getElementById(obj).value = "";
		}
		function br_escape(str) {
			var ret = str.replace(/(\\r\\n|\\n)/mg, "\\\\n");
			return ret;
		}
		</script>
		
		<h1>MakeBookmarklet</h1>
		<table id="bkm">
			<tr>
			<th><label for="bkm_result">判定結果</label></th>
			<td>
				<label><input type="radio" name="bkm_result" value="1">はい</label>
				<label><input type="radio" name="bkm_result" value="9">はい(注記)</label>
				<label><input type="radio" name="bkm_result" value="2">いいえ</label>
				<label><input type="radio" name="bkm_result" value="3">なし</label>
			</td>
			</tr>
			<tr>
			<th><label for="bkm_comments">判定コメント</label></th>
			<td>
				<dl>
					<dt>
					<label><input type="radio" name="bkm_comment_status" value="0">はい</label>
					<label><input type="radio" name="bkm_comment_status" value="1">いいえ</label>
					<label><input type="checkbox" name="bkm_comment_overwrite" value="0">追記有効</label>
					<label>位置
					<select id="bkm_comment_overwrite_pos">
					<option value="after">後</option>
					<option value="before">前</option>
					</select>
					</label>
					</dt>
					<dd><textarea id="bkm_comments"></textarea><br>
					<button onclick="clear_this_text('bkm_comments')">Clear</button>
					</dd>
					</dl>
			</td>
			</tr>
			<tr>
			<th><label>対象ソースコード</label></th>
			<td>
				<dl>
				<dt>
				<label><input type="radio" name="bkm_descript_status" value="0">はい</label>
				<label><input type="radio" name="bkm_descript_status" value="1">いいえ</label>
				<label><input type="checkbox" name="bkm_descript_overwrite" value="0">追記有効</label>
				</dt>
				<dd>
					<textarea id="bkm_descript"></textarea>
					<br><button onclick="clear_this_text('bkm_descript')">Clear</button>
				</dd>
				</dl>
			</td>
			</tr>
			<tr>
			<th><label for="bkm_srccode">修正ソースコード</label></th>
			<td>
				<dl>
				<dt>
				<label><input type="radio" name="bkm_srccode_status" value="0">はい</label>
				<label><input type="radio" name="bkm_srccode_status" value="1">いいえ</label>
				<label><input type="radio" name="bkm_srccode_status" value="2">正規表現置換</label>
				<label><input type="checkbox" name="bkm_srccode_overwrite" value="0">追記有効</label>
				</dt>
				<dd><textarea id="bkm_srccode"></textarea><br>
				<button onclick="clear_this_text('bkm_srccode')">Clear</button><br>
				<label>検索パターン</label><br><input type="text" name="regx_text" id="regx_text"><br>
				<label>置換テキスト</label><br><textarea name="regx_aftr_text" id="regx_after_text" rows="1"></textarea>
				<br><button onclick="clear_this_text('regx_after_text')">Clear</button>
				</dd>
				</dl>
			</td>
			</tr>
			<tr>
			<th><label>自動登録</label></th>
			<td>
				<label><input type="radio" name="bkm_autosave" value="0">はい</label>
				<label><input type="radio" name="bkm_autosave" value="1">いいえ</label>
			</td>
			</tr>
			<tr>
			<td colspan="2" class="btnarea">
			<button id="bkm_create_btn" onclick="bkm_create()">Create</button>
			</td>
			</tr>
			<tr>
			<td colspan="2" class="codearea"><textarea id="bkm_code"></textarea><br>
			<button onclick="clear_this_text('bkm_code')">Clear</button>
			</td>
			</tr>
		</table>
		</body>
		</html>
		`);
	}
})();