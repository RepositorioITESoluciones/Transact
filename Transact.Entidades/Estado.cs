using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
   public class Estado
    {
        public CamposEstado[] ListaRegistrosEstado { get; set; }
    }


    public class CamposEstado
    {
        public int idEstado { get; set; }
        public string descripcion { get; set; }
        public CamposPais Pais { get; set; }
    }
}
