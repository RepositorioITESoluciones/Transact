using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
   public class Idioma
    {
        public CamposIdioma[] ListaReg { get; set; }
    }

    public class CamposIdioma
    {
        public int IdIdioma { get; set; }
        public string Idioma { get; set; }
    }
}
