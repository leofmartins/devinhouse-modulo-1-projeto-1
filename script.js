const form = document.getElementById("form");
const listaCards = document.getElementById("lista-de-cards");
const botaoPesquisar = document.getElementById("botao-pesquisar");
const botaoLimparPesquisa = document.getElementById("botao-limpar-pesquisa");

let listaDicas = [];

listaCards.addEventListener("click", (event) => {
    if (event.target.className === "excluir") {
      const id = event.target.getAttribute("id")
      const confirmacaoUsuario = confirm(
        `Você tem certeza que deseja deletar a dica ${listaDicas[id].titulo}?`
      );

      if (confirmacaoUsuario) {
        listaDicas.splice(id, 1);
        localStorage.setItem("listaDicas", JSON.stringify(listaDicas));
        carregaListaDicas(listaCards, listaDicas);
        contabilizaCategorias();
      }
    }
  }
);

listaCards.addEventListener("click", (event) => {
  if (event.target.className === 'editar') {
    form.removeEventListener("submit", salvarItem);

    const id = event.target.getAttribute("id")
    const titulo = document.getElementById("titulo");
    const linguagemSkill = document.getElementById("linguagen-skill");
    const categoria = document.getElementById("categoria");
    const descricao = document.getElementById("descricao");
    const linkVideo = document.getElementById("video");

    titulo.value = listaDicas[id].titulo;
    linguagemSkill.value = listaDicas[id].linguagemSkill;
    categoria.value = listaDicas[id].categoria;
    descricao.value = listaDicas[id].descricao;
    linkVideo.value = listaDicas[id].linkVideo;

    alert("As informações da dica selecionada para edição serão enviadas para a barra lateral.\n" +
      "Realize as devidas edições e clique em Salvar para finalizar.");

    form.addEventListener("submit", () => {

       listaDicas[id] = {
         titulo: titulo.value,
         linguagemSkill: linguagemSkill.value,
         categoria: categoria.value,
         descricao: descricao.value,
         linkVideo: linkVideo.value
       };

      localStorage.setItem("listaDicas", JSON.stringify(listaDicas));

       carregaListaDicas(listaCards, listaDicas);

       contabilizaCategorias();

       alert("Item editado com sucesso.");

       form.addEventListener("submit", salvarItem);
    })

  }
});

function verificaLocalStorage() {
  if (localStorage.getItem("listaDicas")) {
    listaDicas = JSON.parse(localStorage.getItem("listaDicas"));
  } else {
    localStorage.setItem("listaDicas", "[]");
  }

}
function carregaListaDicas(listaCards, listaDicas) {

  while (listaCards.hasChildNodes()) {
    listaCards.removeChild(listaCards.firstChild);
  }
  if (listaDicas.length === 0) {
    const mensagemListaVazia = document.createElement("p");
    listaCards.appendChild(mensagemListaVazia);
    mensagemListaVazia.innerText = "Nenhum item...";
  } else {

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
      card.setAttribute("id", `${listaDicas.indexOf(item)}`);

      containerBotoes.setAttribute("class", "cards-botoes");
      cardPrimeiroSubtitulo.setAttribute("class", "card-titulo");

      botaoEditar.appendChild(iconeEditar);
      botaoExcluir.appendChild(iconeExcluir);

      botaoExcluir.setAttribute("id", listaDicas.indexOf(item).toString());
      botaoExcluir.setAttribute("class", "excluir");

      botaoEditar.setAttribute("class", "editar");
      botaoEditar.setAttribute("id", listaDicas.indexOf(item).toString());

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
    });
  }
}

function salvarItem(event) {
  event.preventDefault();

  const titulo = document.getElementById("titulo");
  const linguagemSkill = document.getElementById("linguagen-skill");
  const categoria = document.getElementById("categoria");
  const descricao = document.getElementById("descricao");
  const linkVideo = document.getElementById("video");

  listaDicas.push({
    titulo: titulo.value,
    linguagemSkill: linguagemSkill.value,
    categoria: categoria.value,
    descricao: descricao.value,
    linkVideo: linkVideo.value
  });

  localStorage.setItem("listaDicas", JSON.stringify(listaDicas));

  form.reset();

  carregaListaDicas(listaCards, listaDicas);

  contabilizaCategorias();

  alert("SUCESSO!\n\nDica cadastrada na base do conhecimento.");
}

function contabilizaCategorias() {

  let frontEnd = 0;
  let backEnd = 0;
  let fullStack = 0;
  let softSkill = 0;

  listaDicas.forEach(item => {
    switch (item.categoria) {
      case "FrontEnd":
        frontEnd++;
        break;
      case "BackEnd":
        backEnd++;
        break;
      case "FullStack":
        fullStack++;
        break;
      case "SoftSkill":
        softSkill++;
        break;
      default:
        break;
    }
  });

  let total = frontEnd + backEnd + fullStack + softSkill;

  let gridTotal = document.getElementById("grid-total");
  let gridFrontEnd = document.getElementById("grid-frontend");
  let gridBackEnd = document.getElementById("grid-backend");
  let gridFullStack = document.getElementById("grid-fullstack");
  let gridSoftSkill = document.getElementById("grid-softskill");

  gridTotal.textContent = total.toString();
  gridFrontEnd.textContent = frontEnd.toString();
  gridBackEnd.textContent = backEnd.toString();
  gridFullStack.textContent = fullStack.toString();
  gridSoftSkill.textContent = softSkill.toString();

}

function pesquisaTitulo(event) {
  event.preventDefault();

  const termoPesquisado = document.getElementById("campo-pesquisar-titulo");
  // const listaCards = document.getElementById("lista-de-cards");

  const listaDicasFitrada = listaDicas.filter(({ titulo }) => {
    return titulo.toLowerCase().includes(termoPesquisado.value.toLowerCase());
  });

  carregaListaDicas(listaCards, listaDicasFitrada);

}

function limparPesquisa() {

}

window.addEventListener("load", verificaLocalStorage);
window.addEventListener("load", () => {
  carregaListaDicas(listaCards, listaDicas);
});
window.addEventListener("load", contabilizaCategorias);
form.addEventListener("submit", salvarItem);
botaoPesquisar.addEventListener("click", pesquisaTitulo);
botaoLimparPesquisa.addEventListener("click", limparPesquisa)