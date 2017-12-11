using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class EntidadProceso
    {
        public CamposProceso[] ListaProcesos { get; set; }
    }

    public class CamposProceso
    {
        public int idProceso { get; set; }
        public String nombreProceso { get; set; }
        public String descripcion { get; set; }
        public CamposAreaByProceso idArea { get; set; }
        public string fechaAlta { get; set; }
    }

}
