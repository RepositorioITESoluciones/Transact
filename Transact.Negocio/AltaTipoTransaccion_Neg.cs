using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace Transact.Negocio {
    public class AltaTipoTransaccionNeg {
        readonly Datos.AltaTipoTransaccionDat AltaDatos = new Datos.AltaTipoTransaccionDat();
        readonly Entidades.AltaTiposTransacciones Transaccion = new Entidades.AltaTiposTransacciones();
        readonly Entidades.CamposDinamicos campos = new Entidades.CamposDinamicos();
        readonly Entidades.TransaccionGralA Etapas = new Entidades.TransaccionGralA();
        readonly Datos.AltaTipoTransaccionDat formula = new Datos.AltaTipoTransaccionDat();

        public Entidades.TiposDatosCampos CatTiposDatosCamposN() {
            Entidades.TiposDatosCampos dataReturn = AltaDatos.CatTiposDatosCampos();

            return dataReturn;
        }
        public Entidades.NivelesTransacciones CatNivelesTransaccionesN() {
            Entidades.NivelesTransacciones datos = AltaDatos.CatNivelesTransacciones();
            return datos;
        }
        public Entidades.TiposOperaciones CatTiposOperacionesN() {
            Entidades.TiposOperaciones datos = AltaDatos.CatTiposOperaciones();
            return datos;
        }
        public Entidades.RolesTransaccion CatTiposRolesTransaccionN() {
            Entidades.RolesTransaccion datos = AltaDatos.CatTiposRolesTransaccion();
            return datos;
        }
        public Entidades.AreasTipoTransaccion CatAreasTipoTransaccionN() {
            Entidades.AreasTipoTransaccion datos = AltaDatos.CatAreasTipoTransaccion();
            return datos;
        }
        public Entidades.ProcesosTipoTransaccion CatProcesoTransaccionN(int idArea) {
            Entidades.ProcesosTipoTransaccion datos = AltaDatos.CatProcesoTransaccion(idArea);
            return datos;
        }
        public Entidades.TiposVisualizacion TiposVisualizacion(int idTipoDatoCampo) {
            Entidades.TiposVisualizacion datos = AltaDatos.CatTVisualizacionTransaccion(idTipoDatoCampo);
            return datos;
        }
        public Entidades.EntEtapas.EtapasCombo CatTEtapasN(int idtipoTran) {
            return AltaDatos.CatTEtapas(idtipoTran);

        }

        public Entidades.EntEtapas.EtapasCombo CatTsoloEtapasN(int idtipoTran) {
            return AltaDatos.CatTsoloEtapas(idtipoTran);

        }

        public Entidades.AccionesEnt.AccionesCombo CatTAccionesN(int idtipoTran, int idEtapa) {
            return AltaDatos.CatTAcciones(idtipoTran, idEtapa);

        }
        public Entidades.TipoTransaccion LlenaTipoTran() {
            return AltaDatos.CatTTiposTransacciones();
        }

        public int InDGral(int proceso, string nombre1, string clave, int categoria) {

            try {

                Transaccion.idProceso = proceso;
                Transaccion.nombre = nombre1;
                Transaccion.cveTipoTransaccion = clave;
                Transaccion.idCatTipoTransaccion = categoria;


                int resp = AltaDatos.InsertDGral(Transaccion);

                return resp;
            } catch {
                return 0;

            }



        }
        public bool InDCampo(int idTipoTran, int idNivel, string nombreCampo, string descripcion, int idTipoDatoCampo, int idTipoOperacion, string longitudCampo) {

            try {

                campos.idNivel = idNivel;
                campos.nombreCampo = nombreCampo;
                campos.descCampo = descripcion;
                campos.idTipoDato = idTipoDatoCampo;
                campos.idTipoOperacion = idTipoOperacion;
                campos.longitud = Convert.ToInt32(longitudCampo);

                bool res = AltaDatos.InsertCamp(idTipoTran, campos);

                return res;
            } catch {
                return false; ;

            }



        }
        public bool InEtapas(int idTipoTran, string descripcion, int orden) {


            return AltaDatos.InsertEtapas(idTipoTran, descripcion, orden);




        }
        public bool InAcciones(int idTipoTran, string claveAccion, string descripcion, int orden) {


            return AltaDatos.InsertAcciones(idTipoTran, claveAccion, descripcion, orden);




        }
        public bool InInsertAccEtap(int idTipoTransaccion, int idEtapa, string NomAccion) {


            return AltaDatos.InsertAccEtap(idTipoTransaccion, idEtapa, NomAccion);




        }
        public bool InInsertEtapasAccRol(int idTipoTransaccion, string nomEtapa, string NomAccion, string nombreRol) {


            return AltaDatos.InsertEtapasAccRol(idTipoTransaccion, nomEtapa, NomAccion, nombreRol);




        }
        public bool inInsertReglasNC(string JsonRN) {

            bool respuesta = true;
            int idTransaccion = 0;
            int idetapa = 0;
            int idaccion = 0;
            DataSet camposRN = new DataSet();
            Datos.ConvertJsonToDataset convertidor = new Datos.ConvertJsonToDataset();
            Console.WriteLine(camposRN);



            camposRN = convertidor.ConvertJsonStringToDataSet(JsonRN);


            foreach (DataRow row in camposRN.Tables["rootNode"].Rows) {
                idTransaccion = Convert.ToInt32(row["IdTipoTran"].ToString());
                idetapa = Convert.ToInt32(row["Etapa"].ToString());
                idaccion = Convert.ToInt32(row["Accion"].ToString());

            }



            foreach (DataRow row in camposRN.Tables["valoresRN"].Rows) {

                respuesta = AltaDatos.InsertRNC(row["Campos"].ToString(), idTransaccion, idetapa, idaccion, Convert.ToInt32(Convert.ToBoolean(row["Visible"])), Convert.ToInt32(Convert.ToBoolean(row["Editable"])), Convert.ToInt32(Convert.ToBoolean(row["Obligatorio"])), Convert.ToInt32(row["Visualización"]));

            }

            return respuesta;
        }
        public bool InsertFormulaN(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo, string cadenaGenerada) {
            return AltaDatos.InsertFormulaD(idTipoTransaccion, idEtapa, idAccion, idCampo, cadenaGenerada);
        }



        public bool InsertReglasNegocioxAN(int idTipoTransaccion, int idEtapa, int idAccion, string cadenaGenerada, int idEtapaDestino) {
            return AltaDatos.InsertReglasNegocioxAD(idTipoTransaccion, idEtapa, idAccion, cadenaGenerada, idEtapaDestino);
        }

        // Metodos para Actualizar
        #region Actualizar
        public bool UpdateCamposN(int idTipoTransaccion, string nombreUP, string nombreCampo, string decripcion, int idTipoDato, string longitud, int idNivel, int idTipoOperacion) {
            return AltaDatos.UpdateCamposD(idTipoTransaccion, nombreUP, nombreCampo, decripcion, idTipoDato, longitud, idNivel, idTipoOperacion);
        }
        public bool UpdateEtapasN(int IdTipoTransaccion, string nombreUP, String descripcion, int orden) {
            return AltaDatos.UpdateEtapasD(IdTipoTransaccion, nombreUP, descripcion, orden);
        }
        public bool UpdateAccionesN(string nombreUP, string cveAccion, string descripcion, int orden) {
            return AltaDatos.UpdateAccionesD(nombreUP, cveAccion, descripcion, orden);
        }
        public bool UpdateStatusN(int IdTipoTransaccion, int estatus) {

            return AltaDatos.UpdateStatusD(IdTipoTransaccion, estatus);
        }
        public bool ActualisarComboboxN(string JsonConbobox) {
            Datos.ConvertJsonToDataset convertidor = new Datos.ConvertJsonToDataset();
            DataSet config = new DataSet();
            Console.WriteLine(config);
            config = convertidor.ConvertJsonStringToDataSet(JsonConbobox);
            int idTipoTransaccion = 0;

            foreach (DataRow row in config.Tables["rootNode"].Rows) {
                idTipoTransaccion = Convert.ToInt32(row["idTipoTransaccion"].ToString());
            }

            foreach (DataRow rows in config.Tables["ComboBox"].Rows) {
                AltaDatos.ActualisarComboboxD(rows["idCampo"].ToString(), idTipoTransaccion, Convert.ToInt32(rows["idTipoTranConbo"].ToString()), rows["idReferencia"].ToString(), rows["nombreReferencia"].ToString());



            }




            return true;
        }
        public bool UpdateTipoTransaccionN(int IdTipoTransaccion, string descripcion, string clave, int idProceso, int idCatTipoTransac) {
            return AltaDatos.UpdateTipoTransaccionD(IdTipoTransaccion, descripcion, clave, idProceso, idCatTipoTransac);
        }
        public bool UpdateCicloVidaN(string descripcion, int orden, string cveAccion, string descripcionN, int ordenN, string cveAccionN) {
            return AltaDatos.UpdateCicloVidaD(descripcion, orden, cveAccion, descripcionN, ordenN, cveAccionN);
        }
        public bool updateReglasNegocioCamposxTTN(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo, string nombreReferencia, string idReferencia, int idTipoTransaccionReferencia) {
            return AltaDatos.updateReglasNegocioCamposxTTD(idTipoTransaccion, idEtapa, idAccion, idCampo, nombreReferencia, idReferencia, idTipoTransaccionReferencia);
        }

        public bool updateCOMBOBOXN(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo, bool newnombreReferencia, bool newidReferencia, bool newidTipoTransaccionReferencia) {
            return AltaDatos.updateCOMBOBOXD(idTipoTransaccion, idEtapa, idAccion, idCampo, newnombreReferencia, newidReferencia, newidTipoTransaccionReferencia);
        }

        public bool UpdateJsonAutoN(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo, string CadenaJson) {
            return AltaDatos.UpdateJsonAutoD(idTipoTransaccion, idEtapa, idAccion, idCampo, CadenaJson);

        }

        #endregion
        // Metodos para Eliminar
        #region Eliminar
        public bool DeleteCamposN(string nombreCampo) {
            return AltaDatos.DeleteCamposD(nombreCampo);
        }
        public bool DeleteEtapasN(string descripcion, int idTipoTransaccion) {
            return AltaDatos.DeleteEtapasD(descripcion, idTipoTransaccion);
        }
        public bool DeleteAccionesN(string descripcion) {
            return AltaDatos.DeleteAccionesD(descripcion);
        }

        public bool DeleteEtapasAccionesRolesN(int idTipoTransaccion, int idEtapa, int idAccion) {
            return AltaDatos.DeleteEtapasAccionesRolesD(idTipoTransaccion, idEtapa, idAccion);
        }

        public bool DeleteEtapasAccionesTipoTransaccionesN(int idTipoTransaccion, int idEtapa, int idAccion) {
            return AltaDatos.DeleteEtapasAccionesTipoTransaccionesD(idTipoTransaccion, idEtapa, idAccion);
        }

        public bool DeleteFormulaN(int idTipoTransaccion, int idEtapa, int idAccion, int idcampo) {
            return AltaDatos.DeleteFormulaD(idTipoTransaccion, idEtapa, idAccion, idcampo);
        }
        public bool ReglasNegocioXCampoN(int idTipoTransaccion, int idEtapa, int idAccion, int idcampo) {
            return AltaDatos.DeleteFormulaD(idTipoTransaccion, idEtapa, idAccion, idcampo);
        }
        public bool DeleteReglasCamposN(int idTipoTransaccion, int idcampo) {
            return AltaDatos.DeleteReglasCamposD(idTipoTransaccion, idcampo);
        }
        public bool DeleteCamposDinamicosN(int idTipoTransaccion, int idcampo) {
            return AltaDatos.DeleteCamposDinamicosD(idTipoTransaccion, idcampo);
        }
        public bool DeleteCamposConboboxN(int idTipoTransaccion, int idcampo) {
            return AltaDatos.DeleteCamposConbobox(idTipoTransaccion, idcampo);
        }
        public bool DeleteReglasNegocioxAN(int idTipoTransaccion, int idEtapa, int idAccion, int idEtapaF) {
            return AltaDatos.DeleteReglasNegocioxAD(idTipoTransaccion, idEtapa, idAccion, idEtapaF);
        }

        public string DeleteTransaccion(int idTipoTransaccion) {
            return AltaDatos.DeleteTransaccion(idTipoTransaccion);
        }

        #endregion
        // Metodos de consulta
        #region Consultas

        public Entidades.DTCamposDinamicos DTCamposN(int idTipoTransaccion) {

            return AltaDatos.DTCamposD(idTipoTransaccion);
        }
        public Entidades.LisFormula DTFormulasN(int idTipoTransaccion, int idEtapa, int idAccion) {

            return formula.DTFormulasD(idTipoTransaccion, idEtapa, idAccion);
        }
        public Entidades.DTCamposDinamicos CamposConboboxN(int idTipotransaccion, int idEtapa, int idAccion) {
            return AltaDatos.CamposConboboxD(idTipotransaccion, idEtapa, idAccion);
        }
        public Entidades.DTCamposDinamicos CamposN(int idTipotransaccion) {

            return AltaDatos.CamposD(idTipotransaccion);
        }
        public Entidades.TransaccionGralA EtapasTransaccionN(int idTipoTransaccion) {

            return AltaDatos.EtapasTransaccionD(idTipoTransaccion);
        }
        public Entidades.DTCamposDinamicos DTDetalleN(int idTipoTransaccion) {

            return AltaDatos.DTDetalle(idTipoTransaccion);
        }
        public Entidades.DTCamposDinamicos DTCabezeraN(int idTipoTransaccion) {

            return AltaDatos.DTCabezera(idTipoTransaccion);
        }
        public Entidades.DTCamposDinamicos ListCamposAbiertoN(int idTipotransaccion) {

            return AltaDatos.ListCamposAbiertoD(idTipotransaccion);
        }

        public Entidades.AltaTiposTransacciones CatTiposTransaccionesN(int idTipoTransaccion) {
            return AltaDatos.CatTiposTransaccionesD(idTipoTransaccion);
        }

        public Entidades.EntEtapas.EtapasCombo CatETapasAcionesN(int idTipoTransaccion, int idEtapa) {
            return AltaDatos.CatETapasAcionesD(idTipoTransaccion, idEtapa);
        }

        public Entidades.RolesTransaccion CatRolesN(int idTipoTransaccion, int idEtapa, string descripcion) {
            return AltaDatos.CatRolesD(idTipoTransaccion, idEtapa, descripcion);
        }




        public Entidades.EnFormula CatformulasN(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo) {
            return AltaDatos.CatformulasD(idTipoTransaccion, idEtapa, idAccion, idCampo);
        }

        public Entidades.ENReglasNeg CatReglasNegocioN(int idTipoTransaccion, int idEtapa, int idAccion) {
            return AltaDatos.CatReglasNegocioD(idTipoTransaccion, idEtapa, idAccion);

        }


        public Entidades.CamposConbo CatCamposconboboxN(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo) {
            return AltaDatos.CatCamposconboboxD(idTipoTransaccion, idEtapa, idAccion, idCampo);
        }
        public Entidades.ReglasxCampo ReglasxCamposN(int idTipoTransaccion, int idEtapa, int idAccion) {
            return AltaDatos.ReglasxCamposD(idTipoTransaccion, idEtapa, idAccion);
        }
        public Entidades.CatCombobox CatComboboxN(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo) {
            return AltaDatos.CatComboboxD(idTipoTransaccion, idEtapa, idAccion, idCampo);
        }
        public int CountReglasN(int idTipoTransaccion, string nombreCampo, int idEtapa, int idAccion) {
            return AltaDatos.CountReglasD(idTipoTransaccion, nombreCampo, idEtapa, idAccion);
        }


        public Entidades.camposConboboxId CatConboboxRNGN(int idTipoTransaccion, int idEtapa, int idAccion) {
            return AltaDatos.CatConboboxRNG(idTipoTransaccion, idEtapa, idAccion);
        }


        public Entidades.DTCamposDinamicos CamposCabeceraN(int idTipotransaccion, int idEtapa, int idAccion) {
            return AltaDatos.CamposCabeceraD(idTipotransaccion, idEtapa, idAccion);
        }

        public Entidades.DTCamposDinamicos CamposDetalleN(int idTipotransaccion, int idEtapa, int idAccion) {
            return AltaDatos.CamposDetalleD(idTipotransaccion, idEtapa, idAccion);
        }
        public Entidades.ReglasNegocioxAccion CatReglasNegocioxAccionN(int idTipoTransaccion) {
            return AltaDatos.CatReglasNegocioxAccionD(idTipoTransaccion);
        }

        public Entidades.DTCamposDinamicos campCombN(int idTipotransaccion, int idEtapa, int idAccion) {
            return AltaDatos.campCombD(idTipotransaccion, idEtapa, idAccion);
        }

        public Entidades.Autocompletar campNCombN(int idTipotransaccion, int idEtapa, int idAccion, int idCampo) {
            return AltaDatos.campNCombD(idTipotransaccion, idEtapa, idAccion, idCampo);
        }

        public Entidades.DTCamposDinamicos campJsonN(int idTipotransaccion, int idEtapa, int idAccion, string nombreCampo) {
            return AltaDatos.campJsonD(idTipotransaccion, idEtapa, idAccion, nombreCampo);
        }

        public Entidades.DTCamposDinamicos selectDeleteCampoDinamicoN(int idTipotransaccion, int idCampo) {
            return AltaDatos.selectDeleteCampoDinamico(idTipotransaccion, idCampo);
        }
        public Entidades.DTCamposDinamicos selectDeleteEtapaN(int idTipotransaccion, string nombre) {
            return AltaDatos.selectDeleteEtapa(idTipotransaccion, nombre);
        }

        public Entidades.DTCamposDinamicos selectDeleteAccionRncN(int idTipotransaccion, int idAccion) {
            return AltaDatos.selectDeleteAccionxRnc(idTipotransaccion, idAccion);
        }

        public Entidades.DTCamposDinamicos selectDeleteAccionxComboN(int idTipotransaccion, int idAccion) {
            return AltaDatos.selectDeleteAccionxCombo(idTipotransaccion, idAccion);
        }

        public Entidades.DTCamposDinamicos selectDeleteAccionxAutoN(int idTipotransaccion, int idAccion) {
            return AltaDatos.selectDeleteAccionxAuto(idTipotransaccion, idAccion);
        }

        public Entidades.DTCamposDinamicos selectDeleteAccionxFormulaN(int idTipotransaccion, int idAccion) {
            return AltaDatos.selectDeleteAccionxFormula(idTipotransaccion, idAccion);
        }

        public Entidades.DTCamposDinamicos selectDeleteAccionxRnAN(int idTipotransaccion, int idAccion) {
            return AltaDatos.selectDeleteAccionxRnA(idTipotransaccion, idAccion);
        }




        #endregion

        public bool ActuaInsert(string jsonDatos) {
            DataSet DtDatos = new DataSet();
            int idTransaccion = 0;
            int idetapa = 0;
            int idaccion = 0;
            int countReglas = 0;
            bool respuesta = false;
            Console.WriteLine(DtDatos);
            Datos.ConvertJsonToDataset convertidor = new Datos.ConvertJsonToDataset();
            DtDatos = convertidor.ConvertJsonStringToDataSet(jsonDatos);

            foreach (DataRow row in DtDatos.Tables["rootNode"].Rows) {
                idTransaccion = Convert.ToInt32(row["IdTipoTran"].ToString());
                idetapa = Convert.ToInt32(row["Etapa"].ToString());
                idaccion = Convert.ToInt32(row["Accion"].ToString());

            }

            foreach (DataRow row in DtDatos.Tables["valoresRN"].Rows) {

                countReglas = CountReglasN(idTransaccion, row["Campos"].ToString(), idetapa, idaccion);

                if (countReglas == 1) {
                    respuesta = AltaDatos.updateReglasNegocioXCampoD(idTransaccion, idetapa, idaccion, row["Campos"].ToString(), Convert.ToInt32(Convert.ToBoolean(row["Visible"])), Convert.ToInt32(Convert.ToBoolean(row["Editable"])), Convert.ToInt32(Convert.ToBoolean(row["Obligatorio"])), Convert.ToInt32(row["Visualización"]));
                } else {

                    respuesta = AltaDatos.InsertRNC(row["Campos"].ToString(), idTransaccion, idetapa, idaccion, Convert.ToInt32(Convert.ToBoolean(row["Visible"])), Convert.ToInt32(Convert.ToBoolean(row["Editable"])), Convert.ToInt32(Convert.ToBoolean(row["Obligatorio"])), Convert.ToInt32(row["Visualización"]));

                }
            }

            return respuesta;
        }

        public Entidades.ENReglasNeg CattooltipN(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo) {
            return AltaDatos.Cattooltip(idTipoTransaccion, idEtapa, idAccion, idCampo);
        }

    }
}
