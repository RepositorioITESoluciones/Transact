using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class NivelesTransacciones
    {
        public camposNivelTrans[] CamposNivelTransaccion { get; set;}

    }

    public class camposNivelTrans
    {
        public int idNivel { get; set; }
        public string descripcion { get; set; }
    }
}


