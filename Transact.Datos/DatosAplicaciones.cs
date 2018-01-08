using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Transact.Entidades;
using Transact.Framework.AccesoDatos;
using System.Data.SqlClient;
using System.Data;

namespace Transact.Datos
{
    public class DatosAplicaciones
    {
        public Aplicaciones llenaTablaAplicaciones()
        {
            Aplicaciones listaAplicaciones = new Aplicaciones();

            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<CamposAplicaciones> composList = new List<CamposAplicaciones>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "[dbo].[Usp_CnfAplicacionesConsultar]");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    CamposAplicaciones reg = new CamposAplicaciones();
                    reg.idAplicacion = Convert.ToInt32(row["idAplicacion"].ToString());
                    reg.nombreAplicacion = row["nombreAplicacion"].ToString();
                    reg.descripcionAplicacion = row["descripcionAplicacion"].ToString();
                    reg.idioma = row["idioma"].ToString();
                    reg.version = Convert.ToDouble(row["version"].ToString());
                    composList.Add(reg);
                }
                listaAplicaciones.listaAplicaciones = composList.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return listaAplicaciones;
        }

        public bool insertarAplicaciones(CamposAplicaciones campos) {
            bool respuesta = false;
            int idAplicacionEncontrado = 0;
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();

                    //Parametros de entrada para buscar un usuario
                    var parametrosBuscaUsuario = new[]
                    {
                        ParametroAcceso.CrearParametro("@nombreAplicacion", SqlDbType.VarChar, campos.nombreAplicacion, ParameterDirection.Input),
                    };
                    //Ejecuta el sp de busqueda de usuario y regresa un id en el datatable
                    DataTable regresaIdUsuarioBuscado = Ejecuta.EjecutarConsulta(connection, parametrosBuscaUsuario, "[dbo].[Usp_CnfAplicacionesConsultarAplicacion]");

                    //Itera el datatable donde el primer registro que regresa es el id de usuario
                    foreach (DataRow row in regresaIdUsuarioBuscado.Rows)
                    {
                        idAplicacionEncontrado = Convert.ToInt32(row["idAplicacion"].ToString());
                    }
                    connection.Close();

                    if (idAplicacionEncontrado == 0)
                    {
                        connection.Open();
                        var parametros = new[]
                        {
                        ParametroAcceso.CrearParametro("@nombreAplicacion", SqlDbType.VarChar, campos.nombreAplicacion, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@descripcionAplicacion", SqlDbType.VarChar, campos.descripcionAplicacion, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idioma", SqlDbType.VarChar, campos.idioma, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@version", SqlDbType.VarChar, campos.version, ParameterDirection.Input)
                    };
                        Ejecuta.ProcedimientoAlmacenado(connection, "[dbo].[Usp_CnfAplicacionesInsertar]", parametros);
                        connection.Close();

                        respuesta = true;
                    }
                    else
                    {
                        respuesta = false;
                    }
                }
                }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return respuesta;
        }

        public bool modificarAplicaciones(CamposAplicaciones campos)
        {
            bool respuesta = false;
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametros = new[]
                    {
                        ParametroAcceso.CrearParametro("@nombreAplicacion", SqlDbType.VarChar, campos.nombreAplicacion, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@descripcionAplicacion", SqlDbType.VarChar, campos.descripcionAplicacion, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idioma", SqlDbType.VarChar, campos.idioma, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@version", SqlDbType.VarChar, campos.version, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idAplicacion", SqlDbType.VarChar, campos.idAplicacion, ParameterDirection.Input)
                    };
                    Ejecuta.ProcedimientoAlmacenado(connection, "[dbo].[Usp_CnfAplicacionesModificar]", parametros);
                    connection.Close();
                }
                respuesta = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return respuesta;
        }

        public bool eliminarAplicaciones(int idAplicacion)
        {
            bool respuesta = false;
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametros = new[]
                    {
                        ParametroAcceso.CrearParametro("@idAplicacion", SqlDbType.VarChar, idAplicacion, ParameterDirection.Input)
                    };
                    Ejecuta.ProcedimientoAlmacenado(connection, "[dbo].[Usp_CnfAplicacionesEliminar]", parametros);
                    connection.Close();
                }
                respuesta = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return respuesta;
        }
    }
}
