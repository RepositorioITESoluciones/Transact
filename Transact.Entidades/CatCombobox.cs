using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class CatCombobox
    {
        public camConbobox[] camposCambo { get; set; }
    }
    public class camConbobox
    {
        public string nombreCampo { get; set; }
        public int idCategoria { get; set; }
        public int idReferencia { get; set; }
        public int idNombreReferencia { get; set; }
        public string Referencia { get; set; }
        public string nombreReferencia { get; set; }
        public int idEtapa { get; set; }
        public int idAccion { get; set; }
        public int idCampo { get; set; }
        public int idTipoTransaccion { get; set; }
        


    }
}
