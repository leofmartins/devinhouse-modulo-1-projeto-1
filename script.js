const form = document.getElementById("form");
let listaDicas = [];

function verificaLocalStorage() {
  if (localStorage.getItem("listaDicas")) {
    listaDicas = JSON.parse(localStorage.getItem("listaDicas"))
    console.log("listaDicas carragado do localStorage");
  } else {
    localStorage.setItem("listaDicas", "[]");
    console.log("listaDicas criada no localStorage");
  }
}

function carregaListaDicas() {
  const listaCards = document.getElementById("lista-de-cards");

  while (listaCards.hasChildNodes()) {
    listaCards.removeChild(listaCards.firstChild);
  }

  listaDicas.forEach(item => {

    const card = document.createElement("li");
    const container = document.createElement("div");
    const cardTitulo = document.createElement("h3");
    const cardPrimeiroSubtitulo = document.createElement("p");
    const cardSegundoSubtitulo = document.createElement("p");
    const cardParagrafo = document.createElement("p");
    const containerBotoes = document.createElement("div");
    const linkVideo = document.createElement("a");
    const botaoEditar = document.createElement("button");
    const botaoExcluir = document.createElement("button");
    const iconeEditar = document.createElement("img");
    const iconeExcluir = document.createElement("img");
    const iconeVideo = document.createElement("img");

    cardTitulo.textContent = item.titulo;

    cardPrimeiroSubtitulo.textContent = `Linguagem/Skill: ${item.linguagemSkill}`;
    cardSegundoSubtitulo.textContent = `Categoria: ${item.categoria}`;
    cardParagrafo.textContent = item.descricao;

    iconeEditar.setAttribute("src", "./icons/editar.png");
    iconeExcluir.setAttribute("src", "./icons/excluir.png");
    iconeVideo.setAttribute("src", "./icons/video.png");

    card.setAttribute("class", "card");
    containerBotoes.setAttribute("class", "cards-botoes");
    cardPrimeiroSubtitulo.setAttribute("class", "card-titulo");

    botaoEditar.appendChild(iconeEditar);
    botaoExcluir.appendChild(iconeExcluir);

    containerBotoes.appendChild(botaoExcluir);
    containerBotoes.appendChild(botaoEditar);
    if (item.linkVideo) {
      linkVideo.appendChild(iconeVideo);
      linkVideo.setAttribute("href", item.linkVideo);
      containerBotoes.appendChild(linkVideo);
    }
    container.appendChild(cardTitulo);
    container.appendChild(cardPrimeiroSubtitulo);
    container.appendChild(cardSegundoSubtitulo);
    container.appendChild(cardParagrafo);
    container.appendChild(containerBotoes);
    card.appendChild(container);

    listaCards.appendChild(card);
  })
}

function salvarItem(event) {
  event.preventDefault();

  const titulo = document.getElementById("titulo");
  const linguagemSkill = document.getElementById("linguagen-skill");
  const categoria = document.getElementById("categoria");
  const descricao = document.getElementById("descricao");
  const likVideo = document.getElementById("video");

  listaDicas.push({
    titulo: titulo.value,
    linguagemSkill: linguagemSkill.value,
    categoria: categoria.value,
    descricao: descricao.value,
    linkVideo: likVideo.value
  });

  localStorage.setItem("listaDicas", JSON.stringify(listaDicas));

  form.reset();

  carregaListaDicas();
}

function contabilizaCategorias() {
  let frontEnd = 0;
  let backEnd = 0;
  let fullStack = 0;
  let softSkill = 0;
  let total = 0;

  listaDicas.forEach(item => {
    switch (item.categoria) {
      case "FontEnd":
        frontEnd++;
        break;
      case "BackEnd":
        backEnd++;
      case "FullStack":
        fullStack++;
        break;
      case "SoftsKill":
        softSkill++
        break;
      default:
        break;
    }
  });

  total = frontEnd + backEnd + fullStack + softSkill;


}

window.addEventListener("load", verificaLocalStorage);
window.addEventListener("load", carregaListaDicas);
form.addEventListener("submit", salvarItem);