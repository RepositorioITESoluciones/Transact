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
    public class DatosSucursal
    {
        public Sucursal LlenaComboDatosFiscales()
        {
            Sucursal campos = new Sucursal();
            DataTable dt = new DataTable();
            List<CamposSucursal> camposDatosFiscales = new List<CamposSucursal>();


            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "[Usp_CatDatosFiscalesMostrar] ");
                    dt.Load(consulta);
                    connection.Close();
                }


                foreach (DataRow row in dt.Rows)
                {
                    CamposSucursal reg = new CamposSucursal();
                    reg.idDatosFiscales = Convert.ToInt32(row["idDatosFiscales"].ToString());
                    reg.DatosFiscales.RFC = row["rfc"].ToString();
                    camposDatosFiscales.Add(reg);
                }
                campos.ListaRegistrosSucursal = camposDatosFiscales.ToArray();


            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);


            }

            return campos;

        }
        public Estado LlenaComboEstados()
        {
            Estado campos = new Estado();
            DataTable dt = new DataTable();
            List<CamposEstado> ListaCamposEstado = new List<CamposEstado>();


            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "[Usp_CombEstadosMostrar] ");
                    dt.Load(consulta);
                    connection.Close();
                }


                foreach (DataRow row in dt.Rows)
                {
                    CamposEstado reg = new CamposEstado();
                    reg.idEstado = Convert.ToInt32(row["idEstado"].ToString());
                    reg.descripcion = row["descripcion"].ToString();
                    ListaCamposEstado.Add(reg);
                }
                campos.ListaRegistrosEstado = ListaCamposEstado.ToArray();


            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);


            }

            return campos;

        }

        public NegocioGiros LlenaComboGiros()
        {
            NegocioGiros campos = new NegocioGiros();
            DataTable dt = new DataTable();
            List<CamposGiros> ListaCamposGiros = new List<CamposGiros>();


            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "[Usp_ComboGiros] ");
                    dt.Load(consulta);
                    connection.Close();
                }


                foreach (DataRow row in dt.Rows)
                {
                    CamposGiros reg = new CamposGiros();
                    reg.idGiro = Convert.ToInt32(row["idGiro"].ToString());
                    reg.nombre = row["nombre"].ToString();
                    reg.activo = Convert.ToBoolean(row["activo"].ToString());
                    ListaCamposGiros.Add(reg);
                }
                campos.listGiros = ListaCamposGiros.ToArray();


            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);


            }

            return campos;

        }

        public TipoPersona LlenaComboTipoPersona()
        {
            TipoPersona campos = new TipoPersona();
            DataTable dt = new DataTable();
            List<CamposTipoPersona> ListaCamposTipoPersona = new List<CamposTipoPersona>();


            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "[Usp_ComboTipoPersona]");
                    dt.Load(consulta);
                    connection.Close();
                }


                foreach (DataRow row in dt.Rows)
                {
                    CamposTipoPersona reg = new CamposTipoPersona();
                    reg.IdTipoPersona = Convert.ToInt32(row["idTipoPersona"].ToString());
                    reg.TipoPersona = row["TipoPersona"].ToString();
                    ListaCamposTipoPersona.Add(reg);
                }
                campos.ListaRegTipoPersona = ListaCamposTipoPersona.ToArray();


            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);


            }

            return campos;

        }
        public Sucursal LlenaComboEmpresa()
        {
            Sucursal campos = new Sucursal();
            DataTable dt = new DataTable();
            List<CamposSucursal> camposEmpresas = new List<CamposSucursal>();


            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "[Usp_CatEmpresasMostrar]");
                    dt.Load(consulta);
                    connection.Close();
                }


                foreach (DataRow row in dt.Rows)
                {
                    CamposSucursal reg = new CamposSucursal();
                    reg.idEmpresa = Convert.ToInt32(row["idEmpresa"].ToString());
                    reg.empresa = row["nombre"].ToString();
                    camposEmpresas.Add(reg);
                }
                campos.ListaRegistrosSucursal = camposEmpresas.ToArray();


            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);


            }

            return campos;

        }
        public Sucursal LlenaTablaSucursales()
        {
            Sucursal listadatos = new Sucursal();
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<CamposSucursal> composList = new List<CamposSucursal>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "[Usp_CatSucursalMostrar]");
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    CamposSucursal reg = new CamposSucursal();
                    reg.DatosFiscales = new CamposDatosFiscales();
                    reg.DatosFiscales.Estado = new CamposEstado();
                    reg.DatosFiscales.TipoPersona = new CamposTipoPersona();
                    reg.idSucursal = Convert.ToInt32(row["idSucursal"].ToString());
                    reg.nombre = row["Sucursal"].ToString();
                    reg.idEmpresa = Convert.ToInt32(row["idEmpresa"].ToString());
                    reg.empresa = row["Empresa"].ToString();
                    reg.idDatosFiscales = Convert.ToInt32(row["idDatosFiscales"].ToString());
                    reg.DatosFiscales.RFC = row["RFC"].ToString();
                    reg.DatosFiscales.RazonSocial = row["razonSocial"].ToString();
                    reg.DatosFiscales.Calle = row["calle"].ToString();
                    reg.DatosFiscales.NumeroExterior = row["numeroExterior"].ToString();
                    reg.DatosFiscales.NumeroInterior = row["numeroInterior"].ToString();
                    reg.DatosFiscales.Estado.idEstado = Convert.ToInt32(row["idEstado"].ToString());
                    reg.DatosFiscales.C_CP = Convert.ToInt32(row["c_CP"].ToString());
                    reg.DatosFiscales.TipoPersona.IdTipoPersona = Convert.ToInt32(row["idTipoPersona"].ToString());
                    composList.Add(reg);
                }
                listadatos.ListaRegistrosSucursal = composList.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return listadatos;
        }
        public bool InsertaSucursalBySP(CamposSucursal campos)
        {
            bool respuesta = false;
            int idSucursalEncontrado = 0;
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();

                    //Parametros de entrada para buscar un usuario
                    var parametrosBuscaUsuario = new[]
                    {
                        ParametroAcceso.CrearParametro("@razonSocial", SqlDbType.VarChar, campos.DatosFiscales.RazonSocial, ParameterDirection.Input),
                        ParametroAcceso.CrearParametro("@RFC", SqlDbType.VarChar, campos.DatosFiscales.RFC, ParameterDirection.Input),
                    };
                    //Ejecuta el sp de busqueda de usuario y regresa un id en el datatable
                    DataTable regresaIdUsuarioBuscado = Ejecuta.EjecutarConsulta(connection, parametrosBuscaUsuario, "[dbo].[Usp_CatSucursalConsultarSucursal]");

                    //Itera el datatable donde el primer registro que regresa es el id de usuario
                    foreach (DataRow row in regresaIdUsuarioBuscado.Rows)
                    {
                        idSucursalEncontrado = Convert.ToInt32(row["idSucursal"].ToString());
                    }
                    connection.Close();

                    if (idSucursalEncontrado == 0)
                    {
                        connection.Open();
                        var parametros = new[]
                         {
                    ParametroAcceso.CrearParametro("@nombre", SqlDbType.VarChar, campos.nombre , ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@idEmpresa", SqlDbType.Int, campos.idEmpresa , ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@razonSocial", SqlDbType.VarChar, campos.DatosFiscales.RazonSocial, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@RFC", SqlDbType.VarChar, campos.DatosFiscales.RFC, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@TipoPersona", SqlDbType.Int, campos.DatosFiscales.TipoPersona.IdTipoPersona, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@Calle", SqlDbType.VarChar, campos.DatosFiscales.Calle, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@numExt", SqlDbType.VarChar, campos.DatosFiscales.NumeroExterior, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@numInt", SqlDbType.VarChar, campos.DatosFiscales.NumeroInterior, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@CP", SqlDbType.Int, campos.DatosFiscales.C_CP, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@Estado", SqlDbType.Int, campos.DatosFiscales.Estado.idEstado, ParameterDirection.Input)

                };
                        Ejecuta.ProcedimientoAlmacenado(connection, "[Usp_CatSucursalInsertar]", parametros);
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
        public bool actualizarSucursalBySP(CamposSucursal campos)
        {
            bool respuesta = false;
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametros = new[]{
                    ParametroAcceso.CrearParametro("@nombre", SqlDbType.VarChar, campos.nombre , ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@idEmpresa", SqlDbType.Int, campos.idEmpresa , ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@razonSocial", SqlDbType.VarChar, campos.DatosFiscales.RazonSocial, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@RFC", SqlDbType.VarChar, campos.DatosFiscales.RFC, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@TipoPersona", SqlDbType.Int, campos.DatosFiscales.TipoPersona.IdTipoPersona, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@Calle", SqlDbType.VarChar, campos.DatosFiscales.Calle, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@numExt", SqlDbType.VarChar, campos.DatosFiscales.NumeroExterior, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@numInt", SqlDbType.VarChar, campos.DatosFiscales.NumeroInterior, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@CP", SqlDbType.Int, campos.DatosFiscales.C_CP, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@Estado", SqlDbType.Int, campos.DatosFiscales.Estado.idEstado, ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@idSucursal", SqlDbType.Int, campos.idSucursal , ParameterDirection.Input)
                    };
                    Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CatSucursalActualizar", parametros);
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
        public bool EliminaSucursalBySP(CamposSucursal campos)
        {
            bool respuesta = false;
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametros = new[]{

                     ParametroAcceso.CrearParametro("@idSucursal", SqlDbType.Int, campos.idSucursal , ParameterDirection.Input)
                    };
                    Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CatSucursalEliminar", parametros);
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
        /*
        public CodigoPostal LlenaComboCP(int idEstado)
        {
            CodigoPostal campos = new CodigoPostal();
            DataTable dt = new DataTable();
            List<CamposCP> ListaCamposCP = new List<CamposCP>();


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
                    CamposCP reg = new CamposCP();
                    reg.c_CP = Convert.ToInt32(row["c_CP"].ToString());
                    reg.d_ciudad = row["nombre"].ToString();
                    ListaCamposCP.Add(reg);
                }
                campos.ListaRegistroCP = ListaCamposCP.ToArray();


            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);


            }

            return campos;

        }
    }*/

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
    }
}
