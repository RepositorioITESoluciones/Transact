using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class EstatusTransacciones
    {
        public AtributosEstatus[] listStatus { get; set; }
    }

    public class AtributosEstatus
    {
        public int idEstatus { get; set; }
        public string descripcion { get; set; }
    }
}
