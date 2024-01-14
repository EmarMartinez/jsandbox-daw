ace.define(
  "ace/theme/light.css",
  ["require", "exports", "module"],
  function (e, t, n) {
    n.exports =
      '.ace-light .ace_gutter{background:white;color:#333;overflow:hidden;}.ace-light .ace_print-margin{width:1px;background:white;}.ace-light{background-color:white;color:black;}.ace-light .ace_identifier{color:black;}.ace-light .ace_keyword{color:#0000FF;}.ace-light .ace_numeric{color:black;}.ace-light .ace_storage{color:#11B7BE;}.ace-light .ace_keyword.ace_operator,.ace-light .ace_lparen,.ace-light .ace_rparen,.ace-light .ace_punctuation{color:#808080;}.ace-light .ace_set.ace_statement{color:#0000FF;text-decoration:underline;}.ace-light .ace_cursor{color:black;}.ace-light .ace_invisible{color:rgb(191,191,191);}.ace-light .ace_constant.ace_buildin{color:rgb(88,72,246);}.ace-light .ace_constant.ace_language{color:#979797;}.ace-light .ace_constant.ace_library{color:rgb(6,150,14);}.ace-light .ace_invalid{background-color:rgb(153,0,0);color:white;}.ace-light .ace_support.ace_function{color:#FF00FF;}.ace-light .ace_support.ace_constant{color:rgb(6,150,14);}.ace-light .ace_class{color:#008080;}.ace-light .ace_support.ace_other{color:#6D79DE;}.ace-light .ace_variable.ace_parameter{font-style:italic;color:#FD971F;}.ace-light .ace_comment{color:#008000;}.ace-light .ace_constant.ace_numeric{color:black;}.ace-light .ace_variable{color:rgb(49,132,149);}.ace-light .ace_xml-pe{color:rgb(104,104,91);}.ace-light .ace_support.ace_storedprocedure{color:#800000;}.ace-light .ace_heading{color:rgb(12,7,255);}.ace-light .ace_list{color:rgb(185,6,144);}.ace-light .ace_marker-layer .ace_selection{background:rgb(181,213,255);}.ace-light .ace_marker-layer .ace_step{background:rgb(252,255,0);}.ace-light .ace_marker-layer .ace_stack{background:rgb(164,229,101);}.ace-light .ace_marker-layer .ace_bracket{margin:-1px 0 0 -1px;border:1px solid rgb(192,192,192);}.ace-light .ace_marker-layer .ace_active-line{background:rgba(0,0,0,0.07);}.ace-light .ace_gutter-active-line{background-color:#dcdcdc;}.ace-light .ace_marker-layer .ace_selected-word{background:rgb(250,250,255);border:1px solid rgb(200,200,250);}.ace-light .ace_meta.ace_tag{color:#0000FF;}.ace-light .ace_string.ace_regex{color:#FF0000;}.ace-light .ace_string{color:#FF0000;}.ace-light .ace_entity.ace_other.ace_attribute-name{color:#994409;}.ace-light .ace_indent-guide{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}.ace-light .ace_indent-guide-active{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAZSURBVHjaYvj///9/hivKyv8BAAAA//8DACLqBhbvk+/eAAAAAElFTkSuQmCC") right repeat-y;}';
  }
),
  ace.define(
    "ace/theme/light",
    ["require", "exports", "module", "ace/theme/light.css", "ace/lib/dom"],
    function (e, t, n) {
      (t.isDark = !1),
        (t.cssClass = "ace-light"),
        (t.cssText = e("./light.css"));
      var r = e("../lib/dom");
      r.importCssString(t.cssText, t.cssClass, !1);
    }
  );
(function () {
  ace.require(["ace/theme/light"], function (m) {
    if (typeof module == "object" && typeof exports == "object" && module) {
      module.exports = m;
    }
  });
})();
