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
    public class DatosArea
    {
        public Area LlenaTablaDatos()
        {
            Area listadatos = new Area();
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<CamposArea> composList = new List<CamposArea>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "Usp_CatAreaMostrarInfo");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    CamposArea reg = new CamposArea();
                    reg.camposSucursal = new CamposSucursal();
                    reg.idArea = Convert.ToInt32(row["idArea"].ToString());
                    reg.nombreArea = row["nombreArea"].ToString();
                    reg.descripcion = row["descripcion"].ToString();
                    reg.camposSucursal.nombre = row["sucursales"].ToString();
                    composList.Add(reg);
                }
                listadatos.listaRegistrosAreas = composList.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return listadatos;
        }

        public bool InsertaAreaBySP(CamposArea areas)
        {
            bool respuesta = false;
            SqlConnection connection = null;
            SqlDataReader responseArea = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametrosAreas = new[]
                     {
                    ParametroAcceso.CrearParametro("@nombreArea", SqlDbType.VarChar, areas.nombreArea, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@descripcion", SqlDbType.VarChar, areas.descripcion , ParameterDirection.Input)
                };

                    responseArea = Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CatAreaInsertar", parametrosAreas);
                   
                   }
                if (responseArea.HasRows)
                {
                    respuesta = true;
                }
                else
                {
                    respuesta = false;
                }
                connection.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return respuesta;
        }


        public bool InsertaAreaxSucursalBySP(CamposArea areas)
        {
            bool respuesta = false;
            SqlConnection connection = null;
            SqlDataReader responseSucursal = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
        
                    var parametrosSucursales = new[]
                     {
                    ParametroAcceso.CrearParametro("@idArea", SqlDbType.Int, areas.idArea , ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@nombreArea", SqlDbType.VarChar, areas.nombreArea, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idSucursal", SqlDbType.Int, areas.camposSucursal.idSucursal, ParameterDirection.Input)
                    };

                    responseSucursal = Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CatAreaxSucursalInsertar", parametrosSucursales);
                }
                if (responseSucursal.HasRows)
                {
                    respuesta = true;
                }
                else
                {
                    respuesta = false;
                }
                connection.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return respuesta;
        }

        public bool actualizarAreaBySP(CamposArea camposArea, int[] idSucursal)
        {
            bool respuesta = false;
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametrosArea = new[]{
                        ParametroAcceso.CrearParametro("@idArea", SqlDbType.Int, camposArea.idArea , ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@nombreArea",SqlDbType.VarChar, camposArea.nombreArea, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@descripcion", SqlDbType.VarChar, camposArea.descripcion, ParameterDirection.Input)
                    };
                    Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CatAreaActualizar", parametrosArea);

                    connection.Close();

                }

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    

                    //Bloque que itera el arreglo de sucursales e inserta relacion SUCURSALES-ÁREAS
                    foreach (int i in idSucursal)
                    {
                        connection.Open();

                        CamposArea campos = new CamposArea();
                        campos.camposSucursal = new CamposSucursal();
                        campos.camposSucursal.idSucursal = i;

                        var parametrosAreaxSucursal = new[]{

                        ParametroAcceso.CrearParametro("@idArea", SqlDbType.Int, camposArea.idArea , ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@nombreArea", SqlDbType.VarChar, camposArea.nombreArea, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idSucursal", SqlDbType.Int, campos.camposSucursal.idSucursal, ParameterDirection.Input)
                    };
                        Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CatAreaxSucursalInsertar", parametrosAreaxSucursal);

                        connection.Close();
                    }

                    

                }

                


                respuesta = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return respuesta;
        }

        public bool EliminaAreaBySP(CamposArea campos)
        {
            bool respuesta = false;
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametros = new[]{
                        ParametroAcceso.CrearParametro("@idArea", SqlDbType.Int, campos.idArea , ParameterDirection.Input)
                    };
                    Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CatAreaEliminar", parametros);
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

        public Sucursal LlenaComboSucursal()
        {
            Sucursal campos = new Sucursal();
            DataTable dt = new DataTable();
            List<CamposSucursal> composList = new List<CamposSucursal>();

            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "Usp_CatAreaMostrarComboSucursal");
                    dt.Load(consulta);
                    connection.Close();
                }


                foreach (DataRow row in dt.Rows)
                {
                    CamposSucursal reg = new CamposSucursal();
                    reg.idSucursal = Convert.ToInt32(row["idSucursal"].ToString());
                    reg.nombre = row["nombre"].ToString();
                    composList.Add(reg);
                }
                campos.ListaRegistrosSucursal = composList.ToArray();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return campos;
        }

        public Area LlenaCheckBoxAreasEdit(CamposArea camposArea)
        {
            DataTable dt = new DataTable();
            Area campos = new Area();
            List<CamposArea> camposList = new List<CamposArea>();

            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametros = new[]{
                        ParametroAcceso.CrearParametro("@idArea", SqlDbType.Int, camposArea.idArea , ParameterDirection.Input)
                    };
                    dt = Ejecuta.EjecutarConsulta(connection, parametros, "Usp_CatMostrarAreasXSucursal");

                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    CamposArea reg = new CamposArea();
                    reg.camposSucursal = new CamposSucursal();
                    reg.camposSucursal.idSucursal = Convert.ToInt32(row["idSucursal"].ToString());
                    reg.camposSucursal.nombre = row["nombre"].ToString();
                    reg.chkSucursal = row["isCheck"].ToString();
                    camposList.Add(reg);
                }
                campos.listaRegistrosAreas = camposList.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return campos;
        }


    }
}
