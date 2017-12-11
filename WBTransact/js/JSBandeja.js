﻿var array = [];
var objeto = [];
var objetoFormula = [];
var Valicabecera = "";
var detallevalida = '';
var inicio = 0;
var arregloC = [];
var arregloD = [];
var formula = '';
var jsonFormula;
var variable = '';
var formulas = [];
var datoss = [];
var idtransacccion = 0;
var idEtapa = 0;
var idAccion = 0;
var namesDetalle = []
var longitudC = 0;

var parametroE = "";

$(function () {
    $("#detalleReporte").hide()
    $("#menutipo").hide();
    $("#menutransact").hide();
    $("#catalogotransc").empty();
    ObtenerStatus();
});

function ObtenerStatus() {


    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/ObtenerStatusWS',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            var categtransact = "";
            //categtransact += '<span class="label"><i class="fa fa-lg fa-fw fa-random" aria-hidden="true"></i> Status Transacción:</span> <span class="project-selector dropdown-toggle" data-toggle="dropdown" id="idStatus" data="XAXX010101001">Selecciona.. <i class="fa fa-angle-down"></i></span>';
            
            categtransact += '<select id="SelEstatus" class="form-control">';
            categtransact += '<option value="0">Selecciona..</option>">';
            $.each(response, function (registro, row1) {

                $.each(row1.listStatus, function (i1, r1) {

                    //console.log(r1)
                    categtransact += '<option value="' + r1.idEstatus + '">' + r1.descripcion + '</option>';
                    //categtransact += '<li><a title="' + r1.descripcion + '" onclick="CrearTabla(' + "'" + r1.idEstatus + "'" + ',' + "'" + r1.descripcion + "'" + ')" id="' + r1.idEstatus + '" style="cursor: pointer">' + r1.descripcion + '</a></li>';
                });


            });
            categtransact += '</select>';
            $("#StatusTran").html(categtransact);
        },
        error: function (e) {
            console.log("error");

        }
    });
    $('#SelEstatus').change(function (e) {
        //alert($('#SelEstatus option:selected').html());
        //alert($('#SelEstatus').val());
        CrearTabla($('#SelEstatus').val(), $('#SelEstatus option:selected').html());
    });
}
function CrearTabla(id, descripcion) {
    var tablaPrincipal = "";
    $("#idStatus").empty();
    $("#idStatus").append(descripcion);
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/DetalleTransaccionesWS',
        data: JSON.stringify({
            idEstatus: id
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {

            console.log(response);

            tablaPrincipal += '<article class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="rowTransacciones">'
            tablaPrincipal += '<div class="jarviswidget jarviswidget-color-blueDark" id="wid-id-0" data-widget-colorbutton="false" data-widget-editbutton="false"'
            tablaPrincipal += 'data-widget-custombutton="false">'
            tablaPrincipal += '<header>'
            tablaPrincipal += '<span class="widget-icon"><i class="fa fa-table"></i></span><h2>Transacciones</h2>'
            tablaPrincipal += '</header>'

            tablaPrincipal += '<div>'
            tablaPrincipal += '<div class="jarviswidget-editbox"></div>'
            tablaPrincipal += '<div class="widget-body">'
            tablaPrincipal += '<p>Estatus de las transacciones registradas en sistema.</p>'
            tablaPrincipal += '<div class="row">'

            tablaPrincipal += '<div class="col-sm-12 col-md-12 col-lg-12">'

            switch (descripcion) {
                case "Por atender":
                    tablaPrincipal += '<p class="alert alert-warning" style="margin:0;">'
                    tablaPrincipal += '<i class="fa fa-mail-forward"></i> Por atender'
                    break;

                case "En proceso":
                    tablaPrincipal += '<p class="alert alert-info" style="margin:0;">'
                    tablaPrincipal += '<i class="fa fa-retweet"></i> En proceso'
                    break;

                case "Detenido":
                    tablaPrincipal += '<p class="alert alert-danger" style="margin:0;">'
                    tablaPrincipal += '<i class="fa fa-minus-circle"></i> Detenido'
                    break;

                case "Atendido":
                    tablaPrincipal += '<p class="alert alert-success" style="margin:0;">'
                    tablaPrincipal += '<i class="fa fa-check-square"></i> Atendido'
                    break;

                case "Cancelado":
                    tablaPrincipal += '<p class="alert alert-danger" style="margin:0;">'
                    tablaPrincipal += '<i class="fa fa fa-times-circle"></i> Cancelado'
                    break;
            }


            tablaPrincipal += '</p>'
            tablaPrincipal += '<table id="example" class="table table-bordered table-hover table-responsive">'
            tablaPrincipal += '<thead>'
            tablaPrincipal += '<tr>'
            tablaPrincipal += '<th data-hide="phone"><i class="fa fa-fw fa-key text-muted hidden-md hidden-sm hidden-xs"></i> Folio</th>'
            tablaPrincipal += '<th data-class="expand"><i class="fa fa-fw fa-exchange text-muted hidden-md hidden-sm hidden-xs"></i> Tipo transacción</th>'
            tablaPrincipal += '<th data-hide="phone"><i class="fa fa-fw fa-calendar text-muted hidden-md hidden-sm hidden-xs"></i> Fecha Alta</th>'
            tablaPrincipal += '<th data-hide="phone,tablet"><i class="fa fa-fw fa-lock txt-color-blue hidden-md hidden-sm hidden-xs"></i> Clave</th>'
            tablaPrincipal += '</tr>'
            tablaPrincipal += '</thead>'
            tablaPrincipal += '<tbody>'



            $.each(response, function (registro, row1) {

                $.each(row1.listaTranBitacora, function (i1, r1) {


                    var idtra = "'" + r1.idTransaccion + "'";

                    tablaPrincipal += '<tr onclick="Optenerdetalle(' + r1.idTipoTransaccion + ',' + idtra + ')">'
                    tablaPrincipal += '<td>' + r1.idTransaccion + '</td>'
                    tablaPrincipal += '<td>' + r1.descripcion + '</td>'
                    tablaPrincipal += '<td>' + r1.fechaIniTransaccion + '</td>'
                    tablaPrincipal += '<td>' + r1.cveTipoTransaccion + '</td>'
                    tablaPrincipal += '</tr>'

                });


            });

            tablaPrincipal += '</tbody>'
            tablaPrincipal += '</table>'
            tablaPrincipal += '</div>'
            tablaPrincipal += '</div>'


            tablaPrincipal += '</div>'
            tablaPrincipal += '</div>'
            tablaPrincipal += '</article>'
            tablaPrincipal += '</div>'

            $("#bodyy").html(tablaPrincipal);

        },
        error: function (e) {
            console.log("error");

        }
    });


}
function Optenerdetalle(idTipoTransaccion, idtransaccion) {
    $("#titulo").html("Transacción " + idtransaccion);

    var TBLDetalle = '';

    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/detalleTBWS',
        data: JSON.stringify({ idtipo: idTipoTransaccion, idTransaccion: "'" + idtransaccion + "'" }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {

            TBLDetalle += '<table id="example" class="table table-bordered table-hover table-responsive">'
            TBLDetalle += '<thead>'
            TBLDetalle += '<tr>'
            TBLDetalle += '<th data-hide="phone"><i class="fa fa-fw fa-key txt-color-blue hidden-md hidden-sm hidden-xs"></i> Folio</th>'
            TBLDetalle += '<th data-class="expand"><i class="fa fa-fw fa-exchange txt-color-blue hidden-md hidden-sm hidden-xs"></i> nombreTransaccion</th>'
            TBLDetalle += '<th data-hide="phone"><i class="fa fa-fw fa-calendar txt-color-blue hidden-md hidden-sm hidden-xs"></i> Fecha Alta</th>'
            TBLDetalle += '<th data-hide="phone,tablet"><i class="fa fa-fw fa-lock txt-color-blue hidden-md hidden-sm hidden-xs"></i> Clave</th>'
            TBLDetalle += '<th data-hide="phone,tablet"><i class="fa fa-fw fa-user txt-color-blue hidden-md hidden-sm hidden-xs"></i> Rol</th>'
            TBLDetalle += '<th data-hide="phone,tablet"><i class="fa fa-fw fa-caret-square-o-down txt-color-blue hidden-md hidden-sm hidden-xs"></i> Etapa Actual</th>'
            TBLDetalle += '<th data-hide="phone,tablet"><i class="fa fa-fw fa-paper-plane txt-color-blue hidden-md hidden-sm hidden-xs"></i> Etapa Siguiente</th>'
            TBLDetalle += '</tr>'
            TBLDetalle += '</thead>'
            TBLDetalle += '<tbody>'




            $.each(response, function (registro, row1) {
                if (row1.lisCamposDetalleTB != null) {

                    $.each(row1.lisCamposDetalleTB, function (i1, r1) {

                        TBLDetalle += '<tr>'
                        TBLDetalle += '<td>' + r1.folioTransaccion + '</td>'
                        TBLDetalle += '<td>' + r1.nombreTransaccion + '</td>'
                        TBLDetalle += '<td>' + r1.fechaIniTransaccion + '</td>'
                        TBLDetalle += '<td>' + r1.Clave + '</td>'
                        TBLDetalle += '<td>' + r1.Rol + '</td>'
                        TBLDetalle += '<td>' + r1.EtapaAtual + '</td>'
                        TBLDetalle += '<td>' + r1.etapaSiguiente + '</td>'

                        TBLDetalle += '</tr>'

                    });
                }

            });

            TBLDetalle += '</tbody>'
            TBLDetalle += '</table>'
            $("#step1").html(TBLDetalle);
            //ArmaFormularioxetapa(idTipoTransaccion, idtransaccion);

            // bostrapvaliBND();

            $("#detalleReporte").show(function () { })
        },
        error: function (e) {
            console.log("error");

        }




    });
    ArmaFormularioxetapa(idTipoTransaccion, idtransaccion);

}
function ArmaFormularioxetapa(idTipoTransaccion, idtransaccion) {
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/ArmaFormularioxEtapa',
        data: JSON.stringify({ idTipoTransaccion: idTipoTransaccion, idtransaccion: idtransaccion }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (respuesta) {

            GeneraFormularioBND(respuesta);



        }
    });
    Bitacora(idTipoTransaccion, idtransaccion);
}

