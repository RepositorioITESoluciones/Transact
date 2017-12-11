using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class camposConboboxId
    {
        public ConboboxRNG[] listaCamposconboboxRNG { get; set; }
    }
    public class ConboboxRNG
    {
        public string nombreCampo { get; set; }
        public int idCategoria { get; set; }
        public int idtipotran { get; set; }
        public string idReferencia { get; set; }
        public string nombreReferencia { get; set; }
    }
}
