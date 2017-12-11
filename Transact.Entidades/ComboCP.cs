using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class ComboCP
    {
        public CamposCodigosPostales[] listaCodigosPostales { get; set; }
    }
    public class CamposCodigosPostales
    {
        public int id { get; set; }
        public string nombre { get; set; }
    }
}
