$(function () {
    initLogin();
    console.log("Inicia");
});
function initLogin() {
    bootsVal();

    $('#btnLogin').click(function () {
        bootsVal();
        $('#form_login').data('bootstrapValidator').validate();
        var n = $('#form_login').data('bootstrapValidator').isValid();
        if (n) {
            var user = $('#user').val();
            var password = $('#password').val();
            $('#loadingMod').modal({
                backdrop: 'static',
                keyboard: false
            });
            window.setTimeout(AccederLogin, 800);

        } else {
            bootsVal();

        }



    })
}
function AccederLogin() {
    var user = $('#user').val();
    var passwords = $('#password').val();
    var idUsuario = '';
    var nombre = '';
    var apellidoP = '';
    var apellidoM = '';
    var activio = "";
    $.ajax({
        async: false,
        type: "POST",
        url: 'MyWebService.asmx/Login',
        data: JSON.stringify({ Usuario: user, contraseña: passwords }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $('#loadingMod').modal({
                backdrop: 'static',
                keyboard: false
            });
        },
        success: function (data) {

            $('#loadingMod').modal('hide');
            $.each(data, function (j, val) {
                if (val != null) {

                    idUsuario = val.idPersonal
                    nombre = val.nombre;
                    nombreRol = val.nombreRol;
                    apellidoM = val.apMaterno;
                    apellidoP = val.apPaterno;
                    activo = val.activo;

                    
                    setCookie("IdUsuario", idUsuario, 30);
                    setCookie("Nombre", nombre, 30);
                    setCookie("ApellidoP", apellidoM, 30);
                    setCookie("ApellidoM", apellidoP, 30);
                    setCookie("Rol", nombreRol, 50);

                    window.location = ("Index.html#welcome.html");

                } else {
                    $.smallBox({
                        title: 'Acceso denegado',
                        content: 'Usuario o contraseña incorrectos',
                        color: "#C79121",
                        timeout: 4000,
                        icon: "fa fa-thumbs-o-down swing animated"
                    });
                }

            });

        }
    })
}

function bootsVal() {
    $('#form_login').bootstrapValidator({
        framework: 'bootstrap',
        submitButtons: 'button[id="btnLogin"]',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            user: {
                validators: {
                    notEmpty: {
                        message: 'El usuario es obligatorio'
                    }
                }
            },
            password: {
                selector: '#password',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator, $field) {

                            var valor = $("#password").val();
                            console.log("TP" + valor);
                            $("#password").css('border-color', '#BDBDBD');
                            if (valor == "" || valor == null) {
                                console.log("TPddd" + valor);
                                $("#password").css('border-color', '#b94a48');
                                return {
                                    valid: false,
                                    message: 'La contraseña es obligatoria'
                                };
                            } else {

                                return true;

                            }
                        }
                    }
                }
            },


        }

    });
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}