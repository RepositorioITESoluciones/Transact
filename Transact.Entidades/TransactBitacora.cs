using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class TransactBitacora
    {
        public CamposTransactBitacora[] listaTranBitacora { get; set; }
    }
    public class CamposTransactBitacora
    {
        public Int32 idTipoTransaccion { get; set; }
        public string idTransaccion { get; set; }
        public string descripcion { get; set; }
        public string fechaIniTransaccion { get; set; }
        public string cveTipoTransaccion { get; set; }
    }
}
