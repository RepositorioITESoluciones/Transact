using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class BitacoraTransacciones
    {
        public camposBitacora[] lista { get; set; }
    }

    public class camposBitacora
    {
      public int idBitacora { get; set; }
      public string idTransaccion{ get; set; }
      public string cveMovimiento{ get; set; }
      public string camposTransacciones { get; set; }
      public int idEtapa{ get; set; }
      public string Etapa { get; set; }
      public int idAccion{ get; set; }
      public string Accion { get; set; }
      public bool estatus{ get; set; }
    }

}
