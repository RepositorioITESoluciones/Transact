using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class Roles
    {
        public CamposRoles[] listaRegistrosRoles;
    }
    public class CamposRoles
    {
        public int idRol { set; get; }
        public string nombreRol { set; get; }
        public string descripcionRol { set; get; }
        public string chkMenu { set; get; }
        public CamposMenus camposMenus { set; get; }
    }
}
