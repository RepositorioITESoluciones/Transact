using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Transact.Framework.AccesoDatos;


namespace Transact.Datos
{
    public class LoginData
    {

        public Entidades.Usuario Validausuario(string nameUser ,string password)
        {

            DataTable dt = new DataTable();
            SqlConnection connection = null;
            Entidades.Usuario usuario = new Entidades.Usuario();
            DataSet DSCampos = new DataSet();
            DataTable DTCampos = new DataTable();


            using (connection = Conexion.ObtieneConexion("ConexionBD"))
            {
                SqlDataReader consulta;
                connection.Open();
                consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT u.idUsuario , nombreUsuario, contrasena, u.idTipoTransaccion, VCT.idTransaccion,R.nombreRol, camposTransaccion"
                                                                  + " FROM Configuracion.USUARIOS U, Configuracion.MAETransacciones MAE, Configuracion.ValoresCamposTransacciones VCT, Seguridad.UsuariosRoles UR, Seguridad.Roles R"
                                                                  + " WHERE R.idRol = UR.idRol"
                                                                  + " and u.idUsuario = UR.idUsuario"
                                                                  + " and MAE.idTransaccion = VCT.idTransaccion"
                                                                  + " and MAE.idTipoTransaccion = u.idTipoTransaccion"
                                                                  + " and u.estatus = 1 and nombreUsuario = '" + nameUser + "'   " 
                                                                  + " and contrasena = '" + password+"'");
                dt.Load(consulta);
                connection.Close();
            }


            if (dt.Rows.Count != 0)
            {

                ConvertJsonToDataset CONVERT = new ConvertJsonToDataset();
                int idUsuario = 0;
                string nombreRol = "";

                foreach (DataRow row in dt.Rows)
                {

                    idUsuario = Convert.ToInt32(row["idUsuario"]);
                    nombreRol = row["nombreRol"].ToString();

                    DSCampos = CONVERT.ConvertJsonStringToDataSet(row["camposTransaccion"].ToString());   

                }


                DTCampos = DSCampos.Tables["Cabecera"];


                var query1 =
                   from product in DTCampos.AsEnumerable()
                   where product.Field<string>("idPersonal") == idUsuario.ToString()
                   select new
                   {
                       idPersonal = product.Field<string>("idPersonal"),
                       nombreRol1 = nombreRol,
                       nombre = product.Field<string>("nombre"),
                       apPaterno = product.Field<string>("apPaterno"),
                       apMaterno = product.Field<string>("apMaterno"),
                       RFC = product.Field<string>("RFC"),
                       idPerfil = product.Field<string>("idPerfil"),
                       idPuesto = product.Field<string>("idPuesto"),
                       idArea = product.Field<string>("idArea"),
                       CP = product.Field<string>("CP"),
                       idEstado = product.Field<string>("idEstado"),
                       email = product.Field<string>("email"),
                       fechaAlta = product.Field<string>("fechaAlta"),
                       fechaModificacion = product.Field<string>("fechaModificacion"),
                       idEstatus = product.Field<string>("idEstatus"),
                       activo = product.Field<string>("activo")
                       

                   };



                foreach (var item in query1)
                {
                    usuario.idPersonal = Convert.ToInt32(item.idPersonal);
                    usuario.nombre = item.nombre;
                    usuario.apPaterno = item.apPaterno;
                    usuario.apMaterno = item.apMaterno;
                    usuario.RFC = item.RFC;
                    usuario.idPerfil = Convert.ToInt32(item.idPerfil);
                    usuario.idPuesto = Convert.ToInt32(item.idPuesto);
                    usuario.idArea = Convert.ToInt32(item.idArea);
                    usuario.CP = item.CP;
                    usuario.idEstado = Convert.ToInt32(item.idEstado);
                    usuario.email = item.email;
                    usuario.fechaAlta = item.fechaAlta;
                    usuario.fechaModificacion = item.fechaModificacion;
                    usuario.nombreRol = item.nombreRol1;
                    
                }




            }
            else
            {
                usuario = null;

            }


           






            return usuario;
            
        }


    }
}