function Bitacora(idTipoTransaccion, idtransaccion) {
    var TBLDetalle = '';
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/DetalleBitacoraWS',
        data: JSON.stringify({ idTipoTransaccion: idTipoTransaccion, idtransaccion: idtransaccion }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {

            TBLDetalle += '<table id="Bitacora" class="table table-bordered table-hover table-responsive">'
            TBLDetalle += '<thead>'
            TBLDetalle += '<tr>'
            TBLDetalle += '<th data-hide="phone"><i class="fa fa-fw fa-key txt-color-blue hidden-md hidden-sm hidden-xs"></i> Folio</th>'
            TBLDetalle += '<th data-hide="phone,tablet"><i class="fa fa-fw fa-lock txt-color-blue hidden-md hidden-sm hidden-xs"></i> Movimiento</th>'
            TBLDetalle += '<th data-hide="phone,tablet"><i class="fa fa-fw fa-user txt-color-blue hidden-md hidden-sm hidden-xs"></i> Etapa</th>'
            TBLDetalle += '<th data-hide="phone,tablet"><i class="fa fa-fw fa-caret-square-o-down txt-color-blue hidden-md hidden-sm hidden-xs"></i> Accion</th>'
            TBLDetalle += '</tr>'
            TBLDetalle += '</thead>'
            TBLDetalle += '<tbody>'




            $.each(response, function (registro, row1) {
                if (row1.lista != null) {

                    $.each(row1.lista, function (i1, r1) {

                        TBLDetalle += '<tr>'
                        TBLDetalle += '<td>' + r1.idTransaccion + '</td>'
                        TBLDetalle += '<td>' + r1.cveMovimiento + '</td>'
                        TBLDetalle += '<td>' + r1.idEtapa + '</td>'
                        TBLDetalle += '<td>' + r1.idAccion + '</td>'
                        TBLDetalle += '</tr>'

                    });
                }

            });

            TBLDetalle += '</tbody>'
            TBLDetalle += '</table>'
            $("#step3").html(TBLDetalle);


        }
    });

}

