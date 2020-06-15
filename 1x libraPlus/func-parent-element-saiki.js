{
	
	if(!is_form_active())
		return;

	var current = document.activeElement;

	alert(current.tagName);

	var tr = getTrElement(current);
	alert(tr.textContent);

	function is_form_active() {
		if(typeof document.activeElement === "undefined")
			return false;
		else
			return true;
	}

	function getTrElement(obj) {
		var parent = obj.parentElement;
		if(obj.tagName.toString() == "TR")
			return obj;
		else
			return getTrElement(parent);
	}
}