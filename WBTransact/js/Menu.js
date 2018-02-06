$(function () {
    initEventos();
    initDataTable();
    llenaCheckAplicaciones();
    
});

function initEventos() {
   

    $('#btnPlus').click(function () {

        var menuPadre = ' <select type="text" id="menuPadre" onkeypress="" onchange="llenaComboMenuPadre()" class="form-control" name="menuPadre">';
        menuPadre += ' <option value=""> Selecciona nivel de menú </option>';
        menuPadre += ' <option value = 1 > Hijo </option>';
        menuPadre += ' <option value = 0 > Padre </option>';
        menuPadre += ' </select>';
        $("#menuPadre").html(menuPadre);
        $("#combomenuPadre").html('');
        llenaCheckAplicaciones();
        var row = $("#detalleMenus").DataTable().row('.selected').data();
        if (row) {
            $('#detalleMenus').DataTable().$('tr.selected').removeClass('selected');
        }
       
        limpiaDivs();
        validateForm();
        $('#FormMenu').data('bootstrapValidator').resetForm();                                          
        document.getElementById("FormMenu").reset();
        $('#aplicaciones').find("option[value='0']").attr("selected", true);
        $('#divTiposTransaccion').hide();
        $('#FormularioAlta').show();
        $("#tituloOperacion").html('Crear Menú');
    });

    $('#btnAtras').click(function () {
       
        $("#combomenuPadre").html('');
        $('#FormularioAlta').bootstrapValidator('destroy');
        $('#divTiposTransaccion').show();
        $('#FormularioAlta').hide();
    });

    $('#btnguardar').click(function () {
        
        var row = $("#detalleMenus").DataTable().row('.selected').data();
        var aplicaciones = new Array();
        if (row) {
            editMenu();
        } else {
            $("input[name='aplicaciones']").each(function (index, item) {
                if ($("input[name='aplicaciones']:eq(" + index + ")").is(':checked')) {
                    aplicaciones.push(parseInt($(this).val()));
                }

            });          
        
                var parameters = {
                nombreMenu: $("#nombreMenu").val(),
                idNivelPadre: $("#menuPadre").val(),
                idPadre: $("#combomenuPadre1").val(),
                descripcion: $("#descripcion").val(),
                icono: $("#icono").val(),
                liga: $("#liga").val(),
                idAplicaciones: aplicaciones
                                };
            var menuDuplicado = 0;
            var valido = validateForm();
            if (valido) {
                $.ajax({
                    async: false,
                    type: 'POST',
                    url: 'MyWebService.asmx/insertaMenu',
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(parameters),
                    success: function (response) {
                        var tmp = JSON.stringify(response).split("}");
                        var ban = tmp[0].split(":");
                        if (ban[1] == "true") {
                            $.smallBox({
                                title: "Éxito!",
                                content: "Menú <b>" + $('#nombreMenu').val() + "</b> agregado",
                                color: "#739e73",
                                timeout: 2000,
                                icon: "fa fa-thumbs-up swing animated"
                            });
                            
                            //$('#FormMenu').bootstrapValidator('destroy');
                            $('#FormMenu')[0].reset();
                            $("#combomenuPadre").html('');                    
                            //$("#combomenuPadre").hide();
                            //validateForm();
                            //llenaComboMenuPadre()
                            //bostrapvaliBND();

                            //llenaDataTable();

                        } else {
                            menuDuplicado = 1;
                            $.smallBox({
                                title: "Error!",
                                content: "<i>El menú <b>" + $('#nombreMenu').val() + "</b> ya existe </i>",
                                color: "#C46A69",
                                timeout: 3000,
                                icon: "fa fa-warning shake animated"
                            });
                        }
                        //console.log(response);
                        
                    }
                });

                if (menuDuplicado == 0) {
                    //$('#FormularioAlta').bootstrapValidator('destroy');
                    //$('#FormMenu').data('bootstrapValidator').resetForm();
                    //llenaDataTable();
                    ////var otable = $('#detalleMenus').DataTable();
                    ////otable.ajax.reload();

                    $('#divTiposTransaccion').show();
                    $('#FormularioAlta').hide();


                    initDataTable();
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

    $("#btnEdit").click(function () {

        limpiaDivs();

        var row = $("#detalleMenus").DataTable().row('.selected').data();
        if (row) {

            console.log(row[0]);

            llenaComboMenuPadreEdit(row[0]);
            LlenaCheckBoxMenusEdit(row[0]);
            $("#idMenu").val(row[0]);
            $("#nombreMenu").val(row[1]);
            $("#menuPadre").find("option[value='" + row[2] + "']").attr("selected", true);
            $("#descripcion").val(row[3]);
            $("#icono").val(row[4]);
            $("#liga").val(row[5]);
            $("#ligaaplicaciones").val(row[6]);
            $('#divTiposTransaccion').hide();
            $('#FormularioAlta').show();
            $("#tituloOperacion").html('Editar Menú');
        } else {
            showWarningMessage('Información </b>', '<i>Debe seleccionar un elemento</i>');
        }
    });

    $("#btnDelete").click(function () {
        var row = $('#detalleMenus').DataTable().row('.selected').data();
        if (row) {
            var idMenu = row[0];
            $.SmartMessageBox({
                title: "¿Desea <font color='#ff9100'><b>eliminar</b></font> el menú <b>" + row[1] + "</b>?",
                content: "Una vez eliminado el Menú no podras volver acceder a él.",
                buttons: '[No][Si]'
            }, function (ButtonPressed) {
                if (ButtonPressed === "Si") {
                    $(".MessageBoxButtonSection").hide();
                    $.ajax({
                        async: false,
                        type: "POST",
                        url: 'MyWebService.asmx/eliminarMenuWs',
                        data: JSON.stringify({ idMenu: idMenu }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (output) {
                            $.each(output, function (j, cam) {
                                showOkMessage('Menú Eliminado', 'Se ha Eliminado el Menú <b>' + row[1] + '<b>');
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
    });
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
        url: 'MyWebService.asmx/LlenaTablaMenus',
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
                $.each(index.listaRegistrosMenu, function (r, arr) {
                    datos.push([arr.idMenu, arr.nombreMenu, arr.nombreMenuPadre, arr.descripcionMenu, arr.icono, arr.liga, arr.camposAplicaciones.nombreAplicacion]);
                });
            });
        }
    });

    var otable = $('#detalleMenus').DataTable({
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
                    $('#detalleMenus'), breakpointDefinition);
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
                title: "Menú"
            },
            {
                title: "Menú Padre"
            },
            {
                title: "Descripción"
            },
            {
                title: "Icono"
            },
            {
                title: "Liga"
            },
        {
            title: "Aplicaciones"
        }
        ]
    });

    // Evento creado para realizar la búsqueda cuando se presione la tecla ENTER
    $("#detalleMenus thead th input[type=text]").on(
        'keyup',
        function (e) {
            otable.column($(this).parent().index() + ':visible').search(
                this.value).draw();
        });

    // Método creado para agregar el evento de selección de una fila
    $('#detalleMenus tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            $('#detalleMenus').DataTable().$('tr.selected').removeClass(
                'selected');
            $(this).addClass('selected');
        }
    });
    // Evento creado para abrir la ventana de editar al dar doble click sobre un registro
    $('#detalleMenus tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        var row = $("#detalleMenus").DataTable().row('.selected').data();

        llenaComboMenuPadreEdit(row[0]);
        LlenaCheckBoxMenusEdit(row[0]);
        $("#idMenu").val(row[0]);
        $("#nombreMenu").val(row[1]);
        $("#menuPadre").find("option[value='" + row[2] + "']").attr("selected", true);
        $("#descripcion").val(row[3]);
        $("#icono").val(row[4]);
        $("#liga").val(row[5]);
        $("#ligaaplicaciones").val(row[6]);
        $('#divTiposTransaccion').hide();
        $('#FormularioAlta').show();
        $("#tituloOperacion").html('Editar Menú');
    });
}

function llenaDataTable() {
    var otable = $('#detalleMenus').DataTable();
    var datos = [];

    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/LlenaTablaMenus',
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
                $.each(index.listaRegistrosMenu, function (index, item) {
                   //datos.push([item.idMenu, item.nombreMenu, item.nombreMenuPadre, item.nombreMenuHijo,item.icono, item.liga, item.descripcionMenu, item.camposAplicaciones.nombreAplicacion]);
                    datos.push([item.idMenu, item.nombreMenu, item.nombreMenuPadre, item.descripcionMenu, item.icono, item.liga, item.camposAplicaciones.nombreAplicacion]);

                });
            });
        }
    });

    otable.clear().draw();
    otable.rows.add(datos);
    otable.draw();
    otable.ajax.reload();
}

