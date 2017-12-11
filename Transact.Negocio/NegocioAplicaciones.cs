using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Transact.Datos;
using Transact.Entidades;

namespace Transact.Negocio
{
    public class NegocioAplicaciones
    {
        DatosAplicaciones datosAplicaciones = new DatosAplicaciones();
        public Aplicaciones llenaTablaAplicaciones()
        {
            Aplicaciones listaDatos;
            listaDatos = datosAplicaciones.llenaTablaAplicaciones();
            return listaDatos;
        }

        public bool insertarAplicaciones(CamposAplicaciones campos)
        {
            bool respuesta = false;
            try
            {
                respuesta = datosAplicaciones.insertarAplicaciones(campos);
                //respuesta = true;
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
            try
            {
                respuesta = datosAplicaciones.modificarAplicaciones(campos);
                //respuesta = true;
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
            try
            {
                respuesta = datosAplicaciones.eliminarAplicaciones(idAplicacion);
                //respuesta = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return respuesta;
        }
    }
}
