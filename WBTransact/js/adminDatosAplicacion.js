
$(function () {

    initEventos();
    initDataTable();

});

function initEventos() {
    //boton plus q invoca el evento de insertar
    $('#btnPlus').click(function () {
        var row = $("#TablaDetalle").DataTable().row('.selected').data();
        if (row) {
            $('#TablaDetalle').DataTable().$('tr.selected').removeClass('selected');
        }
        //limpiaDivs();
        validateForm();
        $('#FormAltaAplicacion').data('bootstrapValidator').resetForm();
        document.getElementById("FormAltaAplicacion").reset();
        $('#divTiposTransaccion').hide();
        $('#FormularioAlta').show();
        $('#btnguardar').show();
    });

    //boton atras
    $('#btnAtras').click(function () {
        $('#FormAltaAplicacion').bootstrapValidator('destroy');
        $('#divTiposTransaccion').show();
        $('#FormularioAlta').hide();
    });

    //boton editar
    $("#btnEdit").click(function () {

        var row = $("#TablaDetalle").DataTable().row('.selected').data();
        if (row) {

            console.log(row[0], row[1], row[2], row[3], row[4]);
            $("#idAplicacion").val(row[4]);
            $("input#nombreAplicacion").val(row[0]);
            $("input#descripcionAplicacion").val(row[1]);
            $("input#idioma").val(row[2]);
            $("input#version").val(row[3]);
            $('#divTiposTransaccion').hide();
            $('#FormularioAlta').show();
        } else {
            showWarningMessage('Información </b>', '<i>Debe seleccionar por lo menos un elemento</i>');
        }
    })

    //boton guardar y editar
    $('#btnguardar').click(function () {
        var row = $("#TablaDetalle").DataTable().row('.selected').data();
        if (row) {
            editAplicacion();
        } else {
            var valido;
            var duplicado = 0;
            valido = validateForm();
            if (valido) {
                $.ajax({
                    async: false,
                    type: 'POST',
                    dataType: "text",
                    url: 'MyWebService.asmx/insertaAplicaciones',
                    data: $('#FormAltaAplicacion').serializeArray(),
                    success: function (response) {
                        var resultadoXML = response.substring(77, response.indexOf('</boolean>'));
                        console.log(resultadoXML);
                        if (resultadoXML == "true") {
                        $.smallBox({
                            title: "Éxito!",
                            content: "Aplicación <b>" + $('#nombreAplicacion').val() + "</b> agregada",
                            color: "#739e73",
                            timeout: 2000,
                            icon: "fa fa-thumbs-up swing animated"
                            });
                        } else {
                            duplicado = 1;
                            $.smallBox({
                                title: "Error!",
                                content: "<i>La Aplicacion no se agrego (No pueden existir nombres de aplicaciones repetidas)</i>",
                                color: "#C46A69",
                                timeout: 3000,
                                icon: "fa fa-warning shake animated"
                            });
                        }
                        //console.log(response);   
                        //llenaDataTable();
                        initDataTable();
                    }
                });
                //console.log(duplicado);
                if (duplicado == 0) {
                    $('#FormAltaAplicacion').data('bootstrapValidator').resetForm();
                    $('#divTiposTransaccion').show();
                    $('#FormularioAlta').hide();
                } else {
                    $('#divTiposTransaccion').hide();
                    $('#FormularioAlta').show();
                }

            } else {
                $('#divTiposTransaccion').hide();
                $('#FormularioAlta').show();
            }
        }
    });

    //boton borrado
    $("#btnDelete").click(function () {
        var row = $('#TablaDetalle').DataTable().row('.selected').data();
        if (row) {
            var idAplicacion = row[4];
            console.log('idAplicacion: ' + idAplicacion);
            $.SmartMessageBox({
                title: "¿Desea <font color='#ff9100'><b>eliminar</b></font> la Aplicación <b>" + row[0] + "</b>?",
                content: "Una vez eliminada la Aplicación no podras volver acceder a ella.",
                buttons: '[No][Si]'
            }, function (ButtonPressed) {
                if (ButtonPressed === "Si") {
                    $(".MessageBoxButtonSection").hide();
                    $.ajax({
                        async: false,
                        type: "POST",
                        url: 'MyWebService.asmx/eliminarAplicaciones',
                        data: JSON.stringify({ idAplicacion: idAplicacion }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (output) {
                            $.each(output, function (j, cam) {
                                showOkMessage('Aplicación Eliminada', 'Se ha Eliminado la Aplicación <b>' + row[0] + '<b>');
                                //llenaDataTable();
                                initDataTable();
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
            showWarningMessage('Información </b>', '<i>Debe seleccionar un elemento</i>');
        }
    })

}


//Editar Aplicacion
function editAplicacion() {
    console.log('Entre a editAplicacion');
    var valido;
    valido = validateForm();
    if (valido) {
        var row = $("#TablaDetalle").DataTable().row('.selected').data();
        console.log($("#nombreAplicacion").val());
        console.log($("#descripcionAplicacion").val());
        console.log($("#idioma").val());
        console.log($("#version").val());
        console.log(row[4]);
        console.log('Entre a if editAplicacion');
        $('#divTiposTransaccion').show();
        $('#FormularioAlta').hide();
        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/modificarAplicaciones',
            data: {
                nombreAplicacion: $("#nombreAplicacion").val(),
                descripcionAplicacion: $("#descripcionAplicacion").val(),
                idioma: $("#idioma").val(),
                version: $("#version").val(),
                idAplicacion: row[4]
            },
            success: function () {
                $.smallBox({
                    title: "Éxito!",
                    content: "Aplicacion <b>" + $("#nombreAplicacion").val() + "</b> Editada",
                    color: "#739e73",
                    timeout: 2000,
                    icon: "fa fa-thumbs-up swing animated"
                });
                $('#FormAltaAplicacion').bootstrapValidator('destroy');
                llenaDataTable();
                initDataTable();
                console.log(data);
            }
        });
    } else {
        Console.log('Entre al else de editar sucursal')
        $('#divTiposTransaccion').hide();
        $('#FormularioAlta').show();
    }
}

//Validaciones
function validateForm() {
    $("#FormAltaAplicacion").bootstrapValidator({
        excluded: [':disabled'],
        live: 'enabled',
        submitButtons: 'button[id="btnguardar"]',
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        fields: {
            nombreAplicacion: {
                selector: '#nombreAplicacion',
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'El nombre de la Aplicacion es requerido'
                    },
                    stringLength: {
                        max: 200,
                        message: 'El nombre de la Aplicacion no puede tener mas de 200 caracteres'
                    }
                }
            },
            descripcionAplicacion: {
                selector: '#descripcionAplicacion',
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'La descripción de la Aplicacion es requerida'
                    },
                    stringLength: {
                        max: 200,
                        message: 'La descripción de la Aplicacion no puede tener mas de 200 caracteres'
                    }
                }
            },
            idioma: {
                selector: '#idioma',
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'El idioma de la Aplicacion es requerido'
                    },
                    stringLength: {
                        max: 200,
                        message: 'El idioma de la Aplicacion no puede tener mas de 200 caracteres'
                    }
                }
            },
            version: {
                selector: '#version',
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'La Version de la Aplicacion es requerida'
                    },
                    stringLength: {
                        max: 8,
                        message: 'La Version de la Aplicacion no puede tener mas de 8 caracteres'
                    }
                }
            }
        }
    });

    $('#FormAltaAplicacion').data('bootstrapValidator').validate();
    var valido = $('#FormAltaAplicacion').data('bootstrapValidator').isValid();
    console.log("llega " + valido);
    return valido;
}

