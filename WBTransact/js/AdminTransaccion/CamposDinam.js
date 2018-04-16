
$(function () {
    $("#btnNextCamposDin").hide()
    $("#DetalleCamposDin").hide()
    SelectNivel();
    SelectTipoDat();
    SelectOperacion();
    initDataTableCamposDin();
    bootsValCamposDin();
});

//Funciones para crear Select
function SelectNivel() {
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/nivelTransATT',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var nivtransact = "";
            $.each(response, function (registro, row1) {


                nivtransact += '<option value="0" > Seleccione un nivel </option>';
                $.each(row1.CamposNivelTransaccion, function (i1, r1) {
                    nivtransact += '<option value="' + r1.idNivel + '">' + r1.descripcion + '</option>';
                });


            });

            $("select#nivel").html(nivtransact);
            $("select#nivelD").html(nivtransact);
        },
        error: function (e) {
            console.log("Error en Nivel");

        }
    });
}
function SelectTipoDat() {
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/tipoDatosATT',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var tipoDatosCampo = "";
            $.each(response, function (registro, row1) {

                tipoDatosCampo += '<option value="0" > Seleccione un tipo de dato </option>';
                $.each(row1.camposTiposDatCampos, function (i1, r1) {

                    tipoDatosCampo += '<option value="' + r1.idTipoDatoCampo + '">' + r1.descripcion + '</option>';
                });


            });

            $("select#tipoDato").html(tipoDatosCampo);
            $("select#tipoDatoD").html(tipoDatosCampo);
        },
        error: function (e) {
            console.log("Error en TipoDatos");

        }
    });
}
function SelectOperacion() {
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/operacionTransATT',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var opetransact = "";
            $.each(response, function (registro, row1) {


                opetransact += '<option value="0"> Seleccione un tipo de operación </option>';
                $.each(row1.CamposOperaciones, function (i1, r1) {

                    opetransact += '<option value="' + r1.idTipoOperacion + '">' + r1.descripcion + '</option>';
                });


            });

            $("select#tipoOperacion").html(opetransact);
            $("select#tipoOperacionD").html(opetransact);
        },
        error: function (e) {
            console.log("Error en Operaciones");

        }
    });
}

// Change de select
$("#tipoDato").change(function () {
    var opcion = $("#tipoDato option:selected").html();

    if (opcion == "Date") {
        $('#longitud').prop("disabled", true);
        $('#longi').removeClass("has-error");

        $("#longi small").attr("data-bv-result", "VALID");
        $("#longi small").attr("style", "display: none;");
        $('#longi').addClass("has-success");

        $("#longi input").attr("data-bv-excluded", 'true');

        $("#longitud").val(10).trigger('change');

    } else if (opcion == "DateTime") {
        $('#longitud').prop("disabled", true);
        $('#longi').removeClass("has-error");

        $("#longi small").attr("data-bv-result", "VALID");
        $("#longi small").attr("style", "display: none;");
        $('#longi').addClass("has-success");

        $("#longi input").attr("data-bv-excluded", 'true');
        $("#longitud").val(16).trigger('change');

    } else if (opcion == "Boleano") {
        $('#longitud').prop("disabled", true);
        $('#longi').removeClass("has-error");

        $("#longi small").attr("data-bv-result", "VALID");
        $("#longi small").attr("style", "display: none;");
        $('#longi').addClass("has-success");

        $("#longi input").attr("data-bv-excluded", 'true');
        $("#longitud").val(1).trigger('change');

    } else if ($("#longitud").val() == '' && opcion != "DateTime" && opcion != "Date" && opcion != "Boleano") {
        $("#longitud").val('').trigger('change');
        $('#longitud').prop("disabled", false);
        $('#longi').removeClass("has-success");

    } else {
        $('#longi').removeClass("has-success");

        $("#longitud").val('').trigger('change');

        $('#longitud').prop("disabled", false);


    }
})



//
$('#btn_agregar').click(function () {

    $("#btn_agregar").prop('disabled', true);
   

    var resulInsert = 0;

    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/InsertCampos',
        data: JSON.stringify({
            idTipoTran: IdTipoTran,
            idNivel: $('#nivel').val(),
            nombreCampo: $('#nombreCampo').val(),
            descripcion: $('#descCampo').val(),
            idTipoDatoCampo: $('#tipoDato').val(),
            idTipoOperacion: $('#tipoOperacion').val(),
            longitudCampo: $('#longitud').val()
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {

            $.each(response, function (ind, it) {
                console.log(it)
                resulInsert = it;
            });

            if (resulInsert === 1) {
                $.smallBox({
                    title: "Éxito!",
                    content: "Campo <b>" + $('#nombreCampo').val() + "</b> agregado",
                    color: "#739e73",
                    timeout: 2000,
                    icon: "fa fa-thumbs-up swing animated"
                });

                $('#frmCamposDin').bootstrapValidator('destroy');
                $('#frmCamposDin')[0].reset();

                initDataTableCamposDin();
                $("#DetalleCamposDin").show()
                bootsValCamposDin();
                $("#btn_agregar").prop('disabled', false);
                $("#btnNextCamposDin").show()

            } else if (resulInsert === 100001) {
            
                $.smallBox({
                    title: "Error",
                    content: "<i class='fa fa-clock-o'></i> <i>El campo <b>" + $('#nombreCampo').val() + " ya existe</i>",
                    color: "#C46A69",
                    iconSmall: "fa fa-times fa-2x fadeInRight animated",
                    timeout: 2000
                });
                $("#btn_agregar").prop('disabled', false);
            }
        }
    });

});

