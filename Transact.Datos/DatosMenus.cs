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
    public class DatosMenus
    {


        public Menus LlenaTablaMenus()
        {
            Menus listadatos = new Menus();
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<CamposMenus> composList = new List<CamposMenus>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "Usp_CatMenusMostrarInfo");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    CamposMenus reg = new CamposMenus();
                    reg.camposAplicaciones = new CamposAplicaciones();
                    reg.idMenu = Convert.ToInt32(row["idMenu"].ToString());
                    reg.nombreMenu = row["nombreMenu"].ToString();
                    reg.nombreMenuPadre = row["nombreMenuPadre"].ToString();
                    reg.descripcionMenu = row["descripcionMenu"].ToString();
                    reg.icono = row["icono"].ToString();
                    reg.liga = row["liga"].ToString();
                    reg.camposAplicaciones.nombreAplicacion = row["aplicaciones"].ToString();
                    composList.Add(reg);
                }
                listadatos.listaRegistrosMenu = composList.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return listadatos;
        }
         
        public bool InsertaMenuNegocio(CamposMenus camposMenus, int[] idAplicaciones)
        {
            bool respuesta = false;
            SqlConnection connection = null;
            
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametrosRoles = new[]
                     {
                    ParametroAcceso.CrearParametro("@nombreMenu", SqlDbType.VarChar, camposMenus.nombreMenu, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@idNivelPadre", SqlDbType.VarChar, camposMenus.idNivelPadre, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@idPadre", SqlDbType.VarChar, camposMenus.idPadre, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@descripcion", SqlDbType.VarChar, camposMenus.descripcionMenu , ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@icono", SqlDbType.VarChar, camposMenus.icono , ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@liga", SqlDbType.VarChar, camposMenus.liga, ParameterDirection.Input)
                     };

                    Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CatMenusInsertar", parametrosRoles);
                   
                }
               
                connection.Close();

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    foreach (int i in idAplicaciones)
                    {
                        connection.Open();
                        
                       // roles.camposAplicaciones = new CamposMenus();
                       // roles.camposMenus.idMenu = i;

                        camposMenus.camposAplicaciones.idAplicacion = i;

                        var parametrosRolesxMenus = new[]{

                        ParametroAcceso.CrearParametro("@idMenu", SqlDbType.Int, camposMenus.idMenu , ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@nombreMenu", SqlDbType.VarChar, camposMenus.nombreMenu, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idAplicacion", SqlDbType.Int, camposMenus.camposAplicaciones.idAplicacion, ParameterDirection.Input)
                    };
                        Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CatMenusxAplicacionesInsertar", parametrosRolesxMenus);

                        connection.Close();
                    }
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return respuesta;
        }

        public bool actualizarMenuBySP(CamposMenus camposMenus, int[] idAplicaciones)
        {
            bool respuesta = false;
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametrosRol = new[]{
                        ParametroAcceso.CrearParametro("@idMenu", SqlDbType.Int, camposMenus.idMenu , ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@nombreMenu",SqlDbType.VarChar, camposMenus.nombreMenu, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idNivelPadre",SqlDbType.Int, camposMenus.idNivelPadre, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idPadre",SqlDbType.Int, camposMenus.idPadre, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@descripcion", SqlDbType.VarChar, camposMenus.descripcionMenu, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@icono", SqlDbType.VarChar, camposMenus.icono, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@liga", SqlDbType.VarChar, camposMenus.liga, ParameterDirection.Input)
                    };
                    Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CatMenuActualizar", parametrosRol);

                    connection.Close();

                }

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    

                    //Bloque que itera el arreglo de sucursales e inserta relacion MENUS-APLICACIONES
                    foreach (int i in idAplicaciones)
                    {
                        connection.Open();

                        //CamposRoles campos = new CamposRoles();
                        //campos.camposMenus = new CamposMenus();
                        camposMenus.camposAplicaciones.idAplicacion = i;

                        var parametrosRolxMenu = new[]{

                        ParametroAcceso.CrearParametro("@idMenu", SqlDbType.Int, camposMenus.idMenu , ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@nombreMenu", SqlDbType.VarChar, camposMenus.nombreMenu, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idAplicacion", SqlDbType.Int, camposMenus.camposAplicaciones.idAplicacion, ParameterDirection.Input)
                    };
                        Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CatMenusxAplicacionesInsertar", parametrosRolxMenu);

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

        public bool EliminaAreaBySP(int idArea)
        {
            bool respuesta = false;
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametros = new[]{
                        ParametroAcceso.CrearParametro("@idArea", SqlDbType.Int, idArea , ParameterDirection.Input)
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

        public Aplicaciones LlenaCheckAplicaciones()
        {
            Aplicaciones campos = new Aplicaciones();
            DataTable dt = new DataTable();
            List<CamposAplicaciones> composList = new List<CamposAplicaciones>();

            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "Usp_CatMenusMostrarCheckAplicaciones");
                    dt.Load(consulta);
                    connection.Close();
                }


                foreach (DataRow row in dt.Rows)
                {
                    CamposAplicaciones reg = new CamposAplicaciones();
                    reg.idAplicacion = Convert.ToInt32(row["idAplicacion"].ToString());
                    reg.nombreAplicacion = row["nombreAplicacion"].ToString();
                    composList.Add(reg);
                }
                campos.listaAplicaciones = composList.ToArray();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return campos;
        }

        public Menus LlenaComboMenuPadre()
        {
            Menus campos = new Menus();
            DataTable dt = new DataTable();
            List<CamposMenus> composList = new List<CamposMenus>();

            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "Usp_CatMenuMostrarComboMenuPadre");
                    dt.Load(consulta);
                    connection.Close();
                }


                foreach (DataRow row in dt.Rows)
                {
                    CamposMenus reg = new CamposMenus();
                    reg.idMenu = Convert.ToInt32(row["idMenu"].ToString());
                    reg.nombreMenu = row["nombreMenu"].ToString();
                    composList.Add(reg);
                }
                campos.listaRegistrosMenu = composList.ToArray();

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return campos;
        }

        public Menus LlenaCheckBoxMenusEdit(CamposMenus camposMenus)
        {
            DataTable dt = new DataTable();
            Menus campos = new Menus();
            List<CamposMenus> camposList = new List<CamposMenus>();

            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametros = new[]{
                        ParametroAcceso.CrearParametro("@idMenu", SqlDbType.Int, camposMenus.idMenu , ParameterDirection.Input)
                    };
                    dt = Ejecuta.EjecutarConsulta(connection, parametros,"Usp_CatMostrarMenusXAplicaciones");

                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    CamposMenus reg = new CamposMenus();
                    reg.camposAplicaciones = new CamposAplicaciones();
                    reg.camposAplicaciones.idAplicacion = Convert.ToInt32(row["idAplicacion"].ToString());
                    reg.camposAplicaciones.nombreAplicacion = row["nombreAplicacion"].ToString();
                    reg.chkAplicacion = row["isCheck"].ToString();
                    camposList.Add(reg);
                }
                campos.listaRegistrosMenu = camposList.ToArray();
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
