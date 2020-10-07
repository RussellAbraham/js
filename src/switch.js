

function onHashChange() {
  
  const hash = window.location.hash;
  
  const container = document.getElementById("container");

  if (!(container instanceof HTMLElement)) {
    throw new ReferenceError("No router view element available for rendering");
  }

	switch(window.location.href.match(/#(.*)$/) ? window.location.href.match(/#(.*)$/)[1] : ''){

  }

}

window.addEventListener("hashchange", onHashChange, false);
window.addEventListener("load", onHashChange, false);