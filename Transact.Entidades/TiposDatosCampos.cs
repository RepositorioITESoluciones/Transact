using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class TiposDatosCampos
    {
        public camposTiposDatos[] camposTiposDatCampos { get; set; }
    }

    public class camposTiposDatos
    {
        public int idTipoDatoCampo { get; set; }
        public string descripcion { get; set; }
        public string abreviatura { get; set; }
    }
}
