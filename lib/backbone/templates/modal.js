const modalTemplate = _.template('\
<div class="modal-dialog"><div class="modal-content">\
<% if (title) { %>\
  <div class="modal-header">\
            <h4><%-title%></h4>\
    <% if (allowCancel) { %>\
      <a class="close">&times;</a>\
    <% } %>\
  </div>\
<% } %>\
<div class="modal-body"><%-content%></div>\
<% if (showFooter) { %>\
  <div class="modal-footer">\
    <% if (allowCancel) { %>\
      <% if (cancelText) { %>\
        <a href="#" class="btn cancel"><%-cancelText%></a>\
      <% } %>\
    <% } %>\
    <a href="#" class="btn ok btn-primary"><%-okText%></a>\
  </div>\
<% } %>\
</div></div>\
');