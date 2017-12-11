using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Transact.Datos;
using Transact.Entidades;

namespace Transact.Negocio
{
    public class NegocioMenus
    {
        DatosMenus clasedatos = new DatosMenus();

        public Menus LlenaTablaMenus()
        {
            Menus listadatos;

            listadatos = clasedatos.LlenaTablaMenus();

            return listadatos;
        }

        public bool InsertaMenuNegocio(CamposMenus camposMenus, int[] idAplicaciones)
        {
            bool respuesta = false;
            try
            {
                clasedatos.InsertaMenuNegocio(camposMenus, idAplicaciones);
                respuesta = true;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

            }

            return respuesta;
        }

        public bool actualizarMenuNegocio(CamposMenus camposMenus, int[] idAplicaciones)
        {
            bool respuesta = false;

            respuesta = clasedatos.actualizarMenuBySP(camposMenus, idAplicaciones);
            return respuesta;
        }

        public bool eliminarAreaNegocio(int idArea)
        {
            bool respuesta = false;

            respuesta = clasedatos.EliminaAreaBySP(idArea);
            return respuesta;
        }

        public Aplicaciones LlenaCheckAplicaciones()
        {
            Aplicaciones listadatos;

            listadatos = clasedatos.LlenaCheckAplicaciones();

            return listadatos;
        }

        public Menus LlenaComboMenuPadre()
        {
            Menus listadatos;

            listadatos = clasedatos.LlenaComboMenuPadre();

            return listadatos;
        }

        public Menus LlenaCheckBoxMenusEdit(CamposMenus camposMenus)
        {
            Menus listadatos;

            listadatos = clasedatos.LlenaCheckBoxMenusEdit(camposMenus);

            return listadatos;
        }


    }
}
