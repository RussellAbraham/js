const browser = {}; 

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'data:text/css,'+
    'ul { margin: 0; padding: 0 0 0 1em; }' +
    '.disabled { opacity : 0.75; }.hide{display:none;}' +
    '.prompt { list-style-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjZweCIgaGVpZ2h0PSI4cHgiIHZpZXdCb3g9IjAgMCA2IDgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNi4xICgyNjMxMykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+cGF0aDM2OTE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNMSwxIEw0LjUsNC4yNSBMMSw3LjUiIGlkPSJwYXRoMzY5MSIgc3Ryb2tlPSIjMzY3Q0YxIiBzdHJva2Utd2lkdGg9IjEuNSI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=); }' +
    '.output { list-style-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjhweCIgaGVpZ2h0PSI4cHgiIHZpZXdCb3g9IjAgMCA4IDgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNi4xICgyNjMxMykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+R3JvdXA8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICA8cGF0aCBkPSJNNSw0IEM1LDQuNTUgNS40NSw1IDYsNSBDNi41NSw1IDcsNC41NSA3LDQgQzcsMy40NSA2LjU1LDMgNiwzIEM1LjQ1LDMgNSwzLjQ1IDUsNCIgaWQ9InBhdGgzNjk1IiBmaWxsPSIjQkFCQUJBIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik00LjI1LDAuNzUgTDAuNzUsNCBMNC4yNSw3LjI1IiBpZD0icGF0aDM2OTciIHN0cm9rZT0iI0JBQkFCQSIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==); }' +
    '.error  { list-style-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjEwcHgiIGhlaWdodD0iMTBweCIgdmlld0JveD0iMCAwIDEwIDEwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYuMSAoMjYzMTMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPkdyb3VwPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ikdyb3VwIj4KICAgICAgICAgICAgPHBhdGggZD0iTTUsOS42NCBDNy41Niw5LjY0IDkuNjQsNy41NiA5LjY0LDUgQzkuNjQsMi40NCA3LjU2LDAuMzYgNSwwLjM2IEMyLjQ0LDAuMzYgMC4zNiwyLjQ0IDAuMzYsNSBDMC4zNiw3LjU2IDIuNDQsOS42NCA1LDkuNjQgWiIgaWQ9InBhdGgzNzAxIiBmaWxsPSIjRUIzOTQxIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zLDMgTDcsNyIgaWQ9InBhdGgzNzAzIiBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiMwMDAwMDAiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTcsMyBMMyw3IiBpZD0icGF0aDM3MDUiIHN0cm9rZT0iI0ZGRkZGRiIgZmlsbD0iIzAwMDAwMCI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+); }'
document.head.appendChild(link);

function load(){
    function scriptNode(src, onload, onerror){
        var script = document.createElement('script');
        script.src = src + '.js';
        script.onload = onload;
        script.onerror = onerror || onload;
        return document.head.appendChild(script);
    }
    function scriptLoad(){
        console.info('success loading : ', this);
    }
    function scriptError(){
        console.error('failed loading : ', this);
    }
    [].slice.call(arguments).forEach(function(string){
        scriptNode(string, scriptLoad, scriptError);
    });
}

function init(){
    [ 'cookies', 'dialog', 'history', 'location', 'navigator', 'screen', 'storage', 'timing', 'window' ].forEach(function(object){
        load(object + '/index');
    });
}

setTimeout(init, 1);
