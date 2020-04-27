function validateLoginForm() {
    var email = document.forms["loginForm"]["email"].value;
    var password = document.forms["loginForm"]["password"].value;

    if (email == "") {
        alert("Email precisa ser preenchido");
        return false;
    }

    if (password == "") {
        alert("Senha precisa ser preenchida");
        return false;
    }
}

function getViaCep() {
    var cep = document.forms["registerForm"]["postalCode"].value;
    var url = `https://viacep.com.br/ws/${cep}/json/`;
    var request = new XMLHttpRequest();

    request.onerror = function () {
        alert("CEP inválido");
        document.forms["registerForm"]["street"].value = null;
        document.forms["registerForm"]["neighborhood"].value = null;
        document.forms["registerForm"]["state"].value = null;
        document.forms["registerForm"]["city"].value = null;
    };

    request.open('GET', url, true);
    request.onload = function () {
        var data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            document.forms["registerForm"]["street"].value = data.logradouro;
            document.forms["registerForm"]["neighborhood"].value = data.bairro;
            document.forms["registerForm"]["state"].value = data.localidade;
            document.forms["registerForm"]["city"].value = data.uf;
        } else {
            alert("Erro interno contate um administrador");

        }
    };

    request.send();

}