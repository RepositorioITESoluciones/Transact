using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Transact.Entidades;
using Transact.Datos;

namespace Transact.Negocio
{
    public class BandejaNegocio
    {
        readonly Bandeja BandejaDatos = new Bandeja();

        public EstatusTransacciones ObtenerStatusNeg()
        {
            return BandejaDatos.ObtenerStatus();
        }
        public TransactBitacora DetalleTransaccionesN(int idEstatus)
        {
            return BandejaDatos.DetalleTransaccionesD(idEstatus);
        }

        public CamposTransaccion ArmaFormularioxEtapa(int idTipoTransaccion, string idtransaccion)
        {
            return BandejaDatos.ArmaFormularioxEtapa(idTipoTransaccion, idtransaccion);
        }

        public BitacoraTransacciones DetalleBitacoraN(string idtransaccion)
        {
            return BandejaDatos.DetalleBitacoraD(idtransaccion);
        }


        public ReglasNegocioxAccion ReglasxAccion(int idTipoTransaccion) {

            return BandejaDatos.ReglasxAccion(idTipoTransaccion);
        }
    }
}
