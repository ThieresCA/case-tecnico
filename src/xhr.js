async function getApi() {
  const response = await fetch("./json-desafio.json");
  return response.json();
}

function buildCard(data) {
  const cursos = data.cursos;
  cursos.forEach((element, index) => {
    if (element.curso.tipo == "mba") {
      createCardMba(element.curso, index);
    }
    if (element.curso.tipo == "pos") {
      createCardPos(element.curso, index);
    }
    createCard(element.curso, index);
    createModal(element.curso, index);
  });
}

function createModal(curso, id) {
  const wrapper = document.getElementById("wrapper-card");
  fetch("../components/modal.html")
    .then((response) => response.text())
    .then((textResponse) => {
      textResponse = textResponse.replace("{{modalTitle}}", curso.titulo);
      textResponse = textResponse.replace("{{idModal}}", "modal" + id);
      textResponse = textResponse.replace("{{text}}", curso.descricao);
      wrapper.innerHTML += textResponse;
    });
}

function createCard(curso, id) {
  const wrapperCard = document.getElementById("wrapper-card");
  fetch("../components/card.html")
    .then((response) => response.text())
    .then((textResponse) => {
      textResponse = textResponse.replace("{{idCard}}", "collapseCurso");
      textResponse = textResponse.replace("{{idModal}}", "modal" + id);
      textResponse = textResponse.replace("{{text}}", curso.titulo);
      wrapperCard.innerHTML += textResponse;
    });
}

function createCardMba(curso, id) {
  const wrapperCard = document.getElementById("wrapper-card");
  fetch("../components/card.html")
    .then((response) => response.text())
    .then((textResponse) => {
      textResponse = textResponse.replace("{{idCard}}", "collapseMba");
      textResponse = textResponse.replace("{{idModal}}", "modal" + id);
      textResponse = textResponse.replace("{{text}}", curso.titulo);
      wrapperCard.innerHTML += textResponse;
    });
}

function createCardPos(curso, id) {
  const wrapperCard = document.getElementById("wrapper-card");
  fetch("../components/card.html")
    .then((response) => response.text())
    .then((textResponse) => {
      textResponse = textResponse.replace("{{idCard}}", "collapsePos");
      textResponse = textResponse.replace("{{idModal}}", "modal" + id);
      textResponse = textResponse.replace("{{text}}", curso.titulo);
      wrapperCard.innerHTML += textResponse;
    });
}

getApi().then((data) => {
  buildCard(data);
});
