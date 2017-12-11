
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class Sucursal
    {
        public CamposSucursal[] ListaRegistrosSucursal { get; set; }
    }
    public class CamposSucursal
    {
        public int idSucursal { get; set; }
        public string nombre { get; set; }
        public int idEmpresa { get; set; }
        public int idDatosFiscales { get; set; }
        public CamposDatosFiscales DatosFiscales { get; set; }
        public string empresa { get; set; }

    }
}
