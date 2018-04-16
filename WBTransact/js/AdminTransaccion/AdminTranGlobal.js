$(function () {
    $("#SelEstatus").hide();
    $('#sectDatosGral').hide();
    $('#sectCamposDin').hide();
    $('#sectEtapAcci').hide();
    $('#frmConbobox').hide();
    $('#sectRxCampo').hide();

    initDataTablePrincipal();

   

});


$('#btnPlus').click(function () {

    //funcion valida estatus
    //btnNext1
    //btnAtras1
    //$("#btnNext1").prop("disabled", true)


    $('#divTiposTransaccion').toggle("swing");
    $('#sectDatosGral').toggle("swing");




    //$('#tablaComplementarios tbody').removeClass('selected');
    //$('#tablaEtapas tbody').removeClass('selected');

    //botonRnC = botonRnC + 2;

    //$('#btn_EditTransaccion').prop("disabled", false);

    //var valores = '';

    //$('#divTiposTransaccion').hide();
    //$('#divCrearTransaccion').show();
    //$("#btn_EditTransaccion").hide();
    //$('#btnEditComplement').hide();
    //$('#btnDeleteComplement').hide();
    //$('#btnEditEtapa').hide();
    //$('#btnDeleteEtapa').hide();
    //$(".btn-next").prop("disabled", true);
    //ResetPlus();
    //$('#btn_agregarTransaccion').show();
    //$('#CamposComp').hide();

    //$('#btnEditComplement').hide();
    //$('#btnDeleteComplement').hide();
    //$('#tabla_Comp').hide();
    //$('#TDEtapas').hide();


    //$('#form_campos').bootstrapValidator('destroy');
    //$('#form_ciclo').bootstrapValidator('destroy');
    //$('#form_acciones').bootstrapValidator('destroy');
    //$('#form_RN2').bootstrapValidator('destroy');
    //$('#form_Autocompletar').bootstrapValidator('destroy');
    //$('#RN_Accion').bootstrapValidator('destroy');
    //$('#form_Combo').bootstrapValidator('destroy');
    //$('#form_reglas').bootstrapValidator('destroy');
    //$('#form_transaccion').bootstrapValidator('destroy');


    //$('#smartWizard').wizard('selectedItem', { // mover wizard a
    //    // paso2
    //    step: 1
    //});
    //bootsVal();




});
$('#btnAtras').click(function () {

    $('#divTiposTransaccion').toggle("swing");
    $('#sectDatosGral').toggle("swing");

    initDataTablePrincipal();
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

                                //var datosTabla = [];
                                //$.ajax({
                                //    async: false,
                                //    type: 'POST',
                                //    url: 'MyWebService.asmx/LlenaTipoTransaccion',
                                //    dataType: 'json',
                                //    contentType: 'application/json; charset=utf-8',
                                //    success: function (response) {

                                //        $.each(response, function (row, index) {
                                //            $.each(index.ListaTipoTran, function (r, arr) {
                                //                datosTabla.push([arr.nombre, arr.clave, arr.categoria, arr.estatus, arr.fecha, arr.idTipoTransaccion, arr.area, arr.proceso, arr.idCategoria])

                                //                ;
                                //            });
                                //        });

                                //    }

                                //});

                                //otable.clear();
                                //otable.rows.add(datosTabla);
                                //otable.draw();



                                initDataTablePrincipal();
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


function initDataTablePrincipal() {
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

$(document).ready(function () {

    pageSetUp();

    // PAGE RELATED SCRIPTS

    $('.tree > ul').attr('role', 'tree').find('ul').attr('role', 'group');
    $('.tree').find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem').find(' > span').attr('title', 'Collapse this branch').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(':visible')) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').removeClass().addClass('fa fa-lg fa-plus-circle');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').removeClass().addClass('fa fa-lg fa-minus-circle');
        }
        e.stopPropagation();
    });

})

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
function validarNumeros(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);

    if (tecla === 8) return true;
    patron = /[0-9\t]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);

}