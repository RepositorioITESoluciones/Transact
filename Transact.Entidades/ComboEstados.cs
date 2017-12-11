using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class ComboEstados
    {
        public CamposEstados[] listaEstados { get; set; }
    }
    public class CamposEstados
    {
        public int idEstado { get; set; }
        public string descripcion { get; set; }
    }
}
