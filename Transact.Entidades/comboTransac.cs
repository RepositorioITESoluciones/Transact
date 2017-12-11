using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class comboTransac
    {
        public camposCattransac[] camposCompTransac{ get; set; }
    }
    public class camposCattransac
    {
        public int idTipoTransaccion { get; set; }
        public string descripcion { get; set; }
        public int idCategoria { get; set; }
    }
    
}
