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
            return arma.ArmaFormulario(idtransa);
        }

        public Entidades.Combo ArmaSelect(string idtransact, string idRef, string nomref)
        {
            return arma.LlenaCombo(idtransact, idRef, nomref);
        }

        public Entidades.Combo ArmaSelectDetalle(string idtransact, string idRef, string nomref) {
            return arma.LlenaComboDetalle(idtransact, idRef, nomref);
        }

        public bool insert(int idUser,string json, string idTransaccion, string Categoria, int idEtapa, int idAccion)
        {
            bool respuesta = false;

            if (Categoria == "Catálogo")
            {

                respuesta = arma.InsertarCatalogos(idUser,json, idTransaccion, idEtapa, idAccion);
            }
            else
            {
                respuesta = arma.inserta(idUser,json, idTransaccion, idEtapa, idAccion);

            }

            return respuesta;
        }

        public bool insertXetapa(int idFutura, string json, string idTransaccion, string Categoria, int idEtapa, int idAccion) {

            return arma.insertaxEtapa(idFutura,json, idTransaccion, idEtapa, idAccion);
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
