using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class ENReglasNeg
    {
        public CamposENReglasNeg[] listaREgl { get; set; }
    }

    public class CamposENReglasNeg
    {
        public string Etapa { get; set; }
        public string Accion { get; set; }
        public int idCampo { get; set; }
        public string Campo { get; set; }
        public bool visible { get; set; }
        public bool editable { get; set; }
        public bool obligatorio { get; set; }
        public int idVisualizacion { get; set; }
        public string Visualizacion { get; set; }

    }
}
