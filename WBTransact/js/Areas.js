var row;
$(function () {
    initEventos();
    initDataTable();
    llenaComboSucursal();
    
});

function initEventos() {
    $('#btnPlus').click(function () {
        
        llenaComboSucursal();
        var row = $("#detalleArea").DataTable().row('.selected').data();
        if (row) {
            $('#detalleArea').DataTable().$('tr.selected').removeClass('selected');
        }
        limpiaDivs();
        validateForm();
        $('#FormArea').data('bootstrapValidator').resetForm();
        document.getElementById("FormArea").reset();
        $('#sucursal').find("option[value='0']").attr("selected", true);
        $('#divTiposTransaccion').hide();
        $('#FormularioAlta').show();
        $("#tituloOperacion").html('Crear Área');
    });

    $('#btnAtras').click(function () {
        $('#FormArea').bootstrapValidator('destroy');
        $('#divTiposTransaccion').show();
        $('#FormularioAlta').hide();
    });

    $('#btnguardar').click(function () {
        row = $("#detalleArea").DataTable().row('.selected').data();
        var sucursales = new Array();
        if (row) {
            editArea();
        } else {
           
            $("input[name='sucursal']").each(function (index, item) {
                if ($("input[name='sucursal']:eq(" + index + ")").is(':checked')) {
                    sucursales.push(parseInt($(this).val()));
                }

            });
            var parameters = {
                nombreArea: $("#nombreArea").val(),
                descripcion: $("#descripcion").val(),
                idSucursal: sucursales
            };

            var areaDuplicada = 0;
            var valido = validateForm();
            if (valido) {
                $.ajax({
                    async: false,
                    type: 'POST',
                    url: 'MyWebService.asmx/insertaAreaWs',
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(parameters),
                    success: function (response) {
                        var tmp = JSON.stringify(response).split("}");
                        var ban = tmp[0].split(":");
                        if (ban[1] == "true") {
                        $.smallBox({
                            title: "Éxito!",
                            content: "Área <b>" + $('#nombreArea').val() + "</b> agregada",
                            color: "#739e73",
                            timeout: 2000,
                            icon: "fa fa-thumbs-up swing animated"
                            });
                        } else {
                            areaDuplicada = 1;
                            $.smallBox({
                                title: "Error!",
                                content: "<i>El área <b>" + $('#nombreArea').val() + "</b> ya existe </i>",
                                color: "#C46A69",
                                timeout: 3000,
                                icon: "fa fa-warning shake animated"
                            });
                        }
                        console.log(response);
                        llenaDataTable();
                    }
                });
                if (areaDuplicada == 0) {
                   
                    $('#FormArea').data('bootstrapValidator').resetForm();
                    $('#divTiposTransaccion').show();
                    $('#FormularioAlta').hide();
                } else {
                    $('#divTiposTransaccion').hide();
                    $('#FormularioAlta').show();
                }
               
            } /*else {
                $('#divTiposTransaccion').hide();
                $('#FormularioAlta').show();
            }*/
        }
    });

    $("#btnEdit").click(function () {
        limpiaDivs();
        var row = $("#detalleArea").DataTable().row('.selected').data();
        if (row) {
            LlenaCheckBoxAreasEdit(row[0]);
            $("#idArea").val(row[0]);
            $("#nombreArea").val(row[1]);
            $("#descripcion").val(row[2]);
            $('#sucursal').find("option[value='" + row[3] + "']").attr("selected", true);
            $('#divTiposTransaccion').hide();
            $('#FormularioAlta').show();
            $("#tituloOperacion").html('Editar Área');
        } else {
            showWarningMessage('Información </b>', '<i>Debe seleccionar un área</i>');
        }
        })

        $("#btnDelete").click(function () {
            var row = $('#detalleArea').DataTable().row('.selected').data();
            if (row) {
                var idArea = row[0];
                $.SmartMessageBox({
                    title: "¿Desea <font color='#ff9100'><b>eliminar</b></font> el área <b>" + row[1] + "</b>?",
                    content: "Una vez eliminada el Área no podras volver acceder a ella.",
                    buttons: '[No][Si]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "Si") {
                        $.ajax({
                            async: false,
                            type: "POST",
                            url: 'MyWebService.asmx/eliminarAreaWs',
                            data: JSON.stringify({ idArea: idArea }),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (output) {
                                $.each(output, function (j, cam) {
                                    showOkMessage('Área Eliminada', 'Se ha Eliminado el Área <b>' + row[1] + '<b>');
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
        url: 'MyWebService.asmx/LlenaTablaArea',
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
                $.each(index.listaRegistrosAreas, function (r, arr) {
                    //alert(arr.idArea, arr.nombreArea, arr.camposSucursal.idSucursal, arr.camposSucursal.nombre)
                    datos.push([arr.idArea, arr.nombreArea, arr.descripcion,arr.camposSucursal.nombre]);
                });
            });
        }
    });
    var otable = $('#detalleArea').DataTable({
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
                    $('#detalleArea'), breakpointDefinition);
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
                title: "Area"
            },
            {
                title: "Descripcion"
            },
        {
            title: "Sucursal"
        }
        ]
    });

    // Evento creado para realizar la búsqueda cuando se presione la tecla ENTER
    $("#detalleArea thead th input[type=text]").on(
        'keyup',
        function (e) {
            otable.column($(this).parent().index() + ':visible').search(
                this.value).draw();
        });

    // Método creado para agregar el evento de selección de una fila
    $('#detalleArea tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            $('#detalleArea').DataTable().$('tr.selected').removeClass(
                'selected');
            $(this).addClass('selected');
        }
    });
    // Evento creado para abrir la ventana de editar al dar doble click sobre un registro
    $('#detalleArea tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        var row = $("#detalleArea").DataTable().row('.selected').data();

        LlenaCheckBoxAreasEdit(row[0]);
        $("#idArea").val(row[0]);
        $("#nombreArea").val(row[1])
        $("#descripcion").val(row[2]);
        $('#divTiposTransaccion').hide();
        $('#FormularioAlta').show();
        $("#tituloOperacion").html('Editar Área');
    });
}

