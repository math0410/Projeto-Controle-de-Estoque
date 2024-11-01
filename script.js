let produtos = [];

document.addEventListener("DOMContentLoaded", function () {
  carregarProdutos();
  atualizarSelects();
  atualizarRelatorio();
});

function carregarProdutos() {
  const produtosJSON = localStorage.getItem("produtos");
  produtos = produtosJSON ? JSON.parse(produtosJSON) : [];
}

function salvarProdutos() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

document
  .getElementById("cadastro-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const nome = document.getElementById("produto-nome").value.trim();
    const descricao = document.getElementById("produto-descricao").value.trim();
    const codigo = document.getElementById("produto-codigo").value.trim();
    const unidade = document.getElementById("produto-unidade").value.trim();
    const quantidade = parseInt(
      document.getElementById("produto-quantidade").value
    );

    if (
      !nome ||
      isNaN(quantidade) ||
      quantidade <= 0 ||
      !descricao ||
      !codigo ||
      !unidade
    ) {
      alert("Por favor, insira um nome válido e uma quantidade positiva.");
      return;
    }

    const produtoExistente = produtos.find((p) => p.nome === nome);
    if (produtoExistente) {
      alert(
        "Este produto já está cadastrado. Use a opção de entrada para adicionar quantidade."
      );
      return;
    }

    produtos.push({ nome, quantidade, descricao, codigo, unidade });
    salvarProdutos();
    alert("Produto cadastrado com sucesso!");
    document.getElementById("cadastro-form").reset();
    atualizarSelects();
    atualizarRelatorio();
  });

document
  .getElementById("entrada-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const produtoNome = document.getElementById("entrada-produto").value;
    const produtoDescricao = document.getElementById("entrada-descricao").value;
    const produtoCodigo = document.getElementById("entrada-codigo").value;
    const produtoUnidade = document.getElementById("entrada-unidade").value;
    const quantidade = parseInt(
      document.getElementById("entrada-quantidade").value
    );

    const produto = produtos.find((p) => p.nome === produtoNome);
    if (produto) {
      produto.quantidade += quantidade;
      produto.descricao = produtoDescricao;
      produto.codigo = produtoCodigo;
      produto.unidade = produtoUnidade;
      salvarProdutos();
      alert("Entrada registrada com sucesso!");
      document.getElementById("entrada-form").reset();
      atualizarRelatorio();
    } else {
      alert("Produto não encontrado!");
    }
  });

document
  .getElementById("saida-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const produtoNome = document.getElementById("saida-produto").value;
    const produtoDescricao = document.getElementById("saida-descricao").value;
    const produtoCodigo = document.getElementById("saida-codigo").value;
    const produtoUnidade = document.getElementById("saida-unidade").value;
    const quantidade = parseInt(
      document.getElementById("saida-quantidade").value
    );

    const produto = produtos.find((p) => p.nome === produtoNome);
    if (produto && produto.quantidade >= quantidade) {
      produto.quantidade -= quantidade;

      if (produto.quantidade === 0) {
        produtos = produtos.filter((p) => p.nome !== produto.nome);
      }

      salvarProdutos();
      alert("Saída registrada com sucesso!");
      document.getElementById("saida-form").reset();
      atualizarSelects();
      atualizarRelatorio();
    } else {
      alert("Quantidade insuficiente ou produto não encontrado!");
    }
  });

function atualizarSelects() {
  const entradaSelect = document.getElementById("entrada-produto");
  const saidaSelect = document.getElementById("saida-produto");

  entradaSelect.innerHTML = '<option value="">Selecione um Produto</option>';
  saidaSelect.innerHTML = '<option value="">Selecione um Produto</option>';

  produtos.forEach((produto) => {
    if (produto.quantidade > 0) {
      entradaSelect.innerHTML += `<option value="${produto.nome}">${produto.nome}</option>`;
      saidaSelect.innerHTML += `<option value="${produto.nome}">${produto.nome}</option>`;
    }
  });
}

function atualizarRelatorio() {
  let relatorio =
    "<h3>Relatório de Produtos</h3><table><tr><th>Produto</th><th>Quantidade</th><th>Descrição</th><th>Código</th><th>Unidade</th></tr>";
  produtos.forEach((produto) => {
    if (produto.quantidade > 0) {
      relatorio += `
                <tr>
                    <td>${produto.nome}</td>
                    <td>${produto.quantidade}</td>
                    <td>${produto.descricao}</td>
                    <td>${produto.codigo}</td>
                    <td>${produto.unidade}</td>
                </tr>`;
    }
  });
  relatorio += "</table>";
  document.getElementById("relatorio-resultado").innerHTML = relatorio;
  
}

function limparTelaRelatorio() {
  document.getElementById("relatorio-resultado").innerHTML = "";
  
}

function voltar() {
  window.location.href = "index.html";
}

document
  .getElementById("limpar")
  .addEventListener("click", limparTelaRelatorio);

document.getElementById("voltar").addEventListener("click", voltar);

atualizarSelects();
