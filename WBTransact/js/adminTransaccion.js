var acciones = '';
var idTransaccionGlobal = 0;
var botonRnC = 0;
var etapas = '';
var campos = '';
var ArregloValidarAcciones = [];
var ArregloValidarAccionesEdit = [];
var arrayAux = new Array();
var accionesEtapas = '';
var formulaA = '';
var IdTipoTran = 0;
var roooll = [];
var check = 0;
var table;
var tabless;
var tables;
var tablesAuto;
var tabl1;
var otable1;
var otable2;
var otableF;
var otableRA;
var step1 = 0;
var step2 = 0;
var step3 = 0;
var step4 = 0;
var step5 = 0;
var step6 = 0;
var step7 = 0;
var step8 = 0;
var idCampoDato = [];
var idCampoDatoInsert = [];
var idCampoTrigger = [];
var nombreCampoD = [];
var nombreCampoDi = [];
var disable = 0;
var datosF = [];
var formulaArr = [];
var etapaArr = [];
var etapaFuturaArr = [];
var accionesArr = [];
var arrayRol = [];
var x = 1;
var idEtapa = 0;
var idCampoF = 0;
var idAccion = 0;
var idEtapaA = 0;
var idCampoFA = 0;
var idAccionA = 0;
var idFormulas = 0;
var idCatalogo = [];
var idTipoTransaccion = [];
var idReferencia = [];
var nombreReferencia = [];
var editCombo = 0;
var finalizado = '';
var stepUpdate = '';
var otable;
var filaGuardada;
var validacionDelete;
var validacionDeleteF;
var valorBtnEtp = 0;
var valorselectEtp = 0;
var arrayOperaciones = new Array("+", "-", "*", "/", "=", "(", ")", "%", ".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "{", "}", ";", "&", "|", "=", "(", ")", "<", ">", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s","t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S","T", "U", "V", "W", "X", "Y", "Z");

//Funcion que se inicializan al cargarse el html
$(function () {
    $("#SelEstatus").hide();

    initEventos();
    pageSetUp();
    ocultarDOM();
    Listas();
    Perfiles();
    AgregarFormula();
    AgregarReglaAccion();
    Seleccion();
    SelectCatTT();
    SelectTipoDatTT();
    SelectNivelTT();
    SelectOperacionTT();
    SelectRolesTT();
    SelectAreasTT();
    AreaProceso();
    iniciarWizard();
    bootsVal();
    initDataTable();
    SelectVisualizacion();
    SelectEtapas();

});
//Funcion para la inicializar el Wizard
function iniciarWizard() {
    $('#smartWizard').on('changed.fu.wizard', function (evt, data) {
        $('#smartWizard').find('ul.steps li').toggleClass('complete', false);
    });

    if (document.getElementById("tablaComplementarios").rows.length != 1) {
        $(".btn-next").prop("disabled", false);
    }

    $('#smartWizard').on('actionclicked.fu.wizard', function (e, data) {

        console.log(data);

        if (data.step === 2 && data.direction === 'next' && document.getElementById("tablaRoles").rows.length != 1) {
            $(".btn-next").prop("disabled", false);

        }
        if (data.step === 4 && data.direction === 'next') {
            $(".btn-next").prop("disabled", true);
        } else {
            $(".btn-next").prop("disabled", false);
        }

        if (data.step === 1 && data.direction === 'next') {

            if (otable1) {
                $(".btn-next").prop("disabled", false);
            } else {
                $(".btn-next").prop("disabled", true);
            }

            if (document.getElementById("tablaComplementarios").rows.length < 1) {
                $(".btn-next").prop("disabled", true);
            } else {
                $(".btn-next").prop("disabled", false);

            }

            $('#form_ciclo').bootstrapValidator('destroy');
            $('#form_acciones').bootstrapValidator('destroy');

            $('#CamposComp').show();


            $('#tipoDato').val(0).trigger('change');
            $('#nivel').val(0).trigger('change');
            $('#tipoOperacion').val(0).trigger('change');
            $('#form_campos').bootstrapValidator('destroy');

            step1 = 2;
            if (finalizado == 'Finalizado') {
                $(".btn-next").prop("disabled", false);

                $.ajax({
                    type: 'POST',
                    url: 'MyWebService.asmx/UpdateStatusWS',
                    data: {
                        IdTipoTransaccion: IdTipoTran,
                        estatus: 9
                    },
                    success: function (response) { }
                });
            } else {
                if (step1 >= step2 && step3 <= step1 && step1 >= step4 && step5 <= step1 && step1 >= step7 && step6 <= step1 && step1 >= step8) {
                    console.log("Actualiza a estep --- " + step1);
                    $.ajax({
                        type: 'POST',
                        url: 'MyWebService.asmx/UpdateStatusWS',
                        data: {
                            IdTipoTransaccion: IdTipoTran,
                            estatus: step1
                        },
                        success: function (response) { }
                    });
                }
            }
        }
        if (data.step === 2 && data.direction === 'next') {
            step2 = 3;

            if (finalizado == 'Finalizado') {
                $.ajax({
                    type: 'POST',
                    url: 'MyWebService.asmx/UpdateStatusWS',
                    data: {
                        IdTipoTransaccion: IdTipoTran,
                        estatus: 9
                    },
                    success: function (response) { }
                });
                $(".btn-next").prop("disabled", false);

            } else if (step2 >= step1 && step3 <= step2 && step2 >= step4 && step5 <= step2 && step2 >= step7 && step6 <= step2 && step2 >= step8) {
                console.log("Actualiza a estep --- " + step2);

                $.ajax({
                    type: 'POST',
                    url: 'MyWebService.asmx/UpdateStatusWS',
                    data: {
                        IdTipoTransaccion: IdTipoTran,
                        estatus: step2
                    },
                    success: function (response) { }
                });
            }

            if (otable2) {
                $(".btn-next").prop("disabled", false);
            }
            if (document.getElementById("tablaEtapas").rows.length < 1) {
                $(".btn-next").prop("disabled", true);
            } else {
                $(".btn-next").prop("disabled", false);

            }

            selectEtapasStep3();
            SelectCampoInit();
            $.ajax({
                type: 'POST',
                url: 'MyWebService.asmx/DTCabezeraNS',
                data: JSON.stringify({
                    idTipoTransaccion: IdTipoTran
                }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',

                success: function (response) {
                    $('#formulaCabecera').empty();
                    $.each(response, function (row, index) {
                        $.each(index.ListCamposTransaccion, function (r, arr) {
                            $('#cabecera').append('<li class="list-group-item-A">' + arr.nombreCampo + '</li>');
                            $('#formulaCabecera').append('<li class="ui-state-highlight draggable">' + arr.nombreCampo + '</li>');
                            $('#cabecera_rn').append('<li class="ui-widget-content">' + arr.nombreCampo + '</li>');
                            $('#RN_Cabecera').append('<li><label class="radio"><input type="radio" name="radio" value=' + arr.nombreCampo + '><i></i>' + arr.nombreCampo + '</label></li>');


                        });
                    });
                }

            });
            $.ajax({
                type: 'POST',
                url: 'MyWebService.asmx/DTDetalleNS',
                data: JSON.stringify({
                    idTipoTransaccion: IdTipoTran
                }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',

                success: function (response) {
                    $('#formulaDetalle').empty();
                    $.each(response, function (row, index) {
                        $.each(index.ListCamposTransaccion, function (r, arr) {
                            $('#detalle').append('<li class="list-group-item-A">' + arr.nombreCampo + '</li>');
                            $('#formulaDetalle').append('<li class="ui-state-highlight draggable">' + arr.nombreCampo + '</li>');
                            $('#detalle_rn').append('<li class="ui-widget-content">' + arr.nombreCampo + '</li>');
                            $('#RN_Detalle').append('<li><label class="radio"><input type="radio" name="radio" value=' + arr.nombreCampo + '><i></i>' + $('input#nombreCampo').val() + '</label></li>');


                        });
                    });
                }

            });



        }
        if (data.step === 3 && data.direction === 'next') {
            step3 = 4;
            var valorOption;
            if (finalizado == 'Finalizado') {
                $.ajax({
                    type: 'POST',
                    url: 'MyWebService.asmx/UpdateStatusWS',
                    data: {
                        IdTipoTransaccion: IdTipoTran,
                        estatus: 9
                    },
                    success: function (response) { }
                });
                $(".btn-next").prop("disabled", false);

            } else if (step3 >= step2 && step1 <= step3 && step3 >= step4 && step5 <= step3 && step3 >= step7 && step6 <= step3 && step3 >= step8) {
                console.log("Actualiza a estep --- " + step3);

                $.ajax({
                    type: 'POST',
                    url: 'MyWebService.asmx/UpdateStatusWS',
                    data: {
                        IdTipoTransaccion: IdTipoTran,
                        estatus: step3
                    },
                    success: function (response) { }
                });
                $(".btn-next").prop("disabled", true);

            }
            SelectVisualizacion();
            $("#rn2_etapa option").each(function () {
                valorOption = $(this).text();

            });
            console.log("valor:" + valorOption);
            if (valorOption == ' Seleccione una etapa ' || valorBtnEtp == 1) {
                valorselectEtp = $('#rn2_etapa').val();

                SelectEtapas();
                $("#rn2_etapa").val(valorselectEtp);
            }

            $("#rn2_accion").change(function () {

                InitDataTableRegaCampo();

                $("body").on("click", "#todosVisible", function () {
                    $("body").on("change", "#todosVisible", function () {
                        $("[name='Visible']").prop('checked', $(this).prop("checked"));
                    });


                });
                $("body").on("click", "#todosEditable", function () {
                    $("body").on("change", "#todosEditable", function () {
                        $("[name='Editable']").prop('checked', $(this).prop("checked"));
                    });


                });
                $("body").on("click", "#todosObligatorio", function () {
                    $("body").on("change", "#todosObligatorio", function () {
                        $("[name='Obligatorio']").prop('checked', $(this).prop("checked"));
                    });


                });
            });

            if ($('#rn2_etapa').val() !== 0 && $('#rn2_accion').val() !== 0) {
                $(".btn-next").prop("disabled", false);
                console.log($('#rn2_etapa').val(), $('#rn2_accion').val());
            } else {

                $(".btn-next").prop("disabled", true);
            }

        }
        if (data.step === 4 && data.direction === 'next') {

            var valores = "";
            for (var i = 1; i < x; i++) {
                SelectCatTTS(i);

            }


            step4 = 5;
            if (finalizado == 'Finalizado') {
                $.ajax({
                    type: 'POST',
                    url: 'MyWebService.asmx/UpdateStatusWS',
                    data: {
                        IdTipoTransaccion: IdTipoTran,
                        estatus: 9
                    },
                    success: function (response) { }
                });
                $(".btn-next").prop("disabled", false);

            } else if (step4 >= step2 && step3 <= step4 && step4 >= step1 && step5 <= step4 && step4 >= step7 && step6 <= step4 && step4 >= step8) {
                console.log("Actualiza a estep --- " + step4);

                $.ajax({
                    type: 'POST',
                    url: 'MyWebService.asmx/UpdateStatusWS',
                    data: {
                        IdTipoTransaccion: IdTipoTran,
                        estatus: step4
                    },
                    success: function (response) { }
                });
            }

            $.each($('#examples td'), function (index1, item1) {
                valores = $(item1).text();
                //console.log(" Valores " + $(item1).text());
            });

            if (valores == 'Ningún dato disponible en esta tabla') {
                $(".btn-next").prop("disabled", false);

            }


        }
        if (data.step === 5 && data.direction === 'next') {
            step5 = 6;
            selectCombobox();
            InitDataTableAutocomplete();

            var valores = "";
            for (var j = 1; j < x; j++) {
                SelectCatTTSAuto(j);

            }

            $.each($('#DTAutocompletar td'), function (index1, item1) {
                valores = $(item1).text();
                //console.log(" Valores " + $(item1).text());
            });

            if (valores == 'Ningún dato disponible en esta tabla') {
                $(".btn-next").prop("disabled", false);


            }


            if (finalizado == 'Finalizado') {
                $.ajax({
                    type: 'POST',
                    url: 'MyWebService.asmx/UpdateStatusWS',
                    data: {
                        IdTipoTransaccion: IdTipoTran,
                        estatus: 9
                    },
                    success: function (response) { }
                });
                $(".btn-next").prop("disabled", false);

            } else if (step5 >= step2 && step3 <= step5 && step5 >= step4 && step1 <= step5 && step5 >= step7 && step6 <= step5 && step5 >= step8) {
                $.ajax({
                    type: 'POST',
                    url: 'MyWebService.asmx/UpdateStatusWS',
                    data: {
                        IdTipoTransaccion: IdTipoTran,
                        estatus: step5
                    },
                    success: function (response) { }
                });
                console.log("Actualiza a estep --- " + step5);

            }

        }
        if (data.step === 6 && data.direction === 'next') {
            step6 = 7;
            if (finalizado == 'Finalizado') {
                $.ajax({
                    type: 'POST',
                    url: 'MyWebService.asmx/UpdateStatusWS',
                    data: {
                        IdTipoTransaccion: IdTipoTran,
                        estatus: 9
                    },
                    success: function (response) { }
                });
                $(".btn-next").prop("disabled", false);

            } else if (step6 >= step2 && step3 <= step6 && step6 >= step4 && step1 <= step6 && step6 >= step5 && step7 <= step6 && step6 >= step8) {
                $.ajax({
                    type: 'POST',
                    url: 'MyWebService.asmx/UpdateStatusWS',
                    data: {
                        IdTipoTransaccion: IdTipoTran,
                        estatus: step6
                    },
                    success: function (response) { }
                });
                console.log("Actualiza a estep --- " + step6);

            }
            $.ajax({
                type: 'POST',
                url: 'MyWebService.asmx/UpdateStatusWS',
                data: {
                    IdTipoTransaccion: IdTipoTran,
                    estatus: step6
                },
                success: function (response) { }
            });
            console.log("Actualiza a estep --- " + step6);

            $(".sortable").sortable({
                stop: function (event, ui) {
                    ui.item.addClass('dropped');
                }

            });
            $(".draggable").draggable({
                connectToSortable: ".sortable",
                helper: "clone",
                revert: 'invalid'
            });
            $('.trash').droppable({
                drop: function (event, ui) {
                    if (!ui.draggable.hasClass('dropped')) return false;
                    ui.draggable.remove();
                }
            });

        }
        if (data.step === 7 && data.direction === 'next') {
            step7 = 8;
            if (finalizado == 'Finalizado') {
                $.ajax({
                    type: 'POST',
                    url: 'MyWebService.asmx/UpdateStatusWS',
                    data: {
                        IdTipoTransaccion: IdTipoTran,
                        estatus: 9
                    },
                    success: function (response) { }
                });
                $(".btn-next").prop("disabled", false);

            } else if (step7 >= step2 && step3 <= step7 && step7 >= step4 && step1 <= step7 && step7 >= step5 && step6 <= step7 && step7 >= step8) {
                $.ajax({
                    type: 'POST',
                    url: 'MyWebService.asmx/UpdateStatusWS',
                    data: {
                        IdTipoTransaccion: IdTipoTran,
                        estatus: step7
                    },
                    success: function (response) { }
                });
                console.log("Actualiza a estep --- " + step6);

            }
            InitEditstep6();
        }
        if (data.step === 8 && data.direction === 'next') {
            step8 = 9;
            if (finalizado == 'Finalizado') {
                $.ajax({
                    type: 'POST',
                    url: 'MyWebService.asmx/UpdateStatusWS',
                    data: {
                        IdTipoTransaccion: IdTipoTran,
                        estatus: 9
                    },
                    success: function (response) { }
                });
                $(".btn-next").prop("disabled", false);

            } else if (step8 >= step2 && step3 <= step8 && step8 >= step4 && step1 <= step8 && step8 >= step5 && step6 <= step8 && step8 >= step7) {
                $.ajax({
                    type: 'POST',
                    url: 'MyWebService.asmx/UpdateStatusWS',
                    data: {
                        IdTipoTransaccion: IdTipoTran,
                        estatus: step8
                    },
                    success: function (response) {
                        console.log("Step " + step5);
                    }
                });
            }

        }

        if (data.step === 2 && data.direction === 'previous') {
            $('#form_campos').bootstrapValidator('destroy');
            $(".btn-next").prop("disabled", false);
        }
        if (data.step === 3 && data.direction === 'previous') {
            $('#form_ciclo').bootstrapValidator('destroy');
            $('#form_acciones').bootstrapValidator('destroy');
            $(".btn-next").prop("disabled", false);

            $('#tipoDato').val(0).trigger('change');
            $('#nivel').val(0).trigger('change');
            $('#tipoOperacion').val(0).trigger('change');
            $('#form_campos').bootstrapValidator('destroy');
            //$('#tipoDato').change();
            //$('#nivel').change();
            //$('#tipoOperacion').change();
        }
        if (data.step === 4 && data.direction === 'previous') {
            console.log("Salio step 4");
            $(".btn-next").prop("disabled", false);

        }
        if (data.step === 5 && data.direction === 'previous') {
            $('#form_reglas').bootstrapValidator('destroy');
            console.log("Salio step 4");
            $(".btn-next").prop("disabled", false);

            $("body").on("click", "#todosVisible", function () {
                $("body").on("change", "#todosVisible", function () {
                    $("[name='Visible']").prop('checked', $(this).prop("checked"));
                });


            });
            $("body").on("click", "#todosEditable", function () {
                $("body").on("change", "#todosEditable", function () {
                    $("[name='Editable']").prop('checked', $(this).prop("checked"));
                });


            });
            $("body").on("click", "#todosObligatorio", function () {
                $("body").on("change", "#todosObligatorio", function () {
                    $("[name='Obligatorio']").prop('checked', $(this).prop("checked"));
                });


            });
        }
        if (data.step === 7 && data.direction === 'previous') {
            $('#form_Combo').bootstrapValidator('destroy');
            $(".btn-next").prop("disabled", false);
        }
        if (data.step === 8 && data.direction === 'previous') {
            $(".btn-next").prop("disabled", false);

        }




    });

    $('#smartWizard').on('finished.fu.wizard', function (evt, data) {
        $('#divTiposTransaccion').show();

        $('#divCrearTransaccion').hide();

        $.ajax({
            type: 'POST',
            url: 'MyWebService.asmx/UpdateStatusWS',
            data: {
                IdTipoTransaccion: IdTipoTran,
                estatus: 9
            },
            success: function (response) { }
        });


        Reset();
        ResetPlus();
        $('#form_campos').bootstrapValidator('destroy');
        $('#form_ciclo').bootstrapValidator('destroy');
        $('#form_acciones').bootstrapValidator('destroy');
        $('#form_RN2').bootstrapValidator('destroy');
        $('#form_Autocompletar').bootstrapValidator('destroy');
        $('#RN_Accion').bootstrapValidator('destroy');
        $('#form_Combo').bootstrapValidator('destroy');
        $('#form_reglas').bootstrapValidator('destroy');
        $('#form_transaccion').bootstrapValidator('destroy');

        $('#tabla_Comp').hide();
        $('#TDEtapas').hide();
        $('#Tabla_Rol').hide();
        $('#Tabla_formula').hide();
        $('#reglaPorAccion').hide();
        $('.trnc').hide();
        $('#btn_agregarRN2').hide();
        $('#examples').hide();

        $('#btn_agregarCombo').hide();


        $('#DTAutocompletar').hide();
        $('#btn_agregarAutocompletar').hide();

        var datosTabla = [];
        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/LlenaTipoTransaccion',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {

                $.each(response, function (row, index) {
                    $.each(index.ListaTipoTran, function (r, arr) {
                        datosTabla.push([arr.nombre, arr.clave, arr.categoria, arr.estatus, arr.fecha, arr.idTipoTransaccion, arr.area, arr.proceso, arr.idCategoria])

                            ;
                    });
                });

            }

        });

        otable.clear();
        otable.rows.add(datosTabla);
        otable.draw();
    });

}
//Función para ocultar algunos elementos del DOM
function ocultarDOM() {

    $('#CamposComp').hide();
    $('#tablaComplementarios').hide();
    $('#listas').hide();
    $('#tablaEtapas').hide();
    $('#tablaRoles').hide();
    $('#BotonesRol').hide();

    $(".btn-next").prop("disabled", true);
    $('select#proceso').prop('disabled', true);
    $('#tablaEtapasAcciones').hide();
    $('#RN_CamposConfiguracion2').hide();
}
//Función que valida el ingreso de caracteres numéricos
function validarNumeros(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);

    if (tecla === 8) return true;
    patron = /[0-9\t]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);

}
//Función para agregar un valor nuevo a la tabla de transacciones
function AgregarCampos() {

    //var combo = document.getElementById('tipoDato');
    //var dat = combo.options[combo.selectedIndex].value();

    //var combo1 = document.getElementById('nivel');
    //var niv = combo1.options[combo1.selectedIndex].value();

    //var combo2 = document.getElementById('tipoOperacion');
    //var ope = combo2.options[combo2.selectedIndex].value();

    var campos = [];
    campos[0] = $('input#nombreCampo').val();
    campos[1] = $('input#descCampo').val();
    campos[2] = $('select#tipoDato').val();
    campos[3] = $('input#longitud').val();
    campos[4] = $('select#nivel').val();
    campos[5] = $('select#tipoOperacion').val();

    var campos2 = [];
    campos2[0] = $('input#nombreCampo').val();
    campos2[1] = $('input#descCampo').val();
    campos2[2] = $('select#tipoDato option:selected').text();
    campos2[3] = $('input#longitud').val();
    campos2[4] = $('select#nivel option:selected').text();
    campos2[5] = $('select#tipoOperacion option:selected').text();


    $('#tablaComplementarios').show();
    $('#cabecera').show();
    $('#detalle').show();
    $('#listas').show();

    /*Crear Tabla CamposComplementarios*/

    /*Crear Tabla RN_CamposConfiguracion*/

    /*Crear Listas para cabeceras y detalles*/
    if ($('select#nivel option:selected').val() == 1) {


    } else {

    }

    $(".btn-next").prop("disabled", false);

    /*Configuración de los elementos necesarios para crear las fórmulas*/


    /*Necesario para que las listas se pueden seleccionar y anular la selección*/
    $("ul, li").disableSelection();

    /*Funciones que agregan Datos a la confuguración de las reglas de Negocio*/
    $("input[name=radio]").click(function () {
        $('#campoSeleccionado').val($("input[name=radio]:checked").val());
        $('#campoSeleccionado').css({
            'color': 'cadetblue',
            'font-weight': 'bold'
        });
    });

    $("#RN_Cabecera input[name=radio]").click(function () {
        $('#CabeceraDetalle').val('Cabecera');
        $('#CabeceraDetalle').css({
            'color': 'cadetblue',
            'font-weight': 'bold'
        });
    });

    $("#RN_Detalle input[name=radio]").click(function () {
        $('#CabeceraDetalle').val('Detalle');
        $('#CabeceraDetalle').css({
            'color': 'cadetblue',
            'font-weight': 'bold'
        });
    });


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
            $.smallBox({
                title: "Éxito!",
                content: "Campo <b>" + campos2[0] + "</b> agregado",
                color: "#739e73",
                timeout: 2000,
                icon: "fa fa-thumbs-up swing animated"
            });
        }
    });
    check++;

}
/*Función que crea las listas para los campos de Cabecera y Detalle de la primera parte de Wizard*/
function Listas() {
    $('body').on('click', '.list-group-A .list-group-item-A', function () {
        $(this).toggleClass('active');
    });

    $('.list-arrows-A button').click(function () {
        var $button = $(this),
            actives = '';
        if ($button.hasClass('move-left-A')) {
            actives = $('.list-right-A ul li.active');
            actives.clone().appendTo('.list-left-A ul');
            actives.remove();
            $('.list-group-item-A').removeClass('active');

        } else if ($button.hasClass('move-right-A')) {
            actives = $('.list-left-A ul li.active');
            actives.clone().appendTo('.list-right-A ul');
            actives.remove();

            $('.list-group-item-A').removeClass('active');
        }

    });
}
//Función para agregar un valor nuevo al DataTable de etapas y a la bd
function AgregarEtapa() {

    var val = [];
    var nombre = [];
    var con = 0;

    var jsonInsert = '';
    var union = '[{';
    var unionN = '';
    var tamaño = 0;


    var etapas = [];
    etapas[0] = $('input#nombreEtapa').val();
    etapas[1] = $('input#orden').val();

    $('#tablaEtapas').show();




    //$('select#formula_etapa').append('<option value="' + etapas[0] + '">' + etapas[0] + '</option>');
    //$('select#rn_etapa').append('<option value="' + etapas[0] + '">' + etapas[0] + '</option>');
    //$('select#rn2_etapa').append('<option value="' + etapas[0] + '">' + etapas[0] + '</option>');
    $.each($('#tablaEtapas th'), function (index, item) {


        nombre.push($(item).text());

        //console.log($(item).text());

        //jsonInsert += '';
        ////console.log($(item).text());
        //jsonInsert += "},";
    });

    $.each($('#tablaEtapas td'), function (index1, item1) {
        val.push($(item1).text());

        //console.log(" Valores " + $(item1).text());
    });

    for (var i = 0; i < val.length; i++) {
        union += '"' + nombre[con] + '":"' + val[i] + '"';
        if (con < nombre.length - 1) {
            union += ",";
            con++;

        } else {
            union += '},';
            union += '{';
            con = 0;
        }



    }
    tamaño = union.length;
    unionN = union.substring(0, (tamaño - 3));
    unionN += '}]';
    etapas = unionN;
    //console.log(etapas);

    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/InsertEtapas',
        data: JSON.stringify({
            idTipoTran: IdTipoTran,
            descripcion: $('#nombreEtapa').val(),
            orden: $('#orden').val()

        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $.smallBox({
                title: "Éxito!",
                content: "Categoría <b>" + $('input#nombreEtapa').val() + "</b> agregada",
                color: "#739e73",
                timeout: 2000,
                icon: "fa fa-thumbs-up swing animated"
            });
        }
    });


}
//Función para agregar un valor nuevo al DataTable de acciones y a la bd
function AgregarAccion() {

    var val = [];
    var nombre = [];
    var con = 0;
    var valRol = [];
    var jsonInsert = '';
    var union = '[{';
    var unionN = '';
    var tamaño = 0;
    var accioness = [];
    var validado = $('#form_acciones').valid();
    if (validado) {
        if ($('#p_roles li').length > 0) {
            acciones = [];
            accioness[0] = $('select#selectEtapa').val();
            accioness[1] = $('input#nombreAccion').val();
            accioness[2] = $('input#claveAccion').val();
            accioness[3] = $('input#ordenAccion').val();

            var roles = [];
            $("#p_roles li").each(function () {
                roles.push(($(this).text()));
            });

            accioness[4] = roles.join('|');



            //Crear Tabla de Etapas y acciones
            $('#tablaRoles').show();
            $('#BotonesRol').show();

            $('#RN_tablaRoles').append('<tr><td>' + accioness[0] + '</td><td>' + accioness[1] + '</td><td>' + accioness[2] + '</td><td>' + accioness[3] + '</td><td>' + accioness[4] + '</td></tr>');
            $('#tablaEtapasAcciones').append('<tr><td>' + accioness[0] + '</td><td>' + accioness[1] + '</td></tr>');

            $(".btn-next").prop("disabled", false);

            //$('select#fomula_accion').append('<option value="' + accioness[2] + '">' + accioness[2] + '</option>');



            $('#listaAcciones').append('<li class="ui-state-highlight draggable">' + accioness[1] + '</li>');


            $("ul, li").disableSelection();


            $.each($('#tablaRoles th'), function (index, item) {


                nombre.push($(item).text());

                //console.log($(item).text());

                //jsonInsert += '';
                ////console.log($(item).text());
                //jsonInsert += "},";
            });

            $.each($('#tablaRoles td'), function (index1, item1) {

                val.push($(item1).text());



            });

            for (var i = 0; i < val.length; i++) {
                union += '"' + nombre[con] + '":"' + val[i] + '"';
                if (con < nombre.length - 1) {
                    union += ",";
                    con++;

                } else {
                    union += '},';
                    union += '{';
                    con = 0;
                }



            }

            tamaño = union.length;
            unionN = union.substring(0, (tamaño - 3));


            unionN + '}]'
            acciones = unionN;
            var roles = "" + accioness[4];
            roooll = [];
            roooll = roles.split("|");


            EtapasAcciones();


        } else {
            $.smallBox({
                title: "Error",
                content: "<i class='fa fa-clock-o'></i> <i>No ha seleccionado ningún Rol</i>",
                color: "#C46A69",
                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                timeout: 4000
            });
        }
    } else { }

    if (document.getElementById("tablaRoles").rows.length != 1) {
        $(".btn-next").prop("disabled", false);
    }


}
/*Función que bloquea y limpia los imputs del formulario después de Agregar() Transacciones, Etapas, Acciones*/
function Reset() {



    $('input#nombreCampo').val("");
    $('input#descCampo').val("");
    $('select#tipoDato').val("");
    $('input#longitud').val("");
    $('select#nivel').val("");
    $('select#tipoOperacion').val("");

    $('input#nombreEtapa').val("");
    $('input#orden').val("");

    $('input#nombreAccion').val("");

    $('input#claveAccion').val("");
    $('input#ordenAccion').val("");

    $('select#formula_etapa').val("");
    $('select#fomula_accion').val("");
    $('select#fomula_Init').val("");

    $('select#Autocompletar_etapa').val("");
    $('select#Autocompletar_accion').val("");
    $('select#Autocompletar_Combo').val("");


}
//Función que bloquea y limpia los imputs y select's del formulario al regresar a la pantalla principal o finalize la transaccion
function ResetPlus() {

    $('input#nombre').val("");
    $('input#descCampo').val("");
    $('select#area').val(0);
    $('select#proceso').val(0);
    $('input#clave').val("");
    $('select#categoria').val(0);



    $('input#nombre').prop('disabled', false);
    $('input#clave').prop('disabled', false);
    $('select#categoria').prop('disabled', false);
    $('select#area').prop('disabled', false);
    $('select#proceso').prop('disabled', true);

    $('input#nombreCampo').val("");
    $('input#descCampo').val("");
    $('select#tipoDato').val("");
    $('input#longitud').val("");
    $('select#nivel').val("");
    $('select#tipoOperacion').val("");

    $('input#nombreEtapa').val("");
    $('input#orden').val("");

    $('input#nombreAccion').val("");
    $('select#selectEtapa').val("");

    $('input#claveAccion').val("");
    $('input#ordenAccion').val("");


}
//Función para agregar un valor nuevo al DataTable de Reglas de negocion por campo y a la bd
//function agregarReglasNegocio() {


