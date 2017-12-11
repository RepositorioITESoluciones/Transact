using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class ReglasxCampo
    {
        public ReglasCampos[] caposReglas { get; set; }
    }

    public class ReglasCampos
    {
        public int idEtapa { get; set; }
        public string Etapa { get; set; }
        public int idAccion { get; set; }
        public string Accion { get; set; }
        public int idCampo { get; set; }
        public string nombreCampo { get; set; }
        public bool visible { get; set; }
        public bool editable { get; set; }
        public bool obligatorio { get; set; }
        public int idVisualizacion { get; set; }
        public int idTipoTransaccion { get; set; }
        public int idTipoDatoCampo { get; set; }


    }


}