function llenaCheckAplicaciones() {
    var html = '';
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/LlenaCheckAplicaciones',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (dataList) {
            //html = '<option value="0">Selecciona una sucursal</option>';
            $.each(dataList, function (index, list) {
                $.each(list.listaAplicaciones, function (index, item) {
                    html += '<input type="checkbox" value="' + item.idAplicacion + '" id="' + item.idAplicacion + '" name=aplicaciones>' + item.nombreAplicacion + '</input><br>';
            });
            $("#aplicaciones").html(html);
            });
        }
    });
}

function llenaComboMenuPadre() {
    var html = '';
    if ($("#menuPadre").val() == 0) {

        if ($("#menuPadre").val() == ''  ) {

            $("#combomenuPadre").html('');
        } else {
            html = ' <div class="required">' +
                ' <label class="control-label negritas"> Menú padre </label >' +
                ' </div >';
            html += ' <div class="form-group">';
            html += ' <select type = "text" id = "combomenuPadre1" onkeypress="" class = "form-control" name = "combomenuPadre1" >';
            html += ' <option value="' + 0 + '"> Nivel Padre </option>';
            html += ' </select >';
            html += ' </div>';
            $("#combomenuPadre").html(html);

        }
    }
  if ($("#menuPadre").val() == 1) {

        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/LlenaComboMenuPadre',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (dataList) {
                html = ' <div class="required">' +
                    ' <label class="control-label negritas"> Menú hijo </label >' +
                    ' </div >';
                html += ' <div class="form-group">';
                html += ' <select type = "text" id = "combomenuPadre1" onkeypress="" class = "form-control" name = "combomenuPadre1" >';
                //html += ' <option value="">Selecciona un menú padre</option>';
                $.each(dataList, function (index, list) {
                    $.each(list.listaRegistrosMenu, function (index, item) {
                        html += ' <option value="' + item.idMenu + '">' + item.nombreMenu + '</option>';
                    });

                    html += ' </select >';
                    html += ' </div>';

                    $("#combomenuPadre").html(html);

                 
                });
            }
        });
    } 
}

