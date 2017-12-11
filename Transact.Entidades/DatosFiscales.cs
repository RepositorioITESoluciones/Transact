using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class DatosFiscales
    {
        public CamposDatosFiscales[] ListaReg { get; set; }
    }

    public class CamposDatosFiscales
    {
        public int IdDatosFiscales { get; set; }
        public string RazonSocial { get; set; }
        public CamposTipoPersona TipoPersona { get; set; }
        public string RFC { get; set; }
        public string Calle { get; set; }
        public string NumeroExterior { get; set; }
        public string NumeroInterior { get; set; }
        public int C_CP { get; set; }
        public CamposEstado Estado { get; set; }
        public string CorreoElectronico { get; set; }
        public string NombreContacto { get; set; }
        public string TelContacto { get; set; }
        public string CelContacto { get; set; }

    }
}
