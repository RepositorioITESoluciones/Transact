using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class Autocompletar
    {
        public autoCampos[] listaCamp { get; set; }
    }

    public class autoCampos
    {
        public string idCampo { get; set; }
        public string primarykey { get; set; }
        public string Types { get; set; }
        public int idCategoria { get; set; }
        public int  idTransaccion{ get; set; }
        public string idRef { get; set; }
        public string CampoRef{ get; set; }
    }

}
