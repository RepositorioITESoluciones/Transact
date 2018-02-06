using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class NegocioGiros
    {
        public CamposGiros[] listGiros { get; set; }
    }

    public class CamposGiros
    {

        public int idGiro { get; set; }       
        public string nombre { get; set; }
        public bool activo { get; set; }


    }

}
