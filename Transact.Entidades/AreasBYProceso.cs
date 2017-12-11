using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class AreasBYProceso
    {
        public CamposAreaByProceso [] ListaAreaByProceso { get; set; }
    }
        public class CamposAreaByProceso
        {
            public int idArea { get; set; }
            public string nombreArea { get; set; }
            public string descripcion { get; set; }
            public bool activo { get; set; }
        }
    
}
