using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class TipoTransaccion
    {
        public tipoTran[] ListaTipoTran { get; set; }


    }

    public class tipoTran
    {
        public int idTipoTransaccion { get; set; }
        public string nombre { get; set; }
        public string clave { get; set; }
        public int area { get; set; }
        public int proceso { get; set; }
        public int idCategoria { get; set; }
        public string categoria { get; set; }
        public string estatus { get; set; }
        public string fecha { get; set; }


    }
}
