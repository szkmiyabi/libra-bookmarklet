/*-----------------------------------------------------
 *
 	検査開始と自動事前検査
 *
------------------------------------------------------*/
javascript:(function(){
	function preUtil() {
		resurv = true;
		slevel="AA";
		url = window.location.href;
		d = document;
		hashA = {
			/*問1.キーボード（Tabキー）でコンテンツ移動、フォーカスしただけで状況が変化するコンテンツがありますか？*/
			"16": "no",
			/*問2.ページタイトルは適切ですか？*/
			"17": "yes",
			/*問3.言語属性は正しく設定されていますか？*/
			"18": "yes",
			/*問4.形、大きさ、位置、方向、又は音など、感覚的な特徴で情報を伝えているものはありますか？*/
			"19": "no",
			/*問5.W3Cバリデータ等のツールを使用してHTML構文のチェックを行って下さい。その結果、問題は検知されましたか？*/
			"23": "yes",
			/*問6.リニアライズ（線形化）したときに、コンテンツは意味のある順序となっていますか？*/
			"24": "yes",
			/*問7.簡潔な代替えテキストに加え、長い説明が必要な非テキストコンテンツ（例えば、グラフやチャートなど）はありますか?*/
			"2": "yes",
			/*問8.ライブカメラの映像コンテンツを含んでいますか？*/
			"6": "no",
			/*問9.実況による音声コンテンツを含んでいますか？*/
			"7": "no",
			/*問10.画像のスライドショーやアニメーションGIFを含んでいますか？*/
			"5": "no",
			/*問11.再生用の動画コンテンツを含んでいますか？*/
			"8": "no",
			/*問12.再生用の音声コンテンツまたは自動再生のBGM音声を含んでいますか？*/
			"9": "no",
			/*問13.スクロール・点滅・移動などをする情報を含んでいますか？*/
			"10": "no",
			/*問14.時間の経過によってページが自動更新されたり、アラートが表示される、または制限時間付きのコンテンツを含んでいますか？*/
			"11": "no",
			/*問15.検索キーワード入力欄（フィールド）を含んでいますか？*/
			"12": "yes",
			/*問16.テキスト入力フィールド(お問合せ登録・ログイン認証・申し込みなど)やラジオボタン、チェックボックス、またはセレクトリストなどの選択要素を含んでいますか？*/
			"13": "no",
			/*問17.ユーザ登録時などに使用される、正しい回答を記入するためのCAPTCHAテストを含んでいますか？*/
			"14": "no",
			/*問18.コンテンツがテキスト（非HTML）だけのページですか？*/
			"25": "no"
		};
		hashAA = {
			/*問1.キーボード（Tabキー）でコンテンツ移動、フォーカスしただけで状況が変化するコンテンツがありますか？*/
			"16": "no",
			/*問2.ページタイトルは適切ですか？*/
			"17": "yes",
			/*問3.言語属性は正しく設定されていますか？*/
			"18": "yes",
			/*問4.形、大きさ、位置、方向、又は音など、感覚的な特徴で情報を伝えているものはありますか？*/
			"19": "no",
			/*問5.上下階層のページと比較して、サイト全体のナビゲーション位置が統一していますか？*/
			"20": "yes",
			/*問6.上下階層のページと比較して、ダウンロードアイコン、印刷アイコン、保存アイコンなどがサイトで統一（代替えテキスト）していますか？*/
			"21": "yes",
			/*問7.利用者にとって法的義務または金銭的な取引が生じるデータのやり取りを行うページですか？*/
			"22": "no",
			/*問8.W3Cバリデータ等のツールを使用してHTML構文のチェックを行って下さい。その結果、問題は検知されましたか？*/
			"23": "yes",
			/*問9.リニアライズ（線形化）したときに、コンテンツは意味のある順序となっていますか？*/
			"24": "yes",
			/*問10.簡潔な代替えテキストに加え、長い説明が必要な非テキストコンテンツ（例えば、グラフやチャートなど）はありますか?*/
			"2": "yes",
			/*問11.ライブカメラの映像コンテンツを含んでいますか？*/
			"6": "no",
			/*問12.実況による音声コンテンツを含んでいますか？*/
			"7": "no",
			/*問13.画像のスライドショーやアニメーションGIFを含んでいますか？*/
			"5": "no",
			/*問14.再生用の動画コンテンツを含んでいますか？*/
			"8": "no",
			/*問15.再生用の音声コンテンツまたは自動再生のBGM音声を含んでいますか？*/
			"9": "no",
			/*問16.スクロール・点滅・移動などをする情報を含んでいますか？*/
			"10": "no",
			/*問17.時間の経過によってページが自動更新されたり、アラートが表示される、または制限時間付きのコンテンツを含んでいますか？*/
			"11": "no",
			/*問18.検索キーワード入力欄（フィールド）を含んでいますか？*/
			"12": "yes",
			/*問19.テキスト入力フィールド(お問合せ登録・ログイン認証・申し込みなど)やラジオボタン、チェックボックス、またはセレクトリストなどの選択要素を含んでいますか？*/
			"13": "no",
			/*問20.ユーザ登録時などに使用される、正しい回答を記入するためのCAPTCHAテストを含んでいますか？*/
			"14": "no",
			/*問21.コンテンツがテキスト（非HTML）だけのページですか？*/
			"25": "no"
		};
		if(slevel==="A") hash = hashA;
		else hash = hashAA;
	}
	preUtil.prototype = {
		is_started: function() {
			var tar = d.getElementById("start");
			if(tar === null || tar === "" || tar === "undefined") return true;
			else return false;
		},
		click_start: function() {
			d.getElementById("start").click();
		},
		is_start_diag_displayed: function() {
			var div = this.get_diag_div("ui-dialog-title-dialog4");
			var pat = new RegExp(/display:.*block;/);
			var attr = div.getAttribute("style");
			if(pat.test(attr)) return true;
			else return false;
		},
		click_diag_start: function() {
			var tar = d.getElementById("dialog4");
			var btn = tar.getElementsByClassName("btnB").item(0);
			btn.click();
		},
		checkbox_on: function() {
			var tar = this.get_diag_div("ui-dialog-title-dialog4");
			var inp = tar.getElementsByTagName("input");
			for(var i=0; i<inp.length; i++) {
				var ip = inp.item(i);
				var attr = ip.getAttribute("type");
				if(attr === "checkbox") {
					ip.click();
					break;
				}
			}
		},
		get_diag_div: function(key) {
			var obj = null;
			var cls = document.getElementsByClassName("ui-dialog ui-widget ui-widget-content ui-corner-all  ui-draggable ui-resizable");
			for(var i=0; i<cls.length; i++) {
			  var div = cls.item(i);
			  var attr = div.getAttribute("aria-labelledby");
			  if(attr===key) {
			    obj = div;
			  }
			}
			return obj;
		},
		is_pre_serv_page: function() {
			var pat = new RegExp(/\/diagnose\/indexv2\/openprediag\/projID\/[0-9]+/);
			if(pat.test(url)) return true;
			else return false;
		},
		click_pre_serv: function() {
			d.getElementById("preDiag").click();
		},
		is_surveyed: function() {
			var chk_cnt = 0;
			for(var key in hash) {
				var ro = d.getElementsByName(key);
				if(ro[0].checked || ro[1].checked) chk_cnt++;
			}
			if(chk_cnt==0) return false;
			else return true;
		},
		do_surv: function() {
			for(var key in hash) {
				var ro = d.getElementsByName(key);
				var flg = hash[key];
				if(flg === "yes") ro[0].checked = true;
				else if(flg === "no") ro[1].checked = true;
			}
		},
		click_regist: function() {
			if(resurv) this.do_surv();
			d.getElementById("entry").click();
		}
	};

	var util = new preUtil();
	if(!util.is_started() && !util.is_start_diag_displayed()) {
		util.click_start();
	} else if(!util.is_started() && util.is_start_diag_displayed()) {
		util.checkbox_on();
		util.click_diag_start();
	} else if(util.is_started() && !util.is_pre_serv_page()) {
		util.click_pre_serv();
	} else if(util.is_pre_serv_page() && !util.is_surveyed()) {
		util.do_surv();
	} else if(util.is_surveyed()) {
		util.click_regist();
	}

})();
