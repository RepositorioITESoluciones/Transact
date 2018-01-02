
var pepe;
function ini() {
    pepe = setTimeout('location="Login.html"', 1200000); // 5 segundos
}
function parar() {
    clearTimeout(pepe);
    pepe = setTimeout('location="Login.html"', 1200000); // 5 segundos
}


//function expulsar() {
//    window.location = ("Login.html");
//}
//function getCookie(cname) {
//    var name = cname + "=";
//    var decodedCookie = decodeURIComponent(document.cookie);
//    var ca = decodedCookie.split(';');
//    for (var i = 0; i < ca.length; i++) {
//        var c = ca[i];
//        while (c.charAt(0) == ' ') {
//            c = c.substring(1);
//        }
//        if (c.indexOf(name) == 0) {
//            return c.substring(name.length, c.length);
//        }
//    }
//    return "";
//}
//function deleteAllCookies() {
//    var cookies = document.cookie.split(";");

//    var tiempo = new Date();
//    var fecha = new Date();

//    var hora = tiempo.getHours();
//    var minuto = tiempo.getMinutes();
//    var segundo = tiempo.getSeconds();

//    var dia = fecha.getDate();
//    var mes = fecha.getMonth();
//    var año = fecha.getFullYear();

//    for (var i = 0; i < cookies.length; i++) {
//        var cookie = cookies[i];
//        var eqPos = cookie.indexOf("=");
//        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

//        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//    }
//    window.location = ("Login.html");
//    console.log("Session eliminada");
//}
/**
 * Función que muestra el mensaje de color azul
 * @param titulo
 * @param mensaje
 * @returns
 */
function showOkMessage(titulo, mensaje) {
    $.smallBox({
        title: titulo,
        content: mensaje,
        color: "#296191",
        timeout: 4000,
        icon: "fa fa-thumbs-o-up swing animated"
    });
}

/**
 * Función que muestra el mensaje de color rojo
 * @param titulo
 * @param mensaje
 * @returns
 */
function showErrorMessage(titulo, mensaje) {
    $.smallBox({
        title: titulo,
        content: mensaje,
        color: "#c79121",
        timeout: 4000,
        icon: "fa fa-times-circle swing animated"
    });
}

/**
 * Función que muestra el mensaje de color amarillo
 * @param titulo
 * @param mensaje
 * @returns
 */
function showWarningMessage(titulo, mensaje) {
    $.smallBox({
        title: titulo,
        content: mensaje,
        color: "#C79121",
        timeout: 4000,
        icon: "fa fa-exclamation-circle swing animated"
    });
}

//Función que valida caracteres especiales en formularios
function validarCaracteresN(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[0-9A-Za-záÁéÉíÍóÓúÚñÑ\s\t\-\_]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}



