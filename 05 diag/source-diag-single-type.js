/*-----------------------------------------------------
 *
 	単一検査画面を出す（フラグ指定）
 *
------------------------------------------------------*/
javascript:(function(){
	operation="FAIL";
	class singleDiagOpenUtil {

		constructor(opt) {
			this.opt = opt;
			this.src = document.getElementById("source");
			this.ds = this.src.getElementsByTagName("div");
			this.pt_uncomp = new RegExp(/.*jisCHECK.*/mg);
			this.pt_fail = new RegExp(/.*jisFAIL.*/mg);
			this.pt_ok = new RegExp(/.*jisPASS.*/mg);
			this.pt_na = new RegExp(/.*jisNA.*/mg);
		}

		exec() {
			for(var i=0; i<this.ds.length; i++) {
				var tardiv = this.ds.item(i);
				var tarattr = tardiv.getAttribute("class");
				var crpat = null;
				switch(this.opt) {
					case "OK":
						crpat = this.pt_ok;
						break;
					case "FAIL":
						crpat = this.pt_fail;
						break;
					case "NA":
						crpat = this.pt_na;
						break;
					case "UNCOMP":
						crpat = this.pt_uncomp;
						break;
				}
				if(crpat.test(tarattr)) {
					this.ds.item(i + 1).click();
					break;
				}
			}
		}
	}

	let app = new singleDiagOpenUtil(operation);
	app.exec();

})();