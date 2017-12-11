var otable;
var url;
var edit = 0;
var rows;
var data;

$(function () {
    initEventos();
    initDataTable();
    
});

function initEventos() {

    $('#btnPlus').click(function () {
        $('#divCatTrans').hide();
        $('#divFormulario').show();
        $('#btnguardar2').hide();
        $('#btnguardar').show();
        url = 'MyWebService.asmx/InsertarCategoriaTransaccion';
    });

    $('#btnAtras').click(function () {
        $('#divCatTrans').show();
        $('#divFormulario').hide();
        $('#FormCategoria')[0].reset();
        $('#FormCategoria').bootstrapValidator('destroy');
    });

    $('#btnguardar').click(function () {
        bootsVal();
        $('#FormCategoria').data('bootstrapValidator').validate();
        var n = $('#FormCategoria').data('bootstrapValidator').isValid();
        if (n) {
            $('#divCatTrans').show();
            $('#divFormulario').hide();
            $.ajax({
                async: false,
                type: 'POST',
                url: 'MyWebService.asmx/InsertarCategoriaTransaccion',
                data: {
                    categoriaTransac: $('#nombre').val(),
                    descripcionCategoria: $('#descripcion').val()
                },
                success: function () {
                    $.smallBox({
                        title: "Éxito!",
                        content: "Categoria de transacción <b>" + $('#nombre').val() + "</b> agregada",
                        color: "#739e73",
                        timeout: 2000,
                        icon: "fa fa-thumbs-up swing animated"
                    });
                    cargarTabla();
                    $('#FormCategoria')[0].reset();
                    $('#FormCategoria').bootstrapValidator('destroy');
                }
            })
        } else {
            $('#btnguardar').prop("disabled", false);
            bootsVal();
        }
    });

    $('#btnguardar2').click(function () {
        bootsVal();
        $('#FormCategoria').data('bootstrapValidator').validate();
        var n = $('#FormCategoria').data('bootstrapValidator').isValid();
        if (n) {
            $('#divCatTrans').show();
            $('#divFormulario').hide();
            console.log("wwwww: " + rows[2]);
            $.ajax({
                async: false,
                type: 'POST',
                url: 'MyWebService.asmx/ActualizarCategoriaTransaccion',
                data: {
                    idCatTipoTransac: rows[2],
                    categoriaTransac: $('#nombre').val(),
                    descripcionCategoria: $('#descripcion').val()
                },
                success: function () {
                    $.smallBox({
                        title: "Éxito!",
                        content: "Categoría de transacción <b>" + $('#nombre').val() + "</b> editada",
                        color: "#739e73",
                        timeout: 2000,
                        icon: "fa fa-thumbs-up swing animated"
                    });
                    cargarTabla();
                    $('#FormCategoria')[0].reset();
                    $('#FormCategoria').bootstrapValidator('destroy');
                }
            })
        } else {
            $('#btnguardar2').prop("disabled", false);
            bootsVal();
        }
    });

    $("#btnDelete").click(function () {
        var row = $('#TablaCatTrans').DataTable().row('.selected').data();
        if (row) {
            console.log(JSON.stringify(row[2]));
            var idCatTipoTransac = row[2];
            $.SmartMessageBox({
                title: "¿Desea <font color='#ff9100'><b>eliminar</b></font> la categoría de transacción <b>" + row[0] + "</b>?",
                content: "Una vez eliminada la categoría de transacción no podras volver acceder a ella.",
                buttons: '[No][Si]'
            }, function (ButtonPressed) {
                if (ButtonPressed === "Si") {
                    $.ajax({
                        async: false,
                        type: "POST",
                        url: 'MyWebService.asmx/EliminarCategoriaTransaccion',
                        data: JSON.stringify({
                            idCatTipoTransac: idCatTipoTransac
                        }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (output) {
                            $.each(output, function (j, cam) {
                                showOkMessage('Categoría de Transacción eliminada', 'Se ha eliminado la categoría de transacción <b>' + row[0] + '<b>');
                                cargarTabla();
                                $('#FormCategoria')[0].reset();
                                $('#FormCategoria').bootstrapValidator('destroy');
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
        editCategoria();
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
        url: 'MyWebService.asmx/LlenaTablaCategoriaTransaccion',
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
                $.each(index.ListaCategorias, function (r, arr) {
                    console.log(row);
                    datos.push([arr.categoriaTransac, arr.descripcionCategoria, arr.idCatTipoTransac]);
                });
            });
        }

    });

    otable = $('#TablaCatTrans')
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
                        $('#TablaCatTrans'), breakpointDefinition);
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
                name: 'categoriaTransac',
                title: "Categoría de transacción"
            },
            {
                name: 'descripcionCategoria',
                title: "Descripción de la categoría"
            },
            
            {
                name: 'activo',
                title: "activo",
                visible: false
            }

            ]
        });

    // Evento creado para realizar la búsqueda cuando se presione la tecla ENTER
    $("#TablaCatTrans thead th input[type=text]").on(
        'keyup',
        function (e) {
            otable.column($(this).parent().index() + ':visible').search(
                this.value).draw();
        });

    // Método creado para agregar el evento de selección de una fila
    $('#TablaCatTrans tbody').on(
        'click',
        'tr',
        function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $('#TablaCatTrans').DataTable().$('tr.selected').removeClass(
                    'selected');
                $(this).addClass('selected');
            }
        });
    // Evento creado para abrir la ventana de editar al dar doble click sobre un
    // registro
    $('#TablaCatTrans tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        bootsVal();
        editCategoria();
        edit = 1;

    });
}

function editCategoria() {
    var row = $("#TablaCatTrans").DataTable().row('.selected').data();
    rows = $("#TablaCatTrans").DataTable().row('.selected').data();
    if (row) {

        $("#nombre").val(row[0]);
        $("#descripcion").val(row[1]);
        
        $('#divCatTrans').hide();
        $('#divFormulario').show();

        $('#btnguardar2').show();
        $('#btnguardar').hide();

        cargarTabla();

    } else {
        showWarningMessage('Información </b>', '<i>Debe seleccionar por lo menos un elemento</i>');
    }

}


//Funcion creada para validar campos vacios en formulario
function bootsVal() {
    console.log("dsdasd");
    $('#FormCategoria').bootstrapValidator({
        live: 'enabled',
        submitButtons: 'button[id="btnguardar"]',
        message: 'Valor invalido',
        fields: {
            nombre: {
                group: '.col-6',
                validators: {
                    notEmpty: {
                        message: 'El nombre de la categoria es obligatoria'
                    },
                }
            },
            descripcion: {
                group: '.col-6',
                validators: {
                    notEmpty: {
                        message: 'La descripcion de la categoria es obligatoria'
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
        url: 'MyWebService.asmx/LlenaTablaCategoriaTransaccion',
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
                $.each(index.ListaCategorias, function (r, arr) {
                    datos.push([arr.categoriaTransac, arr.descripcionCategoria, arr.idCatTipoTransac]);
                });
            });
        }
    });

    otable.clear();
    otable.rows.add(datos);
    otable.draw();
}