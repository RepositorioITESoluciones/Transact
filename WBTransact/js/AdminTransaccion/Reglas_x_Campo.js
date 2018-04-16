var check = 0;
var nombreCampoDi = [];
var idCampoTrigger = [];

$(function () {

    bootsValReglasxCamp()
});

$('#btnRxCampo').click(function () {
    //bootsVal();
    $('#form_RN2').data('bootstrapValidator').validate();
    var n = $('#form_RN2').data('bootstrapValidator').isValid();
    if (n) {
        agregarReglasNegocio();



    }
})



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
            idAccion: $("#AccionRegaCampo").val(),
            idEtapa: $("#EtapaRegaCampo").val()
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

            //$('#example tbody').on('click', 'tr', function () {
            //    if ($(this).hasClass('selected')) {
            //        $(this).removeClass('selected');
            //    } else {
            //        table.$('tr.selected').removeClass('selected');
            //        $(this).addClass('selected');
            //    }
            //});
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
        }

    });



}
function agregarReglasNegocio() {
    var data = [];
    var val = [];
    var nombre = [];
    var con = 0;
    var listaCorreccion = [];
    var listaCorreccion2 = [];
    var countCorreccion = 0;




    var jsonInsert = '';
    var union = '{"IdTipoTran":"' + IdTipoTran + '", "Etapa":"' + $("#EtapaRegaCampo").val() + '","Accion":"' + $("#AccionRegaCampo").val() + '","valoresRN": [{';
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
                $('#form_RN2')[0].reset();
                bootsValReglasxCamp();
            }
        });

        
        

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


$("#EtapaRegaCampo").change(function () {

    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/llenaComboAcciones',
        dataType: 'json',
        data: JSON.stringify({
            idTipoTran: IdTipoTran,
            idEtapas: $("#EtapaRegaCampo").val()
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

            $("select#AccionRegaCampo").html(nivtransact);
        },
        error: function (e) {
            console.log("Error en Etapa");

        }
    });
})
$("#AccionRegaCampo").change(function () {

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

//Validacion de formulario
function bootsValReglasxCamp() {
    $('#form_RN2').bootstrapValidator({
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
            EtapaRegaCampo: {
                excluded: false,
                selector: '#EtapaRegaCampo',
                group: '.col col-4',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#EtapaRegaCampo').val();
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
            AccionRegaCampo: {
                excluded: false,
                selector: '#AccionRegaCampo',
                group: '.col-4',
                validators: {
                    notEmpty: {
                        message: ' '
                    },
                    callback: {
                        callback: function (value, validator,
                            $field) {

                            var valor = $('#AccionRegaCampo').val();
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
            }

        }

    });
}