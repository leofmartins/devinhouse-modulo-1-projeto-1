const dicas = [];

const form = document.getElementById("form");

const listaDeCards = document.getElementById("lista-de-cards")

window.addEventListener("load", renderizaCards);
// form.addEventListener("submit", salvarDica);

function renderizaCards() {
  // event.preventDefault();

  const listaDicas = JSON.parse(localStorage.getItem("listaDicas"));

  console.log(listaDicas);

  listaDicas.forEach((item) => {
    const card = document.createElement("li");
    const containerDeItens = document.createElement("div");
    const cardTitulo = document.createElement("h1");
    const cardPrimeiroSubtitulo = document.createElement("h2")
    const cardSegundoSubtitulo = document.createElement("h2");
    const conteudoCard = document.createElement("p");

    card.setAttribute("class", "card");
    cardTitulo.setAttribute("class", "card-titulo");
    cardPrimeiroSubtitulo.setAttribute("class", "card-subtitulo-1");
    cardSegundoSubtitulo.setAttribute("class", "card-subtitulo-2");

    cardTitulo.textContent = item.titulo;
    cardPrimeiroSubtitulo.textContent = item.linguagemSkill;
    cardSegundoSubtitulo.textContent = item.categoria;
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

function salvarDica(event) {
  event.preventDefault();

  const titulo = document.getElementById("titulo");
  const linguagemSkill = document.getElementById("linguagen-skill");
  const categoria = document.getElementById("categoria");
  const descricao = document.getElementById("descricao");
  const linkVideo = document.getElementById("video");

  dicas.push({
    titulo: titulo.value,
    linguagemSkill: linguagemSkill.value,
    categoria: categoria.value,
    descricao: descricao.value,
    linkVideo: linkVideo.value
  });

  console.log(dicas);

  const objeto = JSON.stringify(dicas);

  console.log(objeto);

  localStorage.setItem("listaDicas", objeto);

  form.reset();
}