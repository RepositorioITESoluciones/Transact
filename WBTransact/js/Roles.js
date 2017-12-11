$(function () {
    initEventos();
    initDataTable();
    llenaCheckMenu();
    
});

function initEventos() {
    $('#btnPlus').click(function () {
        var row = $("#detalleRoles").DataTable().row('.selected').data();
        if (row) {
            $('#detalleRoles').DataTable().$('tr.selected').removeClass('selected');
        }
        limpiaDivs();
        validateForm();
        $('#FormRol').data('bootstrapValidator').resetForm();
        document.getElementById("FormRol").reset();
        $('#menus').find("option[value='0']").attr("selected", true);
        $('#divTiposTransaccion').hide();
        $('#FormularioAlta').show();
        $("#tituloOperacion").html('Crear Área');
    });

    $('#btnAtras').click(function () {
        $('#FormularioAlta').bootstrapValidator('destroy');
        $('#divTiposTransaccion').show();
        $('#FormularioAlta').hide();
    });

    $('#btnguardar').click(function () {
        var row = $("#detalleRoles").DataTable().row('.selected').data();
        var menus = new Array();
        if (row) {
            editRol();
        } else {
           
            $("input[name='menus']").each(function (index, item) {
                if ($("input[name='menus']:eq(" + index + ")").is(':checked')) {
                    menus.push(parseInt($(this).val()));
                }

            });
            var parameters = {
                nombreRol: $("#nombreRol").val(),
                descripcion: $("#descripcion").val(),
                idMenus: menus
            };

            var valido = validateForm();
            if (valido) {
                $.ajax({
                    async: false,
                    type: 'POST',
                    url: 'MyWebService.asmx/insertaRolWs',
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(parameters),
                    success: function (response) {
                        $.smallBox({
                            title: "Éxito!",
                            content: "Rol <b>" + $('#descripcion').val() + "</b> agregado",
                            color: "#739e73",
                            timeout: 2000,
                            icon: "fa fa-thumbs-up swing animated"
                        });
                        console.log(response);
                        llenaDataTable();
                    }
                });
                $('#FormRol').data('bootstrapValidator').resetForm();
                $('#divTiposTransaccion').show();
                $('#FormularioAlta').hide();
            } else {
                $('#divTiposTransaccion').hide();
                $('#FormularioAlta').show();
            }
        }
    });

    $("#btnEdit").click(function () {
        limpiaDivs();
        var row = $("#detalleRoles").DataTable().row('.selected').data();
        if (row) {
            LlenaCheckBoxRolEdit(row[0]);
            $("#idRol").val(row[0]);
            $("#nombreRol").val(row[1]);
            $("#descripcion").val(row[2]);
            $('#menus').find("option[value='" + row[3] + "']").attr("selected", true);
            $('#divTiposTransaccion').hide();
            $('#FormularioAlta').show();
            $("#tituloOperacion").html('Editar Área');
        } else {
            showWarningMessage('Información </b>', '<i>Debe seleccionar un elemento</i>');
        }
        })

        $("#btnDelete").click(function () {
            var row = $('#detalleRoles').DataTable().row('.selected').data();
            if (row) {
                var idArea = row[0];
                $.SmartMessageBox({
                    title: "¿Desea <font color='#ff9100'><b>eliminar</b></font> el area <b>" + row[1] + "</b>?",
                    content: "Una vez eliminada la Transaccion no podras volver acceder a ella.",
                    buttons: '[No][Si]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "Si") {
                        $.ajax({
                            async: false,
                            type: "POST",
                            url: 'MyWebService/eliminarAreaWs',
                            data: JSON.stringify({ idArea: idArea }),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (output) {
                                $.each(output, function (j, cam) {
                                    showOkMessage('Transaccion Eliminada', 'Se ha Eliminado la Transaccion <b>' + row[1] + '<b>');
                                    llenaDataTable();
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
        url: 'MyWebService.asmx/LlenaTablaRoles',
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
                $.each(index.listaRegistrosRoles, function (r, arr) {
                    datos.push([arr.idRol, arr.nombreRol, arr.descripcionRol, arr.camposMenus.nombreMenu]);
                });
            });
        }
    });
    var otable = $('#detalleRoles').DataTable({
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
                    $('#detalleRoles'), breakpointDefinition);
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
            title: "id",
            visible: false
        },
            {
                title: "Roles"
            },
            {
                title: "Descripción"
            },
        {
            title: "Menús"
        }
        ]
    });

    // Evento creado para realizar la búsqueda cuando se presione la tecla ENTER
    $("#detalleRoles thead th input[type=text]").on(
        'keyup',
        function (e) {
            otable.column($(this).parent().index() + ':visible').search(
                this.value).draw();
        });

    // Método creado para agregar el evento de selección de una fila
    $('#detalleRoles tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            $('#detalleRoles').DataTable().$('tr.selected').removeClass(
                'selected');
            $(this).addClass('selected');
        }
    });
    // Evento creado para abrir la ventana de editar al dar doble click sobre un registro
    $('#detalleRoles tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        var row = $("#detalleRoles").DataTable().row('.selected').data();
        LlenaCheckBoxRolEdit(row[0]);
        $("#idRol").val(row[0]);
        $("#nombreRol").val(row[1])
        $("#descripcion").val(row[2]);
        $('#menus').val(row[3]);
        $('#divTiposTransaccion').hide();
        $('#FormularioAlta').show();
        $("#tituloOperacion").html('Editar Área');
    });
}

