using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class Combo
    {
        public Int64 idTransaccion { get; set; }
        public string NombreTransaccion { get; set; }
        public CampCatalogo[] CamposCat { get; set; }
    }

    public class CampCatalogo
    {
        public string id { get; set; }
        public string Nombre { get; set; }
    }
}