//    var data = [];
//    var val = [];
//    var nombre = [];
//    var con = 0;

//    var jsonInsert = '';
//    var union = '{"IdTipoTran":"' + IdTipoTran + '", "Etapa":"' + $("#rn2_etapa").val() + '","Accion":"' + $("#rn2_accion").val() + '","valoresRN": [{';
//    var unionN = '';
//    var tamaño = 0;
//    var valores = '';
//    var validacion = '';
//    var validacionCheck1 = "";
//    var validacionCheck2 = "";
//    var validacionCheck3 = "";
//    nombre.push("Campos");
//    nombre.push("Visible");
//    nombre.push("Editable");
//    nombre.push("Obligatorio");
//    nombre.push("Visualización");


//    data = table.$('input, select').serializeArray({
//        checkboxesAsBools: true
//    });

//    $.each(data, function (index, valo) {

//        val.push(valo.value);

//    })
//    for (var i = 0; i < val.length; i++) {
//        union += '"' + nombre[con] + '":"' + val[i] + '"';
//        if (con + 1 < nombre.length) {
//            union += ",";
//            con++;

//        } else {
//            validacion = "";



//            union += '},'
//            union += '{';
//            con = 0;
//        }
//    }

//    for (var i = 0; i < val.length; i++) {
//        if (con + 1 < nombre.length) {

//            if (nombre[con] == "Visible") {

//                if (val[i = (i)] == 'false' && val[i = (i + 2)] == 'true') {

//                    validacionCheck1 = 'si';
//                    showWarningMessage('Información </b>', '<i>no puedes guardar el campo <b> ' + val[i = (i - 3)] + ' </b> si esta seleccionando como obligatorio y si no es visible </i>');
//                    $('#form_RN2').bootstrapValidator('destroy');
//                    return false;

//                } else {

//                    validacionCheck1 = 'no';
//                }
//            } else {
//                validacionCheck1 = 'no'
//            }
//            if (nombre[con] == "Editable") {

//                if (val[i = (i)] == 'false' && val[i = (i + 2)] == '1') {
//                    validacion = 'si';
//                    showWarningMessage('Información </b>', '<i>Debes seleccionar la visualización del campo <b> ' + val[i - 4] + ' </b> </i>');
//                    $('#form_RN2').bootstrapValidator('destroy');
//                    return false;

//                } else {
//                    validacion = 'no';
//                }
//            } else {
//                validacion = 'no';
//            }
//            con++;

//        } else {
//            validacion = "";
//            if (nombre[con] == "Visualización") {
//                if (val[i] == '0' && val[i - 1] == 'true' && val[i - 2] == 'true' && val[i - 3] == 'true') {
//                    console.log(nombre[con], val[i], nombre[con], val[i - 1], nombre[con], val[i - 2], nombre[con], val[i - 3])
//                    validacion = 'si';
//                    showWarningMessage('Información </b>', '<i>Debes seleccionar la visualización del campo <b> ' + val[i - 4] + ' </b> </i>');
//                    $('#form_RN2').bootstrapValidator('destroy');
//                    return false;

//                } else {
//                    validacion = 'no';
//                }
//            } else {
//                validacion = 'no';
//            }

//            if (nombre[con] == "Visualización") {
//                if (val[i] == '0' && val[i - 1] == 'true' && val[i - 2] == 'false' && val[i - 3] == 'false') {
//                    console.log(nombre[con], val[i], nombre[con], val[i - 1], nombre[con], val[i - 2], nombre[con], val[i - 3])
//                    validacion = 'si';
//                    showWarningMessage('Información </b>', '<i>Debes seleccionar la visualización del campo <b> ' + val[i - 4] + ' </b> </i>');
//                    $('#form_RN2').bootstrapValidator('destroy');
//                    return false;

//                } else {
//                    validacion = 'no';
//                }
//            } else {
//                validacion = 'no';
//            }

//            if (nombre[con] == "Visualización") {
//                if (val[i] == '0' && val[i - 1] == 'false' && val[i - 2] == 'false' && val[i - 3] == 'true') {
//                    console.log(nombre[con], val[i], nombre[con], val[i - 1], nombre[con], val[i - 2], nombre[con], val[i - 3])
//                    validacion = 'si';
//                    showWarningMessage('Información </b>', '<i>Debes seleccionar la visualización del campo <b> ' + val[i - 4] + ' </b> </i>');
//                    $('#form_RN2').bootstrapValidator('destroy');
//                    return false;

//                } else {
//                    validacion = 'no';
//                }
//            } else {
//                validacion = 'no';
//            }
//            if (nombre[con] == "Visualización") {
//                if (val[i] == '0' && val[i - 1] == 'false' && val[i - 2] == 'true' && val[i - 3] == 'false') {
//                    console.log(nombre[con], val[i], nombre[con], val[i - 1], nombre[con], val[i - 2], nombre[con], val[i - 3])
//                    validacion = 'si';
//                    showWarningMessage('Información </b>', '<i>Debes seleccionar la visualización del campo <b> ' + val[i - 4] + ' </b> </i>');
//                    $('#form_RN2').bootstrapValidator('destroy');
//                    return false;

//                } else {
//                    validacion = 'no';
//                }
//            } else {
//                validacion = 'no';
//            }
//            con = 0;
//        }
//    }


//    if (validacion == 'si' && validacionCheck1 == 'si') {
//        return false
//    } else {


//        tamaño = union.length;
//        unionN = union.substring(0, (tamaño - 3));

//        unionN += '}]}';

//        if (unionN.substring(unionN.length - 4, unionN.length) == '1}]}') {
//            var coma = '"' + unionN.substring(unionN.length - 3, unionN.length);
//            unionN = unionN.substring(0, unionN.length - 3) + coma;
//        }
//        $.each($('#example td'), function (index1, item1) {
//            valores = $(item1).text();
//        });
//        console.log(unionN)
//        $.ajax({
//            async: false,
//            type: 'POST',
//            url: 'MyWebService.asmx/ActuaInsertWS',
//            data: JSON.stringify({
//                jsonDatos: unionN
//            }),
//            dataType: 'json',
//            contentType: 'application/json; charset=utf-8',
//            success: function (response) {
//                $.smallBox({
//                    title: "Éxito!",
//                    content: "Se han configurado las reglas de negocio",
//                    color: "#739e73",
//                    timeout: 2000,
//                    icon: "fa fa-thumbs-up swing animated"
//                });
//                $(".btn-next").prop("disabled", false);
//                $("#rn2_etapa").val(0)
//                $("#rn2_accion").val(0)
//                table.clear().draw();
//                $('#form_RN2').bootstrapValidator('destroy');

//            }
//        });

//        Reset();
//        $('#form_RN2').bootstrapValidator('destroy');

//        $("#Combo_accion").change(function () {
//            $.ajax({
//                async: false,
//                type: 'POST',
//                url: 'MyWebService.asmx/CamposConboboxWS',
//                data: JSON.stringify({
//                    idTipotransaccion: IdTipoTran,
//                    idEtapa: $("#Combo_etapa").val(),
//                    idAccion: $("#Combo_accion").val()
//                }),
//                dataType: 'json',
//                contentType: 'application/json; charset=utf-8',

//                success: function (response) {
//                    var datosCom = [];

//                    var seelct;

//                    $.each(response, function (row, index) {
//                        $.each(index.ListCamposTransaccion, function (r, arr) {
//                            vistransact = '';
//                            selectTipoTransa = '';
//                            categtransact = "";
//                            categtransact2 = "";
//                            $.ajax({
//                                async: false,
//                                type: 'POST',
//                                url: 'MyWebService.asmx/TiposTrans',
//                                dataType: 'json',
//                                contentType: 'application/json; charset=utf-8',
//                                success: function (response) {
//                                    vistransact = ' <label class="select"><select class="select form-control" id="categorias_' + x + '" name="categorias" value="0" size="1">';
//                                    vistransact += '<option value ="0" selected="selected" >Seleccione una categoría</option>';
//                                    $.each(response, function (registro, row1) {

//                                        $.each(row1.camposCatTran, function (i1, r1) {
//                                            vistransact += '<option value="' + r1.idCatTipoTransac + '">' + r1.categoriaTransac + '</option>';

//                                        })
//                                    })
//                                }
//                            })
//                            datosCom.push(['<input type="text" value="' + arr.nombreCampo + '" id="valor_' + check + '" text=" ' + arr.nombreCampo + '" name="Campo" readonly style="border:none; background: transparent;">', vistransact, ' <label class="select"><select class="select form-control" id="tipoTransacciones_' + x + '" name="tipoTransacciones value="0" size="1"></select></label>', ' <label class="select"><select class="select form-control" id="idReferencia_' + x + '" name="idReferencia" value="0" size="1"></select></label>', ' <label class="select"><select class="select form-control" id="nombreReferencia_' + x + '" name="nombreReferencia" value="0" size="1"></select></label>']);
//                            x++;
//                        });
//                    });

//                    $.fn.dataTable.ext.errMode = 'none';
//                    var responsiveHelper_datatable_fixed_column = undefined;
//                    var breakpointDefinition = {
//                        tablet: 1024,
//                        phone: 480,
//                        desktop: 1260
//                    };
//                    $('.trnc').show();
//                    $('#btn_agregarRN2').show();
//                    tables = $('#examples').DataTable({


//                        "paging": false,

//                        "sPaginationType": "bootstrap", // full_numbers
//                        "iDisplayStart ": 10,
//                        "iDisplayLength": 10,
//                        "bPaginate": false, //hide pagination
//                        "bFilter": false, //hide Search bar
//                        "bInfo": false, // hide showing entries
//                        "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6 hidden-xs'l><'col-sm-6 col-xs-12 hidden-xs'<'toolbar'>>r>" +
//                        "t" +
//                        "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
//                        "oLanguage": {
//                            "sUrl": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
//                        },

//                        "autoWidth": true,
//                        "preDrawCallback": function () {
//                            if (!responsiveHelper_datatable_fixed_column) {
//                                responsiveHelper_datatable_fixed_column = new ResponsiveDatatablesHelper(
//                                    $('#examples'), breakpointDefinition);
//                            }
//                        },

//                        "drawCallback": function (oSettings) {
//                            responsiveHelper_datatable_fixed_column.respond();
//                        },
//                        data: datosCom,
//                        columns: [{
//                            title: "Nombre del campo"
//                        },
//                        {
//                            title: "Categoría"
//                        },
//                        {
//                            title: "Tipo de transacción"
//                        },
//                        {
//                            title: "Campo referencia"
//                        },
//                        {
//                            title: "Campo desplegado"
//                        }

//                        ]
//                    });


//                    $(".btn-next").prop("disabled", false);

//                    $('#rn2_etapa').val(0);
//                    $('select#rn2_accion').val(0);

//                }

//            });
//            for (var i = 1; i < x; i++) {
//                SelectCatTTS(i);

//            }
//        })


//    }

//}

function agregarReglasNegocio() {
    var data = [];
    var val = [];
    var nombre = [];
    var con = 0;
    var listaCorreccion = [];
    var listaCorreccion2 = [];
    var countCorreccion = 0;




    var jsonInsert = '';
    var union = '{"IdTipoTran":"' + IdTipoTran + '", "Etapa":"' + $("#rn2_etapa").val() + '","Accion":"' + $("#rn2_accion").val() + '","valoresRN": [{';
    var unionN = '';
    var tamaño = 0;
    var valores = '';
    var validacion = '';
    var validacionCheck1 = "";
    var validacionCheck2 = "";
    var validacionCheck3 = "";
    nombre.push("Campos");
    nombre.push("Visible");
    nombre.push("Editable");
    nombre.push("Obligatorio");
    nombre.push("Visualización");

    data = table.$('input, select').serializeArray({
        checkboxesAsBools: true
    });

    $.each(data, function (index, valo) {
        listaCorreccion2.push(valo.value);
        countCorreccion++;
        if (countCorreccion == 5) {
            countCorreccion = 0;
            listaCorreccion.push(listaCorreccion2);
            listaCorreccion2 = [];
        }
    })


    $.each(data, function (index, valo) {

        val.push(valo.value);

    })
    for (var i = 0; i < val.length; i++) {
        union += '"' + nombre[con] + '":"' + val[i] + '"';
        if (con + 1 < nombre.length) {
            union += ",";
            con++;

        } else {
            validacion = "";



            union += '},'
            union += '{';
            con = 0;
        }
    }


    console.log("LA lista chida: " + listaCorreccion[0]);
    console.log("LA lista chida: " + listaCorreccion[1]);
    console.log("LA lista chida: " + listaCorreccion[2]);

    for (var i = 0; i < listaCorreccion.length; i++) {
        for (var j = 0; j < listaCorreccion[i].length; j++) {
            if (listaCorreccion[i][2] == 'true' && listaCorreccion[i][3] == 'true' && listaCorreccion[i][1] == 'false') {
                var count = 0;
                if (count == 0) {
                    showWarningMessage('Información </b>', '<i>no puedes guardar el campo <b> ' + listaCorreccion[i][0] + ' </b> si esta seleccionando como obligatorio - editable y no es visible </i>');
                    $('#form_RN2').bootstrapValidator('destroy');
                    count++;
                    validacion = "no";
                    return false;
                }
            } else if (listaCorreccion[i][1] == 'false' && listaCorreccion[i][2] == 'false' && listaCorreccion[i][3] == 'false' && listaCorreccion[i][4] == 0) {

                validacion = "vacio";

            } else if (listaCorreccion[i][1] == 'false' && listaCorreccion[i][2] == 'true') {
                var count = 0;
                if (count == 0) {
                    showWarningMessage('Información </b>', '<i>no puedes guardar el campo <b> ' + listaCorreccion[i][0] + ' </b> si esta seleccionando como editable y no es visible </i>');
                    $('#form_RN2').bootstrapValidator('destroy');
                    count++;
                    validacion = "no";
                    return false;
                }
            } else if (listaCorreccion[i][1] == 'false' && listaCorreccion[i][3] == 'true') {
                var count = 0;
                if (count == 0) {
                    showWarningMessage('Información </b>', '<i>no puedes guardar el campo <b> ' + listaCorreccion[i][0] + ' </b> si esta seleccionando como obligatorio y no es visible </i>');
                    $('#form_RN2').bootstrapValidator('destroy');
                    count++;
                    validacion = "no";
                    return false;
                }
            } else if (listaCorreccion[i][1] == 'false' && listaCorreccion[i][4] != 0) {
                var count = 0;
                if (count == 0) {
                    showWarningMessage('Información </b>', '<i>no puedes guardar el campo <b> ' + listaCorreccion[i][0] + ' </b> si tiene un tipo de visualización y no es visible </i>');
                    $('#form_RN2').bootstrapValidator('destroy');
                    count++;
                    validacion = "no";
                    return false;
                }
            } else if (listaCorreccion[i][2] == 'true' && listaCorreccion[i][4] == 0) {
                showWarningMessage('Información </b>', '<i>no puedes guardar el campo <b> ' + listaCorreccion[i][0] + ' </b> si esta seleccionado como editable y no tiene un tipo de visualización</i>');
                $('#form_RN2').bootstrapValidator('destroy');
                validacion = "no";
                return false;
            } else if (listaCorreccion[i][3] == 'true' && listaCorreccion[i][4] == 0) {
                showWarningMessage('Información </b>', '<i>no puedes guardar el campo <b> ' + listaCorreccion[i][0] + ' </b> si esta seleccionado como obligatorio y no tiene un tipo de visualización</i>');
                $('#form_RN2').bootstrapValidator('destroy');
                validacion = "no";
                return false;

            } else if (listaCorreccion[i][2] == 'true' && listaCorreccion[i][3] == 'true' && listaCorreccion[i][4] == 0) {
                var count = 0;
                if (count == 0) {
                    showWarningMessage('Información </b>', '<i>no puedes guardar el campo <b> ' + listaCorreccion[i][0] + ' </b> si esta seleccionado como obligatorio - editable y no tiene un tipo de visualización</i>');
                    $('#form_RN2').bootstrapValidator('destroy');
                    count++;
                    validacion = "no";
                    return false;
                }
            } else if (listaCorreccion[i][1] == 'true' && listaCorreccion[i][2] == 'true' && listaCorreccion[i][3] == 'true' && listaCorreccion[i][4] == 0) {
                showWarningMessage('Información </b>', '<i>no puedes guardar el campo <b> ' + listaCorreccion[i][0] + ' </b> si esta seleccionado como visible - obligatorio - editable y no tiene un tipo de visualización</i>');
                $('#form_RN2').bootstrapValidator('destroy');
                validacion = "no";
                return false;
            } else {
                validacion = "ok";
            }
            validacion = "ok";
        }
    }
    if (validacion == 'ok') {

        tamaño = union.length;
        unionN = union.substring(0, (tamaño - 3));

        unionN += '}]}';

        if (unionN.substring(unionN.length - 4, unionN.length) == '1}]}') {
            var coma = '"' + unionN.substring(unionN.length - 3, unionN.length);
            unionN = unionN.substring(0, unionN.length - 3) + coma;
        }
        $.each($('#example td'), function (index1, item1) {
            valores = $(item1).text();
        });
        console.log(unionN)
        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/ActuaInsertWS',
            data: JSON.stringify({
                jsonDatos: unionN
            }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                $.smallBox({
                    title: "Éxito!",
                    content: "Se han configurado las reglas de negocio",
                    color: "#739e73",
                    timeout: 2000,
                    icon: "fa fa-thumbs-up swing animated"
                });
                $(".btn-next").prop("disabled", false);
                $("#rn2_etapa").val(0)
                $("#rn2_accion").val(0)
                table.clear().draw();
                $('#form_RN2').bootstrapValidator('destroy');

            }
        });

        Reset();
        $('#form_RN2').bootstrapValidator('destroy');

        $("#Combo_accion").change(function () {
            $.ajax({
                async: false,
                type: 'POST',
                url: 'MyWebService.asmx/CamposConboboxWS',
                data: JSON.stringify({
                    idTipotransaccion: IdTipoTran,
                    idEtapa: $("#Combo_etapa").val(),
                    idAccion: $("#Combo_accion").val()
                }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',

                success: function (response) {
                    var datosCom = [];

                    var seelct;

                    $.each(response, function (row, index) {
                        $.each(index.ListCamposTransaccion, function (r, arr) {
                            vistransact = '';
                            selectTipoTransa = '';
                            categtransact = "";
                            categtransact2 = "";
                            $.ajax({
                                async: false,
                                type: 'POST',
                                url: 'MyWebService.asmx/TiposTrans',
                                dataType: 'json',
                                contentType: 'application/json; charset=utf-8',
                                success: function (response) {
                                    vistransact = ' <label class="select"><select class="select form-control" id="categorias_' + x + '" name="categorias" value="0" size="1">';
                                    vistransact += '<option value ="0" selected="selected" >Seleccione una categoría</option>';
                                    $.each(response, function (registro, row1) {

                                        $.each(row1.camposCatTran, function (i1, r1) {
                                            vistransact += '<option value="' + r1.idCatTipoTransac + '">' + r1.categoriaTransac + '</option>';

                                        })
                                    })
                                }
                            })
                            datosCom.push(['<input type="text" value="' + arr.nombreCampo + '" id="valor_' + check + '" text=" ' + arr.nombreCampo + '" name="Campo" readonly style="border:none; background: transparent;">', vistransact, ' <label class="select"><select class="select form-control" id="tipoTransacciones_' + x + '" name="tipoTransacciones value="0" size="1"></select></label>', ' <label class="select"><select class="select form-control" id="idReferencia_' + x + '" name="idReferencia" value="0" size="1"></select></label>', ' <label class="select"><select class="select form-control" id="nombreReferencia_' + x + '" name="nombreReferencia" value="0" size="1"></select></label>']);
                            x++;

                        });
                    });

                    $.fn.dataTable.ext.errMode = 'none';
                    var responsiveHelper_datatable_fixed_column = undefined;
                    var breakpointDefinition = {
                        tablet: 1024,
                        phone: 480,
                        desktop: 1260
                    };
                    $('.trnc').show();
                    $('#btn_agregarRN2').show();
                    tables = $('#examples').DataTable({


                        "paging": false,

                        "sPaginationType": "bootstrap", // full_numbers
                        "iDisplayStart ": 10,
                        "iDisplayLength": 10,
                        "bPaginate": false, //hide pagination
                        "bFilter": false, //hide Search bar
                        "bInfo": false, // hide showing entries
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
                                    $('#examples'), breakpointDefinition);
                            }
                        },

                        "drawCallback": function (oSettings) {
                            responsiveHelper_datatable_fixed_column.respond();
                        },
                        data: datosCom,
                        columns: [{
                            title: "Nombre del campo"
                        },
                        {
                            title: "Categoría"
                        },
                        {
                            title: "Tipo de transacción"
                        },
                        {
                            title: "Campo referencia"
                        },
                        {
                            title: "Campo desplegado"
                        }

                        ]
                    });


                    $(".btn-next").prop("disabled", false);

                    $('#rn2_etapa').val(0);
                    $('select#rn2_accion').val(0);

                }

            });
            for (var i = 1; i < x; i++) {
                SelectCatTTS(i);

            }
        })

    }
}


