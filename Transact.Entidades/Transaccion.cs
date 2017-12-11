using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class Transaccion
    {
        public int idTransaccion { get; set; }
        public int idTipoTrasaccion { get; set; }
        public string tipo { get; set; }
        public String fechaTransaccion { get; set; }
        public int idUsuario { get; set; }
        public int idEstatus { get; set; }
        public string claveTT { get; set; }
        public CampoenCabecera[] CamposComplementoCabecera { get; set; }
        public CampoenDetalle[] DetalleTransaccion { get; set; }
    }

    public class CampoenDetalle
    {
        public int idCampo { get; set; }
        public string nombreCampo { get; set; }
        public int idTipoDatoCampo { get; set; }
        public object valor { get; set; }
        public int idFila { get; set; }
    }

    public class CampoenCabecera
    {
        public int idCampo { get; set; }
        public string nombreCampo { get; set; }
        public int idTipoDatoCampo { get; set; }
        public object valor { get; set; }
    }
}
