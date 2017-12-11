using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class TransaccionGralA
    {
        public EtapasTransaccion[] etapaslista { get; set; }
    }

    //public class CamposDinamicos
    //{
    //    public int idCampo { get; set; }
    //    public string Nivel { get; set; }
    //    public string nombreCampo { get; set; }
    //    public string descCampo { get; set; }
    //    public string TipoDato { get; set; }
    //    public string Operacion { get; set; }
    //    public int longitud { get; set; }
    //    public int idEstatusAlta { get; set; }
    //    public string fechaAlta { get; set; }
    //}

    public class EtapasTransaccion
    {
        public int idEtapa { get; set; }
        public string descripcion { get; set; }

        public int Orden { get; set; }

    }

    public class AccionesTransaccion
    {
        public int idAccion { get; set; }
        public string descripcion { get; set; }
    }

    public class ReglasNegocioCampo
    { }

    public class ReglasNegocioAcciones
    { }




}
