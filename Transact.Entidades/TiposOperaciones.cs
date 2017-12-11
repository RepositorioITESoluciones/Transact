using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class TiposOperaciones
    {
        public camposTiposOperaciones[] CamposOperaciones { get; set; }
        
    }

    public class camposTiposOperaciones
    {
        public int idTipoOperacion { get; set; }
        public string descripcion { get; set; }
    }
}
