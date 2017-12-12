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

namespace Transact.Datos
{
    public class AltaTipoTransaccionDat
    {
        // Metodos para Agregar
        #region Insert
        public int InsertDGral(Entidades.AltaTiposTransacciones AltaTipoTrans)
        {

            Int32 idTran;
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    connection.Open();

                    SqlDataReader Resul = Ejecuta.ConsultaConRetorno(connection, "SELECT Max(idTipoTransaccion)  FROM Configuracion.TiposTransacciones");
                    Resul.Read();
                    int resultadoid = Resul.GetInt32(0);
                    idTran = resultadoid + 1;

                    AltaTipoTrans.idTipoTransaccion = idTran;

                    connection.Close();


                    connection.Open();
                    Ejecuta.ConsultaSinRetorno1(connection, "INSERT INTO Configuracion.TiposTransacciones VALUES(" + AltaTipoTrans.idTipoTransaccion + ",'" + AltaTipoTrans.nombre + "','" + AltaTipoTrans.cveTipoTransaccion + "',1," + AltaTipoTrans.idProceso + "," + AltaTipoTrans.idCatTipoTransaccion + ",1,'" + DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss") + "')");
                    connection.Close();
                }

                return idTran;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return 0;
                 
            }



        }
        public bool InsertCamp(int idTipoTran, Entidades.CamposDinamicos campos)
        {

            SqlConnection connection = null;
            bool ins;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    connection.Open();

                    SqlDataReader Resul = Ejecuta.ConsultaConRetorno(connection, "SELECT Max(idCampo)  FROM Configuracion.CamposDinamicosTransacciones");
                    Resul.Read();
                    int resultadoid = Resul.GetInt32(0);
                    Int32 idcampo = resultadoid + 1;

                    connection.Close();


                    connection.Open();
                    ins = Ejecuta.ConsultaSinRetorno1(connection, "INSERT INTO Configuracion.CamposDinamicosTransacciones VALUES(" + idcampo + "," + idTipoTran + "," + campos.idNivel + ",'" + campos.nombreCampo + "','" + campos.descCampo + "'," + campos.idTipoDato + "," + campos.idTipoOperacion + ",1,'" + campos.longitud + "',1,'" + DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss") + "')");
                    connection.Close();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }


            return ins;
        }
        public bool InsertEtapas(int idTipoTran, string descripcion, int orden)
        {

            SqlConnection connection = null;
            bool ins;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    connection.Open();

                    SqlDataReader Resul = Ejecuta.ConsultaConRetorno(connection, "SELECT Max(idEtapa)  FROM Configuracion.EtapasTipoTransaccion");
                    Resul.Read();
                    int resultadoid = Resul.GetInt32(0);
                    Int32 idetapa = resultadoid + 1;

                    connection.Close();


                    connection.Open();
                    ins = Ejecuta.ConsultaSinRetorno1(connection, "INSERT INTO Configuracion.EtapasTipoTransaccion VALUES(" + idetapa + ",'" + descripcion + "'," + orden + ",null," + idTipoTran + ",0)");
                    connection.Close();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

                throw;

            }


