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
    public class DatosRoles
    {


        public Roles LlenaTablaDatos()
        {
            Roles listadatos = new Roles();
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<CamposRoles> composList = new List<CamposRoles>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "Usp_CatRolesMostrarInfo");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    CamposRoles reg = new CamposRoles();
                    reg.camposMenus = new CamposMenus();
                    reg.idRol = Convert.ToInt32(row["idRol"].ToString());
                    reg.nombreRol = row["nombreRol"].ToString();
                    reg.descripcionRol = row["descripcionRol"].ToString();
                    reg.camposMenus.nombreMenu = row["menus"].ToString();
                    composList.Add(reg);
                }
                listadatos.listaRegistrosRoles = composList.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return listadatos;
        }

        public bool InsertaRolBySP(CamposRoles roles, int[] idMenus)
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
                    ParametroAcceso.CrearParametro("@nombreRol", SqlDbType.VarChar, roles.nombreRol, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@descripcion", SqlDbType.VarChar, roles.descripcionRol , ParameterDirection.Input)
                     };

                    Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CatRolesInsertar", parametrosRoles);
                   
                }
               
                connection.Close();

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    foreach (int i in idMenus)
                    {
                        connection.Open();
                        
                        roles.camposMenus = new CamposMenus();
                        roles.camposMenus.idMenu = i;

                        var parametrosRolesxMenus = new[]{

                        ParametroAcceso.CrearParametro("@idRol", SqlDbType.Int, roles.idRol , ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@nombreRol", SqlDbType.VarChar, roles.nombreRol, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idMenu", SqlDbType.Int, roles.camposMenus.idMenu, ParameterDirection.Input)
                    };
                        Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CatRolesxMenusInsertar", parametrosRolesxMenus);

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

        public bool actualizarRolBySP(CamposRoles camposRol, int[] idMenus)
        {
            bool respuesta = false;
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametrosRol = new[]{
                        ParametroAcceso.CrearParametro("@idRol", SqlDbType.Int, camposRol.idRol , ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@nombreRol",SqlDbType.VarChar, camposRol.nombreRol, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@descripcion", SqlDbType.VarChar, camposRol.descripcionRol, ParameterDirection.Input)
                    };
                    Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CatRolActualizar", parametrosRol);

                    connection.Close();

                }

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    

                    //Bloque que itera el arreglo de sucursales e inserta relacion SUCURSALES-ÁREAS
                    foreach (int i in idMenus)
                    {
                        connection.Open();

                        //CamposRoles campos = new CamposRoles();
                        //campos.camposMenus = new CamposMenus();
                        camposRol.camposMenus.idMenu = i;

                        var parametrosRolxMenu = new[]{

                        ParametroAcceso.CrearParametro("@idRol", SqlDbType.Int, camposRol.idRol , ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@nombreRol", SqlDbType.VarChar, camposRol.nombreRol, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idMenu", SqlDbType.Int, camposRol.camposMenus.idMenu, ParameterDirection.Input)
                    };
                        Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CatRolesxMenusInsertar", parametrosRolxMenu);

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

        public bool EliminaRolBySP(CamposRoles campos)
        {
            bool respuesta = false;
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametros = new[]{
                        ParametroAcceso.CrearParametro("@idRol", SqlDbType.Int, campos.idRol , ParameterDirection.Input)
                    };
                    Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CatRolEliminar", parametros);
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

        public Menus LlenaCheckMenu()
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
                    consulta = Ejecuta.ConsultaConRetorno(connection, "Usp_CatRolesMostrarCheckMenu");
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

        public Roles LlenaCheckBoxRolEdit(CamposRoles camposRoles)
        {
            DataTable dt = new DataTable();
            Roles campos = new Roles();
            List<CamposRoles> camposList = new List<CamposRoles>();

            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametros = new[]{
                        ParametroAcceso.CrearParametro("@idRol", SqlDbType.Int, camposRoles.idRol , ParameterDirection.Input)
                    };
                    dt = Ejecuta.EjecutarConsulta(connection, parametros, "Usp_CatMostrarRolesXMenu");

                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    CamposRoles reg = new CamposRoles();
                    reg.camposMenus = new CamposMenus();
                    reg.camposMenus.idMenu = Convert.ToInt32(row["idMenu"].ToString());
                    reg.camposMenus.nombreMenu = row["nombreMenu"].ToString();
                    reg.chkMenu = row["isCheck"].ToString();
                    camposList.Add(reg);
                }
                campos.listaRegistrosRoles = camposList.ToArray();
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
