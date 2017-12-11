using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class EnFormula
    {
        public CamposEnFormula[] listaformula {get; set;}
    }

    public class CamposEnFormula
    {
        public string Etapa { get; set; }
        public string Accion { get; set; }
        public string nombreCampo { get; set; }
        public string cadenaGenerada { get; set; }
        public int idCampo { get; set; }
        public int idEtapa { get; set; }
        public int idAccion { get; set; }
    }
}
