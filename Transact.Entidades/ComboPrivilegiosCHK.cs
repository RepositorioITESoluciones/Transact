using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class ComboPrivilegiosCHK
    {
        public CamposPrivilegiosCHK[] listaPrivilegiosCHK { get; set; }
    }
    public class CamposPrivilegiosCHK
    {
        public int idPrivilegio { get; set; }
        public string descripcionPrivilegio { get; set; }
        public string estatus { get; set; } 
    }
}
