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
  console.log("Carregando lista de cards...");
  console.log(listaDicas);

  listaDicas.forEach(item => {
    const listaCards = document.getElementById("lista-de-cards");

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

    console.log(item);

    cardTitulo.textContent = item.titulo;

    cardPrimeiroSubtitulo.textContent = `Linguagem/Skill: ${item.linguagemSkill}`;
    cardSegundoSubtitulo.textContent = `Categoria: ${item.categoria}`;
    cardParagrafo.textContent = item.descricao;
    botaoEditar.textContent = "Editar";
    botaoExcluir.textContent = "Excluir";

    card.setAttribute("class", "card");
    containerBotoes.setAttribute("class", "cards-botoes");
    cardPrimeiroSubtitulo.setAttribute("class", "card-titulo");

    containerBotoes.appendChild(botaoExcluir);
    containerBotoes.appendChild(botaoEditar);
    if (item.linkVideo) {
      linkVideo.textContent = "Video";
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

function salvarItem() {

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
}

window.addEventListener("load", verificaLocalStorage);
window.addEventListener("load", carregaListaDicas);
form.addEventListener("submit", salvarItem);