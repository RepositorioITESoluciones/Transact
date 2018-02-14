var otable;
var url;
var edit = 0;
var rows;
var data;
var cadena = "";
var cadenaCombo = "";
var area = "";

$(function () {
    
    initEventos();
    initDataTable();
    
});

function initEventos() {
    ComboArea();
    $('#btnPlus').click(function () {
        //area();
        bootsVal();
        //$("#area").empty();
        $('#divProcesos').hide();
        $('#divFormulario').show();
        $('#btnguardar2').hide();
        $('#btnguardar').show();
        url = 'MyWebService.asmx/InsertarProceso';
    });

    $('#btnAtras').click(function () {
        $('#divProcesos').show();
        $('#divFormulario').hide();
        $('#FormProcesos')[0].reset();
        $('#TablaProcesos').empty();
        initDataTable();
        //$('#FormProcesos').bootstrapValidator('destroy');
    });

    $('#btnguardar').click(function () {
        bootsVal();
        $('#FormProcesos').data('bootstrapValidator').validate();
        var n = $('#FormProcesos').data('bootstrapValidator').isValid();
        if (n) {
            $.ajax({
                async: false,
                type: 'POST',
                dataType: 'text',
                url: 'MyWebService.asmx/InsertarProceso',
                data: {
                    nombreProceso: $('#nombre').val(),
                    descripcion: $('#descripcion').val(),
                    idArea: $('#area').val()
                },
                success: function (data) {
                    console.log('DATAAA: ' + data);
                    var repetido = data.substring(77, data.indexOf('</boolean>'));
                    console.log("EL resultado: " + repetido);
                    if (repetido == "false") { //Valida si existe un proceso ya en DB y retorna "false"
                        showWarningMessage('Información </b>', '<i>El nombre del proceso <b>' + $("#nombre").val() + '</b> ya existe</i>');
                    } else {   //Si no crea un proceso exitoso
                        $.smallBox({
                            title: "¡Éxito!",
                            content: "Proceso <b>" + $("#nombre").val() + "</b> creado",
                            color: "#739e73",
                            timeout: 2000,
                            icon: "fa fa-thumbs-up swing animated"
                        });
                        $('#divProcesos').show();
                        $('#divFormulario').hide();
                        cargarTabla();
                        $('#FormProcesos')[0].reset();
                        $('#FormProcesos').bootstrapValidator('destroy');
                    }
                }
            })
        } else {
            $('#btnguardar').prop("disabled", false);
            bootsVal();
        }
    });

    $('#btnguardar2').click(function () {
        bootsVal();
        $('#FormProcesos').data('bootstrapValidator').validate();
        var n = $('#FormProcesos').data('bootstrapValidator').isValid();
        if (n) {
            $('#divProcesos').show();
            $('#divFormulario').hide();
            $.ajax({
                async: false,
                type: 'POST',
                url: 'MyWebService.asmx/ActualizarProceso',
                data: {
                    idProceso: rows[3],
                    nombreProceso: $('#nombre').val(),
                    descripcion: $('#descripcion').val(),
                    idArea: $('#area').val()
                },
                success: function () {
                    $.smallBox({
                        title: "Éxito!",
                        content: "Proceso <b>" + rows[0] + "</b> Editado",
                        color: "#739e73",
                        timeout: 2000,
                        icon: "fa fa-thumbs-up swing animated"
                    });
                    cargarTabla();
                    $('#FormProcesos')[0].reset();
                    $('#FormProcesos').bootstrapValidator('destroy');
                }
            })
        } else {
            $('#btnguardar2').prop("disabled", false);
            bootsVal();
        }
    });

    $("#btnDelete").click(function () {
        var row = $('#TablaProcesos').DataTable().row('.selected').data();
        if (row) {
            console.log(JSON.stringify(row[2]));
            var idProceso = row[3]
            $.SmartMessageBox({
                title: "¿Desea <font color='#ff9100'><b>eliminar</b></font> el proceso <b>" + row[0] + "</b>?",
                content: "Una vez eliminada el proceso no podras volver acceder a él.",
                buttons: '[No][Si]'
            }, function (ButtonPressed) {
                if (ButtonPressed === "Si") {
                    $(".MessageBoxButtonSection").hide();
                    $.ajax({
                        async: false,
                        type: "POST",
                        url: 'MyWebService.asmx/EliminarProceso',
                        data: JSON.stringify({
                            idProceso: idProceso
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (output) {
                            $.each(output, function (j, cam) {
                                showOkMessage('Proceso eliminado', 'Se ha eliminado el proceso <b>' + row[0] + '<b>');
                                cargarTabla();
                                $('#FormProcesos')[0].reset();
                                $('#FormProcesos').bootstrapValidator('destroy');
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
        editProceso();
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
        url: 'MyWebService.asmx/LlenaTablaProcesos',
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
                //console.log(index.ListaProcesos);
                $.each(index.ListaProcesos, function (r, arr) {          
                    datos.push([arr.nombreProceso, arr.descripcion, arr.idArea.nombreArea, arr.idProceso, arr.idArea.idArea]);
                });
            });
        }

    });

    otable = $('#TablaProcesos')
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
                        $('#TablaProcesos'), breakpointDefinition);
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
                title: "Descripción"
            },
            {
                title: "Área"
            },
            {
                title: "idProceso",
                visible: false
            },
            {
                title: "idArea",
                visible: false
            }

            ]
        });

    // Evento creado para realizar la búsqueda cuando se presione la tecla ENTER
    $("#TablaProcesos thead th input[type=text]").on(
        'keyup',
        function (e) {
            otable.column($(this).parent().index() + ':visible').search(
                this.value).draw();
        });

    // Método creado para agregar el evento de selección de una fila
    $('#TablaProcesos tbody').on(
        'click',
        'tr',
        function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $('#TablaProcesos').DataTable().$('tr.selected').removeClass(
                    'selected');
                $(this).addClass('selected');
            }
        });
    // Evento creado para abrir la ventana de editar al dar doble click sobre un
    // registro
    $('#TablaProcesos tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        bootsVal();
        editProceso();
        edit = 1;

    });
}



