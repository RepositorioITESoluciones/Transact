using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Transact.Datos;
using Transact.Entidades;

namespace Transact.Negocio
{
    public class NegocioArea
    {
        DatosArea clasedatos = new DatosArea();

        public Area LlenaTabla()
        {
            Area listadatos;

            listadatos = clasedatos.LlenaTablaDatos();

            return listadatos;
        }

        public bool InsertaAreaNegocio(CamposArea areas)
        {
            bool respuesta = false;
            try
            {
                clasedatos.InsertaAreaBySP(areas);
                respuesta = true;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

            }

            return respuesta;
        }

        public bool InsertaAreaxSucursalNegocio(CamposArea areas)
        {
            bool respuesta = false;
            try
            {
                clasedatos.InsertaAreaxSucursalBySP(areas);
                respuesta = true;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

            }

            return respuesta;
        }

        public bool actualizarAreaNegocio(CamposArea camposArea, int[] idSucursal)
        {
            bool respuesta = false;

            respuesta = clasedatos.actualizarAreaBySP(camposArea, idSucursal);
            return respuesta;
        }

        public bool eliminarAreaNegocio(int idArea)
        {
            bool respuesta = false;

            respuesta = clasedatos.EliminaAreaBySP(idArea);
            return respuesta;
        }

        public Sucursal LlenacomboSucursalNegocio()
        {
            Sucursal listadatos;

            listadatos = clasedatos.LlenaComboSucursal();

            return listadatos;
        }

        public Area LlenaCheckBoxAreasEdit(CamposArea camposArea)
        {
            Area listadatos;

            listadatos = clasedatos.LlenaCheckBoxAreasEdit(camposArea);

            return listadatos;
        }


    }
}
