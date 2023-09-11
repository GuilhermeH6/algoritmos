document.addEventListener("DOMContentLoaded", function () {
  class Tabela {
    constructor(nome, campos) {
      this.nome = nome;
      this.campos = campos;
      this.registros = [];
    }

    inserirRegistro(registro) {
      this.registros.push(registro);
    }

    select(campos) {
      return this.registros.map((registro) => {
        const resultado = {};
        campos.forEach((campo) => {
          resultado[campo] = registro[campo];
        });
        return resultado;
      });
    }
  }

  const tabelaPessoas = new Tabela("Pessoas", ["nome", "idade"]);
  const tabelaEnderecos = new Tabela("Enderecos", ["pessoa_id", "rua"]);

  const pessoasForm = document.getElementById("pessoas-form");
  const enderecosForm = document.getElementById("enderecos-form");
  const selectForm = document.getElementById("select-form");
  const selectResult = document.getElementById("select-result");

  pessoasForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const idade = parseInt(document.getElementById("idade").value);
    tabelaPessoas.inserirRegistro({ nome, idade });
    pessoasForm.reset();
  });

  enderecosForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const pessoa_id = parseInt(document.getElementById("pessoa_id").value);
    const rua = document.getElementById("rua").value;
    tabelaEnderecos.inserirRegistro({ pessoa_id, rua });
    enderecosForm.reset();
  });

  selectForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const tabelaSelecionada = document.getElementById("tabela").value;
    const camposSelecionados = document
      .getElementById("campos")
      .value.split(",")
      .map((campo) => campo.trim());
    let resultado = [];

    if (tabelaSelecionada === "Pessoas") {
      resultado = tabelaPessoas.select(camposSelecionados);
    } else if (tabelaSelecionada === "Enderecos") {
      resultado = tabelaEnderecos.select(camposSelecionados);
    } else if (tabelaSelecionada === "PessoasEnderecos") {
      resultado = tabelaPessoas.registros.map((pessoa) => {
        const enderecos = tabelaEnderecos.registros.filter(
          (endereco) => endereco.idPessoa === pessoa.id
        );
        return {
          ...pessoa,
          Enderecos: enderecos,
        };
      });
    }

    const selectResult = document.getElementById("select-result");
    selectResult.textContent = JSON.stringify(resultado, null, 2);
  });
});
