using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
   public class TipoPersona
    {
        public CamposTipoPersona[] ListaRegTipoPersona { get; set; }
    }
  

    public class CamposTipoPersona
    {
        public int IdTipoPersona { get; set; }
        public string TipoPersona { get; set; }
    }
}
