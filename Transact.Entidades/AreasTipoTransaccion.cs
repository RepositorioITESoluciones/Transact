using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class AreasTipoTransaccion
    {
        public datosAreasTransaccion[] datAreasTransac { get; set;}
    }

    public class datosAreasTransaccion
    {
        public int idArea { get; set; }
        public string descripcion { get; set; }
        public bool activo { get; set; }
    }
}
