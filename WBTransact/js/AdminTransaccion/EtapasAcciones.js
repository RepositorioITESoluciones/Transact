$(function () {
    

    $("#footerAcc").hide();

    $("#btnNextEtaAcc").hide()
    $("#DetalleEtapas").hide()
    $("#form_acciones").hide()
    $("#DetalleAcciones").hide();
    ListRolesTT();
    SelectEtapasC();
    initDataTableEtapa()
    

    
    
    
});


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

function SelectEtapasAcciones() {
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
function ListRolesTT() {

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
                $.each(row1.CamposRoles, function (i1, r1) {
                    roltransact += '<li style="display:none">';
                    roltransact += '<span>';
                    roltransact += '<label class="checkbox inline-block">';
                    roltransact += '<input type="checkbox" name="checkbox-inline" value="' + r1.idRol + '">';
                    roltransact += '<i></i>';
                    roltransact += r1.nombreRol;
                    roltransact += '</label>';
                    roltransact += '</span>';
                    roltransact += '</li>';
                    //arrayRol.push(r1.nombreRol);

                });


            });
            $("#_Roles").html(roltransact);
        },
        error: function (e) {
            console.log("Error en Roles");

        }
    });
}

$('#btnAddEtapa').click(function () {

    $('#btnAddEtapa').attr("disabled", true);

    var resulInsert = 0;
    $('#form_ciclo').data('bootstrapValidator').validate();
    var n = $('#form_ciclo').data('bootstrapValidator').isValid();

    if (n) {

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

                $.each(response, function (ind, it) {
                    console.log(it)
                    resulInsert = it;
                });

                if (resulInsert === 100001) {
                    $.smallBox({
                        title: "Error",
                        content: "<i class='fa fa-clock-o'></i> <i>El nombre de la etapa y el orden ya existen</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                    $('#btnAddEtapa').attr("disabled", false);
                }
                if (resulInsert === 100002) {

                    $.smallBox({
                        title: "Error",
                        content: "<i class='fa fa-clock-o'></i> <i>El nombre de la etapa ya existe</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                    $('#btnAddEtapa').attr("disabled", false);
                }
                if (resulInsert === 100003) {
                    $.smallBox({
                        title: "Error",
                        content: "<i class='fa fa-clock-o'></i> <i>El oreden ya existe</i>",
                        color: "#C46A69",
                        iconSmall: "fa fa-times fa-2x fadeInRight animated",
                        timeout: 2000
                    });
                    $('#btnAddEtapa').attr("disabled", false);
                }
                if (resulInsert === 1) {
                    $.smallBox({
                        title: "Éxito!",
                        content: "Categoría <b>" + $('input#nombreEtapa').val() + "</b> agregada",
                        color: "#739e73",
                        timeout: 2000,
                        icon: "fa fa-thumbs-up swing animated"
                    });

                    $('#form_ciclo')[0].reset();
                    $('#form_ciclo').bootstrapValidator('destroy');
                    bootsValEtapasAcciones();
                    $('#btnAddEtapa').attr("disabled", false);

                    initDataTableEtapa();
                    SelectEtapasAcciones()
                    

                    $("#footerEta").hide()
                    $("#footerAcc").show()

                    $("#DetalleEtapas").show()
                    $("#form_acciones").show()

                }
            }
        });


    } else { $('#btnAddEtapa').attr("disabled", false); }


})

$('#btnAddEtapaAccion').click(function () {

    var roles = $("input[name='checkbox-inline']:checked")
          .map(function () { return $(this).val(); }).get();
    $('#form_acciones').data('bootstrapValidator').validate();
    var n = $('#form_acciones').data('bootstrapValidator').isValid();

    if (n) {

        if (roles.length != 0) {
            $.ajax({
                async: false,
                type: 'POST',
                url: 'MyWebService.asmx/InsertAcciones',
                data: JSON.stringify({
                    idEtapa: $("#selectEtapa").val(),
                    idTipoTran: IdTipoTran,
                    claveAccion: $('#claveAccion').val(),
                    descripcion: $('#nombreAccion').val(),
                    orden: $('#ordenAccion').val(),
                    values: roles
                }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (response) {

                    $.each(response, function (ind, it) {
                        console.log(it)
                        resulInsert = it;
                    });

                    if (resulInsert === 100001) {
                        $.smallBox({
                            title: "Error",
                            content: "<i class='fa fa-clock-o'></i> <i>El nombre de la acción y el orden ya existen</i>",
                            color: "#C46A69",
                            iconSmall: "fa fa-times fa-2x fadeInRight animated",
                            timeout: 2000
                        });
                    }
                    if (resulInsert === 100002) {

                        $.smallBox({
                            title: "Error",
                            content: "<i class='fa fa-clock-o'></i> <i>El nombre de la acción ya existe</i>",
                            color: "#C46A69",
                            iconSmall: "fa fa-times fa-2x fadeInRight animated",
                            timeout: 2000
                        });
                    }
                    if (resulInsert === 100003) {
                        $.smallBox({
                            title: "Error",
                            content: "<i class='fa fa-clock-o'></i> <i>El oreden ya existe</i>",
                            color: "#C46A69",
                            iconSmall: "fa fa-times fa-2x fa.deInRight animated",
                            timeout: 2000
                        });
                    }
                    if (resulInsert === 1) {
                        $.smallBox({
                            title: "Éxito!",
                            content: "Acción <b>" + $('input#nombreEtapa').val() + "</b> agregada",
                            color: "#739e73",
                            timeout: 2000,
                            icon: "fa fa-thumbs-up swing animated"
                        });

                        $("#footerEta").hide()
                        $("#footerAcc").show()

                        initDataTableAciones();
                        $("#DetalleAcciones").show();
                        $("#btnNextEtaAcc").show();

                        //initDataTableEtapa();
                        //SelectEtapasAcciones()
                        $('#form_acciones')[0].reset();
                        $('#form_acciones').bootstrapValidator('destroy');
                        bootsValEtapasAcciones();

                    }


                }
            });

        } else {

            $.smallBox({
                title: "Error",
                content: "<i class='fa fa-clock-o'></i> <i>Nesesita <b> seleccionar minimo un rol</i>",
                color: "#C46A69",
                iconSmall: "fa fa-times fa-2x fa.deInRight animated",
                timeout: 2000
            });
        }

    } else {
        $.smallBox({
            title: "Error",
            content: "<i class='fa fa-clock-o'></i> <i>Nesesita <b> seleccionar minimo un rol</i>",
            color: "#C46A69",
            iconSmall: "fa fa-times fa-2x fa.deInRight animated",
            timeout: 2000
        });

    }




    
            

});

$('#btnNextEtaAcc').click(function () {
    $('#sectRxCampo').toggle("swing");
    $('#sectEtapAcci').toggle("swing");


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

                $("#EtapaRegaCampo").html(nivtransact);
            },
            error: function (e) {
                console.log("Error en Etapa");

            }
        });

});

