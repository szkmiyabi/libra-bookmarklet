/*--------------------------------------------

    superfocusブックマークレット版（IE11対応）

----------------------------------------------*/
javascript:(function(){

    var presvUtil = (function(){

        function presvUtil() {}
        presvUtil.prototype.super_focus = function() {
            var hd = document.getElementsByTagName("head")[0];
            var elm = document.createElement("style");
            elm.setAttribute("type", "text/css");
            elm.id = "bkmk-super-focus-style-tag";
            elm.textContent = "*:focus,*:active {opacity: 0.2;filter:contrast(300%);}";
            hd.appendChild(elm);
        };

        return presvUtil;

    }());

    var util = new presvUtil();
    util.super_focus();

})();