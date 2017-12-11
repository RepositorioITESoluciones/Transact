using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class ComboPersonal
    {
        public CamposPersonal[] listaPersonal { get; set; }
    }

    public class CamposPersonal
    {
        public int idPersonal { get; set; }
        public string nombrePersonal { get; set; }
    }
}
