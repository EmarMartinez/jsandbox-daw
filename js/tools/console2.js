var console = {
  panel: $("#dev > div.ace_scroller > div > div.ace_layer.ace_text-layer"),
  log: function (m) {
    this.panel.append(
      '<div class="ace_line" style="height:14.666666984558105px">' +
        m +
        "</div>"
    );
  },
  error: function (m) {
    this.panel.append(
      '<div class="ace_line" style="height:14.666666984558105px">Error: ' +
        m +
        "</div>"
    );
  },
};
