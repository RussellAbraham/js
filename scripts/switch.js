let data = [
    { title: 'Get All' },
    { title: 'Get One' },
    { title: 'Add' },
    { title: 'Delete'},
    { title: 'Update'},
    { title: 'View'},
    { title: 'Export'},
    { title: 'Import'},
    { title: 'Upload'}
  ];
  
  
  const getAllTemplate = `
    <h3>${data[0].title}</h3>
    <hr>
  `;
  
  const displayTemplate = `
    <h3>${data[1].title}</h3>
    <hr>
  `;
  const addTemplate = `
    <h3>${data[2].title}</h3>
    <hr>
  `;
  const deleteTemplate = `
    <h3>${data[3].title}</h3>
    <hr>
  `;
  const updateTemplate = `
    <h3>${data[4].title}</h3>
    <hr>
  `;
  const viewTemplate = `
    <h3>${data[5].title}</h3>
    <hr>
  `;
  const exportTemplate = `
    <h3>${data[6].title}</h3>
    <hr>
  `;
  const importTemplate = `
    <h3>${data[7].title}</h3>
    <hr>
  `;
  const uploadTemplate = `
    <h3>${data[8].title}</h3>
    <hr>
  `;
  function onRouteChanged() {
    const hash = window.location.hash;
    const container = document.getElementById("container");
    if (!(container instanceof HTMLElement)) {
      throw new ReferenceError("No router view element available for rendering");
    }
    switch (arg) {
      case "boolean":
        console.log('boolean', arg);
        break;
      case "#display":
        container.innerHTML = displayTemplate;
        break;
      case "#add":
        container.innerHTML = addTemplate;
        break;
      case "#delete":
        container.innerHTML = deleteTemplate;
        break;
      case "#update":
        container.innerHTML = updateTemplate;
        break;
      case "#view":
        container.innerHTML = viewTemplate;
        break;    
      case "#export":
        container.innerHTML = exportTemplate;
        break;    
      case "#import":
        container.innerHTML = importTemplate;
        break;
      case "#upload":
        container.innerHTML = uploadTemplate;
        break;
      default:
        container.innerHTML = "<h3>Welcome</h3>";
        break;
    }
  }
  
  window.addEventListener("hashchange", onRouteChanged);
  window.addEventListener("load", onRouteChanged);
  