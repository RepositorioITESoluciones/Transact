using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class EntEtapas
    {


        public class EtapasCombo
        {
            public Etapacombo[] listEtapas { get; set; }
        }



        public class Etapacombo
        {
            public int idEtapa{ get; set; }
            public string nombreEtapa { get; set; }
            public string descripcion { get; set; }
            public string ClaveEtapa { get; set; }
            public int orden { get; set; }
            public int idAccion { get; set; }
        }


    }
}
