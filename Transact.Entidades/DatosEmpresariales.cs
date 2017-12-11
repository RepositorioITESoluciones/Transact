using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class DatosEmpresariales
    {
        public CamposDatosEmpresariales[] ListaRegistros { get; set; }
    }

    public class CamposDatosEmpresariales
    {
        public int idEmpresa { get; set; }
        public string nombre { get; set; }
        public string fechaRegistro { get; set; }
        public CamposDatosFiscales DatosFiscales { get; set; }
        public int idGiro { get; set; }
        public int idDatosFiscales { get; set; }

    }



}