//Iniciar la tabla
function initDataTable() {
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
        url: 'MyWebService.asmx/llenaTablaAplicaciones',
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
                $.each(index.listaAplicaciones, function (r, arr) {
                    datos.push([arr.nombreAplicacion, arr.descripcionAplicacion, arr.idioma, arr.version, arr.idAplicacion]);
                });
            });

        }
    });
    var otable = $('#TablaDetalle').DataTable({
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
                    $('#TablaDetalle'), breakpointDefinition);
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
            title: "Aplicación"
        },
        {
            title: "Descripción"
        },
        {
            title: "Idioma"
        },
        {
            title: "Versión"
        }
        ]
    });

    // Evento creado para realizar la búsqueda cuando se presione la tecla ENTER
    $("#TablaDetalle thead th input[type=text]").on(
        'keyup',
        function (e) {
            otable.column($(this).parent().index() + ':visible').search(
                this.value).draw();
        });

    // Método creado para agregar el evento de selección de una fila
    $('#TablaDetalle tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            $('#TablaDetalle').DataTable().$('tr.selected').removeClass(
                'selected');
            $(this).addClass('selected');
        }
    });

    // Evento creado para abrir la ventana de editar al dar doble click sobre un registro
    $('#TablaDetalle tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        var row = $("#TablaDetalle").DataTable().row('.selected').data();
        console.log(row[0], row[1], row[2], row[3], row[4]);
        $("#idAplicacion").val(row[4]);
        $("input#nombreAplicacion").val(row[0]);
        $("input#descripcionAplicacion").val(row[1]);
        $("input#idioma").val(row[2]);
        $("input#version").val(row[3]);
        $('#divTiposTransaccion').hide();
        $('#FormularioAlta').show();
    });
}


function llenaDataTable() {
    var otable = $('#TablaDetalle').DataTable();
    var datos = [];
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/llenaTablaAplicaciones',
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
                $.each(index.listaAplicaciones, function (r, arr) {
                    datos.push([arr.nombreAplicacion, arr.descripcionAplicacion, arr.idioma, arr.version, arr.idAplicacion]);
                });
            });
        }
    });
    otable.clear().draw();
    otable.rows.add(datos);
    otable.draw();
    otable.ajax.reload();
}