//Llena checkBox Menu Padre al Editar
function llenaComboMenuPadreEdit(idMenu) {

    var html = '';
    var menuPadre;
    var parametros = {
        idMenu: idMenu
    }

        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/LlenaComboMenuPadreEdit',
            data: JSON.stringify(parametros),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (dataList) {
                html = ' <div class="required">' +
                    ' <label class="control-label negritas"> Menú padre </label >' +
                    ' </div >';
                html += ' <div class="form-group">';
                html += ' <select type = "text" id = "combomenuPadre1" onkeypress="" class = "form-control" name = "combomenuPadre1" >';
                $.each(dataList, function (index, list) {
                    $.each(list.listaRegistrosMenu, function (index, item) {
                        html += ' <option value="' + item.idMenu + '">' + item.nombreMenu + '</option>';

                        menuPadre = item.idNivelPadre;
                        
                    });

                    if (menuPadre === 0) {
                        menuPadre = ' <select type="text" id="menuPadre" onkeypress="" onchange="llenaComboMenuPadre()" class="form-control" name="menuPadre">';
                        menuPadre += ' <option value = 0 > Padre </option> ';
                        menuPadre += ' <option value = 1 > Hijo </option>';
                        menuPadre += ' </select>';

                    } else if (menuPadre === 1) {
                        menuPadre = ' <select type="text" id="menuPadre" onkeypress="" onchange="llenaComboMenuPadre()" class="form-control" name="menuPadre">';
                        menuPadre += ' <option value = 1 > Hijo </option>';
                        menuPadre += ' <option value = 0 > Padre </option>';
                        menuPadre += ' </select>';
                    }

                    html += ' </select >';
                    html += ' </div>';

                    $("#menuPadre").html(menuPadre);
                    $("#combomenuPadre").html(html);

                });
            }
        });
}

