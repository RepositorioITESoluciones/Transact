using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Transact.Datos;
using Transact.Entidades;

namespace Transact.Negocio
{
    public class NegocioRoles
    {
        DatosRoles clasedatos = new DatosRoles();

        public Roles LlenaTabla()
        {
            Roles listadatos;

            listadatos = clasedatos.LlenaTablaDatos();

            return listadatos;
        }

        public bool InsertaRolNegocio(CamposRoles roles, int[] idMenus)
        {
            bool respuesta = false;
            try
            {
                clasedatos.InsertaRolBySP(roles, idMenus);
                respuesta = true;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

            }

            return respuesta;
        }

        public bool actualizarRolNegocio(CamposRoles camposRol, int[] idMenus)
        {
            bool respuesta = false;

            respuesta = clasedatos.actualizarRolBySP(camposRol, idMenus);
            return respuesta;
        }

        public bool eliminarRolNegocio(CamposRoles campos)
        {
            bool respuesta = false;

            respuesta = clasedatos.EliminaRolBySP(campos);
            return respuesta;
        }

        public Menus LlenaCheckMenul()
        {
            Menus listadatos;

            listadatos = clasedatos.LlenaCheckMenu();

            return listadatos;
        }

        public Roles LlenaCheckBoxRolEdit(CamposRoles camposRoles)
        {
            Roles listadatos;

            listadatos = clasedatos.LlenaCheckBoxRolEdit(camposRoles);

            return listadatos;
        }


    }
}
