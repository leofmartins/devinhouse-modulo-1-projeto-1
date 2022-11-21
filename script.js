const form = document.getElementById("form");
const listaCards = document.getElementById("lista-de-cards");
const botaoPesquisar = document.getElementById("botao-pesquisar");
const botaoLimparPesquisa = document.getElementById("botao-limpar-pesquisa");
let titulo = document.getElementById("titulo");
let linguagemSkill = document.getElementById("linguagen-skill");
let categoria = document.getElementById("categoria");
let descricao = document.getElementById("descricao");
let linkVideo = document.getElementById("video");
let indexCardEditar = 0;
let idCardEmEdicao = 0;

let listaDicas = [];

function verificaLocalStorage() {
  if (localStorage.getItem("listaDicas")) {
    listaDicas = JSON.parse(localStorage.getItem("listaDicas"));
    if (!listaDicas.every(item => item.id && item.conteudo)) {
      localStorage.setItem("listaDicas", "[]");
    }
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

      cardTitulo.textContent = item.conteudo.titulo;
      cardPrimeiroSubtitulo.innerHTML = "<strong>Linguagem: </strong>" + item.conteudo.linguagemSkill;
      cardSegundoSubtitulo.innerHTML = "<strong>Comportamento/Skill: </strong>" + item.conteudo.categoria;
      cardParagrafo.textContent = item.conteudo.descricao;

      iconeEditar.setAttribute("src", "./icons/editar.png");
      iconeExcluir.setAttribute("src", "./icons/excluir.png");
      iconeVideo.setAttribute("src", "./icons/video.png");

      card.setAttribute("class", "card");
      card.setAttribute("id", `${item.id}`);

      containerBotoes.setAttribute("class", "cards-botoes");
      cardPrimeiroSubtitulo.setAttribute("class", "card-titulo");

      botaoEditar.appendChild(iconeEditar);
      botaoExcluir.appendChild(iconeExcluir);

      botaoExcluir.setAttribute("id", `${item.id}`);
      botaoExcluir.setAttribute("class", "excluir");

      botaoEditar.setAttribute("class", "editar");
      botaoEditar.setAttribute("id", `${item.id}`);

      containerBotoes.appendChild(botaoExcluir);
      containerBotoes.appendChild(botaoEditar);
      if (item.conteudo.linkVideo) {
        linkVideo.appendChild(iconeVideo);
        linkVideo.setAttribute("href", item.conteudo.linkVideo);
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

  capturaValoresDoForm();

  listaDicas.push({
    id: Date.now(),
    conteudo: {
      titulo: titulo.value,
      linguagemSkill: linguagemSkill.value,
      categoria: categoria.value,
      descricao: descricao.value,
      linkVideo: linkVideo.value
    }
  });


  localStorage.setItem("listaDicas", JSON.stringify(listaDicas));

  form.reset();

  carregaListaDicas(listaCards, listaDicas);

  contabilizaCategorias();

  alert("SUCESSO!\n\nDica cadastrada na base do conhecimento.");
}

function capturaValoresDoForm() {
  titulo = document.getElementById("titulo");
  linguagemSkill = document.getElementById("linguagen-skill");
  categoria = document.getElementById("categoria");
  descricao = document.getElementById("descricao");
  linkVideo = document.getElementById("video");
}

function editarItem(event) {
  event.preventDefault();

  capturaValoresDoForm();

  listaDicas[indexCardEditar] = {
    id: Number(idCardEmEdicao),
    conteudo: {
      titulo: titulo.value,
      linguagemSkill: linguagemSkill.value,
      categoria: categoria.value,
      descricao: descricao.value,
      linkVideo: linkVideo.value
    }
  };

  form.reset();

  localStorage.setItem("listaDicas", JSON.stringify(listaDicas));

  carregaListaDicas(listaCards, listaDicas);

  contabilizaCategorias();

  alert("Item editado com sucesso.");

  form.removeEventListener("submit", editarItem);
  form.addEventListener("submit", salvarItem);
}

function contabilizaCategorias() {

  let frontEnd = 0;
  let backEnd = 0;
  let fullStack = 0;
  let softSkill = 0;

  listaDicas.forEach(item => {
    switch (item.conteudo.categoria) {
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

  const listaDicasFitrada = listaDicas.filter(({ conteudo }) => {
    return conteudo.titulo.toLowerCase().includes(
      termoPesquisado.value.toLowerCase()
    );
  });

  carregaListaDicas(listaCards, listaDicasFitrada);

}

function limparPesquisa() {
  const campoPesquisa = document.getElementById("campo-pesquisar-titulo");
  campoPesquisa.value = null;

  carregaListaDicas(listaCards, listaDicas);
}

window.addEventListener("load", verificaLocalStorage);

window.addEventListener("load", () => {
  carregaListaDicas(listaCards, listaDicas);
});

window.addEventListener("load", contabilizaCategorias);

form.addEventListener("submit", salvarItem);

botaoPesquisar.addEventListener("click", pesquisaTitulo);

botaoLimparPesquisa.addEventListener("click", limparPesquisa);

listaCards.addEventListener("click", event => {
  if (event.target.className === "editar") {
    form.removeEventListener("submit", salvarItem);
    form.addEventListener("submit", editarItem);

    idCardEmEdicao = event.target.getAttribute("id");
    indexCardEditar = listaDicas.findIndex(
      ({id}) => id === Number(idCardEmEdicao)
    );

    titulo.value = listaDicas[indexCardEditar].conteudo.titulo;
    linguagemSkill.value = listaDicas[indexCardEditar].conteudo.linguagemSkill;
    categoria.value = listaDicas[indexCardEditar].conteudo.categoria;
    descricao.value = listaDicas[indexCardEditar].conteudo.descricao;
    linkVideo.value = listaDicas[indexCardEditar].conteudo.linkVideo;

    alert("As informações da dica selecionada para edição" +
      "serão enviadas para a barra lateral. Realize as devidas" +
      "edições e clique em Salvar para finalizar.");
  }
});

listaCards.addEventListener("click", (event) => {
    if (event.target.className === "excluir") {
      const idCardEmExclusao = event.target.getAttribute("id");
      const tituloDica = listaDicas.find(({ id }) => id === id).conteudo.titulo;
      const indexCardExcluir = listaDicas.findIndex(
        ({ id }) => id === Number(idCardEmExclusao)
      );
      const confirmacaoUsuario = confirm(
        `Você tem certeza que deseja deletar a dica ${tituloDica}?`
      );

      if (confirmacaoUsuario) {
        listaDicas.splice(indexCardExcluir, 1);
        localStorage.setItem("listaDicas", JSON.stringify(listaDicas));
        carregaListaDicas(listaCards, listaDicas);
        contabilizaCategorias();
      }
    }
  }
);