//Función para agregar un valor nuevo al DataTable de Combo Box por campo y a la bd
function agregarCombobox() {


    var data = [];
    var val = [];
    var nombre = [];
    var con = 0;

    var jsonInsert = '';
    var union = '{"idTipoTransaccion":"' + IdTipoTran + '","ComboBox": [{';
    var unionN = '';
    var tamaño = 0;
    var valores = '';
    var validacion = '';
    var validacion2 = '';
    nombre.push("idCampo");
    nombre.push("categoria");
    nombre.push("idTipoTranConbo");
    nombre.push("idReferencia");
    nombre.push("nombreReferencia");


    data = tables.$('input, select').serializeArray({
        checkboxesAsBools: true
    });


    $.each(data, function (index, valo) {

        val.push(valo.value);
    })


    for (var i = 0; i < val.length; i++) {
        union += '"' + nombre[con] + '":"' + val[i] + '"';
        if (con < nombre.length - 1) {
            union += ",";

            con++;

        } else {
            union += '},'
            union += '{';


            con = 0;
        }
    }

    for (var i = 0; i < val.length; i++) {
        if (con < nombre.length - 1) {
            if (nombre[con] == "idReferencia") {
                if (val[i] == 0 && val[i - 1] != 0) {
                    validacion2 = 'si';
                    showWarningMessage('Información </b>', '<i>Debes seleccionar el Campo de Referencia del Campo <b>' + val[i - 3] + '</b></i>');
                    $('#form_Combo').bootstrapValidator('destroy');
                    return false;

                } else {

                    validacion2 = 'no';
                }
            } else {
                validacion2 = 'no'
            }
            if (nombre[con] == "idReferencia") {
                if (val[i] != 0 && val[i - 1] == 0) {
                    console.log("Entro 1 --- " + val[i], val[i - 1])

                    validacion2 = 'si';
                    showWarningMessage('Información </b>', '<i>Debes seleccionar la categoria y tipo de transaccion del Campo <b>' + val[i - 3] + '</b></i>');
                    $('#form_Combo').bootstrapValidator('destroy');
                    return false;

                } else {

                    validacion2 = 'no';
                }
            } else {
                validacion2 = 'no'
            }

            con++;

        } else {


            if (nombre[con] == "nombreReferencia") {

                if (val[i] == 0 && val[i - 1] != 0 && val[i - 1] != 0) {
                    validacion = 'si';
                    showWarningMessage('Información </b>', '<i>Debes seleccionar el Campo Desplegable del campo <b>' + val[i - 4] + '</b></i>');
                    $('#form_Combo').bootstrapValidator('destroy');
                    return false;

                } else {

                    validacion = 'no';
                }
            } else {
                validacion = 'no'
            }
            con = 0;
        }
    }

    tamaño = union.length;
    unionN = union.substring(0, (tamaño - 3));

    unionN += '}]}';

    if (validacion == 'si' && validacion2 == 'si') {

    } else {



        $.each($('#examples td'), function (index1, item1) {
            valores = $(item1).text();
            //console.log(" Valores " + $(item1).text());
        });
        if (valores != 'Ningún dato disponible en esta tabla') {
            $.ajax({
                async: false,
                type: 'POST',
                url: 'MyWebService.asmx/ActualisarComboboxWS',
                data: JSON.stringify({
                    JsonConbobox: unionN
                }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (response) {
                    $.smallBox({
                        title: "Éxito!",
                        content: "Se han Configurado los Combo Box",
                        color: "#739e73",
                        timeout: 2000,
                        icon: "fa fa-thumbs-up swing animated"
                    });

                    $('#Combo_accion').val(0).trigger('change');
                    $('#Combo_etapa').val(0).trigger('change');
                    $('#form_Combo').bootstrapValidator('destroy');

                    $(".btn-next").prop("disabled", false);
                    //table.clear().draw();

                }
            });

        } else {
            showWarningMessage('Información </b>', '<i>No hay campos tipo combobox</i>');

            $(".btn-next").prop("disabled", false);

        }
    }

}
//Función para agregar un valor nuevo al DataTable del AutoCompletar y a la bd
function agregarAutoComplete() {


    var data = [];
    var val = [];
    var nombre = [];
    var con = 0;

    var jsonInsert = '';
    var union = '{"idCampo":"' + $('select#Autocompletar_Combo').val() + '","Hijo": [{';
    var unionN = '';
    var tamaño = 0;
    var valores = '';
    var validacion = '';
    var validacion2 = '';
    nombre.push("idCampo");
    nombre.push("idCategoria");
    nombre.push("idTransaccion");
    nombre.push("idRef");
    nombre.push("CampoRef");
    nombre.push("primarykey");
    nombre.push("Types");




    data = tablesAuto.$('input, select').serializeArray({
        checkboxesAsBools: true
    });


    $.each(data, function (index, valo) {

        val.push(valo.value);
    })
    console.log("Arreglo" + val);

    for (var i = 0; i < val.length; i++) {

        union += '"' + nombre[con] + '":"' + val[i] + '"';

        if (con < nombre.length - 1) {
            union += ",";

            if (nombre[con] == "primarykey") {
                if (val[i] == "No hay Referencia") {
                    validacion2 = 'si';
                    showWarningMessage('Información </b>', '<i>No se puede guardar la configuración hasta que haya PrimaryKey</i>');
                    $('#form_Autocompletar').bootstrapValidator('destroy');
                    return false;

                } else {

                    validacion2 = 'no';
                }
            } else {
                validacion2 = 'no'
            }

            con++;

        } else {
            union += '},'
            union += '{';

            //if (nombre[con] == "CampoRef") {
            //    if (val[i] == 0) {
            //        validacion = 'si';
            //        showWarningMessage('Información </b>', '<i>Debes seleccionar el Campo Desplegable del campo <b>' + val[i - 4] + '</b></i>');
            //        $('#form_Autocompletar').bootstrapValidator('destroy');
            //        return false;

            //    } else {

            //        validacion = 'no';
            //    }
            //} else {
            //    validacion = 'no'
            //}
            con = 0;
        }
    }

    tamaño = union.length;
    unionN = union.substring(0, (tamaño - 3));

    unionN += '}]}';
    console.log("Union: " + unionN)
    if (validacion == 'si' && validacion2 == 'si') {

    } else {



        $.each($('#DTAutocompletar td'), function (index1, item1) {
            valores = $(item1).text();
            //console.log(" Valores " + $(item1).text());
        });
        if (valores != 'Ningún dato disponible en esta tabla') {
            $.ajax({
                async: false,
                type: 'POST',
                url: 'MyWebService.asmx/UpdateJsonAutoN',
                data: JSON.stringify({
                    idTipoTransaccion: IdTipoTran,
                    idEtapa: $("#Autocompletar_etapa").val(),
                    idAccion: $("#Autocompletar_accion").val(),
                    idCampo: $("#Autocompletar_Combo").val(),
                    CadenaJson: unionN
                }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (response) {
                    $.smallBox({
                        title: "Éxito!",
                        content: "Se han Configurado el Autocompletar",
                        color: "#739e73",
                        timeout: 2000,
                        icon: "fa fa-thumbs-up swing animated"
                    });

                    $('#Autocompletar_accion').val(0).trigger('change');
                    $('#Autocompletar_etapa').val(0).trigger('change');
                    $('#Autocompletar_Combo').val(0).trigger('change');

                    $('#form_Autocompletar').bootstrapValidator('destroy');

                    $(".btn-next").prop("disabled", false);
                    tablesAuto.clear().draw();

                }
            });

        } else {
            showWarningMessage('Información </b>', '<i>No hay campos</i>');

            $(".btn-next").prop("disabled", false);

        }
    }

}
//Funcion hecha para que se optengan los valores de select y check box de un DataTable se debe aplicar en un serialize
(function ($) {

    $.fn.serialize = function (options) {
        return $.param(this.serializeArray(options));
    };

    $.fn.serializeArray = function (options) {
        var o = $.extend({
            checkboxesAsBools: false
        }, options || {});

        var rselectTextarea = /select|textarea/i;
        var rinput = /text|hidden|password|search/i;

        return this.map(function () {
            return this.elements ? $.makeArray(this.elements) : this;
        })
            .filter(function () {
                return this.name && !this.disabled &&
                    (this.checked ||
                        (o.checkboxesAsBools && this.type === 'checkbox') ||
                        rselectTextarea.test(this.nodeName) ||
                        rinput.test(this.type));
            })
            .map(function (i, elem) {
                var val = $(this).val();
                return val == null ?
                    null :
                    $.isArray(val) ?
                        $.map(val, function (val, i) {
                            return {
                                name: elem.name,
                                value: val
                            };
                        }) : {
                            name: elem.name,
                            value: (o.checkboxesAsBools && this.type === 'checkbox') ? //moar ternaries!
                                (this.checked ? 'true' : 'false') : val
                        };
            }).get();
    };

})(jQuery);
//Funcion creda para campos especificos de los formularios al marcarse error por duplicado de informacion de las tablas 
function mouse() {
    $("input#nombreCampo").mouseenter(function (evento) {
        $('input#nombreCampo').css({
            'background-color': '#fff'
        });
    });

    $("input#nombreCampoD").mouseenter(function (evento) {
        $('input#nombreCampoD').css({
            'background-color': '#fff'
        });
    });

    $("input#longitud").mouseenter(function (evento) {
        $('input#longitud').css({
            'background-color': '#fff'
        });
    });

    $('input#nombreEtapa').mouseenter(function (evento) {
        $('input#nombreEtapa').css({
            'background-color': '#fff'
        });
    });

    $('input#nombreEtapaD').mouseenter(function (evento) {
        $('input#nombreEtapaD').css({
            'background-color': '#fff'
        });
    });

    $('input#orden').mouseenter(function (evento) {
        $('input#orden').css({
            'background-color': '#fff'
        });
    });

    $('input#nombreAccion').mouseenter(function (evento) {
        $('input#nombreAccion').css({
            'background-color': '#fff'
        });
    });

    $('input#nombreAccionD').mouseenter(function (evento) {
        $('input#nombreAccionD').css({
            'background-color': '#fff'
        });
    });

    $('input#claveAccion').mouseenter(function (evento) {
        $('input#claveAccion').css({
            'background-color': '#fff'
        });
    });

    $('input#ordenAccion').mouseenter(function (evento) {
        $('input#ordenAccion').css({
            'background-color': '#fff'
        });
    });
}
/*Función que crea las listas para los campos de Perfiles de la segunda parte de Wizard*/
function Perfiles() {
    $('body').on('click', '.list-group-B .list-group-item-B', function () {
        $(this).toggleClass('active');
    });
    $('.list-arrows-B button').click(function () {
        var $button = $(this),
            actives = '';
        if ($button.hasClass('move-left-B')) {
            actives = $('.list-right-B ul li.active');
            actives.clone().appendTo('.list-left-B ul');
            actives.remove();
            $('.list-group-item-B').removeClass('active');


        } else if ($button.hasClass('move-right-B')) {
            actives = $('.list-left-B ul li.active');
            actives.clone().appendTo('.list-right-B ul');
            actives.remove();

            $('.list-group-item-B').removeClass('active');
        }
    });
}
//Funcion para la parte de la formula,regla de negocio por campo y autocompletar para poder seleccionar los campos 
function Seleccion() {
    $('body').on('click', '#cabecera_rn .ui-widget-content', function () {
        $(this).toggleClass('ui-selecting');
    });

    $('body').on('click', '#detalle_rn .ui-widget-content', function () {
        $(this).toggleClass('ui-selecting');
    });
}
// Funcion que contiene el ajax que llenara los select dinamicamente dentro de los formularios asi como sus respetivos change de algunos de ellos solo llenaran los selct de las etapas
function SelectEtapas() {
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/llenaComboSoloEtapas',
        dataType: 'json',
        data: JSON.stringify({
            idTipoTran: IdTipoTran
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var nivtransact = "";
            $.each(response, function (registro, row1) {

                nivtransact += '<option value="0"> Seleccione una etapa </option>';
                $.each(row1.listEtapas, function (i1, r1) {


                    nivtransact += '<option value="' + r1.idEtapa + '">' + r1.descripcion + '</option>';

                });


            });

            $("select#rn2_etapa").html(nivtransact);
            $("select#Combo_etapa").html(nivtransact);
            $("select#formula_etapa").html(nivtransact);
            $("select#Autocompletar_etapa").html(nivtransact);
        },
        error: function (e) {

        }
    });

    $("select#rn2_etapa").change(function () {

        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/llenaComboAcciones',
            dataType: 'json',
            data: JSON.stringify({
                idTipoTran: IdTipoTran,
                idEtapas: $("select#rn2_etapa").val()
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                var nivtransact = "";
                $.each(response, function (registro, row1) {

                    nivtransact += '<option value="0"> Seleccione una acción </option>';
                    $.each(row1.listAcciones, function (i1, r1) {

                        nivtransact += '<option value="' + r1.idAccion + '">' + r1.descripcion + '</option>';
                    });


                });

                $("select#rn2_accion").html(nivtransact);
            },
            error: function (e) {
                console.log("Error en Etapa");

            }
        });
    })

    $("select#Autocompletar_etapa").change(function () {

        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/llenaComboAcciones',
            dataType: 'json',
            data: JSON.stringify({
                idTipoTran: IdTipoTran,
                idEtapas: $("select#Autocompletar_etapa").val()
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                var nivtransact = "";
                $.each(response, function (registro, row1) {

                    nivtransact += '<option value="0"> Seleccione una acción </option>';
                    $.each(row1.listAcciones, function (i1, r1) {

                        nivtransact += '<option value="' + r1.idAccion + '">' + r1.descripcion + '</option>';
                    });


                });

                $("select#Autocompletar_accion").html(nivtransact);
            },
            error: function (e) {
                console.log("Error en Etapa");

            }
        });
    })

    $("select#Combo_etapa").change(function () {

        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/llenaComboAcciones',
            dataType: 'json',
            data: JSON.stringify({
                idTipoTran: IdTipoTran,
                idEtapas: $("select#Combo_etapa").val()
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                var nivtransact = "";
                $.each(response, function (registro, row1) {

                    nivtransact += '<option value="0"> Seleccione una acción </option>';
                    $.each(row1.listAcciones, function (i1, r1) {

                        nivtransact += '<option value="' + r1.idAccion + '">' + r1.descripcion + '</option>';
                    });


                });

                $("select#Combo_accion").html(nivtransact);
            },
            error: function (e) {
                console.log("Error en Etapa");

            }
        });
    })


    $("select#visualizacion").change(function () {

    })
}
// funcion que se utiliza para inicializar el change del Select de accion del step combo box
function selectCombobox() {
    $("#Autocompletar_accion").change(function () {
        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/campCombWS',
            dataType: 'json',
            data: JSON.stringify({
                idTipotransaccion: IdTipoTran,
                idEtapa: $("#Autocompletar_etapa").val(),
                idAccion: $("#Autocompletar_accion").val()
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                var nivtransact = "";
                $.each(response, function (registro, row1) {

                    nivtransact += '<option value="0"> Seleccione un campo </option>';
                    $.each(row1.ListCamposTransaccion, function (i1, r1) {


                        nivtransact += '<option value="' + r1.idCampo + '">' + r1.nombreCampo + '</option>';

                    });


                });

                $("select#Autocompletar_Combo").html(nivtransact);
            },
            error: function (e) {

            }
        });

    })
}
// funcion que llena el select de campo inicializador para la formula
function SelectCampoInit() {
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/ListCamposAbiertoWS',
        dataType: 'json',
        data: JSON.stringify({
            idTipotransaccion: IdTipoTran
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var nivtransact = "";
            $.each(response, function (registro, row1) {

                nivtransact += '<option value="0" > Seleccione un campo </option>';
                $.each(row1.ListCamposTransaccion, function (i1, r1) {

                    nivtransact += '<option value="' + r1.idCampoC + '">' + r1.nombreCampo + '</option>';

                });


            });

            $("select#fomula_Init").html(nivtransact);

        },
        error: function (e) {
            console.log("Error en campo Ini");

        }
    });


}
// Funcion que llena el select con etapas para la accion del step ciclo de vida 
function selectEtapasStep3() {
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/llenaComboSoloEtapas',
        dataType: 'json',
        data: JSON.stringify({
            idTipoTran: IdTipoTran
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var nivtransact = "";
            $.each(response, function (registro, row1) {

                nivtransact += '<option value="0" > Seleccione una etapa </option>';
                $.each(row1.listEtapas, function (i1, r1) {
                    nivtransact += '<option value="' + r1.idEtapa + '">' + r1.descripcion + '</option>';

                });


            });

            $("select#formula_etapa").html(nivtransact);
        },
        error: function (e) {
            console.log("Error en Etapa");

        }
    });
}
// Funcion que llena los select de etapa y etapa final de reglas de negocio por accion y change de select etapa y select accion
function selectEtapasStep7() {
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/llenaComboSoloEtapas',
        dataType: 'json',
        data: JSON.stringify({
            idTipoTran: IdTipoTran
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var nivtransact = "";
            $.each(response, function (registro, row1) {

                nivtransact += '<option value="0" > Seleccione una etapa </option>';
                $.each(row1.listEtapas, function (i1, r1) {
                    nivtransact += '<option value="' + r1.idEtapa + '">' + r1.descripcion + '</option>';

                });


            });

            $("select#RNA_etapa").html(nivtransact);
            $("select#RNA_EtapaFinal").html(nivtransact);


        },
        error: function (e) {
            console.log("Error en Etapa");

        }
    });
    $("select#RNA_etapa").change(function () {
        $("#btn_agregarRNAccion").prop("disabled", false);
        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/llenaComboAcciones',
            dataType: 'json',
            data: JSON.stringify({
                idTipoTran: IdTipoTran,
                idEtapas: $("select#RNA_etapa").val()
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                var nivtransact = "";
                $.each(response, function (registro, row1) {

                    nivtransact += '<option value="0" > Seleccione una acción </option>';
                    $.each(row1.listAcciones, function (i1, r1) {

                        nivtransact += '<option value="' + r1.idAccion + '">' + r1.descripcion + '</option>';
                    });


                });

                $("select#RNA_accion").html(nivtransact);

            },
            error: function (e) {
                console.log("Error en Etapa");

            }
        });
    })

    $("select#RNA_accion").change(function () {
        var xi = 0;
        var xj = 0;
        $('#AccionCabecera').empty();
        $('#AccionDetalle').empty();
        $("#btn_agregarRNAccion").prop("disabled", false);
        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/CamposCabeceraWS',
            data: JSON.stringify({
                idTipotransaccion: IdTipoTran,
                idAccion: $("select#RNA_accion").val(),
                idEtapa: $("select#RNA_etapa").val()
            }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {

                $.each(response, function (row, index) {
                    $.each(index.ListCamposTransaccion, function (r, arr) {
                        $('#AccionCabecera').append('<li class="ui-state-highlight draggable cabezeraIdTool_' + xi + '" id="' + arr.idCampo + '" >' + arr.nombreCampo + '</li>');

                    });
                });

                $(".sortable").sortable({
                    stop: function (event, ui) {
                        ui.item.addClass('dropped');
                    }

                });
                $(".draggable").draggable({
                    connectToSortable: ".sortable",
                    helper: "clone",
                    revert: 'invalid'
                });
                $('.trash').droppable({
                    drop: function (event, ui) {
                        if (!ui.draggable.hasClass('dropped')) return false;
                        ui.draggable.remove();
                    }
                });
                $(".cabezeraIdTool_" + xi).dblclick(function () {
                    var id = $(this).attr("id");
                    var makeTree;
                    $("#dialogReglaNA").dialog({
                        title: function (event, ui) {
                            $(".ui-dialog-title").css({
                                color: "#ffffff"
                            }).text('Campo Configurado');
                        },
                        width: 200,
                        modal: true,
                        draggable: false,
                        resizable: false,
                        show: "fold",
                        hide: "scale",
                        bgiframe: true,
                        position: 'center',
                        open: function (event, ui) {
                            $(".ui-dialog-titlebar-close", ui.dialog);
                        },
                    }).prev(".ui-dialog-titlebar").css({
                        background: "#5da6e1"
                    });


                    $.ajax({
                        async: false,
                        type: 'POST',
                        url: 'MyWebService.asmx/CattooltipWS',
                        data: JSON.stringify({
                            idTipoTransaccion: IdTipoTran,
                            idAccion: $("select#RNA_accion").val(),
                            idEtapa: $("select#RNA_etapa").val(),
                            idCampo: id
                        }),
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: function (response) {
                            makeTree = '';
                            makeTree += '<li class="parent_li"> <span><i class="fa fa-lg fa-plus-circle icon-minus-sign"></i> Configuracion</span> <ul>';

                            $.each(response, function (row, index) {

                                $.each(index.listaREgl, function (r, arr) {
                                    $("#editable").val(arr.editable);
                                    $("#visible").val(arr.visible);
                                    $("#obligatorio").val(arr.obligatorio);

                                    if (arr.editable) {
                                        makeTree += '<li> <span> <label class="checkbox inline-block"> <input type="checkbox" name="permisosBySon"  checked="' + arr.editable + '" disabled> <i></i> Editable </label> </span></li>';
                                    } else {
                                        makeTree += '<li> <span> <label class="checkbox inline-block"> <input type="checkbox" name="permisosBySon" disabled> <i></i> Editable</label> </span></li>';
                                    }
                                    if (arr.visible) {
                                        makeTree += '<li> <span> <label class="checkbox inline-block"> <input type="checkbox" name="permisosBySon" checked="' + arr.visible + '" disabled> <i></i> Visible </label> </span></li>';
                                    } else {
                                        makeTree += '<li> <span> <label class="checkbox inline-block"> <input type="checkbox" name="permisosBySon" disabled> <i></i> Visible </label> </span></li>';
                                    }
                                    if (arr.obligatorio) {
                                        makeTree += '<li> <span> <label class="checkbox inline-block"> <input type="checkbox" name="permisosBySon" checked="' + arr.obligatorio + '" disabled> <i></i> Obligatorio </label> </span></li>';
                                    } else {
                                        makeTree += '<li> <span> <label class="checkbox inline-block"> <input type="checkbox" name="permisosBySon" disabled> <i></i> Obligatorio </label> </span></li>';
                                    }


                                });
                                makeTree += '</ul></li>';


                            });

                            makeTree += '</ul></li>';
                            document.getElementById("menusforReglaTree").innerHTML = makeTree;
                            loadScript("js/plugin/bootstraptree/bootstrap-tree.min.js");

                            mostrarDialogReglaA()
                        }
                    });


                });

                xi++;
            }

        });
        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/CamposDetalleWS',
            data: JSON.stringify({
                idTipotransaccion: IdTipoTran,
                idAccion: $("select#RNA_accion").val(),
                idEtapa: $("select#RNA_etapa").val()
            }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {

                $.each(response, function (row, index) {
                    $.each(index.ListCamposTransaccion, function (r, arr) {
                        $('#AccionDetalle').append('<li class="ui-state-highlight draggable detalleIdTool_' + xi + '" id="' + arr.idCampo + '">' + arr.nombreCampo + '</li>');

                    });
                });

                $(".sortable").sortable({
                    stop: function (event, ui) {
                        ui.item.addClass('dropped');
                    }

                });
                $(".draggable").draggable({
                    connectToSortable: ".sortable",
                    helper: "clone",
                    revert: 'invalid'
                });
                $('.trash').droppable({
                    drop: function (event, ui) {
                        if (!ui.draggable.hasClass('dropped')) return false;
                        ui.draggable.remove();
                    }
                });
                $(".detalleIdTool_" + xi).dblclick(function () {
                    var id = $(this).attr("id");
                    var makeTree;
                    $("#dialogReglaNA").dialog({
                        title: function (event, ui) {
                            $(".ui-dialog-title").css({
                                color: "#ffffff"
                            }).text('Campo Configurado');
                        },
                        width: 200,
                        modal: true,
                        draggable: false,
                        resizable: false,
                        show: "fold",
                        hide: "scale",
                        bgiframe: true,
                        position: 'center',
                        open: function (event, ui) {
                            $(".ui-dialog-titlebar-close", ui.dialog);
                        },
                    }).prev(".ui-dialog-titlebar").css({
                        background: "#5da6e1"
                    });


                    $.ajax({
                        async: false,
                        type: 'POST',
                        url: 'MyWebService.asmx/CattooltipWS',
                        data: JSON.stringify({
                            idTipoTransaccion: IdTipoTran,
                            idAccion: $("select#RNA_accion").val(),
                            idEtapa: $("select#RNA_etapa").val(),
                            idCampo: id
                        }),
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: function (response) {
                            makeTree = '';
                            makeTree += '<li class="parent_li"> <span><i class="fa fa-lg fa-plus-circle icon-minus-sign"></i> Configuracion</span> <ul>';

                            $.each(response, function (row, index) {

                                $.each(index.listaREgl, function (r, arr) {
                                    $("#editable").val(arr.editable);
                                    $("#visible").val(arr.visible);
                                    $("#obligatorio").val(arr.obligatorio);

                                    if (arr.editable) {
                                        makeTree += '<li> <span> <label class="checkbox inline-block"> <input type="checkbox" name="permisosBySon" checked="' + arr.editable + '" disabled> <i></i> Editable </label> </span></li>';
                                    } else {
                                        makeTree += '<li> <span> <label class="checkbox inline-block"> <input type="checkbox" name="permisosBySon" disabled> <i></i> Editable</label> </span></li>';
                                    }
                                    if (arr.visible) {
                                        makeTree += '<li> <span> <label class="checkbox inline-block"> <input type="checkbox" name="permisosBySon" checked="' + arr.visible + '" disabled> <i></i> Visible </label> </span></li>';
                                    } else {
                                        makeTree += '<li> <span> <label class="checkbox inline-block"> <input type="checkbox" name="permisosBySon" disabled> <i></i> Visible </label> </span></li>';
                                    }
                                    if (arr.obligatorio) {
                                        makeTree += '<li> <span> <label class="checkbox inline-block"> <input type="checkbox" name="permisosBySon" checked="' + arr.obligatorio + '" disabled> <i></i> Obligatorio </label> </span></li>';
                                    } else {
                                        makeTree += '<li> <span> <label class="checkbox inline-block"> <input type="checkbox" name="permisosBySon" disabled> <i></i> Obligatorio </label> </span></li>';
                                    }


                                });
                                makeTree += '</ul></li>';


                            });

                            makeTree += '</ul></li>';
                            document.getElementById("menusforReglaTree").innerHTML = makeTree;
                            loadScript("js/plugin/bootstraptree/bootstrap-tree.min.js");

                            mostrarDialogReglaA()
                        }
                    });


                });
                xj++;
            }

        });
    })

}
// Funcion que llena los select de etapa del step ciclo de vida 
function SelectEtapasC() {
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/llenaComboSoloEtapas',
        dataType: 'json',
        data: JSON.stringify({
            idTipoTran: IdTipoTran
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var nivtransact = "";
            $.each(response, function (registro, row1) {

                nivtransact += '<option value="0" > Seleccione una etapa </option>';
                $.each(row1.listEtapas, function (i1, r1) {

                    nivtransact += '<option value="' + r1.idEtapa + '">' + r1.descripcion + '</option>';

                });


            });

            $("select#selectEtapa").html(nivtransact);
        },
        error: function (e) {
            console.log("Error en Etapa");

        }
    });

}
// Funcion que llena los select de categoria de los DataTable con select's dinamicos 
function SelectCatTT() {
    var categtransact = "";
    categtransact += '<option value="0" > Seleccione una categoría </option>';
    $("select#categoria").html(categtransact);
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/TiposTrans',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            //console.log(JSON.stringify(response));
            var cadena = "";
            $.each(response, function (row, index) {
                cadena += '<option value="' + 0 + '"> Seleccione una categoria </option>'
                $.each(index.ListaCategorias, function (r, arr) {
                    cadena += '<option value="' + arr.idCatTipoTransac + '">' + arr.categoriaTransac + '</option>'
                });
            });
            $("select#categoria").html(cadena);
            $("select#categorias").html(cadena);
        }

    });
}
// Funcion que llena los select de categoria de los DataTable con select's dinamicos y que crea dinamicamente los chagen de los select creados dinamicamente al igual con el select de tipo de Transaccion con su change dinamico
function SelectCatTTS(i) {
    var valor = '';
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/TiposTrans',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var categtransact = "";
            $.each(response, function (registro, row1) {

                categtransact += '<option value="0" > Seleccione una categoría </option>';
                $.each(row1.ListaCategorias, function (i1, r1) {

                    if (i1 == 0) {
                        categtransact += '<option value="' + r1.idCatTipoTransac + '" selected="selected">' + r1.categoriaTransac + '</option>';

                    } else {
                        categtransact += '<option value="' + r1.idCatTipoTransac + '" >' + r1.categoriaTransac + '</option>';

                    }

                });

            });

            $("select#categorias_" + i).html(categtransact);
            //alert(valor);
            //$("select#categorias_" + i).val(valor);

        },
        error: function (e) {
            console.log("error");

        }
    });


    $("body").on("change", "select#categorias_" + i, function () {

        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/camposTrans',
            data: JSON.stringify({
                idtipo: $("select#categorias_" + i).val()
            }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                var categtransact1 = "";
                $.each(response, function (registro, row1) {

                    categtransact1 += '<option value="0" > Seleccione una transacción </option>';
                    $.each(row1.camposCompTransac, function (i1, r1) {

                        categtransact1 += '<option value="' + r1.idTipoTransaccion + '">' + r1.descripcion + '</option>';
                    });


                });
                $("select#tipoTransacciones_" + i).html(categtransact1);
            }
        });
    });
    $("body").on("change", "select#tipoTransacciones_" + i, function () {
        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/CamposWS',
            dataType: 'json',
            data: JSON.stringify({
                idTipotransaccion: $("select#tipoTransacciones_" + i).val()
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                var categtransact = "";
                var categtransact2 = "";
                $.each(response, function (registro, row1) {

                    categtransact += '<option value="0" > Seleccione un campo </option>';
                    $.each(row1.ListCamposTransaccion, function (i1, r1) {
                        categtransact += '<option value="' + r1.nombreCampo + '">' + r1.nombreCampo + '</option>';
                    });

                    categtransact2 += '<option value="0" > Seleccione un campo </option>';
                    $.each(row1.ListCamposTransaccion, function (i1, r1) {

                        categtransact2 += '<option value="' + r1.nombreCampo + '">' + r1.nombreCampo + '</option>';
                    });


                });

                $("select#idReferencia_" + i).html(categtransact);
                $("select#nombreReferencia_" + i).html(categtransact2);
            },
            error: function (e) {
                console.log("error");

            }
        });
    });


}
// Funcion que llena los select de categoria de los DataTable con select's dinamicos y que crea dinamicamente los chagen de los select creados dinamicamente al igual con el select de tipo de Transaccion con su change dinamico
function SelectCatTTSAuto(i) {
    var valor = '';
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/TiposTrans',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var categtransact = "";
            $.each(response, function (registro, row1) {

                categtransact += '<option value="0" > Seleccione una categoría </option>';
                $.each(row1.ListaCategorias, function (i1, r1) {

                    if (i1 == 0) {
                        categtransact += '<option value="' + r1.idCatTipoTransac + '" selected="selected">' + r1.categoriaTransac + '</option>';

                    } else {
                        categtransact += '<option value="' + r1.idCatTipoTransac + '" >' + r1.categoriaTransac + '</option>';

                    }

                });

            });

            $("select#Autocategorias_" + i).html(categtransact);
            //alert(valor);
            //$("select#categorias_" + i).val(valor);

        },
        error: function (e) {
            console.log("error");

        }
    });


    $("body").on("change", "select#Autocategorias_" + i, function () {

        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/camposTrans',
            data: JSON.stringify({
                idtipo: $("select#Autocategorias_" + i).val()
            }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                var categtransact1 = "";
                $.each(response, function (registro, row1) {

                    categtransact1 += '<option value="0" > Seleccione una transacción </option>';
                    $.each(row1.camposCompTransac, function (i1, r1) {

                        categtransact1 += '<option value="' + r1.idTipoTransaccion + '">' + r1.descripcion + '</option>';
                    });


                });
                $("select#AutotipoTransacciones_" + i).html(categtransact1);
            }
        });
    });
    $("body").on("change", "select#AutotipoTransacciones_" + i, function () {
        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/CamposWS',
            dataType: 'json',
            data: JSON.stringify({
                idTipotransaccion: $("select#AutotipoTransacciones_" + i).val()
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                var categtransact = "";
                var categtransact2 = "";
                $.each(response, function (registro, row1) {

                    categtransact += '<option value="0" > Seleccione un campo </option>';
                    $.each(row1.ListCamposTransaccion, function (i1, r1) {
                        categtransact += '<option value="' + r1.nombreCampo + '">' + r1.nombreCampo + '</option>';
                    });

                    categtransact2 += '<option value="0" > Seleccione un campo </option>';
                    $.each(row1.ListCamposTransaccion, function (i1, r1) {

                        categtransact2 += '<option value="' + r1.nombreCampo + '">' + r1.nombreCampo + '</option>';
                    });


                });

                $("select#AutoidReferencia_" + i).html(categtransact);
                $("select#AutonombreReferencia_" + i).html(categtransact2);
            },
            error: function (e) {
                console.log("error");

            }
        });
    });
}
// Funcion que llena los select de tipo de dato  del step campos dinamicos
function SelectTipoDatTT() {
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
// Funcion que llena los select de nivel  del step campos dinamicos
function SelectNivelTT() {
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
// Funcion que llena los select de operacion  del step campos dinamicos
function SelectOperacionTT() {
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
// Funcion que llena los select de rol  del step ciclo de vida
function SelectRolesTT() {
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/rolesTransATT',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var roltransact = "";
            var roltransactList = "";
            $.each(response, function (registro, row1) {


                roltransact += '<option value="0" > Seleccione Rol </option>';
                $.each(row1.CamposRoles, function (i1, r1) {

                    roltransact += '<option value="' + r1.idRol + '">' + r1.nombreRol + '</option>';
                    roltransactList += '<li class="list-group-item-B">' + r1.nombreRol + '</li>';
                    arrayRol.push(r1.nombreRol);
                });


            });

            $("select#rn_perfil").html(roltransact);
            //$("select#rn2_perfil").html(roltransact);
            $("#t_roles").html(roltransactList);

        },
        error: function (e) {
            console.log("Error en Roles");

        }
    });
}
// Funcion que llena los select de rol  del step ciclo de vida
function SelectRolesEdit() {
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/rolesTransATT',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var roltransact = "";
            var roltransactList = "";
            $.each(response, function (registro, row1) {


                roltransact += '<option value="0" > Seleccione Rol </option>';
                $.each(row1.CamposRoles, function (i1, r1) {

                    roltransact += '<option value="' + r1.idRol + '">' + r1.nombreRol + '</option>';
                    roltransactList += '<li class="list-group-item-B">' + r1.nombreRol + '</li>';
                    arrayRol.push(r1.nombreRol);
                });


            });

            //$("select#rn2_perfil").html(roltransact);
            $("#t_roles").html(roltransactList);

        },
        error: function (e) {
            console.log("Error en Roles");

        }
    });
}
// Funcion que llena los select de areas  del step ciclo de vida
function SelectAreasTT() {
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
// Funcion que llena los select de visualizacion dinamicamente en step de reglas de negocion por campo
function SelectVisualizacion() {
    var conId = 0;
    var vistransact = "";
    for (var i = 0; i < idCampoDatoInsert.length; i++) {
        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/visualizacionTansATT',
            dataType: 'json',
            data: JSON.stringify({
                idTipoDatoCampo: idCampoDatoInsert[i]
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                vistransact = "";

                $.each(response, function (registro, row1) {


                    vistransact += '<option value="0" > Seleccione el tipo de dato </option>';
                    $.each(row1.CamposVisualizacion, function (i1, r1) {
                        vistransact += '<option value="' + r1.idVisualizacion + '">' + r1.descripcion + '</option>';

                    });


                });

                $("select#visualizacion_" + conId).html(vistransact);
                conId++;



            },
            error: function (e) {
                console.log("Error en TiposVisualización");

            }
        });
    }

}
// Funcion que llena los select de visualizacion dinamicamente en step de reglas de negocion por campo al editar
function SelectVisualizacionEdit(id) {
    var conId = 0;
    var vistransact = "";
    var validar = "";
    for (var i = 0; i < idCampoDatoInsert.length; i++) {

        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/visualizacionTansATT',
            dataType: 'json',
            data: JSON.stringify({
                idTipoDatoCampo: idCampoDatoInsert[i]
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                vistransact = "";

                $.each(response, function (registro, row1) {


                    vistransact += '<option value="0" > Seleccione el tipo de dato </option>';
                    $.each(row1.CamposVisualizacion, function (i1, r1) {
                        //console.log(i1 + "-----" + r1.descripcion + "-----" + r1.idArea)

                        vistransact += '<option value="' + r1.idVisualizacion + '">' + r1.descripcion + '</option>';

                    });


                });

                $("select#visualizacion_" + id).html(vistransact);

                conId++;
            },
            error: function (e) {
                console.log("Error en TiposVisualización");

            }
        });
    }
}

