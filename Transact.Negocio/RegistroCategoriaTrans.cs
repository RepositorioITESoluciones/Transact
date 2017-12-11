using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Transact.Datos;
using Transact.Entidades;


namespace Transact.Negocio {

    public class RegistroCategoriaTrans {

        DatosCategoriaTrans clasedatos = new DatosCategoriaTrans();

        public EntidadCategoriaTransa LlenaTablaTransaccion()
        {
            EntidadCategoriaTransa listadatos;

            listadatos = clasedatos.LlenaTablaCategoriaDatos();

            return listadatos;
        }

        public bool InsertarCategoriaTransaccionNegocio(CamposCategoriaTrans campos)
        {
            bool respuesta = false;
            try
            {
                clasedatos.InsertarCategoriaTransaccion(campos);
                respuesta = true;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return respuesta;
        }

        public bool ActualizarCategoriaTransaccionNegocio(CamposCategoriaTrans campos)
        {
            bool respuesta = false;
            try
            {
                clasedatos.ActualizarCategoriaTransaccion(campos);
                respuesta = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return respuesta;
        }
        public bool EliminarCategoriaTransaccionNegocio(CamposCategoriaTrans campos)
        {
            bool respuesta = false;

            respuesta = clasedatos.EliminarcategoriaTransaccion(campos);
            return respuesta;
        }

    }
}
