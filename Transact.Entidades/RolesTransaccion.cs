using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class RolesTransaccion
    {
        public camposRolesTrans[] CamposRoles { get; set; }
    }

    public class camposRolesTrans
    {
        public int idRol { get; set; }
        public string nombreRol { get; set; }
        public string descripcionRol { get; set; }
        public string estatus { get; set; }
    }
}
