using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using Transact.Framework.AccesoDatos;
using Newtonsoft.Json;
using System.Xml;
using System.Xml.Serialization;
using System.IO;
using Transact.Entidades;

namespace Transact.Datos
{
    public class Bandeja
    {
        public EstatusTransacciones ObtenerStatus()
        {
            //Variables
            SqlConnection connection = null;
            DataTable dt = new DataTable();
            EstatusTransacciones registros = new EstatusTransacciones();
            List<AtributosEstatus> tipostransa = new List<AtributosEstatus>();
            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT idEstatus,descripcion FROM Configuracion.EstatusTransacciones");
                    dt.Load(consulta);
                    connection.Close();
                }

                foreach (DataRow reg in dt.Rows)
                {
                    AtributosEstatus valor = new AtributosEstatus();
                    valor.idEstatus = Convert.ToInt32(reg["idEstatus"].ToString());
                    valor.descripcion = reg["descripcion"].ToString();
                    tipostransa.Add(valor);
                }
                registros.listStatus = tipostransa.ToArray();
            }
            catch (Exception ex)
            {
                Console.WriteLine("" + ex.Message, ex);
                throw;
            }

            return registros;
        }
        public TransactBitacora DetalleTransaccionesD(int idEstatus)
        {
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            TransactBitacora lista = new TransactBitacora();
            List<CamposTransactBitacora> Campos = new List<CamposTransactBitacora>();


            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT MAE.idTipoTransaccion,MAE.idTransaccion,  TT.descripcion, MAE.fechaIniTransaccion, TT.cveTipoTransaccion"
                                                                      + " FROM Configuracion.MAETransacciones MAE, Configuracion.TiposTransacciones TT"
                                                                      + " WHERE MAE.idTipoTransaccion = TT.idTipoTransaccion"
                                                                      + " AND idEstatus = " + idEstatus);
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    CamposTransactBitacora valores = new CamposTransactBitacora();
                    valores.idTipoTransaccion = Convert.ToInt32(rowDet["idTipoTransaccion"].ToString());
                    valores.idTransaccion = rowDet["idTransaccion"].ToString();
                    valores.descripcion = rowDet["descripcion"].ToString();
                    DateTime fecha = Convert.ToDateTime(rowDet["fechaIniTransaccion"].ToString());
                    valores.fechaIniTransaccion = fecha.ToString("dd/MM/yy HH:mm:ss");
                    valores.cveTipoTransaccion = rowDet["cveTipoTransaccion"].ToString();
                    Campos.Add(valores);

                }

                lista.listaTranBitacora = Campos.ToArray();

            }
            catch (Exception ex)
            {
                Console.WriteLine("" + ex.Message, ex);
                throw;
            }



            return lista;
        }
        public CamposTransaccion ArmaFormularioxEtapa(int idTipoTransaccion, string idtransaccion)
        {
            CamposTransaccion comptran = new CamposTransaccion();
            SqlConnection connection = null;
            DataTable Transacciones = new DataTable();
            SqlDataReader consulta;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {


                    connection.Open();

                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT tt.[idTipoTransaccion], MAE.idTransaccion,TT.[descripcion], "
                                                                    + " [cveTipoTransaccion], CTT.categoriaTransac, TT.activo, MAE.idEtapa as etapaAct,"
                                                                    + " (SELECT descripcion FROM Configuracion.EtapasTipoTransaccion ETT WHERE ETT.idEtapa = MAE.idEtapa) etapaActual,"
                                                                    + " MIN(EATT.idEtapa) etapaDes, (SELECT descripcion FROM Configuracion.EtapasTipoTransaccion ETT WHERE ETT.idEtapa = MIN(EATT.idEtapa)) etapaDestino"
                                                                    + " FROM Configuracion.TiposTransacciones TT INNER JOIN Configuracion.CategoriaTipoTransaccion CTT"
                                                                    + " on TT.idCatTipoTransac = CTT.idCatTipoTransac  INNER JOIN Configuracion.EtapasAccionesTipoTransacciones EATT"
                                                                    + " ON TT.idTipoTransaccion = EATT.idTipoTransaccion INNER JOIN Configuracion.MAETransacciones MAE"
                                                                    + " ON MAE.idTipoTransaccion = TT.idTipoTransaccion"
                                                                    + " INNER JOIN Configuracion.EtapasTipoTransaccion ETT"
                                                                    + " ON ETT.idEtapa = MAE.idEtapa"
                                                                    + " WHERE MAE.idTransaccion = '"+ idtransaccion + "'"
                                                                    + " AND EATT.idEtapa<>(SELECT min(idEtapa) FROM Configuracion.MAETransacciones WHERE idTransaccion = '"+ idtransaccion + "')"
                                                                    + " GROUP BY tt.[idTipoTransaccion], MAE.idTransaccion,TT.[descripcion],"
                                                                    + " [cveTipoTransaccion], CTT.categoriaTransac, TT.activo, MAE.idEtapa");

                    Transacciones.Load(consulta);



                    connection.Close();

                    foreach (DataRow Transaccion in Transacciones.Rows)
                    {

                        comptran.idTipoTrasaccion = Convert.ToInt32(Transaccion["idTipoTransaccion"].ToString());
                        comptran.idTrasaccion = Transaccion["idTransaccion"].ToString();
                        comptran.descripcion = Transaccion["descripcion"].ToString();
                        comptran.cveTipoTransaccion = Transaccion["cveTipoTransaccion"].ToString();
                        comptran.categoriaTransac = Transaccion["categoriaTransac"].ToString();
                        comptran.idEtapa = Convert.ToInt32(Transaccion["etapaAct"].ToString());
                        comptran.NombreEtapa = Transaccion["etapaActual"].ToString();
                        comptran.idEtapaFutura = Convert.ToInt32(Transaccion["etapaDes"].ToString());
                        comptran.nomEtaFut = Transaccion["etapaDestino"].ToString();            
                        comptran.activo = Convert.ToBoolean(Transaccion["activo"].ToString());
                        CamposTransaccionxEtapa(ref comptran);


                    }



                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("" + ex.Message, ex);
                throw;
            }

            return comptran;

        }
        public static void CamposTransaccionxEtapa(ref CamposTransaccion campos)
        {

            SqlConnection connection = null;
            DataTable CamposComplemento = new DataTable();
            List<Entidades.CampCabecera> ListaCamposComplementoCab = new List<Entidades.CampCabecera>();
            List<Entidades.CampDetalle> ListaCamposComplementoDet = new List<Entidades.CampDetalle>();
            SqlDataReader consulta;
            try
            {
                DataTable dt = new DataTable();
                dt.Columns.Add("idCampo");
                dt.Columns.Add("idnivel");
                dt.Columns.Add("nombreCampo");
                dt.Columns.Add("descripcionCampo");
                dt.Columns.Add("tipoDato");
                dt.Columns.Add("visualisacion");
                dt.Columns.Add("tipoOperacion");
                dt.Columns.Add("activo");
                dt.Columns.Add("longitudCampo");
                dt.Columns.Add("visible");
                dt.Columns.Add("editable");
                dt.Columns.Add("obligatorio");
                dt.Columns.Add("CadenaComplementos");
                dt.Columns.Add("formula");
                dt.Columns.Add("TipoTransaccion").DataType = typeof(string);
                dt.Columns.Add("IdReferencia");
                dt.Columns.Add("NombreReferencia");
//                dt.Columns["TipoTransaccion"].DataType = typeof(Int64);
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    connection.Open();

                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT DISTINCT CDT.idCampo,"
                                                                        + " CDT.idNivel,"
                                                                        + " nombreCampo,"
                                                                        + " CDT.descripcion AS descripcionCampo,"
                                                                        + " TDC.descripcion as tipoDato,"
                                                                            + " TIP.descripcion as tipoOperacion"
                                                                            + " , CDT.[activo]"
                                                                            + " ,[longitudCampo]"
                                                                            + " ,[visible]"
                                                                            + " ,[editable]"
                                                                        + " , (select    CASE"
                                                                            + " WHEN([obligatorio]) = 1 THEN 'required'"
                                                                            + " WHEN([obligatorio]) = 0 THEN ''"
                                                                        + " END ) as obligatorio"
                                                                        + " , F.cadenaGenerada as formula"
                                                                            + " , VTT.componente AS visualisacion, "
                                                                        + " RNCT.idTipoTransaccionReferencia as TipoTransaccion,"
                                                                        + " RNCT.cadenaJsonHijos as CadenaComplementos,"
                                                                        + " RNCT.idReferencia as IdReferencia,"
                                                                        + " RNCT.nombreReferencia as NombreReferencia"
                                                                        + " FROM"
                                                                        + " Configuracion.TiposTransacciones TT"
                                                                        + " INNER JOIN Configuracion.CamposDinamicosTransacciones CDT"
                                                                        + " ON CDT.idTipoTransaccion = TT.idTipoTransaccion"
                                                                        + " INNER JOIN Configuracion.NivelTransacciones NT ON"
                                                                        + " NT.idNivel = CDT.idNivel"
                                                                        + " INNER JOIN Configuracion.TiposDatoCampos TDC"
                                                                        + " ON TDC.idTipoDatoCampo = CDT.idTipoDatoCampo"
                                                                        + " INNER JOIN Configuracion.CategoriaTipoTransaccion CT"
                                                                        + " ON CT.idCatTipoTransac = TT.idCatTipoTransac"
                                                                        + " INNER JOIN Configuracion.TiposOperaciones TIP"
                                                                        + " ON TIP.idTipoOperacion = CDT.idTipoOperacion"
                                                                        + " INNER JOIN Configuracion.ReglasNegocioCamposxTipoTransaccion RNCT"
                                                                        + " ON RNCT.idTipoTransaccion = TT.idTipoTransaccion"
                                                                        + " AND RNCT.idTipoTransaccion = CDT.idTipoTransaccion"
                                                                        + " AND RNCT.idCampo = CDT.idCampo"
                                                                        + " INNER JOIN Configuracion.VisualizacionTipoTransacciones VTT"
                                                                        + " ON VTT.idVisualizacion = RNCT.idVisualizacion"
                                                                        + " left join Configuracion.Formulas F"
                                                                        + " on f.idTipoTransaccion = TT.idTipoTransaccion"
                                                                        + " and f.idCampo = CDT.idCampo"
                                                                        + " INNER JOIN Configuracion.EtapasAccionesTipoTransacciones EATT"
                                                                        + " ON EATT.idEtapa = RNCT.idEtapa"
                                                                        + " AND EATT.idTipoTransaccion = RNCT.idTipoTransaccion"
                                                                        + " INNER JOIN Configuracion.EtapasTipoTransaccion ETT"
                                                                        + " ON ETT.idEtapa = RNCT.idEtapa"
                                                                        + " AND ETT.idTipoTransaccion = RNCT.idTipoTransaccion"
                                                                        + " INNER JOIN Configuracion.AccionesTipoTransaccion ATT"
                                                                        + " ON ATT.idAccion = EATT.idAccion"
                                                                        + " AND ATT.idTipoTransaccion = RNCT.idTipoTransaccion"
                                                                        + " INNER JOIN Configuracion.MAETransacciones MAE"
                                                                        + " ON MAE.idTipoTransaccion = TT.idTipoTransaccion"
                                                                        + " WHERE MAE.idTransaccion = '" + campos.idTrasaccion + "'"
                                                                        + " AND RNCT.visible = 1 AND EATT.idEtapa <> (SELECT idEtapa FROM Configuracion.MAETransacciones WHERE idTransaccion = '" + campos.idTrasaccion + "')");
                    CamposComplemento.Load(consulta);
                    connection.Close();

                    if (CamposComplemento.Rows.Count > 0)
                    {
                        DataRow newRow = dt.NewRow();
                        newRow["idCampo"] = "1";
                        newRow["idnivel"] = "2";
                        newRow["nombreCampo"] = "Idrows";
                        newRow["descripcionCampo"] = "Identificador";
                        newRow["tipoDato"] = "Text";
                        newRow["visualisacion"] = "combobox";
                        newRow["tipoOperacion"] = "CampoAbierto";
                        newRow["activo"] = "True";
                        newRow["longitudCampo"] = "50";
                        newRow["visible"] = "True";
                        newRow["editable"] = "True";
                        newRow["obligatorio"] = "required";
                        newRow["CadenaComplementos"] = "";
                        newRow["formula"] = "";
                        newRow["TipoTransaccion"] = campos.idTrasaccion;
                        newRow["IdReferencia"] = "idrow";
                        newRow["NombreReferencia"] = "idrow";
                        dt.Rows.Add(newRow);

                        foreach (DataRow row in CamposComplemento.Rows) 
                        {
                            DataRow rows = dt.NewRow();

                            rows["idCampo"] = row["idCampo"];
                            rows["idnivel"] = row["idnivel"];
                            rows["nombreCampo"] = row["nombreCampo"];
                            rows["descripcionCampo"] = row["descripcionCampo"];
                            rows["tipoDato"] = row["tipoDato"];
                            rows["visualisacion"] = row["visualisacion"];
                            rows["tipoOperacion"] = row["tipoOperacion"];
                            rows["activo"] = row["activo"];
                            rows["longitudCampo"] = row["longitudCampo"];
                            rows["visible"] = row["visible"];
                            rows["editable"] = row["editable"];
                            rows["obligatorio"] = row["obligatorio"];
                            rows["CadenaComplementos"] = row["CadenaComplementos"];
                            rows["formula"] = row["formula"];
                            rows["TipoTransaccion"] = row["TipoTransaccion"];
                            rows["IdReferencia"] = row["IdReferencia"];
                            rows["NombreReferencia"] = row["NombreReferencia"];

                            dt.Rows.Add(rows);

                        }



                        DataSet dtCampos = new DataSet();

                        dtCampos.Tables.Add(CamposComplemento);

                        

                        //Datos Cabecera

                        if (1 == (int)nivel.cabecera)

                            foreach (DataRow Campo in dt.Rows)
                            {
                                if ((Convert.ToInt32(Campo["idnivel"].ToString())) == (int)Entidades.nivel.cabecera)
                                {
                                    Entidades.CampCabecera CampoCabecera = new Entidades.CampCabecera();
                                    //Transact.Entidades
                                    CampoCabecera.idCampo = Convert.ToInt32(Campo["idCampo"].ToString());
                                    CampoCabecera.idnivel = Convert.ToInt32(Campo["idnivel"].ToString());
                                    CampoCabecera.nombreCampo = Campo["nombreCampo"].ToString();
                                    CampoCabecera.descripcionCampo = Campo["descripcionCampo"].ToString();
                                    CampoCabecera.TipoDatoCampo = Campo["tipoDato"].ToString();
                                    CampoCabecera.Visualisacion = Campo["visualisacion"].ToString();
                                    CampoCabecera.TipoOperacion = Campo["tipoOperacion"].ToString();
                                    CampoCabecera.activo = Convert.ToBoolean(Campo["activo"].ToString());
                                    CampoCabecera.logitudCampo = Convert.ToDouble(Campo["longitudCampo"].ToString());
                                    CampoCabecera.visible = Convert.ToBoolean(Campo["visible"].ToString());
                                    CampoCabecera.editable = Convert.ToBoolean(Campo["editable"].ToString());
                                    CampoCabecera.obligatorio = Campo["obligatorio"].ToString();
                                    if (Campo["CadenaComplementos"].ToString() != "")
                                    {
                                        CampoCabecera.CadenaComplementos = Campo["CadenaComplementos"].ToString();
                                    }
                                    if (Campo["formula"].ToString() != "")
                                    {
                                        CampoCabecera.formula = Campo["formula"].ToString();
                                    }
                                    if (Campo["TipoTransaccion"].ToString() != "")
                                    {
                                        CampoCabecera.TransaccionReferencia = Campo["TipoTransaccion"].ToString();
                                        CampoCabecera.idRef = Campo["IdReferencia"].ToString();
                                        CampoCabecera.nomRef = Campo["NombreReferencia"].ToString();
                                    }
                                    ListaCamposComplementoCab.Add(CampoCabecera);
                                }
                                if ((Convert.ToInt32(Campo["idnivel"].ToString())) == (int)Entidades.nivel.detalle)
                                {
                                    Entidades.CampDetalle CampoDet = new Entidades.CampDetalle();
                                    CampoDet.idCampo = Convert.ToInt32(Campo["idCampo"].ToString());
                                    CampoDet.idnivel = Convert.ToInt32(Campo["idnivel"].ToString());
                                    CampoDet.nombreCampo = Campo["nombreCampo"].ToString();
                                    CampoDet.descripcionCampo = Campo["descripcionCampo"].ToString();
                                    CampoDet.TipoDatoCampo = Campo["tipoDato"].ToString();
                                    CampoDet.Visualisacion = Campo["visualisacion"].ToString();
                                    CampoDet.TipoOperacion = Campo["tipoOperacion"].ToString();
                                    CampoDet.activo = Convert.ToBoolean(Campo["activo"].ToString());
                                    CampoDet.logitudCampo = Convert.ToDouble(Campo["longitudCampo"].ToString());
                                    CampoDet.visible = Convert.ToBoolean(Campo["visible"].ToString());
                                    CampoDet.editable = Convert.ToBoolean(Campo["editable"].ToString());
                                    CampoDet.obligatorio = Campo["obligatorio"].ToString();
                                    if (Campo["CadenaComplementos"].ToString() != "")
                                    {
                                        CampoDet.CadenaComplementos = Campo["CadenaComplementos"].ToString();
                                    }
                                    if (Campo["formula"].ToString() != "")
                                    {
                                        CampoDet.formula = Campo["formula"].ToString();
                                    }

                                    if (Campo["TipoTransaccion"].ToString() != "")
                                    {
                                        CampoDet.TransaccionReferencia = Campo["TipoTransaccion"].ToString();
                                        CampoDet.idRef = Campo["IdReferencia"].ToString();
                                        CampoDet.nomRef = Campo["NombreReferencia"].ToString();
                                    }
                                    ListaCamposComplementoDet.Add(CampoDet);
                                }


                            }
                        campos.CamposCabecera = ListaCamposComplementoCab.ToArray();
                        campos.CamposDetalle = ListaCamposComplementoDet.ToArray();
                    }
                    else
                    {
                        campos.CamposCabecera = ListaCamposComplementoCab.ToArray();
                        campos.CamposDetalle = ListaCamposComplementoDet.ToArray();
                    }

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("" + ex.Message, ex);
                throw;
            }


        }
        public BitacoraTransacciones DetalleBitacoraD(string idtransaccion)
        {
            BitacoraTransacciones detalle = new BitacoraTransacciones();
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<camposBitacora> Campos = new List<camposBitacora>();


            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT idBitacora,idTransaccion,cveMovimiento,camposTransacciones,idEtapa,idAccion,estatus"
                                                                      + " FROM Configuracion.BitacoraTransacciones"
                                                                      + " where idTransaccion = '" + idtransaccion+"'");
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    camposBitacora valores = new camposBitacora();
                    valores.idBitacora = Convert.ToInt32(rowDet["idBitacora"].ToString());
                    valores.idTransaccion = rowDet["idTransaccion"].ToString();
                    valores.cveMovimiento = rowDet["cveMovimiento"].ToString();
                    valores.camposTransacciones = rowDet["camposTransacciones"].ToString();
                    valores.idEtapa = Convert.ToInt32(rowDet["idEtapa"].ToString());
                    valores.idAccion = Convert.ToInt32(rowDet["idAccion"].ToString());
                    if (rowDet["estatus"].ToString()=="null") { valores.estatus = Convert.ToBoolean(rowDet["estatus"].ToString()); } else { valores.estatus = false; }
                    Campos.Add(valores);

                }

                detalle.lista = Campos.ToArray();

            }
            catch (Exception ex)
            {
                Console.WriteLine("" + ex.Message, ex);
                throw;
            }


            return detalle;
        }
        public ReglasNegocioxAccion ReglasxAccion(int idTipoTransaccion) {
            ReglasNegocioxAccion detalle = new ReglasNegocioxAccion();
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<camposReglasNegocioxAccion> Campos = new List<camposReglasNegocioxAccion>();


            try {

                using (connection = Conexion.ObtieneConexion("ConexionBD")) {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT idReglaxAccion,idTipoTransaccion,idEtapa,idAccion,idEtapaDestino," +
                                                                        "jsonReglas,descripcionRegla,mensajeError " +
                                                                        "FROM Configuracion.ReglasNegocioxAccion " +
                                                                        "where idTipoTransaccion = "+ idTipoTransaccion);
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows) {
                    camposReglasNegocioxAccion valores = new camposReglasNegocioxAccion();
                    valores.idReglaxAccion = Convert.ToInt32(rowDet["idReglaxAccion"].ToString());
                    valores.idTipoTransaccion = Convert.ToInt32(rowDet["idTipoTransaccion"].ToString());
                    valores.idEtapa = Convert.ToInt32(rowDet["idEtapa"].ToString());
                    valores.idEtapaDestino = Convert.ToInt32(rowDet["idEtapaDestino"].ToString());
                    valores.ReglaxAccion = rowDet["jsonReglas"].ToString();
                    //valores.idAccion = Convert.ToInt32(rowDet["idAccion"].ToString());
                    //if (rowDet["estatus"].ToString() == "null") { valores.estatus = Convert.ToBoolean(rowDet["estatus"].ToString()); } else { valores.estatus = false; }
                    Campos.Add(valores);

                }

                detalle.listaReglasxAccion = Campos.ToArray();

            } catch (Exception ex) {
                Console.WriteLine("" + ex.Message, ex);
                throw;
            }


            return detalle;
        }




    }
}
