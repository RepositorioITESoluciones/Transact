using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class CamposConbo
    {

        public camposConbobox[] listaCamposconbobox { get; set; }
    }


    public class camposConbobox
    {
        public string nombreCampo { get; set; }
        public string categoria { get; set; }
        public string tipotran { get; set; }
        public string idReferencia { get; set; }
        public string nombreReferencia { get; set; }
    }



}