function llenaDataTable() {
    var otable = $('#detalleRoles').DataTable();
    var datos = [];
    
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/LlenaTablaRoles',
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
                $.each(index.listaRegistrosRoles, function (index, item) {
                    datos.push([item.idRol, item.nombreRol, item.descripcionRol, item.camposMenus.nombreMenu]);
                });
            });
        }
    });
    otable.clear().draw();
    otable.rows.add(datos);
    otable.draw();
    otable.ajax.reload();
}

function llenaCheckMenu() {
    var html = '';
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/LlenaCheckMenulWS',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (dataList) {
            //html = '<option value="0">Selecciona una sucursal</option>';
            $.each(dataList, function (index, list) {
                $.each(list.listaRegistrosMenu, function (index, item) {
                    html += '<input type="checkbox" value="' + item.idMenu + '" id="' + item.idMenu + '" name=menus>' + item.nombreMenu + '</input><br>';
            });
            $("#menus").html(html);
            });
        }
    });
}

//Llena checkBox Privilegios al Editar
function LlenaCheckBoxRolEdit(idRol) {
    var chk = "";
    var parameters = {
        idRol: idRol
    };
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/LlenaCheckBoxRolEdit',
        data: JSON.stringify(parameters),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(data, function (index, item) {
                $.each(item.listaRegistrosRoles, function (index1, item1) {
                    if (item1.chkMenu === "checked") {
                        chk += '<input type="checkbox" value="' + item1.camposMenus.idMenu + '" checked = "true" name="menus"/>&nbsp; ' + item1.camposMenus.nombreMenu + '</br >';
                    } else {
                        chk += '<input type="checkbox" value="' + item1.camposMenus.idMenu + '" name="menus"/>&nbsp; ' + item1.camposMenus.nombreMenu + '</br >';
                    }
                });
            });
            $("#menus").html(chk);
        }
    });

}

function editRol() {
    var valido;
    valido = validateForm();
    var menus = new Array();
    if (valido) {

        $("input[name='menus']").each(function (index, item) {
            if ($("input[name='menus']:eq(" + index + ")").is(':checked')) {
                menus.push(parseInt($(this).val()));
            }

        });
        var parameters = {
            idRol: $("#idRol").val(),
            nombreRol: $("#nombreRol").val(),
            descripcion: $("#descripcion").val(),
            idMenus: menus
        };

        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/actualizarRolWs',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(parameters),
            success: function () {
                $.smallBox({
                    title: "Éxito!",
                    content: "Rol <b>" + $("#descripcion").val() + "</b> Editado",
                    color: "#739e73",
                    timeout: 2000,
                    icon: "fa fa-thumbs-up swing animated"
                });
                llenaDataTable();
            }
        });
        $('#FormRol').data('bootstrapValidator').resetForm();
        $('#divTiposTransaccion').show();
        $('#FormularioAlta').hide();
    } else {
        $('#divTiposTransaccion').hide();
        $('#FormularioAlta').show();
    }
}

function validateForm() {
    $("#FormRol").bootstrapValidator({
        excluded: [':disabled'],
        live: 'enabled',
        submitButtons: 'button[id="btnguardar"]',
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        fields: {
            nombreRol: {
                selector: '#nombreRol',
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'El nombre del rol es requerido'
                    },
                }
            },
            descripcion: {
                selector: '#descripcion',
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'La descripción del rol es requerido'
                    },
                }
            },
            idSucursal: {
                selector: '#sucursal',
                group: '.form-group',
                validators: {
                    callback: {
                        message: 'Selecciona una sucursal',
                        callback: function (value, validator, $field) {
                            if (value === '0') {
                                return  false
                            } else {
                                return true
                            }
                        }
                    }
                }
            }
        }
    });

    $('#FormRol').data('bootstrapValidator').validate();
    var valido = $('#FormRol').data('bootstrapValidator').isValid();
    console.log("llega " + valido);
    return valido;
}

function limpiaDivs() {
    $(".form-group").removeClass('has-error');
    $(".form-group").removeClass('has-success');
}