
const data = [
  { title: 'Home' },
  { title: 'About' },
  { title: 'Contact' }
];

const templates = {
  home: `<h3>${data[0].title}</h3>`,
  about: `<h3>${data[1].title}</h3>`,
  contact: `<h3>${data[2].title}</h3>`
}

function onHashChange() {
  const hash = window.location.hash;
  const container = document.getElementById("container");
  if (!(container instanceof HTMLElement)) {
    throw new ReferenceError("No router view element available for rendering");
  }
  switch (hash) {
    case "#home":
      container.innerHTML = templates.home;
      break;
    case "#about":
      container.innerHTML = templates.about;
      break;
    case "#contact":
      container.innerHTML = templates.contact;
      break;
    default:
      container.innerHTML = "<h3>Welcome</h3>";
      break;
  }
}

window.addEventListener("hashchange", onHashChange, false);
window.addEventListener("load", onHashChange, false);