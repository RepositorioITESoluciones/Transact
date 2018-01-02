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
    public class DatosProceso
    {

        public EntidadProceso LlenaTablaDatosProceso()
        {
            EntidadProceso listadatos = new EntidadProceso();
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            List<CamposProceso> camposList = new List<CamposProceso>();

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ProcedimientoAlmacenado(connection, "Usp_ProcesosConsulta", null);
                    dt.Load(consulta);
                    connection.Close();
                }
                foreach (DataRow row in dt.Rows)
                {

                    CamposProceso pro = new CamposProceso();

                    pro.idProceso = Convert.ToInt32(row["idProceso"].ToString());
                    pro.nombreProceso = row["nombreProceso"].ToString();
                    pro.descripcion = row["descripcion"].ToString();
                    pro.idArea = new CamposAreaByProceso();
                    pro.idArea.nombreArea = row["nombreArea"].ToString();
                    pro.idArea.idArea = Convert.ToInt32(row["idArea"].ToString());
                    camposList.Add(pro);

                }
                listadatos.ListaProcesos = camposList.ToArray();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            return listadatos;
        }

        public bool InsertaDatosProcesos(CamposProceso campos){
            bool respuesta = false;
            SqlConnection connection = null;
            try{
                int validaNombreProceso = 0;
                DataTable dt = new DataTable();

                //Valida que no exista un proceso con el mismo nombre
                using (connection = Conexion.ObtieneConexion("ConexionBD")){
                    SqlDataReader consulta;
                    connection.Open();
                  
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT count(*) as hay from [Negocio].[Procesos] where(nombreProceso) = '" + campos.nombreProceso + "' and activo = 1; ");
                    dt.Load(consulta);
                    connection.Close();

                }
                foreach (DataRow row in dt.Rows){
                    validaNombreProceso = Convert.ToInt32(row["hay"].ToString());
                }

                if (validaNombreProceso >=  1) {
                    respuesta = false;
                } else if (validaNombreProceso == 0) {

                    using (connection = Conexion.ObtieneConexion("ConexionBD")) {
                    connection.Open();
                    var parametros = new[]{
                    ParametroAcceso.CrearParametro("@nombreProceso", SqlDbType.VarChar, campos.nombreProceso , ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@descripcionProceso", SqlDbType.VarChar, campos.descripcion , ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@idArea", SqlDbType.Int, campos.idArea.idArea, ParameterDirection.Input)
                    };
                    Ejecuta.ProcedimientoAlmacenado(connection, "Usp_ProcesosInsertar", parametros);
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


        public bool ActualizarDatosProcesos(CamposProceso campos)
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

                    ParametroAcceso.CrearParametro("@idProceso", SqlDbType.Int, campos.idProceso , ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@nombreProceso", SqlDbType.VarChar, campos.nombreProceso , ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@descripcion", SqlDbType.VarChar, campos.descripcion , ParameterDirection.Input),
                    ParametroAcceso.CrearParametro("@idArea", SqlDbType.Int, campos.idArea.idArea, ParameterDirection.Input),
                };
                    Ejecuta.ProcedimientoAlmacenado(connection, "Usp_ProcesoActualizar", parametros);
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

        public bool EliminaProceso(CamposProceso campos)
        {
            bool respuesta = false;
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    connection.Open();
                    var parametros = new[]{
                     ParametroAcceso.CrearParametro("@idProceso", SqlDbType.Int, campos.idProceso , ParameterDirection.Input)
                    };
                    Ejecuta.ProcedimientoAlmacenado(connection, "Usp_ProcesosEliminar", parametros);
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


        public AreasBYProceso LlenaComboArea()
        {
            AreasBYProceso campos = new AreasBYProceso();
            DataTable dt = new DataTable();
            List<CamposAreaByProceso> ListaAreaCombo = new List<CamposAreaByProceso>();
            SqlConnection connection = null;
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "Usp_ComboAreaBYProceso");
                    dt.Load(consulta);
                    connection.Close();
                }

                foreach (DataRow row in dt.Rows)
                {
                    CamposAreaByProceso reg = new CamposAreaByProceso();
                    reg.idArea = Convert.ToInt32(row["idArea"].ToString());
                    reg.nombreArea = row["nombreArea"].ToString();
                    ListaAreaCombo.Add(reg);
                }
                campos.ListaAreaByProceso = ListaAreaCombo.ToArray();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

            }
            return campos;
        }
    }
}
