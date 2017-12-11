using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using System.Xml;
using System.Xml.Serialization;


namespace Transact.Negocio
{
    public class Transacciones
    {
        public  DataTable ObtieneTransacciones()
        {           
            return Datos.Transacciones.ObtieneTransacciones();
        }
        public static List<XmlDocument> ConsultaTransacciones(int idEstatus)
        {
            return Datos.Transacciones.ConsultaTransacciones(idEstatus);
        }

        public  DataTable TipoTransacciones()
        {
            return Datos.Transacciones.TiposTransacciones();
        }
        public  XmlDocument CamposTransacciones(int idtransaccion)
        {
            return Datos.Transacciones.CamposTransaccion(idtransaccion);
        }

        public String ObtenerTransaccion(int idtransaccion) {
            Datos.Transacciones Dt = new Datos.Transacciones();
           
            String valores = Dt.Consulta(idtransaccion);
            return valores;
        }

    }
}
