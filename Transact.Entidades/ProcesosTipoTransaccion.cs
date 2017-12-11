using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class ProcesosTipoTransaccion
    {
        public CamposProcesos[] CamposProcesosTran {get; set;}
    }

    public class CamposProcesos
    {
        public int idProceso { get; set; }
        public string descripcion { get; set; }
        public int idArea { get; set; }
        public DateTime fechaAlta { get; set; }
        public bool activo { get; set; }
    }
}