function SelectProcesosTT(idArea) {

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

function AreaProceso() {
    $("#area").change(function () {
        $('select#proceso').prop('disabled', false);
        SelectProcesosTT($('#area').val());
    });
}

function GuardarTransaccion() {
    var val = [];
    var nombre = [];
    var con = 0;

    var jsonInsert = '';
    var union = '[{';
    var unionN = '';
    var tamaño = 0;

    jsonInsert += '{';

    jsonInsert += '"idTipoTransaccion":1,';
    jsonInsert += '"descripcion":"' + $("#nombre").val() + '",';
    jsonInsert += '"cveTipoTransaccion":"' + $("#clave").val() + '",';
    jsonInsert += '"activo": 1,';
    jsonInsert += '"idProceso":' + $("#proceso").val() + ',';
    jsonInsert += '"idCatTipoTransac":' + $("#categoria").val() + ',';

    jsonInsert += '"Campos":';
    jsonInsert += "";
    jsonInsert += campos;
}

function EtapasAcciones() {

    var val = [];
    var nombre = [];
    var con = 0;

    var jsonInsert = '';
    var union = '[{';
    var unionN = '';
    var tamaño = 0;

    $.each($('#tablaRoles th'), function (index, item) {


        nombre.push($(item).text());

    });

    $.each($('#tablaRoles td'), function (index1, item1) {

        val.push($(item1).text());
    });

    for (var i = 0; i < val.length; i++) {
        union += '"' + nombre[con] + '":"' + val[i] + '"';
        if (con < nombre.length - 1) {
            union += ",";
            con++;

        } else {
            union += '},'
            union += '{';
            con = 0;
        }
    }

    tamaño = union.length;
    unionN = union.substring(0, (tamaño - 3));

    unionN += '}]';


    accionesEtapas = unionN;

    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/InsertAcciones',
        data: JSON.stringify({
            idTipoTran: IdTipoTran,
            claveAccion: $('#claveAccion').val(),
            descripcion: $('#nombreAccion').val(),
            orden: $('#ordenAccion').val()

        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {

            $.ajax({
                async: false,
                type: 'POST',
                url: 'MyWebService.asmx/InsertAccEtap',
                data: JSON.stringify({
                    idTipoTransaccion: IdTipoTran,
                    idEtapa: $('#selectEtapa').val(),
                    NomAccion: $('#nombreAccion').val()

                }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (response) {
                    for (var i = 0; i < roooll.length; i++) {

                        $.ajax({
                            async: false,
                            type: 'POST',
                            url: 'MyWebService.asmx/InsertEtapasAccRol',
                            data: JSON.stringify({
                                idTipoTransaccion: IdTipoTran,
                                nomEtapa: $('#selectEtapa').val(),
                                NomAccion: $('#nombreAccion').val(),
                                nombreRol: roooll[i]
                            }),
                            dataType: 'json',
                            contentType: 'application/json; charset=utf-8',
                            success: function (response) {

                            }
                        });

                    }
                    $.smallBox({
                        title: "Éxito!",
                        content: "Acción <b>" + $("#nombreAccion").val() + "</b> agregada",
                        color: "#739e73",
                        timeout: 2000,
                        icon: "fa fa-thumbs-up swing animated"
                    });
                    var arr = $("#form_acciones").serializeArray();
                    var datosC = [];
                    $.fn.dataTable.ext.errMode = 'none';
                    var responsiveHelper_datatable_fixed_column = undefined;
                    var breakpointDefinition = {
                        "tablet": 1024,
                        "phone": 480,
                        "desktop": 1260
                    };


                    var datosCom = [];


                    idEtapa = $("#selectEtapa").val();
                    $('#Tabla_Rol').show();
                    InitDataTableRol();


                    Reset();
                    $('#form_acciones').bootstrapValidator('destroy');
                    $('input#nombreAccion').css({
                        'background-color': '#fff'
                    });
                    $('input#claveAccion').css({
                        'background-color': '#fff'
                    });
                    $('input#ordenAccion').css({
                        'background-color': '#fff'
                    });

                }
            });
        }
    });

}

function AgregarFormula() {
    $('#btn_agregarFormula').click(function () {
        bootsVal();
        $('#form_reglas').data('bootstrapValidator').validate();
        var n = $('#form_reglas').data('bootstrapValidator').isValid();

        if (n) {

            if ($('.sortable li').length > 0) {
                $("#select#fomula_Init").prop("disabled", true);
                $('#tablaFormulas tbody').removeClass('selected');
                $('#tablaFormulas tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    } else {
                        otable2.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });

                $(".btn-next").prop("disabled", false);

                var val = [];
                var nombre = [];
                var con = 0;

                var jsonInsert = '';
                var union = '[{';
                var unionN = '';
                var unionF = '';
                var tamaño = 0;
                var contadorf = 0;
                var bandera1 = false;
                var bandera2 = false;
                var bandera3 = false;


                $.each($('.sortable li'), function (index1, item1) {
                    contadorf++

                    var p1 = $.trim($(item1).text());

                    if (contadorf == 1 && /ab*/.test(p1) == true) {bandera1 = true;}               
                    if (contadorf == 2 && p1 == "=") { bandera2 = true; }
                    console.log(contadorf);
                    if (contadorf == 3 && p1 != "=" && p1 != "+" && p1 != "-" && p1 != "*" && p1 != "%" && p1 != ".") { bandera3 = true; }
                    
                    val.push($.trim($(item1).text()));
                });

                if (bandera1 == true && bandera2 == true && bandera3 == true) {


            for (var i = 0; i < val.length; i++) {
                union += val[i] + '|';
                unionF += val[i] + '|';
            }



            union += '}]';


            formulaA = union;

            $.fn.dataTable.ext.errMode = 'none';
            var responsiveHelper_datatable_fixed_column = undefined;
            var breakpointDefinition = {
                tablet: 1024,
                phone: 480,
                desktop: 1260
            };
            var datosCom = [];
            var valorF = "";
            var varF = '';
            var resultadoF = "";
            var formulas = [];

            formulaArr = [];
            etapaArr = [];
            accionesArr = [];
            formulaArr.push(unionF);
            etapaArr.push($('select#formula_etapa option:selected').text());
            accionesArr.push($('select#fomula_accion option:selected').text());

            for (var i = 0; i < formulaArr.length; i++) {
                datosCom.push(formulaArr, etapaArr, accionesArr);
            }



            otableF = $('#tablaFormulas')
                .DataTable({

                    "scrollY": "200px",
                    "scrollCollapse": true,
                    "paging": false,

                    "sPaginationType": "bootstrap", // full_numbers
                    "iDisplayStart ": 10,
                    "iDisplayLength": 10,
                    "bPaginate": false, //hide pagination
                    "bFilter": false, //hide Search bar
                    "bInfo": false, // hide showing entries
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
                                $('#tablaFormulas'), breakpointDefinition);
                        }
                    },
                    "rowCallback": function (nRow) {
                        responsiveHelper_datatable_fixed_column
                            .createExpandIcon(nRow);
                    },
                    "drawCallback": function (oSettings) {
                        responsiveHelper_datatable_fixed_column.respond();
                    },

                    columns: [{
                        title: "Fórmula"
                    },
                    {
                        title: "Etapa"
                    },
                    {
                        title: "Acción"
                    }
                    ]
                });
            otableF.row.add(datosCom).draw(false);

            $('#tablaFormulas tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                } else {
                    otable2.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });

            $(".sortable").empty();
            $("#btnFormulas").show();


        } else {


            $.smallBox({
                title: "Error",
                content: "<i class='fa fa-clock-o'></i> <i>La estructura de la formula es inadecuada</i>",
                color: "#C46A69",
                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                timeout: 4000
            });
            contadorf = 0;
        }

    }else{

    $.smallBox({
    title: "Error",
    content: "<i class='fa fa-clock-o'></i> <i> No ha configurado ninguna fórmula</i>",
    color: "#C46A69",
    iconSmall: "fa fa-times fa-2x fadeInRight animated",
    timeout: 4000
});


}
            $('#form_reglas').bootstrapValidator('destroy');

        }

    });


}

function AgregarReglaAccion() {
    $('#btn_agregarRNAccion').click(function () {


        var data = otableRA.rows().data();
        $('#RN_Accion').bootstrapValidator('destroy');
        console.log(ArregloValidarAccionesEdit);
        if (jQuery.inArray($('select#RNA_accion option:selected').text(), ArregloValidarAccionesEdit) !== -1) {
            $.smallBox({
                title: "Error",
                content: "<i class='fa fa-clock-o'></i> <i>No se puede agregar mas reglas de la accion " + $('select#RNA_accion option:selected').text() + "</i>",
                color: "#C46A69",
                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                timeout: 4000
            });
            $("#btn_agregarRNAccion").prop("disabled",false);
        } else {
            bootsVal();
            $('#RN_Accion').data('bootstrapValidator').validate();
            var n = $('#RN_Accion').data('bootstrapValidator').isValid();
            ArregloValidarAccionesEdit.push($('select#RNA_accion option:selected').text());

            if (n) {

                if ($('#Rn_AccionConfig').text() != "" || $('#Rn_AccionConfig').text() != '') {
                    if ($('#Rn_AccionConfigAlterna').text() != "" || $('#Rn_AccionConfigAlterna').text() != '') {

                        $("#select#RNA_EtapaFinal").prop("disabled", true);
                        $('#tablaRelasAccion tbody').removeClass('selected');
                        $('#tablaRelasAccion tbody').on('click', 'tr', function () {
                            if ($(this).hasClass('selected')) {
                                $(this).removeClass('selected');
                            } else {
                                otable2.$('tr.selected').removeClass('selected');
                                $(this).addClass('selected');
                            }
                        });

                        $(".btn-next").prop("disabled", false);

                        var val = [];
                        var nombre = [];
                        var con = 0;

                        var jsonInsert = '';
                        var union = '[{';
                        var unionN = '';
                        var unionF = '';
                        var tamaño = 0;

                        $.each($('.sortable li'), function (index1, item1) {


                            val.push($.trim($(item1).text()));

                        });

                        for (var i = 0; i < val.length; i++) {
                            union += val[i] + '|';
                            unionF += val[i] + '|';
                        }

                        union += '}]';

                        formulaA = union;

                        $.fn.dataTable.ext.errMode = 'none';
                        var responsiveHelper_datatable_fixed_column = undefined;
                        var breakpointDefinition = {
                            tablet: 1024,
                            phone: 480,
                            desktop: 1260
                        };
                        var datosCom = [];
                        var valorF = "";
                        var varF = '';
                        var resultadoF = "";
                        var formulas = [];

                        //Tabla mayo
                        var mensajeSuccess = [];
                        var mensajeError = [];
                        var validacionPrincipal = [];
                        var validacionAlterna = [];



                        formulaArr = [];
                        etapaArr = [];
                        accionesArr = [];

                        etapaFuturaArr = [];
                        formulaArr.push(unionF);
                        etapaArr.push($('select#RNA_etapa option:selected').text());
                        accionesArr.push($('select#RNA_accion option:selected').text());
                        ArregloValidarAcciones.push($('select#RNA_accion option:selected').text());
                        etapaFuturaArr.push($("select#RNA_EtapaFinal option:selected").text());

                        mensajeSuccess.push($("#mensajeSuccess").val());
                        mensajeError.push($("#mensajeError").val());

                        console.log("$('#Rn_AccionConfig'): ");
                        console.log($('#Rn_AccionConfig'));
                        var auxString = "";
                        var validacionPrincipalFinal = new Array();
                        $.each($('#Rn_AccionConfig'), function (j, item) {
                            for (var i = 0; i < $(item).text().length; i++) {

                                char = $(item).text().charAt(i);

                                //if (char == 'e') {

                                //    char = $(item).text().substring(i, i + 4);
                                //    i = i + 4;
                                //    auxString += char;
                                //} else if (char == 'i') {
                                //    char = $(item).text().substring(i, i + 2);
                                //    i = i + 2;
                                //    auxString += char;
                                //} else if (char == 't') {
                                //    char = $(item).text().substring(i, i + 4);
                                //    i = i + 4;
                                //    auxString += char;
                                //} else if (char == 'f') {
                                //    char = $(item).text().substring(i, i + 5);
                                //    i = i + 5;
                                //    auxString += char;
                                //}
                                if (jQuery.inArray(char, arrayOperaciones) != -1) {
                                    auxString += char;
                                } 
    
                            }
           
                        });
                        console.log("auxString1: ");
                        console.log(auxString);
                        validacionPrincipal.push(auxString);


                        //var unionValidacionP = "";
                        //$.each($('#Rn_AccionConfig'), function (index1, item1) {
                        //        unionValidacionP += $.trim($(item1).text());
                        //});
                        //validacionPrincipal.push(unionValidacionP);
                        //console.log(validacionPrincipal);


                        var unionValidacionA = "";
                        $.each($('#Rn_AccionConfigAlterna'), function (index1, item1) {                           
                            for (var i = 0; i < $(item1).text().length; i++) {
                                char = $(item1).text().charAt(i);
                              
                                //if (char == 'e') {
                                //    char = $(item1).text().substring(i, i + 4);
                                //    i = i +4;
                                //    unionValidacionA += char;
                                //}else if (char == 'i') {
                                //    char = $(item1).text().substring(i, i + 2);
                                //    i = i +2;
                                //    unionValidacionA += char;                                 
                                //}else if (char == 't') {
                                //    char = $(item1).text().substring(i, i + 4);
                                //    i = i + 4;
                                //    unionValidacionA += char;                                 
                                //}else if (char == 'f') {
                                //    char = $(item1).text().substring(i, i + 5);
                                //    i = i + 5;
                                //    unionValidacionA += char;      
                                //}
                                if (jQuery.inArray(char, arrayOperaciones) != -1) {
                                    unionValidacionA += char;
                                }

                            }
                        });
                        validacionAlterna.push(unionValidacionA);
                        

                        //var char = '', auxString = "";
                        //for (var i = 0; i < validacionPrincipal[0].length; i++){
                        //    char = validacionPrincipal[0].charAt(i);
                        //    console.log("char: " + "'"+char+"'");
                        //      if (char != '') {
                        //          auxString += char;
                        //      }
                        //}
                        //console.log("auxString: " + auxString);
                        //validacionPrincipal = auxString;

                        console.log("validacionPrincipal: " + validacionPrincipal);
                        console.log("validacionAlterna: " + validacionAlterna);
                        for (var i = 0; i < formulaArr.length; i++) {
                            datosCom.push(etapaArr, etapaFuturaArr, accionesArr, validacionPrincipal, validacionAlterna, mensajeSuccess, mensajeError);
                        }


                        otableRA = $('#tablaRelasAccion')
                            .DataTable({

                                "scrollY": "200px",
                                "scrollCollapse": true,
                                "paging": false,

                                "sPaginationType": "bootstrap", // full_numbers
                                "iDisplayStart ": 10,
                                "iDisplayLength": 10,
                                "bPaginate": false, //hide pagination
                                "bFilter": false, //hide Search bar
                                "bInfo": false, // hide showing entries
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
                                            $('#tablaRelasAccion'), breakpointDefinition);
                                    }
                                },
                                "rowCallback": function (nRow) {
                                    responsiveHelper_datatable_fixed_column
                                        .createExpandIcon(nRow);
                                },
                                "drawCallback": function (oSettings) {
                                    responsiveHelper_datatable_fixed_column.respond();
                                },

                                columns: [
                                    {
                                        title: "Etapa"
                                    },
                                    {
                                        title: "Etapa futura"
                                    },
                                    {
                                        title: "Acción"
                                    },
                                    {
                                        title: "Validacion principal"
                                    },
                                    {
                                        title: "Validacion alterna"
                                    },
                                    {
                                        title: "Mensaje success"
                                    },
                                    {
                                        title: "Mensaje error"
                                    }
                                ]
                            });
                        otableRA.row.add(datosCom).draw(false);
                        $('#reglaPorAccion').show();
                        $('#tablaRelasAccion tbody').on('click', 'tr', function () {
                            console.log("si");
                            if ($(this).hasClass('selected')) {
                                $(this).removeClass('selected');
                            } else {
                                otableRA.$('tr.selected').removeClass('selected');
                                $(this).addClass('selected');
                            }
                        });

                        $(".sortable").empty();
                        $("#btnReglasNAcciones").show();

                    } else {
                        $.smallBox({
                            title: "Error",
                            content: "<i class='fa fa-clock-o'></i> <i>No ha configurado ninguna regla por accion Alterna</i>",
                            color: "#C46A69",
                            iconSmall: "fa fa-times fa-2x fadeInRight animated",
                            timeout: 4000
                        });
                    }



                } else {
                    $.smallBox({
                        title: "Error",
                        content: "<i class='fa fa-clock-o'></i> <i>No ha configurado ninguna regla por accion Principal</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 4000
                    });
                }


                $('#RN_Accion').bootstrapValidator('destroy');

            } else {
                // bootsVal();

            }
        }



    });
}

