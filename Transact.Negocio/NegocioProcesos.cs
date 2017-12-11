using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Transact.Datos;
using Transact.Entidades;

namespace Transact.Negocio
{
    public class NegocioProceso
    {

        DatosProceso clasedatos = new DatosProceso();

        public EntidadProceso LlenaTablaProceso()
        {
            EntidadProceso listadatos;

            listadatos = clasedatos.LlenaTablaDatosProceso();

            return listadatos;
        }

        public bool InsertaProcesos(CamposProceso campos)
        {
            bool respuesta = false;
            try
            {
                clasedatos.InsertaDatosProcesos(campos);
                respuesta = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return respuesta;
        }

        public bool ActualizarProceso(CamposProceso campos)
        {
            bool respuesta = false;
            try
            {
                clasedatos.ActualizarDatosProcesos(campos);
                respuesta = true;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return respuesta;
        }
        public bool EliminarProceso(CamposProceso campos)
        {
            bool respuesta = false;

            respuesta = clasedatos.EliminaProceso(campos);
            return respuesta;
        }

        public AreasBYProceso LlenaComboArea()
        {
            AreasBYProceso listadatos;
            listadatos = clasedatos.LlenaComboArea();
            return listadatos;
        }
    }
}
