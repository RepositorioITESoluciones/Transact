using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class CamposTransaccion
    {
        public int idTipoTrasaccion { get; set; }
        public string idTrasaccion { get; set; }
        public string descripcion { get; set; }
        public string cveTipoTransaccion { get; set; }
        public string categoriaTransac { get; set; }
        public int idEtapa { get; set; }
        public int idAccion { get; set; }


        public bool activo { get; set; }
        public CampCabecera[] CamposCabecera { get; set; }
        public CampDetalle[] CamposDetalle { get; set; }
        public Formulas[] formulaGral { get; set; }

    }

    public class CampCabecera
    {
        public int idCampo { get; set; }
        public int idnivel { get; set; }
        public string nombreCampo { get; set; }
        public string descripcionCampo { get; set; }
        public string TipoDatoCampo { get; set; }
        public string Visualisacion { get; set; }
        public string TipoOperacion { get; set; }
        public bool activo { get; set; }
        public double logitudCampo { get; set; }
        public bool visible { get; set; }
        public bool editable { get; set; }
        public string obligatorio { get; set; }
        public string formula { get; set; }
        public string TransaccionReferencia {get; set;}
        public string idRef { get; set; }
        public string nomRef { get; set; }
        public string CadenaComplementos { get; set; }
        
    }

    public class CampDetalle
    {
        public int idCampo { get; set; }
        public int idnivel { get; set; }
        public string nombreCampo { get; set; }
        public string descripcionCampo { get; set; }
        public string TipoDatoCampo { get; set; }
        public string Visualisacion { get; set; }
        public string TipoOperacion { get; set; }
        public bool activo { get; set; }
        public double logitudCampo { get; set; }
        public bool visible { get; set; }
        public bool editable { get; set; }
        public string obligatorio { get; set; }
        public string formula { get; set; }
        public string TransaccionReferencia { get; set; }
        public string idRef { get; set; }
        public string nomRef { get; set; }

        public string CadenaComplementos { get; set; }
    }

    public class Formulas
    {
        public int idFormula { get; set; }
        public string formula { get; set; }

    }


    public enum nivel
    {
        cabecera = 1,
        detalle =2

    }

}