function bootsVal() {

    //$('#form_transaccion').bootstrapValidator('destroy');
    $('#form_transaccion').bootstrapValidator({
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

    $('#form_campos').bootstrapValidator('destroy');
    $('#form_campos').bootstrapValidator({
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

    $('#dialog').bootstrapValidator({
        live: 'enabled',

        submitButtons: 'button[id="btnEditComplementD"]',
        feedbackIcons: {

        },
        //valid: 'glyphicon glyphicon-ok',
        //invalid: 'glyphicon glyphicon-remove',
        //validating: 'glyphicon glyphicon-refresh',
        excluded: ':disabled',
        fields: {

            nombreCampo: {
                selector: '#nombreCampoD',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: 'El nombre del campo es obligatorio'
                    }
                }
            },
            descCampo: {
                selector: '#descCampoD',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: 'La descripción es obligatoria'
                    }

                }
            },
            longitudD: {
                selector: '#longitudD',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: 'La longitud es obligatoria'
                    },

                }
            },


            tipoDatoD: {
                excluded: false,
                selector: '#tipoDatoD',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#tipoDatoD').val();
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
            nivelD: {
                excluded: false,
                selector: '#nivelD',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#nivelD').val();
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
            tipoOperacionD: {
                excluded: false,
                selector: '#tipoOperacionD',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#tipoOperacionD').val();
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

    $('#form_ciclo').bootstrapValidator('destroy');
    $('#form_ciclo').bootstrapValidator({
        live: 'enabled',
        submitButtons: 'button[id="btn_agregarOrden"]',
        feedbackIcons: {
            //valid: 'glyphicon glyphicon-ok',
            //invalid: 'glyphicon glyphicon-remove',
            //validating: 'glyphicon glyphicon-refresh'
        },
        //valid: 'glyphicon glyphicon-ok',
        //invalid: 'glyphicon glyphicon-remove',
        //validating: 'glyphicon glyphicon-refresh',
        fields: {
            nombreEtapa: {
                selector: '#nombreEtapa',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: 'El nombre es obligatorio'
                    }
                }
            },
            orden: {
                selector: '#orden',
                group: '.col-2',
                validators: {
                    notEmpty: {
                        message: 'El orden es obligatorio'
                    }
                }
            },


        }

    });

    $('#dialog2').bootstrapValidator({
        live: 'enabled',
        submitButtons: 'button[id="btnEditEtapaD"]',
        feedbackIcons: {
            //valid: 'glyphicon glyphicon-ok',
            //invalid: 'glyphicon glyphicon-remove',
            //validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            descripcionE: {
                selector: '#nombreEtapaD',
                group: '.col-5',
                validators: {
                    notEmpty: {
                        message: 'El nombre es obligatorio'
                    }
                }
            },
            ordenE: {
                selector: '#ordenD',
                group: '.col-5',
                validators: {
                    notEmpty: {
                        message: 'El orden es obligatorio'
                    }
                }
            },


        }

    });


    $('#form_acciones').bootstrapValidator({
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
            nombreAccion: {
                selector: '#nombreAccion',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: 'El nombre de la acción es obligatoria'
                    }
                }
            },
            claveAccion: {
                selector: '#claveAccion',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: 'La clave de la acción es obligatoria'
                    }
                }
            },
            ordenAccion: {
                selector: '#ordenAccion',
                group: '.col-2',
                validators: {
                    notEmpty: {
                        message: 'El orden de la acción es obligatoria'
                    }
                }
            },


            selectEtapa: {
                excluded: false,
                selector: '#selectEtapa',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#selectEtapa').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'La etapa es obligatoria'
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

    $('#dialog3').bootstrapValidator({
        live: 'enabled',
        submitButtons: 'button[id="btnEditRolD3"]',
        feedbackIcons: {
            //valid: 'glyphicon glyphicon-ok',
            //invalid: 'glyphicon glyphicon-remove',
            //validating: 'glyphicon glyphicon-refresh'
        },
        //valid: 'glyphicon glyphicon-ok',
        //invalid: 'glyphicon glyphicon-remove',
        //validating: 'glyphicon glyphicon-refresh',
        fields: {
            nombreAccionD: {
                selector: '#nombreAccionD',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: 'El nombre de la acción es obligatoria'
                    }
                }
            },
            claveAccionD: {
                selector: '#claveAccionD',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: 'La clave de la acción es obligatoria'
                    }
                }
            },
            ordenAccionD: {
                selector: '#ordenAccionD',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: 'El orden de la acción es obligatoria'
                    }
                }
            }

        }

    });


    $('#form_RN2').bootstrapValidator({
        live: 'enabled',
        submitButtons: 'button[id="btn_agregarRN2"]',
        feedbackIcons: {
            //valid: 'glyphicon glyphicon-ok',
            //invalid: 'glyphicon glyphicon-remove',
            //validating: 'glyphicon glyphicon-refresh'
        },
        //valid: 'glyphicon glyphicon-ok',
        //invalid: 'glyphicon glyphicon-remove',
        //validating: 'glyphicon glyphicon-refresh',
        fields: {
            rn2_etapa: {
                excluded: false,
                selector: '#rn2_etapa',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#rn2_etapa').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'La etapa es obligatoria'
                                };
                            } else {

                                return true;

                            }

                        }
                    }
                }
            },
            rn2_accion: {
                excluded: false,
                selector: '#rn2_accion',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#rn2_accion').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'La acción es obligatoria'
                                };
                            } else {

                                return true;

                            }

                        }
                    }
                }
            },
            visualizacion: {
                group: '.boosSelect',
                validators: {
                    notEmpty: {
                        message: 'El tipo de visualización es obligatorio'
                    },

                }
            }


        }

    });



    $('#form_reglas').bootstrapValidator({
        live: 'enabled',
        submitButtons: 'button[id="btn_agregarFormula"]',
        feedbackIcons: {
            //valid: 'glyphicon glyphicon-ok',
            //invalid: 'glyphicon glyphicon-remove',
            //validating: 'glyphicon glyphicon-refresh'
        },
        //valid: 'glyphicon glyphicon-ok',
        //invalid: 'glyphicon glyphicon-remove',
        //validating: 'glyphicon glyphicon-refresh',
        fields: {
            formula_etapa: {
                excluded: false,
                selector: '#formula_etapa',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#formula_etapa').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'La etapa es obligatoria'
                                };
                            } else {

                                return true;

                            }

                        }
                    }
                }
            },
            fomula_accion: {
                excluded: false,
                selector: '#fomula_accion',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#fomula_accion').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'La acción es obligatoria'
                                };
                            } else {

                                return true;

                            }

                        }
                    }
                }
            },
            fomula_Init: {
                excluded: false,
                selector: '#fomula_Init',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#fomula_Init').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'El campo es obligatorio'
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

    $('#form_Combo').bootstrapValidator({
        live: 'enabled',
        submitButtons: 'button[id="btn_agregarCombo"]',
        feedbackIcons: {
            //valid: 'glyphicon glyphicon-ok',
            //invalid: 'glyphicon glyphicon-remove',
            //validating: 'glyphicon glyphicon-refresh'
        },
        //valid: 'glyphicon glyphicon-ok',
        //invalid: 'glyphicon glyphicon-remove',
        //validating: 'glyphicon glyphicon-refresh',
        fields: {
            Combo_etapa: {
                excluded: false,
                selector: '#Combo_etapa',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#Combo_etapa').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'La etapa es obligatoria'
                                };
                            } else {

                                return true;

                            }

                        }
                    }
                }
            },
            Combo_accion: {
                excluded: false,
                selector: '#Combo_accion',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#Combo_accion').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'La acción es obligatoria'
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

    $('#RN_Accion').bootstrapValidator({
        live: 'enabled',
        submitButtons: 'button[id="btn_agregarRNAccion"]',
        feedbackIcons: {
            //valid: 'glyphicon glyphicon-ok',
            //invalid: 'glyphicon glyphicon-remove',
            //validating: 'glyphicon glyphicon-refresh'
        },
        //valid: 'glyphicon glyphicon-ok',
        //invalid: 'glyphicon glyphicon-remove',
        //validating: 'glyphicon glyphicon-refresh',
        fields: {
            RNA_etapa: {
                excluded: false,
                selector: '#RNA_etapa',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#RNA_etapa').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'La etapa es obligatoria'
                                };
                            } else {

                                return true;

                            }

                        }
                    }
                }
            },
            RNA_accion: {
                excluded: false,
                selector: '#RNA_accion',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#RNA_accion').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'La acción es obligatoria'
                                };
                            } else {

                                return true;

                            }

                        }
                    }
                }
            },
            RNA_EtapaFinal: {
                excluded: false,
                selector: '#RNA_EtapaFinal',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#RNA_EtapaFinal').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'La etapa es obligatoria'
                                };
                            } else {

                                return true;

                            }

                        }
                    }
                }
            },
            mensajeSuccess: {
                excluded: false,
                selector: '#mensajeSuccess',
                group: '.col-6',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#mensajeSuccess').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'El mensaje de confirmacion de exito es obligatorio'
                                };
                            } else {

                                return true;

                            }

                        }
                    }
                }
            },
            mensajeError: {
                excluded: false,
                selector: '#mensajeError',
                group: '.col-6',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#mensajeError').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'El mensaje de confirmacion de error es obligatorio'
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

    $('#form_Autocompletar').bootstrapValidator({
        live: 'enabled',
        submitButtons: 'button[id="btn_agregarAutocompletar"]',
        feedbackIcons: {
            //valid: 'glyphicon glyphicon-ok',
            //invalid: 'glyphicon glyphicon-remove',
            //validating: 'glyphicon glyphicon-refresh'
        },
        //valid: 'glyphicon glyphicon-ok',
        //invalid: 'glyphicon glyphicon-remove',
        //validating: 'glyphicon glyphicon-refresh',
        fields: {
            Autocompletar_etapa: {
                excluded: false,
                selector: '#Autocompletar_etapa',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#Autocompletar_etapa').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'La etapa es obligatoria'
                                };
                            } else {

                                return true;

                            }

                        }
                    }
                }
            },
            Autocompletar_accion: {
                excluded: false,
                selector: '#Autocompletar_accion',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#Autocompletar_accion').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'La acción es obligatoria'
                                };
                            } else {

                                return true;

                            }

                        }
                    }
                }
            },
            Autocompletar_Combo: {
                excluded: false,
                selector: '#Autocompletar_Combo',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#Autocompletar_Combo').val();
                            if (valor == 0 || valor == null) {
                                return {
                                    valid: false,
                                    message: 'El campo es obligatorio'
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

function initEventos() {
    OcultarDialogCompl();
    OcultarDialogEtapa();
    OcultarDialogEtaRol();
    OcultarDialogReglaA();
    $(".sortable").sortable({
        stop: function (event, ui) {
            ui.item.addClass('dropped');
        }

    });

    $(".draggable").draggable({
        connectToSortable: ".sortable",
        helper: "clone",
        revert: 'invalid'
    });

    $('.trash').droppable({
        drop: function (event, ui) {
            if (!ui.draggable.hasClass('dropped')) return false;
            ui.draggable.remove();
        }
    });
    $("#operadorMatematico").hide();
    $("#operadorLogicas").hide();
    $("#Opeador_opcion").change(function () {
        if ($("#Opeador_opcion").val() == 1) {
            $("#operadorMatematico").hide();
            $("#operadorLogicas").show();
        } else if ($("#Opeador_opcion").val() == 2) {
            $("#operadorMatematico").show();
            $("#operadorLogicas").hide();
        }
    })
    InitDataTableComobobox();

    $('#nombreCampo').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#nombre').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#clave').bind("cut copy paste", function (e) {
        e.preventDefault();
    });

    $('#nombreCampoD').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#longitud').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#longitudD').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#descCampo').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#descCampo').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#nombreEtapa').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#orden').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#nombreAccion').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#claveAccion').bind("cut copy paste", function (e) {
        e.preventDefault();
    });
    $('#ordenAccion').bind("cut copy paste", function (e) {
        e.preventDefault();
    });

    $("#area").change(function () {
        if ($("#proceso").val() != 0) {
            $("#proceso").val(0);
            $('#form_transaccion').bootstrapValidator('destroy');
            bootsVal();
        }
        if ($("#proceso").val() == 0) {
            $("#proceso").val(0);
            $('#form_transaccion').bootstrapValidator('destroy');
            bootsVal();
        }
    })

    $("#Icono1").hide();
    $("#Icono2").hide();
    $("#Icono3").hide();
    $("#Icono4").hide();
    $("#Icono5").hide();
    $("#Icono6").hide();
    $("#Icono7").hide();
    $("#Icono8").hide();

    $("#Icon1").hide();
    $("#Icon2").hide();
    $("#Icon3").hide();
    $("#Icon4").hide();
    $("#Icon5").hide();
    $("#Icon6").hide();
    $("#Icon7").hide();
    $("#Icon8").hide();
    selectCombobox();

    $('#tabla_Comp').hide();
    $('#TDEtapas').hide();
    $('#Tabla_Rol').hide();
    $('#Tabla_formula').hide();
    $('#reglaPorAccion').hide();
    $('.trnc').hide();
    $('#btn_agregarRN2').hide();
    $('#examples').hide();
    $('#btn_agregarCombo').hide();
    $('#DTAutocompletar').hide();
    $('#btn_agregarAutocompletar').hide();

    $('#fomula_Init').val(0).trigger('change');

    $('#form_reglas').bootstrapValidator('destroy');

    $('#longitud').keyup(function () {
        if ($('#longitud').val() != '') {
            $('#longi').removeClass("has-error");

            $("#longi small").attr("data-bv-result", "VALID");
            $("#longi small").attr("style", "display: none;");
            $('#longi').addClass("has-success");

            $("#longi input").attr("data-bv-excluded", 'true');
        } else {
            $('#longi').removeClass("has-success");

            $("#longi small").attr("data-bv-result", "INVALID");
            $("#longi small").attr("style", "");
            $('#longi').addClass("has-error");

            $("#longi input").attr("data-bv-excluded", 'false');
        }
    });

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

    $("#nombreCampoDP").hide();
    $("#campoUps").hide();
    $("#campoUps2").hide();
    $(".des").hide();
    $(".des2").hide();
    $("#btn_agregarFormulaEF").hide();

    $("#selectEtapa").change(function () {
        idEtapa = $("#selectEtapa").val();
        InitDataTableRol();


    });

    $("#btnFormulas").hide();
    $("#btnReglasNAcciones").hide();
    $('#btn_agregarTransaccion').click(function () {

        bootsVal();
        $('#form_transaccion').data('bootstrapValidator').validate();
        var n = $('#form_transaccion').data('bootstrapValidator').isValid();
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
                    $.smallBox({
                        title: "Éxito!",
                        content: "Categoría <b>" + $("#nombre").val() + "</b> creada",
                        color: "#739e73",
                        timeout: 2000,
                        icon: "fa fa-thumbs-up swing animated"
                    });
                    $(".btn-next").prop("disabled", false)
                }
            });


            $('#btn_agregarTransaccion').hide();


            $('#form_transaccion').bootstrapValidator('destroy');

        } else {
            //bootsVal();
        }

    });
    $('#btnPlus').click(function () {
        $('#tablaComplementarios tbody').removeClass('selected');
        $('#tablaEtapas tbody').removeClass('selected');

        botonRnC = botonRnC + 2;

        $('#btn_EditTransaccion').prop("disabled", false);

        var valores = '';

        $('#divTiposTransaccion').hide();
        $('#divCrearTransaccion').show();
        $("#btn_EditTransaccion").hide();
        $('#btnEditComplement').hide();
        $('#btnDeleteComplement').hide();
        $('#btnEditEtapa').hide();
        $('#btnDeleteEtapa').hide();
        $(".btn-next").prop("disabled", true);
        ResetPlus();
        $('#btn_agregarTransaccion').show();
        $('#CamposComp').hide();

        $('#btnEditComplement').hide();
        $('#btnDeleteComplement').hide();
        $('#tabla_Comp').hide();
        $('#TDEtapas').hide();


        $('#form_campos').bootstrapValidator('destroy');
        $('#form_ciclo').bootstrapValidator('destroy');
        $('#form_acciones').bootstrapValidator('destroy');
        $('#form_RN2').bootstrapValidator('destroy');
        $('#form_Autocompletar').bootstrapValidator('destroy');
        $('#RN_Accion').bootstrapValidator('destroy');
        $('#form_Combo').bootstrapValidator('destroy');
        $('#form_reglas').bootstrapValidator('destroy');
        $('#form_transaccion').bootstrapValidator('destroy');


        $('#smartWizard').wizard('selectedItem', { // mover wizard a
            // paso2
            step: 1
        });
        bootsVal();




    });
    $('#btnAtras').click(function () {
        $('#btn_EditTransaccion').prop("disabled", false);

        $('#divTiposTransaccion').show();
        $('#divCrearTransaccion').hide();

        $('#tabla_Comp').hide();
        $('#TDEtapas').hide();
        $('#Tabla_Rol').hide();
        $('#Tabla_formula').hide();
        $('#reglaPorAccion').hide();
        $('.trnc').hide();
        $('#btn_agregarRN2').hide();
        $('#examples').hide();

        $('#btn_agregarCombo').hide();


        $('#DTAutocompletar').hide();
        $('#btn_agregarAutocompletar').hide();



        ResetPlus();

        Reset();
        var datosTabla = [];
        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/LlenaTipoTransaccion',
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
                    $.each(index.ListaTipoTran, function (r, arr) {
                        datosTabla.push([arr.nombre, arr.clave, arr.categoria, arr.estatus, arr.fecha, arr.idTipoTransaccion, arr.area, arr.proceso, arr.idCategoria])

                            ;
                    });
                });

            }

        });

        otable.clear();
        otable.rows.add(datosTabla);
        otable.draw();
    });
    $("#btnDelete").click(function () {
        var row = $('#dtTiposTransaccion').DataTable().row('.selected').data();
        if (row) {
            IdTipoTran = row[5];

            $.SmartMessageBox({
                title: "¿Desea <font color='#ff9100'><b>eliminar</b></font> la Categoría <b>" + row[0] + "</b>?",
                content: "Una vez eliminada el Proceso no podras volver acceder a el.",
                buttons: '[No][Si]'
            }, function (ButtonPressed) {
                if (ButtonPressed === "Si") {
                    $('#bot2-Msg1').prop('disabled', true);
                    $.ajax({
                        async: false,
                        type: "POST",
                        url: 'MyWebService.asmx/DeleteTransaccion',
                        data: JSON.stringify({ idTipoTransaccion: IdTipoTran }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (output) {



                            $.each(output, function (j, cam) {


                                //regreso = cam;
                                console.log("Total: " + cam);
                                if (cam == "La transacción ya cuenta con valores") {
                                    showWarningMessage('Información </b>', '<i>No se puede eliminar la transaccion  ya que cuenta con registros</i>');

                                } else {
                                    showOkMessage('Categoría Eliminada', 'Se ha Eliminado la Categoría <b>' + row[0] + '<b>');

                                    var datosTabla = [];
                                    $.ajax({
                                        async: false,
                                        type: 'POST',
                                        url: 'MyWebService.asmx/LlenaTipoTransaccion',
                                        dataType: 'json',
                                        contentType: 'application/json; charset=utf-8',
                                        success: function (response) {

                                            $.each(response, function (row, index) {
                                                $.each(index.ListaTipoTran, function (r, arr) {
                                                    datosTabla.push([arr.nombre, arr.clave, arr.categoria, arr.estatus, arr.fecha, arr.idTipoTransaccion, arr.area, arr.proceso, arr.idCategoria])

                                                        ;
                                                });
                                            });

                                        }

                                    });

                                    otable.clear();
                                    otable.rows.add(datosTabla);
                                    otable.draw();
                                }

                            });


                        },
                        error: function (e) {
                            console.log("error");


                        }
                    });
                } else {
                    $('#bot1-Msg1').prop('disabled', true);
                }
            });

        } else {
            showWarningMessage('Información </b>', '<i>Debe seleccionar por lo menos un elemento</i>');

        }

    });
    $("#btnEditComplement").click(function () {
        var row = $('#tablaComplementarios').DataTable().row('.selected').data();

        if (row) {
            mostrarDialogCompl();

            $('#dialog').bootstrapValidator('destroy');

            $("#dialog").dialog({
                title: 'Edicion de Datos',
                width: 700,
                modal: true,
                draggable: false,
                resizable: false,
                open: function (event, ui) {
                    $(".ui-dialog-titlebar-close", ui.dialog);
                },
            });
            var sub = row[0];
            var sub2 = sub.substring(0, 40);
            var valor = sub.length;
            var valor2 = sub.substring(40, valor);
            if (sub2 == '<span class="responsiveExpander"></span>') {
                $("#nombreCampoD").val(valor2).trigger('change');
                $("#nombreCampoDP").val(valor2).trigger('change');
            } else {
                $("#nombreCampoD").val(row[0]).trigger('change');
                $("#nombreCampoDP").val(row[0]).trigger('change');
            }

            $("#tipoDatoD").change(function () {
                var opcion = $("#tipoDatoD option:selected").html();

                if (opcion == "Date") {
                    $("#longitudD").val(10).trigger('change');
                    $('#longitudD').prop("disabled", true);
                    $('#longiD').removeClass("has-error");

                    $('#longiD').addClass("has-success");
                    $("#longiD small").hide();

                } else if (opcion == "DateTime") {
                    $("#longitudD").val(16).trigger('change');
                    $('#longitudD').prop("disabled", true);
                    $('#longiD').removeClass("has-error");

                    $('#longiD').addClass("has-success");
                    $("#longiD small").hide();

                } else if (opcion == "Boleano") {
                    $("#longitudD").val(1).trigger('change');
                    $('#longitudD').prop("disabled", true);
                    $('#longiD').removeClass("has-error");

                    $('#longiD').addClass("has-success");
                    $("#longiD small").hide();

                } else if ($("#longitudD").val() == '' && opcion != "DateTime" && opcion != "Date" && opcion != "Boleano") {
                    $("#longitudD").val(row[3]).trigger('change');
                    $('#longitudD').prop("disabled", false);
                    $('#longi').removeClass("has-success");

                } else {
                    $("#longitudD").val(row[3]).trigger('change');
                    $('#longi').removeClass("has-success");

                    $('#longitudD').prop("disabled", false);

                }
            })

            $("#campoUps2").val(IdTipoTran).trigger('change');
            $("#descCampoD").val(row[1]).trigger('change');
            $("#longitudD").val(row[3]).trigger('change');
            $('#tipoDatoD').val(row[6]).trigger('change');
            $('#nivelD ').val(row[7]).trigger('change');
            $('#tipoOperacionD ').val(row[8]).trigger('change');
            bootsVal();
            $('#dialog').data('bootstrapValidator').validate();
            $('#dialog').data('bootstrapValidator').isValid();
        } else {
            showWarningMessage('Información </b>', '<i>Debe seleccionar por lo menos un elemento</i>');
        }

    });
    $("#btnEditComplementD").click(function () {
        $("#dialog").dialog("close");
        $.ajax({
            type: 'POST',
            url: 'MyWebService.asmx/UpdateCamposWS',
            data: {
                nombreUP: $("#nombreCampoDP").val(),
                nombreCampo: $("#nombreCampoD").val(),
                descCampo: $("#descCampoD").val(),
                tipoDato: $('#tipoDatoD').val(),
                longitud: $("#longitudD").val(),
                nivel: $('#nivelD ').val(),
                tipoOperacion: $('#tipoOperacionD ').val(),
                idTipoTransaccion: IdTipoTran
            },
            success: function (response) {
                var nombre = $('#dialog').serializeArray()[0].value;
                if (nombre.length >= 30) {
                    nombre.subtring
                    nombre = nombre.substring(inicio, fin) + "...";
                }
                showOkMessage('Campo editado', 'Se ha editado el campo <b>' + nombre + '<b>');
                $.ajax({
                    type: 'POST',
                    url: 'MyWebService.asmx/DTCamposWS',
                    data: JSON.stringify({
                        idTipoTransaccion: IdTipoTran
                    }),
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function (response) {
                        var datosCom = [];

                        $.each(response, function (row, index) {
                            $.each(index.ListCamposTransaccion, function (r, arr) {

                                datosCom.push([arr.nombreCampo, arr.descCampo, arr.TipoDato, arr.longitud, arr.Nivel, arr.Operacion, arr.idTipoDato, arr.idNivel, arr.idOperacion, arr.idCampo]);
                            });
                        });
                        $('#tablaComplementarios tbody').removeClass('selected');



                        $('#tablaComplementarios tbody').on('click', 'tr', function () {
                            if ($(this).hasClass('selected')) {
                                $(this).removeClass('selected');
                            } else {
                                otable1.$('tr.selected').removeClass('selected');
                                $(this).addClass('selected');
                            }
                        });

                        $.fn.dataTable.ext.errMode = 'none';
                        var responsiveHelper_datatable_fixed_column = undefined;
                        var breakpointDefinition = {
                            tablet: 1024,
                            phone: 480,
                            desktop: 1260
                        };

                        otable1 = $('#tablaComplementarios').DataTable({

                            "scrollY": "200px",
                            "scrollCollapse": true,
                            "paging": false,

                            "sPaginationType": "bootstrap", // full_numbers
                            "iDisplayStart ": 10,
                            "iDisplayLength": 10,
                            "bPaginate": false, //hide pagination
                            "bFilter": false, //hide Search bar
                            "bInfo": false, // hide showing entries
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

                            "drawCallback": function (oSettings) {
                                responsiveHelper_datatable_fixed_column.respond();
                            },
                            data: datosCom,
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
                            }
                            ]
                        });




                        $('#tablaComplementarios tbody').on('click', 'tr', function () {
                            if ($(this).hasClass('selected')) {
                                $(this).removeClass('selected');
                            } else {
                                otable1.$('tr.selected').removeClass('selected');
                                $(this).addClass('selected');
                            }
                        });

                    }

                });
            }

        });


    })
    $("#btnDeleteComplement").click(function () {
        var row = $('#tablaComplementarios').DataTable().row('.selected').data();

        if (row) {
            var valorCampo = 0;
            var visible = '';
            var editable = '';
            var obligatorio = '';
            var visualizacion = 0;

            var nombreC;
            var sub = row[0];
            var sub2 = sub.substring(0, 40);
            var valor = sub.length;
            var valor2 = sub.substring(40, valor);
            if (sub2 == '<span class="responsiveExpander"></span>') {

                nombreC = valor2;
            } else {
                nombreC = row[0];

            }

            $.SmartMessageBox({
                title: "¿Desea <font color='#ff9100'><b>eliminar</b></font> el Campo <b>" + nombreC + "</b>?",
                content: "Una vez eliminado el campo ya no podrá acceder a el.",
                buttons: '[No][Si]'
            },
                function (ButtonPressed) {
                    if (ButtonPressed === "Si") {
                        $('#bot2-Msg1').prop('disabled', true);

                        $.ajax({
                            type: 'POST',
                            url: 'MyWebService.asmx/selectDeleteCampoDinamicoW',
                            dataType: 'json',
                            data: JSON.stringify({
                                idTipotransaccion: IdTipoTran,
                                idCampo: row[9],
                            }),
                            contentType: 'application/json; charset=utf-8',
                            success: function (response) {
                                $.each(response, function (registro, row1) {
                                    $.each(row1.ListCamposTransaccion, function (i1, r1) {
                                        valorCampo = r1.valorSelect;
                                        visible = r1.valorVisible;
                                        editable = r1.valorEditable;
                                        obligatorio = r1.valorObligatorio;
                                        visualizacion = r1.valorVisualizacion;
                                    });
                                });
                                console.log(valorCampo, visible, editable, obligatorio, visualizacion)
                                if (valorCampo >= 1 && visible == 'False' && editable == "False" && obligatorio == "False" && visualizacion == 0 || valorCampo == 0) {

                                    $.ajax({
                                        type: 'POST',
                                        url: 'MyWebService.asmx/DeleteReglasCamposWS',
                                        data: {
                                            idcampo: row[9],
                                            idTipoTransaccion: IdTipoTran
                                        },
                                        success: function (result) {
                                            $.ajax({
                                                type: 'POST',
                                                url: 'MyWebService.asmx/DeleteCamposDinamicosWS',
                                                data: {
                                                    idcampo: row[9],
                                                    idTipoTransaccion: IdTipoTran
                                                },
                                                success: function (result) {
                                                    $.ajax({
                                                        type: 'POST',
                                                        url: 'MyWebService.asmx/DTCamposWS',
                                                        data: JSON.stringify({
                                                            idTipoTransaccion: IdTipoTran
                                                        }),
                                                        dataType: 'json',
                                                        contentType: 'application/json; charset=utf-8',

                                                        success: function (response) {
                                                            var datosCom = [];

                                                            $.each(response, function (row, index) {
                                                                $.each(index.ListCamposTransaccion, function (r, arr) {

                                                                    datosCom.push([arr.nombreCampo, arr.descCampo, arr.TipoDato, arr.longitud, arr.Nivel, arr.Operacion, arr.idTipoDato, arr.idNivel, arr.idOperacion, arr.idCampo]);
                                                                });
                                                            });
                                                            $('#tablaComplementarios tbody').removeClass('selected');



                                                            $('#tablaComplementarios tbody').on('click', 'tr', function () {
                                                                if ($(this).hasClass('selected')) {
                                                                    $(this).removeClass('selected');
                                                                } else {
                                                                    otable1.$('tr.selected').removeClass('selected');
                                                                    $(this).addClass('selected');
                                                                }
                                                            });
                                                            $.fn.dataTable.ext.errMode = 'none';
                                                            var responsiveHelper_datatable_fixed_column = undefined;
                                                            var breakpointDefinition = {
                                                                tablet: 1024,
                                                                phone: 480,
                                                                desktop: 1260
                                                            };
                                                            otable1 = $('#tablaComplementarios').DataTable({
                                                                "scrollY": "200px",
                                                                "scrollCollapse": true,
                                                                "paging": false,

                                                                "sPaginationType": "bootstrap", // full_numbers
                                                                "iDisplayStart ": 10,
                                                                "iDisplayLength": 10,
                                                                "bPaginate": false, //hide pagination
                                                                "bFilter": false, //hide Search bar
                                                                "bInfo": false, // hide showing entries
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

                                                                "drawCallback": function (oSettings) {
                                                                    responsiveHelper_datatable_fixed_column.respond();
                                                                },
                                                                data: datosCom,
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
                                                                }
                                                                ]
                                                            });

                                                            $('#tablaComplementarios tbody').on('click', 'tr', function () {
                                                                if ($(this).hasClass('selected')) {
                                                                    $(this).removeClass('selected');
                                                                } else {
                                                                    otable1.$('tr.selected').removeClass('selected');
                                                                    $(this).addClass('selected');
                                                                }
                                                            });

                                                        }

                                                    });
                                                    showOkMessage('Campo eliminado', 'Se ha eliminado el Campo <b>' + nombreC + '</b>');

                                                    if ($('#tablaComplementarios >tbody >tr').length == 1) {
                                                        $(".btn-next").prop("disabled", true);

                                                    } else {
                                                        $(".btn-next").prop("disabled", false);

                                                    }
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    showWarningMessage('Información </b>', '<i>No se puede Eliminar el campo <b>"' + nombreC + '"</b> ya que esta ligado a uno o mas reglas del negocio por campo</i>');
                                }

                            }
                        });



                    } else {
                        $('#bot1-Msg1').prop('disabled', true);
                    }
                });
        } else {
            showWarningMessage('Información </b>', '<i>Debe seleccionar por lo menos un elemento</i>');
        }
    });
    $("#btnEditEtapa").click(function () {
        var row = $('#tablaEtapas').DataTable().row('.selected').data();

        if (row) {
            mostrarDialogEtapa();
            $("#dialog2").dialog({
                title: 'Edicion de Datos',
                width: 400,
                modal: true,
                draggable: false,
                resizable: false,
                open: function (event, ui) {
                    $(".ui-dialog-titlebar-close", ui.dialog);
                },
                width: 400,
            });
            $('#dialog2').bootstrapValidator('destroy');
            var sub = row[0];
            var sub2 = sub.substring(0, 40);
            var valor = sub.length;
            var valor2 = sub.substring(40, valor);
            if (sub2 == '<span class="responsiveExpander"></span>') {
                $("#nombreEtapaD").val(valor2);
                $("#nombreEtapaDE").val(valor2);
            } else {
                $("#nombreEtapaD").val(row[0]);
                $("#nombreEtapaDE").val(row[0]);
            }


            $("#ordenD").val(row[1]);
            bootsVal();
            $('#dialog2').data('bootstrapValidator').validate();
            $('#dialog2').data('bootstrapValidator').isValid();


        } else {
            showWarningMessage('Información </b>', '<i>Debe seleccionar por lo menos un elemento</i>');
        }

    })
    $("#btnEditEtapaD").click(function () {
        var valores = [];
        var row = $('#tablaEtapas').DataTable().row('.selected').data();
        $("#tablaEtapas tr").find('td:eq(0)').each(function () {
            valores.push($(this).text());
        })
        if (valores.includes($('input#nombreEtapaD').val()) && $('input#nombreEtapaD').val() != row[0]) {
            $.smallBox({
                title: "Error",
                content: "<i class='fa fa-clock-o'></i> <i>El nombre de la etapa ya existe</i>",
                color: "#C46A69",
                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                timeout: 2000
            });

            $('input#nombreEtapaD').css({
                'background-color': '#C46A69'
            });
            $('#dialog2').bootstrapValidator('destroy');

            mouse();
        } else {


            $("#dialog2").dialog("close");
            $.ajax({
                type: 'POST',
                url: 'MyWebService.asmx/UpdateEtapasWS',
                data: {
                    IdTipoTransaccion: IdTipoTran,
                    nombreUPE: $("#nombreEtapaDE").val(),
                    descripcionE: $("#nombreEtapaD").val(),
                    ordenE: $("#ordenD").val()
                },
                success: function (response) {
                    var nombre = $('#dialog2').serializeArray()[0].value;
                    if (nombre.length >= 30) {
                        nombre.subtring
                        nombre = nombre.substring(inicio, fin) + "...";
                    }
                    showOkMessage('Categoría actualizada, se ha actualizado la categoría <b>' + nombre + '<b>');
                    $.ajax({
                        async: false,
                        type: 'POST',
                        url: 'MyWebService.asmx/EtapasTransaccionN',
                        data: JSON.stringify({
                            idTipoTransaccion: IdTipoTran
                        }),
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: function (response) {
                            var datosCom = [];

                            $.each(response, function (row, index) {

                                $.each(index.etapaslista, function (r, arr) {
                                    datosCom.push([arr.descripcion, arr.Orden]);
                                });
                            });
                            $('#tablaEtapas tbody').removeClass('selected');



                            $('#tablaEtapas tbody').on('click', 'tr', function () {
                                if ($(this).hasClass('selected')) {
                                    $(this).removeClass('selected');
                                } else {
                                    otable2.$('tr.selected').removeClass('selected');
                                    $(this).addClass('selected');
                                }
                            });
                            $.fn.dataTable.ext.errMode = 'none';
                            var responsiveHelper_datatable_fixed_column = undefined;
                            var breakpointDefinition = {
                                tablet: 1024,
                                phone: 480,
                                desktop: 1260
                            };

                            otable2 = $('#tablaEtapas').DataTable({

                                "scrollY": "200px",
                                "scrollCollapse": true,
                                "paging": false,

                                "sPaginationType": "bootstrap", // full_numbers
                                "iDisplayStart ": 10,
                                "iDisplayLength": 10,
                                "bPaginate": false, //hide pagination
                                "bFilter": false, //hide Search bar
                                "bInfo": false, // hide showing entries
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
                                            $('#tablaEtapas'), breakpointDefinition);
                                    }
                                },

                                "drawCallback": function (oSettings) {
                                    responsiveHelper_datatable_fixed_column.respond();
                                },
                                data: datosCom,
                                columns: [{
                                    title: "Nombre Etapa"
                                },
                                {
                                    title: "Orden"
                                },

                                ]
                            });




                            $('#tablaEtapas tbody').on('click', 'tr', function () {
                                if ($(this).hasClass('selected')) {
                                    $(this).removeClass('selected');
                                } else {
                                    otable2.$('tr.selected').removeClass('selected');
                                    $(this).addClass('selected');
                                }
                            });

                        }

                    });
                    SelectEtapasC();
                }

            });
        }
    })
    $("#btnDeleteEtapa").click(function () {
        var row = $('#tablaEtapas').DataTable().row('.selected').data();

        if (row) {
            var valorEtapa;
            var nombreC;
            var sub = row[0];
            var sub2 = sub.substring(0, 40);
            var valor = sub.length;
            var valor2 = sub.substring(40, valor);
            if (sub2 == '<span class="responsiveExpander"></span>') {

                nombreC = valor2;
            } else {
                nombreC = row[0];

            }

            $.SmartMessageBox({
                title: "¿Desea <font color='#ff9100'><b>eliminar</b></font> la Etapa <b>" + nombreC + "</b>?",
                content: "Una vez eliminada la etapa ya no podra acceder a esta.",
                buttons: '[No][Si]'
            },
                function (ButtonPressed) {
                    if (ButtonPressed === "Si") {
                        $('#bot2-Msg1').prop('disabled', true);
                        valorEtapa = 0;
                        $.ajax({
                            type: 'POST',
                            url: 'MyWebService.asmx/selectDeleteCampoEtapaW',
                            dataType: 'json',
                            data: JSON.stringify({
                                idTipotransaccion: IdTipoTran,
                                nombre: nombreC,
                            }),
                            contentType: 'application/json; charset=utf-8',
                            success: function (resultado) {

                                $.each(resultado, function (registro, row1) {
                                    $.each(row1.ListCamposTransaccion, function (i1, r1) {
                                        valorEtapa = r1.valorSelect;
                                        if (r1.valorSelect == 0) {
                                            $.ajax({
                                                type: 'POST',
                                                url: 'MyWebService.asmx/DeleteEtapasWS',
                                                data: {
                                                    descripcion: nombreC,
                                                    idTipoTransaccion: IdTipoTran
                                                },
                                                success: function (result) {
                                                    showOkMessage('Etapa eliminada', 'Se ha eliminado la etapa <b>' + nombreC + '</b>');

                                                    $.ajax({
                                                        async: false,
                                                        type: 'POST',
                                                        url: 'MyWebService.asmx/EtapasTransaccionN',
                                                        data: JSON.stringify({
                                                            idTipoTransaccion: IdTipoTran
                                                        }),
                                                        dataType: 'json',
                                                        contentType: 'application/json; charset=utf-8',
                                                        success: function (response) {
                                                            var datosCom = [];

                                                            $.each(response, function (row, index) {

                                                                $.each(index.etapaslista, function (r, arr) {
                                                                    datosCom.push([arr.descripcion, arr.Orden]);
                                                                });
                                                            });
                                                            $('#tablaEtapas tbody').removeClass('selected');



                                                            $('#tablaEtapas tbody').on('click', 'tr', function () {
                                                                if ($(this).hasClass('selected')) {
                                                                    $(this).removeClass('selected');
                                                                } else {
                                                                    otable2.$('tr.selected').removeClass('selected');
                                                                    $(this).addClass('selected');
                                                                }
                                                            });
                                                            $.fn.dataTable.ext.errMode = 'none';
                                                            var responsiveHelper_datatable_fixed_column = undefined;
                                                            var breakpointDefinition = {
                                                                tablet: 1024,
                                                                phone: 480,
                                                                desktop: 1260
                                                            };
                                                            otable2 = $('#tablaEtapas').DataTable({

                                                                "scrollY": "200px",
                                                                "scrollCollapse": true,
                                                                "paging": false,

                                                                "sPaginationType": "bootstrap", // full_numbers
                                                                "iDisplayStart ": 10,
                                                                "iDisplayLength": 10,
                                                                "bPaginate": false, //hide pagination
                                                                "bFilter": false, //hide Search bar
                                                                "bInfo": false, // hide showing entries
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
                                                                            $('#tablaEtapas'), breakpointDefinition);
                                                                    }
                                                                },

                                                                "drawCallback": function (oSettings) {
                                                                    responsiveHelper_datatable_fixed_column.respond();
                                                                },
                                                                data: datosCom,
                                                                columns: [{
                                                                    title: "Nombre Etapa"
                                                                },
                                                                {
                                                                    title: "Orden"
                                                                },

                                                                ]
                                                            });




                                                            $('#tablaEtapas tbody').on('click', 'tr', function () {
                                                                if ($(this).hasClass('selected')) {
                                                                    $(this).removeClass('selected');
                                                                } else {
                                                                    otable2.$('tr.selected').removeClass('selected');
                                                                    $(this).addClass('selected');
                                                                }
                                                            });
                                                            if ($('#tablaEtapas >tbody >tr').length == 1) {
                                                                $(".btn-next").prop("disabled", true);

                                                            } else {
                                                                $(".btn-next").prop("disabled", false);

                                                            }
                                                            SelectEtapasC();
                                                        }

                                                    });


                                                }
                                            });
                                        } else {
                                            showWarningMessage('Información </b>', '<i>No se puede Eliminar la etapa <b>"' + nombreC + '"</b> ya que esta ligado a una o mas Acciones</i>');

                                        }
                                    });
                                });
                            }
                        })




                    } else {
                        $('#bot1-Msg1').prop('disabled', true);
                    }
                });

        } else {
            showWarningMessage('Información </b>', '<i>Debe seleccionar por lo menos un elemento</i>');
        }
    });
    $("#btnDeleteFormula").click(function () {
        var row = $('#tablaFormulas').DataTable().row('.selected').data();
        if (row) {
            $
                .SmartMessageBox({
                    title: "¿Desea <font color='#ff9100'><b>remover</b></font> la fila seleccionada</b>?",
                    buttons: '[No][Si]'
                },
                function (ButtonPressed) {
                    if (ButtonPressed === "Si") {
                        otableF.row('.selected').remove().draw(false);
                        showOkMessage('Formula eliminada', 'Se ha eliminado la Formula <b>' + row[0] + '</b>');

                        var valxx = '';
                        $.each($('#tablaFormulas td'), function (index1, item1) {
                            valxx = $(item1).text();
                        });
                        if (valxx == 'Ningún dato disponible en esta tabla') {
                            validacionDeleteF = 1;

                        } else {
                            validacionDeleteF = 0;
                        }
                    }
                });
        } else {

            $.smallBox({
                title: "Información",
                content: "<i>Debe seleccionar por lo menos un elemento</i>",
                color: "#c79121",
                timeout: 4000,
                icon: "fa fa-info-circle swing animated"
            });
        }


    });
    $("#btnDeleteAccionN").click(function () {
        var row = $('#tablaRelasAccion').DataTable().row('.selected').data();
        if (row) {
            $
                .SmartMessageBox({
                    title: "¿Desea <font color='#ff9100'><b>remover</b></font> la fila seleccionada</b>?",
                    buttons: '[No][Si]'
                },
                function (ButtonPressed) {
                    if (ButtonPressed === "Si") {

                        //Aqui compa
                        console.log(row);
                        console.log(ArregloValidarAccionesEdit);


                        var posicion = ArregloValidarAccionesEdit.indexOf(row[2]);
                        ArregloValidarAccionesEdit.splice(posicion, 1);

                        otableRA.row('.selected').remove().draw(false);
                        showOkMessage('Regla por accion eliminada', 'Se ha eliminado la Regla por accion <b>' + row[0] + '</b>');

                        var valxx = '';
                        $.each($('#tablaRelasAccion td'), function (index1, item1) {
                            valxx = $(item1).text();
                        });
                        if (valxx == 'Ningún dato disponible en esta tabla') {
                            validacionDelete = 1;

                        } else {
                            validacionDelete = 0;
                        }
                    }
                });
        } else {

            $.smallBox({
                title: "Información",
                content: "<i>Debe seleccionar por lo menos un elemento</i>",
                color: "#c79121",
                timeout: 4000,
                icon: "fa fa-info-circle swing animated"
            });
        }


    });
    $("#btn_agregarFormulaF").click(function () {
        var valxx = '';
        $.each($('#tablaFormulas td'), function (index1, item1) {
            valxx = $(item1).text();
            //console.log(" Valores " + $(item1).text());
        });

        if (valxx != 'Ningún dato disponible en esta tabla') {


            var idfila = 1;
            var namesDetalle = [];
            var conF = 0;
            var valF = 'Formula';
            namesDetalle.push(valF);
            var Datos = "";
            Datos += '[{';
            Datos += '"idCampo": "' + $('select#fomula_Init option:selected').text() + '",';
            Datos += '"Formulas":[';

            for (var i = 0; i < ($('#tablaFormulas tr').length - 1); i++) {
                idfila = idfila++;
                Datos += '{';

                $.each(namesDetalle, function (j, fd) {
                    var name = namesDetalle[j];


                    if (j == 0) {

                        var sub = otableF.row(i).data()[j];


                        Datos += '"' + name + '":"' + otableF.row(i).data()[j] + '",';

                        Datos = Datos.substring(0, Datos.length - 1);
                        Datos += '},{';
                        Datos = Datos.substring(0, Datos.length - 1);

                    } else {
                        Datos += '"' + name + '":"' + otableF.row(i).data()[j] + '",';
                    }


                });


            }
            var maxF = Datos.substring(0, Datos.length - 2);
            var finalFo = maxF + "}]}]";
            $.ajax({
                async: false,
                type: 'POST',
                url: 'MyWebService.asmx/InsertFormulaWS',
                data: JSON.stringify({
                    idTipoTransaccion: IdTipoTran,
                    idEtapa: $('select#formula_etapa').val(),
                    idAccion: $('select#fomula_accion').val(),
                    idCampo: $('select#fomula_Init').val(),
                    cadenaGenerada: finalFo

                }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (response) {
                    $.smallBox({
                        title: "Éxito!",
                        content: "Se han configurado las fórmulas",
                        color: "#739e73",
                        timeout: 2000,
                        icon: "fa fa-thumbs-up swing animated"
                    });

                    Reset();
                    $("#select#fomula_Init").prop("disabled", true);

                }
            });


            otableF
                .clear()
                .draw();
        } else {
            $.smallBox({
                title: "Error!",
                content: "<i>Debes agregar una Formula</i>",
                color: "#c79121",
                timeout: 4000,
                icon: "fa fa-info-circle swing animated"
            });
        }
    })

    $("#btn_agregarFormulaEF").click(function () {
        var valxx = '';
        $.each($('#tablaFormulas td'), function (index1, item1) {
            valxx = $(item1).text();
            //console.log(" Valores " + $(item1).text());
        });
        if (validacionDeleteF == 1) {
            $.ajax({
                type: 'POST',
                url: 'MyWebService.asmx/DeleteFormulaWS',
                data: {
                    idTipoTransaccion: IdTipoTran,
                    idEtapa: $("#formula_etapa").val(),
                    idAccion: $("#fomula_accion").val(),
                    idcampo: $("#fomula_Init").val()
                },
                success: function (result) {
                    $.smallBox({
                        title: "Éxito!",
                        content: "Se han Configurado las Formulas",
                        color: "#739e73",
                        timeout: 2000,
                        icon: "fa fa-thumbs-up swing animated"
                    });

                    Reset();
                    $("#select#fomula_Init").prop("disabled", true);
                    $("#formula_etapa").val(0);
                    $("#fomula_accion").val(0);
                    $("#fomula_Init").val(0);
                    $('#form_reglas').bootstrapValidator('destroy');
                }
            });
        } else if (valxx != 'Ningún dato disponible en esta tabla') {


            var idfila = 1;
            var namesDetalle = [];
            var conF = 0;
            var valF = 'Formula';
            namesDetalle.push(valF);
            var Datos = "";
            Datos += '[{';
            Datos += '"idCampo": "' + $('select#fomula_Init option:selected').text() + '",';
            Datos += '"Formulas":[';

            for (var i = 0; i < ($('#tablaFormulas tr').length - 1); i++) {
                idfila = idfila++;
                Datos += '{';

                $.each(namesDetalle, function (j, fd) {
                    var name = namesDetalle[j];


                    if (j == 0) {

                        var sub = otableF.row(i).data()[j];


                        Datos += '"' + name + '":"' + otableF.row(i).data()[j] + '",';

                        Datos = Datos.substring(0, Datos.length - 1);
                        Datos += '},{';
                        Datos = Datos.substring(0, Datos.length - 1);

                    } else {
                        Datos += '"' + name + '":"' + otableF.row(i).data()[j] + '",';
                    }


                });


            }
            var maxF = Datos.substring(0, Datos.length - 2);
            var finalFo = maxF + "}]}]";

            $.ajax({
                type: 'POST',
                url: 'MyWebService.asmx/DeleteFormulaWS',
                data: {
                    idTipoTransaccion: IdTipoTran,
                    idEtapa: $("#formula_etapa").val(),
                    idAccion: $("#fomula_accion").val(),
                    idcampo: $("#fomula_Init").val()
                },
                success: function (result) {

                    $.ajax({
                        async: false,
                        type: 'POST',
                        url: 'MyWebService.asmx/InsertFormulaWS',
                        data: JSON.stringify({
                            idTipoTransaccion: IdTipoTran,
                            idEtapa: $('select#formula_etapa').val(),
                            idAccion: $('select#fomula_accion').val(),
                            idCampo: $('select#fomula_Init').val(),
                            cadenaGenerada: finalFo

                        }),
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: function (response) {
                            $.smallBox({
                                title: "Éxito!",
                                content: "Se han Configurado las Formulas",
                                color: "#739e73",
                                timeout: 2000,
                                icon: "fa fa-thumbs-up swing animated"
                            });

                            Reset();
                            $("#select#fomula_Init").prop("disabled", true);
                            $("#formula_etapa").val(0);
                            $("#fomula_accion").val(0);
                            $("#fomula_Init").val(0);
                            $('#form_reglas').bootstrapValidator('destroy');

                        }
                    });
                }
            });



            otableF
                .clear()
                .draw();
        } else {
            $.smallBox({
                title: "Error!",
                content: "<i>Debes agregar una Formula</i>",
                color: "#c79121",
                timeout: 4000,
                icon: "fa fa-info-circle swing animated"
            });
        }
    })
    $("#btn_agregarCombo").click(function () {
        bootsVal();
        $('#form_Combo').data('bootstrapValidator').validate();
        var n = $('#form_Combo').data('bootstrapValidator').isValid();
        if (n) {
            agregarCombobox();

        } else {
            bootsVal();

        }

    })
    $("#btn_agregarAutocompletar").click(function () {
        bootsVal();
        $('#form_Autocompletar').data('bootstrapValidator').validate();
        var n = $('#form_Autocompletar').data('bootstrapValidator').isValid();
        if (n) {
            agregarAutoComplete();

        } else {
            bootsVal();

        }

    })

    $("#btnEdit").click(function () {
        editTransact();
    })
    $("#btnEditRol").click(function () {
        var row = $('#tablaRoles').DataTable().row('.selected').data();
        if (row) {
            var arrayRolesC = '';
            var paiRol = [];
            var varRow = "";
            var paiRol2 = [];
            var varRow2 = "";
            var myJsonString = '';

            $('#dialog3').bootstrapValidator('destroy');

            mostrarDialogEtaRol();
            $("#dialog3").dialog({
                title: 'Edicion de Datos',
                width: 400,
                modal: true,
                draggable: false,
                resizable: false,
                position: 'top',
                open: function (event, ui) {
                    $(".ui-dialog-titlebar-close", ui.dialog);
                },
                width: 400,
            });

            $("#nombreAccionD").val(row[1]);
            $("#claveAccionD").val(row[2]);
            $("#ordenAccionD").val(row[3]);
            bootsVal();
            $('#dialog3').data('bootstrapValidator').validate();
            $('#dialog3').data('bootstrapValidator').isValid();


            varRow = row[4];
            paiRol = varRow.split('|');

            varRow2 = row[5];
            paiRol2 = varRow2.split('|');
            arrayRolesC += '{ "hijo": [{'
            arrayRolesC += '"nombre": "Roles",'
            arrayRolesC += '"permisos": [{'
            for (var i = 0; i < paiRol2.length; i++) {




                arrayRolesC += '"nombre": "' + paiRol[i] + '",'
                arrayRolesC += '"checked": "' + paiRol2[i] + '",'
                arrayRolesC += '"id": "' + paiRol[i] + '"'
                arrayRolesC += '},{'

            }
            arrayRolesC += '}]}]}'

            var subJ = "";
            var jsonF = "";
            subJ = arrayRolesC.substring(0, arrayRolesC.length - 45);

            jsonF = subJ + "]}]}";
            myJsonString = jQuery.parseJSON(jsonF);
            var makeTree = '';


            $.each(myJsonString.hijo, function (index, j) {
                makeTree += '<li class="parent_li"> <span><i class="fa fa-lg fa-plus-circle icon-minus-sign"></i> ' + j.nombre + '</span> <ul>';
                $.each(j.permisos, function (index, permiso) {

                    if (permiso.checked) {
                        makeTree += '<li> <span> <label class="checkbox inline-block"> <input type="checkbox" name="permisosBySon" checked="' + permiso.checked + '" value="' + permiso.id + ' "> <i></i>' + permiso.nombre + '</label> </span></li>';
                    } else {
                        makeTree += '<li> <span> <label class="checkbox inline-block"> <input type="checkbox" name="permisosBySon" value="' + permiso.id + ' "> <i></i>' + permiso.nombre + '</label> </span></li>';
                    }
                });
                makeTree += '</ul></li>';
            });
            makeTree += '</ul></li>';
            document.getElementById("menusforRolTree").innerHTML = makeTree;
            loadScript("js/plugin/bootstraptree/bootstrap-tree.min.js");



        } else {

            $.smallBox({
                title: "Información",
                content: "<i>Debe seleccionar por lo menos un elemento</i>",
                color: "#c79121",
                timeout: 4000,
                icon: "fa fa-info-circle swing animated"
            });
        }

    })
    $("#btnEditRolD3").click(function () {
        var valores = [];
        var row = $('#tablaRoles').DataTable().row('.selected').data();
        $("#tablaRoles tr").find('td:eq(1)').each(function () {
            valores.push($(this).text());
        })
        if (valores.includes($('input#nombreAccionD').val()) && $('input#nombreAccionD').val() != row[1]) {
            $.smallBox({
                title: "Error",
                content: "<i class='fa fa-clock-o'></i> <i>El nombre de la Accion ya existe</i>",
                color: "#C46A69",
                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                timeout: 2000
            });

            $('input#nombreAccionD').css({
                'background-color': '#C46A69'
            });
            $('#dialog3').bootstrapValidator('destroy');

            mouse();
        } else {

            var row = $('#tablaRoles').DataTable().row('.selected').data();
            $("#dialog3").dialog("close");
            var actualizar = [];
            $.each(getCheckedBoxes("permisosBySon"), function (index, permiso) {
                actualizar.push(permiso.value);
            });
            $.ajax({
                async: false,
                type: 'POST',
                url: 'MyWebService.asmx/UpdateCicloVidaWS',
                data: {
                    descripcion: row[1],
                    orden: row[3],
                    cveAccion: row[2],
                    descripcionN: $('#nombreAccionD').val(),
                    ordenN: $('#ordenAccionD').val(),
                    cveAccionN: $('#claveAccionD').val(),
                },
                success: function () {
                    $.ajax({
                        async: false,
                        type: 'POST',
                        url: 'MyWebService.asmx/DeleteEtapasAccionesRolesWS',
                        data: {
                            idTipoTransaccion: IdTipoTran,
                            idEtapa: row[0],
                            idAccion: row[6]
                        },

                        success: function () {
                            for (var i = 0; i < actualizar.length; i++) {

                                $.ajax({
                                    async: false,
                                    type: 'POST',
                                    url: 'MyWebService.asmx/InsertEtapasAccRol',
                                    data: JSON.stringify({
                                        idTipoTransaccion: IdTipoTran,
                                        nomEtapa: row[0],
                                        NomAccion: $('#nombreAccionD').val(),
                                        nombreRol: actualizar[i]
                                    }),
                                    dataType: 'json',
                                    contentType: 'application/json; charset=utf-8',
                                    success: function (response) {

                                    }
                                });

                            }
                            $.smallBox({
                                title: "Éxito!",
                                content: "Se ha editado el registro",
                                color: "#739e73",
                                timeout: 2000,
                                icon: "fa fa-thumbs-up swing animated"
                            });
                        }
                    });
                }

            });



            idEtapa = $("#selectEtapa").val();
            InitDataTableRol();
        }




    })

    $("#btnDeleteRol").click(function () {
        var row = $('#tablaRoles').DataTable().row('.selected').data();
        if (row) {
            var valorCampo = 0;
            var visible = '';
            var editable = '';
            var obligatorio = '';
            var visualizacion = 0;
            $.SmartMessageBox({
                title: "¿Desea <font color='#ff9100'><b>eliminar</b></font> la accion <b>" + row[0] + "</b>?",
                content: "Una vez eliminado la accion ya no podra acceder a el.",
                buttons: '[No][Si]'
            },
                function (ButtonPressed) {
                    if (ButtonPressed === "Si") {
                        $('#bot2-Msg1').prop('disabled', true);
                        var RNC;
                        var COMBO;
                        var AUTO;
                        var FORMULA;
                        var RNA;


                        $.ajax({
                            async: false,
                            type: 'POST',
                            url: 'MyWebService.asmx/selectDeleteAccionxComboW',
                            dataType: 'json',
                            data: JSON.stringify({
                                idTipotransaccion: IdTipoTran,
                                idAccion: row[6]
                            }),
                            contentType: 'application/json; charset=utf-8',
                            success: function (resultado) {
                                $.each(resultado, function (registro, row1) {
                                    $.each(row1.ListCamposTransaccion, function (i1, r1) {
                                        COMBO = r1.valorSelect;
                                    });
                                });
                            }
                        });
                        $.ajax({
                            async: false,
                            type: 'POST',
                            url: 'MyWebService.asmx/selectDeleteAccionxAutoW',
                            dataType: 'json',
                            data: JSON.stringify({
                                idTipotransaccion: IdTipoTran,
                                idAccion: row[6]
                            }),
                            contentType: 'application/json; charset=utf-8',
                            success: function (resultado) {
                                $.each(resultado, function (registro, row1) {
                                    $.each(row1.ListCamposTransaccion, function (i1, r1) {
                                        AUTO = r1.valorSelect;
                                    });
                                });
                            }
                        });
                        $.ajax({
                            async: false,
                            type: 'POST',
                            url: 'MyWebService.asmx/selectDeleteAccionxFormulaW',
                            dataType: 'json',
                            data: JSON.stringify({
                                idTipotransaccion: IdTipoTran,
                                idAccion: row[6]
                            }),
                            contentType: 'application/json; charset=utf-8',
                            success: function (resultado) {
                                $.each(resultado, function (registro, row1) {
                                    $.each(row1.ListCamposTransaccion, function (i1, r1) {
                                        FORMULA = r1.valorSelect;
                                    });
                                });
                            }
                        });
                        $.ajax({
                            async: false,
                            type: 'POST',
                            url: 'MyWebService.asmx/selectDeleteAccionxRnAW',
                            dataType: 'json',
                            data: JSON.stringify({
                                idTipotransaccion: IdTipoTran,
                                idAccion: row[6]
                            }),
                            contentType: 'application/json; charset=utf-8',
                            success: function (resultado) {
                                $.each(resultado, function (registro, row1) {
                                    $.each(row1.ListCamposTransaccion, function (i1, r1) {
                                        RNA = r1.valorSelect;
                                    });
                                });
                            }
                        });
                        console.log(COMBO);
                        console.log(AUTO);
                        console.log(FORMULA);
                        console.log(RNA);
                        if (COMBO == 0) {
                            if (FORMULA == 0) {
                                if (RNA == 0) {

                                    $.ajax({
                                        type: 'POST',
                                        url: 'MyWebService.asmx/DeleteEtapasAccionesTipoTransaccionesWS',
                                        data: {
                                            idTipoTransaccion: IdTipoTran,
                                            idEtapa: row[0],
                                            idAccion: row[6]
                                        },
                                        success: function (result) {
                                            idEtapa = row[0];
                                            InitDataTableRol();

                                            if ($('#tablaRoles >tbody >tr').length == 1) {
                                                $(".btn-next").prop("disabled", true);

                                            } else {
                                                $(".btn-next").prop("disabled", false);

                                            }

                                            showOkMessage('Accion eliminada', 'Se ha eliminado la Accion <b>' + row[1] + '</b>');

                                        }
                                    });
                                } else {
                                    showWarningMessage('Información </b>', '<i>No se puede Eliminar la accion <b>"' + row[1] + '"</b> ya que esta configurada a una o mas Reglas de Negocio por Accion</i>');
                                }
                            } else {
                                showWarningMessage('Información </b>', '<i>No se puede Eliminar la accion <b>"' + row[1] + '"</b> ya que esta configurada a una o mas Formulas</i>');
                            }

                        } else {
                            showWarningMessage('Información </b>', '<i>No se puede Eliminar la accion <b>"' + row[1] + '"</b> ya que esta configurada a uno o mas Combo box</i>');
                        }



                    } else {
                        $('#bot1-Msg1').prop('disabled', true);
                    }
                });
        } else {
            showWarningMessage('Información </b>', '<i>Debe seleccionar por lo menos un elemento</i>');
        }
    });

    $("body").on("click", "#btn_EditTransaccion", function () {

        $("#btn_EditTransaccion").unbind("click");
        $("#btn_EditTransaccion").unbind("click");

        console.log("Entro -- " + 1 + 1);
        bootsVal();
        $('#form_transaccion').data('bootstrapValidator').validate();
        var n = $('#form_transaccion').data('bootstrapValidator').isValid();
        if (n) {
            $.ajax({
                type: 'POST',
                url: 'MyWebService.asmx/UpdateTipoTransaccionN',
                data: {
                    IdTipoTransaccion: IdTipoTran,
                    descripcion: $('#nombre').val(),
                    clave: $('#clave').val(),
                    idProceso: $('#proceso').val(),
                    idCatTipoTransac: $('#categoria').val()

                },
                success: function (response) {

                    $("#btn_EditTransaccion").bind("click");

                    showOkMessage('Categoría actualizada, se ah actualizado la Categoría <b>' + filaGuardada[0] + '<b>');
                    $('#btn_EditTransaccion').prop("disabled", true);

                    $('#nombre,#clave').keyup(function () {
                        $('#btn_EditTransaccion').prop("disabled", false);
                    });
                    $('#proceso,#area,#categoria').change(function () {
                        $('#btn_EditTransaccion').prop("disabled", false);
                    });

                }

            });
        } else {
        }

    });

    $("#btn_agregarAccionEF").click(function () {
        //$('#RN_Accion').bootstrapValidator('destroy');
        var valxx = '';
        var JSONcadena = "";



        if (validacionDelete == 1) {
            $.ajax({
                type: 'POST',
                url: 'MyWebService.asmx/DeleteReglasNegocioxAWS',
                data: {
                    idTipoTransaccion: IdTipoTran,
                    idEtapa: $("#RNA_etapa").val(),
                    idAccion: $("#RNA_accion").val(),
                    idEtapaF: $("#RNA_EtapaFinal").val()
                },
                success: function (result) {
                    $.smallBox({
                        title: "Éxito!",
                        content: "Se han Configurado las Reglas por Accion",
                        color: "#739e73",
                        timeout: 2000,
                        icon: "fa fa-thumbs-up swing animated"
                    });
                    $('#RN_Accion').bootstrapValidator('destroy');
                    Reset();
                    $("#select#RNA_EtapaFinal").prop("disabled", false);
                    $("#RNA_etapa").val(0);
                    $("#RNA_accion").val(0);
                    $("#RNA_EtapaFinal").val(0);

                }
            });
        } else if (valxx != 'Ningún dato disponible en esta tabla') {

            var row = $('#dtTiposTransaccion').DataTable().row('.selected').data();
            console.log("Para traer el id: " + row);
            var data = otableRA.rows().data();
            console.log(row);
            JSONcadena += '{"Datos": [{ ' +
                '"idTransaccion" : "' + row[5] + '",' +
                '"nombreTransaccion" : "' + row[0] + '"' +
                ' }],';
            var etapas = [];
            var etapas2 = new Array();
            var etapas3 = new Array();
            var etapas4 = new Array();
            var d = [];
            data.each(function (value, index) {
                console.log('Data in index: ' + index + ' is: ' + value);
                var x = 0;
                etapas.push(value[0]);
            });
            for (var i = 0; i < etapas.length; i++) {
                if (etapas2.indexOf(etapas[i])) {
                    etapas2.push(etapas[i]);
                }
            }
            etapas2 = eliminateDuplicates(etapas2);
            data.each(function (value, index) {
                if (jQuery.inArray(value[0], etapas2)) {

                } else {
                    for (var i = 0; i < etapas2.length; i++) {
                        if (etapas2[i] == value[0]) {
                            etapas4.push(value);
                        }
                    }
                }
                if (etapas2.indexOf(value[0])) {
                    for (var i = 0; i < etapas2.length; i++) {
                        if (etapas2[i] == value[0]) {
                            etapas4.push(value);
                        }
                    }
                }
            });
            var count2 = 0;
            for (var i = 0; i < etapas2.length; i++) {
                JSONcadena += '"' + etapas2[i] + '":[{';
                var count = 0;
                for (var j = 0; j < etapas4.length; j++) {
                    var arregloAux = new Array();
                    arregloAux = etapas4[j];
                    arregloAux.push(etapas4[j]);
                    console.log(arregloAux[3] );
                    if (arregloAux[0] == etapas2[i]) {
                        if (count >= 1) {
                            JSONcadena += ',';
                        }
                        JSONcadena += '"' + arregloAux[2] + '":[{' +
                            '"etapaFutura": "' + arregloAux[1] + '",' +
                            '"validacion": "' + arregloAux[3] + '",' +
                            '"alterna": "' + arregloAux[4] + '",' +
                            '"success": "' + arregloAux[5] + '",' +
                            '"error": "' + arregloAux[6] + '"' +
                            '}]';
                        count++;
                    }
                }
                count2++;
                if (count2 == etapas2.length) {
                    JSONcadena += '}]';
                } else {
                    JSONcadena += '}],';
                }
                var count = 0;
            }
            JSONcadena += '}';

            console.log("QQQQQ");
            console.log(JSONcadena);
            JSONcadena

            $.ajax({
                type: 'POST',
                url: 'MyWebService.asmx/DeleteReglasNegocioxAWS',
                data: {
                    idTipoTransaccion: IdTipoTran,
                    idEtapa: $("#RNA_etapa").val(),
                    idAccion: $("#RNA_accion").val(),
                    idEtapaF: $("#RNA_EtapaFinal").val()
                },
                success: function (result) {

                    $.ajax({
                        async: false,
                        type: 'POST',
                        url: 'MyWebService.asmx/InsertReglasNegocioxAWS',
                        data: JSON.stringify({
                            idTipoTransaccion: IdTipoTran,
                            idEtapa: $('select#RNA_etapa').val(),
                            idAccion: $('select#RNA_accion').val(),
                            idEtapaDestino: $('select#RNA_EtapaFinal').val(),
                            cadenaGenerada: JSONcadena

                        }),
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: function (response) {
                            $.smallBox({
                                title: "Éxito!",
                                content: "Se han Configurado las Reglas por Accion",
                                color: "#739e73",
                                timeout: 2000,
                                icon: "fa fa-thumbs-up swing animated"
                            });

                            InitDataTableReglaAccion();
                            Reset();
                           

                            $("#select#RNA_EtapaFinal").prop("disabled", false);
                            $("#RNA_etapa").val(0);
                            $("#RNA_accion").val(0)
                            $("#RNA_EtapaFinal").val(0);
                            $('#RN_Accion').bootstrapValidator('destroy');

                        }
                    });
                }
            });

            otableRA
                .clear()
                .draw();


        } else {
            $.smallBox({
                title: "Error!",
                content: "<i>Debes agregar una Regla</i>",
                color: "#c79121",
                timeout: 4000,
                icon: "fa fa-info-circle swing animated"
            });
        }

    })

    function eliminateDuplicates(arr) {
        var i,
            len = arr.length,
            out = [],
            obj = {};

        for (i = 0; i < len; i++) {
            obj[arr[i]] = 0;
        }
        for (i in obj) {
            out.push(i);
        }
        return out;
    }


    $('#RNA_EtapaFinal').change(function () {
        if ($('#RNA_EtapaFinal').val() != 0) {
            $('#sectionEstapaF').removeClass("has-error");
            $('#sectionEstapaF').addClass("has-success");
        } else {
            $('#sectionEstapaF').removeClass("has-success");
            $('#sectionEstapaF').addClass("has-error");
        }

    })

    $('#btn_agregar').click(function () {


        disable = 1;
        $('#tablaComplementarios tbody').removeClass('selected');
        $('#tablaComplementarios tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                otable1.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });

        if ($('#longitud').val() != '') {
            $('#longi').removeClass("has-error");

            $("#longi small").attr("data-bv-result", "VALID");
            $("#longi small").attr("style", "display: none;");
            $('#longi').addClass("has-success");

            $("#longi input").attr("data-bv-excluded", 'true');
        } else {
            $('#longi').removeClass("has-success");

            $("#longi small").attr("data-bv-result", "INVALID");
            $("#longi small").attr("style", "");
            $('#longi').addClass("has-error");

            $("#longi input").attr("data-bv-excluded", 'false');
        }

        var valores = [];
        $("#tablaComplementarios tr").find('td:eq(0)').each(function () {
            valores.push($(this).text());
        })
        if (valores.includes($('input#nombreCampo').val())) {
            $.smallBox({
                title: "Error",
                content: "<i class='fa fa-clock-o'></i> <i>El nombre del campo ya existe</i>",
                color: "#C46A69",
                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                timeout: 2000
            });

            $('input#nombreCampo').css({
                'background-color': '#C46A69'
            });
            $('#form_campos').bootstrapValidator('destroy');

            mouse();
        } else {
            bootsVal();
            $('#form_campos').data('bootstrapValidator').validate();
            var n = $('#form_campos').data('bootstrapValidator').isValid();
            if (n) {
                AgregarCampos();
                $('#btnEditComplement').show();
                $('#btnDeleteComplement').show();
                $('#tabla_Comp').show();
                $(".btn-next").prop("disabled", false);
                $.fn.dataTable.ext.errMode = 'none';
                var responsiveHelper_datatable_fixed_column = undefined;
                var breakpointDefinition = {
                    tablet: 1024,
                    phone: 480,
                    desktop: 1260
                };
                var count = 0;
                var datosCom = [];



                $.ajax({
                    async: false,
                    type: 'POST',
                    url: 'MyWebService.asmx/DTCamposWS',
                    data: JSON.stringify({
                        idTipoTransaccion: IdTipoTran
                    }),
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function (response) {

                        $.each(response, function (row, index) {
                            $.each(index.ListCamposTransaccion, function (r, arr) {

                                datosCom.push([arr.nombreCampo, arr.descCampo, arr.TipoDato, arr.longitud, arr.Nivel, arr.Operacion, arr.idTipoDato, arr.idNivel, arr.idOperacion, arr.idCampo]);
                            });
                        });
                    }

                });
                otable1 = $('#tablaComplementarios')
                    .DataTable({

                        "scrollY": "200px",
                        "scrollCollapse": true,
                        "paging": false,

                        "sPaginationType": "bootstrap", // full_numbers
                        "iDisplayStart ": 10,
                        "iDisplayLength": 10,
                        "bPaginate": false, //hide pagination
                        "bFilter": false, //hide Search bar
                        "bInfo": false, // hide showing entries
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
                        data: datosCom,
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
                        }
                        ]
                    });

                $('#tablaComplementarios tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    } else {
                        otable1.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });

                if (botonRnC == 1) {

                    var datosCom = [];
                    idCampoDatoInsert = []
                    var nombreCampoDs = [];
                    var valores = [];
                    var check1 = '<input type="checkbox" id="valor_' + check + '" name="Visible" value = "0">';
                    var check2 = '<input type="checkbox" id="valor_' + check + '" name="Editable" value = "0">';
                    var check3 = '<input type="checkbox" id="valor_' + check + '" name="Obligatorio" value = "0">';
                    var seelct;
                    datosCom.push('<input type="text" value="' + $("#nombreCampo").val() + '" id="valor_' + check + '" text=" ' + $("#nombreCampo").val() + '" name="Campo" readonly style="border:none; background: transparent;">', check1, check2, check3, ' <label class="select"><select class="select form-control" id="visualizacion_' + check + '" name="visualizacion" value="0" size="1"></select></label>');
                    var id = check;
                    id = (id + 1);
                    SelectVisualizacionEdit(id);

                }

                Reset();
                $('#tipoDato').val(0).trigger('change');
                $('#nivel').val(0).trigger('change');
                $('#tipoOperacion').val(0).trigger('change');
                $('#form_campos').bootstrapValidator('destroy');


            } else {


                $('#tablaComplementarios tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    } else {
                        otable1.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });
            }
        }
    });
    $('#btn_agregarOrden').click(function () {

        $('#tablaEtapas tbody').removeClass('selected');
        $('#tablaEtapas tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                otable2.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });

        var nomEtapa = [];

        $("#tablaEtapas tr").find('td:eq(0)').each(function () {
            nomEtapa.push($(this).text());
        })
        var ordEtapa = [];
        $("#tablaEtapas tr").find('td:eq(1)').each(function () {
            ordEtapa.push($(this).text());
        })


        if (nomEtapa.includes($('input#nombreEtapa').val())) {
            $.smallBox({
                title: "Error",
                content: "<i class='fa fa-clock-o'></i> <i>El nombre de la etapa ya existe</i>",
                color: "#C46A69",
                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                timeout: 2000
            });


            $('input#nombreEtapa').css({
                'background-color': '#C46A69'
            });

            mouse();
        } else if (ordEtapa.includes($('input#orden').val())) {
            $.smallBox({
                title: "Error",
                content: "<i class='fa fa-clock-o'></i> <i>El orden de la etapa ya existe</i>",
                color: "#C46A69",
                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                timeout: 2000
            });

            $('input#orden').css({
                'background-color': '#C46A69'
            });

            mouse();
        } else {

            bootsVal();
            $('#form_ciclo').data('bootstrapValidator').validate();
            var n = $('#form_ciclo').data('bootstrapValidator').isValid();

            if (n) {



                AgregarEtapa();
                $('#btnEditEtapa').show();
                $('#btnDeleteEtapa').show();

                var arr = $("#form_ciclo").serializeArray();
                var datosC = [];
                $.each(arr, function (i, fd) {
                    datosC.push(fd.value);


                })

                $.fn.dataTable.ext.errMode = 'none';
                var responsiveHelper_datatable_fixed_column = undefined;
                var breakpointDefinition = {
                    tablet: 1024,
                    phone: 480,
                    desktop: 1260
                };
                var datosCom = [];

                $('#TDEtapas').show();

                $.ajax({
                    async: false,
                    type: 'POST',
                    url: 'MyWebService.asmx/EtapasTransaccionN',
                    data: JSON.stringify({
                        idTipoTransaccion: IdTipoTran
                    }),
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function (response) {

                        $.each(response, function (row, index) {

                            $.each(index.etapaslista, function (r, arr) {
                                datosCom.push([arr.descripcion, arr.Orden]);
                            });
                        });
                    }
                });

                otable2 = $('#tablaEtapas')
                    .DataTable({

                        "scrollY": "200px",
                        "scrollCollapse": true,
                        "paging": false,

                        "sPaginationType": "bootstrap", // full_numbers
                        "iDisplayStart ": 10,
                        "iDisplayLength": 10,
                        "bPaginate": false, //hide pagination
                        "bFilter": false, //hide Search bar
                        "bInfo": false, // hide showing entries
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
                                    $('#tablaEtapas'), breakpointDefinition);
                            }
                        },
                        "rowCallback": function (nRow) {
                            responsiveHelper_datatable_fixed_column
                                .createExpandIcon(nRow);
                        },
                        "drawCallback": function (oSettings) {
                            responsiveHelper_datatable_fixed_column.respond();
                        },
                        data: datosCom,
                        columns: [{
                            title: "Nombre de la etapa"
                        },
                        {
                            title: "Orden"
                        },

                        ]
                    });




                Reset();

                $('#form_ciclo').bootstrapValidator('destroy');

                $('#tablaEtapas tbody').removeClass('selected');



                $('#tablaEtapas tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    } else {
                        otable2.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });

                SelectEtapasC();

                valorBtnEtp = 1;

            } else {
                // bootsVal();

            }

        }
    })
    $('#btn_agregarAccion').click(function () {


        var nomAcc = [];
        $("#tablaRoles tr").find('td:eq(1)').each(function () {
            nomAcc.push($(this).text());
        })
        var cveAcc = [];
        $("#tablaRoles tr").find('td:eq(2)').each(function () {
            cveAcc.push($(this).text());
        })
        var ordAcc = [];
        $("#tablaRoles tr").find('td:eq(3)').each(function () {
            ordAcc.push($(this).text());
        })

        if (nomAcc.includes($('input#nombreAccion').val())) {
            $.smallBox({
                title: "Error",
                content: "<i class='fa fa-clock-o'></i> <i>El nombre de la acción ya existe</i>",
                color: "#C46A69",
                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                timeout: 2000
            });

            $('input#nombreAccion').css({
                'background-color': '#C46A69'
            });
            document.getElementById('nombreAccion').focus();

            mouse();
        } else if (cveAcc.includes($('input#claveAccion').val())) {
            $.smallBox({
                title: "Error",
                content: "<i class='fa fa-clock-o'></i> <i>La clave de la acción ya existe</i>",
                color: "#C46A69",
                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                timeout: 2000
            });

            $('input#claveAccion').css({
                'background-color': '#C46A69'
            });
            document.getElementById('claveAccion').focus();

            mouse();
        } else if (ordAcc.includes($('input#ordenAccion').val())) {
            $.smallBox({
                title: "Error",
                content: "<i class='fa fa-clock-o'></i> <i>El orden de la acción ya existe</i>",
                color: "#C46A69",
                iconSmall: "fa fa-times fa-2x fadeInRight animated",
                timeout: 2000
            });

            $('input#ordenAccion').css({
                'background-color': '#C46A69'
            });
            document.getElementById('ordenAccion').focus();

            mouse();
        } else {
            bootsVal();
            $('#form_acciones').data('bootstrapValidator').validate();
            var n = $('#form_acciones').data('bootstrapValidator').isValid();


            if (n) {
                AgregarAccion();
                $("#p_roles").empty();
                $("#t_roles").empty();
                SelectRolesEdit();




            } else {
                // bootsVal();

            }
        }
    })
    $('#btn_agregarRN2').click(function () {
        bootsVal();
        $('#form_RN2').data('bootstrapValidator').validate();
        var n = $('#form_RN2').data('bootstrapValidator').isValid();
        if (n) {
            agregarReglasNegocio();



        }
    })

    $("select#formula_etapa").change(function () {

        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/llenaComboAcciones',
            dataType: 'json',
            data: JSON.stringify({
                idTipoTran: IdTipoTran,
                idEtapas: $("select#formula_etapa").val()
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                var nivtransact = "";
                $.each(response, function (registro, row1) {

                    nivtransact += '<option value="0" > Seleccione una acción </option>';
                    $.each(row1.listAcciones, function (i1, r1) {
                        nivtransact += '<option value="' + r1.idAccion + '">' + r1.descripcion + '</option>';
                    });


                });

                $("select#fomula_accion").html(nivtransact);
            },
            error: function (e) {
                console.log("Error en Etapa");

            }
        });
    })
}

