using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Transact.Entidades;
using System.Data.SqlClient;
using System.Data;
using Transact.Framework.AccesoDatos;

namespace Transact.Datos {
    public class DatosCategoriaTrans {

        //Método encargado de Consultar y llenar DataTable de categoria transacción
        public EntidadCategoriaTransa LlenaTablaCategoriaDatos()
        {
            EntidadCategoriaTransa listadatos = new EntidadCategoriaTransa();
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<CamposCategoriaTrans> camposList = new List<CamposCategoriaTrans>();
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CategoriaTransaccionConsulta", null);
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {
                    CamposCategoriaTrans campos = new CamposCategoriaTrans();

                    campos.idCatTipoTransac = Convert.ToInt32(row["idCatTipoTransac"].ToString());
                    campos.categoriaTransac = row["categoriaTransac"].ToString();
                    campos.descripcionCategoria = row["descripcionCategoria"].ToString();
                    camposList.Add(campos);

                }
                listadatos.ListaCategorias = camposList.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return listadatos;
        }

        //Metodo encargado de insertar una categoría de transacción
        public bool InsertarCategoriaTransaccion(CamposCategoriaTrans campos)
        {
            bool respuesta = false;
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametros = new[]{
                    ParametroAcceso.CrearParametro("@categoriaTransac", SqlDbType.VarChar, campos.categoriaTransac , ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@descripcionCategoria", SqlDbType.VarChar, campos.descripcionCategoria , ParameterDirection.Input)
                    };
                    Ejecuta.ProcedimientoAlmacenado(connection, "[Usp_InsertarCategoriaTransaccion]", parametros);
                    connection.Close();
                    respuesta = true;
                }
            }
            catch (Exception ex)
            {
                respuesta = false;
                Console.WriteLine(ex);
            }
            return respuesta;
        }

        //Metodo encargado de actualizar una categoría de transacción
        public bool ActualizarCategoriaTransaccion(CamposCategoriaTrans campos)
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

                    ParametroAcceso.CrearParametro("@idCatTipoTransac", SqlDbType.Int, campos.idCatTipoTransac , ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@categoriaTransac", SqlDbType.VarChar, campos.categoriaTransac , ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@descripcionCategoria", SqlDbType.VarChar, campos.descripcionCategoria , ParameterDirection.Input),
                   
                };
                    Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CategoriaTransaccionActualizar", parametros);
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


        //Metodo encargado de eliminar una categoría de transacción
        public bool EliminarcategoriaTransaccion(CamposCategoriaTrans campos)
        {
            bool respuesta = false;
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametros = new[]{
                     ParametroAcceso.CrearParametro("@idCatTipoTransac", SqlDbType.Int, campos.idCatTipoTransac , ParameterDirection.Input)
                    };
                    Ejecuta.ProcedimientoAlmacenado(connection, "Usp_CategoriaTransaccionEliminar", parametros);
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
