using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Transact.Entidades;
using Transact.Negocio;

namespace PruebasUnitarias {
    [TestClass]
    public class UnitTest1 {


        [TestClass]
        public class TestBandeja {
            BandejaNegocio MetBandeja = new BandejaNegocio();

            //[TestMethod]
            //public void ObtenerStatus() {
            //    EstatusTransacciones output = new EstatusTransacciones();

            //    output = MetBandeja.ObtenerStatusNeg();

            //    if (output.Equals(null)) {
            //        Assert.AreEqual(null, output);
            //    } else {
            //        Assert.AreEqual(output, output);
            //    }

            //}
            //[TestMethod]
            //public void DetalleTransaccionesN() {
            //    TransactBitacora output = new TransactBitacora();

            //    output = MetBandeja.DetalleTransaccionesN(1);

            //    if (output.Equals(null)) {
            //        Assert.AreEqual(null, output);
            //    } else {
            //        Assert.AreEqual(output, output);
            //    }

            //}
            //[TestMethod]
            //public void ArmaFormularioxEtapa() {
            //    CamposTransaccion output = new CamposTransaccion();

            //    output = MetBandeja.ArmaFormularioxEtapa(24, "26121700000038");

            //    if (output.Equals(null)) {
            //        Assert.AreEqual(null, output);
            //    } else {
            //        Assert.AreEqual(output, output);
            //    }

            //}
            [TestMethod]
            public void DetalleBitacoraN() {
                BitacoraTransacciones output = new BitacoraTransacciones();

                output = MetBandeja.DetalleBitacoraN("26121700000038");

                if (output.Equals(null)) {
                    Assert.AreEqual(null, output);
                } else {
                    Assert.AreEqual(output, output);
                }

            }

        }
        



        //[TestMethod]
        //public void consultarOEEPRoduccion() {
        //    NegocioCalculoProduccion negocioCalculoProduccion = new NegocioCalculoProduccion();
        //    CalculoProduccion listadatos;
        //    listadatos = negocioCalculoProduccion.reporteOEE();
        //    if (listadatos.Equals(null)) {
        //        Assert.AreEqual(null, listadatos);
        //    } else {
        //        Assert.AreEqual(listadatos, listadatos);
        //    }
        //}

    }
}