function showWarningMessage(titulo, mensaje) {
    $.smallBox({
        title: titulo,
        content: mensaje,
        color: "#C79121",
        timeout: 4000,
        icon: "fa fa-exclamation-circle swing animated"
    });
}

function showOkMessage(titulo, mensaje) {
    $.smallBox({
        title: titulo,
        content: mensaje,
        color: "#296191",
        timeout: 4000,
        icon: "fa fa-thumbs-o-up swing animated"
    });
}

function mostrarDialogCompl() {

    $("#dialog").dialog({
        show: "blind",
        hide: "blind",
        width: 700
    });
}

function OcultarDialogCompl() {
    $("#dialog").hide();
}

function mostrarDialogEtapa() {

    $("#dialog2").dialog({
        show: "blind",
        hide: "blind",
        width: 500
    });
}

function OcultarDialogEtapa() {
    $("#dialog2").hide();
}

function mostrarDialogEtaRol() {

    $("#dialog3").dialog({
        show: "blind",
        hide: "blind",
        position: 'top',
        width: 500
    });
}

function OcultarDialogEtaRol() {
    $("#dialog3").hide();
}

function mostrarDialogReglaA() {

    $("#dialogReglaNA").dialog({
        show: "blind",
        hide: "blind",
        width: 500
    });
}

