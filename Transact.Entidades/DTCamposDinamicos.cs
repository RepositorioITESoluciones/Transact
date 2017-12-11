using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class DTCamposDinamicos
    {

        public DTregistrosCampos[] ListCamposTransaccion { get; set; }

    }


    public class DTregistrosCampos
    {
        public int idCampo { get; set; }
        public string Nivel { get; set; }
        public string idNivel { get; set; }
        public string nombreCampo { get; set; }
        public string descCampo { get; set; }
        public string TipoDato { get; set; }
        public string idTipoDato { get; set; }
        public string Operacion { get; set; }
        public string idOperacion { get; set; }
        public string idCampoC { get; set; }
        public int longitud { get; set; }

        public string idReferencia { get; set; }
        public string nombreReferencia { get; set; }
        public int idTipoTransaccionReferencia { get; set; }
        
        public int idTipoTransaccion { get; set; }

        public int valorSelect { get; set; }

        public string valorVisible { get; set; }

        public string valorEditable { get; set; }

        public string valorObligatorio { get; set; }

        public string valorVisualizacion { get; set; }
    }
}
