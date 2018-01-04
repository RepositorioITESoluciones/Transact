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
    public class DatosPersonalUsuario
    {
        public PersonalUsuario llenaTablaPersonalUsuario()
        {
            PersonalUsuario listaPersonalUsuario = new PersonalUsuario();

            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<CamposPersonalUsuario> composList = new List<CamposPersonalUsuario>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "[dbo].[Usp_CnfPersonalUsuariosConsultar]");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    CamposPersonalUsuario reg = new CamposPersonalUsuario();
                    reg.idPersonal = Convert.ToInt32(row["idPersonal"].ToString());
                    reg.idUsuario = Convert.ToInt32(row["idUsuario"].ToString());
                    reg.idRol = Convert.ToInt32(row["idRol"].ToString());
                    reg.nombre = row["nombre"].ToString();
                    reg.rfc = row["rfc"].ToString();
                    reg.puesto = row["puesto"].ToString();
                    reg.email = row["email"].ToString();
                    reg.acceso = row["acceso"].ToString();
                    reg.nombreRol = row["nombreRol"].ToString();
                    reg.nombreUsuario = row["nombreUsuario"].ToString();
                    reg.privilegios = row["privilegios"].ToString();
                    reg.idEstado = Convert.ToInt32(row["idEstado"].ToString());
                    reg.c_CP = Convert.ToInt32(row["c_CP"].ToString());
                    reg.idPuesto = Convert.ToInt32(row["idPuesto"].ToString());
                    reg.apPaterno = row["apPaterno"].ToString();
                    reg.apMaterno = row["apMaterno"].ToString();
                    reg.nombreSolo = row["nombreSolo"].ToString();
                    reg.contrasena = row["contrasena"].ToString();
                    composList.Add(reg);
                }
                listaPersonalUsuario.listaPersonalUsuario = composList.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return listaPersonalUsuario;
        }

        public ComboPuestos LlenaComboPuesto()
        {
            ComboPuestos listaPuestos = new ComboPuestos();

            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<CamposPuestos> composList = new List<CamposPuestos>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "[dbo].[Usp_CombPuestosMostrar]");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    CamposPuestos reg = new CamposPuestos();
                    reg.idPuesto = Convert.ToInt32(row["idPuesto"].ToString());
                    reg.descripcion = row["descripcion"].ToString();
                    composList.Add(reg);
                }
                listaPuestos.listaPuestos = composList.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return listaPuestos;
        }

        public Roles LlenaComboRoles()
        {
            Roles listaRoles = new Roles();

            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<CamposRoles> composList = new List<CamposRoles>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "[dbo].[Usp_CombRolesMostrar]");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    CamposRoles reg = new CamposRoles();
                    reg.idRol = Convert.ToInt32(row["idRol"].ToString());
                    reg.nombreRol = row["nombreRol"].ToString();
                    composList.Add(reg);
                }
                listaRoles.listaRegistrosRoles = composList.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return listaRoles;
        }


        public ComboPrivilegios LlenaCheckBoxPrivilegios()
        {
            ComboPrivilegios listaPrivilegios = new ComboPrivilegios();

            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<CamposPrivilegios> composList = new List<CamposPrivilegios>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "[dbo].[Usp_CombPrivilegiosMostrar]");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    CamposPrivilegios reg = new CamposPrivilegios();
                    reg.idPrivilegio = Convert.ToInt32(row["idPrivilegio"].ToString());
                    reg.descripcionPrivilegio = row["descripcionPrivilegio"].ToString();
                    composList.Add(reg);
                }
                listaPrivilegios.listaPrivilegios = composList.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return listaPrivilegios;
        }

        public ComboPrivilegiosCHK LlenaCheckBoxPrivilegiosEdit(int idPersonal, int idUsuario, int idRol)
        {
            ComboPrivilegiosCHK listaPrivilegiosCHK = new ComboPrivilegiosCHK();

            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<CamposPrivilegiosCHK> composList = new List<CamposPrivilegiosCHK>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    var parametros = new[]{
                     ParametroAcceso.CrearParametro("@idPersonal", SqlDbType.Int , idPersonal , ParameterDirection.Input),
                     ParametroAcceso.CrearParametro("@idUsuario", SqlDbType.Int , idUsuario , ParameterDirection.Input),
                     ParametroAcceso.CrearParametro("@idRol", SqlDbType.Int , idRol , ParameterDirection.Input)
                    };
                    //consulta = Ejecuta.ConsultaConRetorno(connection, "Usp_CombCP", parametros);
                    DataTable prueba = Ejecuta.EjecutarConsulta(connection, parametros, "Usp_CombPrivilegiosCHKMostrar");

                    dt = prueba;
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    CamposPrivilegiosCHK reg = new CamposPrivilegiosCHK();
                    reg.idPrivilegio = Convert.ToInt32(row["idPrivilegio"].ToString());
                    reg.descripcionPrivilegio = row["descripcionPrivilegio"].ToString();
                    reg.estatus = row["estatus"].ToString();
                    composList.Add(reg);
                }
                listaPrivilegiosCHK.listaPrivilegiosCHK = composList.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return listaPrivilegiosCHK;
        }

        public ComboPersonal LlenaComboPersonal()
        {
            ComboPersonal listaPersonal = new ComboPersonal();

            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<CamposPersonal> composList = new List<CamposPersonal>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "[dbo].[Usp_CombPersonalMostrar]");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    CamposPersonal reg = new CamposPersonal();
                    reg.idPersonal = Convert.ToInt32(row["idPersonal"].ToString());
                    reg.nombrePersonal = row["nombrePersonal"].ToString();
                    composList.Add(reg);
                }
                listaPersonal.listaPersonal = composList.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return listaPersonal;
        }

        public ComboEstados LlenaComboEstados()
        {
            ComboEstados listaEstados = new ComboEstados();

            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<CamposEstados> composList = new List<CamposEstados>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "[dbo].[Usp_CombEstadosMostrar]");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    CamposEstados reg = new CamposEstados();
                    reg.idEstado = Convert.ToInt32(row["idEstado"].ToString());
                    reg.descripcion = row["descripcion"].ToString();
                    composList.Add(reg);
                }
                listaEstados.listaEstados = composList.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return listaEstados;
        }

        public ComboCP LlenaComboCP(int idEstado)
        {
            ComboCP listaCodigosPostales = new ComboCP();
            DataTable dt = new DataTable();
            List<CamposCodigosPostales> composList = new List<CamposCodigosPostales>();


            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    var parametros = new[]{
                     ParametroAcceso.CrearParametro("@IdEstado", SqlDbType.Int , idEstado , ParameterDirection.Input)
                    };
                    //consulta = Ejecuta.ConsultaConRetorno(connection, "Usp_CombCP", parametros);
                    DataTable prueba = Ejecuta.EjecutarConsulta(connection, parametros, "Usp_CombCPxEstadoMostrar");
                    dt = prueba;
                    connection.Close();
                }


                foreach (DataRow row in dt.Rows)
                {
                    CamposCodigosPostales reg = new CamposCodigosPostales();
                    reg.id = Convert.ToInt32(row["id"].ToString());
                    reg.nombre = row["nombre"].ToString();
                    composList.Add(reg);
                }
                listaCodigosPostales.listaCodigosPostales = composList.ToArray();


            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return listaCodigosPostales;
        }

        public bool insertaPersonal(string nombre, string apPaterno, string apMaterno, string rfc, string estadoC, string cpC, string idPuesto, string email, string idRol, string usuario, string pwd, string accesarSistema, int[] privilegios)
        {
            bool respuesta = false;
            ConvertJsonToDataset cj = new ConvertJsonToDataset();
            int idPersonal = 0;
            int idUsuario = 0;
            int idUsuarioEncontrado = 0;

            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();

                    //Parametros de entrada para buscar un usuario
                    var parametrosBuscaUsuario = new[]
                    {
                        ParametroAcceso.CrearParametro("@RFC", SqlDbType.VarChar, rfc, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@email", SqlDbType.VarChar, email, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@nombreUsuario", SqlDbType.VarChar, usuario, ParameterDirection.Input),
                    };
                    //Ejecuta el sp de busqueda de usuario y regresa un id en el datatable
                    DataTable regresaIdUsuarioBuscado = Ejecuta.EjecutarConsulta(connection, parametrosBuscaUsuario, "[dbo].[Usp_CnfUsuariosTConsultarPersona]");

                    //Itera el datatable donde el primer registro que regresa es el id de usuario
                    foreach (DataRow row in regresaIdUsuarioBuscado.Rows)
                    {
                        idUsuarioEncontrado = Convert.ToInt32(row["idPersonal"].ToString());
                    }
                    connection.Close();

                    if (idUsuarioEncontrado == 0)
                    {

                        connection.Open();

                        //Parametros de entrada para la insercion en Personal
                        var parametros = new[]
                        {
                        ParametroAcceso.CrearParametro("@nombre", SqlDbType.VarChar, nombre, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@apPaterno", SqlDbType.VarChar, apPaterno, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@apMaterno", SqlDbType.VarChar, apMaterno, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@RFC", SqlDbType.VarChar, rfc, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idPuesto", SqlDbType.Int, idPuesto, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@c_CP", SqlDbType.Int, cpC, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idEstado", SqlDbType.Int, estadoC, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@email", SqlDbType.VarChar, email, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@acceso_a_sistemas", SqlDbType.VarChar, accesarSistema, ParameterDirection.Input),

                    };
                        //Ejecuta el sp de insercion de personal y regresa un id en el datatable
                        DataTable regresaIdPersonal = Ejecuta.EjecutarConsulta(connection, parametros, "[dbo].[Usp_CnfPersonalInsertar]");

                        //Itera el datatable donde el primer registro que regresa es el id de persona
                        foreach (DataRow row in regresaIdPersonal.Rows)
                        {
                            idPersonal = Convert.ToInt32(row["idPersonal"].ToString());
                        }

                        //Parametros de entrada para la insercion en usuario
                        var parametrosUsuario = new[]
                        {
                        ParametroAcceso.CrearParametro("@nombreUsuario", SqlDbType.VarChar, usuario, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@contrasena", SqlDbType.VarChar, pwd, ParameterDirection.Input),
                    };
                        //Ejecuta el sp de insercion de usuario y regresa un id en el datatable
                        DataTable regresaIdUsuario = Ejecuta.EjecutarConsulta(connection, parametrosUsuario, "[dbo].[Usp_CnfUsuariosTInsertar]");

                        //Itera el datatable donde el primer registro que regresa es el id de usuario
                        foreach (DataRow row in regresaIdUsuario.Rows)
                        {
                            idUsuario = Convert.ToInt32(row["idUsuario"].ToString());
                        }

                        //Recorrer el arreglo de privilegios
                        foreach (int i in privilegios)
                        {
                            //Parametros de entrada para la insercion en PersonalUsuario
                            var parametrosPersonalUsuario = new[]
                            {
                            ParametroAcceso.CrearParametro("@idPersonal", SqlDbType.VarChar, idPersonal, ParameterDirection.Input),
                            ParametroAcceso.CrearParametro("@idUsuario", SqlDbType.VarChar, idUsuario, ParameterDirection.Input),
                            ParametroAcceso.CrearParametro("@idRol", SqlDbType.VarChar, idRol, ParameterDirection.Input),
                            ParametroAcceso.CrearParametro("@idPrivilegio", SqlDbType.VarChar, i, ParameterDirection.Input),
                        };
                            //Ejecuta el sp de insercion de usuario y regresa un id en el datatable
                            Ejecuta.EjecutarConsulta(connection, parametrosPersonalUsuario, "[dbo].[Usp_CnfPersonalUsuariosTInsertar]");
                        }

                        connection.Close();
                    
                    respuesta = true;
                    } else {
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

        public bool insertaUsuario(string personaC, string idRol, string usuario, string pwd, int[] privilegios)
        {
            bool respuesta = false;
            ConvertJsonToDataset cj = new ConvertJsonToDataset();
            int idPersonal = Convert.ToInt32(personaC);
            int idUsuario = 0;
            int idUsuarioEncontrado = 0;

            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();

                    //Parametros de entrada para buscar un usuario
                    var parametrosBuscaUsuario = new[]
                    {
                        ParametroAcceso.CrearParametro("@nombreUsuario", SqlDbType.VarChar, usuario, ParameterDirection.Input),
                    };
                    //Ejecuta el sp de busqueda de usuario y regresa un id en el datatable
                    DataTable regresaIdUsuarioBuscado = Ejecuta.EjecutarConsulta(connection, parametrosBuscaUsuario, "[dbo].[Usp_CnfUsuariosTConsultarUsuario]");

                    //Itera el datatable donde el primer registro que regresa es el id de usuario
                    foreach (DataRow row in regresaIdUsuarioBuscado.Rows)
                    {
                        idUsuarioEncontrado = Convert.ToInt32(row["idUsuario"].ToString());
                    }
                    connection.Close();

                    if (idUsuarioEncontrado == 0)
                    {

                        connection.Open();

                        //Parametros de entrada para la insercion en usuario
                        var parametrosUsuario = new[]
                        {
                        ParametroAcceso.CrearParametro("@nombreUsuario", SqlDbType.VarChar, usuario, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@contrasena", SqlDbType.VarChar, pwd, ParameterDirection.Input),
                    };
                        //Ejecuta el sp de insercion de usuario y regresa un id en el datatable
                        DataTable regresaIdUsuario = Ejecuta.EjecutarConsulta(connection, parametrosUsuario, "[dbo].[Usp_CnfUsuariosTInsertar]");

                        //Itera el datatable donde el primer registro que regresa es el id de usuario
                        foreach (DataRow row in regresaIdUsuario.Rows)
                        {
                            idUsuario = Convert.ToInt32(row["idUsuario"].ToString());
                        }

                        //Recorrer el arreglo de privilegios
                        foreach (int i in privilegios)
                        {
                            //Parametros de entrada para la insercion en PersonalUsuario
                            var parametrosPersonalUsuario = new[]
                            {
                            ParametroAcceso.CrearParametro("@idPersonal", SqlDbType.VarChar, idPersonal, ParameterDirection.Input),
                            ParametroAcceso.CrearParametro("@idUsuario", SqlDbType.VarChar, idUsuario, ParameterDirection.Input),
                            ParametroAcceso.CrearParametro("@idRol", SqlDbType.VarChar, idRol, ParameterDirection.Input),
                            ParametroAcceso.CrearParametro("@idPrivilegio", SqlDbType.VarChar, i, ParameterDirection.Input),
                        };
                            //Ejecuta el sp de insercion de usuario y regresa un id en el datatable
                            Ejecuta.EjecutarConsulta(connection, parametrosPersonalUsuario, "[dbo].[Usp_CnfPersonalUsuariosTInsertar]");
                        }

                        connection.Close();
                        respuesta = true;
                    }
                    else {
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

        public bool modificarPersonalUsuario(string nombre, string apPaterno, string apMaterno, string rfc, string estadoC, string cpC, string idPuesto, string email, string idRol, string usuario, string pwd, string accesarSistema, int[] privilegios, int idPersonal, int idUsuario, int idRolAnterior)
        {
            bool respuesta = false;
            ConvertJsonToDataset cj = new ConvertJsonToDataset();
            SqlConnection connection = null;
            int idPersonaEncontrada = 0;
            int idUsuarioEncontrado = 0;
            int modifica = 1;

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();

                    //Parametros de entrada para buscar un usuario
                    var parametrosBuscaPersona = new[]
                    {
                        ParametroAcceso.CrearParametro("@RFC", SqlDbType.VarChar, rfc, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@email", SqlDbType.VarChar, email, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@nombreUsuario", SqlDbType.VarChar, usuario, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idUsuario", SqlDbType.Int, idUsuario, ParameterDirection.Input),
                    };
                    //Ejecuta el sp de busqueda de usuario y regresa un id en el datatable
                    DataTable regresaIdPersona = Ejecuta.EjecutarConsulta(connection, parametrosBuscaPersona, "[dbo].[Usp_CnfUsuariosTConsultarPersonaDif]");

                    //Itera el datatable donde el primer registro que regresa es el id de usuario
                    foreach (DataRow row in regresaIdPersona.Rows)
                    {
                        idPersonaEncontrada = Convert.ToInt32(row["idPersonal"].ToString());
                    }
                    connection.Close();

                    //Si la persona encontrada es la misma q se quiere modificar, se busca si es el mismo nombre de usuario
                    if (idPersonaEncontrada == idPersonal)
                    {
                        connection.Open();

                        //Parametros de entrada para buscar un usuario
                        var parametrosBuscaUsuario = new[]
                        {
                        ParametroAcceso.CrearParametro("@nombreUsuario", SqlDbType.VarChar, usuario, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idUsuario", SqlDbType.Int, idUsuario, ParameterDirection.Input),
                        };
                        //Ejecuta el sp de busqueda de usuario y regresa un id en el datatable
                        DataTable regresaIdUsuarioBuscado = Ejecuta.EjecutarConsulta(connection, parametrosBuscaUsuario, "[dbo].[Usp_CnfUsuariosTConsultarUsuarioDif]");

                        //Itera el datatable donde el primer registro que regresa es el id de usuario
                        foreach (DataRow row in regresaIdUsuarioBuscado.Rows)
                        {
                            idUsuarioEncontrado = Convert.ToInt32(row["idUsuario"].ToString());
                        }
                        connection.Close();

                        //Si la persona es la misma, pero ya tiene un nombreUsuario igual al que quiero modificar, no permitira modificarlo
                        if (idUsuarioEncontrado != idUsuario && idUsuarioEncontrado != 0) {
                            modifica = 0;
                        }
                    }
                    //Si la persona no es la misma (si regresa un id diferente a 0, por que 0 significa q no encontro ninguna coincidencia), no dejara modificar por que ya existe una persona con rfc, mail o nombreUsuario iguales
                    else if (idPersonaEncontrada != 0)
                    {
                        modifica = 0;
                    }

                    if (modifica == 1)
                    {
                        connection.Open();

                        //Parametros de entrada para la modificacion de Personal
                        var parametros = new[]
                        {
                        ParametroAcceso.CrearParametro("@nombre", SqlDbType.VarChar, nombre, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@apPaterno", SqlDbType.VarChar, apPaterno, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@apMaterno", SqlDbType.VarChar, apMaterno, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@RFC", SqlDbType.VarChar, rfc, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idPuesto", SqlDbType.Int, idPuesto, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@c_CP", SqlDbType.Int, cpC, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idEstado", SqlDbType.Int, estadoC, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@email", SqlDbType.VarChar, email, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@acceso_a_sistemas", SqlDbType.VarChar, accesarSistema, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idPersonal", SqlDbType.Int, idPersonal, ParameterDirection.Input),
                    };
                        //Ejecuta el sp de modificacion de personal
                        Ejecuta.ProcedimientoAlmacenado(connection, "[dbo].[Usp_CnfPersonalModificar]", parametros);
                        connection.Close();

                        connection.Open();
                        //Parametros de entrada para la modificacion de Usuario
                        var parametrosUsuario = new[]
                        {
                        ParametroAcceso.CrearParametro("@nombreUsuario", SqlDbType.VarChar, usuario, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@contrasena", SqlDbType.VarChar, pwd, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idUsuario", SqlDbType.Int, idUsuario, ParameterDirection.Input),
                    };
                        //Ejecuta el sp de modificacion de Usuario
                        Ejecuta.ProcedimientoAlmacenado(connection, "[dbo].[Usp_CnfUsuariosTModificar]", parametrosUsuario);
                        connection.Close();

                        connection.Open();
                        //Parametros de entrada para la eliminacion de PersonalUsuario
                        var parametrosPersonalUsuarioElimina = new[]
                        {
                        ParametroAcceso.CrearParametro("@idPersonal", SqlDbType.Int, idPersonal, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idUsuario", SqlDbType.Int, idUsuario, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idRol", SqlDbType.Int, idRolAnterior, ParameterDirection.Input)
                    };
                        //Ejecuta el sp de eliminacion de PersonalUsuario
                        Ejecuta.ProcedimientoAlmacenado(connection, "[dbo].[Usp_CnfPersonalUsuariosTEliminar]", parametrosPersonalUsuarioElimina);
                        connection.Close();

                        //Recorrer el arreglo de privilegios
                        foreach (int i in privilegios)
                        {
                            //Parametros de entrada para la insercion en PersonalUsuario
                            connection.Open();
                            var parametrosPersonalUsuario = new[]
                            {
                            ParametroAcceso.CrearParametro("@idPersonal", SqlDbType.VarChar, idPersonal, ParameterDirection.Input),
                            ParametroAcceso.CrearParametro("@idUsuario", SqlDbType.VarChar, idUsuario, ParameterDirection.Input),
                            ParametroAcceso.CrearParametro("@idRol", SqlDbType.VarChar, idRol, ParameterDirection.Input),
                            ParametroAcceso.CrearParametro("@idPrivilegio", SqlDbType.VarChar, i, ParameterDirection.Input),
                        };
                            //Ejecuta el sp de insercion de usuario y regresa un id en el datatable
                            Ejecuta.ProcedimientoAlmacenado(connection, "[dbo].[Usp_CnfPersonalUsuariosTInsertar]", parametrosPersonalUsuario);
                            connection.Close();
                        }
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

        public bool eliminarPersonalUsuario(int idPersonal, int idUsuario, int idRolAnterior)
        {
            bool respuesta = false;
            ConvertJsonToDataset cj = new ConvertJsonToDataset();
            SqlConnection connection = null;
            int existePersonal = 0;

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    connection.Open();
                    //Parametros de entrada para la eliminacion de PersonalUsuario
                    var parametrosPersonalUsuarioElimina = new[]
                    {
                        ParametroAcceso.CrearParametro("@idPersonal", SqlDbType.Int, idPersonal, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idUsuario", SqlDbType.Int, idUsuario, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@idRol", SqlDbType.Int, idRolAnterior, ParameterDirection.Input)
                    };
                    //Ejecuta el sp de eliminacion de PersonalUsuario
                    DataTable regresaPersona = Ejecuta.EjecutarConsulta(connection, parametrosPersonalUsuarioElimina, "[dbo].[Usp_CnfPersonalUsuariosTEliminar]");

                    //Itera el datatable donde el primer registro que regresa indica si existe otro usuario en la tabla
                    foreach (DataRow row in regresaPersona.Rows)
                    {
                        existePersonal = Convert.ToInt32(row["existePersonal"].ToString());
                    }

                    connection.Close();

                    connection.Open();
                    //Parametros de entrada para la eliminacion de usuario
                    var parametrosUsuario = new[]
                    {
                        ParametroAcceso.CrearParametro("@idUsuario", SqlDbType.Int, idUsuario, ParameterDirection.Input),
                    };
                    //Ejecuta el sp de eliminacion de usuario
                    Ejecuta.ProcedimientoAlmacenado(connection, "[dbo].[Usp_CnfUsuariosTEliminar]", parametrosUsuario);
                    connection.Close();

                    //Si no existen mas usuarios en la tabla de personal usuario, se elimina la persona de la tabla de personal
                    if (existePersonal == 0) {
                        connection.Open();
                        //Parametros de entrada para la eliminacion de personal
                        var parametrosPersonal = new[]
                        {
                        ParametroAcceso.CrearParametro("@idPersonal", SqlDbType.Int, idPersonal, ParameterDirection.Input),
                    };
                        //Ejecuta el sp de eliminacion de personal
                        Ejecuta.ProcedimientoAlmacenado(connection, "[dbo].[Usp_CnfPersonalEliminar]", parametrosPersonal);
                        connection.Close();
                    }
                     respuesta = true;
                    }
                }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return respuesta;
        }
    }
}