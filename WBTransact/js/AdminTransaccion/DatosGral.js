var IdTipoTran = 0;

$(function () {
    $("#footerDatosGral").hide()
    SelectAreas()
    bootsValDatosGral()

});


function selectSatusTrana() {





}
//Funciones para crear Select

function SelectAreas() {
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/areasTransATT',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var areatransact = "";

            $.each(response, function (registro, row1) {


                areatransact += '<option value="0"> Seleccione un área </option>';
                $.each(row1.datAreasTransac, function (i1, r1) {

                    areatransact += '<option value="' + r1.idArea + '">' + r1.descripcion + '</option>';

                });


            });

            $("select#area").html(areatransact);


        },
        error: function (e) {
            console.log("Error en Áreas");

        }
    });
}
function SelectProcesos(idArea) {

    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/procesosTransATT',
        data: JSON.stringify({
            idArea: idArea
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var proctransact = "";

            $.each(response, function (registro, row1) {


                proctransact += '<option value="0" > Seleccione un proceso </option>';
                $.each(row1.CamposProcesosTran, function (i1, r1) {

                    proctransact += '<option value="' + r1.idProceso + '">' + r1.descripcion + '</option>';

                });


            });

            $("select#proceso").html(proctransact);


        },
        error: function (e) {
            console.log("Error en Procesos");

        }
    });
}
// Change de select
$("#area").change(function () {
    $('select#proceso').prop('disabled', false);
    SelectProcesos($('#area').val());
    
});
$("#area").change(function () {
    if ($("#proceso").val() != 0) {
        $("#proceso").val(0);
        $('#frmDatosGral').bootstrapValidator('destroy');
        bootsValDatosGral();
    }
    if ($("#proceso").val() == 0) {
        $("#proceso").val(0);
        $('#frmDatosGral').bootstrapValidator('destroy');
        bootsValDatosGral();
    }
})
//funcion botones
$('#btn_agregarTransaccion').click(function () {
    $(".btn_agregarTransaccion").prop("disabled", false)
    bootsValDatosGral();
    $('#frmDatosGral').data('bootstrapValidator').validate();
    var n = $('#frmDatosGral').data('bootstrapValidator').isValid();
    if (n) {

        $('input#nombre').prop('disabled', true);
        $('input#clave').prop('disabled', true);
        $('select#categoria').prop('disabled', true);
        $('select#area').prop('disabled', true);
        $('select#proceso').prop('disabled', true);

        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/InsertDatosGenerales',
            data: JSON.stringify({
                proceso: $('#proceso').val(),
                nombre1: $('#nombre').val(),
                clave: $('#clave').val(),
                categoria: $('#categoria').val()
            }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {

                $.each(response, function (ind, it) {

                    IdTipoTran = it;
                    //console.log(ind + "----------" + it);
                    idTransaccionGlobal = IdTipoTran;
                });

                if (IdTipoTran != 100001) {
                $.smallBox({
                    title: "Éxito!",
                    content: "Categoría <b>" + $("#nombre").val() + "</b> creada",
                    color: "#739e73",
                    timeout: 2000,
                    icon: "fa fa-thumbs-up swing animated"
                });

                $('#btn_agregarTransaccion').hide();
                $('#frmDatosGral').bootstrapValidator('destroy');

                $("#footerDatosGral").show();

                } else {


                    $.smallBox({
                        title: "Error",
                        content: "<i class='fa fa-clock-o'></i> <i>El nombre de la transacción ya existe</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });

                    $('#DatosGral').bootstrapValidator('destroy');
                    $('#btn_agregarTransaccion').prop('disabled', true);
                }
            }
        });


        

    } else {
        //bootsVal();
    }

});

$('#btnNextDatosGral').click(function () {
    $('#sectDatosGral').toggle("swing");
    $('#sectCamposDin').toggle("swing");

    //$("#btnNext1").hide();
    //$("#btnAtras1").hide();


})
$('#btnAtras2').click(function () {

    initDataTablePrincipal();
    $('#frmDatosGral').toggle("swing");
    $('#frmCamposDin').toggle("swing");

    //$("#btnNext1").hide();
    //$("#btnAtras1").hide();


})
//Validacion de formulario
function bootsValDatosGral() {
    $('#frmDatosGral').bootstrapValidator({
        live: 'enabled',
        submitButtons: 'button[id="btn_agregarTransaccion"]',
        message: 'Valor inválido',

        fields: {
            nombre: {
                selector: '#nombre',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: 'El nombre es obligatorio'
                    }
                }
            },
            clave: {
                selector: '#clave',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: 'La clave es obligatoria'
                    }
                }
            },

            area: {
                excluded: false,
                selector: '#area',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#area').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'El área es obligatoria'
                                };
                            } else {

                                return true;

                            }

                        }
                    }
                }
            },
            proceso: {
                excluded: false,
                selector: '#proceso',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#proceso').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'El proceso es obligatorio'
                                };
                            } else {

                                return true;

                            }

                        }
                    }
                }
            },
            categoria: {
                excluded: false,
                selector: '#categoria',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#categoria').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'La categoría es obligatoria'
                                };
                            } else {

                                return true;

                            }

                        }
                    }
                }
            }
        }

    });
}

