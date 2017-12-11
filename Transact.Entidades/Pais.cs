using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class Pais
    {

    }
    public class CamposPais
    {
        public int IdPais { get; set; }
        public string Descripcion { get; set; }
        public CamposIdioma Idioma { get; set; }
    }

}
