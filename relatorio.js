document.addEventListener("DOMContentLoaded", function () {
  const produtos = JSON.parse(localStorage.getItem("produtos"));
  let relatorio =
    "<h3>Relatório de Saida</h3><table><tr><th>Produto</th><th>Quantidade</th><th>Descrição</th><th>Código</th><th>Unidade</th><th>Usuario</th></tr>";
  produtos.forEach((produto) => {
    if (produto.quantidade > 0) {
      relatorio += `
                <tr>
                    <td>${produto.nome}</td>
                    <td>${produto.quantidade}</td>
                    <td>${produto.descricao}</td>
                    <td>${produto.codigo}</td>
                    <td>${produto.unidade}</td>
                    <td>${produto.usuario}</td>
                </tr>`;
    }
  });
  relatorio += "</table>";
  document.getElementById("relatorio-saida").innerHTML = relatorio;
});
