using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class Area
    {
        public CamposArea[] listaRegistrosAreas;
    }
    public class CamposArea
    {
        public int idArea { set; get; }
        public string nombreArea { set; get; }
        public string descripcion { set; get; }
        public string chkSucursal { get; set; }
        public CamposSucursal camposSucursal { set; get; }
    }
}
