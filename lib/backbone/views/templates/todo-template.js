
const templates = {};

templates.todo = _.template(
    '<div class="view">' +
        '<input class="toggle" type="checkbox" <%= completed ? \'checked\' : \'\' %>>' +
        '<label><%- title %></label>' +
        '<button class="destroy"></button>' +
    '</div>' +
    '<input class="edit" value="<%- title %>">'
);
