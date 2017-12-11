var otable;
var url;
var edit = 0;
var rows;
var data;
var cadena = "";
var cadenaCombo = "";
var cadenacomboSucursal = "";

$(function () {
    initEventos();
    initDataTable();
    llenaComboEstado();
});

function initEventos() {
    $("#ComboCP").prop("disabled", true);

    bootsVal();
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/LlenaTablaDE',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $.each(response, function (row, index) {
                cadena += '<option value="' + 0 + '"> Seleccione una opción </option>'
                $.each(index.ListaRegistros, function (r, arr) {
                    cadena += '<option value="' + arr.idGiro + '">' + arr.nombre + '</option>';
                });
            });
            $("#giro").html(cadena);
        }
    });

    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/LlenaComboTipoPersonaEmpre',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $.each(response, function (row, index) {
                cadenacomboSucursal += '<option value="' + 0 + '"> Seleccione una opción </option>'
                $.each(index.ListaRegTipoPersona, function (r, arr) {
                    cadenacomboSucursal += '<option value="' + arr.IdTipoPersona + '">' + arr.TipoPersona + '</option>';
                });
            });
            $("#tipoPer").html(cadenacomboSucursal);
        }
    });

    var f = new Date();

    $("#fecha").val(f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());
    $('#fecha').prop('readonly', true);

    $('#btnPlus').click(function () {
        $("#ComboCP").empty();
        $('#divDatosEmpresariales').hide();
        $('#FormularioDatosEmpresariales').show();
        $('#btnguardar2').hide();
        $('#btnguardar').show();
        url = 'MyWebService.asmx/insertaWs';
    });

    $('#btnAtras').click(function () {
        $('#divDatosEmpresariales').show();
        $('#FormularioDatosEmpresariales').hide();
        $('#FormEmpresa')[0].reset();
        $('#FormEmpresa').bootstrapValidator('destroy');
    });

    $('#btnguardar').click(function () {
        bootsVal();
        $('#FormEmpresa').data('bootstrapValidator').validate();
        var n = $('#FormEmpresa').data('bootstrapValidator').isValid();
        if (n) {
            $('#divDatosEmpresariales').show();
            $('#FormularioDatosEmpresariales').hide();
            $.ajax({
                async: false,
                type: 'POST',
                url: 'MyWebService.asmx/InsertarDatosEmpresariales',
                data: {
                    nombre: $('#nombre').val(),
                    fechaRegistro: $('#fecha').val(),
                    idGiro: $('#giro').val(),
                    ComboTPer: $('#tipoPer').val(),
                    RazonSocial: $('#razonSocial').val(),
                    RFC: $('#rfc').val(),
                    ComboEstado: $('#ComboEstado').val(),
                    ComboCP: $('#ComboCP').val(),
                    Calle: $('#calle').val(),
                    NumExt: $('#numExt').val(),
                    NumInt: $('#numInt').val()
                },
                success: function () {
                    $.smallBox({
                        title: "Éxito!",
                        content: "Empresa <b>" + $('#nombre').val() + "</b> agregada",
                        color: "#739e73",
                        timeout: 2000,
                        icon: "fa fa-thumbs-up swing animated"
                    });
                    cargarTabla();
                    $('#FormEmpresa')[0].reset();
                    $('#FormEmpresa').bootstrapValidator('destroy');
                }
            })
        } else {
            $('#btnguardar').prop("disabled", false);
            bootsVal();
        }
    });

    $('#btnguardar2').click(function () {
        bootsVal();
        $('#FormEmpresa').data('bootstrapValidator').validate();
        var n = $('#FormEmpresa').data('bootstrapValidator').isValid();
        if (n) {
            $('#divDatosEmpresariales').show();
            $('#FormularioDatosEmpresariales').hide();
            //console.log("wwwww: " + rows[12]);
            $.ajax({
                async: false,
                type: 'POST',
                url: 'MyWebService.asmx/ActualizarDatosEmpresariales',
                data: {
                    idEmpresa: rows[12],
                    nombre: $('#nombre').val(),
                    fechaRegistro: $('#fecha').val(),
                    idGiro: $('#giro').val(),
                    ComboTPer: $('#tipoPer').val(),
                    RazonSocial: $('#razonSocial').val(),
                    RFC: $('#rfc').val(),
                    ComboEstado: $('#ComboEstado').val(),
                    ComboCP: $('#ComboCP').val(),
                    Calle: $('#calle').val(),
                    NumExt: $('#numExt').val(),
                    NumInt: $('#numInt').val()
                },
                success: function () {
                    $.smallBox({
                        title: "Éxito!",
                        content: "Usuario <b>" + rows[0] + "</b> Editado",
                        color: "#739e73",
                        timeout: 2000,
                        icon: "fa fa-thumbs-up swing animated"
                    });
                    cargarTabla();
                    $('#FormEmpresa')[0].reset();
                    $('#FormEmpresa').bootstrapValidator('destroy');
                }
            })
        } else {
            $('#btnguardar2').prop("disabled", false);
            bootsVal();
        }
    });

    $("#btnDelete").click(function () {
        var row = $('#TablaDatosEmpresariales').DataTable().row('.selected').data();
        if (row) {
            console.log(JSON.stringify(row[12]));
            var idEmpresa = row[12];
            $.SmartMessageBox({
                title: "¿Desea <font color='#ff9100'><b>eliminar</b></font> la empresa <b>" + row[0] + "</b>?",
                content: "Una vez eliminada la empresa no podras volver acceder a ella.",
                buttons: '[No][Si]'
            }, function (ButtonPressed) {
                if (ButtonPressed === "Si") {
                    $.ajax({
                        async: false,
                        type: "POST",
                        url: 'MyWebService.asmx/EliminarDatosEmpresariales',
                        data: JSON.stringify({
                            idEmpresa: idEmpresa
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (output) {
                            $.each(output, function (j, cam) {
                                showOkMessage('Empresa eliminada', 'Se ha eliminado la empresa <b>' + row[0] + '<b>');
                                cargarTabla();
                                $('#FormEmpresa')[0].reset();
                                $('#FormEmpresa').bootstrapValidator('destroy');
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
    })

    $("#btnEdit").click(function () {
        bootsVal();
        editUsuario();
        $('#btnguardar2').show();
        $('#btnguardar').hide();
        edit = 1;
    })
}

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
        url: 'MyWebService.asmx/LlenaTablaDE',
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
                $.each(index.ListaRegistros, function (r, arr) {
                    console.log(row);
                    var d = new Date(arr.fechaRegistro).forma;
                    //console.log("RRRRR: " + JSON.stringify(arr));
                    datos.push([arr.nombre, arr.fechaRegistro.substring(0, 10), arr.DatosFiscales.RFC, arr.DatosFiscales.RazonSocial, arr.DatosFiscales.TipoPersona.TipoPersona, arr.idGiro, arr.DatosFiscales.TipoPersona.IdTipoPersona, arr.DatosFiscales.Estado.idEstado, arr.DatosFiscales.C_CP, arr.DatosFiscales.Calle, arr.DatosFiscales.NumeroExterior, arr.DatosFiscales.NumeroInterior, arr.idEmpresa]);
                });
            });
        }

    });

    otable = $('#TablaDatosEmpresariales')
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
                        $('#TablaDatosEmpresariales'), breakpointDefinition);
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
                title: "Fecha de registro"
            },
            {
                title: "RFC"
            },
            {
                title: "Razon social"
            },
            {
                title: "Tipo de persona"
            },
            {
                title: "idGiro",
                visible: false
            },
            {
                title: "Id tipo persona",
                visible: false
            },
            {
                title: "idEstado",
                visible: false
            },
            {
                title: "cp",
                visible: false
            },
            {
                title: "calle",
                visible: false
            },
            {
                title: "numExt",
                visible: false
            },
            {
                title: "numInt",
                visible: false
            }

            ]
        });

    // Evento creado para realizar la búsqueda cuando se presione la tecla ENTER
    $("#TablaDatosEmpresariales thead th input[type=text]").on(
        'keyup',
        function (e) {
            otable.column($(this).parent().index() + ':visible').search(
                this.value).draw();
        });

    // Método creado para agregar el evento de selección de una fila
    $('#TablaDatosEmpresariales tbody').on(
        'click',
        'tr',
        function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $('#TablaDatosEmpresariales').DataTable().$('tr.selected').removeClass(
                    'selected');
                $(this).addClass('selected');
            }
        });
    // Evento creado para abrir la ventana de editar al dar doble click sobre un
    // registro
    $('#TablaDatosEmpresariales tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        bootsVal();
        editUsuario();
        edit = 1;

    });
}

