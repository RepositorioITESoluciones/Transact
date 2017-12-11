using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class ComboPuestos
    {
        public CamposPuestos[] listaPuestos { get; set; }
    }
    public class CamposPuestos
    {
        public int idPuesto { get; set; }
        public string descripcion { get; set; }
    }
}