function OcultarDialogReglaA() {
    $("#dialogReglaNA").hide();
}

function initDataTable() {
    $.fn.dataTable.ext.errMode = 'none';
    var responsiveHelper_datatable_fixed_column = undefined;
    var breakpointDefinition = {
        tablet: 1024,
        phone: 480,
        desktop: 1260
    };
    var count = 0;
    var datos = [];



    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/LlenaTipoTransaccion',
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
                $.each(index.ListaTipoTran, function (r, arr) {

                    datos.push([arr.nombre, arr.clave, arr.categoria, arr.estatus, arr.fecha, arr.idTipoTransaccion, arr.area, arr.proceso, arr.idCategoria]);
                    //console.log("ssssss: " + JSON.stringify(datos));
                });
            });

        }

    });
    otable = $('#dtTiposTransaccion')
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
                        $('#dtTiposTransaccion'), breakpointDefinition);
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
                title: "Nombre"
            },
            {
                title: "Clave"
            },
            {
                title: "Categoría"
            },
            {
                title: "Estatus"
            },
            {
                title: "Fecha"
            },
            ]
        });

    // Evento creado para realizar la búsqueda cuando se presione la tecla ENTER
    $("#dtTiposTransaccion thead th input[type=text]").on(
        'keyup',
        function (e) {
            otable.column($(this).parent().index() + ':visible').search(
                this.value).draw();
        });

    // Método creado para agregar el evento de selección de una fila
    $('#dtTiposTransaccion tbody').on(
        'click',
        'tr',
        function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $('#dtTiposTransaccion').DataTable().$('tr.selected').removeClass(
                    'selected');
                $(this).addClass('selected');
            }
        });
    // Evento creado para abrir la ventana de editar al dar doble click sobre un
    // registro
    $('#dtTiposTransaccion tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        var row;

        row = otable.row(this).data();

        editTransact();

    });
}

function InitDataTableRol() {
    var datosC = [];
    $.fn.dataTable.ext.errMode = 'none';
    var responsiveHelper_datatable_fixed_column = undefined;
    var breakpointDefinition = {
        "tablet": 1024,
        "phone": 480,
        "desktop": 1260
    };
    $('#tablaRoles').show();
    $('#Tabla_Rol').show();
    $('#BotonesRol').show();
    var datosCom = [];
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/CatETapasAcionesWS',
        data: JSON.stringify({
            idTipoTransaccion: IdTipoTran,
            idEtapa: idEtapa
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var roles = "";
            var estatus = "";
            $.each(response, function (row, index) {
                $.each(index.listEtapas, function (r, arr) {
                    $.ajax({
                        async: false,
                        type: 'POST',
                        url: 'MyWebService.asmx/CatRolesWS',
                        data: JSON.stringify({
                            idTipoTransaccion: IdTipoTran,
                            idEtapa: idEtapa,
                            descripcion: arr.descripcion
                        }),
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: function (response) {
                            roles = "";
                            estatus = "";
                            $.each(response, function (row, index) {
                                $.each(index.CamposRoles, function (r, arrL) {



                                    roles += arrL.nombreRol + "|";
                                    estatus += arrL.estatus + "|";

                                });
                            });

                        }

                    });
                    datosCom.push([arr.idEtapa, arr.descripcion, arr.ClaveEtapa, arr.orden, roles, estatus, arr.idAccion]);
                });
            });
        }

    });

    var otable = $('#tablaRoles')
        .DataTable({

            "scrollY": "200px",
            "scrollCollapse": true,
            "paging": false,

            "sPaginationType": "bootstrap", // full_numbers
            "iDisplayStart ": 10,
            "iDisplayLength": 10,
            "bPaginate": false, //hide pagination
            "bFilter": false, //hide Search bar
            "bInfo": false, // hide showing entries
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
                        $('#tablaRoles'), breakpointDefinition);
                }
            },
            "rowCallback": function (nRow) {
                responsiveHelper_datatable_fixed_column
                    .createExpandIcon(nRow);
            },
            "drawCallback": function (oSettings) {
                responsiveHelper_datatable_fixed_column.respond();
            },
            data: datosCom,
            columns: [{
                title: "Etapa"
            },
            {
                title: "Accion"
            },
            {
                title: "Clave Accion"
            },
            {
                title: "Orden Accion."
            }
            ]
        });




    $('#tablaRoles tbody').on(
        'dblclick',
        'tr',
        function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $('#tablaRoles').DataTable().$('tr.selected').removeClass(
                    'selected');
                $(this).addClass('selected');
            }
        });

    if (datosCom.length > 0) {
        $(".btn-next").prop("disabled", false);

        console.log(datosCom.length);
    } else {
        $(".btn-next").prop("disabled", true);
        console.log(datosCom.length);
    }
    //if ($('#tablaRoles >tbody').length >0) {
    //    $(".btn-next").prop("disabled", false);
    //    console.log($('#tablaRoles >tbody').val());

    //    } else {
    //        $(".btn-next").prop("disabled", true);
    //        console.log($('#tablaRoles >tbody').val());
    //    }
}

function InitDataTableForm() {
    var datosC = [];
    $.fn.dataTable.ext.errMode = 'none';
    var responsiveHelper_datatable_fixed_column = undefined;
    var breakpointDefinition = {
        "tablet": 1024,
        "phone": 480,
        "desktop": 1260
    };
    $('#tablaRoles').show();
    $('#BotonesRol').show();
    var datosCom = [];
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/CatformulasWS',
        data: JSON.stringify({
            idTipoTransaccion: IdTipoTran,
            idAccion: idAccion,
            idEtapa: idEtapa,
            idCampo: idCampoF
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var roles = "";
            var estatus = "";
            var formula = "";
            var arrForm = [];
            var subForm = "";
            $.each(response, function (row, index) {
                $.each(index.listaformula, function (r, arr) {

                    jsonFormula = jQuery.parseJSON(arr.cadenaGenerada)

                    $.each(jsonFormula, function (j12, cam12) {

                        $.each(cam12.Formulas, function (j13, cam13) {


                            formula += cam13.Formula + "#";

                        });

                    });
                    subForm = formula.substring(0, formula.length - 1);
                    arrForm = subForm.split("#");
                    for (var i = 0; i < arrForm.length; i++) {
                        datosCom.push([arrForm[i], arr.Etapa, arr.Accion, arr.idAccion, arr.idEtapa, arr.idCampo]);

                    }
                });
            });
        }

    });

    $('#tablaFormulas tbody').removeClass('selected');


    otableF = $('#tablaFormulas')
        .DataTable({

            "scrollY": "200px",
            "scrollCollapse": true,
            "paging": false,

            "sPaginationType": "bootstrap", // full_numbers
            "iDisplayStart ": 10,
            "iDisplayLength": 10,
            "bPaginate": false, //hide pagination
            "bFilter": false, //hide Search bar
            "bInfo": false, // hide showing entries
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
                        $('#tablaFormulas'), breakpointDefinition);
                }
            },
            "rowCallback": function (nRow) {
                responsiveHelper_datatable_fixed_column
                    .createExpandIcon(nRow);
            },
            "drawCallback": function (oSettings) {
                responsiveHelper_datatable_fixed_column.respond();
            },
            data: datosCom,
            columns: [{
                title: "Fórmula"
            },
            {
                title: "Etapa"
            },
            {
                title: "Accion"
            }
            ]
        });



    $('#tablaFormulas tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            otable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
}

function InitDataTableRegaCampo() {
    var datosC = [];
    $.fn.dataTable.ext.errMode = 'none';
    var responsiveHelper_datatable_fixed_column = undefined;
    var breakpointDefinition = {
        "tablet": 1024,
        "phone": 480,
        "desktop": 1260
    };
    $('.trnc').show();
    $('#btn_agregarRN2').show();
    var datosCom = [];
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/ReglasxCamposWs',
        data: JSON.stringify({
            idTipoTransaccion: IdTipoTran,
            idAccion: $("select#rn2_accion").val(),
            idEtapa: $("select#rn2_etapa").val()
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var roles = "";
            var estatus = "";
            var formula = "";
            var arrForm = [];
            var subForm = "";
            idCampoDato = [];
            var countXX = 0;
            var countCheck1_1 = 0;
            var countCheck1_2 = 0;

            var countCheck2_1 = 0;
            var countCheck2_2 = 0;

            var countCheck3_1 = 0;
            var countCheck3_2 = 0;
            idCampoTrigger = [];
            var check1 = '<input type="checkbox" id="valor_' + check + '" name="Visible" value = "0" />';
            var check2 = '<input type="checkbox" id="valor_' + check + '" name="Editable" value = "0" />';
            var check3 = '<input type="checkbox" id="valor_' + check + '" name="Obligatorio" value = "0" />';
            check = 0;
            $.each(response, function (row, index) {
                $.each(index.caposReglas, function (r, arr) {
                    vistransact = '';
                    $.ajax({
                        async: false,
                        type: 'POST',
                        url: 'MyWebService.asmx/visualizacionTansATT',
                        dataType: 'json',
                        data: JSON.stringify({
                            idTipoDatoCampo: arr.idTipoDatoCampo
                        }),
                        contentType: 'application/json; charset=utf-8',
                        success: function (response) {
                            vistransact = ' <label class="select boosSelect"><select class="select form- control " id="visualizacion_' + check + '" name="visualizacion" value="0" size="1" required aria-required="true">';
                            vistransact += '<option value ="0" selected="selected" >Seleccione el tipo de visualización</option>';
                            $.each(response, function (registro, row1) {
                                $.each(row1.CamposVisualizacion, function (i1, r1) {
                                    if (r1.idVisualizacion == arr.idVisualizacion) {
                                        vistransact += '<option value="' + r1.idVisualizacion + '" selected="selected" >' + r1.descripcion + '</option>'

                                    } else {
                                        vistransact += '<option value="' + r1.idVisualizacion + '" >' + r1.descripcion + '</option>'
                                    }
                                });

                            });

                            vistransact += ' </select ></label >';
                        },
                        error: function (e) {
                            console.log("Error en TiposVisualización");

                        }
                    });
                    if (arr.visible == false) {
                        check1 = '<input type="checkbox" id="valor_' + check + '" name="Visible" value = "0"><p class="hidden">' + countCheck1_1++ + '</p></input>';

                    } else {
                        check1 = '<input type="checkbox" checked = ' + arr.visible + ' id="valor_' + check + '" name="Visible" value = "0"><p class="hidden">' + countCheck1_2++ + '</p></input>';

                    }
                    if (arr.editable == false) {
                        check2 = '<input type="checkbox" id="valor_' + check + '" name="Editable" value = "0"><p class="hidden">' + countCheck2_1++ + '</p></input>';

                    } else {
                        check2 = '<input type="checkbox" checked = ' + arr.editable + ' id="valor_' + check + '" name="Editable" value = "0"><p class="hidden">' + countCheck2_2++ + '</p></input>';

                    }
                    if (arr.obligatorio == false) {
                        check3 = '<input type="checkbox"  id="valor_' + check + '" name="Obligatorio" value = "0"><p class="hidden">' + countCheck3_1++ + '</p></input>';

                    } else {
                        check3 = '<input type="checkbox" checked = ' + arr.obligatorio + '  id="valor_' + check + '" name="Obligatorio" value = "0"><p class="hidden">' + countCheck3_2++ + '</p></input>';

                    }
                    datosCom.push(['<input class="" type="text" value="' + arr.nombreCampo + '" id="valor_' + check + '" text=" ' + arr.nombreCampo + '" name="Campo"  style="border:none; background: transparent;"><p class="hidden">' + countXX++ + '</p></input>', check1, check2, check3, vistransact, arr.idTipoDatoCampo]);

                    nombreCampoDi.push(arr.nombreCampo);
                    idCampoTrigger.push(arr.idVisualizacion);

                    check++;

                });
            });
            $('#example tbody').removeClass('selected');

            $('#example tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                } else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
            table = $('#example').DataTable({

                "scrollY": "200px",
                "scrollCollapse": true,
                "paging": false,
                "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6 hidden-xs'l><'col-sm-6 col-xs-12 hidden-xs'<'toolbar'>>r>" +
                "t" +
                "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
                "oLanguage": {
                    "sUrl": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                },
                "sPaginationType": "bootstrap", // full_numbers
                "iDisplayStart ": 10,
                "iDisplayLength": 10,
                "order": [],
                "autoWidth": true,
                "preDrawCallback": function () {
                    if (!responsiveHelper_datatable_fixed_column) {
                        responsiveHelper_datatable_fixed_column = new ResponsiveDatatablesHelper(
                            $('#example'), breakpointDefinition);
                    }
                },
                "rowCallback": function (nRow) {
                    responsiveHelper_datatable_fixed_column
                        .createExpandIcon(nRow);
                },
                "drawCallback": function (oSettings) {
                    responsiveHelper_datatable_fixed_column.respond();
                },
                data: datosCom,
                columns: [{
                    title: "Nombre del campo "
                },
                {
                    title: "<input type='checkbox' id='todosVisible'/><center>Visible</center>"
                },
                {
                    title: "<input type='checkbox' id='todosEditable'/><center>Editable</center>"
                },
                {
                    title: "<input type='checkbox' id='todosObligatorio'/><center>Obligatorio.</center>"
                },
                {
                    title: "<center>Tipo de visualización</center>"
                }
                ]
            });

            if (datosCom.length > 0) {
                $(".btn-next").prop("disabled", false);
            } else {
                $(".btn-next").prop("disabled", true);
            }

            $('#example tbody').on(
                'click',
                'tr',
                function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    } else {
                        $('#example').DataTable().$('tr.selected').removeClass(
                            'selected');
                        $(this).addClass('selected');
                    }
                });

            //for (var i = 0; i < idCampoTrigger.length; i++) {
            //    $("#visualizacion_" + i + " option[value=" + idCampoTrigger[i] + "]").attr("selected", true);

            //    console.log(idCampoTrigger[i])

            //}
        }

    });



}

function InitDataTableComobobox() {
    $("#Combo_accion").change(function () {
        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/CatConboboxRNGWS',
            data: JSON.stringify({
                idTipoTransaccion: IdTipoTran,
                idEtapa: $("#Combo_etapa").val(),
                idAccion: $("#Combo_accion").val()
            }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',

            success: function (response) {
                console.log("carajo: " + JSON.stringify(response));
                var datosCom = [];
                var seelct;
                $.each(response, function (row, index) {
                    $.each(index.listaCamposconboboxRNG, function (r, arr) {
                        vistransact = '';
                        selectTipoTransa = '';
                        categtransact = "";
                        categtransact2 = "";
                        $.ajax({
                            async: false,
                            type: 'POST',
                            url: 'MyWebService.asmx/TiposTrans',
                            dataType: 'json',
                            contentType: 'application/json; charset=utf-8',
                            success: function (response) {
                                console.log("carajo222: " + JSON.stringify(response));
                                vistransact = ' <label class="select"><select class="select form-control" id="categorias_' + x + '" name="categorias" value="0" size="1">';
                                vistransact += '<option value ="0" selected="selected" >Seleccione una categoría</option>';
                                $.each(response, function (registro, row1) {

                                    $.each(row1.ListaCategorias, function (i1, r1) {
                                        if (arr.idCategoria == 0) {

                                            selectTipoTransa = ' <label class="select"><select class="select form-control" id="tipoTransacciones_' + x + '" name="tipoTransacciones value="0" size="1">';
                                            selectTipoTransa += '<option value ="0" selected="selected" >Seleccione una transaccion</option>';

                                        }
                                        if (arr.idtipotran == 0) {
                                            categtransact = ' <label class="select"><select class="select form-control" id="idReferencia_' + x + '" name="idReferencia" value="0" size="1">';
                                            categtransact += '<option value ="0" selected="selected" >Seleccione un Campo</option>';
                                            categtransact2 = ' <label class="select"><select class="select form-control" id="nombreReferencia_' + x + '" name="nombreReferencia" value="0" size="1">';
                                            categtransact2 += '<option value ="0" selected="selected" >Seleccione un Campo</option>';

                                        }

                                        if (arr.idCategoria == r1.idCatTipoTransac) {

                                            vistransact += '<option value="' + r1.idCatTipoTransac + '"  selected="selected">' + r1.categoriaTransac + '</option>';

                                            editCombo = 1;

                                            selectTipoTransa = ' <label class="select"><select class="select form-control" id="tipoTransacciones_' + x + '" name="tipoTransacciones value="0" size="1">';
                                            selectTipoTransa += '<option value ="0" selected="selected" >Seleccione una transaccion</option>';
                                            $.ajax({
                                                async: false,
                                                type: 'POST',
                                                url: 'MyWebService.asmx/camposTrans',
                                                data: JSON.stringify({
                                                    idtipo: r1.idCatTipoTransac
                                                }),
                                                dataType: 'json',
                                                contentType: 'application/json; charset=utf-8',
                                                success: function (response) {
                                                    var categtransact1 = "";
                                                    $.each(response, function (registro, row1) {
                                                        $.each(row1.camposCompTransac, function (i1, r1) {
                                                            if (r1.idTipoTransaccion == arr.idtipotran) {

                                                                selectTipoTransa += '<option value="' + r1.idTipoTransaccion + '" selected="selected" >' + r1.descripcion + '</option>';

                                                                $.ajax({
                                                                    async: false,
                                                                    type: 'POST',
                                                                    url: 'MyWebService.asmx/CamposWS',
                                                                    dataType: 'json',
                                                                    data: JSON.stringify({
                                                                        idTipotransaccion: r1.idTipoTransaccion
                                                                    }),
                                                                    contentType: 'application/json; charset=utf-8',
                                                                    success: function (response) {
                                                                        categtransact = ' <label class="select"><select class="select form-control" id="idReferencia_' + x + '" name="idReferencia" value="0" size="1">';
                                                                        categtransact += '<option value ="0" selected="selected" >Seleccione un Campo</option>';


                                                                        categtransact2 = ' <label class="select"><select class="select form-control" id="nombreReferencia_' + x + '" name="nombreReferencia" value="0" size="1">';
                                                                        categtransact2 += '<option value ="0" selected="selected" >Seleccione un Campo</option>';
                                                                        $.each(response, function (registro, row1) {
                                                                            $.each(row1.ListCamposTransaccion, function (i1, r1) {
                                                                                if (r1.nombreCampo == arr.idReferencia) {

                                                                                    categtransact += '<option value="' + r1.nombreCampo + '" selected="selected" >' + r1.nombreCampo + '</option>';

                                                                                } else {
                                                                                    categtransact += '<option value="' + r1.nombreCampo + '">' + r1.nombreCampo + '</option>';

                                                                                }
                                                                            });
                                                                            $.each(row1.ListCamposTransaccion, function (i1, r1) {
                                                                                if (r1.nombreCampo == arr.nombreReferencia) {
                                                                                    categtransact2 += '<option value="' + r1.nombreCampo + '" selected="selected">' + r1.nombreCampo + '</option>';

                                                                                } else {
                                                                                    categtransact2 += '<option value="' + r1.nombreCampo + '">' + r1.nombreCampo + '</option>';

                                                                                }
                                                                            });


                                                                        });
                                                                    }

                                                                });
                                                            } else {

                                                                selectTipoTransa += '<option value="' + r1.idTipoTransaccion + '">' + r1.descripcion + '</option>';


                                                            }

                                                        });


                                                    });

                                                }
                                            });
                                        } else {
                                            vistransact += '<option value="' + r1.idCatTipoTransac + '" >' + r1.categoriaTransac + '</option>';
                                        }


                                    });

                                });
                                selectTipoTransa += ' </select ></label >';
                                vistransact += ' </select ></label >';
                                categtransact += ' </select ></label >';
                                categtransact2 += ' </select ></label >';
                            }
                        });
                        if (editCombo > 1) {
                            selectTipoTransa += ' <label class="select"><select class="select form-control" id="tipoTransacciones_' + x + '" name="tipoTransacciones value="0" size="1"></select ></label>';
                            categtransact += ' <label class="select"><select class="select form-control" id="idReferencia_' + x + '" name="idReferencia" value="0" size="1"></select ></label>';
                            categtransact2 += ' <label class="select"><select class="select form-control" id="nombreReferencia_' + x + '" name="nombreReferencia" value="0" size="1"></select ></label>';
                        }
                        datosCom.push(['<input type="text" value="' + arr.nombreCampo + '" id="valor_' + check + '" text=" ' + arr.nombreCampo + '" name="Campo" readonly style="border:none; background: transparent;"/>', vistransact, selectTipoTransa, categtransact, categtransact2]);
                        x++;
                    });
                });

                $.fn.dataTable.ext.errMode = 'none';
                var responsiveHelper_datatable_fixed_column = undefined;
                var breakpointDefinition = {
                    tablet: 1024,
                    phone: 480,
                    desktop: 1260
                };
                $('#btn_agregarCombo').show();

                $('#examples').show();
                tables = $('#examples').DataTable({
                    "paging": false,
                    "sPaginationType": "bootstrap", // full_numbers
                    "iDisplayStart ": 10,
                    "iDisplayLength": 10,
                    "bPaginate": false, //hide pagination
                    "bFilter": false, //hide Search bar
                    "bInfo": false, // hide showing entries
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
                                $('#examples'), breakpointDefinition);
                        }
                    },

                    "drawCallback": function (oSettings) {
                        responsiveHelper_datatable_fixed_column.respond();
                    },
                    data: datosCom,
                    columns: [{
                        title: "Nombre del campo"
                    },
                    {
                        title: "Categoría"
                    },
                    {
                        title: "Tipo de transacción"
                    },
                    {
                        title: "Campo de referencia"
                    },
                    {
                        title: "Campo desplegable"
                    }

                    ]
                });


                $(".btn-next").prop("disabled", false);

                $('#rn2_etapa').val(0);
                $('select#rn2_accion').val(0);

            }

        });

        for (var i = 1; i < x; i++) {
            SelectCatTTS(i);
            //document.getElementsByName("#tipoTransacciones_" + i).val().trigger('change');

        }
    })

}

