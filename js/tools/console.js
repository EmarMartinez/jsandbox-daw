if (typeof console != "undefined")
  if (typeof console.log != "undefined") console.olog = console.log;
  else console.olog = function () {};

console.log = function (message) {
  console.olog(message);
  /* $("#dev > div.ace_scroller > div > div.ace_layer.ace_text-layer").append(
    '<div class="ace_line" style="height:14.666666984558105px">' +
      message +
      "</div>"
  ); */
  let prevDevVal = editorDEV.getValue();
  editorDEV.setValue((prevDevVal += "\n" + message));
};
console.error = console.debug = console.info = console.log;
