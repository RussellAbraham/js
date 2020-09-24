const dropdownTemplate = _.template('\
<div class="dropdown">\
<button class="btn btn-sm dropdown-toggle" type="button" id="<%= this.model.get(\'id\') %>" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
  <%= this.model.get(\'title\') %>\
</button>\
    <div class="dropdown-menu" aria-labelledby="<%= this.model.get(\'id\') %>">\
    <% _.each(this.model.get(\'data\'), function(key, index, data) { %>\
       <a class="dropdown-item" data-toggle="<%= key.toggle %>" data-target="<%= key.target %>" title="<%= key.title %>"><%= key.name %></a>\
       <div class="dropdown-divider"></div>\
      <% }); %>\
</div></div>'
);