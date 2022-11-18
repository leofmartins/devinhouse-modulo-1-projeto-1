const form = document.getElementById("form");

const listaDeCards = document.getElementById("lista-de-cards");

function renderizaCards() {
  // event.preventDefault();

  const listaDicas = JSON.parse(localStorage.getItem("listaDicas"));

  console.log(listaDicas);

  listaDicas.forEach((item) => {
    const card = document.createElement("li");
    const containerDeItens = document.createElement("div");
    const cardTitulo = document.createElement("h1");
    const cardPrimeiroSubtitulo = document.createElement("p")
    const cardSegundoSubtitulo = document.createElement("p");
    const conteudoCard = document.createElement("p");

    card.setAttribute("class", "card");
    cardTitulo.setAttribute("class", "card-titulo");
    cardPrimeiroSubtitulo.setAttribute("class", "card-subtitulo-1");
    cardSegundoSubtitulo.setAttribute("class", "card-subtitulo-2");

    cardTitulo.textContent = item.titulo;
    cardPrimeiroSubtitulo.textContent = `Linguagem/Skill: ${item.linguagemSkill}`;
    cardSegundoSubtitulo.textContent = `Categoria: ${item.categoria}`;
    conteudoCard.textContent = item.descricao;

    // TODO - criar item do link do video e botões de editar e excluir

    containerDeItens.appendChild(cardTitulo);
    containerDeItens.appendChild(cardPrimeiroSubtitulo);
    containerDeItens.appendChild(cardSegundoSubtitulo);
    containerDeItens.appendChild(conteudoCard);
    card.appendChild(containerDeItens);
    listaDeCards.appendChild(card);
  });
}

function verificaLocalStorage() {
  if (!localStorage.getItem("listaDicas")) {
    localStorage.setItem("listaDicas", JSON.stringify([]));
  }
}

function salvarDica(event) {

  event.preventDefault();

  verificaLocalStorage();

  const titulo = document.getElementById("titulo");
  const linguagemSkill = document.getElementById("linguagen-skill");
  const categoria = document.getElementById("categoria");
  const descricao = document.getElementById("descricao");
  const linkVideo = document.getElementById("video");

  const listaDicas = localStorage.getItem("listaDicas");

  console.log(typeof listaDicas);

  listaDicas.push({
    titulo: titulo.value,
    linguagemSkill: linguagemSkill.value,
    categoria: categoria.value,
    descricao: descricao.value,
    linkVideo: linkVideo.value
  });

  console.log(listaDicas);

  const objeto = JSON.stringify(listaDicas);

  console.log(objeto);

  localStorage.setItem("listaDicas", objeto);

  form.reset();
}

window.addEventListener("load", renderizaCards);
form.addEventListener("submit", salvarDica);