function getUser(email, password) {
    var user = JSON.parse(localStorage.getItem(email));

    if (user !== 'undefined' && user !== null) {
        if (email != user.email) {
            alert("Usuário ou senha incorretos");
            return window.location.replace("login.html")
        }
        if (password != user.password) {
            alert("Usuário ou senha incorretos");
            return window.location.replace("login.html");
        }

        alert("Usuário logado com sucesso");
        localStorage.setItem('token', btoa(user.email + user.password));
        return window.location.replace("index.html");
    }

    alert('Usuário ou senha incorretos');
    return  window.location.replace("login.html");
};

function logout(){
    localStorage.removeItem('token');
}


function newUser() {
    var user = JSON.stringify({
        fullName: $("#fullName").val(),
        maritalStatus: $("#maritalStatus").val(),
        gender: $("#gender").val(),
        birhtDate: $("#birthDate").val(),
        homePhone: $("#homePhone").val(),
        cellPhone: $("#cellPhone").val(),
        postalCode: $("#postalCode").val(),
        number: $("#number").val(),
        street: $("#street").val(),
        neighborhood: $("#neighborhood").val(),
        state: $("#state").val(),
        city: $("#city").val(),
        country: $("#country").val(),
        email: $("#email").val(),
        confirmEmail: $("#confirmEmail").val(),
        password: $("#password").val(),
        confirmPassword: $("#confirmPassword").val()

    });
    
    localStorage.setItem($("#email").val(), user);
    alert("Novo usuário registrado.");
    return window.location.replace("index.html");
}

function validateRegisterForm() {
    var fullName = document.forms["registerForm"]["fullName"].value;
    var maritalStatus = document.forms["registerForm"]["maritalStatus"].value;
    var gender = document.forms["registerForm"]["gender"].value;
    var birthDate = document.forms["registerForm"]["birthDate"].value;
    var homePhone = document.forms["registerForm"]["homePhone"].value;
    var cellPhone = document.forms["registerForm"]["cellPhone"].value;
    var postalCode = document.forms["registerForm"]["postalCode"].value;
    var number = document.forms["registerForm"]["number"].value;
    var street = document.forms["registerForm"]["street"].value;
    var neighborhood = document.forms["registerForm"]["neighborhood"].value;
    var state = document.forms["registerForm"]["state"].value;
    var city = document.forms["registerForm"]["city"].value;
    var country = document.forms["registerForm"]["country"].value;
    var email = document.forms["registerForm"]["email"].value;
    var confirmEmail = document.forms["registerForm"]["confirmEmail"].value;
    var password = document.forms["registerForm"]["password"].value;
    var confirmPassword = document.forms["registerForm"]["confirmPassword"].value;


    if (fullName == "") {
        alert("Nome completo precisa ser preenchido");
        return false;
    }
    if (maritalStatus == "") {
        alert("Estado Civil precisa ser preenchido");
        return false;
    }
    if (gender == "") {
        alert("Sexo precisa ser preenchido");
        return false;
    }
    if (birthDate == "") {
        alert("Data de nascimento completo precisa ser preenchido");
        return false;
    }
    if (homePhone == "") {
        alert("Telefone precisa ser preenchido");
        return false;
    }
    if (cellPhone == "") {
        alert("Celular precisa ser preenchido");
        return false;
    }
    if (postalCode == "") {
        alert("CEP precisa ser preenchido");
        return false;
    }
    if (number == "") {
        alert("Number precisa ser preenchido");
        return false;
    }
    if (street == "") {
        alert("Rua precisa ser preenchido");
        return false;
    }
    if (neighborhood == "") {
        alert("Bairro precisa ser preenchido");
        return false;
    }
    if (state == "") {
        alert("Estado precisa ser preenchido");
        return false;
    }
    if (city == "") {
        alert("Cidade precisa ser preenchido");
        return false;
    }
    if (country == "") {
        alert("País precisa ser preenchido");
        return false;
    }
    if (email == "") {
        alert("Email precisa ser preenchido");
        return false;
    }
    if (confirmEmail == "") {
        alert("Confirme seu Email precisa ser preenchido");
        return false;
    }
    if (password == "") {
        alert("Senha precisa ser preenchido");
        return false;
    }
    if (confirmPassword == "") {
        alert("Confirme sua senha precisa ser preenchido");
        return false;
    }

    this.newUser();
}

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

    this.getUser(email, password);
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