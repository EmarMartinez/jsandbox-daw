ace.define(
  "ace/theme/contraste.css",
  ["require", "exports", "module"],
  function (e, t, n) {
    n.exports =
      '.ace_line {color: white}.ace-contraste .ace_gutter {\n  background: #000;\n  color: white;\n  overflow : hidden;\n}\n\n.ace-contraste .ace_print-margin {\n  width: 1px;\n  background: #e8e8e8;\n}\n\n.ace-contraste {\n  background-color: #fff;\n  color: white;\n}\n\n.ace-contraste .ace_cursor {\n  color: white;\n}\n\n.ace-contraste .ace_invisible {\n  color: white;\n}\n\n.ace-contraste .ace_constant.ace_buildin {\n  color: #5858f6;\n}\n\n.ace-contraste .ace_constant.ace_language {\n  color: white;\n}\n\n.ace-contraste .ace_constant.ace_library {\n  color: #06960e;\n}\n\n.ace-contraste .ace_invalid {\n  background-color: #990000;\n  color: white;\n}\n\n.ace-contraste .ace_fold {\n}\n\n.ace-contraste .ace_support.ace_function {\n  color: #3c4c72;\n}\n\n.ace-contraste .ace_support.ace_constant {\n  color: white;\n}\n\n.ace-contraste .ace_support.ace_type,\n.ace-contraste .ace_support.ace_class\n.ace-contraste .ace_support.ace_other {\n  color: white;\n}\n\n.ace-contraste .ace_variable.ace_parameter {\n  font-style:italic;\n  color:white;\n}\n.ace-contraste .ace_keyword.ace_operator {\n  color: white;\n}\n\n.ace-contraste .ace_comment {\n  color: white;\n}\n\n.ace-contraste .ace_comment.ace_doc {\n  color: white;\n}\n\n.ace-contraste .ace_comment.ace_doc.ace_tag {\n  color: white;\n}\n\n.ace-contraste .ace_constant.ace_numeric {\n  color: white;\n}\n\n.ace-contraste .ace_variable {\n  color: white;\n}\n\n.ace-contraste .ace_xml-pe {\n  color: white;\n}\n\n.ace-contraste .ace_entity.ace_name.ace_function {\n  color: white;\n}\n\n\n.ace-contraste .ace_heading {\n  color: white;\n}\n\n.ace-contraste .ace_list {\n  color: white;\n}\n\n.ace-contraste .ace_marker-layer .ace_selection {\n  background: #b5d5ff;\n}\n\n.ace-contraste .ace_marker-layer .ace_step {\n  background: #fcff00;\n}\n\n.ace-contraste .ace_marker-layer .ace_stack {\n  background: #a4e565;\n}\n\n.ace-contraste .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid #c0c0c0;\n}\n\n.ace-contraste .ace_marker-layer .ace_active-line {\n  background: rgba(0, 0, 0, 0.07);\n}\n\n.ace-contraste .ace_gutter-active-line {\n    background-color : #dcdcdc;\n}\n\n.ace-contraste .ace_marker-layer .ace_selected-word {\n  background: #fafaff;\n  border: 1px solid #c8c8fa;\n}\n\n.ace-contraste .ace_storage,\n.ace-contraste .ace_keyword,\n.ace-contraste .ace_meta.ace_tag {\n  color: white;\n}\n\n.ace-contraste .ace_string.ace_regex {\n  color: white\n}\n\n.ace-contraste .ace_string {\n  color: white;\n}\n\n.ace-contraste .ace_entity.ace_other.ace_attribute-name {\n  color: white;\n}\n\n.ace-contraste .ace_indent-guide {\n  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;\n}\n  \n.ace-contraste .ace_indent-guide-active {\n  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAZSURBVHjaYvj///9/hivKyv8BAAAA//8DACLqBhbvk+/eAAAAAElFTkSuQmCC") right repeat-y;\n}\n';
  }
),
  ace.define(
    "ace/theme/contraste",
    ["require", "exports", "module", "ace/theme/contraste.css", "ace/lib/dom"],
    function (e, t, n) {
      (t.isDark = !1),
        (t.cssClass = "ace-contraste"),
        (t.cssText = e("./contraste.css"));
      var r = e("../lib/dom");
      r.importCssString(t.cssText, t.cssClass, !1);
    }
  );
(function () {
  ace.require(["ace/theme/contraste"], function (m) {
    if (typeof module == "object" && typeof exports == "object" && module) {
      module.exports = m;
    }
  });
})();
