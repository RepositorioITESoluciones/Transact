using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class TiposVisualizacion
    {
        public CamposTiposVisualizacion[] CamposVisualizacion { get; set; }
    }

    public class CamposTiposVisualizacion
    {
        public int idVisualizacion { get; set; }
        public string componente { get; set; }
        public string descripcion { get; set; }
        public bool estatus { get; set; }
    }
}
