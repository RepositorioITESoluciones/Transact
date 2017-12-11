using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{


    public class LisFormula
    {
        public DTFormula[] listFormula { get; set; }
    }
    public class DTFormula
    {
        public string idEtapa { get; set; }
        public string idAccion { get; set; }
        public string  formula { get; set; }
        public string nombreEtapa { get; set; }
        public string nombreAccion { get; set; }

    }
}