function GeneraFormularioBND(xml_json) {
    var formHtml = "";
    Valicabecera = "";
    detallevalida = '';
    namesDetalle = [];
    objetoFormula = [];
    $.each(xml_json, function (reg, rowgral) {

        idTran = rowgral.idTipoTrasaccion;

        //console.log("eeeeeeeeeeeeeeeeeeeeeeeeeee" + idTran);

        Transaccion = rowgral.descripcion;
        CatTransaccion = rowgral.categoriaTransac;
        idEtapa = rowgral.idEtapa;
        idAccion = rowgral.idAccion;


        formHtml += "<div class='col-xs-12 col-sm-7 col-md-7 col-lg-4'> ";
        formHtml += "<h1 class='page-title txt-color-blueDark'>";
        formHtml += "<i class='fa fa-edit fa-fw'></i> ";
        formHtml += rowgral.descripcion;
        formHtml += "</h1>";
        formHtml += '</div>';


        formHtml += '<div class="row" id="">'

        formHtml += '<section id="widget-grid">'
        formHtml += '<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"></div>'
        formHtml += '<article class="col-xs-12 col-sm-12 col-md-12 col-lg-12 sortable-grid ui-sortable">'
        formHtml += '<div class="jarviswidget" id="wid-id-1" data-widget-editbutton="false" data-widget-custombutton="false">'


        formHtml += '<header role="heading">'
        formHtml += '<span class="widget-icon"> <i class="fa fa-edit"></i></span> <h2>Campos Cabecera</h2>'
        formHtml += '<span class="jarviswidget-loader" style="display: none;"><i class="fa fa-refresh fa-spin"></i></span>'
        formHtml += '</header>'

        formHtml += '<div role="content">'
        formHtml += '<form id="formCabecera" method="post" novalidate="novalidate" class="bv-form"><button type="submit" class="bv-hidden-submit" style="display: none; width: 0px; height: 0px;"></button>'

        formHtml += '<fieldset>'
        formHtml += '<legend>'
        //formHtml += 'ASDASDSA'
        formHtml += '</legend>'
        formHtml += '<div class="form-group">'
        // console.log("aqui va");
        //console.log(rowgral.CamposCabecera.length);

        if (rowgral.CamposCabecera.length != 0) {

            //console.log("ya entro");
            var contador = 0;

            $.each(rowgral.CamposCabecera, function (regcab, rowcab) {
                if (contador == 4 || contador == 0) {
                    formHtml += '<div class="row">'
                }
                if (rowcab.visible == true) {

                    objetoFormula = [];
                    if (regcab.formula != null) {
                        objetoFormula.push({
                            IdCampo: regcab.nombreCampo,
                            Json: regcab.formula
                        });
                    }
                    arregloC.push(rowcab.nombreCampo);
                    contador++;
                    formHtml += GeneraComposBND(rowcab.Visualisacion, rowcab.idCampo, rowcab.nombreCampo, rowcab.descripcionCampo, rowcab.logitudCampo, rowcab.obligatorio, rowcab.editable, rowcab.TransaccionReferencia, rowcab.idRef, rowcab.nomRef, rowcab.CadenaComplementos);
                }
                if (contador == 4 || contador == 0) {
                    formHtml += '</div >'
                }
            });




            Valicabecera += '{';
            $.each(rowgral.CamposCabecera, function (regcab, rowcab) {
                if (rowcab.visible == true) {

                    Valicabecera += '"' + rowcab.nombreCampo + '":'

                    if (rowcab.Visualisacion == "checkbox") {
                        Valicabecera += '{ "validators" : {';
                        Valicabecera += '"choice": {';
                        Valicabecera += '"min": 1,';
                        Valicabecera += '"message" : "Please choose 1 - 2 languages you can speak"'
                        Valicabecera += '}';
                    } else {

                        Valicabecera += '{"group": ".col-md-3","validators": {';
                        Valicabecera += '"stringLength": { "max" :' + rowcab.logitudCampo + ',';
                        Valicabecera += '"message" : "Caracteres maximos ' + rowcab.logitudCampo + '"}';

                        if (rowcab.obligatorio == "required") {



                            Valicabecera += ',';
                            Valicabecera += '"notEmpty": {"message": "El campo ' + rowcab.descripcionCampo + ' es obligatorio"}';


                        }
                    }
                    Valicabecera += '}},';
                }
            });

            Valicabecera = Valicabecera.substring(0, Valicabecera.length - 1);
            Valicabecera += '}';




        }




        formHtml += '</div >'
        formHtml += '</fieldset >'

        if (rowgral.CamposDetalle.length == 0) {


            formHtml += '<div class="form-actions">'
            formHtml += '<div class="row">'
            formHtml += '<div class="col-md-12">'
            formHtml += '<button id="addDetalle" onclick="GuardarRegitrosBND()" class="btn btn-primary btn-sm"><i class="fa fa-floppy-o"></i> Agregar</button>';
            formHtml += '</div>'
            formHtml += '</div>'
            formHtml += '</div>'


        }
        formHtml += '</form >'
        formHtml += '</div > <br />'

        formHtml += '</div >'
        formHtml += '</article >'
        formHtml += '</section >'

        formHtml += '</div >'

        if (rowgral.CamposDetalle.length != 0) {
            formHtml += '<div class="row" id="">'

            formHtml += '<section id="widget-grid">'
            formHtml += '<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3"></div>'
            formHtml += '<article class="col-xs-12 col-sm-12 col-md-12 col-lg-12 sortable-grid ui-sortable">'
            formHtml += '<div class="jarviswidget jarviswidget-color-white" data-widget-togglebutton="false" data-widget-deletebutton="false" data-widget-editbutton="false" data-widget-fullscreenbutton="true" data-widget-sortable="false" role="widget" data-widget-attstyle="jarviswidget-color-white">'


            formHtml += '<header role="heading">'
            formHtml += '<span class="widget-icon"> <i class="fa fa-edit"></i></span> <h2>Campos Detalle</h2>'
            formHtml += '<span class="jarviswidget-loader" style="display: none;"><i class="fa fa-refresh fa-spin"></i></span>'
            formHtml += '</header>'

            formHtml += '<div role="content">'
            formHtml += '<form id="formdetalle" method="post" novalidate="novalidate" class="bv-form"><button type="submit" class="bv-hidden-submit" style="display: none; width: 0px; height: 0px;"></button>'

            formHtml += '<fieldset>'
            formHtml += '<legend>'
            formHtml += '<button id="addDetalle" onclick="addDetallesBND()" class="btn btn-success btn-sm" type="button"><i class="fa fa-plus" type="button"></i> Agregar</button> &nbsp';
            formHtml += '<button id="deleteRow" onclick="deleteRowwBND()"  class="btn btn-danger btn-sm" type="button"><i class="fa fa-trash"></i>  Eliminar</button> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
            formHtml += '</legend>'
            formHtml += '<div class="form-group">'
            //formHtml += '<div class="row">'

            if (rowgral.CamposDetalle.length != 0) {

                var contador1 = 0;

                $.each(rowgral.CamposDetalle, function (regdet, rowdet) {
                    if (contador1 == 4 || contador1 == 0) {
                        formHtml += '<div class="row">'
                    }
                    if (rowdet.visible == true) {


                        if (rowdet.formula != null) {

                            //console.log(rowdet.nombreCampo + "-----" + rowdet.formula);
                            objetoFormula.push({
                                IdCampo: rowdet.nombreCampo,
                                Json: rowdet.formula
                            });



                        }
                        arregloC.push(rowdet.nombreCampo);
                        contador1++;
                       
                        formHtml += GeneraComposBND(rowdet.Visualisacion, rowdet.idCampo, rowdet.nombreCampo, rowdet.descripcionCampo, rowdet.logitudCampo, rowdet.obligatorio, rowdet.editable, rowdet.TransaccionReferencia, rowdet.idRef, rowdet.nomRef, rowdet.CadenaComplementos);
                    }
                    if (contador1 == 4 || contador1 == 0) {
                        formHtml += '</div >'
                    }
                });




                detallevalida += '{';
                $.each(rowgral.CamposDetalle, function (regdet, rowdet) {
                    if (rowdet.visible == true) {

                        detallevalida += '"' + rowdet.nombreCampo + '":'

                        if (rowdet.Visualisacion == "checkbox") {
                            detallevalida += '{ "validators" : {';
                            detallevalida += '"choice": {';
                            detallevalida += '"min": 1,';
                            detallevalida += '"message" : "Please choose 1 - 2 languages you can speak"'
                            detallevalida += '}';
                        } else {

                            detallevalida += '{"group": ".col-md-3","validators": {';
                            detallevalida += '"stringLength": { "max" :' + rowdet.logitudCampo + ',';
                            detallevalida += '"message" : "Caracteres maximos ' + rowdet.logitudCampo + '"}';

                            if (rowdet.obligatorio == "required") {



                                detallevalida += ',';
                                detallevalida += '"notEmpty": {"message": "El campo ' + rowdet.descripcionCampo + ' es obligatorio"}';


                            }
                        }
                        detallevalida += '}},';
                    }
                });






                detallevalida = detallevalida.substring(0, detallevalida.length - 1);
                detallevalida += '}';




            }



            //formHtml += '</div>'
            formHtml += '</div>'
            formHtml += '</fieldset>'

            //<div class="form-actions">
            // <div class="row">
            //  <div class="col-md-12">
            //   <button class="btn btn-primary" type="submit">
            //    <i class="fa fa-disk"></i>
            //    Agregar
            //   </button>
            //  </div>
            // </div>
            //</div>

            formHtml += '</form>'
            formHtml += '<table id="dtDetalle" class="table table-striped table-bordered table-hover DTTT_selectable" cellspacing="0" width="100%" ondrop="drop(event)" cellspacing="0" width="90%">'
            formHtml += '<thead>'
            formHtml += '<tr>'
            var conc = 0;
            $.each(rowgral.CamposDetalle, function (regtable, rowtable) {
                if (conc == 0) {
                    formHtml += '<th>' + rowtable.descripcionCampo + '</th>';

                } else if (conc == 1) {
                    formHtml += '<th>' + rowtable.descripcionCampo + '</th>';
                } else if (conc <= 5) {
                    formHtml += '<th>' + rowtable.descripcionCampo + '</th>';

                } else {
                    formHtml += '<th>' + rowtable.descripcionCampo + '</th>';

                }

                conc++;

            });

            namesDetalle = [];
            $.each(rowgral.CamposDetalle, function (i1, value) {
                if (value.visible == true) {
                    namesDetalle.push(value.nombreCampo);
                }

            });

            formHtml += '</tr>'
            formHtml += '</thead>'
            formHtml += '</table>'

            formHtml += '<div class="form-actions">'
            formHtml += '<div class="row">'
            formHtml += '<div class="col-md-12">'
            formHtml += '<button id="addDetalle" onclick="GuardarRegitrosBND()" class="btn btn-primary btn-sm"><i class="fa fa-floppy-o"></i> Agregar</button>';
            formHtml += '</div>'
            formHtml += '</div>'
            formHtml += '</div>'

            formHtml += '</div><br />'

            formHtml += '</div> '
            formHtml += '</article> '
            formHtml += '</section>'

            formHtml += '</div>'

        }


        $("#form2").html(formHtml);
        
        $.each(objetoFormula, function (rm1, rgm1) {
            excuteformulaBND(rgm1.IdCampo, rgm1.Json);
        });
        $.each(objeto, function (rowcom, regcom) {
            addEventChangeBND(regcom.IdCampo, regcom.Json);

        })



        if (rowgral.CamposDetalle.length != 0) {

            $('#formdetalle').bootstrapValidator('destroy');

            bostrapvaliBND();
            $('#formdetalle')[0].reset();

        }

        loadDataTableBND();


    });
    bostrapvaliBND();
}
function GeneraComposBND(Visualisacion, idCampo, nombreCampo, descripcionCampo, logitudCampo, obligatorio, editable, TransaccionReferencia, idRef, nomRef, CadenaComplementos) {

    
    
    var Campo = "";
    if (Visualisacion == 'number') {


        Campo += '<div class="col-md-3 form-group">';
        Campo += '<label class="control-label">'
        if (obligatorio == 'required') {
            Campo += '* '
        }
        Campo += descripcionCampo + '</label>';
        Campo += '<input '
        if (editable != true) {
            Campo += 'readonly '
        }
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarN(event,' + nombreCampo + ',' + logitudCampo + ')" class="form-control" name= "' + nombreCampo + '" min="0" maxlength="' + logitudCampo + '" />';
        Campo += '</div>';


    }
    if (Visualisacion == 'text') {


        Campo += '<div class="col-md-3 form-group ' + nombreCampo+'">';
        Campo += '<label class="control-label">'
        if (obligatorio == 'required') {
            Campo += '* '
        }
        Campo += descripcionCampo + '</label>';
        Campo += '<input '
        if (editable != true) {
            Campo += 'readonly '
        }
        Campo += 'type = "text" id= "' + nombreCampo + '" onkeypress= "return validarNLS(event)" class="form-control" name= "' + nombreCampo + '" maxlength="' + logitudCampo + '"/>';
        Campo += '</div>';

    }
    if (Visualisacion == 'combobox') {
        Campo += GenerarComboBND(idCampo, nombreCampo, descripcionCampo, TransaccionReferencia, idRef, nomRef, CadenaComplementos);

    }
    if (Visualisacion == 'checkbox') {
        Campo += '<div class="col-md-3 form-group">';
        Campo += '<label class="control-label">'
        if (obligatorio == 'required') {
            Campo += '* '
        }
        Campo += descripcionCampo + '</label>';
        Campo += '<input '
        if (editable != true) {
            Campo += 'readonly '
        }
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLS(event)" class="form-control" name= "' + nombreCampo + '" />';
        Campo += '</div>';
    }
    if (Visualisacion == "switch") {
        Campo += "<section class='col col-3 form-group'>";
        Campo += '<label class="toggle state-error">'
        Campo += '<input '
        if (editable != true) {
            Campo += 'disabled '
        }
        Campo += ' type = "radio" name= "' + nombreCampo + '" > <i data-swchon-text="ON" data-swchoff-text="OFF"></i>' + descripcionCampo + '</label > ';
        Campo += "</section>";
    }
    if (Visualisacion == 'radio') {
        Campo += '<div class="col-md-3">';
        Campo += '<label class="radio radio-inline no-margin">' + descripcionCampo + '</label>';
        Campo += '<input '
        if (editable != true) {
            Campo += 'readonly '
        }
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLS(event)" class="form-control" name= "' + nombreCampo + '" />';
        Campo += '</div>';
    }
    if (Visualisacion == 'date') {

        Campo += '<div class="col-md-3 form-group">';
        Campo += '<label class="control-label">'
        if (obligatorio != true) {
            Campo += '* '
        }
        Campo += descripcionCampo + '</label>';

        Campo += '<input '
        if (editable != true) {
            Campo += 'readonly '
        }
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLS(event)" class="form-control" name= "' + nombreCampo + '" />';
        Campo += '</div>';


    }
    if (Visualisacion == 'datetime-local') {
        Campo += '<div class="col-md-3 form-group">';
        Campo += '<label class="control-label">'
        if (obligatorio == 'required') {
            Campo += '* '
        }
        Campo += descripcionCampo + '</label>';
        Campo += '<input '
        if (editable != true) {
            Campo += 'readonly '
        }
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLS(event)" class="form-control" name= "' + nombreCampo + '" />';
        Campo += '</div>';
    }
    if (Visualisacion == 'email') {
        Campo += '<div class="col-md-3 form-group">';
        Campo += '<label class="control-label">'
        if (obligatorio == 'required') {
            Campo += '* '
        }
        Campo += descripcionCampo + '</label>';
        Campo += '<input '
        if (editable != true) {
            Campo += 'readonly '
        }
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLS(event)" class="form-control" name= "' + nombreCampo + '" />';
        Campo += '</div>';
    }
    if (Visualisacion == 'password') {
        Campo += '<div class="col-md-3 form-group">';
        Campo += '<label class="control-label">'
        if (obligatorio == 'required') {
            Campo += '* '
        }
        Campo += descripcionCampo + '</label>';
        Campo += '<input '
        if (editable != true) {
            Campo += 'readonly '
        }
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLS(event)" class="form-control" name= "' + nombreCampo + '" />';
        Campo += '</div>';
    }
    if (Visualisacion == 'color') {
        Campo += '<div class="col-md-3 form-group">';
        Campo += '<label class="control-label">'
        if (obligatorio == 'required') {
            Campo += '* '
        }
        Campo += descripcionCampo + '</label>';
        Campo += '<input '
        if (editable != true) {
            Campo += 'readonly '
        }
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLS(event)" class="form-control" name= "' + nombreCampo + '" />';
        Campo += '</div>';
    }
    if (Visualisacion == 'tel') {
        Campo += '<div class="col-md-3 form-group">';
        Campo += '<label class="control-label">'
        if (obligatorio == 'required') {
            Campo += '* '
        }
        Campo += descripcionCampo + '</label>';
        Campo += '<input '
        if (editable != true) {
            Campo += 'readonly '
        }
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLS(event)" class="form-control" name= "' + nombreCampo + '" maxlength="10"/>';
        Campo += '</div>';
    }
    if (Visualisacion == 'url') {
        Campo += '<div class="col-md-3 form-group">';
        Campo += '<label class="control-label">'
        if (obligatorio == 'required') {
            Campo += '* '
        }
        Campo += descripcionCampo + '</label>';
        Campo += '<input '
        if (editable != true) {
            Campo += 'readonly '
        }
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLS(event)" class="form-control" name= "' + nombreCampo + '" />';
        Campo += '</div>';
    }
    if (Visualisacion == 'range') {
        Campo += '<div class="col-md-3">';
        Campo += '<label class="control-label">'
        if (obligatorio == 'required') {
            Campo += '* '
        }
        Campo += descripcionCampo + '</label>';
        Campo += '<input '
        if (editable != true) {
            Campo += 'readonly '
        }
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLS(event)" class="form-control" name= "' + nombreCampo + '" min="-' + logitudCampo + '" max="' + logitudCampo + '"/>';
        Campo += '</div>';
    }
    if (Visualisacion == 'week') {
        Campo += "<section class='col col-3'>";
        Campo += "<label class='label'>" + descripcionCampo + "</label>";
        Campo += "<label class='input'>";
        Campo += "<input "
        if (editable != true) {
            Campo += 'readonly '
        }
        Campo += "type = " + Visualisacion + "  id= " + idCampo + "  class='input-sm' name= " + nombreCampo + "  required= " + obligatorio + " > ";
        Campo += "</label>";
        Campo += "</section>";
    }
    if (Visualisacion == 'file') {
        Campo += "<section class='col col-3'>";
        Campo += "<label class='label'>" + descripcionCampo + "</label>";
        Campo += "<label class='input'>";
        Campo += "<input "
        if (editable != true) {
            Campo += 'readonly '
        }
        Campo += "type = " + Visualisacion + "  id= " + idCampo + "  class='input-sm' name= " + nombreCampo + "  required= " + obligatorio + " > ";
        Campo += "</label>";
        Campo += "</section>";
    }
    if (Visualisacion == 'autonumerico') {



        var value = autoincrementBND(idTran, nombreCampo);
        Campo += '<div class="col-md-3 form-group">';
        Campo += '<label class="control-label">' + descripcionCampo + '</label>';
        Campo += '<input '



        if (editable != true) {
            Campo += 'readonly '
        }
        Campo += 'type = "text" id= "' + nombreCampo + '" onkeypress= "return validarN(event)" class="form-control" name= "' + nombreCampo + '" value="' + value + '" />';
        Campo += '</div>';

        //console.log(Campo);


    }

    return Campo;
}
function GenerarComboBND(idcampo, nomcampo, desccampo, idreferencia, idRef, nomRef, CadenaComplementos) {

    parametroE = idreferencia;
    var TextoCom = "";
    $.ajax({
        async: false,
        type: "POST",
        url: 'MyWebService.asmx/CrearCombo',
        data: JSON.stringify({
            idTransaccion: idreferencia,
            idRef: idRef,
            nomRef: nomRef
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (output) {



            TextoCom += '<div class="col-md-3 selectContainer form-group">'
            TextoCom += '<label class="control-label">' + desccampo + '</label>'
            TextoCom += '<select id="' + nomcampo + '" class="form-control" name="' + nomcampo + '">'



            $.each(output, function (j, cam) {


                objeto.push({
                    IdCampo: nomcampo,
                    Json: jQuery.parseJSON(CadenaComplementos)
                });


                TextoCom += '<option value="">Selecciona..</option>';
                $.each(cam.CamposCat, function (j1, cam1) {


                    TextoCom += '<option value="' + cam1.id + '">' + cam1.Nombre + '</option>';

                });


            });

            TextoCom += '</select>'
            TextoCom += '</div>'
        },
        error: function (e) {
            console.log("error");


        }


    });

    return TextoCom;
};
function bostrapvaliBND() {

    if (Valicabecera != "") {

        $('#formCabecera').bootstrapValidator({
            live: 'enabled',
            //submitButtons: 'button[id="save"]',
            message: 'Valor invalido',
            feedbackIcons: {

            },
            fields: jQuery.parseJSON(Valicabecera)

        });
    }

    //console.log(detallevalida);

    if (detallevalida != "") {

        $('#form2').bootstrapValidator({
            live: 'enabled',
            //submitButtons: 'button[id="addDetalle"]',
            message: 'Valor invalido',
            feedbackIcons: {
                //valid: 'glyphicon glyphicon-ok',
                //invalid: 'glyphicon glyphicon-remove',
                //validating: 'glyphicon glyphicon-refresh'
            },
            fields: jQuery.parseJSON(detallevalida)

        });
    }
}
function excuteformulaBND(IdCampo, Json) {

    console.log("formula excute: " + Json);

    $('#' + IdCampo).on('keyup', function () {
        console.log("Campo Activador  " + "#" + IdCampo);
        formula = '';
        jsonFormula = '';
        var arreglo = [];


        jsonFormula = jQuery.parseJSON(Json)




        $.each(jsonFormula, function (j12, cam12) {



            $.each(cam12.Formulas, function (j13, cam13) {


                formula = cam13.Formula;


                console.log("Formulas : " + formula);
                formulas = [];
                formulas = formula.split("|");
                var union = '';


                variable = '';
                var final = 0.0;
                var subVariable;
                arreglo = arregloC.concat(arregloD);

                console.log(arreglo);

                for (var i = 1; i < formulas.length; i++) {
                    for (var j = 1; j < arreglo.length; j++) {
                        if (arreglo[j] === formulas[i]) {


                            variable += $("#" + arreglo[j]).val() + ',';
                        }

                    }


                }

                var datos = variable.split(",");

                var ban = 0;
                var con = 0;
                var res = '';


                for (var i = 0; i < formulas.length; i++) {




                    if (formulas[i] != '/' && formulas[i] != '*' && formulas[i] != '-' && formulas[i] != '+' && formulas[i] != '(' && formulas[i] != ')' && formulas[i] != '.' && isNaN(formulas[i]) && ban > 0) {
                        union += '' + datos[con];
                        res += datos[con];

                        con++;


                    } else if (ban > 0) {
                        union += '' + formulas[i];
                        res += formulas[i];

                    }

                    if (formulas[i] == '=' && ban == 0) {
                        ban++;
                        union += formulas[i];
                    } else if (ban == 0) {
                        union += formulas[i];
                    }

                }


                if ($('#' + IdCampo).val() == '') {
                    $("#" + formulas[0]).val('');
                } else {
                    $("#" + formulas[0]).val(eval(res));
                    $('#formdetalle').bootstrapValidator('destroy');
                    bostrapvaliBND();
                    $('#formdetalle').data('bootstrapValidator').validate();

                }


                //console.log("Union: " + union);

            });

        });

    }).keyup();

}
function autoincrementBND(idTipoTransaccion, CAuto) {

    var regreso = 0;
    $.ajax({
        async: false,
        type: "POST",
        url: 'MyWebService.asmx/autoincrementWS',
        data: JSON.stringify({
            idTipoTransaccion: idTipoTransaccion,
            CAuto: CAuto
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (output) {



            $.each(output, function (j, cam) {


                regreso = cam;


            });


        },
        error: function (e) {
            console.log("error");


        }

    });
    return regreso

}
function matchStart(params, data) {
    // If there are no search terms, return all of the data
    if ($.trim(params.term) === '') {
        return data;
    }

    // Skip if there is no 'children' property
    if (typeof data.children === 'undefined') {
        return null;
    }

    // `data.children` contains the actual options that we are matching against
    var filteredChildren = [];
    $.each(data.children, function (idx, child) {
        if (child.text.toUpperCase().indexOf(params.term.toUpperCase()) == 0) {
            filteredChildren.push(child);
        }
    });

    // If we matched any of the timezone group's children, then set the matched children on the group
    // and return the group object
    if (filteredChildren.length) {
        var modifiedData = $.extend({}, data, true);
        modifiedData.children = filteredChildren;

        // You can return modified objects from here
        // This includes matching the `children` how you want in nested data sets
        return modifiedData;
    }

    // Return `null` if the term should not be displayed
    return null;
}
function GuardarRegitrosBND() {
    var tablaNReg = 0;
    var Datos = "";
    //console.log("///////////// " + parametroE +" ///////////");
    //var ArregloCab = $("#formCabecera").serializeArray();
    var ArregloCab = $("#form2").serializeArray();

   // console.log(Ardedereglo);

    $('#formCabecera').data('bootstrapValidator').validate();
    var n = $('#formCabecera').data('bootstrapValidator').isValid();
    console.log("el valor de n: " + n);
    if (n) {

        Datos += '{';
        Datos += '"informacionTransaccion": [{'
        Datos += '"idTransaccion": "' + parametroE +' ",';
        Datos += '"idTipoTransaccion": ' + idTran + ',';
        Datos += '"idEtapa": ' + idEtapa + ',';
        Datos += '"idAccion": ' + idAccion + ',';
        Datos += '"nombreTransaccion": "' + Transaccion + '",';
        Datos += '"categoriaTransaccion": "' + CatTransaccion + '"';
        Datos += '}]'

        //Crear nodo Cabecera
        Datos += ',"Cabecera":';
        if (ArregloCab.length != 0) {

            Datos += "[";
            Datos += '{';
            $.each(ArregloCab, function (i, fd) {
                var elements = document.getElementsByName('' + fd.name + '');
                var id = elements[0].getAttribute('id');

                if (fd.name != "dtDetalle_length") {
                    
                    Datos += '"' + fd.name + '":"' + fd.value + '",';
                }
            });
            Datos = Datos.substring(0, Datos.length - 1);
            Datos += '}';


            Datos += "]";
        } else {
            Datos += "[],";
        }
        //Crear nodo Detalle
        console.log("valores en tabla: " + namesDetalle.length);
        Datos += ',"Detalle":[';
        if (namesDetalle.length != 0) {

            var table = $('#dtDetalle').DataTable();
            tablaNReg = table.data().length;
            if (table.data().length != 0) {

                for (var i = 0; i < (table.data().length); i++) {
                    
                    Datos += '{';
                    $.each(namesDetalle, function (j, fd) {
                        Datos += '"' + namesDetalle[j] + '":' + '"' + table.row(i).data()[j] + '",';
                    });
                    Datos = Datos.substring(0, Datos.length - 1);
                    Datos += '},';
                }
                Datos = Datos.substring(0, Datos.length - 1);

            } else {
                $.smallBox({
                    title: "Error!",
                    content: "<i>Debes agregar un detalle</i>",
                    color: "#c79121",
                    timeout: 4000,
                    icon: "fa fa-info-circle swing animated"
                });
            }
            Datos += "]";
        } else {
            Datos += "]";
        }
        Datos += '}';


    } else {
        bostrapvaliBND();

        $.smallBox({
            title: "Error!",
            content: "<i>Debes llenar los campos obligatorios</i>",
            color: "#c79121",
            timeout: 4000,
            icon: "fa fa-info-circle swing animated"
        });
    }

    console.log(Datos);

    //console.log("n: " + n + " namesdetalle: " + namesDetalle.length + " tablaNReg: " + tablaNReg);
    if (n != false && namesDetalle.length != 0 && tablaNReg != 0) {
        console.log("primermetodo");
        $.ajax({
            type: 'POST',
            url: 'MyWebService.asmx/InsertarTransaccion',
            data: JSON.stringify({
                json: Datos,
                idTransaccion: parametroE,
                Categoria: CatTransaccion,
                idEtapa: idEtapa,
                idAccion: idAccion
            }),
            contentType: 'application/json; utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.d != null) {

                    switch (data.d) {

                        case true:
                            $.smallBox({
                                title: "Éxito!",
                                content: "Registro insertado correctamente",
                                color: "#739e73",
                                timeout: 2000,
                                icon: "fa fa-thumbs-up swing animated"
                            });
                            $('#formCabecera')[0].reset();
                            $('#formCabecera').bootstrapValidator('destroy');
                            $.ajax({
                                async: false,
                                type: 'POST',
                                url: 'MyWebService.asmx/ArmaFormulario',
                                data: JSON.stringify({
                                    idtransa: idtransacccion
                                }),
                                dataType: 'json',
                                contentType: 'application/json; charset=utf-8',
                                success: function (respuesta) {

                                    GeneraFormularioBND(respuesta);
                                }
                            });
                            break;
                        case false:
                            $.smallBox({
                                title: "Error!",
                                content: "<i>Error al insertar</i>",
                                color: "#C46A69",
                                timeout: 3000,
                                icon: "fa fa-warning shake animated"
                            });
                            break;

                    }


                }
            },
            error: function (jqXHR, textStatus, errorThrown) { }

        });
    }

    if (n == true && namesDetalle.length == 0 && tablaNReg == 0) {

        console.log("segundometodo");
        $.ajax({
            type: 'POST',
            url: 'MyWebService.asmx/InsertarTransaccion',
            data: JSON.stringify({
                json: Datos,
                idTransaccion: parametroE,
                Categoria: CatTransaccion,
                idEtapa: idEtapa,
                idAccion: idAccion
            }),
            contentType: 'application/json; utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.d != null) {

                    switch (data.d) {

                        case true:
                            $.smallBox({
                                title: "Éxito!",
                                content: "Registro insertado correctamente",
                                color: "#739e73",
                                timeout: 2000,
                                icon: "fa fa-thumbs-up swing animated"
                            });
                            $('#formCabecera')[0].reset();
                            $('#form2').bootstrapValidator('destroy');
                            $.ajax({
                                async: false,
                                type: 'POST',
                                url: 'MyWebService.asmx/ArmaFormulario',
                                data: JSON.stringify({
                                    idtransa: idtransacccion
                                }),
                                dataType: 'json',
                                contentType: 'application/json; charset=utf-8',
                                success: function (respuesta) {

                                    GeneraFormularioBND(respuesta);
                                }
                            });
                            break;
                        case false:
                            $.smallBox({
                                title: "Error!",
                                content: "<i>Error al insertar</i>",
                                color: "#C46A69",
                                timeout: 3000,
                                icon: "fa fa-warning shake animated"
                            });
                            break;

                    }


                }
            },
            error: function (jqXHR, textStatus, errorThrown) { }

        });
    }
    else {

        //$.smallBox({
        //    title: "Error!",
        //    content: "<i>Error al completar el formulario</i>",
        //    color: "#C46A69",
        //    timeout: 3000,
        //    icon: "fa fa-warning shake animated"
        //});
    }



}
//recupera valores del formulario para generar json
function addEventChangeBND(idCampo, jsonComple) {



    $('#' + idCampo).change(function (e) {



        var Valor = $('#' + idCampo).val()

        if (jsonComple != null) {



            $.each(jsonComple.Hijo, function (rowJcom, regHijo) {



                //$.each(regJcom, function(rowHijo, regHijo) {

                //console.log(regHijo);
                if (regHijo != null) {

                    if (regHijo.Types == "Text") {

                        //console.log("rowHijo:" + rowHijo + "regHijo: " + regHijo);

                        if (regHijo.idTransaccion != 0 && regHijo.primarykey != 0) {

                            $('#' + regHijo.idCampo).val(recuvalorBND(regHijo.idTransaccion, regHijo.primarykey, Valor, regHijo.idRef, regHijo.CampoRef));
                            //bostrapvaliBND();
                            //$('#formCabecera').data('bootstrapValidator').validate();
                            //$('#formdetalle').data('bootstrapValidator').validate();
                        }
                    }

                    if (regHijo.Types == "combobox") {


                        console.log("Mario");

                    }

                    $('#formCabecera').bootstrapValidator('destroy');
                    bostrapvaliBND();
                    $('#formCabecera').data('bootstrapValidator').validate();

                    $('#formdetalle').bootstrapValidator('destroy');
                    bostrapvaliBND();
                    $('#formdetalle').data('bootstrapValidator').validate();


                }


                //})

            })



        }



    });
};
function recuvalorBND(idTransaccion, primarykey, Valor, IdRef, CampRef) {
    console.log("--------------" + " idTransaccion: " + idTransaccion + " primarykey: " + primarykey + " Valor: " + Valor);

    var varcomplemento = "";

    $.ajax({
        async: false,
        type: "POST",
        url: 'MyWebService.asmx/CamposComplemento',
        data: JSON.stringify({
            idTransaccion: idTransaccion,
            primarykey: primarykey,
            Valor: Valor,
            IdRef: IdRef,
            CampRef: CampRef
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (output) {

            $.each(output, function (rowValor, regValor) {

                console.log("------------------" + regValor.Valor);

                varcomplemento = regValor.Valor;



            })

        },
        error: function (e) {
            console.log("error");
        }
    });

    return varcomplemento;

}
//Funcuiones datatable
function addDetallesBND() {

    //console.log("Entra agregar");
    //bostrapvaliBND();

    $('#form2').data('bootstrapValidator').isValid();

    var n = $('#form2').data('bootstrapValidator').isValid();
    var val = [];
    if (n) {
        
        var valores = [];
        
        $("#dtDetalle tr").find('td:eq(0)').each(function () {
            valores.push($(this).text());
        })
        

       
       
        var arr = $("#formdetalle").serializeArray();
        var valor = 0;
        var nom = "";

        datoss3 = [];
        $.each(arr, function (i, fd) {
            if (fd.name == "Idrows"){
                datoss3.push({
                    nombre: fd.name,
                    IdCampo: fd.value
                    //Json: jQuery.parseJSON(CadenaComplementos)
                });
            }
        })

        $.each(datoss3, function (i, fd) {
            valor=fd.IdCampo;
        })

        

        if (valores == "Ningún dato disponible en esta tabla") {
            datoss = [];
            $.each(arr, function (i, fd) {
                datoss.push(fd.value);
            })
            initDataTableBND();

           //$('#form2').bootstrapValidator('destroy');
            $('#formdetalle')[0].reset();
            bostrapvaliBND();
        }
        else if (valores.includes(valor) != true && valores != "Ningún dato disponible en esta tabla")
        {

            datoss = [];
            $.each(arr, function (i, fd) {
                datoss.push(fd.value);
            })
            initDataTableBND();

            //$('#formdetalle').bootstrapValidator('destroy');

            $('#formdetalle')[0].reset();

            bostrapvaliBND();

        } else if (valores.includes(valor) == true && valores != "Ningún dato disponible en esta tabla"){

            console.log("Entro al else");

            $.smallBox({
                title: "Error!",
                content: "<i>el valor " + valor +" ya se encuentra registrado </i>",
                color: "#C46A69",
                timeout: 3000,
                icon: "fa fa-warning shake animated"
            });
        }

        


    } else {

        $.smallBox({
            title: "Error!",
            content: "<i>Debes llenar el formulario</i>",
            color: "#C46A69",
            timeout: 3000,
            icon: "fa fa-warning shake animated"
        });
    }




    var valores = [];
    var row = $('#tablaEtapas').DataTable().row('.selected').data();
    $("#tablaEtapas tr").find('td:eq(0)').each(function () {
        valores.push($(this).text());
    })
    if (valores.includes($('input#nombreEtapaD').val()) && $('input#nombreEtapaD').val() != row[0]) {
        $.smallBox({
            title: "Error",
            content: "<i class='fa fa-clock-o'></i> <i>El nombre de la etapa ya existe</i>",
            color: "#C46A69",
            iconSmall: "fa fa-times fa-2x fadeInRight animated",
            timeout: 2000
        });

        $('input#nombreEtapaD').css({
            'background-color': '#C46A69'
        });
        $('#dialog2').bootstrapValidator('destroy');

        mouse();
    }

    

    //jQuery.validator.messages.required = 'Esta campo es obligatorio.';
    //jQuery.validator.messages.number = 'Esta campo debe ser num&eacute;rico.';
    //var validado = $("#formdetalle").valid();
    //console.log("VALIDACION" + validado);
    //if (validado) {
    //var arr = $("#formdetalle").serializeArray();
    //var datos = [];
    //$.each(arr, function (i, fd) {
    //    datos.push(fd.value);
    //});
    //var t = $('#dtDetalle').DataTable();
    //t.row.add(datos).draw(false);
    //}

};
function loadDataTableBND() {
    $.fn.dataTable.ext.errMode = 'none';
    var responsiveHelper_datatable_fixed_column = undefined;
    var breakpointDefinition = {
        tablet: 1024,
        phone: 480,
        desktop: 1260
    };
    var table = $('#dtDetalle').DataTable({
        "scrollX": true,
        "serverSide": false,
        'processing': false,
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
                    $('#dtDetalle'), breakpointDefinition);
            }
        },
        "rowCallback": function (nRow) {
            responsiveHelper_datatable_fixed_column
                .createExpandIcon(nRow);
        },
        "drawCallback": function (oSettings) {
            responsiveHelper_datatable_fixed_column.respond();
        }
    });


    $('#dtDetalle tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
};
function editRowwBND() {
    var x = $('#dtDetalle').DataTable().row('.selected').data();
    alert("row : " + x);
};
function deleteRowwBND() {
    var table = $('#dtDetalle').DataTable();



    var row = $('#dtDetalle').DataTable().row('.selected').data();
    if (row) {
        $
            .SmartMessageBox({
                title: "¿Desea <font color='#ff9100'><b>remover</b></font> la fila seleccionada</b>?",
                buttons: '[No][Si]'
            },
            function (ButtonPressed) {
                if (ButtonPressed === "Si") {
                    table.row('.selected').remove().draw(false);
                }
            });
    } else {

        $.smallBox({
            title: "Información",
            content: "<i>Debe seleccionar por lo menos un elemento</i>",
            color: "#c79121",
            timeout: 4000,
            icon: "fa fa-info-circle swing animated"
        });
    }




};

