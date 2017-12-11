using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class Aplicaciones
    {
        public CamposAplicaciones[] listaAplicaciones { get; set; }
    }

    public class CamposAplicaciones
    {
        public int idAplicacion { get; set; }
        public String nombreAplicacion { get; set; }
        public String descripcionAplicacion { get; set; }
        public String idioma { get; set; } 
        public double version { get; set; }

    }
}