$('#btnNextCamposDin').click(function () {
    $('#sectCamposDin').toggle("swing");
    $('#sectEtapAcci').toggle("swing");
    bootsValEtapasAcciones();
});

$('#btnBackCamposDin').click(function () {
    $('#sectDatosGral').toggle("swing");
    $('#sectCamposDin').toggle("swing");
});




function initDataTableCamposDin() {
    $.fn.dataTable.ext.errMode = 'none';
    var responsiveHelper_datatable_fixed_column = undefined;
    var breakpointDefinition = {
        tablet: 1024,
        phone: 480,
        desktop: 1260
    };
    var datos = [];
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/DTCamposWS',
        data: JSON.stringify({
            idTipoTransaccion: IdTipoTran
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $('#loadingMod').modal({
                backdrop: 'static',
                keyboard: false
            });
        },
        success: function (response) {
            $('#loadingMod').modal('hide');
            $.each(response, function (row, index) {
                $.each(index.ListCamposTransaccion, function (r, arr) {

                    datos.push([arr.nombreCampo, arr.descCampo, arr.TipoDato, arr.longitud, arr.Nivel, arr.Operacion, arr.idTipoDato, arr.idNivel, arr.idOperacion, arr.idCampo]);
                });
            });
        }

    });

    otable = $('#tablaComplementarios')
        .DataTable({

            "aLengthMenu": [
                [5, 10, 25, 50],
                [5, 10, 25, 50]
            ],
            "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6 hidden-xs'l><'col-sm-6 col-xs-12 hidden-xs'<'toolbar'>>r>" +
            "t" +
            "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
            "oLanguage": {
                "sUrl": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
            },

            "autoWidth": true,
            "preDrawCallback": function () {
                if (!responsiveHelper_datatable_fixed_column) {
                    responsiveHelper_datatable_fixed_column = new ResponsiveDatatablesHelper(
                        $('#tablaComplementarios'), breakpointDefinition);
                }
            },
            "rowCallback": function (nRow) {
                responsiveHelper_datatable_fixed_column
                    .createExpandIcon(nRow);
            },
            "drawCallback": function (oSettings) {
                responsiveHelper_datatable_fixed_column.respond();
            },
            data: datos,
            columns: [{
                title: "Nombre del campo"
            },
            {
                title: "Descripción"
            },
            {
                title: "Tipo de dato"
            },
            {
                title: "Longitud"
            },
            {
                title: "Nivel"
            },
            {
                title: "Tipo de operación"
            },
            {
                title: "idTipoDato",
                visible: false
            },
            {
                title: "idNivel",
                visible: false
            },
            {
                title: "idOperacion",
                visible: false
            },
            {
                title: "idCampo",
                visible: false
            }
            ]
        });

    // Evento creado para realizar la búsqueda cuando se presione la tecla ENTER
    $("#tablaComplementarios thead th input[type=text]").on(
        'keyup',
        function (e) {
            otable.column($(this).parent().index() + ':visible').search(
                this.value).draw();
        });

    // Método creado para agregar el evento de selección de una fila
    $('#tablaComplementarios tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $('#tablaComplementarios').DataTable().$('tr.selected').removeClass(
                    'selected');
                $(this).addClass('selected');
            }
        });
    // Evento creado para abrir la ventana de editar al dar doble click sobre un
    // registro
    $('#tablaComplementarios tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        

    });
}

//Validacion de formulario
function bootsValCamposDin() {
    $('#frmCamposDin').bootstrapValidator({
        live: 'enabled',
        submitButtons: 'button[id="btn_agregar"]',
        feedbackIcons: {
            //valid: 'glyphicon glyphicon-ok',
            //invalid: 'glyphicon glyphicon-remove',
            //validating: 'glyphicon glyphicon-refresh'
        },
        //valid: 'glyphicon glyphicon-ok',
        //invalid: 'glyphicon glyphicon-remove',
        //validating: 'glyphicon glyphicon-refresh',
        fields: {

            nombreCampo: {
                selector: '#nombreCampo',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: 'El nombre del campo es obligatorio'
                    }
                }
            },
            descCampo: {
                selector: '#descCampo',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: 'La descripción es obligatoria'
                    }

                }
            },
            longitud: {
                selector: '#longitud',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: 'La longitud es obligatoria'
                    }
                }
            },


            tipoDato: {
                selector: '#tipoDato',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#tipoDato').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'El tipo de dato es obligatorio'
                                };
                            } else {

                                return true;

                            }

                        }
                    }
                }
            },
            nivel: {
                excluded: false,
                selector: '#nivel',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#nivel').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'El nivel es obligatorio'
                                };
                            } else {

                                return true;

                            }

                        }
                    }
                }
            },
            tipoOperacion: {
                excluded: false,
                selector: '#tipoOperacion',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#tipoOperacion').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'La operación es obligatoria'
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