function editUsuario() {


    var row = $("#TablaDatosEmpresariales").DataTable().row('.selected').data();
    rows = $("#TablaDatosEmpresariales").DataTable().row('.selected').data();
    if (row) {

        $("#nombre").val(row[0]);
        $("#fecha").val(row[1]);
        $("#giro").val(row[5]);
        $("#giro").trigger('change');

        $("#tipoPer").val(row[6]);
        $("#tipoPer").trigger('change');

        $("#razonSocial").val(row[3]);
        $("#rfc").val(row[2]);

        $("#ComboEstado").val(row[7]);
        $("#ComboEstado").trigger('change');

        $("#calle").val(row[9]);
        $("#numExt").val(row[10]);
        $("#numInt").val(row[11]);

        actualizaCP();

        $("#ComboCP").val(row[8]);
        $("#ComboCP").trigger('change');


        $('#divDatosEmpresariales').hide();
        $('#FormularioDatosEmpresariales').show();

        $('#btnguardar2').show();
        $('#btnguardar').hide();

        cargarTabla();

    } else {
        showWarningMessage('Información </b>', '<i>Debe seleccionar por lo menos un elemento</i>');
    }

}


function llenaComboEstado() {
    var html;
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/LlenaComboEstadoEmpre',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            $.each(data, function (index, item) {
                html += '<option value="' + 0 + '"> Seleccione una opción </option>'
                $.each(item.ListaRegistrosEstado, function (index1, item1) {
                    html += '<option value="' + item1.idEstado + '">' + item1.descripcion + '</option>';
                });
            });
            $("#ComboEstado").html(html);
        }
    });

}


