using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class AltaTiposTransacciones
    {
        /*****     Tabla => TiposTransacciones     *****/
        public int idTipoTransaccion { get; set; }
        public string nombre { get; set; }
        public string cveTipoTransaccion { get; set; }
        public bool activoTipoTrans { get; set; }
        public int idProceso { get; set; }
        public int idCatTipoTransaccion { get; set; }

        public CamposDinamicos[] CamposTransaccion { get; set; }

        public Etapas[] EtapasTransaccion { get; set; }

        public Acciones[] AccionesTransaccion { get; set; }




    }

    public class CamposDinamicos
    {
        public int idCampo { get; set; }
        public int idNivel { get; set; }
        public string nombreCampo { get; set; }
        public string descCampo { get; set; }
        public int idTipoDato { get; set; }
        public int idTipoOperacion { get; set; }
        public bool activoCampo { get; set; }
        public int longitud { get; set; }
    }

    public class Etapas
    {
        public int idEtapa { get; set; }
        public string descEtapa { get; set; }
        public int ordenEtapa { get; set; }
        public int predecesor { get; set; }
    }

    public class Acciones
    {
        public int idAccion { get; set; }
        public string cveAccion { get; set; }
        public bool activoAccion { get; set; }
        public int ordenAccion { get; set; }
    }


}
