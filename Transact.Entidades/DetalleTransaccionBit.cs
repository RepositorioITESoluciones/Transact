using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class DetalleTransaccionBit
    {
        public camposDetalleTB[] lisCamposDetalleTB { get; set; }
    }

    public class camposDetalleTB
    {
        public Int64 folioTransaccion { get; set; }
        public string nombreTransaccion { get; set; }
        public string fechaIniTransaccion { get; set; }
        public string Clave { get; set; }
        public string Rol { get; set; }
        public string EtapaAtual { get; set; }

        public string idEtapa { get; set; }
        public string idAccion { get; set; }

        public string etapaSiguiente { get; set; }
        public string idEtapaFut { get; set; }
    }
}
