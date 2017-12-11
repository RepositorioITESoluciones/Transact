using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class ComboPrivilegios
    {
        public CamposPrivilegios[] listaPrivilegios { get; set; }
    }
    public class CamposPrivilegios
    {
        public int idPrivilegio { get; set; }
        public string descripcionPrivilegio { get; set; }
    }
}
