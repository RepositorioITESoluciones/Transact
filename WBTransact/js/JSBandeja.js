var array = [];
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
var Detransacciones=[]
var validacionxaccion = [];
var parametroE = "";
var etapaActual = "";
var idTrann = 0;
var EtapaFutura = 0;
var g0 = 0;
var g1 = 0;

var var1 = 0;
var var2 = '';

$(function () {
    var idTran = 0;
    $("#ContenedorP").hide()
    $("#DetalleP").hide()
    
    $("#detalleReporte").hide()
    $("#menutipo").hide();
    $("#menutransact").hide();
    $("#catalogotransc").empty();
    ObtenerStatus();
    Propiedades();



});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

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
        //$("#wizard-1")[0].reset();
    });
}
function CrearTabla(id, descripcion) {
    var tablaPrincipal = "";
    $("#idStatus").empty();
    $("#idStatus").append(descripcion);

    $("#Titulo").empty();
    $("#Titulo").append(descripcion);

    $("#tablaTran").show();
    $("#WisardTran").hide();

    initDataTableTransacciones(id);
}


function ArmaFormularioxetapa(idTipoTransaccion, idtransaccion) {

    parametroE = idtransaccion;
    $.ajax({
        async: false,
        type: 'POST',
        url: 'MyWebService.asmx/ArmaFormularioxEtapa',
        data: JSON.stringify({ idTipoTransaccion: idTipoTransaccion, idtransaccion: idtransaccion }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (respuesta) {

            GeneraFormularioBND(respuesta, idTipoTransaccion);



        }
    });
}
function GeneraFormularioBND(xml_json, idTran) {
    var formHtml = "";
    Valicabecera = "";
    detallevalida = '';
    namesDetalle = [];
    objetoFormula = [];
    $.each(xml_json, function (reg, rowgral) {


        var resultado = rowgral.idEtapaFutura+"--"+rowgral.NombreDes;
        

        if (rowgral.CamposCabecera != "") {

            idTrann = rowgral.idTipoTrasaccion;

            //console.log("eeeeeeeeeeeeeeeeeeeeeeeeeee"+idTran);

            Transaccion = rowgral.descripcion;
            CatTransaccion = rowgral.categoriaTransac;
            idEtapa = rowgral.idEtapa;
            idAccion = rowgral.idAccion;


            if (rowgral.CamposCabecera.length > 0) {
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

            if (rowgral.CamposDetalle.length == 0 && rowgral.CamposCabecera.length > 0) {


                formHtml += '<div class="form-actions">'
                formHtml += '<div class="row">'
                formHtml += '<div class="col-md-12">'
                formHtml += '<button id="addDetalle" onclick="GuardarRegitrosBND(' + idTran + ')" class="btn btn-primary btn-sm"><i class="fa fa-floppy-o"></i> Agregar</button>';
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
                formHtml += '<button id="addDetalle" onclick="GuardarRegitrosBND(' + idTran + ')" class="btn btn-primary btn-sm"><i class="fa fa-floppy-o"></i> Agregar</button>';
                formHtml += '</div>'
                formHtml += '</div>'
                formHtml += '</div>'

                formHtml += '</div><br />'

                formHtml += '</div> '
                formHtml += '</article> '
                formHtml += '</section>'

                formHtml += '</div>'

            }


            $.each(objetoFormula, function (rm1, rgm1) {

                var1 = rgm1.IdCampo;
                var2 = rgm1.Json;


                excuteformulaBND(var1, var2);
            });
            $.each(objeto, function (rowcom, regcom) {
                //console.log(regcom.Json);
                addEventChangeBND(regcom.IdCampo, regcom.Json);

            })
            if (rowgral.CamposDetalle.length != 0) {

                $('#formdetalle').bootstrapValidator('destroy');

                bostrapvaliBND();
                //$('#formdetalle')[0].reset();

            }

            $("#step2").html(formHtml);
            bostrapvaliBND();
            loadDataTableBND();
        } else {

            var mensaje = '';
            if(resultado != "0--null"){

                
                mensaje += '<div class="alert alert-block alert-warning">'
                mensaje += '<a class="close" data-dismiss="alert" href="#">×</a>'
                mensaje += '<h4 class="alert-heading">Alerta!</h4>'
                mensaje += 'No se ha configurado una etapa con campos, notificar al administrador'
                mensaje += '</div>'

            } else {

                mensaje += '<div class="alert alert-success fade in">'
                mensaje += '<a class="close" data-dismiss="alert" href="#">×</a>'
                mensaje += '<h4 class="alert-heading">Finalizado</h4>'
                mensaje += 'La transacción se completo exitosamente'
                mensaje += '</div>'

                //<div class="alert alert-success fade in">
				//				<button class="close" data-dismiss="alert">
				//					×
				//				</button>
				//				<i class="fa-fw fa fa-check"></i>
				//				<strong>Success</strong> The page has been added.
				//			</div>
            }

            

			$("#step2").html(mensaje);

            //$.smallBox({
            //    title: "Error!",
            //    content: "<i>La transacción presenta errores o esta mal configurada</i>",
            //    color: "#c79121",
            //    timeout: 4000,
            //    icon: "fa fa-info-circle swing animated"
            //});



        }

    });

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
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNBND(event,' + nombreCampo + ',' + logitudCampo + ')" class="form-control" name= "' + nombreCampo + '" min="0" maxlength="' + logitudCampo + '" />';
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
        Campo += 'type = "text" id= "' + nombreCampo + '" onkeypress= "return validarNLSBND(event)" class="form-control" name= "' + nombreCampo + '" maxlength="' + logitudCampo + '"/>';
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
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLSBND(event)" class="form-control" name= "' + nombreCampo + '" />';
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
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLSBND(event)" class="form-control" name= "' + nombreCampo + '" />';
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
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLSBND(event)" class="form-control" name= "' + nombreCampo + '" />';
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
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLSBND(event)" class="form-control" name= "' + nombreCampo + '" />';
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
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLSBND(event)" class="form-control" name= "' + nombreCampo + '" />';
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
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLSBND(event)" class="form-control" name= "' + nombreCampo + '" />';
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
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLSBND(event)" class="form-control" name= "' + nombreCampo + '" />';
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
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLSBND(event)" class="form-control" name= "' + nombreCampo + '" maxlength="10"/>';
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
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLSBND(event)" class="form-control" name= "' + nombreCampo + '" />';
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
        Campo += 'type = "' + Visualisacion + '" id= "' + nombreCampo + '" onkeypress= "return validarNLSBND(event)" class="form-control" name= "' + nombreCampo + '" min="-' + logitudCampo + '" max="' + logitudCampo + '"/>';
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



        var value = autoincrementBND(idTrann, nombreCampo);
        Campo += '<div class="col-md-3 form-group">';
        Campo += '<label class="control-label">' + descripcionCampo + '</label>';
        Campo += '<input '



        if (editable != true) {
            Campo += 'readonly '
        }
        Campo += 'type = "text" id= "' + nombreCampo + '" onkeypress= "return validarNBND(event)" class="form-control" name= "' + nombreCampo + '" value="' + value + '" />';
        Campo += '</div>';

        //console.log(Campo);


    }

    return Campo;
}
function GenerarComboBND(idcampo, nomcampo, desccampo, idreferencia, idRef, nomRef, CadenaComplementos) {

    
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
    console.log(Valicabecera);
    console.log(detallevalida);

    if (Valicabecera != "") {

        $('#formCabecera').bootstrapValidator({
            live: 'enabled',
            submitButtons: 'button[id="save"]',
            message: 'Valor invalido',
            feedbackIcons: {

            },
            fields: jQuery.parseJSON(Valicabecera)

        });
    }
    if (detallevalida != "") {

        $('#formdetalle').bootstrapValidator({
            live: 'enabled',
            submitButtons: 'button[id="addDetalle"]',
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
function GuardarRegitrosBND(idTran) {
    var tablaNReg = 0;
    var Datos = "";
    var ArregloCab = $("#formCabecera").serializeArray();

    $('#formCabecera').data('bootstrapValidator').validate();
    var n = $('#formCabecera').data('bootstrapValidator').isValid();
    console.log("el valor de n: " + n);
    if (n) {

        Datos += '{';
        Datos += '"informacionTransaccion": [{'
        Datos += '"idTransaccion": 0 ,';
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


                Datos += '"' + fd.name + '":"' + fd.value + '",';
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

            var table = $('#dtDetalle').DataTable()
            tablaNReg = table.data().length;
            if (table.data().length != 0) {
                var id = 0;
                for (var i = 0; i < (table.data().length) ; i++) {
                    id++;
                    Datos += '{ "idrow":' + "'" + id + "',";
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

    //console.log(Datos);

    //console.log("n: " + n + " namesdetalle: " + namesDetalle.length + " tablaNReg: " + tablaNReg);
    if (n != false && namesDetalle.length != 0 && tablaNReg != 0) {
        console.log("primermetodo");
        $.ajax({
            type: 'POST',
            url: 'MyWebService.asmx/InsertarTransaccionxEtapa',
            data: JSON.stringify({
                idFutura: EtapaFutura,
                json: Datos,
                idTransaccion: idTrann,
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
                            $('#formdetalle').bootstrapValidator('destroy');
                            $('#formdetalle')[0].reset();
                            bostrapvaliBND();
                            arregloC = [];
                            arregloD = [];
                            excuteformulaBND(var1, var2);
                            //$.ajax({
                            //    async: false,
                            //    type: 'POST',
                            //    url: 'MyWebService.asmx/ArmaFormulario',
                            //    data: JSON.stringify({
                            //        idtransa: idtransacccion
                            //    }),
                            //    dataType: 'json',
                            //    contentType: 'application/json; charset=utf-8',
                            //    success: function (respuesta) {

                            //        GeneraFormularioBND(respuesta);
                            //    }
                            //});

                            initDataTableTransacciones(id);

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
            url: 'MyWebService.asmx/InsertarTransaccionxEtapa',
            data: JSON.stringify({
                idFutura: EtapaFutura,
                json: Datos,
                idTransaccion: idTrann,
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
                            //$('#formdetalle').bootstrapValidator('destroy');
                            //$('#formdetalle')[0].reset();
                            bostrapvaliBND();
                            arregloC = [];
                            arregloD = [];
                            excuteformulaBND(var1, var2);
                            //$.ajax({
                            //    async: false,
                            //    type: 'POST',
                            //    url: 'MyWebService.asmx/ArmaFormulario',
                            //    data: JSON.stringify({
                            //        idtransa: idtransacccion
                            //    }),
                            //    dataType: 'json',
                            //    contentType: 'application/json; charset=utf-8',
                            //    success: function (respuesta) {

                            //        GeneraFormularioBND(respuesta);
                            //    }
                            //});
                            initDataTableTransacciones(id);

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
    //else {

    //    $.smallBox({
    //        title: "Error!",
    //        content: "<i>Error al completar el formulario</i>",
    //        color: "#C46A69",
    //        timeout: 3000,
    //        icon: "fa fa-warning shake animated"
    //    });
    //}



}
//recupera valores del formulario para generar json
function addEventChangeBND(idCampo, jsonComple) {

    //console.log("ddddddddd. "+idCampo);


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

    //console.log($("#formdetalle").serializeArray())

    $('#formdetalle').data('bootstrapValidator').isValid();

    var n = $('#formdetalle').data('bootstrapValidator').isValid();
    var val = [];
    if (n) {
        var arr = $("#formdetalle").serializeArray();
        datoss = [];
        $.each(arr, function (i, fd) {
            datoss.push(fd.value);


        })
        initDataTableBND();
        $('#formdetalle').bootstrapValidator('destroy');
        $('#formdetalle')[0].reset();
        bostrapvaliBND();


    } else {

        $.smallBox({
            title: "Error!",
            content: "<i>Debes llenar el formulario</i>",
            color: "#C46A69",
            timeout: 3000,
            icon: "fa fa-warning shake animated"
        });
    }

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
function validarNBND(e, id, longg) {
    //console.log("maxLength");


    $("#" + id.getAttribute("id")).attr('maxLength', longg).keypress(limitMeBND);

    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[0-9\s\t\.]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function limitMeBND(e) {
    if (e.keyCode == 8) { return true; }
    return this.value.length < $(this).attr("maxLength");
}
function validarLetraBND(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[A-Za-záÁéÉíÍóÓúÚñÑ\s\t]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function validarLetra2BND(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[0-9A-Za-záÁéÉíÍóÓúÚñÑ\s\t]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function validarNLBND(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[A-Za-záÁéÉíÍóÓúÚñÑ\s\-\_\.\&\t\S]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function validarRFCBND(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[0-9A-Za-z\t\&]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function validarNLugBND(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[0-9A-Za-zñÑ\s\t]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function validarNLSBND(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[0-9A-Za-záÁéÉíÍóÓúÚñÑ\s\t]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function validarTodoBND(e) {
    tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 8) return true;
    patron = /[0-9A-Za-záÁéÉíÍóÓúÚñÑ\s\-\.\t\!\"\$\%\&\/\(\)\=\'\¿\?\¡]/;
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
function sinEspaciosBND() {
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



    //console.log("Datos:" + datoss);
    otable.row.add(datoss).draw(false);
}
function initDataTableTransacciones(id) {
    //iniciarWizard();

    //console.log("estoy llenando la tabla");

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
        url: 'MyWebService.asmx/DetalleTransaccionesWS',
        data: JSON.stringify({ idEstatus: id }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $('#loadingMod').modal({
                backdrop: 'static',
                keyboard: false
            });
        },
        success: function (response) {
            //console.log(response);
            $('#loadingMod').modal('hide');
            $.each(response, function (row, index) {
                
                $.each(index.listaTranBitacora, function (r, arr) {



                    datos.push([
                        arr.idTipoTransaccion,
                        arr.idTransaccion,
                        arr.descripcion,
                        arr.fechaIniTransaccion,
                        arr.cveTipoTransaccion
                    ])

                    //datos.push([arr.idAlmacen, arr.descripcion, arr.idTipoAlmacen, arr.nombreTipoAlmacen, arr.idSucursal, arr.nombreSucursal]);
                });
            });
        }
    });


    //console.log(datos);
    otable = $('#example').DataTable({

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
                    $('#example'), breakpointDefinition);
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
            title: "IdTipoTran",
            visible: false
        },{
            title: "IdTran",
            //visible: false
        }, {
            title: "desc"
        }, {
            title: "fechaIni",
            //visible: false
        }, {
            title: "TipoTran"
        }]
    });

    // Evento creado para realizar la búsqueda cuando se presione la tecla ENTER
    $("#example thead th input[type=text]").on(
        'keyup',
        function (e) {
            otable.column($(this).parent().index() + ':visible').search(
                this.value).draw();
        });

    // Método creado para agregar el evento de selección de una fila
    $('#example tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            $('#example').DataTable().$('tr.selected').removeClass(
                'selected');
            $(this).addClass('selected');
        }
    });


    // Evento creado para abrir la ventana de editar al dar doble click sobre un
    // registro
    $('#example tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        //bootsVal();
        //editAlmacen();
        //edit = 1;
        var row = $("#example").DataTable().row('.selected').data();
        //var row = $("#example").select()

        //Optenerdetalle(row[0], row[1])

        g0 = row[0];
        g1 = row[1];

        initDataTableDetalle(row[0], row[1]) 
        initDataTableBitacora(row[0], row[1]) 
        ArmaFormularioxetapa(row[0], row[1])

       
        

        $("#ContenedorP").hide()
        $("#DetalleP").show()
        

    });


    $("#ContenedorP").show()
    $("#DetalleP").hide()


}
function initDataTableDetalle(idTipoTransaccion, idtransaccion) {

    //console.log("estoy llenando la tabla");

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
        url: 'MyWebService.asmx/detalleTBWS',
        data: JSON.stringify({ idtipo: idTipoTransaccion, idTransaccion: "'" + idtransaccion + "'" }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $('#loadingMod').modal({
                backdrop: 'static',
                keyboard: false
            });
        },
        success: function (response) {
            //console.log(response);
            $('#loadingMod').modal('hide');
            $.each(response, function (row, index) {

                console.log(index.lisCamposDetalleTB);

                $.each(index.lisCamposDetalleTB, function (r, arr) {
                    datos.push([
                        arr.folioTransaccion, 
                        arr.nombreTransaccion, 
                        arr.fechaIniTransaccion, 
                        arr.Rol, 
                        arr.EtapaAtual, 
                        arr.etapaSiguiente 
                    ])

                    idTrann = arr.folioTransaccion;
                    EtapaFutura = arr.idEtapaFut



                    //datos.push([arr.idAlmacen, arr.descripcion, arr.idTipoAlmacen, arr.nombreTipoAlmacen, arr.idSucursal, arr.nombreSucursal]);
                });
            });
        }
    });


    //console.log(datos);
    otable = $('#DTDetalletran').DataTable({

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
                    $('#DTDetalletran'), breakpointDefinition);
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
            title: "folioTransaccion",
        }, {
            title: "nombreTransaccion",
        }, {
            title: "fechaIniTransaccion"
        }, {
            title: "Responsable",
        }, {
            title: "EtapaAtual",
        }, {
            title: "etapaSiguiente"
        }]
    });

    // Evento creado para realizar la búsqueda cuando se presione la tecla ENTER
    $("#Detalletran thead th input[type=text]").on(
        'keyup',
        function (e) {
            otable.column($(this).parent().index() + ':visible').search(
                this.value).draw();
        });

    // Método creado para agregar el evento de selección de una fila
    $('#DTDetalletran tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            $('#Detalletran').DataTable().$('tr.selected').removeClass(
                'selected');
            $(this).addClass('selected');
        }
    });


    // Evento creado para abrir la ventana de editar al dar doble click sobre un
    // registro
    $('#DTDetalletran tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        //bootsVal();
        //editAlmacen();
        //edit = 1;
        //var row = $("#Detalletran").DataTable().row('.selected').data();
        ////var row = $("#example").select()

        //Optenerdetalle(row[0], row[1])



        //$("#tablaTran").hide();
        //$("#WisardTran").show();




    });


    //$("#widget-grid").show()



}
function initDataTableBitacora(idTipoTransaccion, idtransaccion) {

    //console.log("estoy llenando la tabla");

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
        url: 'MyWebService.asmx/DetalleBitacoraWS',
        data: JSON.stringify({ idTipoTransaccion: idTipoTransaccion, idtransaccion: idtransaccion }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $('#loadingMod').modal({
                backdrop: 'static',
                keyboard: false
            });
        },
        success: function (response) {
            //console.log(response);
            $('#loadingMod').modal('hide');
            $.each(response, function (row, index) {
                $.each(index.lista, function (r, arr) {
                    datos.push([
                        arr.idTransaccion,
                        arr.cveMovimiento,
                        arr.Etapa,
                        arr.Accion
                    ])

                    //datos.push([arr.idAlmacen, arr.descripcion, arr.idTipoAlmacen, arr.nombreTipoAlmacen, arr.idSucursal, arr.nombreSucursal]);
                });
            });
        }
    });


    //console.log(datos);
    otable = $('#DTBitacora').DataTable({

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
                    $('#DTBitacora'), breakpointDefinition);
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
            title: "idTransacción",
            //visible: false
        }, {
                title: "Movimiento",
            //visible: false
        }, {
            title: "Etapa"
        }, {
            title: "Acción",
            //visible: false
        }]
    });

    // Evento creado para realizar la búsqueda cuando se presione la tecla ENTER
    $("#example thead th input[type=text]").on(
        'keyup',
        function (e) {
            otable.column($(this).parent().index() + ':visible').search(
                this.value).draw();
        });

    // Método creado para agregar el evento de selección de una fila
    $('#DTBitacora tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            $('#example').DataTable().$('tr.selected').removeClass(
                'selected');
            $(this).addClass('selected');
        }
    });


    // Evento creado para abrir la ventana de editar al dar doble click sobre un
    // registro
    $('#DTBitacora tbody').on('dblclick', 'tr', function () {
        $(this).addClass('selected');
        //bootsVal();
        //editAlmacen();
        //edit = 1;
        //var row = $("#DTBitacora").DataTable().row('.selected').data();
        ////var row = $("#example").select()

        //Optenerdetalle(row[0], row[1])



        //$("#tablaTran").hide();
        //$("#WisardTran").show();




    });


    //$("#widget-grid").show()



}
function Propiedades() {
    pageSetUp();
    $('#bootstrap-wizard-1').bootstrapWizard({
            'tabClass': 'form-wizard',
            'onNext': function (tab, navigation, index) {
                $('#bootstrap-wizard-1').find('.form-wizard').children('li').eq(index - 1).addClass(
                      'complete');
                $('#bootstrap-wizard-1').find('.form-wizard').children('li').eq(index - 1).find('.step')
                    .html('<i class="fa fa-check"></i>');
            }
        });
    var wizard = $('.wizard').wizard();

    wizard.on('finished', function (e, data) {
            //$("#fuelux-wizard").submit();
            //console.log("submitted!");
            $.smallBox({
                title: "Congratulations! Your form was submitted",
                content: "<i class='fa fa-clock-o'></i> <i>1 seconds ago...</i>",
                color: "#5F895F",
                iconSmall: "fa fa-check bounce animated",
                timeout: 4000
            });

        });
}


