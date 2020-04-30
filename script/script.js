function login(email, password) {
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
        localStorage.setItem('token', btoa(user.email));
        return window.location.replace("index.html");
    }

    alert('Usuário ou senha incorretos');
    return window.location.replace("login.html");
};

function logout() {
    localStorage.removeItem('token');
}


function createUser() {

    var registerForm = getRegisterForm();

    var userString = JSON.stringify({
        fullName: registerForm.fullName,
        maritalStatus: registerForm.maritalStatus,
        gender: registerForm.gender,
        birthDate: registerForm.birthDate,
        homePhone: registerForm.homePhone,
        cellPhone: registerForm.cellPhone,
        postalCode: registerForm.postalCode,
        number: registerForm.number,
        street: registerForm.street,
        neighborhood: registerForm.neighborhood,
        state: registerForm.state,
        city: registerForm.city,
        country: registerForm.country,
        email: registerForm.email,
        password: registerForm.password
    });

    var user = JSON.parse(userString);

    localStorage.setItem(user.email, userString);
    localStorage.setItem('token', btoa(user.email));
    alert("Usuário cadastrado e logado com sucesso");

    return window.location.replace("profile.html");
}


function getRegisterForm() {
    var registerForm = JSON.stringify({
        fullName: $("#fullName").val(),
        maritalStatus: $("#maritalStatus").val(),
        gender: $("#gender").val(),
        birthDate: $("#birthDate").val(),
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
    return JSON.parse(registerForm);
}

function validateRegisterForm() {
    var registerForm = getRegisterForm();

    if (registerForm.fullName == "") {
        alert("Nome completo precisa ser preenchido");
        return false;
    }
    if (registerForm.maritalStatus == "") {
        alert("Estado Civil precisa ser preenchido");
        return false;
    }
    if (registerForm.gender == "") {
        alert("Sexo precisa ser preenchido");
        return false;
    }
    if (registerForm.birthDate == "") {
        alert("Data de nascimento completo precisa ser preenchido");
        return false;
    }
    if (registerForm.homePhone == "") {
        alert("Telefone precisa ser preenchido");
        return false;
    }
    if (registerForm.cellPhone == "") {
        alert("Celular precisa ser preenchido");
        return false;
    }
    if (registerForm.postalCode == "") {
        alert("CEP precisa ser preenchido");
        return false;
    }
    if (registerForm.number == "") {
        alert("Number precisa ser preenchido");
        return false;
    }
    if (registerForm.street == "") {
        alert("Rua precisa ser preenchido");
        return false;
    }
    if (registerForm.neighborhood == "") {
        alert("Bairro precisa ser preenchido");
        return false;
    }
    if (registerForm.state == "") {
        alert("Estado precisa ser preenchido");
        return false;
    }
    if (registerForm.city == "") {
        alert("Cidade precisa ser preenchido");
        return false;
    }
    if (registerForm.country == "") {
        alert("País precisa ser preenchido");
        return false;
    }
    if (registerForm.email == "") {
        alert("Email precisa ser preenchido");
        return false;
    }
    if (registerForm.confirmEmail == "") {
        alert("Confirme seu Email precisa ser preenchido");
        return false;
    }
    if (registerForm.email != registerForm.confirmEmail) {
        alert("A confirmação de email está diferente");
        return false;
    }
    if (registerForm.password == "") {
        alert("Senha precisa ser preenchido");
        return false;
    }
    if (registerForm.confirmPassword == "") {
        alert("Confirme sua senha precisa ser preenchido");
        return false;
    }
    if (registerForm.password != registerForm.confirmPassword) {
        alert("A confirmação de senha está diferente");
        return false;
    }

    var user = JSON.parse(localStorage.getItem(registerForm.email));

    if (user !== 'undefined' && user !== null) {
        alert("Email já cadastrado")
        return false;
    }

    this.createUser();
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

    this.login(email, password);
}


function getViaCep() {
    var cep = document.forms["registerForm"]["postalCode"].value;
    var url = `https://viacep.com.br/ws/${cep}/json/`;
    var request = new XMLHttpRequest();

    request.onerror = function () {
        alert("CEP inválido");
        document.forms["registerForm"]["street"].value = "";
        document.forms["registerForm"]["neighborhood"].value = "";
        document.forms["registerForm"]["state"].value = "";
        document.forms["registerForm"]["city"].value = "";
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


function getProfile() {
    let email = atob(localStorage.getItem('token'));
    let user = JSON.parse(localStorage.getItem(email));
    document.getElementById('fullName').innerHTML = user.fullName;
    document.getElementById('maritalStatus').innerHTML = user.maritalStatus;
    document.getElementById('gender').innerHTML = user.gender;
    document.getElementById('birthDate').innerHTML = user.birthDate;
    document.getElementById('homePhone').innerHTML = user.homePhone;
    document.getElementById('cellPhone').innerHTML = user.cellPhone;
    document.getElementById('postalCode').innerHTML = user.postalCode;
    document.getElementById('number').innerHTML = user.number;
    document.getElementById('street').innerHTML = user.street;
    document.getElementById('neighborhood').innerHTML = user.neighborhood;
    document.getElementById('state').innerHTML = user.state;
    document.getElementById('city').innerHTML = user.city;
    document.getElementById('country').innerHTML = user.country;
    document.getElementById('email').innerHTML = user.email;
}