function llenaDataTable() {
    var otable = $('#detalleArea').DataTable();
    var datos = [];
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/LlenaTablaArea',
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
                $.each(index.listaRegistrosAreas, function (r, arr) {
                    //alert(arr.idArea, arr.nombreArea, arr.camposSucursal.idSucursal, arr.camposSucursal.nombre)
                    datos.push([arr.idArea, arr.nombreArea, arr.descripcion, arr.camposSucursal.nombre]);
                });
            });
        }
    });


    otable.clear().draw();
    otable.rows.add(datos);
    otable.draw();
    otable.ajax.reload();
}

function llenaComboSucursal() {
    /*var html = '';

    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/LlenaComboSucursalWS',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (dataList) {
            //html = '<option value="0">Selecciona una sucursal</option>';
            $.each(dataList, function (index, list) {
                $.each(list.listaRegistrosSucursal, function (index, item) {
                    html += '<input type="checkbox" value="' + item.idSucursal + '" id="' + item.idSucursal + '" name=sucursal>' + item.nombre + '</input><br>';
                });
                $("#sucursal").html(html);
            });
        }
    });*/

    var html = '';
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/LlenaComboSucursalWS',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (dataList) {
            //html = '<option value="0">Selecciona una sucursal</option>';
            $.each(dataList, function (index, list) {
                $.each(list.ListaRegistrosSucursal, function (index, item) {
                    html += '<input type="checkbox" value="' + item.idSucursal + '" id="' + item.idSucursal + '" name=sucursal>' + item.nombre + '</input><br>';
                });
                $("#sucursal").html(html);
            });
        }
    });

    
}

//Llena checkBox Privilegios al Editar
function LlenaCheckBoxAreasEdit(idArea) {
    var chk = "";
    var parameters = {
        idArea: idArea
    };
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/LlenaCheckBoxAreasEdit',
        data: JSON.stringify(parameters),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(data, function (index, item2) {
                $.each(item2.listaRegistrosAreas, function (index1, itemArea) {
                    if (itemArea.chkSucursal === "checked") {
                        chk += '<input type="checkbox" value="' + itemArea.camposSucursal.idSucursal + '" checked = "true" name="sucursal"/>&nbsp; ' + itemArea.camposSucursal.nombre + '</br >';
                    } else {
                        chk += '<input type="checkbox" value="' + itemArea.camposSucursal.idSucursal + '" name="sucursal"/>&nbsp; ' + itemArea.camposSucursal.nombre + '</br >';
                    }
                });
            });
            $("#sucursal").html(chk);
        }
    });

}

function editArea() {
    var valido;
    var areaDuplicadaEdit = 0;
    valido = validateForm();
    var sucursales = new Array();
    if (valido) {

        $("input[name='sucursal']").each(function (index, item) {
            if ($("input[name='sucursal']:eq(" + index + ")").is(':checked')) {
                sucursales.push(parseInt($(this).val()));
            }

        });
        var parameters = {
            idArea: $("#idArea").val(),
            nombreArea: $("#nombreArea").val(),
            descripcion: $("#descripcion").val(),
            idSucursal: sucursales
        };

        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/actualizarAreaWs',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(parameters),
            success: function (response) 
            {
                var tmp = JSON.stringify(response).split("}");
                var ban = tmp[0].split(":");
                if(ban[1] == "true") {
                    $.smallBox({
                        title: "Éxito!",
                        content: "Área <b>" + $('#nombreArea').val() + "</b> editada",
                        color: "#739e73",
                        timeout: 2000,
                        icon: "fa fa-thumbs-up swing animated"
                    }
                    );
                    llenaDataTable();
                } else {
                    areaDuplicadaEdit = 1;
                    $.smallBox({
                        title: "Error!",
                        content: "<i>El área <b>" + $('#nombreArea').val() + "</b> ya existe </i>",
                        color: "#C46A69",
                        timeout: 3000,
                        icon: "fa fa-warning shake animated"
                    });

                }
                        console.log(response);
               
            }

        });
        if (areaDuplicadaEdit == 0) {
            $('#FormArea').data('bootstrapValidator').resetForm();
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

function validateForm() {
    $("#FormArea").bootstrapValidator({
        excluded: [':disabled'],
        live: 'enabled',
        submitButtons: 'button[id="btnguardar"]',
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        fields: {
            nombreArea: {
                selector: '#nombreArea',
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'El nombre del área es requerido'
                    },
                }
            },
            descripcion: {
                selector: '#descripcion',
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'La descripción del área es requerido'
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

    $('#FormArea').data('bootstrapValidator').validate();
    var valido = $('#FormArea').data('bootstrapValidator').isValid();
    console.log("llega " + valido);
    return valido;
}

function limpiaDivs() {
    $(".form-group").removeClass('has-error');
    $(".form-group").removeClass('has-success');
}