function editProceso() {
    var row = $("#TablaProcesos").DataTable().row('.selected').data();
    rows = $("#TablaProcesos").DataTable().row('.selected').data();
    if (row) {
        //console.log(row[0]);
        //console.log(row[1]);
        //console.log(row[2]);
        //console.log(row[3]);
        //console.log("idArea: " + row[4]);
        $("#nombre").val(row[0]);
        $("#descripcion").val(row[1]);
        $("#area").val(row[4]);
        $("#area").trigger('change');

        $('#divProcesos').hide();
        $('#divFormulario').show();

        $('#btnguardar2').show();
        $('#btnguardar').hide();

        initDataTable()
        //cargarTabla();
        //area();
    } else {
        showWarningMessage('Información </b>', '<i>Debe seleccionar por lo menos un elemento</i>');
    }
}


//Funcion creada para validar campos vacios en formulario
function bootsVal() {
    $('#FormProcesos').bootstrapValidator({
        live: 'enabled',
        submitButtons: 'button[id="btnguardar"]',
        message: 'Valor invalido',
        fields: {
            nombre: {
                group: '.col-6',
                validators: {
                    notEmpty: {
                        message: 'El nombre del proceso es obligatorio'
                    },
                }
            },
            area: {
                group: '.col-6',
                validators: {
                    callback: {
                        message: 'Seleccione una área',
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
            descripcion: {
                group: '.col-6',
                validators: {
                    notEmpty: {
                        message: 'La descripción es obligatoria'
                    },
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
        url: 'MyWebService.asmx/LlenaTablaProcesos',
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
                $.each(index.ListaProcesos, function (r, arr) {
                    //console.log("RRRRR: " + JSON.stringify(arr));
                    datos.push([arr.nombreProceso, arr.descripcion, arr.idArea.nombreArea, arr.idProceso, arr.idArea.idArea]);
                });
            });
        }
    });
    otable.clear();
    otable.rows.add(datos);
    otable.draw();
}

function ComboArea() {
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/LlenaComboAreaByProceso',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $.each(response, function (row, index) {
                area += '<option value="' + 0 + '"> Seleccione una opción </option>'
                $.each(index.ListaAreaByProceso, function (r, arr) {
                    area += '<option value="' + arr.idArea + '">' + arr.nombreArea + '</option>';
                });
            });
            $("#area").html(area);
        }
    });
}



