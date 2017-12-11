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
    public class Transacciones
    {
        public Entidades.CamposTransaccion ArmaFormulario(int idTransaccion) {
            SqlConnection connection = null;
            DataTable Transacciones = new DataTable();
            Console.WriteLine(Transacciones);
            Entidades.CamposTransaccion campos = new Entidades.CamposTransaccion();
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    var parametros = new[]
                     {
                    ParametroAcceso.CrearParametro("@idTransaccion", SqlDbType.Int, idTransaccion , ParameterDirection.Input)
                 };

                    connection.Open();
                    Transacciones = Ejecuta.EjecutarConsulta(connection, parametros, "[dbo].[SpObtenerTransaccion]");
                    Console.WriteLine(Transacciones);
                    connection.Close();

                }

            }
            catch(Exception e)
            {
                Console.WriteLine(e);
            }


                return campos;
        }

        public static DataTable ObtieneTransacciones()
        {
            DataTable Transacciones = new DataTable();
            Console.WriteLine(Transacciones);
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {                 
                    connection.Open();
                    Transacciones = Ejecuta.EjecutarConsulta(connection, null, "[dbo].[SpObtener_Transacciones]");
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
               
                Console.WriteLine(ex);
                throw;
            }
            return Transacciones;
        }

        public static DataTable TiposTransacciones()
        {
            DataTable Transacciones = new DataTable();
            Console.WriteLine(Transacciones);
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    Transacciones = Ejecuta.EjecutarConsulta(connection, null, "[dbo].[SpTiposTransacciones]");
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            return Transacciones;
        }

        public static List<XmlDocument> ConsultaTransacciones(int idEstatus)
        {
            DataTable Transacciones = new DataTable();
            Console.WriteLine(Transacciones);
            SqlConnection connection = null;            
            XmlDocument serializedXML = new XmlDocument();

            List<XmlDocument> ListaTransacciones = new List<XmlDocument>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    {
                        ParametroAcceso.CrearParametro("@idEstatus", SqlDbType.Int, idEstatus, ParameterDirection.Input);
                    }
                    connection.Open();
                    Transacciones = Ejecuta.EjecutarConsulta(connection, null, "[dbo].[SpObtener_Transacciones]");
                    connection.Close();

                    foreach (DataRow Transaccion in Transacciones.Rows)
                    {
                        Entidades.Transaccion Transac = new Entidades.Transaccion();
                        Transac.idTransaccion = Convert.ToInt32(Transaccion["idTransaccion"].ToString());
                        Transac.idTipoTrasaccion = Convert.ToInt32(Transaccion["idTipoTransaccion"].ToString());
                        Transac.idUsuario = Convert.ToInt32(Transaccion["idUsuario"].ToString());
                        Transac.idEstatus = Convert.ToInt32(Transaccion["idEstatus"].ToString());
                        Transac.fechaTransaccion = Transaccion["fechaIniTransaccion"].ToString();
                        Transac.claveTT = Transaccion["cveTipoTransaccion"].ToString();
                        ComplementaCamposTransaccion(ref Transac);
                        //Serializa la clase para convertirla a estructura XML
                        XmlSerializer mySerializer = new XmlSerializer(typeof(Entidades.Transaccion));
                        MemoryStream memStream = new MemoryStream();
                        StreamWriter streamWriter = new StreamWriter(memStream);
                        mySerializer.Serialize(streamWriter, Transac);
                        memStream.Position = 0;
                        StreamReader streamReader = new StreamReader(memStream);
                        serializedXML.Load(streamReader);
                        ListaTransacciones.Add(serializedXML);
                    }                   
                    return ListaTransacciones;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        public static XmlDocument CamposTransaccion(int idTransaccion)
        {
            DataTable Transacciones = new DataTable();
            Console.WriteLine(Transacciones);
            SqlConnection connection = null;
            XmlDocument serializedXML = new XmlDocument();

            XmlDocument composTransacciones = new XmlDocument();
            Console.WriteLine(composTransacciones);
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    var parametros = new[]
                  {
                          ParametroAcceso.CrearParametro("@idTransaccion", SqlDbType.Int, idTransaccion , ParameterDirection.Input)
                    };
                    connection.Open();
                    Transacciones = Ejecuta.EjecutarConsulta(connection, parametros, "[dbo].[SpObtenerTransaccion]");
                    connection.Close();

                    foreach (DataRow Transaccion in Transacciones.Rows)
                    {
                        Entidades.CamposTransaccion comptran = new Entidades.CamposTransaccion();
                        comptran.idTipoTrasaccion = Convert.ToInt32(Transaccion["idTipoTransaccion"].ToString());
                        comptran.descripcion = Transaccion["descripcion"].ToString();
                        comptran.cveTipoTransaccion= Transaccion["cveTipoTransaccion"].ToString(); 
                        comptran.activo = Convert.ToBoolean(Transaccion["activo"].ToString());
                        CamposTransaccion(ref comptran);
                        //Serializa la clase para convertirla a estructura XML
                        XmlSerializer mySerializer = new XmlSerializer(typeof(Entidades.CamposTransaccion));
                        MemoryStream memStream = new MemoryStream();
                        StreamWriter streamWriter = new StreamWriter(memStream);
                        mySerializer.Serialize(streamWriter, comptran);
                        memStream.Position = 0;
                        StreamReader streamReader = new StreamReader(memStream);
                        serializedXML.Load(streamReader);
                    }
                    return serializedXML;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }


        public static void ComplementaCamposTransaccion(ref Entidades.Transaccion Transac)
        {
            SqlConnection connection = null;
            DataTable CamposComplemento = new DataTable();
            Console.WriteLine(CamposComplemento);
            List<Entidades.CampoenCabecera> ListaCamposComplementoCab = new List<Entidades.CampoenCabecera>();
            List<Entidades.CampoenDetalle> ListaCamposComplementoDet = new List<Entidades.CampoenDetalle>();
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    var parametros = new[]
                    {
                          ParametroAcceso.CrearParametro("@idTransaccion", SqlDbType.Int, Transac.idTransaccion , ParameterDirection.Input)
                    };
                    connection.Open();
                    CamposComplemento = Ejecuta.EjecutarConsulta(connection, parametros, "[dbo].[SpObtener_CamposComplementoTransacciones]");
                    connection.Close();
                    if (CamposComplemento.Rows.Count > 0)
                    {
                        DataSet dtCamposComplemento = ConvertJsonStringToDataSet(CamposComplemento.Rows[0][0].ToString());
                        //Datos Cabecera
                        foreach (DataRow Campo in dtCamposComplemento.Tables["Cabecera"].Rows)
                        {
                            Entidades.CampoenCabecera CampoCabecera = new Entidades.CampoenCabecera();
                            CampoCabecera.idCampo = Convert.ToInt32(Campo["idCampo"].ToString());
                            CampoCabecera.idTipoDatoCampo = Convert.ToInt32(Campo["idTipodeDatoCampo"].ToString());
                            CampoCabecera.nombreCampo = Campo["nombreCampo"].ToString();
                            CampoCabecera.valor = Campo["valor"].ToString();
                            ListaCamposComplementoCab.Add(CampoCabecera);
                        }
                        Transac.CamposComplementoCabecera = ListaCamposComplementoCab.ToArray();
                        //Datos Detalle
                        foreach (DataRow Campo in dtCamposComplemento.Tables["Detalle"].Rows)
                        {
                            Entidades.CampoenDetalle CampoDetalle = new Entidades.CampoenDetalle();
                            CampoDetalle.idFila = Convert.ToInt32(Campo["idFila"].ToString());
                            CampoDetalle.idCampo = Convert.ToInt32(Campo["idCampo"].ToString());
                            CampoDetalle.idTipoDatoCampo = Convert.ToInt32(Campo["idTipodeDatoCampo"].ToString());
                            CampoDetalle.nombreCampo = Campo["nombreCampo"].ToString();
                            CampoDetalle.valor = Campo["valor"].ToString();
                            ListaCamposComplementoDet.Add(CampoDetalle);
                        }
                        Transac.DetalleTransaccion = ListaCamposComplementoDet.ToArray();
                    }
                    else
                    {
                        Transac.CamposComplementoCabecera = ListaCamposComplementoCab.ToArray();
                        Transac.DetalleTransaccion = ListaCamposComplementoDet.ToArray();
                    }
                    
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }

        public static void CamposTransaccion(ref Entidades.CamposTransaccion campos)
        {
            SqlConnection connection = null;
            DataTable CamposComplemento = new DataTable();
            Console.WriteLine(CamposComplemento);
            List<Entidades.CampCabecera> ListaCamposComplementoCab = new List<Entidades.CampCabecera>();
            List<Entidades.CampDetalle> ListaCamposComplementoDet = new List<Entidades.CampDetalle>();
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    var parametros = new[]
                    {
                          ParametroAcceso.CrearParametro("@idTransaccion", SqlDbType.Int, campos.idTipoTrasaccion , ParameterDirection.Input)
                    };
                    connection.Open();
                    CamposComplemento = Ejecuta.EjecutarConsulta(connection, parametros, "[dbo].[SpObtener_x_Transacciones]");
                    connection.Close();
                    if (CamposComplemento.Rows.Count > 0)
                    {
                        DataSet dtCampos = new DataSet();

                        dtCampos.Tables.Add(CamposComplemento);

                        //Datos Cabecera

                       if ( 1 == (int)Entidades.nivel.cabecera)

                        foreach (DataRow Campo in CamposComplemento.Rows)
                        {
                                if ((Convert.ToInt32(Campo["idnivel"].ToString())) == (int)Entidades.nivel.cabecera)
                                {
                                    Entidades.CampCabecera CampoCabecera = new Entidades.CampCabecera();
                                    CampoCabecera.idCampo = Convert.ToInt32(Campo["idCampo"].ToString());
                                    CampoCabecera.idnivel = Convert.ToInt32(Campo["idnivel"].ToString());
                                    CampoCabecera.nombreCampo = Campo["nombreCampo"].ToString();
                                    CampoCabecera.TipoDatoCampo = Campo["idTipoDatoCampo"].ToString();
                                    CampoCabecera.TipoOperacion = Campo["idTipoOperacion"].ToString();
                                    CampoCabecera.activo = Convert.ToBoolean(Campo["activo"].ToString());
                                    
                                    ListaCamposComplementoCab.Add(CampoCabecera);
                                }
                                if ((Convert.ToInt32(Campo["idnivel"].ToString())) == (int)Entidades.nivel.detalle)
                                {
                                    Entidades.CampDetalle CampoDet = new Entidades.CampDetalle();
                                    CampoDet.idCampo = Convert.ToInt32(Campo["idCampo"].ToString());
                                    CampoDet.idnivel = Convert.ToInt32(Campo["idnivel"].ToString());
                                    CampoDet.nombreCampo = Campo["nombreCampo"].ToString();
                                    CampoDet.TipoDatoCampo = Campo["idTipoDatoCampo"].ToString();
                                    CampoDet.TipoOperacion = Campo["idTipoOperacion"].ToString();
                                    CampoDet.activo = Convert.ToBoolean(Campo["activo"].ToString());
                                   
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
                Console.WriteLine(ex);
                throw;
            }
        }

        private static DataSet ConvertJsonStringToDataSet(string jsonString)
        {
            try
            {
                XmlDocument xd = new XmlDocument();
                Console.WriteLine(xd);
                jsonString = "{ \"rootNode\": {" + jsonString.Trim().TrimStart('{').TrimEnd('}') + "} }";
                xd = (XmlDocument)JsonConvert.DeserializeXmlNode(jsonString);
                DataSet ds = new DataSet();
                ds.ReadXml(new XmlNodeReader(xd));
                return ds;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        String regreso; 
        public String Consulta(int idTransaccion) {
            DataTable Transacciones = new DataTable();
            SqlConnection connection = null;
            try {
                using (connection = Conexion.ObtieneConexion("ConexionBD")) {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "select * from ValoresCamposTransacciones where idTransaccion =" + idTransaccion);
                    Transacciones.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow item in Transacciones.Rows) {
                    regreso = item["CamposTransaccion"].ToString();
                }
            }
            catch (Exception ex) {
                throw new ArgumentException(ex.Message);
            }
            return regreso;
        }
    }
}