//Funciones validar
function validarN(e, id, longg) {
    //console.log("maxLength");


    $("#" + id.getAttribute("id")).attr('maxLength', longg).keypress(limitMe);

    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[0-9\s\t\.]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function limitMe(e) {
    if (e.keyCode == 8) { return true; }
    return this.value.length < $(this).attr("maxLength");
}
function validarLetra(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[A-Za-záÁéÉíÍóÓúÚñÑ\s\t]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function validarLetra2(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[0-9A-Za-záÁéÉíÍóÓúÚñÑ\s\t]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function validarNL(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[A-Za-záÁéÉíÍóÓúÚñÑ\s\-\_\.\&\t\S]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function validarRFC(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[0-9A-Za-z\t\&]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function validarNLug(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[0-9A-Za-zñÑ\s\t]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function validarNLS(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[0-9A-Za-záÁéÉíÍóÓúÚñÑ\s\t]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function validarTodo(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[0-9A-Za-záÁéÉíÍóÓúÚñÑ\s\-\.\t\!\"\$\%\&\/\(\)\=\'\¿\?\¡]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function sinEspacios() {
    $('body').on('keydown', function (e) {
        if (e.which === 32 && e.target.selectionStart === 0) {
            return false;
        }
    });
}
function initDataTableBND() {
    $.fn.dataTable.ext.errMode = 'none';
    var responsiveHelper_datatable_fixed_column = undefined;
    var breakpointDefinition = {
        "tablet": 1024,
        "phone": 480,
        "desktop": 1260
    };

    var otable = $('#dtDetalle').DataTable({
        "scrollX": true,
        "serverSide": false,
        'processing': false,
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
                    $('#dtDetalle'), breakpointDefinition);
            }
        },
        "rowCallback": function (nRow) {
            responsiveHelper_datatable_fixed_column
                .createExpandIcon(nRow);
        },
        "drawCallback": function (oSettings) {
            responsiveHelper_datatable_fixed_column.respond();
        }
    });



    console.log("Datos:" + datoss);
    otable.row.add(datoss).draw(false);
}




