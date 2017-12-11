using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class AccionesEnt
    {
        public class AccionesCombo
        {
            public Accioncombo[] listAcciones{ get; set; }
        }



        public class Accioncombo
        {
            public int idAccion { get; set; }
            public string descripcion { get; set; }
        }
    }
}
