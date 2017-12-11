using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class ComboRoles
    {
        public CamposRoless[] listaRoles { get; set; }
    }
    public class CamposRoless
    {
        public int idRol { get; set; }
        public string nombreRol { get; set; }
    }
}