//Llena comboBox CP  apartir de un Estado seleccionado
function actualizaCP() {
    $("#ComboCP").prop("disabled", false);
    $("#ComboCP").empty();
    var idEstado = $('select[id=ComboEstado]').val();
    var html = "";
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/LlenaComboCPEmpre',
        data: JSON.stringify({
            idEstado: idEstado
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(data, function (index, item) {
                html += '<option value="' + 0 + '"> Seleccione una opción </option>'
                $.each(item.ListaRegistroCP, function (index1, item1) {
                    html += '<option value="' + item1.c_CP + '">' + item1.c_CP + '</option>';
                });
            });
            $("#ComboCP").html(html);
        }
    });

}

//Funcion creada para validar campos vacios en formulario
function bootsVal() {
    console.log("dsdasd");
    $('#FormEmpresa').bootstrapValidator({
        live: 'enabled',
        submitButtons: 'button[id="btnguardar"]',
        message: 'Valor invalido',
        fields: {
            nombre: {
                group: '.col-6',
                validators: {
                    notEmpty: {
                        message: 'El nombre del giro empresarial es obligatorio'
                    },
                }
            },
            giro: {
                group: '.col-6',
                validators: {
                    callback: {
                        message: 'Seleccione un giro empresarial',
                        callback: function (value, validator, $field) {
                            if (value === '0') {
                                return false
                            } else {
                                return true
                            }
                        }
                    }
                }
            },
            tipoPer: {
                group: '.col-6',
                validators: {
                    callback: {
                        message: 'Seleccione un tipo de persona',
                        callback: function (value, validator, $field) {
                            if (value === '0') {
                                return false
                            } else {
                                return true
                            }
                        }
                    }
                }
            },
            ComboEstado: {
                group: '.col-6',
                validators: {
                    callback: {
                        message: 'Seleccione un estado',
                        callback: function (value, validator, $field) {
                            if (value === '0') {
                                return false
                            } else {
                                return true
                            }
                        }
                    }
                }
            },
            ComboCP: {
                group: '.col-6',
                validators: {
                    callback: {
                        message: 'Seleccione un codigo postal',
                        callback: function (value, validator, $field) {
                            if (value === '0') {
                                return false
                            } else {
                                return true
                            }
                        }
                    }
                }
            },
            calle: {
                group: '.col-6',
                validators: {
                    notEmpty: {
                        message: 'La calle es obligatoria'
                    },
                }
            },
            numExt: {
                group: '.col-6',
                validators: {
                    notEmpty: {
                        message: 'El numero exterior es obligatorio'
                    },
                }
            },
            razonSocial: {
                group: '.col-6',
                validators: {
                    notEmpty: {
                        message: 'La razon social es obligatoria'
                    },
                }
            },
            rfc: {
                verbose: false,
                selector: '#rfc',
                group: '.col-6',
                validators: {
                    notEmpty: {
                        message: 'El RFC es obligatorio'
                    },
                    regexp: {
                        regexp: /^([aA-zZñÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[aA-zZ|\&\d]{3})$/,
                        message: 'RFC no tiene el formato adecuado.'
                    }
                }
            },
        }


    });
}

//Funcion encargada de refrescar la tabla despues de haber creado, editado o eliminado un registro
function cargarTabla() {
    var datos = [];
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/LlenaTablaDE',
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
                $.each(index.ListaRegistros, function (r, arr) {
                    datos.push([arr.nombre, arr.fechaRegistro.substring(0, 10), arr.DatosFiscales.RFC, arr.DatosFiscales.RazonSocial, arr.DatosFiscales.TipoPersona.TipoPersona, arr.idGiro, arr.DatosFiscales.TipoPersona.IdTipoPersona, arr.DatosFiscales.Estado.idEstado, arr.DatosFiscales.C_CP, arr.DatosFiscales.Calle, arr.DatosFiscales.NumeroExterior, arr.DatosFiscales.NumeroInterior, arr.idEmpresa]);
                });
            });
        }
    });

    otable.clear();
    otable.rows.add(datos);
    otable.draw();
}