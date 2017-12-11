using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Threading.Tasks;

namespace Transact.Negocio
{
    public class RegistrarTransaccion
    {
        readonly Datos.RegistrarTransaccion arma = new Datos.RegistrarTransaccion();

        public Entidades.CamposTransaccion ArmaCampos(int idtransa)
        {
            Entidades.CamposTransaccion campos = new Entidades.CamposTransaccion();

            Console.WriteLine(campos);

            campos = arma.ArmaFormulario(idtransa);



            return campos;
        }

        public Entidades.Combo ArmaSelect(string idtransact, string idRef, string nomref)
        {
            Entidades.Combo campos = new Entidades.Combo();
            Datos.RegistrarTransaccion armar = new Datos.RegistrarTransaccion();
            Console.WriteLine(campos);

            campos = armar.LlenaCombo(idtransact, idRef, nomref);


            return campos;
        }

        public Entidades.Combo ArmaSelectDetalle(string idtransact, string idRef, string nomref) {
            Entidades.Combo campos = new Entidades.Combo();
            Datos.RegistrarTransaccion armar = new Datos.RegistrarTransaccion();


            campos = armar.LlenaComboDetalle(idtransact, idRef, nomref);


            return campos;
        }

        public bool insert(string json, string idTransaccion, string Categoria, int idEtapa, int idAccion)
        {
            bool respuesta = false;

            if (Categoria == "Catálogos")
            {

                respuesta = arma.InsertarCatalogos(json, idTransaccion, idEtapa, idAccion);
            }
            else
            {
                respuesta = arma.inserta(json, idTransaccion, idEtapa, idAccion);

            }

            return respuesta;
        }

        public bool insertXetapa(string json, string idTransaccion, string Categoria, int idEtapa, int idAccion) {
            bool respuesta = false;
                respuesta = arma.insertaxEtapa(json, idTransaccion, idEtapa, idAccion);
            return respuesta;
        }

        public Entidades.EntidadCategoriaTransa CategoriasTrans()
        {
            Entidades.EntidadCategoriaTransa datos = arma.Categtrans();
            return datos;
        }

        public Entidades.comboTransac CatCompTrans(int idtipo)
        {
            Entidades.comboTransac datos = arma.camposCategTransac(idtipo);
            return datos;
        }

        public Entidades.ValoresComplemento AutoComplit(int idTransaccion, string primarykey, string Valor, string IdRef, string CampRef)
        {
            Entidades.ValoresComplemento datos = arma.AutoCompletable(idTransaccion, primarykey, Valor, IdRef, CampRef);

            return datos;
        }

        public int AutoIncrementN(int idTipoTransaccion, string CAuto)
        {
            if (idTipoTransaccion != 0 && CAuto != "")
            {
                return arma.AutoIncrement(idTipoTransaccion, CAuto);
            }
            else
            {
                return 0;
            }
        }

        public Entidades.DetalleTransaccionBit detalleTBN(string idTransaccion)
        {
            return arma.detalleTBD(idTransaccion);
        }


    }
}
