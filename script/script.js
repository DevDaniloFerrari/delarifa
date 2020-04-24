function includeHTML() {
  var z, i, element, file, xhttp;

  z = document.getElementsByTagName("*");

  for (i = 0; i < z.length; i++) {
    element = z[i];

    file = element.getAttribute("include");
    if (file) {

      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

          if (this.status == 200) { element.innerHTML = this.responseText; }
          if (this.status == 404) { element.innerHTML = "Página não encontrada."; }

          element.removeAttribute("include");
          includeHTML();
        }
      }

      xhttp.open("GET", file, true);
      xhttp.send();

      return;
    }
  }
}

function loadPage(id) {
  document.getElementById("content").innerHTML = `<object type="text/html" data="${id}.html" ></object>`;
}