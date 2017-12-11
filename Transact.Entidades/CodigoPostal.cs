using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
   public  class CodigoPostal
    {
        public CamposCP[] ListaRegistroCP { get; set; }
    }


    public class CamposCP 
    {
        public int c_CP { get; set; }
        public string d_ciudad { get; set; }
        public CamposEstado Estado { get; set; }
    }
}