$('#btnBackEtaAcc').click(function () {
    $('#sectCamposDin').toggle("swing");
    $('#sectEtapAcci').toggle("swing");
});


$("#selectEtapa").change(function () {

    initDataTableAciones();
    $("#DetalleAcciones").show();
});



//ini datatables

function initDataTableEtapa() {
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
        url: 'MyWebService.asmx/EtapasTransaccionN',
        data: JSON.stringify({
            idTipoTransaccion: IdTipoTran
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {

            $.each(response, function (row, index) {
                $.each(index.etapaslista, function (r, arr) {
                    datos.push([arr.descripcion, arr.Orden, arr.idEtapa]);
                });
            });
        }
    });

    otable = $('#tablaEtapa')
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
                        $('#tablaEtapa'), breakpointDefinition);
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
                title: "Nombre de la etapa"
            },
            {
                title: "Orden"
            },
            {
                title: "IdEtapa",
                visible:false
            }
            ]
        });

    // Evento creado para realizar la búsqueda cuando se presione la tecla ENTER
    $("#tablaEtapa thead th input[type=text]").on(
        'keyup',
        function (e) {
            otable.column($(this).parent().index() + ':visible').search(
                this.value).draw();
        });

    // Método creado para agregar el evento de selección de una fila
    $('#tablaEtapa tbody').on(
        'click',
        'tr',
        function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $('#tablaEtapa').DataTable().$('tr.selected').removeClass(
                    'selected');
                $(this).addClass('selected');
            }
        });
    // Evento creado para abrir la ventana de editar al dar doble click sobre un
    // registro
    $('#tablaEtapa tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');


    });
}
function initDataTableAciones() {
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
        url: 'MyWebService.asmx/CatETapasAcionesWS',
        data: JSON.stringify({
            idTipoTransaccion: IdTipoTran,
            idEtapa: $("#selectEtapa").val()
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
                $.each(index.listEtapas, function (r, arr) {
                    datos.push([arr.nombreEtapa, arr.descripcion, arr.ClaveEtapa, arr.orden, arr.idEtapa, arr.idAccion]);
                });
            });
        }

    });

    otable = $('#tablaAciones')
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
                        $('#tablaAciones'), breakpointDefinition);
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
                title: "Nombre Etapa"
            },
            {
                title: "Nombre acción"
            },
            {
                title: "Clave"
            },
            {
                title: "orden"
            },
            {
                title: "idEtapa",
                visible: false
            },
            {
                title: "idAccion",
                visible: false
            }
            ]
        });

    // Evento creado para realizar la búsqueda cuando se presione la tecla ENTER
    $("#tablaAciones thead th input[type=text]").on(
        'keyup',
        function (e) {
            otable.column($(this).parent().index() + ':visible').search(
                this.value).draw();
        });

    // Método creado para agregar el evento de selección de una fila
    $('#tablaAciones tbody').on(
        'click',
        'tr',
        function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $('#tablaAciones').DataTable().$('tr.selected').removeClass(
                    'selected');
                $(this).addClass('selected');
            }
        });
    // Evento creado para abrir la ventana de editar al dar doble click sobre un
    // registro
    $('#tablaAciones tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');


    });
}


function bootsValEtapasAcciones() {

    $('#form_ciclo').bootstrapValidator({
        live: 'enabled',
        submitButtons: 'button[id="btn_agregarOrden"]',
        feedbackIcons: {
        },
        fields: {
            nombreEtapa: {
                selector: '#nombreEtapa',
                group: '.col-3',
                validators: {
                    notEmpty: {
                        message: 'El nombre es obligatorio'
                    }
                }
            },
            orden: {
                selector: '#orden',
                group: '.col-3',
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
                group: '.col-3',
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

}
