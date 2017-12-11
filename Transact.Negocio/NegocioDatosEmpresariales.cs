using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Transact.Datos;
using Transact.Entidades;

namespace Transact.Negocio
{
    public class NegocioDatosEmpresariales
    {

        DatosDatosEmpresariales clasedatos = new DatosDatosEmpresariales();

        public DatosEmpresariales LlenaTablaDE()
        {
            DatosEmpresariales listadatos;

            listadatos = clasedatos.LlenaTablaDatosDE();

            return listadatos;
        }

        public bool InsertaDatosEmpresariales(CamposDatosEmpresariales campos)
        {
            bool respuesta = false;
            try
            {

                clasedatos.InsertaDatosEmpresariales(campos);
                respuesta = true;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

            }

            return respuesta;
        }

        public bool ActualizarDatosEmpresariales(CamposDatosEmpresariales campos)
        {
            bool respuesta = false;
            try
            {

                clasedatos.ActualizarDatosEmpresariales(campos);
                respuesta = true;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

            }

            return respuesta;
        }
        public bool EliminarDatosEmpresariales(CamposDatosEmpresariales campos)
        {
            bool respuesta = false;

            respuesta = clasedatos.EliminaDatosEmpresariales(campos);
            return respuesta;
        }

        public TipoPersona LlenaComboTipoPersona()
        {
            TipoPersona listadatos;

            listadatos = clasedatos.LlenaComboTipoPersona();

            return listadatos;
        }

        public CodigoPostal LlenaComboCP(int idEstado)
        {
            CodigoPostal listaDatos;

            listaDatos = clasedatos.LlenaComboCP(idEstado);

            return listaDatos;
        }


        public Estado LlenaComboEstados()
        {
            Estado listadatos;

            listadatos = clasedatos.LlenaComboEstados();

            return listadatos;
        }

    }
}
