using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class ComboCPostal
    {
        public CamposCodigosPostales[] listaCodigosPostales { get; set; }
    }
    public class CamposCodigosPostalesEntidad
    {
        public int c_CP { get; set; }
        public string nombre { get; set; }
    }
}
