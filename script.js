document.addEventListener("DOMContentLoaded", function () {

    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");

    if (cpf) {
        cpf.addEventListener("input", function () {
            let valor = cpf.value.replace(/\D/g, "");

            valor = valor.substring(0, 11);

            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
            valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

            cpf.value = valor;
        });
    }

    if (telefone) {
        telefone.addEventListener("input", function () {
            let valor = telefone.value.replace(/\D/g, "");

            valor = valor.substring(0, 11);

            valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
            valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

            telefone.value = valor;
        });
    }

    if (cep) {
        cep.addEventListener("input", function () {
            let valor = cep.value.replace(/\D/g, "");

            valor = valor.substring(0, 8);

            valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

            cep.value = valor;
        });
    }

});