function InitDataTableAutocomplete() {
    $("#Autocompletar_Combo").change(function () {
        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/campNCombWS',
            data: JSON.stringify({
                idTipotransaccion: IdTipoTran,
                idEtapa: $("#Autocompletar_etapa").val(),
                idAccion: $("#Autocompletar_accion").val(),
                idCampo: $("#Autocompletar_Combo").val()
            }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',

            success: function (response) {
                var datosCom = [];

                var seelct;

                $.each(response, function (row, index) {
                    $.each(index.listaCamp, function (r, arr) {
                        vistransact = '';
                        selectTipoTransa = '';
                        categtransact = "";
                        categtransact2 = "";
                        $.ajax({
                            async: false,
                            type: 'POST',
                            url: 'MyWebService.asmx/TiposTrans',
                            dataType: 'json',
                            contentType: 'application/json; charset=utf-8',
                            success: function (response) {
                                vistransact = ' <label class="select"><select class="select form-control" id="Autocategorias_' + x + '" name="categorias" value="0" size="1">';
                                vistransact += '<option value ="0" selected="selected" >Seleccione una categoría</option>';
                                $.each(response, function (registro, row1) {

                                    $.each(row1.ListaCategorias, function (i1, r1) {
                                        if (arr.idCategoria == 0) {

                                            selectTipoTransa = ' <label class="select"><select class="select form-control" id="AutotipoTransacciones_' + x + '" name="tipoTransacciones value="0" size="1">';
                                            selectTipoTransa += '<option value ="0" selected="selected" >Seleccione una transaccion</option>';

                                        }
                                        if (arr.idTransaccion == 0) {
                                            categtransact = ' <label class="select"><select class="select form-control" id="AutoidReferencia_' + x + '" name="idReferencia" value="0" size="1">';
                                            categtransact += '<option value ="0" selected="selected" >Seleccione un Campo</option>';
                                            categtransact2 = ' <label class="select"><select class="select form-control" id="AutonombreReferencia_' + x + '" name="nombreReferencia" value="0" size="1">';
                                            categtransact2 += '<option value ="0" selected="selected" >Seleccione un Campo</option>';

                                        }

                                        if (arr.idCategoria == r1.idCatTipoTransac) {

                                            vistransact += '<option value="' + r1.idCatTipoTransac + '"  selected="selected">' + r1.categoriaTransac + '</option>';
                                            editCombo = 1;
                                            selectTipoTransa = ' <label class="select"><select class="select form-control" id="AutotipoTransacciones_' + x + '" name="tipoTransacciones value="0" size="1">';
                                            selectTipoTransa += '<option value ="0" selected="selected" >Seleccione una transaccion</option>';
                                            console.log(r1.idCatTipoTransac)
                                            $.ajax({
                                                async: false,
                                                type: 'POST',
                                                url: 'MyWebService.asmx/camposTrans',
                                                data: JSON.stringify({
                                                    idtipo: r1.idCatTipoTransac
                                                }),
                                                dataType: 'json',
                                                contentType: 'application/json; charset=utf-8',
                                                success: function (response) {
                                                    var categtransact1 = "";
                                                    $.each(response, function (registro, row1) {
                                                        $.each(row1.camposCompTransac, function (i1, r1) {
                                                            if (r1.idTipoTransaccion == arr.idTransaccion) {
                                                                console.log(r1.idTipoTransaccion)
                                                                selectTipoTransa += '<option value="' + r1.idTipoTransaccion + '" selected="selected" >' + r1.descripcion + '</option>';

                                                                $.ajax({
                                                                    async: false,
                                                                    type: 'POST',
                                                                    url: 'MyWebService.asmx/CamposWS',
                                                                    dataType: 'json',
                                                                    data: JSON.stringify({
                                                                        idTipotransaccion: r1.idTipoTransaccion
                                                                    }),
                                                                    contentType: 'application/json; charset=utf-8',
                                                                    success: function (response) {
                                                                        categtransact = ' <label class="select"><select class="select form-control" id="AutoidReferencia_' + x + '" name="idReferencia" value="0" size="1">';
                                                                        categtransact += '<option value ="0" selected="selected" >Seleccione un Campo</option>';


                                                                        categtransact2 = ' <label class="select"><select class="select form-control" id="AutonombreReferencia_' + x + '" name="nombreReferencia" value="0" size="1">';
                                                                        categtransact2 += '<option value ="0" selected="selected" >Seleccione un Campo</option>';
                                                                        $.each(response, function (registro, row1) {
                                                                            $.each(row1.ListCamposTransaccion, function (i1, r1) {
                                                                                if (r1.nombreCampo == arr.idRef) {

                                                                                    categtransact += '<option value="' + r1.nombreCampo + '" selected="selected" >' + r1.nombreCampo + '</option>';

                                                                                } else {
                                                                                    categtransact += '<option value="' + r1.nombreCampo + '">' + r1.nombreCampo + '</option>';

                                                                                }
                                                                            });
                                                                            $.each(row1.ListCamposTransaccion, function (i1, r1) {
                                                                                if (r1.nombreCampo == arr.CampoRef) {
                                                                                    categtransact2 += '<option value="' + r1.nombreCampo + '" selected="selected">' + r1.nombreCampo + '</option>';

                                                                                } else {
                                                                                    categtransact2 += '<option value="' + r1.nombreCampo + '">' + r1.nombreCampo + '</option>';

                                                                                }
                                                                            });


                                                                        });
                                                                    }

                                                                });
                                                            } else {

                                                                selectTipoTransa += '<option value="' + r1.idTipoTransaccion + '">' + r1.descripcion + '</option>';


                                                            }

                                                        });


                                                    });

                                                }
                                            });
                                        } else {
                                            vistransact += '<option value="' + r1.idCatTipoTransac + '" >' + r1.categoriaTransac + '</option>';
                                        }


                                    });

                                });
                                selectTipoTransa += ' </select ></label >';
                                vistransact += ' </select ></label >';
                                categtransact += ' </select ></label >';
                                categtransact2 += ' </select ></label >';
                            }
                        });
                        if (editCombo > 1) {
                            selectTipoTransa += ' <label class="select"><select class="select form-control" id="AutotipoTransacciones_' + x + '" name="AutotipoTransacciones value="0" size="1"></select ></label>';
                            categtransact += ' <label class="select"><select class="select form-control" id="AutoidReferencia_' + x + '" name="AutoidReferencia" value="0" size="1"></select ></label>';
                            categtransact2 += ' <label class="select"><select class="select form-control" id="AutonombreReferencia_' + x + '" name="AutonombreReferencia" value="0" size="1"></select ></label>';
                        }
                        $.ajax({
                            async: false,
                            type: 'POST',
                            url: 'MyWebService.asmx/campJsonWS',
                            dataType: 'json',
                            data: JSON.stringify({
                                idTipotransaccion: IdTipoTran,
                                idEtapa: $('select#Autocompletar_etapa option:selected').val(),
                                idAccion: $('select#Autocompletar_accion option:selected').val(),
                                nombreCampo: $('select#Autocompletar_Combo option:selected').text()

                            }),
                            contentType: 'application/json; charset=utf-8',
                            success: function (response) {
                                var nivtransact = "";
                                var primaryKey = "";
                                $.each(response, function (registro, row1) {
                                    $.each(row1.ListCamposTransaccion, function (i1, r1) {
                                        if (r1.idReferencia != '') {
                                            primaryKey = r1.idReferencia;
                                        } else {
                                            primaryKey = "No hay Referencia";
                                        }
                                        datosCom.push(['<input type="text" value="' + arr.idCampo + '" id="Autovalor_' + x + '" text=" ' + arr.idCampo + '" name="Campo" readonly style="border:none;  background: transparent;"/>', vistransact, selectTipoTransa, categtransact, categtransact2, '<input type="text" value="' + primaryKey + '" id="Autovalor_' + x + '" text=" ' + primaryKey + '" name="Campo" readonly style="border:none; text-align: center; background: transparent;"/>', '<input type="text" value="Text" id="Autovalor_' + x + '" text="Text" name="Campo" readonly style="border:none; text-align: center; background: transparent;"/>']);

                                    });


                                });


                            }
                        });
                        x++;
                    });
                });
                console.log(datosCom)
                $.fn.dataTable.ext.errMode = 'none';
                var responsiveHelper_datatable_fixed_column = undefined;
                var breakpointDefinition = {
                    tablet: 1024,
                    phone: 480,
                    desktop: 1260
                };
                $('#btn_agregarAutocompletar').show();
                $('#DTAutocompletar').show();
                tablesAuto = $('#DTAutocompletar').DataTable({
                    "paging": false,
                    "sPaginationType": "bootstrap", // full_numbers
                    "iDisplayStart ": 10,
                    "iDisplayLength": 10,
                    "bPaginate": false, //hide pagination
                    "bFilter": false, //hide Search bar
                    "bInfo": false, // hide showing entries
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
                                $('#DTAutocompletar'), breakpointDefinition);
                        }
                    },

                    "drawCallback": function (oSettings) {
                        responsiveHelper_datatable_fixed_column.respond();
                    },
                    data: datosCom,
                    columns: [{
                        title: "Nombre del campo",
                        width: "5%",
                        className: "dt-center", "targets": "_all"

                    },
                    {
                        title: "Categoría",
                        className: "dt-center", "targets": "_all"
                    },
                    {
                        title: "Tipo de transacción",
                        className: "dt-center", "targets": "_all"
                    },
                    {
                        title: "Campo de referencia",
                        className: "dt-center", "targets": "_all"
                    },
                    {
                        title: "Campo desplegable",
                        className: "dt-center", "targets": "_all"
                    },
                    {
                        title: "PrimaryKey",
                        width: "5%",
                        className: "dt-center", "targets": "_all"

                    },
                    {
                        title: "Tipo de Dato",
                        width: "5%",
                        className: "dt-center", "targets": "_all"
                    }

                    ]
                });


                $(".btn-next").prop("disabled", false);

                $('#rn2_etapa').val(0);
                $('select#rn2_accion').val(0);

            }

        });

        for (var i = 1; i < x; i++) {
            SelectCatTTSAuto(i);
        }
    })

}

function InitDataTableReglaAccion(x) {

    console.log("******: " + IdTipoTran);

    ArregloValidarAccionesEdit = new Array();
    var arrayAux = new Array();
    var datosC = [];
    $.fn.dataTable.ext.errMode = 'none';
    var responsiveHelper_datatable_fixed_column = undefined;
    var breakpointDefinition = {
        "tablet": 1024,
        "phone": 480,
        "desktop": 1260
    };

    var datosCom2 = [];
    var arrayX = new Array();
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/CatReglasNegocioxAccionWS',
        data: JSON.stringify({
            idTipoTransaccion: IdTipoTran,
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var cadenaAux;

            console.log("Response -------> ");
            response = jQuery.parseJSON(response.d.listaReglasxAccion[0].ReglaxAccion);
            $.each(response, function (i, json) {

                $.each(json[0], function (j, row) {

                    if (j != 'idTransaccion') {
                        if (j != 'nombreTransaccion') {

                            console.log(j);
                            row[0].accion = j;
                            row[0].etapa = i;
                            cadenaAux = JSON.stringify(row[0]);
                            arrayAux.push(cadenaAux.split(","));
                        }

                    }



                });
            });

            for (var i = 0; i < arrayAux.length; i++) {
                arrayAux[i][0] = arrayAux[i][0].replace('{"etapaFutura":"', '');
                arrayAux[i][0] = arrayAux[i][0].replace('\"', '');

                arrayAux[i][1] = arrayAux[i][1].replace('validacion":"', '');
                arrayAux[i][1] = arrayAux[i][1].replace('\"', '');
                arrayAux[i][1] = arrayAux[i][1].replace('\"', '');

                arrayAux[i][2] = arrayAux[i][2].replace('alterna":"', '');
                arrayAux[i][2] = arrayAux[i][2].replace('\"', '');
                arrayAux[i][2] = arrayAux[i][2].replace('\"', '');

                arrayAux[i][3] = arrayAux[i][3].replace('success":"', '');
                arrayAux[i][3] = arrayAux[i][3].replace('\"', '');
                arrayAux[i][3] = arrayAux[i][3].replace('\"', '');


                arrayAux[i][4] = arrayAux[i][4].replace('error":"', '');
                arrayAux[i][4] = arrayAux[i][4].replace('\"', '');
                arrayAux[i][4] = arrayAux[i][4].replace('\"', '');

                arrayAux[i][5] = arrayAux[i][5].replace('accion":"', '');
                arrayAux[i][5] = arrayAux[i][5].replace('\"', '');
                arrayAux[i][5] = arrayAux[i][5].replace('\"', '');

                arrayAux[i][6] = arrayAux[i][6].replace('etapa":"', '');
                arrayAux[i][6] = arrayAux[i][6].replace('\"', '');
                arrayAux[i][6] = arrayAux[i][6].replace('\"}', '');

                var idEtapa = arrayAux[i][6];
                var idEtapaFutura = arrayAux[i][0];
                var validacion = arrayAux[i][1];
                var alterna = arrayAux[i][2];
                var accion = arrayAux[i][5];
                var success = arrayAux[i][3];
                var error = arrayAux[i][4];


                arrayAux[i][0] = arrayAux[i][0].replace(idEtapaFutura, idEtapa);
                arrayAux[i][1] = arrayAux[i][1].replace(validacion, idEtapaFutura);
                arrayAux[i][2] = arrayAux[i][2].replace(alterna, accion);
                arrayAux[i][3] = arrayAux[i][3].replace(success, validacion);
                arrayAux[i][4] = arrayAux[i][4].replace(error, alterna);
                arrayAux[i][5] = arrayAux[i][5].replace(accion, success);
                arrayAux[i][6] = arrayAux[i][6].replace(idEtapa, error);

                ArregloValidarAccionesEdit.push(arrayAux[i][2]);
            }


        }
    });


    otableRA = $('#tablaRelasAccion')
        .DataTable({

            "scrollY": "200px",
            "scrollCollapse": true,
            "paging": false,

            "sPaginationType": "bootstrap", // full_numbers
            "iDisplayStart ": 10,
            "iDisplayLength": 10,
            "bPaginate": false, //hide pagination
            "bFilter": false, //hide Search bar
            "bInfo": false, // hide showing entries
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
                        $('#tablaRelasAccion'), breakpointDefinition);
                }
            },
            "rowCallback": function (nRow) {
                responsiveHelper_datatable_fixed_column
                    .createExpandIcon(nRow);
            },
            "drawCallback": function (oSettings) {
                responsiveHelper_datatable_fixed_column.respond();
            },
            data: arrayAux,
            columns: [{
                title: "Etapa"
            },
            {
                title: "Etapa futura"
            },
            {
                title: "Accion"
            },
            {
                title: "Validacion principal"
            },
            {
                title: "Validacion alterna"
            },
            {
                title: "Mensaje success "
            },
            {
                title: "Mensaje error"
            }
            ]
        });
}

function initDrag(e) {

    var eventObject = {
        title: $.trim(e.children().text()),
        description: $.trim(e.children('span').attr('data-description')),
        icon: $.trim(e.children('span').attr('icon')),
        className: $.trim(e.children('span').attr('class')),
        id: $.trim(e.children('span').attr('id')),
        nombre: $.trim(e.children('span').attr('nombre')),
        actGenerica: $.trim(e.children('span').attr('generico')),

    };
    e.data('eventObject', eventObject);
    e.draggable({
        zIndex: 999,
        revert: true,
        revertDuration: 0
    });
};

function InitEditStep1V2(row) {

    $('#btnEditComplement').show();
    $('#btnDeleteComplement').show();

    $('#tabla_Comp').show();
    $('#tablaComplementarios').show();
    $('#CamposComp').show();
    $('#tabla_Comp').show();

    var valoress = "";
    bootsVal();
    $('#form_transaccion').data('bootstrapValidator').validate();

    $.fn.dataTable.ext.errMode = 'none';
    var responsiveHelper_datatable_fixed_column = undefined;
    var breakpointDefinition = {
        tablet: 1024,
        phone: 480,
        desktop: 1260
    };
    var count = 0;
    var datosCom = [];

    $('#tablaComplementarios tbody').removeClass('selected');



    $('#tablaComplementarios tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            otable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/DTCamposWS',
        data: JSON.stringify({
            idTipoTransaccion: IdTipoTran
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {

            $.each(response, function (row, index) {
                $.each(index.ListCamposTransaccion, function (r, arr) {

                    datosCom.push([arr.nombreCampo, arr.descCampo, arr.TipoDato, arr.longitud, arr.Nivel, arr.Operacion, arr.idTipoDato, arr.idNivel, arr.idOperacion, arr.idCampo]);
                });
            });
        }

    });


    otable1 = $('#tablaComplementarios')
        .DataTable({

            "scrollY": "200px",
            "scrollCollapse": true,
            "paging": false,

            "sPaginationType": "bootstrap", // full_numbers
            "iDisplayStart ": 10,
            "iDisplayLength": 10,
            "bPaginate": false, //hide pagination
            "bFilter": false, //hide Search bar
            "bInfo": false, // hide showing entries
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
            data: datosCom,
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
                title: "Tipo de operacion"
            }
            ]
        });

    $('#tablaComplementarios tbody').on(
        'click',
        'tr',
        function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $('#tablaComplementarios').DataTable().$('tr.selected').removeClass(
                    'selected');
                $(this).addClass('selected');
            }
        });



    if (datosCom.length > 0) {
        $(".btn-next").prop("disabled", false);
    } else {
        $(".btn-next").prop("disabled", true);
    }

}

function InitEditStep1(row) {
    $('#btn_agregarTransaccion').hide();
    $("#btn_EditTransaccion").show();
    $('#nombre').val(row[0]);
    $('#clave').val(row[1]);
    $('#categoria').val(row[8]).trigger('change');
    $('#area').val(row[6]).trigger('change');
    $('#proceso').val(row[7]).trigger('change');

    $('#nombre').prop("disabled", false);
    $('#clave').prop("disabled", false);
    $('#categoria').prop("disabled", false);
    $('#area').prop("disabled", false);
    $('#proceso').prop("disabled", false);

    var valoress = "";
    //bootsVal();
    //$('#form_transaccion').data('bootstrapValidator').validate();



}

function InitEditStep2(row) {
    $('#btnEditEtapa').show();
    $('#btnDeleteEtapa').show();
    $(".btn-next").prop("disabled", true);

    $('#TDEtapas').show();
    $('#tablaEtapas').show();

    var datosEta = [];

    $.fn.dataTable.ext.errMode = 'none';
    var responsiveHelper_datatable_fixed_column = undefined;
    var breakpointDefinition = {
        tablet: 1024,
        phone: 480,
        desktop: 1260
    };

    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/EtapasTransaccionN',
        data: JSON.stringify({
            idTipoTransaccion: IdTipoTran
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {

            $.each(response, function (row, index) {

                $.each(index.etapaslista, function (r, arr) {
                    datosEta.push([arr.descripcion, arr.Orden]);
                });
            });
        }
    });
    otable2 = $('#tablaEtapas')
        .DataTable({

            "scrollY": "200px",
            "scrollCollapse": true,
            "paging": false,

            "sPaginationType": "bootstrap", // full_numbers
            "iDisplayStart ": 10,
            "iDisplayLength": 10,
            "bPaginate": false, //hide pagination
            "bFilter": false, //hide Search bar
            "bInfo": false, // hide showing entries
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
                        $('#tablaEtapas'), breakpointDefinition);
                }
            },

            "drawCallback": function (oSettings) {
                responsiveHelper_datatable_fixed_column.respond();
            },
            data: datosEta,
            columns: [{
                title: "Nombre de la etapa"
            },
            {
                title: "Orden de la etapa"
            },

            ]
        });

    $('#tablaEtapas tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            otable2.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    SelectEtapasC();

}

function InitEditStep3(row) {

    $("#Icono1").hide();
    $("#Icono2").hide();
    $("#Icono3").hide();
    $("#Icono4").hide();
    $("#Icono5").hide();
    $("#Icono6").hide();
    $("#Icono7").hide();
    $("#Icono8").hide();
    $("#btn_agregarFormulaEF").show();
    $("#btn_agregarFormulaF").hide();
    selectEtapasStep3();
    SelectCampoInit();
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/DTCabezeraNS',
        data: JSON.stringify({
            idTipoTransaccion: IdTipoTran
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',

        success: function (response) {
            $('#formulaCabecera').empty();
            $.each(response, function (row, index) {
                $.each(index.ListCamposTransaccion, function (r, arr) {
                    $('#cabecera').append('<li class="list-group-item-A">' + arr.nombreCampo + '</li>');
                    $('#formulaCabecera').append('<li class="ui-state-highlight draggable">' + arr.nombreCampo + '</li>');
                    $('#cabecera_rn').append('<li class="ui-widget-content">' + arr.nombreCampo + '</li>');
                    $('#RN_Cabecera').append('<li><label class="radio"><input type="radio" name="radio" value=' + arr.nombreCampo + '><i></i>' + arr.nombreCampo + '</label></li>');


                });
            });
        }

    });
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/DTDetalleNS',
        data: JSON.stringify({
            idTipoTransaccion: IdTipoTran
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',

        success: function (response) {
            $('#formulaDetalle').empty();
            $.each(response, function (row, index) {
                $.each(index.ListCamposTransaccion, function (r, arr) {
                    $('#detalle').append('<li class="list-group-item-A">' + arr.nombreCampo + '</li>');
                    $('#formulaDetalle').append('<li class="ui-state-highlight draggable">' + arr.nombreCampo + '</li>');
                    $('#detalle_rn').append('<li class="ui-widget-content">' + arr.nombreCampo + '</li>');
                    $('#RN_Detalle').append('<li><label class="radio"><input type="radio" name="radio" value=' + arr.nombreCampo + '><i></i>' + $('input#nombreCampo').val() + '</label></li>');


                });
            });
        }

    });
    $(".sortable").sortable({
        stop: function (event, ui) {
            ui.item.addClass('dropped');
        }

    });
    $(".draggable").draggable({
        connectToSortable: ".sortable",
        helper: "clone",
        revert: 'invalid'
    });
    $('.trash').droppable({
        drop: function (event, ui) {
            if (!ui.draggable.hasClass('dropped')) return false;
            ui.draggable.remove();
        }
    });


    $("#fomula_Init").change(function () {
        idEtapa = $("#formula_etapa").val();
        idAccion = $("#fomula_accion").val();
        idCampoF = $("#fomula_Init").val();
        $("#btnFormulas").show();
        $('#Tabla_formula').show();
        InitDataTableForm();
    })
}

function InitEditstep4(row) {
    SelectEtapas();

    $("#rn2_accion").change(function () {

        InitDataTableRegaCampo();

        $("body").on("click", "#todosVisible", function () {
            $("body").on("change", "#todosVisible", function () {
                $("[name='Visible']").prop('checked', $(this).prop("checked"));
            });


        });
        $("body").on("click", "#todosEditable", function () {
            $("body").on("change", "#todosEditable", function () {
                $("[name='Editable']").prop('checked', $(this).prop("checked"));
            });


        });
        $("body").on("click", "#todosObligatorio", function () {
            $("body").on("change", "#todosObligatorio", function () {
                $("[name='Obligatorio']").prop('checked', $(this).prop("checked"));
            });


        });



    })


}

function InitEditstep5(row) {
    InitDataTableComobobox();

}

function InitEditstep6(row) {
    selectEtapasStep7();

    $("#Icono1").hide();
    $("#Icono2").hide();
    $("#Icono3").hide();
    $("#Icono4").hide();
    $("#Icono5").hide();
    $("#Icono6").hide();
    $("#Icono7").hide();
    $("#Icono8").hide();

    $("#btn_agregarAccionEF").show();
    $("#btn_agregarAccionF").hide();
    //Aqui
    $('#tablaRelasAccion tbody').on('click', 'tr', function () {
        console.log("si");
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            otableRA.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    InitDataTableReglaAccion();
    $('#reglaPorAccion').show();
    $("#btnReglasNAcciones").show();

    var countAccion = 0;
    $("#RNA_EtapaFinal").change(function () {
        idEtapaA = 0;
        idAccionA = 0;
        idCampoFA = 0;
        idEtapaA = $("#RNA_etapa").val();
        idAccionA = $("#RNA_accion").val();
        idCampoFA = $("#RNA_EtapaFinal").val();
        $("#btnReglasNAcciones").show();
        $('#reglaPorAccion').show();
        try {
            //InitDataTableReglaAccion();

        } catch (err) {
        }

    })

    $("#RNA_accion").change(function () {

        countAccion++;
        try {
            //var x = 0;
            //idAccionA = 0;
            //idAccionA = $("#RNA_accion").val();

            //if (countAccion == 1) {
            //    InitDataTableReglaAccion(x);
            //}            

        } catch (err) {
        }

    })
}

function InitEditstep6V2(row) {
    //InitDataTableAutocomplete();
    selectCombobox();
    InitDataTableAutocomplete();

}

function getCheckedBoxes(chkboxName) {
    var checkboxes = document.getElementsByName(chkboxName);
    var checkboxesChecked = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i]);
        }
    }
    return checkboxesChecked.length > 0 ? checkboxesChecked : [];
}

function sinEspacios() {
    $('body').on('keydown', function (e) {
        if (e.which === 32 && e.target.selectionStart === 0) {
            return false;
        }
    });
}

function validarRFC(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[0-9A-Za-z\t]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function validarCaracteres(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[0-9A-Za-záÁéÉíÍóÓúÚñÑ\s\t]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function validarCaracteresN(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[0-9A-Za-záÁéÉíÍóÓúÚñÑ\s\t\-\_]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}

function mostrarTooltip(elemento, mensaje) {

    // Si no existe aun el tooltip se crea
    if (!document.getElementById(elemento.id + "tp")) {

        // Dimensiones del elemento al que se quiere añadir el tooltip
        anchoElemento = $('#' + elemento.id).width();
        altoElemento = $('#' + elemento.id).height();

        // Coordenadas del elemento al que se quiere añadir el tooltip
        coordenadaXElemento = $('#' + elemento.id).position().left;
        coordenadaYElemento = $('#' + elemento.id).position().top;

        // Coordenadas en las que se colocara el tooltip
        x = coordenadaXElemento + anchoElemento / 2 + 20;
        y = coordenadaYElemento + altoElemento / 2 + 10;

        // Crea el tooltip con sus atributos
        var tooltip = document.createElement('div');
        tooltip.id = elemento.id + "tp";
        tooltip.className = 'toolTip';
        tooltip.innerHTML = mensaje;
        tooltip.style.left = x + "px";
        tooltip.style.top = y + "px";

        // Añade el tooltip
        document.body.appendChild(tooltip);
    }

    // Cambia la opacidad del tooltip y lo muestra o lo oculta (Si el raton esta encima del elemento se muestra el tooltip y sino se oculta)
    $('#' + elemento.id).hover(
        function () {
            tooltip.style.display = "block";
            $('#' + tooltip.id).animate({
                "opacity": 1
            });

        },
        function () {
            $('#' + tooltip.id).animate({
                "opacity": 0
            });
            setTimeout(
                function () {
                    tooltip.style.display = "none";
                },
                400
            );

        }
    );
}

function editTransact() {
    var row = $('#dtTiposTransaccion').DataTable().row('.selected').data();
    var valores = '';
    if (row) {
        $('#divTiposTransaccion').hide();
        $('#divCrearTransaccion').show();
        $('#btn_EditTransaccion').prop("disabled", false);
        filaGuardada = row;
        IdTipoTran = row[5];
        $('#tipoDato').val(0);
        $('#nivel').val(0);
        $('#Combo_accion').val(0);
        $('#Combo_etapa').val(0);
        $('#tipoOperacion').val(0);
        $("#rn2_etapa").val(0)
        $("#rn2_accion").val(0)
        if (table) {
            table.clear().draw();

        }
        if (tables) {
            tables.clear().draw();

        }
        $('#form_campos').bootstrapValidator('destroy');
        $('#form_ciclo').bootstrapValidator('destroy');
        $('#form_acciones').bootstrapValidator('destroy');
        $('#form_RN2').bootstrapValidator('destroy');
        $('#form_Autocompletar').bootstrapValidator('destroy');
        $('#RN_Accion').bootstrapValidator('destroy');
        $('#form_Combo').bootstrapValidator('destroy');
        $('#form_reglas').bootstrapValidator('destroy');
        $('#form_transaccion').bootstrapValidator('destroy');

        if (document.getElementById("tablaComplementarios").rows.length >= 1) {
            $(".btn-next").prop("disabled", false);
        } else {
            $(".btn-next").prop("disabled", true);

        }



        if (row[3] == "Datos Generales") {
            $('#smartWizard').wizard('selectedItem', { // mover wizard a

                step: 1

            });
            step1 = 2;
            InitEditStep1(row);
            $('#btnEditEtapa').hide();
            $('#btnDeleteEtapa').hide();

            $('#nombre').val(row[0]);
            $('#clave').val(row[1]);
            $('#categoria').val(row[8]).trigger('change');
            $('#area').val(row[6]).trigger('change');
            $('#proceso').val(row[7]).trigger('change');

            $('#form_transaccion').bootstrapValidator('destroy');

            if ($('#nombre').val() != '' && $('#clave').val() != '') {
                $(".btn-next").prop("disabled", false);
            } else {
                $(".btn-next").prop("disabled", true);

            }


        } else if (row[3] == "Campos Dinámicos") {
            $('#smartWizard').wizard('selectedItem', { // mover wizard a

                step: 2

            });
            step2 = 3;
            InitEditStep1(row);
            InitEditStep1V2(row);
            $('#btnEditEtapa').hide();
            $('#btnDeleteEtapa').hide();
            $('#tabla_Comp').show();
            $('#form_transaccion').bootstrapValidator('destroy');


        } else if (row[3] == "Ciclo de Vida") {
            $('#smartWizard').wizard('selectedItem', { // mover wizard a

                step: 3
            });
            InitEditStep1(row);
            InitEditStep1V2(row);
            InitEditStep2(row);
            $('#btnEditEtapa').hide();
            $('#btnDeleteEtapa').hide();

            $('#tabla_Comp').show();
            $('#TDEtapas').show();
            $('#Tabla_Rol').hide();
            $('#form_transaccion').bootstrapValidator('destroy');


            if (otable2) {
                $('#btnEditEtapa').show();
                $('#btnDeleteEtapa').show();
            }
            step3 = 4;
        } else if (row[3] == "Fórmulas") {
            $('#smartWizard').wizard('selectedItem', { // mover wizard a

                step: 7
            });
            InitEditStep1(row);
            InitEditStep1V2(row);
            InitEditStep2(row);
            InitEditStep3(row);
            InitEditstep4(row);
            InitEditstep5(row);
            InitEditstep6V2(row);
            $('#tabla_Comp').show();
            $('#TDEtapas').show();
            $('#Tabla_Rol').hide();

            $('#form_transaccion').bootstrapValidator('destroy');


            $('#btnEditEtapa').hide();
            $('#btnDeleteEtapa').hide();

            $(".btn-next").prop("disabled", false);


            if (otable2) {
                $('#btnEditEtapa').show();
                $('#btnDeleteEtapa').show();
            }
            step7 = 8;
        } else if (row[3] == "Reglas por campo") {
            $('#smartWizard').wizard('selectedItem', { // mover wizard a

                step: 4
            });
            botonRnC = botonRnC + 1;
            InitEditStep1(row);
            InitEditStep1V2(row);
            InitEditStep2(row);
            InitEditstep4(row);
            $('#btnEditEtapa').hide();
            $('#btnDeleteEtapa').hide();

            $('#tabla_Comp').show();
            $('#TDEtapas').show();
            $('#Tabla_Rol').hide();

            $('#form_transaccion').bootstrapValidator('destroy');



            if (otable2) {
                $('#btnEditEtapa').show();
                $('#btnDeleteEtapa').show();
            }
            step4 = 5;
        } else if (row[3] == "Reglas por acción") {
            $('#smartWizard').wizard('selectedItem', { // mover wizard a

                step: 8
            });
            InitEditStep1(row);
            InitEditStep1V2(row);
            InitEditStep2(row);
            InitEditStep3(row);
            InitEditstep4(row);
            InitEditstep5(row);
            InitEditstep6(row);
            InitEditstep6V2(row);

            $(".btn-next").prop("disabled", false);
            $('#btnEditEtapa').hide();
            $('#btnDeleteEtapa').hide();

            $('#tabla_Comp').show();
            $('#TDEtapas').show();
            $('#Tabla_Rol').hide();

            $('#form_transaccion').bootstrapValidator('destroy');


            if (otable2) {
                $('#btnEditEtapa').show();
                $('#btnDeleteEtapa').show();
            }
            step8 = 9;
        } else if (row[3] == "Combobox") {
            $('#smartWizard').wizard('selectedItem', { // mover wizard a

                step: 5
            });
            $('#btnEditEtapa').hide();
            $('#btnDeleteEtapa').hide();
            InitEditStep1(row);
            InitEditStep1V2(row);
            InitEditStep2(row);
            InitEditstep4(row);
            InitEditstep5(row)

            $('#tabla_Comp').show();
            $('#TDEtapas').show();
            $('#Tabla_Rol').hide();
            $('#form_transaccion').bootstrapValidator('destroy');


            if (otable2) {
                $('#btnEditEtapa').show();
                $('#btnDeleteEtapa').show();
            }
        } else if (row[3] == "Completado") {
            $('#smartWizard').wizard('selectedItem', { // mover wizard a
                step: 1
            });
            finalizado = 'Finalizado';

            InitEditStep1(row);
            InitEditStep1V2(row);
            InitEditStep2(row);
            InitEditStep3(row);
            InitEditstep4(row);
            InitEditstep5(row);
            InitEditstep6(row);
            InitEditstep6V2(row);

            $('#tabla_Comp').show();
            $('#TDEtapas').show();
            $('#Tabla_Rol').hide();

            $('#form_transaccion').bootstrapValidator('destroy');


            $('#btnEditEtapa').hide();
            $('#btnDeleteEtapa').hide();
            $(".btn-next").prop("disabled", false);
            if (otable2) {
                $('#btnEditEtapa').show();
                $('#btnDeleteEtapa').show();
            }
        } else if (row[3] == "Autocompletar ") {
            $('#smartWizard').wizard('selectedItem', { // mover wizard a
                step: 6
            });
            finalizado = 'Finalizado';

            InitEditStep1(row);
            InitEditStep1V2(row);
            InitEditStep2(row);
            InitEditStep3(row);
            InitEditstep4(row);
            InitEditstep5(row);
            InitEditstep6(row);
            InitEditstep6V2(row);
            $('#btnEditEtapa').hide();
            $('#btnDeleteEtapa').hide();

            $('#tabla_Comp').show();
            $('#TDEtapas').show();
            $('#Tabla_Rol').hide();

            $('#form_transaccion').bootstrapValidator('destroy');

            $(".btn-next").prop("disabled", false);
            if (otable2) {
                $('#btnEditEtapa').show();
                $('#btnDeleteEtapa').show();
            }
        }

        bootsVal();

    } else {
        showWarningMessage('Información </b>', '<i>Debe seleccionar por lo menos un elemento</i>');
    }
}