            return ins;
        }
        public bool InsertAcciones(int idTipoTran, string claveAccion, string descripcion, int orden)
        {

            SqlConnection connection = null;
            bool ins;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    connection.Open();

                    SqlDataReader Resul = Ejecuta.ConsultaConRetorno(connection, "SELECT Max(idAccion)  FROM Configuracion.AccionesTipoTransaccion");
                    Resul.Read();
                    int resultadoid = Resul.GetInt32(0);
                    Int32 idaccion = resultadoid + 1;
                    connection.Close();


                    connection.Open();
                    ins = Ejecuta.ConsultaSinRetorno1(connection, "INSERT INTO Configuracion.AccionesTipoTransaccion VALUES(" + idaccion + ",'" + claveAccion + "','" + descripcion + "'," + "1," + orden + ",2,'" + DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss") + "'," + idTipoTran + ",NULL)");
                    connection.Close();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

                throw;
            }


            return ins;
        }
        public bool InsertAccEtap(int idTipoTransaccion, int idEtapa, string NomAccion)
        {

            SqlConnection connection = null;
            bool ins;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    connection.Open();
                    SqlDataReader Resul2 = Ejecuta.ConsultaConRetorno(connection, "SELECT idAccion FROM Configuracion.AccionesTipoTransaccion WHERE descripcion = '" + NomAccion + "'");
                    Resul2.Read();
                    int resultadoid2 = Resul2.GetInt32(0);
                    Int32 idaccion = resultadoid2;
                    connection.Close();


                    connection.Open();
                    ins = Ejecuta.ConsultaSinRetorno1(connection, "INSERT INTO Configuracion.EtapasAccionesTipoTransacciones VALUES(" + idTipoTransaccion + "," + idEtapa + "," + idaccion + ")");
                    connection.Close();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }


            return ins;
        }
        public bool InsertEtapasAccRol(int idTipoTransaccion, string nomEtapa, string NomAccion, string nombreRol)
        {

            SqlConnection connection = null;
            bool ins;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    connection.Open();
                    SqlDataReader Resul2 = Ejecuta.ConsultaConRetorno(connection, "SELECT idAccion FROM Configuracion.AccionesTipoTransaccion WHERE descripcion = '" + NomAccion + "'");
                    Resul2.Read();
                    int resultadoid2 = Resul2.GetInt32(0);
                    Int32 idaccion = resultadoid2;
                    connection.Close();

                    connection.Open();
                    SqlDataReader Resul3 = Ejecuta.ConsultaConRetorno(connection, "SELECT idRol FROM Seguridad.Roles WHERE nombreRol = '" + nombreRol + "'");
                    Resul3.Read();
                    int resultadoid3 = Resul3.GetInt32(0);
                    Int32 idrol = resultadoid3;
                    connection.Close();


                    connection.Open();
                    ins = Ejecuta.ConsultaSinRetorno1(connection, "INSERT INTO Configuracion.EtapasAccionesRoles VALUES(" + idTipoTransaccion + "," + Convert.ToInt32(nomEtapa.ToString()) + "," + idaccion + "," + idrol + ",2,'" + DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss") + "')");
                    connection.Close();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }


            return ins;
        }
        public bool InsertRNC(string NomCampo, int idTransaccion, int idetapa, int idaccion, int visible, int editable, int obligatorio, int idvisualisacion)
        {

            SqlConnection connection = null;
            bool ins;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    connection.Open();

                    SqlDataReader Resul = Ejecuta.ConsultaConRetorno(connection, "SELECT Max(idReglaNegocio)  FROM Configuracion.ReglasNegocioCamposxTipoTransaccion");
                    Resul.Read();
                    int resultadoid = Resul.GetInt32(0);
                    Int32 idRNC = resultadoid + 1;
                    connection.Close();

                    connection.Open();
                    SqlDataReader Resul2 = Ejecuta.ConsultaConRetorno(connection, "SELECT idCampo  FROM Configuracion.CamposDinamicosTransacciones where nombreCampo= '" + NomCampo + "'" + "and idTipoTransaccion= " + idTransaccion);
                    Resul2.Read();
                    int resultadoid2 = Resul2.GetInt32(0);
                    Int32 idCampo = resultadoid2;
                    connection.Close();

                    connection.Open();
                    ins = Ejecuta.ConsultaSinRetorno1(connection, "INSERT INTO Configuracion.ReglasNegocioCamposxTipoTransaccion  VALUES(" + idRNC + "," + idTransaccion + "," + idetapa + "," + idaccion + "," + idCampo + "," + visible + "," + editable + "," + obligatorio + "," + idvisualisacion + ",null,null,null,null,null,'" + DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss") + "')");
                    connection.Close();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }


            return ins;
        }
        public bool InsertFormulaD(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo, string cadenaGenerada)
        {
            SqlConnection connection = null;
            bool ins;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    connection.Open();

                    SqlDataReader Resul = Ejecuta.ConsultaConRetorno(connection, "SELECT MAX(idFormula) FROM Configuracion.Formulas");
                    Resul.Read();
                    int resultadoid = Resul.GetInt32(0);
                    Int32 idformula = resultadoid + 1;
                    connection.Close();



                    connection.Open();
                    ins = Ejecuta.ConsultaSinRetorno1(connection, "INSERT INTO Configuracion.Formulas VALUES(" + idformula + "," + idTipoTransaccion + "," + idEtapa + "," + idAccion + "," + idCampo + ",'" + cadenaGenerada + "')");
                    connection.Close();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }


            return ins;
        }
        public bool InsertReglasNegocioxAD(int idTipoTransaccion, int idEtapa, int idAccion, string cadenaGenerada, int idEtapaDestino)
        {
            SqlConnection connection = null;
            bool ins;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    connection.Open();

                    SqlDataReader Resul = Ejecuta.ConsultaConRetorno(connection, "SELECT MAX(idReglaxAccion) FROM Configuracion.ReglasNegocioxAccion");
                    Resul.Read();
                    int resultadoid = 0;
                    if (Resul.Read())
                    {
                         resultadoid = Resul.GetInt32(0);
                    }
                    Int32 idRegla= resultadoid + 1;
                    connection.Close();



                    connection.Open();
                    ins = Ejecuta.ConsultaSinRetorno1(connection, "INSERT INTO Configuracion.ReglasNegocioxAccion"
                                                                  + " VALUES("+ idRegla + ", "+ idTipoTransaccion + ", "+ idEtapa + ", "+ idAccion + ", "+ idEtapaDestino + ", '"+ cadenaGenerada + "', null, null); ");
                    connection.Close();
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }


            return ins;
        }
        #endregion
        // Metodos para Actualisar
        #region Update
        public bool UpdateCamposD(int idTipoTransaccion, string nombreUP, string nombreCampo, string decripcion, int idTipoDato, string longitud, int idNivel, int idTipoOperacion)
        {
            SqlConnection connection = null;
            bool resultUC = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    SqlDataReader Resul2 = Ejecuta.ConsultaConRetorno(connection, "SELECT idCampo  FROM Configuracion.CamposDinamicosTransacciones where nombreCampo= '" + nombreUP + "' and idTipoTransaccion =" + idTipoTransaccion);
                    Resul2.Read();
                    int resultadoid2 = Resul2.GetInt32(0);
                    Int32 idCampo = resultadoid2;
                    connection.Close();

                    connection.Open();
                    resultUC = Ejecuta.ConsultaSinRetorno1(connection, "UPDATE Configuracion.CamposDinamicosTransacciones SET nombreCampo = '" + nombreCampo + "', descripcion = '" + decripcion + "', idTipoDatoCampo = '" + idTipoDato + "', longitudCampo = '" + longitud + "', idNivel = '" + idNivel + "', idTipoOperacion = '" + idTipoOperacion + "' WHERE idCampo = " + idCampo);
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

            return resultUC;
        }
        public bool UpdateEtapasD(int IdTipoTransaccion, string nombreUP, String descripcion, int orden)
        {
            SqlConnection connection = null;
            bool resultUE = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    connection.Open();
                    SqlDataReader Resul = Ejecuta.ConsultaConRetorno(connection, "SELECT idEtapa FROM Configuracion.EtapasTipoTransaccion WHERE descripcion = '" + nombreUP + "' and idTipoTransaccion =" + IdTipoTransaccion);
                    Resul.Read();
                    int resultadoid = Resul.GetInt32(0);
                    Int32 idetapa = resultadoid;
                    connection.Close();

                    connection.Open();
                    resultUE = Ejecuta.ConsultaSinRetorno1(connection, "UPDATE Configuracion.EtapasTipoTransaccion SET descripcion = '" + descripcion + "',orden = '" + orden + "'WHERE idEtapa = " + idetapa);
                    connection.Close();

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

            return resultUE;
        }
        public bool UpdateAccionesD(string nombreUP, string cveAccion, string descripcion, int orden)
        {
            SqlConnection connection = null;
            bool resultUA = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    SqlDataReader Resul2 = Ejecuta.ConsultaConRetorno(connection, "SELECT idAccion FROM Configuracion.AccionesTipoTransaccion WHERE descripcion = '" + nombreUP + "'");
                    Resul2.Read();
                    int resultadoid2 = Resul2.GetInt32(0);
                    Int32 idaccion = resultadoid2;
                    connection.Close();


                    connection.Open();
                    resultUA = Ejecuta.ConsultaSinRetorno1(connection, "UPDATE Configuracion.AccionesTipoTransaccion SET cveAccion = '" + cveAccion + "',descripcion = '" + descripcion + "',orden = '" + orden + "' where idAccion = " + idaccion);
                    connection.Close();

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

            return resultUA;
        }
        public bool UpdateStatusD(int IdTipoTransaccion, int estatus)
        {
            SqlConnection connection = null;
            bool resultUA = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    resultUA = Ejecuta.ConsultaSinRetorno1(connection, "UPDATE Configuracion.TiposTransacciones SET idEstatusAlta = " + estatus + " ,fechaAlta = GETDATE() WHERE idTipoTransaccion=" + IdTipoTransaccion);
                    connection.Close();

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;

            }

            return resultUA;
        }
        public bool ActualisarComboboxD(string idCampo, int idTipoTransaccion, int idTipoTranConbo, string idReferencia, string nombreReferencia)
        {

            SqlConnection connection = null;
            bool resultUA = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    connection.Open();
                    SqlDataReader Resul2 = Ejecuta.ConsultaConRetorno(connection, "SELECT idCampo  FROM Configuracion.CamposDinamicosTransacciones where nombreCampo= '" + idCampo.ToString() + "' and idTipoTransaccion = " + idTipoTransaccion);
                    Resul2.Read();
                    int resultadoid2 = Resul2.GetInt32(0);
                    Int32 idCampof = resultadoid2;
                    connection.Close();






                    connection.Open();
                    resultUA = Ejecuta.ConsultaSinRetorno1(connection, "UPDATE Configuracion.ReglasNegocioCamposxTipoTransaccion"
                                                                        + " SET idTipoTransaccionReferencia = " + idTipoTranConbo + ","
                                                                        + " idReferencia = '" + idReferencia + "',"
                                                                        + " nombreReferencia = '" + nombreReferencia + "'"
                                                                        + " where idCampo = " + idCampof
                                                                        + " and idTipoTransaccion = " + idTipoTransaccion);
                    connection.Close();

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;

            }

            return resultUA;





        }
        public bool UpdateTipoTransaccionD(int IdTipoTransaccion, string descripcion, string clave, int idProceso, int idCatTipoTransac)
        {
            SqlConnection connection = null;
            bool resultUA = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    resultUA = Ejecuta.ConsultaSinRetorno1(connection, "UPDATE Configuracion.TiposTransacciones SET descripcion = '" + descripcion + "',cveTipoTransaccion = '" + clave + "',idProceso = " + idProceso + ",idCatTipoTransac = " + idCatTipoTransac + " WHERE idTipoTransaccion =" + IdTipoTransaccion);
                    connection.Close();

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;

            }

            return resultUA;
        }

        public bool UpdateCicloVidaD(string descripcion, int orden, string cveAccion, string descripcionN, int ordenN, string cveAccionN)
        {
            SqlConnection connection = null;
            bool resultUCV = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {



                    connection.Open();
                    resultUCV = Ejecuta.ConsultaSinRetorno1(connection, "UPDATE Configuracion.AccionesTipoTransaccion"
                                                                        + " SET descripcion = '" + descripcionN + "',"
                                                                        + " cveAccion = '" + cveAccionN + "',"
                                                                        + " orden = " + ordenN
                                                                        + " WHERE cveAccion = '" + cveAccion + "'"
                                                                        + " AND  descripcion = '" + descripcion + "'"
                                                                        + " AND orden = " + orden);
                    connection.Close();


                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;

            }

            return resultUCV;
        }

        public bool UpdateRNCTTD(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo, int visible, int editable, int obligatorio, int idVisualizacion)
        {
            SqlConnection connection = null;
            bool resultUCV = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {



                    connection.Open();
                    resultUCV = Ejecuta.ConsultaSinRetorno1(connection, "UPDATE Configuracion.ReglasNegocioCamposxTipoTransaccion"
                                                                        + " SET visible = " + visible + ","
                                                                        + " editable = " + visible + ","
                                                                        + " obligatorio = " + visible + ","
                                                                        + " idVisualizacion = " + visible
                                                                        + " WHERE idTipoTransaccion = " + idTipoTransaccion
                                                                        + " AND idEtapa = " + idEtapa
                                                                        + " AND idAccion = " + idAccion
                                                                        + " AND idCampo = " + idCampo);
                    connection.Close();


                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;

            }

            return resultUCV;
        }

        public bool updateReglasNegocioCamposxTTD(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo, string nombreReferencia, string idReferencia, int idTipoTransaccionReferencia)
        {
            SqlConnection connection = null;
            bool resultUCRNCTT = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {



                    connection.Open();
                    resultUCRNCTT = Ejecuta.ConsultaSinRetorno1(connection, "UPDATE Configuracion.ReglasNegocioCamposxTipoTransaccion"
                                                                        + " SET nombreReferencia = '" + nombreReferencia + "',"
                                                                        + " idReferencia = '" + idReferencia + "',"
                                                                        + " idTipoTransaccionReferencia = " + idTipoTransaccionReferencia
                                                                        + " WHERE idTipoTransaccion = " + idTipoTransaccion
                                                                        + " AND idEtapa = " + idEtapa
                                                                        + " AND idAccion = " + idAccion
                                                                        + " AND idCampo = " + idCampo);
                    connection.Close();


                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;

            }

            return resultUCRNCTT;
        }

        public bool updateReglasNegocioXCampoD(int idTipoTransaccion, int idEtapa, int idAccion, string nombrecampo, int newvisible, int neweditable, int newobligatorio, int newidVisualizacion)
        {
            SqlConnection connection = null;
            bool resultReglasNegocioXCampo = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    SqlDataReader Resul2 = Ejecuta.ConsultaConRetorno(connection, "SELECT idCampo  FROM Configuracion.CamposDinamicosTransacciones where nombreCampo= '" + nombrecampo + "'" + "and idTipoTransaccion= " + idTipoTransaccion);
                    Resul2.Read();
                    int resultadoid2 = Resul2.GetInt32(0);
                    Int32 idCampo = resultadoid2;
                    connection.Close();


                    connection.Open();
                    resultReglasNegocioXCampo = Ejecuta.ConsultaSinRetorno1(connection, "UPDATE Configuracion.ReglasNegocioCamposxTipoTransaccion"
                                                                                        + " SET visible = " + newvisible + ","
                                                                                        + " editable = " + neweditable + ","
                                                                                        + " obligatorio = " + newobligatorio + ","
                                                                                        + " idVisualizacion = " + newidVisualizacion
                                                                                        + " WHERE idTipoTransaccion = " + idTipoTransaccion
                                                                                        + " AND idEtapa = " + idEtapa
                                                                                        + " AND idAccion = " + idAccion
                                                                                        + " AND idCampo = " + idCampo);
                    connection.Close();


                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;

            }

            return resultReglasNegocioXCampo;
        }

        public bool updateCOMBOBOXD(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo, bool newnombreReferencia, bool newidReferencia, bool newidTipoTransaccionReferencia)
        {
            SqlConnection connection = null;
            bool resultCOMBOBOXD = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    

                    connection.Open();
                    resultCOMBOBOXD = Ejecuta.ConsultaSinRetorno1(connection, "UPDATE Configuracion.ReglasNegocioCamposxTipoTransaccion"
                                                                                        + " SET nombreReferencia = '" + newnombreReferencia + "',"
                                                                                        + " idReferencia = '" + newidReferencia + "',"
                                                                                        + " idTipoTransaccionReferencia = " + newidTipoTransaccionReferencia
                                                                                        + " WHERE idTipoTransaccion = " + idTipoTransaccion
                                                                                        + " AND idEtapa = " + idEtapa
                                                                                        + " AND idAccion = " + idAccion
                                                                                        + " AND idCampo = " + idCampo);
                    connection.Close();


                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;

            }

            return resultCOMBOBOXD;
        }

        public bool UpdateJsonAutoD(int idTipoTransaccion, int idEtapa, int idAccion,int idCampo, string CadenaJson)
        {
            SqlConnection connection = null;
            bool resultupdateJson = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {



                    connection.Open();
                    resultupdateJson = Ejecuta.ConsultaSinRetorno1(connection, "UPDATE Configuracion.ReglasNegocioCamposxTipoTransaccion " +
                                                                               " SET cadenaJsonHijos = '"+ CadenaJson + "' " +
                                                                               " WHERE idCampo = " + idCampo +
                                                                               " AND idEtapa = " + idEtapa +
                                                                               " AND idAccion = " + idAccion +
                                                                               " AND idTipoTransaccion = " + idTipoTransaccion);
                    connection.Close();


                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;

            }

            return resultupdateJson;
        }


        #endregion
        // Metodos para Eliminar
        #region Delete
        public bool DeleteCamposD(string nombreCampo)
        {
            SqlConnection connection = null;
            bool resultDC = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    SqlDataReader Resul2 = Ejecuta.ConsultaConRetorno(connection, "SELECT idCampo  FROM CamposDinamicosTransacciones where nombreCampo= '" + nombreCampo + "'");
                    Resul2.Read();
                    int resultadoid2 = Resul2.GetInt32(0);
                    Int32 idCampo = resultadoid2;
                    connection.Close();

                    connection.Open();
                    resultDC = Ejecuta.ConsultaSinRetorno1(connection, "DELETE CamposDinamicosTransacciones WHERE idCampo = " + idCampo);
                    connection.Close();

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

            return resultDC;
        }
        public bool DeleteEtapasD(string descripcion, int idTipoTransaccion)
        {
            SqlConnection connection = null;
            bool resultDE = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    SqlDataReader Resul = Ejecuta.ConsultaConRetorno(connection, "SELECT idEtapa FROM EtapasTipoTransaccion WHERE idTipoTransaccion = "+ idTipoTransaccion + " AND descripcion = '" + descripcion + "'");
                    Resul.Read();
                    int resultadoid = Resul.GetInt32(0);
                    Int32 idetapa = resultadoid;
                    connection.Close();

                    connection.Open();
                    resultDE = Ejecuta.ConsultaSinRetorno1(connection, "DELETE EtapasTipoTransaccion WHERE idEtapa = " + idetapa);
                    connection.Close();

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("" + ex.Message, ex, resultDE);
                throw;
            }

            return false;
        }
        public bool DeleteAccionesD(string descripcion)
        {
            SqlConnection connection = null;
            bool resultDA = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    SqlDataReader Resul2 = Ejecuta.ConsultaConRetorno(connection, "SELECT idAccion FROM AccionesTipoTransaccion WHERE descripcion = '" + descripcion + "'");
                    Resul2.Read();
                    int resultadoid2 = Resul2.GetInt32(0);
                    Int32 idaccion = resultadoid2;
                    connection.Close();

                    connection.Open();
                    resultDA = Ejecuta.ConsultaSinRetorno1(connection, "DELETE AccionesTipoTransaccion WHERE idAccion = " + idaccion);
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

            return resultDA;
        }
        public bool DeleteEtapasAccionesRolesD(int idTipoTransaccion, int idEtapa, int idAccion)
        {
            SqlConnection connection = null;
            bool resultDA = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    resultDA = Ejecuta.ConsultaSinRetorno1(connection, "DELETE EtapasAccionesRoles"
                                                                        + " WHERE idTipoTransaccion = " + idTipoTransaccion
                                                                        + " AND idEtapa = " + idEtapa
                                                                        + " AND idAccion =" + idAccion);
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

            return resultDA;
        }
        public bool DeleteEtapasAccionesTipoTransaccionesD(int idTipoTransaccion, int idEtapa, int idAccion)
        {
            SqlConnection connection = null;
            bool resultDA = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    resultDA = Ejecuta.ConsultaSinRetorno1(connection, "DELETE EtapasAccionesTipoTransacciones"
                                                                        + " WHERE idTipoTransaccion = " + idTipoTransaccion
                                                                        + " AND idEtapa = " + idEtapa
                                                                        + " AND idAccion =" + idAccion);
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

            return resultDA;
        }
        public bool DeleteFormulaD(int idTipoTransaccion, int idEtapa, int idAccion, int idcampo)
        {
            SqlConnection connection = null;
            bool resultDA = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    resultDA = Ejecuta.ConsultaSinRetorno1(connection, "DELETE Formulas"
                                                                       + " WHERE idTipoTransaccion = " + idTipoTransaccion
                                                                       + " and idEtapa = " + idEtapa
                                                                       + " and idAccion = " + idAccion
                                                                       + " and idCampo = " + idcampo);
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

            return resultDA;
        }
        public bool DeleteReglasNegocioXCampoD(int idTipoTransaccion, int idEtapa, int idAccion, int idcampo)
        {
            SqlConnection connection = null;
            bool resultDRNC = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    resultDRNC = Ejecuta.ConsultaSinRetorno1(connection, "DELETE ReglasNegocioCamposxTipoTransaccion"
                                                                        + " WHERE idTipoTransaccion = " + idTipoTransaccion
                                                                        + " AND idEtapa = " + idEtapa
                                                                        + " AND idAccion = " + idAccion
                                                                        + " AND idCampo = " + idcampo);
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

            return resultDRNC;
        }
        public bool DeleteReglasCamposD(int idTipoTransaccion, int idcampo)
        {
            SqlConnection connection = null;
            bool resultDRNC = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    resultDRNC = Ejecuta.ConsultaSinRetorno1(connection, "DELETE FROM ReglasNegocioCamposxTipoTransaccion"
                                                                         + " WHERE idTipoTransaccion = " + idTipoTransaccion
                                                                         + " AND idCampo = " + idcampo);
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

            return resultDRNC;
        }
        public bool DeleteCamposDinamicosD(int idTipoTransaccion,int idcampo)
        {
            SqlConnection connection = null;
            bool resultDRNC = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    resultDRNC = Ejecuta.ConsultaSinRetorno1(connection, "DELETE FROM CamposDinamicosTransacciones" 
                                                                         + " WHERE idTipoTransaccion = "+ idTipoTransaccion
                                                                         + " AND idCampo = "+ idcampo);
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

            return resultDRNC;
        }

        public string DeleteTransaccion(int idTipoTransaccion)
        {

            SqlConnection connection = null;
            string resultDTran = "";
            int resultadoid = 0;


            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT COUNT(*) Resultado " +
                        "FROM Configuracion.MAETransacciones MAE, Configuracion.ValoresCamposTransacciones VCT, Configuracion.BitacoraTransacciones BT " +
                        "WHERE MAE.idTransaccion = VCT.idTransaccion " +
                        "AND MAE.idTransaccion = BT.idTransaccion " +
                        "AND MAE.idTipoTransaccion =" + idTipoTransaccion);

                    consulta.Read();
                    resultadoid = consulta.GetInt32(0);
                    connection.Close();

                    if(resultadoid == 0)
                    {
                        //Eliminar 1
                        connection.Open();
                        consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT COUNT(*) " +
                            "FROM Configuracion.ReglasNegocioCamposxTipoTransaccion " +
                            "WHERE idTipoTransaccion = " + idTipoTransaccion);
                        consulta.Read();
                        int resultado1 = consulta.GetInt32(0);
                        connection.Close();
                        if (resultado1 > 0)
                        {
                            connection.Open();
                            bool result1 = Ejecuta.ConsultaSinRetorno1(connection, "DELETE FROM Configuracion.ReglasNegocioCamposxTipoTransaccion WHERE idTipoTransaccion = " + idTipoTransaccion);
                            connection.Close();
                            Console.WriteLine(result1);

                        }
                        //Eliminar 2
                        connection.Open();
                        consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT COUNT(*) FROM Configuracion.ReglasNegocioxAccion WHERE idTipoTransaccion = " + idTipoTransaccion);
                        consulta.Read();
                        int resultado2 = consulta.GetInt32(0);
                        connection.Close();

                        if (resultado2 > 0)
                        {
                            connection.Open();
                             bool result2 = Ejecuta.ConsultaSinRetorno1(connection, "DELETE FROM Configuracion.ReglasNegocioxAccion WHERE idTipoTransaccion = " + idTipoTransaccion);
                            connection.Close();
                            Console.WriteLine(result2);

                        }
                        //Eliminar 3
                        connection.Open();
                        consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT COUNT(*) FROM Configuracion.Formulas WHERE idTipoTransaccion = " + idTipoTransaccion);
                        consulta.Read();
                        int resultado3 = consulta.GetInt32(0);
                        connection.Close();

                        if (resultado3 > 0)
                        {
                            connection.Open();
                            bool result3 = Ejecuta.ConsultaSinRetorno1(connection, "DELETE FROM Configuracion.Formulas WHERE idTipoTransaccion = " + idTipoTransaccion);
                            connection.Close();
                            Console.WriteLine(result3);
                        }
                        //Eliminar 4
                        connection.Open();
                        consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT COUNT(*) FROM Configuracion.EtapasAccionesRoles WHERE idTipoTransaccion = " + idTipoTransaccion);
                        consulta.Read();
                        int resultado4 = consulta.GetInt32(0);
                        connection.Close();

                        if (resultado4 > 0)
                        {
                            connection.Open();
                            bool result4 = Ejecuta.ConsultaSinRetorno1(connection, "DELETE FROM Configuracion.EtapasAccionesRoles WHERE idTipoTransaccion = " + idTipoTransaccion);
                            connection.Close();
                            Console.WriteLine(result4);

                        }
                        //Eliminar 5
                        connection.Open();
                        consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT COUNT(*) FROM Configuracion.EtapasAccionesTipoTransacciones WHERE idTipoTransaccion = " + idTipoTransaccion);
                        consulta.Read();
                        int resultado5 = consulta.GetInt32(0);
                        connection.Close();

                        if (resultado5 > 0)
                        {
                            connection.Open();
                            bool result5 = Ejecuta.ConsultaSinRetorno1(connection, "DELETE FROM Configuracion.EtapasAccionesTipoTransacciones WHERE idTipoTransaccion = " + idTipoTransaccion);
                            connection.Close();
                            Console.WriteLine(result5);

                        }
                        //Eliminar 6
                        connection.Open();
                        consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT COUNT(*) FROM Configuracion.EtapasTipoTransaccion WHERE idTipoTransaccion = " + idTipoTransaccion);
                        consulta.Read();
                        int resultado6 = consulta.GetInt32(0);
                        connection.Close();

                        if (resultado6 > 0)
                        {
                            connection.Open();
                            bool result6 = Ejecuta.ConsultaSinRetorno1(connection, "DELETE FROM EtapasTipoTransaccion WHERE idTipoTransaccion = " + idTipoTransaccion);
                            connection.Close();
                            Console.WriteLine(result6);

                        }
                        //Eliminar 7
                        connection.Open();
                        consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT COUNT(*) FROM Configuracion.AccionesTipoTransaccion WHERE idTipoTransaccion = " + idTipoTransaccion);
                        consulta.Read();
                        int resultado7 = consulta.GetInt32(0);
                        connection.Close();

                        if (resultado7 > 0)
                        {
                            connection.Open();
                            bool result7 = Ejecuta.ConsultaSinRetorno1(connection, "DELETE FROM Configuracion.AccionesTipoTransaccion WHERE idTipoTransaccion = " + idTipoTransaccion);
                            connection.Close();
                            Console.WriteLine(result7);

                        }
                        //Eliminar 8
                        connection.Open();
                        consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT COUNT(*) FROM Configuracion.CamposDinamicosTransacciones WHERE idTipoTransaccion = " + idTipoTransaccion);
                        consulta.Read();
                        int resultado8 = consulta.GetInt32(0);
                        connection.Close();

                        if (resultado8 > 0)
                        {
                            connection.Open();
                            bool result8 = Ejecuta.ConsultaSinRetorno1(connection, "DELETE FROM Configuracion.CamposDinamicosTransacciones WHERE idTipoTransaccion = " + idTipoTransaccion);
                            connection.Close();
                            Console.WriteLine(result8);

                        }
                        //Eliminar 9
                        connection.Open();
                        consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT COUNT(*) FROM Configuracion.TiposTransacciones WHERE idTipoTransaccion = " + idTipoTransaccion);
                        consulta.Read();
                        int resultado9 = consulta.GetInt32(0);
                        connection.Close();

                        if (resultado9 > 0)
                        {
                            connection.Open();
                            bool result9 = Ejecuta.ConsultaSinRetorno1(connection, "DELETE FROM Configuracion.TiposTransacciones WHERE idTipoTransaccion = " + idTipoTransaccion);
                            connection.Close();
                            Console.WriteLine(result9);

                        }
                        resultDTran = "La transacción fue eliminada";
                    }
                    else
                    {
                        resultDTran = "La transacción ya cuenta con valores";
                    }

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("" + ex.Message, ex);

                throw;
            }

            return resultDTran;

        }

        public bool DeleteCamposConbobox(int idTipoTransaccion, int idcampo)
        {
            SqlConnection connection = null;
            bool resultDRNC = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    resultDRNC = Ejecuta.ConsultaSinRetorno1(connection, "UPDATE ReglasNegocioCamposxTipoTransaccion"
                                                                         + " SET  idTipoTransaccionReferencia = NULL,"
                                                                         + " idReferencia = 'NULL',"
                                                                         + " nombreReferencia = 'NULL'"
                                                                         + " WHERE idTipoTransaccion = "+ idTipoTransaccion
                                                                         + " AND idCampo = "+ idcampo);
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

            return resultDRNC;
        }
        public bool DeleteReglasNegocioxAD(int idTipoTransaccion,int idEtapa,int idAccion,int idEtapaF)
        {
            SqlConnection connection = null;
            bool resultDRNC = false;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    resultDRNC = Ejecuta.ConsultaSinRetorno1(connection, "DELETE ReglasNegocioxAccion"
                                                                         + " WHERE idTipoTransaccion = " + idTipoTransaccion
                                                                         + " AND idEtapa = "+ idEtapa
                                                                         + " AND idAccion = "+ idAccion
                                                                         + " AND idEtapaDestino = " + idEtapaF);
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

            return resultDRNC;
        }

        #endregion
        // Metodos para Connsultas
        #region Select
        public Entidades.TransaccionGralA EtapasTransaccionD(int idTipoTransaccion)
        {
            Entidades.TransaccionGralA etapas = new Entidades.TransaccionGralA();
            List<Entidades.EtapasTransaccion> composCon = new List<Entidades.EtapasTransaccion>();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT idEtapa,descripcion,orden,predecesor,idTipoTransaccion   FROM Configuracion.EtapasTipoTransaccion where idTipoTransaccion = " + idTipoTransaccion + " order by idEtapa asc");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.EtapasTransaccion compos = new Entidades.EtapasTransaccion();
                    compos.descripcion = rowDet["descripcion"].ToString();
                    compos.Orden = Convert.ToInt32(rowDet["orden"].ToString());
                    composCon.Add(compos);
                }

                etapas.etapaslista = composCon.ToArray();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            return etapas;

        }
        public Entidades.DTCamposDinamicos DTCamposD(int idTipoTransaccion)
        {

            Entidades.DTCamposDinamicos ReturnCampos = new Entidades.DTCamposDinamicos();
            List<Entidades.DTregistrosCampos> ListaCampos = new List<Entidades.DTregistrosCampos>();
            SqlConnection connection = null;
            DataTable dt = new DataTable();
            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();

                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT idCampo,NT.idNivel, NT.descripcion Nivel,CDT.nombreCampo,CDT.descripcion,TDC.idTipoDatoCampo, TDC.abreviatura TipoDato, TiO.idTipoOperacion, TiO.descripcion Operacion, longitudCampo" +
                                                                      " FROM Configuracion.CamposDinamicosTransacciones CDT, Configuracion.NivelTransacciones NT, Configuracion.TiposDatoCampos TDC, Configuracion.TiposOperaciones TiO" +
                                                                      " where CDT.idNivel = NT.idNivel and CDT.idTipoDatoCampo = TDC.idTipoDatoCampo and CDT.idTipoOperacion = TiO.idTipoOperacion and idTipoTransaccion = " + idTipoTransaccion +
                                                                      " order by idCampo asc");
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTregistrosCampos valores1 = new Entidades.DTregistrosCampos();
                    if (rowDet["idCampo"].ToString() != "") { valores1.idCampo = Convert.ToInt32(rowDet["idCampo"].ToString()); } else { valores1.idCampo = 0; }
                    if (rowDet["nombreCampo"].ToString() != "") { valores1.nombreCampo = rowDet["nombreCampo"].ToString(); } else { valores1.nombreCampo = ""; }
                    if (rowDet["descripcion"].ToString() != "") { valores1.descCampo = rowDet["descripcion"].ToString(); } else { valores1.descCampo = ""; }
                    if (rowDet["Nivel"].ToString() != "") { valores1.Nivel = rowDet["Nivel"].ToString(); } else { valores1.Nivel = ""; }
                    if (rowDet["idNivel"].ToString() != "") { valores1.idNivel = rowDet["idNivel"].ToString(); } else { valores1.idNivel = ""; }
                    if (rowDet["TipoDato"].ToString() != "") { valores1.TipoDato = rowDet["TipoDato"].ToString(); } else { valores1.TipoDato = ""; }
                    if (rowDet["idTipoDatoCampo"].ToString() != "") { valores1.idTipoDato = rowDet["idTipoDatoCampo"].ToString(); } else { valores1.idTipoDato = ""; }
                    if (rowDet["Operacion"].ToString() != "") { valores1.Operacion = rowDet["Operacion"].ToString(); } else { valores1.Operacion = ""; }
                    if (rowDet["idTipoOperacion"].ToString() != "") { valores1.idOperacion = rowDet["idTipoOperacion"].ToString(); } else { valores1.idOperacion = ""; }
                    if (rowDet["longitudCampo"].ToString() != "") { valores1.longitud = Convert.ToInt32(rowDet["longitudCampo"].ToString()); } else { valores1.longitud = 0; }
                    ListaCampos.Add(valores1);

                }

                ReturnCampos.ListCamposTransaccion = ListaCampos.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }

            return ReturnCampos;
        }
        public Entidades.LisFormula DTFormulasD(int idTipoTransaccion, int idEtapa, int idAccion)
        {

            Entidades.LisFormula ReturnCampos = new Entidades.LisFormula();
            List<Entidades.DTFormula> ListaCampos = new List<Entidades.DTFormula>();
            SqlConnection connection = null;
            DataTable dt = new DataTable();
            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT ETT.descripcion NombreEtapa, ATT.descripcion NombreAccion, F.cadenaGenerada Formula, ETT.idEtapa, ATT.idAccion FROM Configuracion.TiposTransacciones TT, Configuracion.AccionesTipoTransaccion ATT, Configuracion.EtapasTipoTransaccion ETT, Configuracion.EtapasAccionesTipoTransacciones EATT, Configuracion.Formulas F, Configuracion.CamposDinamicosTransacciones CDT WHERE ETT.idEtapa = EATT.idEtapa AND EATT.idAccion = ATT.idAccion AND TT.idTipoTransaccion = EATT.idTipoTransaccion AND F.idTipoTransaccion = TT.idTipoTransaccion AND CDT.idCampo = F.idCampo AND ETT.idEtapa = " + idEtapa + " AND ATT.idAccion = " + idAccion + " AND TT.idTipoTransaccion = " + idTipoTransaccion);
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTFormula valores1 = new Entidades.DTFormula();
                    valores1.idAccion = rowDet["idAccion"].ToString();
                    valores1.idEtapa = rowDet["idEtapa"].ToString();
                    valores1.nombreAccion = rowDet["NombreAccion"].ToString();
                    valores1.nombreEtapa = rowDet["NombreEtapa"].ToString();
                    valores1.formula = rowDet["Formula"].ToString();
                    ListaCampos.Add(valores1);

                }

                ReturnCampos.listFormula = ListaCampos.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }

            return ReturnCampos;
        }
        public Entidades.DTCamposDinamicos CamposConboboxD(int idTipotransaccion,int idEtapa,int idAccion)
        {
            List<Entidades.DTregistrosCampos> composCon = new List<Entidades.DTregistrosCampos>();

            Entidades.DTCamposDinamicos camposconbo = new Entidades.DTCamposDinamicos();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT CDT.nombreCampo"
                                                                      + " FROM Configuracion.ReglasNegocioCamposxTipoTransaccion RNCT, Configuracion.VisualizacionTipoTransacciones VTT, Configuracion.CamposDinamicosTransacciones CDT"
                                                                      + " where RNCT.idCampo = CDT.idCampo"
                                                                      + " and RNCT.idVisualizacion = VTT.idVisualizacion"
                                                                      + " and RNCT.idVisualizacion = 24"
                                                                      + " and CDT.idTipoTransaccion = "+ idTipotransaccion
                                                                      + " and RNCT.idEtapa = "+ idEtapa
                                                                      + " and RNCT.idAccion = " + idAccion
                                                                      + " order by RNCT.idCampo asc");
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTregistrosCampos compos = new Entidades.DTregistrosCampos();
                    compos.nombreCampo = rowDet["nombreCampo"].ToString();
                    composCon.Add(compos);
                }

                camposconbo.ListCamposTransaccion = composCon.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }


            return camposconbo;

        }
        public Entidades.DTCamposDinamicos DTCabezera(int idTipotransaccion)
        {
            Entidades.DTCamposDinamicos ReturnCampos = new Entidades.DTCamposDinamicos();
            List<Entidades.DTregistrosCampos> composCon = new List<Entidades.DTregistrosCampos>();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT CDT.nombreCampo FROM Configuracion.TiposTransacciones TT, Configuracion.NivelTransacciones NT, Configuracion.CamposDinamicosTransacciones CDT WHERE TT.idTipoTransaccion = CDT.idTipoTransaccion AND CDT.idNivel = NT.idNivel AND TT.idTipoTransaccion = " + idTipotransaccion + " AND NT.descripcion = 'Cabecera'");
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTregistrosCampos compos = new Entidades.DTregistrosCampos();
                    compos.nombreCampo = rowDet["nombreCampo"].ToString();
                    composCon.Add(compos);
                }

                ReturnCampos.ListCamposTransaccion = composCon.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }


            return ReturnCampos;

        }
        public Entidades.DTCamposDinamicos DTDetalle(int idTipotransaccion)
        {
            Entidades.DTCamposDinamicos ReturnCampos = new Entidades.DTCamposDinamicos();
            List<Entidades.DTregistrosCampos> composCon = new List<Entidades.DTregistrosCampos>();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT CDT.nombreCampo FROM Configuracion.TiposTransacciones TT, Configuracion.NivelTransacciones NT, Configuracion.CamposDinamicosTransacciones CDT WHERE TT.idTipoTransaccion = CDT.idTipoTransaccion AND CDT.idNivel = NT.idNivel AND TT.idTipoTransaccion = " + idTipotransaccion + " AND NT.descripcion = 'Detalle'");
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTregistrosCampos compos = new Entidades.DTregistrosCampos();
                    compos.nombreCampo = rowDet["nombreCampo"].ToString();
                    composCon.Add(compos);
                }

                ReturnCampos.ListCamposTransaccion = composCon.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }


            return ReturnCampos;

        }
        public Entidades.DTCamposDinamicos ListCamposAbiertoD(int idTipotransaccion)
        {
            Entidades.DTCamposDinamicos ReturnCampos = new Entidades.DTCamposDinamicos();
            List<Entidades.DTregistrosCampos> composCon = new List<Entidades.DTregistrosCampos>();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT CDT.nombreCampo,CDT.idCampo "
                                                                        + " FROM Configuracion.TiposTransacciones TT, Configuracion.CamposDinamicosTransacciones CDT"
                                                                        + " WHERE CDT.idTipoTransaccion = TT.idTipoTransaccion"
                                                                        + " AND CDT.idTipoOperacion = 1"
                                                                        + " AND TT.idTipoTransaccion = " + idTipotransaccion
                                                                        + " order by CDT.idCampo asc ");

                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTregistrosCampos compos = new Entidades.DTregistrosCampos();
                    compos.nombreCampo = rowDet["nombreCampo"].ToString();
                    compos.idCampoC = rowDet["idCampo"].ToString();
                    composCon.Add(compos);
                }

                ReturnCampos.ListCamposTransaccion = composCon.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }


            return ReturnCampos;

        }
        public Entidades.DTCamposDinamicos CamposD(int idTipotransaccion)
        {
            List<Entidades.DTregistrosCampos> composCon = new List<Entidades.DTregistrosCampos>();
            Entidades.DTCamposDinamicos lista = new Entidades.DTCamposDinamicos();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT idCampo,nombreCampo,descripcion"
                                                                      + " FROM Configuracion.CamposDinamicosTransacciones"
                                                                      + " where idTipoTransaccion = " + idTipotransaccion
                                                                      + " order by nombreCampo asc ");
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTregistrosCampos compos = new Entidades.DTregistrosCampos();
                    compos.idCampo = Convert.ToInt32(rowDet["idCampo"].ToString());
                    compos.nombreCampo = rowDet["nombreCampo"].ToString();
                    compos.descCampo = rowDet["descripcion"].ToString();
                    composCon.Add(compos);
                }

                lista.ListCamposTransaccion = composCon.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }


            return lista;

        }
        public Entidades.DTCamposDinamicos CamposCabeceraD(int idTipotransaccion, int idEtapa, int idAccion)
        {
            List<Entidades.DTregistrosCampos> composCon = new List<Entidades.DTregistrosCampos>();

            Entidades.DTCamposDinamicos camposconbo = new Entidades.DTCamposDinamicos();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT  CDT.nombreCampo,CDT.idCampo"
                                                                      + " FROM Configuracion.ReglasNegocioCamposxTipoTransaccion RN,"
                                                                      + " Configuracion.EtapasTipoTransaccion ETT, Configuracion.AccionesTipoTransaccion ATT,"
                                                                      + " Configuracion.EtapasAccionesTipoTransacciones EATT, Configuracion.CamposDinamicosTransacciones CDT,"
                                                                      + " Configuracion.TiposTransacciones TT, Configuracion.VisualizacionTipoTransacciones VTT"
                                                                      + " WHERE RN.idAccion = ATT.idAccion"
                                                                      + " AND RN.idAccion = EATT.idAccion"
                                                                      + " AND RN.idEtapa = ETT.idEtapa"
                                                                      + " AND RN.idEtapa = EATT.idEtapa"
                                                                      + " AND RN.idTipoTransaccion = EATT.idTipoTransaccion"
                                                                      + " AND RN.idCampo = CDT.idCampo"
                                                                      + " AND RN.idTipoTransaccion = CDT.idTipoTransaccion"
                                                                      + " AND RN.idTipoTransaccion = TT.idTipoTransaccion"
                                                                      + " AND RN.idVisualizacion = VTT.idVisualizacion"
                                                                      + " AND RN.idEtapa = "+ idEtapa
                                                                      + " AND RN.idAccion = "+ idAccion
                                                                      + " AND RN.idTipoTransaccion = "+ idTipotransaccion
                                                                      + " AND CDT.idNivel = 1");
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTregistrosCampos compos = new Entidades.DTregistrosCampos();
                    compos.nombreCampo = rowDet["nombreCampo"].ToString();
                    compos.idCampo = Convert.ToInt32(rowDet["idCampo"].ToString());
                    composCon.Add(compos);
                }

                camposconbo.ListCamposTransaccion = composCon.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }


            return camposconbo;

        }
        public Entidades.DTCamposDinamicos CamposDetalleD(int idTipotransaccion, int idEtapa, int idAccion)
        {
            List<Entidades.DTregistrosCampos> composCon = new List<Entidades.DTregistrosCampos>();

            Entidades.DTCamposDinamicos camposconbo = new Entidades.DTCamposDinamicos();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT  CDT.nombreCampo,CDT.idCampo"
                                                                      + " FROM Configuracion.ReglasNegocioCamposxTipoTransaccion RN,"
                                                                      + " Configuracion.EtapasTipoTransaccion ETT, Configuracion.AccionesTipoTransaccion ATT,"
                                                                      + " Configuracion.EtapasAccionesTipoTransacciones EATT, Configuracion.CamposDinamicosTransacciones CDT,"
                                                                      + " Configuracion.TiposTransacciones TT, Configuracion.VisualizacionTipoTransacciones VTT"
                                                                      + " WHERE RN.idAccion = ATT.idAccion"
                                                                      + " AND RN.idAccion = EATT.idAccion"
                                                                      + " AND RN.idEtapa = ETT.idEtapa"
                                                                      + " AND RN.idEtapa = EATT.idEtapa"
                                                                      + " AND RN.idTipoTransaccion = EATT.idTipoTransaccion"
                                                                      + " AND RN.idCampo = CDT.idCampo"
                                                                      + " AND RN.idTipoTransaccion = CDT.idTipoTransaccion"
                                                                      + " AND RN.idTipoTransaccion = TT.idTipoTransaccion"
                                                                      + " AND RN.idVisualizacion = VTT.idVisualizacion"
                                                                      + " AND RN.idEtapa = " + idEtapa
                                                                      + " AND RN.idAccion = " + idAccion
                                                                      + " AND RN.idTipoTransaccion = " + idTipotransaccion
                                                                      + " AND CDT.idNivel = 2");
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTregistrosCampos compos = new Entidades.DTregistrosCampos();
                    compos.nombreCampo = rowDet["nombreCampo"].ToString();
                    compos.idCampo = Convert.ToInt32(rowDet["idCampo"].ToString());
                    composCon.Add(compos);
                }

                camposconbo.ListCamposTransaccion = composCon.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }


            return camposconbo;

        }
        public Entidades.DTCamposDinamicos campCombD(int idTipotransaccion, int idEtapa, int idAccion)
        {
            List<Entidades.DTregistrosCampos> composCon = new List<Entidades.DTregistrosCampos>();
            Entidades.DTCamposDinamicos camposconbo = new Entidades.DTCamposDinamicos();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT CDT.idCampo, CDT.nombreCampo"
                                                                       + " FROM Configuracion.ReglasNegocioCamposxTipoTransaccion RNCT, Configuracion.VisualizacionTipoTransacciones VTT, Configuracion.CamposDinamicosTransacciones CDT"
                                                                       + " where RNCT.idCampo = CDT.idCampo"
                                                                       + " and RNCT.idVisualizacion = VTT.idVisualizacion"
                                                                       + " and RNCT.idVisualizacion = 24"
                                                                       + " and CDT.idTipoTransaccion = "+ idTipotransaccion
                                                                       + " and RNCT.idEtapa = "+ idEtapa
                                                                       + " and RNCT.idAccion = "+ idAccion+ " order by CDT.nombreCampo ASC");





                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTregistrosCampos compos = new Entidades.DTregistrosCampos();
                    compos.nombreCampo = rowDet["nombreCampo"].ToString();
                    compos.idCampo = Convert.ToInt32(rowDet["idCampo"].ToString());
                    composCon.Add(compos);
                }

                camposconbo.ListCamposTransaccion = composCon.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }




            return camposconbo;
        }
        public Entidades.Autocompletar campNCombD(int idTipotransaccion, int idEtapa, int idAccion, int idCampo)
        {
            ConvertJsonToDataset convertidor = new ConvertJsonToDataset();
            List<Entidades.autoCampos> composCon = new List<Entidades.autoCampos>();
            Entidades.Autocompletar camposconbo = new Entidades.Autocompletar();
            SqlConnection connection = null;
            DataTable dtCampos = new DataTable();
            DataTable dtJson = new DataTable();
            DataSet dtCamJson = new DataSet();
            DataTable copia = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT CDT.idCampo, CDT.nombreCampo"
                                                                      + " FROM Configuracion.ReglasNegocioCamposxTipoTransaccion RNCT, VisualizacionTipoTransacciones VTT, CamposDinamicosTransacciones CDT"
                                                                      + " where RNCT.idCampo = CDT.idCampo"
                                                                      + " and RNCT.idVisualizacion = VTT.idVisualizacion"
                                                                      + " and RNCT.idVisualizacion <> 24"
                                                                      + " and CDT.idTipoTransaccion = "+ idTipotransaccion
                                                                      + " and RNCT.idEtapa = "+ idEtapa
                                                                      + " and RNCT.idAccion = "+ idAccion);
                    dtCampos.Load(consulta);
                    connection.Close();


                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT RNCT.cadenaJsonHijos"
                                                                       + " FROM Configuracion.ReglasNegocioCamposxTipoTransaccion RNCT, VisualizacionTipoTransacciones VTT, CamposDinamicosTransacciones CDT"
                                                                       + " where RNCT.idCampo = CDT.idCampo"
                                                                       + " and RNCT.idVisualizacion = VTT.idVisualizacion"
                                                                       + " and RNCT.idVisualizacion = 24"
                                                                       + " and CDT.idTipoTransaccion = "+ idTipotransaccion
                                                                       + " and RNCT.idEtapa = "+ idEtapa
                                                                       + " and RNCT.idAccion = "+ idAccion
                                                                       + " and CDT.idCampo = "+ idCampo);
                    dtJson.Load(consulta);
                    connection.Close();

                }

                

                foreach (DataRow rowDet in dtJson.Rows)
                {
                    dtCamJson = convertidor.ConvertJsonStringToDataSet(rowDet["cadenaJsonHijos"].ToString());
    
                }

                if (dtCamJson.Tables.Count != 0)
                {
                    DataTable dataJson = dtCamJson.Tables["Hijo"];
                      copia = dataJson;
                }
                else
                {
                    copia.Columns.Add("idCampo");
                    copia.Columns.Add("primarykey");
                    copia.Columns.Add("Types");
                    copia.Columns.Add("idCategoria");
                    copia.Columns.Add("idTransaccion");
                    copia.Columns.Add("idRef");
                    copia.Columns.Add("CampoRef");

                    foreach (DataRow varr in dtCampos.Rows)
                    {

                        DataRow row = copia.NewRow();
                        row["idCampo"] = varr["nombreCampo"].ToString();
                        row["primarykey"] = "";
                        row["Types"] = "";
                        row["idCategoria"] = "";
                        row["idTransaccion"] = "";
                        row["idRef"] = "";
                        row["CampoRef"] = "";

                        copia.Rows.Add(row);

                    }



                }







                foreach (DataRow rowDet in copia.Rows)
                {
                    Entidades.autoCampos compos = new Entidades.autoCampos();

                    if (rowDet["idCampo"].ToString() != "") { compos.idCampo = rowDet["idCampo"].ToString(); } else { compos.idCampo = ""; }
                    if (rowDet["primarykey"].ToString() != "") { compos.primarykey = rowDet["primarykey"].ToString(); } else { compos.primarykey = ""; }
                    if (rowDet["Types"].ToString() != "") { compos.Types = rowDet["Types"].ToString(); } else { compos.Types = ""; }
                    if (rowDet["idCategoria"].ToString() != "") { compos.idCategoria = Convert.ToInt32(rowDet["idCategoria"].ToString()); } else { compos.idCategoria = 0; }
                    if (rowDet["idTransaccion"].ToString() != "") { compos.idTransaccion = Convert.ToInt32(rowDet["idTransaccion"].ToString()); } else { compos.idTransaccion = 0; }
                    if (rowDet["idRef"].ToString() != "") { compos.idRef = rowDet["idRef"].ToString(); } else { compos.idRef = ""; }
                    if (rowDet["CampoRef"].ToString() != "") { compos.CampoRef = rowDet["CampoRef"].ToString(); } else { compos.CampoRef = ""; }

                    composCon.Add(compos);
                }

                camposconbo.listaCamp = composCon.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }




            return camposconbo;
        }
        public Entidades.DTCamposDinamicos campJsonD(int idTipotransaccion, int idEtapa, int idAccion,string nombreCampo)
        {
            List<Entidades.DTregistrosCampos> composCon = new List<Entidades.DTregistrosCampos>();
            Entidades.DTCamposDinamicos camposconbo = new Entidades.DTCamposDinamicos();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT CDT.nombreCampo idCampo, idReferencia PrimaryKey"
                                                                       + " FROM Configuracion.ReglasNegocioCamposxTipoTransaccion RNCT, VisualizacionTipoTransacciones VTT, CamposDinamicosTransacciones CDT"
                                                                       + " where RNCT.idCampo = CDT.idCampo"
                                                                       + " and RNCT.idVisualizacion = VTT.idVisualizacion"
                                                                       + " and RNCT.idVisualizacion = 24"
                                                                       + " and CDT.idTipoTransaccion = "+ idTipotransaccion
                                                                       + " and RNCT.idEtapa = "+ idEtapa
                                                                       + " and RNCT.idAccion = "+ idAccion
                                                                       + " and CDT.nombreCampo ='" + nombreCampo + "'");
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTregistrosCampos compos = new Entidades.DTregistrosCampos();
                    compos.nombreCampo = rowDet["idCampo"].ToString();
                    compos.idReferencia = rowDet["PrimaryKey"].ToString();
                    composCon.Add(compos);
                }

                camposconbo.ListCamposTransaccion = composCon.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }




            return camposconbo;
        }
        public Entidades.DTCamposDinamicos selectDeleteCampoDinamico(int idTipoTransaccion,int idCampo) {

            List<Entidades.DTregistrosCampos> composCon = new List<Entidades.DTregistrosCampos>();
            Entidades.DTCamposDinamicos camposconbo = new Entidades.DTCamposDinamicos();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT (select COUNT(*) "
                                                                       + " FROM Configuracion.CamposDinamicosTransacciones CDT"
                                                                       + " INNER JOIN Configuracion.ReglasNegocioCamposxTipoTransaccion RNC"
                                                                       + " ON RNC.idCampo = CDT.idCampo"
                                                                       + " WHERE CDT.idTipoTransaccion = " + idTipoTransaccion +")"
                                                                       + " AS campo,visible,editable,obligatorio,idVisualizacion "
                                                                       + " FROM Configuracion.ReglasNegocioCamposxTipoTransaccion "
                                                                       + " WHERE idCampo = "+ idCampo + " AND idTipoTransaccion = "+ idTipoTransaccion);
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTregistrosCampos compos = new Entidades.DTregistrosCampos();
                    compos.valorSelect = Convert.ToInt32(rowDet["campo"].ToString());
                    compos.valorVisible = rowDet["visible"].ToString();
                    compos.valorEditable = rowDet["editable"].ToString();
                    compos.valorObligatorio = rowDet["obligatorio"].ToString();
                    compos.valorVisualizacion = rowDet["idVisualizacion"].ToString();
                    composCon.Add(compos);
                }

                camposconbo.ListCamposTransaccion = composCon.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }




            return camposconbo;
        }
        public Entidades.DTCamposDinamicos selectDeleteEtapa(int idTipoTransaccion, string nombre)
        {

            List<Entidades.DTregistrosCampos> composCon = new List<Entidades.DTregistrosCampos>();
            Entidades.DTCamposDinamicos camposconbo = new Entidades.DTCamposDinamicos();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT COUNT(*) AS campo"
                                                                       + " FROM EtapasAccionesTipoTransacciones"
                                                                       + " WHERE idTipoTransaccion = " + idTipoTransaccion + ""
                                                                       + " AND idEtapa = (select idEtapa "
                                                                       + " from EtapasTipoTransaccion "
                                                                       + " WHERE idTipoTransaccion = " + idTipoTransaccion + " AND descripcion ='" + nombre+"')");
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTregistrosCampos compos = new Entidades.DTregistrosCampos();
                    compos.valorSelect = Convert.ToInt32(rowDet["campo"].ToString());
                    composCon.Add(compos);
                }

                camposconbo.ListCamposTransaccion = composCon.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }




            return camposconbo;
        }
        public Entidades.DTCamposDinamicos selectDeleteAccionxRnc(int idTipoTransaccion, int idAccion)
        {

            List<Entidades.DTregistrosCampos> composCon = new List<Entidades.DTregistrosCampos>();
            Entidades.DTCamposDinamicos camposconbo = new Entidades.DTCamposDinamicos();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT (select COUNT(*) "
                                                                       + " FROM CamposDinamicosTransacciones CDT"
                                                                       + " INNER JOIN ReglasNegocioCamposxTipoTransaccion RNC"
                                                                       + " ON RNC.idCampo = CDT.idCampo"
                                                                       + " WHERE CDT.idTipoTransaccion = " + idTipoTransaccion + ")"
                                                                       + " AS campo,visible,editable,obligatorio,idVisualizacion,idCampo  "
                                                                       + " FROM ReglasNegocioCamposxTipoTransaccion "
                                                                       + " WHERE idAccion = " + idAccion + " AND idTipoTransaccion = " + idTipoTransaccion);
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTregistrosCampos compos = new Entidades.DTregistrosCampos();
                    compos.valorSelect = Convert.ToInt32(rowDet["campo"].ToString());
                    compos.valorVisible = rowDet["visible"].ToString();
                    compos.valorEditable = rowDet["editable"].ToString();
                    compos.valorObligatorio = rowDet["obligatorio"].ToString();
                    compos.valorVisualizacion = rowDet["idVisualizacion"].ToString();
                    compos.idCampo = Convert.ToInt32(rowDet["idCampo"].ToString());
                    composCon.Add(compos);
                }

                camposconbo.ListCamposTransaccion = composCon.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }




            return camposconbo;
        }
        public Entidades.DTCamposDinamicos selectDeleteAccionxCombo(int idTipoTransaccion, int idAccion)
        {

            List<Entidades.DTregistrosCampos> composCon = new List<Entidades.DTregistrosCampos>();
            Entidades.DTCamposDinamicos camposconbo = new Entidades.DTCamposDinamicos();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "select COUNT(*) AS campo"
                                                                       + " from ReglasNegocioCamposxTipoTransaccion"
                                                                       + " WHERE idVisualizacion = " + 24 + " AND idAccion =" + idAccion + " AND idTipoTransaccion =" + idTipoTransaccion + " AND idReferencia is not null AND nombreReferencia is not null");
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTregistrosCampos compos = new Entidades.DTregistrosCampos();
                    compos.valorSelect = Convert.ToInt32(rowDet["campo"].ToString());
                    composCon.Add(compos);
                }

                camposconbo.ListCamposTransaccion = composCon.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }




            return camposconbo;
        }
        public Entidades.DTCamposDinamicos selectDeleteAccionxAuto(int idTipoTransaccion, int idAccion)
        {

            List<Entidades.DTregistrosCampos> composCon = new List<Entidades.DTregistrosCampos>();
            Entidades.DTCamposDinamicos camposconbo = new Entidades.DTCamposDinamicos();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT COUNT( RNC.cadenaJsonHijos ) AS campo"
                                                                       + " FROM ReglasNegocioCamposxTipoTransaccion RNC"
                                                                       + " WHERE RNC.idAccion = " + idAccion + " AND RNC.idTipoTransaccion =" + idTipoTransaccion + " AND RNC.cadenaJsonHijos IS NOT NULL");
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTregistrosCampos compos = new Entidades.DTregistrosCampos();
                    compos.valorSelect = Convert.ToInt32(rowDet["campo"].ToString());
                    composCon.Add(compos);
                }

                camposconbo.ListCamposTransaccion = composCon.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }




            return camposconbo;
        }
        public Entidades.DTCamposDinamicos selectDeleteAccionxFormula(int idTipoTransaccion, int idAccion)
        {

            List<Entidades.DTregistrosCampos> composCon = new List<Entidades.DTregistrosCampos>();
            Entidades.DTCamposDinamicos camposconbo = new Entidades.DTCamposDinamicos();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT COUNT(*) AS campo"
                                                                       + " FROM Formulas"
                                                                       + " WHERE idAccion = " + idAccion + " AND idTipoTransaccion =" + idTipoTransaccion );
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTregistrosCampos compos = new Entidades.DTregistrosCampos();
                    compos.valorSelect = Convert.ToInt32(rowDet["campo"].ToString());
                    composCon.Add(compos);
                }

                camposconbo.ListCamposTransaccion = composCon.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }




            return camposconbo;
        }
        public Entidades.DTCamposDinamicos selectDeleteAccionxRnA(int idTipoTransaccion, int idAccion)
        {

            List<Entidades.DTregistrosCampos> composCon = new List<Entidades.DTregistrosCampos>();
            Entidades.DTCamposDinamicos camposconbo = new Entidades.DTCamposDinamicos();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT COUNT(*) AS campo"
                                                                       + " FROM ReglasNegocioxAccion"
                                                                       + " WHERE idAccion = " + idAccion + " AND idTipoTransaccion =" + idTipoTransaccion);
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.DTregistrosCampos compos = new Entidades.DTregistrosCampos();
                    compos.valorSelect = Convert.ToInt32(rowDet["campo"].ToString());
                    composCon.Add(compos);
                }

                camposconbo.ListCamposTransaccion = composCon.ToArray();


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                throw;
            }




            return camposconbo;
        }


        #endregion
        // Metodos para Entidades
        #region Entidades
        public Entidades.TiposDatosCampos CatTiposDatosCampos()
        {
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            Entidades.TiposDatosCampos registros = new Entidades.TiposDatosCampos();
            List<Entidades.camposTiposDatos> tiposDatosCamp = new List<Entidades.camposTiposDatos>();
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT idTipoDatoCampo, descripcion, abreviatura FROM Configuracion.TiposDatoCampos order by descripcion ASC");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    Entidades.camposTiposDatos registrosDatos = new Entidades.camposTiposDatos();
                    registrosDatos.idTipoDatoCampo = Convert.ToInt32(row["idTipoDatoCampo"].ToString());
                    registrosDatos.descripcion = row["descripcion"].ToString();
                    registrosDatos.abreviatura = row["abreviatura"].ToString();
                    tiposDatosCamp.Add(registrosDatos);
                }
                registros.camposTiposDatCampos = tiposDatosCamp.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return registros;
        }
        public Entidades.NivelesTransacciones CatNivelesTransacciones()
        {
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            Entidades.NivelesTransacciones registros = new Entidades.NivelesTransacciones();
            List<Entidades.camposNivelTrans> tiposNiv = new List<Entidades.camposNivelTrans>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT idNivel, descripcion FROM Configuracion.NivelTransacciones");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    Entidades.camposNivelTrans registrosNiv = new Entidades.camposNivelTrans();

                    registrosNiv.idNivel = Convert.ToInt32(row["idNivel"].ToString());
                    registrosNiv.descripcion = row["descripcion"].ToString();

                    tiposNiv.Add(registrosNiv);
                }
                registros.CamposNivelTransaccion = tiposNiv.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return registros;
        }
        public Entidades.TiposOperaciones CatTiposOperaciones()
        {
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            Entidades.TiposOperaciones registros = new Entidades.TiposOperaciones();
            List<Entidades.camposTiposOperaciones> nivOperaciones = new List<Entidades.camposTiposOperaciones>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT idTipoOperacion, descripcion FROM Configuracion.TiposOperaciones");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    Entidades.camposTiposOperaciones registrosOperacion = new Entidades.camposTiposOperaciones();

                    registrosOperacion.idTipoOperacion = Convert.ToInt32(row["idTipoOperacion"].ToString());
                    registrosOperacion.descripcion = row["descripcion"].ToString();

                    nivOperaciones.Add(registrosOperacion);
                }
                registros.CamposOperaciones = nivOperaciones.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return registros;
        }
        public Entidades.RolesTransaccion CatTiposRolesTransaccion()
        {
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            Entidades.RolesTransaccion registros = new Entidades.RolesTransaccion();
            List<Entidades.camposRolesTrans> tipoRol = new List<Entidades.camposRolesTrans>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT idRol, nombreRol FROM Seguridad.Roles");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    Entidades.camposRolesTrans registrosRol = new Entidades.camposRolesTrans();

                    registrosRol.idRol = Convert.ToInt32(row["idRol"].ToString());
                    registrosRol.nombreRol = row["nombreRol"].ToString();

                    tipoRol.Add(registrosRol);
                }
                registros.CamposRoles = tipoRol.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return registros;

        }
        public Entidades.AreasTipoTransaccion CatAreasTipoTransaccion()
        {
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            Entidades.AreasTipoTransaccion registros = new Entidades.AreasTipoTransaccion();
            List<Entidades.datosAreasTransaccion> areaTran = new List<Entidades.datosAreasTransaccion>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT idArea, descripcion FROM Negocio.Areas order by descripcion ASC");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    Entidades.datosAreasTransaccion registrosAreas = new Entidades.datosAreasTransaccion();

                    registrosAreas.idArea = Convert.ToInt32(row["idArea"].ToString());
                    registrosAreas.descripcion = row["descripcion"].ToString();

                    areaTran.Add(registrosAreas);
                }
                registros.datAreasTransac = areaTran.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return registros;
        }
        public Entidades.ProcesosTipoTransaccion CatProcesoTransaccion(int idArea)
        {
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            Entidades.ProcesosTipoTransaccion registros = new Entidades.ProcesosTipoTransaccion();
            List<Entidades.CamposProcesos> prosTran = new List<Entidades.CamposProcesos>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT idProceso, descripcion FROM Negocio.Procesos WHERE idArea=" + idArea+ " order by descripcion ASC");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    Entidades.CamposProcesos registrosAreas = new Entidades.CamposProcesos();

                    registrosAreas.idProceso = Convert.ToInt32(row["idProceso"].ToString());
                    registrosAreas.descripcion = row["descripcion"].ToString();

                    prosTran.Add(registrosAreas);
                }
                registros.CamposProcesosTran = prosTran.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return registros;
        }
        public Entidades.TiposVisualizacion CatTVisualizacionTransaccion(int idTipoDatoCampo)
        {
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            Entidades.TiposVisualizacion registros = new Entidades.TiposVisualizacion();
            List<Entidades.CamposTiposVisualizacion> visTran = new List<Entidades.CamposTiposVisualizacion>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT VTT.idVisualizacion, VTT.descripcion"
                                                                      + " FROM Configuracion.VisualizacionXCampos VC, Configuracion.VisualizacionTipoTransacciones VTT, Configuracion.TiposDatoCampos TDC"
                                                                      + " WHERE VTT.idVisualizacion = VC.idVisualizacion"
                                                                      + " AND TDC.idTipoDatoCampo = VC.idTipoDatoCampo"
                                                                      + " AND TDC.idTipoDatoCampo = "+ idTipoDatoCampo+ " order by VTT.descripcion ASC");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    Entidades.CamposTiposVisualizacion registrosVis = new Entidades.CamposTiposVisualizacion();

                    registrosVis.idVisualizacion = Convert.ToInt32(row["idVisualizacion"].ToString());
                    registrosVis.descripcion = row["descripcion"].ToString();

                    visTran.Add(registrosVis);
                }
                registros.CamposVisualizacion = visTran.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return registros;
        }
        public Entidades.EntEtapas.EtapasCombo CatTEtapas(int idTransaccion)
        {
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<Entidades.EntEtapas.Etapacombo> ListaCampCatalogo = new List<Entidades.EntEtapas.Etapacombo>();
            Entidades.EntEtapas.EtapasCombo row = new Entidades.EntEtapas.EtapasCombo();

            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT ETT.idEtapa,ETT.descripcion FROM Configuracion.EtapasTipoTransaccion ETT INNER JOIN Configuracion.EtapasAccionesTipoTransacciones EATT ON EATT.idEtapa = ETT.idEtapa WHERE EATT.idTipoTransaccion =" + idTransaccion);
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.EntEtapas.Etapacombo valores1 = new Entidades.EntEtapas.Etapacombo();
                    valores1.idEtapa = Convert.ToInt32(rowDet["idEtapa"].ToString());
                    valores1.descripcion = rowDet["descripcion"].ToString();
                    ListaCampCatalogo.Add(valores1);

                }

                row.listEtapas = ListaCampCatalogo.ToArray();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }



            return row;
        }
        public Entidades.EntEtapas.EtapasCombo CatTsoloEtapas(int idTransaccion)
        {
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<Entidades.EntEtapas.Etapacombo> ListaCampCatalogo = new List<Entidades.EntEtapas.Etapacombo>();
            Entidades.EntEtapas.EtapasCombo row = new Entidades.EntEtapas.EtapasCombo();

            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT ETT.idEtapa,ETT.descripcion FROM Configuracion.EtapasTipoTransaccion ETT  WHERE ETT.idTipoTransaccion = " + idTransaccion);
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.EntEtapas.Etapacombo valores1 = new Entidades.EntEtapas.Etapacombo();
                    valores1.idEtapa = Convert.ToInt32(rowDet["idEtapa"].ToString());
                    valores1.descripcion = rowDet["descripcion"].ToString();
                    ListaCampCatalogo.Add(valores1);

                }

                row.listEtapas = ListaCampCatalogo.ToArray();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }



            return row;
        }
        public Entidades.TipoTransaccion CatTTiposTransacciones()
        {
            Entidades.TipoTransaccion ListaTipoTransaccion = new Entidades.TipoTransaccion();
            List<Entidades.tipoTran> ListaCampCatalogo = new List<Entidades.tipoTran>();
            SqlConnection connection = null;
            DataTable dt = new DataTable();

            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT TT.idTipoTransaccion, descripcion Nombre,cveTipoTransaccion Clave, TT.idProceso, (select idArea from Negocio.Procesos where idProceso=TT.idProceso) Area, TT.idCatTipoTransac, CT.categoriaTransac Categoria,EAT.descripcionEstatus Estatus,fechaAlta fecha FROM Configuracion.TiposTransacciones TT, Configuracion.CategoriaTipoTransaccion CT,Configuracion.EstatusAltaTipoTransaccion EAT where TT.idCatTipoTransac=CT.idCatTipoTransac and TT.idEstatusAlta=EAT.idEstatusAlta");
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.tipoTran valores1 = new Entidades.tipoTran();

                    valores1.idTipoTransaccion = Convert.ToInt32(rowDet["idTipoTransaccion"]);
                    valores1.nombre = rowDet["Nombre"].ToString();
                    valores1.clave = rowDet["Clave"].ToString();
                    valores1.idCategoria = Convert.ToInt32(rowDet["idCatTipoTransac"].ToString());
                    valores1.proceso = Convert.ToInt32(rowDet["idProceso"]);
                    valores1.area = Convert.ToInt32(rowDet["Area"]);
                    valores1.categoria = rowDet["Categoria"].ToString();
                    valores1.estatus = rowDet["Estatus"].ToString();
                    valores1.fecha = rowDet["Fecha"].ToString();

                    ListaCampCatalogo.Add(valores1);

                }

                ListaTipoTransaccion.ListaTipoTran = ListaCampCatalogo.ToArray();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }


            return ListaTipoTransaccion;
        }
        public Entidades.AccionesEnt.AccionesCombo CatTAcciones(int idTransaccion, int idEtapa)
        {
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<Entidades.AccionesEnt.Accioncombo> ListaCampCatalogo = new List<Entidades.AccionesEnt.Accioncombo>();
            Entidades.AccionesEnt.AccionesCombo row = new Entidades.AccionesEnt.AccionesCombo();

            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT ATT.idaccion,ATT.descripcion FROM Configuracion.AccionesTipoTransaccion ATT INNER JOIN Configuracion.EtapasAccionesTipoTransacciones EAT ON EAT.idaccion = ATT.idaccion WHERE EAT.idEtapa =" + idEtapa + " and EAT.idTipoTransaccion =" + idTransaccion);
                    dt.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rowDet in dt.Rows)
                {
                    Entidades.AccionesEnt.Accioncombo valores1 = new Entidades.AccionesEnt.Accioncombo();
                    valores1.idAccion = Convert.ToInt32(rowDet["idaccion"].ToString());
                    valores1.descripcion = rowDet["descripcion"].ToString();
                    ListaCampCatalogo.Add(valores1);

                }

                row.listAcciones = ListaCampCatalogo.ToArray();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }



            return row;
        }
        public Entidades.AltaTiposTransacciones CatTiposTransaccionesD(int idTipoTransaccion)
        {
            Entidades.AltaTiposTransacciones configuracion = new Entidades.AltaTiposTransacciones();

            DataTable dtGral = new DataTable();

            SqlConnection connection = null;

            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT idTipoTransaccion , descripcion, cveTipoTransaccion, activo, idProceso, idCatTipoTransac, idEstatusAlta, fechaAlta"
                                                                      + " FROM Configuracion.TiposTransacciones"
                                                                      + " where idTipoTransaccion = " + idTipoTransaccion);
                    dtGral.Load(consulta);
                    connection.Close();
                }

                foreach (DataRow rowDet in dtGral.Rows)
                {
                    configuracion.idTipoTransaccion = Convert.ToInt32(rowDet["idTipoTransaccion"].ToString());
                    configuracion.nombre = rowDet["descripcion"].ToString();
                    configuracion.cveTipoTransaccion = rowDet["cveTipoTransaccion"].ToString();
                    configuracion.idProceso = Convert.ToInt32(rowDet["idProceso"].ToString());
                    configuracion.idCatTipoTransaccion = Convert.ToInt32(rowDet["idCatTipoTransac"].ToString());
                    configuracion.activoTipoTrans = Convert.ToBoolean(rowDet["activo"].ToString());

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }



            return configuracion;
        }
        public Entidades.EntEtapas.EtapasCombo CatETapasAcionesD(int idTipoTransaccion, int idEtapa)
        {


            Entidades.EntEtapas.EtapasCombo listacombo = new Entidades.EntEtapas.EtapasCombo();
            List<Entidades.EntEtapas.Etapacombo> lista = new List<Entidades.EntEtapas.Etapacombo>();
            SqlConnection connection = null;
            DataTable dtEtapas = new DataTable();

            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT  distinct EATT.idEtapa, ATT.descripcion, ATT.cveAccion, att.orden,ATT.idAccion"
                                                                      + "  FROM Configuracion.EtapasAccionesTipoTransacciones EATT,"
                                                                      + "  Configuracion.EtapasTipoTransaccion ETT, Configuracion.AccionesTipoTransaccion ATT,"
                                                                      + "  Configuracion.EtapasAccionesRoles EAR, Configuracion.TiposTransacciones TT, Seguridad.Roles R"
                                                                      + "  WHERE EATT.idAccion = ATT.idAccion"
                                                                      + "  AND EATT.idEtapa = ETT.idEtapa"
                                                                      + "  AND EAR.idAccion = ATT.idAccion"
                                                                      + "  AND EAR.idEtapa = ETT.idEtapa"
                                                                      + "  AND EATT.idTipoTransaccion = TT.idTipoTransaccion"
                                                                      + "  AND EAR.idTipoTransaccion = TT.idTipoTransaccion"
                                                                      + "  AND EAR.idRol = R.idRol"
                                                                      + "  AND TT.idTipoTransaccion = " + idTipoTransaccion
                                                                      + "  AND EATT.idEtapa = " + idEtapa);
                    dtEtapas.Load(consulta);
                    connection.Close();
                }

                foreach (DataRow rowDet in dtEtapas.Rows)
                {
                    Entidades.EntEtapas.Etapacombo valores1 = new Entidades.EntEtapas.Etapacombo();
                    valores1.idEtapa = Convert.ToInt32(rowDet["idEtapa"]);
                    valores1.descripcion = rowDet["descripcion"].ToString();
                    valores1.ClaveEtapa = rowDet["cveAccion"].ToString();
                    valores1.orden = Convert.ToInt32(rowDet["orden"]);
                    valores1.idAccion = Convert.ToInt32(rowDet["idAccion"]);

                    lista.Add(valores1);
                }
                listacombo.listEtapas = lista.ToArray();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            return listacombo;
        }
        public Entidades.RolesTransaccion CatRolesD(int idTipoTransaccion, int idEtapa, string descripcion)
        {
            Entidades.RolesTransaccion Roles = new Entidades.RolesTransaccion();
            List<Entidades.camposRolesTrans> lista = new List<Entidades.camposRolesTrans>();
            SqlConnection connection = null;
            DataTable dtRoles = new DataTable();

            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT  distinct R.nombreRol,'true' estatus"
                                                                      + " FROM Configuracion.EtapasAccionesTipoTransacciones EATT,"
                                                                      + " Configuracion.EtapasTipoTransaccion ETT, Configuracion.AccionesTipoTransaccion ATT,"
                                                                      + "   Configuracion.EtapasAccionesRoles EAR, Configuracion.TiposTransacciones TT, Seguridad.Roles R"
                                                                      + "   WHERE EATT.idAccion = ATT.idAccion"
                                                                      + "   AND EATT.idEtapa = ETT.idEtapa"
                                                                      + "   AND EAR.idAccion = ATT.idAccion"
                                                                      + "   AND EAR.idEtapa = ETT.idEtapa"
                                                                      + "   AND EATT.idTipoTransaccion = TT.idTipoTransaccion"
                                                                      + "   AND EAR.idTipoTransaccion = TT.idTipoTransaccion"
                                                                      + "   AND EAR.idRol = R.idRol"
                                                                      + "   AND TT.idTipoTransaccion = " + idTipoTransaccion
                                                                      + "   AND EATT.idEtapa = " + idEtapa
                                                                      + "   AND ATT.descripcion = '" + descripcion + "'"
                                                                      + "   union"
                                                                      + "   select nombreRol, '' estatus from Seguridad.Roles r"
                                                                      + "   where nombreRol not in ("
                                                                      + "   SELECT  distinct R.nombreRol"
                                                                      + "    FROM Configuracion.EtapasAccionesTipoTransacciones EATT,"
                                                                      + "   Configuracion.EtapasTipoTransaccion ETT, Configuracion.AccionesTipoTransaccion ATT,"
                                                                      + "   Configuracion.EtapasAccionesRoles EAR, Configuracion.TiposTransacciones TT, Seguridad.Roles R"
                                                                      + "   WHERE EATT.idAccion = ATT.idAccion"
                                                                      + "   AND EATT.idEtapa = ETT.idEtapa"
                                                                      + "   AND EAR.idAccion = ATT.idAccion"
                                                                      + "   AND EAR.idEtapa = ETT.idEtapa"
                                                                      + "   AND EATT.idTipoTransaccion = TT.idTipoTransaccion"
                                                                      + "   AND EAR.idTipoTransaccion = TT.idTipoTransaccion"
                                                                      + "   AND EAR.idRol = R.idRol"
                                                                      + "   AND TT.idTipoTransaccion = " + idTipoTransaccion
                                                                      + "   AND EATT.idEtapa = " + idEtapa
                                                                      + "   AND ATT.descripcion = '" + descripcion + "')");
                    dtRoles.Load(consulta);
                    connection.Close();
                }

                foreach (DataRow rowDet in dtRoles.Rows)
                {
                    Entidades.camposRolesTrans valores1 = new Entidades.camposRolesTrans();
                    valores1.nombreRol = rowDet["nombreRol"].ToString();
                    valores1.estatus = rowDet["estatus"].ToString();


                    lista.Add(valores1);
                }
                Roles.CamposRoles = lista.ToArray();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

            return Roles;
        }
        public Entidades.EnFormula CatformulasD(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo)
        {
            Entidades.EnFormula listformula = new Entidades.EnFormula();
            List<Entidades.CamposEnFormula> camposformula = new List<Entidades.CamposEnFormula>();

            SqlConnection connection = null;
            DataTable dtFormula = new DataTable();

            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT DISTINCT ETT.descripcion Etapa, ATT.descripcion Accion, CDT.nombreCampo, F.cadenaGenerada, f.idCampo, f.idEtapa, f.idAccion"
                                                                      + "  FROM Configuracion.EtapasTipoTransaccion ETT, Configuracion.AccionesTipoTransaccion ATT,"
                                                                      + "  Configuracion.TiposTransacciones TT, Configuracion.Formulas F, Configuracion.CamposDinamicosTransacciones CDT, Configuracion.ReglasNegocioCamposxTipoTransaccion RN"
                                                                      + "  WHERE F.idAccion = ATT.idAccion"
                                                                      + "  AND F.idTipoTransaccion = TT.idTipoTransaccion"
                                                                      + "  AND F.idCampo = CDT.idCampo"
                                                                      + "  AND F.idTipoTransaccion = CDT.idTipoTransaccion"
                                                                      + "  AND RN.idTipoTransaccion = TT.idTipoTransaccion"
                                                                      + "  AND RN.idAccion = ATT.idAccion"
                                                                      + "  AND RN.idEtapa = ETT.idEtapa"
                                                                      + "  AND RN.idCampo = CDT.idCampo"
                                                                      + "  AND F.idEtapa = " + idEtapa
                                                                      + "  AND F.idAccion = " + idAccion
                                                                      + "  AND F.idCampo = " + idCampo
                                                                      + "  AND F.idTipoTransaccion = " + idTipoTransaccion);
                    dtFormula.Load(consulta);
                    connection.Close();
                }

                foreach (DataRow rowDet in dtFormula.Rows)
                {


                    Entidades.CamposEnFormula valores1 = new Entidades.CamposEnFormula();

                    valores1.Etapa = rowDet["Etapa"].ToString();
                    valores1.Accion = rowDet["Accion"].ToString();
                    valores1.nombreCampo = rowDet["nombreCampo"].ToString();
                    valores1.cadenaGenerada = rowDet["cadenaGenerada"].ToString();
                    valores1.idCampo = Convert.ToInt32(rowDet["idCampo"].ToString());
                    valores1.idEtapa = Convert.ToInt32(rowDet["idEtapa"].ToString());
                    valores1.idAccion = Convert.ToInt32(rowDet["idAccion"].ToString());

                    camposformula.Add(valores1);
                }

                listformula.listaformula = camposformula.ToArray();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            return listformula;
        }
        public Entidades.ENReglasNeg CatReglasNegocioD(int idTipoTransaccion, int idEtapa, int idAccion)
        {
            Entidades.ENReglasNeg listareglas = new Entidades.ENReglasNeg();
            List<Entidades.CamposENReglasNeg> campos = new List<Entidades.CamposENReglasNeg>();
            SqlConnection connection = null;
            DataTable dtReglasNeg = new DataTable();

            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT ETT.descripcion Etapa , ATT.descripcion Accion, CDT.nombreCampo Campo,  visible, editable, obligatorio, VTT.descripcion Visualizacion"
                                                                      + "  FROM Configuracion.EtapasTipoTransaccion ETT, Configuracion.AccionesTipoTransaccion ATT,"
                                                                      + "  Configuracion.TiposTransacciones TT, Configuracion.CamposDinamicosTransacciones CDT, Configuracion.ReglasNegocioCamposxTipoTransaccion RN,"
                                                                      + "  Configuracion.VisualizacionTipoTransacciones VTT"
                                                                      + "  where RN.idTipoTransaccion = TT.idTipoTransaccion"
                                                                      + "  AND RN.idAccion = ATT.idAccion"
                                                                      + "  AND RN.idEtapa = ETT.idEtapa"
                                                                      + "  AND RN.idCampo = CDT.idCampo"
                                                                      + "  AND VTT.idVisualizacion = RN.idVisualizacion"
                                                                      + "  AND TT.idTipoTransaccion = " + idTipoTransaccion
                                                                      + "  AND RN.idEtapa =" + idEtapa
                                                                      + "  AND RN.idAccion = " + idAccion);
                    dtReglasNeg.Load(consulta);
                    connection.Close();
                }

                foreach (DataRow rowDet in dtReglasNeg.Rows)
                {
                    Entidades.CamposENReglasNeg valores = new Entidades.CamposENReglasNeg();
                    valores.Etapa = rowDet["Etapa"].ToString();
                    valores.Accion = rowDet["Accion"].ToString();
                    valores.Campo = rowDet["Campo"].ToString();
                    valores.visible = Convert.ToBoolean(rowDet["visible"].ToString());
                    valores.editable = Convert.ToBoolean(rowDet["editable"].ToString());
                    valores.obligatorio = Convert.ToBoolean(rowDet["obligatorio"].ToString());
                    valores.idVisualizacion = Convert.ToInt32(rowDet["idVisualizacion"].ToString());
                    valores.Visualizacion = rowDet["Visualizacion"].ToString();

                    campos.Add(valores);
                }
                listareglas.listaREgl = campos.ToArray();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            return listareglas;
        }
        public Entidades.CamposConbo CatCamposconboboxD(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo)
        {
            Entidades.CamposConbo listcampos = new Entidades.CamposConbo();
            List<Entidades.camposConbobox> campos = new List<Entidades.camposConbobox>();
            SqlConnection connection = null;
            DataTable dtConbobox = new DataTable();

            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT CT.nombreCampo,"
                                                                      + " (SELECT CTT.categoriaTransac FROM Configuracion.TiposTransacciones TT, Configuracion.CategoriaTipoTransaccion CTT"
                                                                      + " WHERE TT.idCatTipoTransac = CTT.idCatTipoTransac AND TT.idTipoTransaccion = RN.idTipoTransaccionReferencia) categoria,"
                                                                      + " (SELECT descripcion FROM Configuracion.TiposTransacciones TTS WHERE TTS.idTipoTransaccion = RN.idTipoTransaccionReferencia) tipotran,"
                                                                      + " idReferencia, nombreReferencia"
                                                                      + " FROM Configuracion.ReglasNegocioCamposxTipoTransaccion RN, Configuracion.CamposDinamicosTransacciones CT, Configuracion.TiposTransacciones TT"
                                                                      + " WHERE RN.idCampo = CT.idCampo"
                                                                      + " AND TT.idTipoTransaccion = RN.idTipoTransaccion"
                                                                      + " AND TT.idTipoTransaccion = CT.idTipoTransaccion"
                                                                      + " AND RN.idTipoTransaccion = " + idTipoTransaccion
                                                                      + " AND RN.idEtapa = " + idEtapa
                                                                      + " AND RN.idAccion = " + idAccion
                                                                      + " AND RN.idCampo = " + idCampo);
                    dtConbobox.Load(consulta);
                    connection.Close();
                }

                foreach (DataRow rowDet in dtConbobox.Rows)
                {
                    Entidades.camposConbobox valores = new Entidades.camposConbobox();
                    valores.nombreCampo = rowDet["nombreCampo"].ToString();
                    valores.categoria = rowDet["categoria"].ToString();
                    valores.tipotran = rowDet["tipotran"].ToString();
                    valores.idReferencia = rowDet["idReferencia"].ToString();
                    valores.nombreReferencia = rowDet["nombreReferencia"].ToString();

                    campos.Add(valores);
                }
                listcampos.listaCamposconbobox = campos.ToArray();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            return listcampos;
        }
        public Entidades.ReglasxCampo ReglasxCamposD(int idTipoTransaccion, int idEtapa, int idAccion)
        {
            Entidades.ReglasxCampo listcampos = new Entidades.ReglasxCampo();
            List<Entidades.ReglasCampos> campos = new List<Entidades.ReglasCampos>();
            SqlConnection connection = null;
            DataTable dtConbobox = new DataTable();
            SqlDataReader consulta;

            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                        connection.Open();
                        consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT ET.descripcion Etapa, AT.descripcion Accion, "
                                                                          +"  CD.nombreCampo, visible, editable, obligatorio,"
                                                                          + "  CASE RN.idVisualizacion WHEN RN.idVisualizacion"
                                                                          + "  THEN  RN.idVisualizacion else 0 END idVisualizacion,"
                                                                          + "  RN.idEtapa, RN.idAccion, RN.idTipoTransaccion,"
                                                                          + "  RN.idCampo, CD.idTipoDatoCampo"
                                                                          + "  FROM Configuracion.ReglasNegocioCamposxTipoTransaccion RN, Configuracion.EtapasAccionesTipoTransacciones EATT, Configuracion.AccionesTipoTransaccion AT, Configuracion.EtapasTipoTransaccion ET,"
                                                                          + "  Configuracion.CamposDinamicosTransacciones CD"
                                                                          + "  where"
                                                                          + "  EATT.idTipoTransaccion = RN.idTipoTransaccion"
                                                                          + "  AND EATT.idEtapa = RN.idEtapa"
                                                                          + "  AND EATT.idAccion = RN.idAccion"
                                                                          + "  AND EATT.idEtapa = ET.idEtapa"
                                                                          + "  AND EATT.idAccion = AT.idAccion"
                                                                          + "  AND CD.idTipoTransaccion = RN.idTipoTransaccion"
                                                                          + "  AND CD.idCampo = RN.idCampo"
                                                                          + "  AND RN.idTipoTransaccion = "+ idTipoTransaccion
                                                                          + "  AND RN.idEtapa = "+ idEtapa
                                                                          + "  AND RN.idAccion = "+ idAccion
                                                                          + "  UNION"
                                                                          + "  SELECT '' Etapa, '' Accion,"
                                                                          + "  nombreCampo, '' visible, '' editable, ''obligatorio,"
                                                                          + "  0 idVisualizacion,"
                                                                          + "  '' idEtapa, '' idAccion, idTipoTransaccion,"
                                                                          + "  idCampo, idTipoDatoCampo"
                                                                          + "  FROM Configuracion.CamposDinamicosTransacciones WHERE idTipoTransaccion = " + idTipoTransaccion
                                                                          + "  AND idCampo NOT IN(SELECT idCampo FROM Configuracion.ReglasNegocioCamposxTipoTransaccion"
                                                                          + "  where idTipoTransaccion = "+ idTipoTransaccion
                                                                          + "  AND idEtapa = "+idEtapa
                                                                          + "  AND idAccion = "+ idAccion+" )");
                        dtConbobox.Load(consulta);
                        connection.Close();
                }

                foreach (DataRow rowDet in dtConbobox.Rows)
                {
                    Entidades.ReglasCampos valores = new Entidades.ReglasCampos();
                    if (rowDet["idEtapa"].ToString() !=""){valores.idEtapa = Convert.ToInt32(rowDet["idEtapa"].ToString()); } else { valores.idEtapa = 0; }
                    if (rowDet["Etapa"].ToString() != "") { valores.Etapa = rowDet["Etapa"].ToString(); } else { valores.Etapa = ""; }
                    if (rowDet["idAccion"].ToString() !="") { valores.idAccion = Convert.ToInt32(rowDet["idAccion"].ToString()); } else { valores.idAccion = 0; }
                    if (rowDet["Accion"].ToString() != "") { valores.Accion = rowDet["Accion"].ToString(); } else { valores.Accion = ""; }
                    if (rowDet["idCampo"].ToString() != "") { valores.idCampo = Convert.ToInt32(rowDet["idCampo"].ToString()); } else { valores.idCampo = 0; }
                    if (rowDet["nombreCampo"].ToString() != "") { valores.nombreCampo = rowDet["nombreCampo"].ToString(); } else { valores.nombreCampo = ""; }
                    if (rowDet["visible"].ToString() != "") { valores.visible = Convert.ToBoolean(rowDet["visible"]); } else { valores.visible = false; }
                    if (rowDet["editable"].ToString() != "") { valores.editable = Convert.ToBoolean(rowDet["editable"]); } else { valores.editable = false; }
                    if (rowDet["obligatorio"].ToString() != "") { valores.obligatorio = Convert.ToBoolean(rowDet["obligatorio"]); } else { valores.obligatorio = false; }
                    if (rowDet["idVisualizacion"].ToString() != "") { valores.idVisualizacion = Convert.ToInt32(rowDet["idVisualizacion"].ToString()); } else { valores.idVisualizacion = 0; }
                    if (rowDet["idTipoTransaccion"].ToString() != "") { valores.idTipoTransaccion = Convert.ToInt32(rowDet["idTipoTransaccion"].ToString()); } else { valores.idTipoTransaccion = 0; }
                    if (rowDet["idTipoDatoCampo"].ToString() != "") { valores.idTipoDatoCampo = Convert.ToInt32(rowDet["idTipoDatoCampo"].ToString()); } else { valores.idTipoDatoCampo = 0; }

                    campos.Add(valores);
                }
                listcampos.caposReglas = campos.ToArray();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            return listcampos;

        }
        public Entidades.CatCombobox CatComboboxD(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo)
        {
            Entidades.CatCombobox listcampos = new Entidades.CatCombobox();
            List<Entidades.camConbobox> campos = new List<Entidades.camConbobox>();
            SqlConnection connection = null;
            DataTable dtConbobox = new DataTable();

            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT CT.nombreCampo,"
                                                                      + " (SELECT CTT.idCatTipoTransac FROM Configuracion.TiposTransacciones TT, Configuracion.CategoriaTipoTransaccion CTT"
                                                                      + "  WHERE TT.idCatTipoTransac = CTT.idCatTipoTransac AND TT.idTipoTransaccion = RN.idTipoTransaccionReferencia) idCategoria,"
                                                                      + "  (SELECT  CD.idCampo FROM Configuracion.CamposDinamicosTransacciones CD WHERE CD.nombreCampo = RN.idReferencia) idReferencia,"
                                                                      + "  (SELECT  CD.idCampo FROM Configuracion.CamposDinamicosTransacciones CD WHERE CD.nombreCampo = RN.nombreReferencia) idNombreReferencia,"
                                                                      + "  idReferencia Referencia, nombreReferencia, RN.idEtapa, RN.idAccion, RN.idCampo, RN.idTipoTransaccion"
                                                                      + "  FROM Configuracion.ReglasNegocioCamposxTipoTransaccion RN, Configuracion.CamposDinamicosTransacciones CT, Configuracion.TiposTransacciones TT"
                                                                      + "  WHERE RN.idCampo = CT.idCampo"
                                                                      + "  AND TT.idTipoTransaccion = RN.idTipoTransaccion"
                                                                      + "  AND TT.idTipoTransaccion = CT.idTipoTransaccion"
                                                                      + "  AND RN.idTipoTransaccion = " + idTipoTransaccion
                                                                      + "  AND RN.idEtapa = " + idEtapa
                                                                      + "  AND RN.idAccion = " + idAccion
                                                                      + "  AND RN.idCampo = " + idCampo);
                    dtConbobox.Load(consulta);
                    connection.Close();
                }

                foreach (DataRow rowDet in dtConbobox.Rows)
                {
                    Entidades.camConbobox valores = new Entidades.camConbobox();
                    valores.nombreCampo = rowDet["nombreCampo"].ToString();
                    valores.idCategoria = Convert.ToInt32(rowDet["idCategoria"].ToString());
                    valores.idReferencia = Convert.ToInt32(rowDet["idReferencia"].ToString());
                    valores.idNombreReferencia = Convert.ToInt32(rowDet["idNombreReferencia"]);
                    valores.Referencia = rowDet["Referencia"].ToString();
                    valores.nombreReferencia = rowDet["nombreReferencia"].ToString();
                    valores.idEtapa = Convert.ToInt32(rowDet["idEtapa"]);
                    valores.idAccion = Convert.ToInt32(rowDet["idAccion"]);
                    valores.idCampo = Convert.ToInt32(rowDet["idCampo"].ToString());
                    valores.idTipoTransaccion = Convert.ToInt32(rowDet["idTipoTransaccion"].ToString());

                    campos.Add(valores);
                }
                listcampos.camposCambo = campos.ToArray();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            return listcampos;

        }
        public int CountReglasD(int idTipoTransaccion, string nombreCampo, int idEtapa, int idAccion)
        {
            int contador = 0;
            SqlConnection connection = null;
            DataTable dtConbobox = new DataTable();

            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT count(*) total"
                                                                      + " FROM Configuracion.ReglasNegocioCamposxTipoTransaccion RN,"
                                                                      + " Configuracion.EtapasTipoTransaccion ETT, Configuracion.AccionesTipoTransaccion ATT,"
                                                                      + " Configuracion.EtapasAccionesTipoTransacciones EATT, Configuracion.CamposDinamicosTransacciones CDT,"
                                                                      + " Configuracion.TiposTransacciones TT, Configuracion.VisualizacionTipoTransacciones VTT"
                                                                      + " WHERE RN.idAccion = ATT.idAccion"
                                                                      + " AND RN.idAccion = EATT.idAccion"
                                                                      + " AND RN.idEtapa = ETT.idEtapa"
                                                                      + " AND RN.idEtapa = EATT.idEtapa"
                                                                      + " AND RN.idTipoTransaccion = EATT.idTipoTransaccion"
                                                                      + " AND RN.idCampo = CDT.idCampo"
                                                                      + " AND RN.idTipoTransaccion = CDT.idTipoTransaccion"
                                                                      + " AND RN.idTipoTransaccion = TT.idTipoTransaccion"
                                                                      + " AND RN.idVisualizacion = VTT.idVisualizacion"
                                                                      + " AND RN.idTipoTransaccion = " + idTipoTransaccion
                                                                      + " and CDT.nombreCampo = '" + nombreCampo + "'"
                                                                      + " and RN.idEtapa ="+ idEtapa
                                                                      + " and RN.idAccion = "+ idAccion);
                    dtConbobox.Load(consulta);
                    connection.Close();

                }

                foreach (DataRow rows in dtConbobox.Rows)
                {
                    contador = Convert.ToInt32(rows["total"].ToString());
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            return contador;
        }
        public Entidades.camposConboboxId CatConboboxRNG(int idTipoTransaccion, int idEtapa, int idAccion)
        {
            Entidades.camposConboboxId listcampos = new Entidades.camposConboboxId();
            List<Entidades.ConboboxRNG> campos = new List<Entidades.ConboboxRNG>();
            SqlConnection connection = null;
            DataTable dtConbobox = new DataTable();

            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT CDT.nombreCampo, "
                                                                      + " (SELECT CTT.idCatTipoTransac FROM Configuracion.TiposTransacciones TT, Configuracion.CategoriaTipoTransaccion CTT"
                                                                      + " WHERE TT.idCatTipoTransac = CTT.idCatTipoTransac AND TT.idTipoTransaccion = RNCT.idTipoTransaccionReferencia) idCategoria, RNCT.idTipoTransaccionReferencia,"
                                                                      + " (SELECT  CD.nombreCampo FROM Configuracion.CamposDinamicosTransacciones CD WHERE CD.nombreCampo = RNCT.idReferencia and CD.idCampo = idCampo AND CD.idTipoTransaccion = idTipoTransaccionReferencia) idReferencia,"
                                                                      + " (SELECT  CD.nombreCampo FROM Configuracion.CamposDinamicosTransacciones CD WHERE CD.nombreCampo = RNCT.nombreReferencia and CD.idCampo = idCampo AND CD.idTipoTransaccion = idTipoTransaccionReferencia) idNombreReferencia"
                                                                      + " FROM Configuracion.ReglasNegocioCamposxTipoTransaccion RNCT, Configuracion.VisualizacionTipoTransacciones VTT, Configuracion.CamposDinamicosTransacciones CDT"
                                                                      + " where RNCT.idCampo = CDT.idCampo"
                                                                      + " and RNCT.idVisualizacion = VTT.idVisualizacion"
                                                                      + " and RNCT.idVisualizacion = 24"
                                                                      + " and CDT.idTipoTransaccion = "+ idTipoTransaccion
                                                                      + " and RNCT.idEtapa = "+ idEtapa
                                                                      + " and RNCT.idAccion = "+ idAccion
                                                                      + " order by RNCT.idCampo asc");
                    dtConbobox.Load(consulta);
                    connection.Close();
                }

                foreach (DataRow rowDet in dtConbobox.Rows)
                {
                    Entidades.ConboboxRNG valores = new Entidades.ConboboxRNG();
                    if (rowDet["nombreCampo"].ToString() != "") { valores.nombreCampo = rowDet["nombreCampo"].ToString(); } else { valores.nombreCampo = ""; }
                    if (rowDet["idCategoria"].ToString() != "") { valores.idCategoria = Convert.ToInt32(rowDet["idCategoria"].ToString()); } else { valores.idCategoria = 0; }
                    if (rowDet["idTipoTransaccionReferencia"].ToString() != "") { valores.idtipotran = Convert.ToInt32(rowDet["idTipoTransaccionReferencia"]); } else { valores.idtipotran = 0; }
                    if (rowDet["idReferencia"].ToString() != "") { valores.idReferencia = rowDet["idReferencia"].ToString(); } else { valores.idReferencia = ""; }
                    if (rowDet["idNombreReferencia"].ToString() != "") { valores.nombreReferencia = rowDet["idNombreReferencia"].ToString(); } else { valores.nombreReferencia = ""; }

                    campos.Add(valores);
                }
                listcampos.listaCamposconboboxRNG = campos.ToArray();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            return listcampos;

        }
        public Entidades.ENReglasNeg Cattooltip(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo)
        {
            Entidades.ENReglasNeg listareglas = new Entidades.ENReglasNeg();
            List<Entidades.CamposENReglasNeg> campos = new List<Entidades.CamposENReglasNeg>();
            SqlConnection connection = null;
            DataTable dtReglasNeg = new DataTable();

            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT  CDT.nombreCampo, visible, editable, obligatorio, RN.idCampo" 
                                                                      + " FROM Configuracion.ReglasNegocioCamposxTipoTransaccion RN,"
                                                                      + " Configuracion.EtapasTipoTransaccion ETT, Configuracion.AccionesTipoTransaccion ATT,"
                                                                      + " Configuracion.EtapasAccionesTipoTransacciones EATT, Configuracion.CamposDinamicosTransacciones CDT,"
                                                                      + " Configuracion.TiposTransacciones TT, Configuracion.VisualizacionTipoTransacciones VTT"
                                                                      + " WHERE RN.idAccion = ATT.idAccion"
                                                                      + " AND RN.idAccion = EATT.idAccion"
                                                                      + " AND RN.idEtapa = ETT.idEtapa"
                                                                      + " AND RN.idEtapa = EATT.idEtapa"
                                                                      + " AND RN.idTipoTransaccion = EATT.idTipoTransaccion"
                                                                      + " AND RN.idCampo = CDT.idCampo"
                                                                      + " AND RN.idTipoTransaccion = CDT.idTipoTransaccion"
                                                                      + " AND RN.idTipoTransaccion = TT.idTipoTransaccion"
                                                                      + " AND RN.idVisualizacion = VTT.idVisualizacion"
                                                                      + " AND RN.idEtapa = "+ idEtapa
                                                                      + " AND RN.idAccion = "+ idAccion
                                                                      + " AND RN.idTipoTransaccion = "+ idTipoTransaccion
                                                                      + " and RN.idCampo = "+ idCampo);
                    dtReglasNeg.Load(consulta);
                    connection.Close();
                }

                foreach (DataRow rowDet in dtReglasNeg.Rows)
                {
                    Entidades.CamposENReglasNeg valores = new Entidades.CamposENReglasNeg();

                    valores.Campo = rowDet["nombreCampo"].ToString();
                    valores.visible = Convert.ToBoolean(rowDet["visible"].ToString());
                    valores.editable = Convert.ToBoolean(rowDet["editable"].ToString());
                    valores.obligatorio = Convert.ToBoolean(rowDet["obligatorio"].ToString());
                    valores.idCampo = Convert.ToInt32(rowDet["idCampo"].ToString());
                    campos.Add(valores);
                }
                listareglas.listaREgl = campos.ToArray();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            return listareglas;
        }

        public Entidades.ReglasNegocioxAccion CatReglasNegocioxAccionD(int idTipoTransaccion, int idEtapa, int idAccion,int idEtapaF)
        {
            Entidades.ReglasNegocioxAccion listcampos = new Entidades.ReglasNegocioxAccion();
            List<Entidades.camposReglasNegocioxAccion> campos = new List<Entidades.camposReglasNegocioxAccion>();
            SqlConnection connection = null;
            DataTable dtConbobox = new DataTable();

            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT ETT.descripcion NombreEtapa, ATT.descripcion NombreAccion,"
                                                                      + " F.jsonReglas ReglaxAccion,"
                                                                      + " (select descripcion from Configuracion.EtapasTipoTransaccion where idEtapa = F.idEtapaDestino) EtapaDestino,"
                                                                      + " F.descripcionRegla, F.mensajeError, ETT.idEtapa, ATT.idAccion, F.idEtapaDestino"
                                                                      + " FROM Configuracion.TiposTransacciones TT, Configuracion.AccionesTipoTransaccion ATT,"
                                                                      + " Configuracion.EtapasTipoTransaccion ETT, Configuracion.EtapasAccionesTipoTransacciones EATT,"
                                                                      + " Configuracion.ReglasNegocioxAccion F"
                                                                      + " WHERE ETT.idEtapa = EATT.idEtapa AND EATT.idAccion = ATT.idAccion"
                                                                      + " AND TT.idTipoTransaccion = EATT.idTipoTransaccion AND"
                                                                      + " F.idTipoTransaccion = TT.idTipoTransaccion"
                                                                      + " AND ETT.idEtapa = "+ idEtapa
                                                                      + " AND ATT.idAccion = "+ idAccion
                                                                      + " AND TT.idTipoTransaccion = "+ idTipoTransaccion
                                                                      + " AND F.idEtapaDestino = " + idEtapaF);
                    dtConbobox.Load(consulta);
                    connection.Close();
                }

                foreach (DataRow rowDet in dtConbobox.Rows)
                {
                    Entidades.camposReglasNegocioxAccion valores = new Entidades.camposReglasNegocioxAccion();
                    if (rowDet["idEtapa"].ToString() != "") { valores.idEtapa = Convert.ToInt32(rowDet["idEtapa"].ToString()); } else { valores.idEtapa = 0; }
                    if (rowDet["NombreEtapa"].ToString() != "") { valores.NombreEtapa = rowDet["NombreEtapa"].ToString(); } else { valores.NombreEtapa = ""; }
                    if (rowDet["idAccion"].ToString() != "") { valores.idAccion = Convert.ToInt32(rowDet["idAccion"].ToString()); } else { valores.idAccion = 0; }
                    if (rowDet["NombreAccion"].ToString() != "") { valores.NombreAccion = rowDet["NombreAccion"].ToString(); } else { valores.NombreAccion = ""; }
                    if (rowDet["idEtapaDestino"].ToString() != "") { valores.idEtapaDestino = Convert.ToInt32(rowDet["idEtapaDestino"].ToString()); } else { valores.idEtapaDestino = 0; }
                    if (rowDet["EtapaDestino"].ToString() != "") { valores.EtapaDestino = rowDet["EtapaDestino"].ToString(); } else { valores.EtapaDestino = ""; }
                    if (rowDet["ReglaxAccion"].ToString() != "") { valores.ReglaxAccion = rowDet["ReglaxAccion"].ToString(); } else { valores.ReglaxAccion = ""; }
                    if (rowDet["descripcionRegla"].ToString() != "") { valores.descripcionRegla = rowDet["descripcionRegla"].ToString(); } else { valores.descripcionRegla = ""; }
                    if (rowDet["mensajeError"].ToString() != "") { valores.mensajeError = rowDet["mensajeError"].ToString(); } else { valores.mensajeError = ""; }

                    campos.Add(valores);
                }
                listcampos.listaReglasxAccion = campos.ToArray();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            return listcampos;

        }

        #endregion
    }
}