//Llena checkBox Aplicaciones al Editar
function LlenaCheckBoxMenusEdit(idMenu) {
    var chk = "";
    var parameters = {
        idMenu: idMenu
    };
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/LlenaCheckBoxMenusEdit',
        data: JSON.stringify(parameters),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(data, function (index, item) {
                $.each(item.listaRegistrosMenu, function (index1, item1) {
                    if (item1.chkAplicacion === "checked") {
                        chk += '<input type="checkbox" value="' + item1.camposAplicaciones.idAplicacion + '" checked = "true" name="aplicaciones"/>&nbsp; ' + item1.camposAplicaciones.nombreAplicacion + '</br >';
                    } else {
                        chk += '<input type="checkbox" value="' + item1.camposAplicaciones.idAplicacion + '" name="aplicaciones"/>&nbsp; ' + item1.camposAplicaciones.nombreAplicacion + '</br >';
                    }
                });
            });
            $("#aplicaciones").html(chk);
        }
    });

}

function editMenu() {
    var valido;
    valido = validateForm();
    var menuDuplicadoEdit = 0;
    var aplicaciones = new Array();
    if (valido) {

        $("input[name='aplicaciones']").each(function (index, item) {
            if ($("input[name='aplicaciones']:eq(" + index + ")").is(':checked')) {
                aplicaciones.push(parseInt($(this).val()));
            }

        });
        var parameters = {
            idMenu: $("#idMenu").val(),
            nombreMenu: $("#nombreMenu").val(),
            idNivelPadre: $("#menuPadre").val(),
            idPadre: $("#combomenuPadre1").val(),
            descripcion: $("#descripcion").val(),
            icono: $("#icono").val(),
            liga: $("#liga").val(),
            idAplicaciones: aplicaciones
        };
        $.ajax({
            async: false,
            type: 'POST',
            url: 'MyWebService.asmx/actualizarMenu',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(parameters),
            success: function (response) {
                var tmp = JSON.stringify(response).split("}");
                var ban = tmp[0].split(":");
                if (ban[1] == "true") {
                    $.smallBox({
                        title: "Éxito!",
                        content: "Menú <b>" + $('#nombreMenu').val() + "</b> editado",
                        color: "#739e73",
                        timeout: 2000,
                        icon: "fa fa-thumbs-up swing animated"
                    }
                    );
                    initDataTable();
                } else {
                    menuDuplicadoEdit = 1;
                    $.smallBox({
                        title: "Error!",
                        content: "<i>El menú <b>" + $('#nombreMenu').val() + "</b> ya existe </i>",
                        color: "#C46A69",
                        timeout: 3000,
                        icon: "fa fa-warning shake animated"
                    });

                }
                console.log(response);

            }
        });

        if (menuDuplicadoEdit == 0) {
            $('#FormMenu').data('bootstrapValidator').resetForm();
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
    $("#FormMenu").bootstrapValidator({
        excluded: [':disabled'],
        live: 'enabled',
        submitButtons: 'button[id="btnguardar"]',
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        fields: {
            nombreMenu: {
                selector: '#nombreMenu',
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'El nombre del menú es requerido'
                    },
                }
            },
            descripcion: {
                selector: '#descripcion',
                group: '.form-group',
                validators: {
                    notEmpty: {
                        message: 'La descripción del menú es requerido'
                    },
                }
            }, 
            menuPadre: {
                selector: '#menuPadre',
                group: '.form-group',
                validators: {
                    callback: {
                        message: 'Selecciona un nivel de menú',
                        callback: function (value, validator, $field) {
                            if (value === '') {
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

    $('#FormMenu').data('bootstrapValidator').validate();
    var valido = $('#FormMenu').data('bootstrapValidator').isValid();
    console.log("llega " + valido);
    return valido;
}


function limpiaDivs() {
    $(".form-group").removeClass('has-error');
    $(".form-group").removeClass('has-success');
}