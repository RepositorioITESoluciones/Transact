using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class ReglasNegocioxAccion
    {
        public camposReglasNegocioxAccion[] listaReglasxAccion { get; set; }
    }
    public class camposReglasNegocioxAccion
    {
        public int idEtapa { get; set; }
        public string NombreEtapa { get; set; }
        public int idAccion { get; set; }
        public string NombreAccion { get; set; }
        public int idEtapaDestino { get; set; }
        public string EtapaDestino { get; set; }
        public string ReglaxAccion { get; set; }
        public string descripcionRegla { get; set; }
        public string mensajeError { get; set; }

    }
}
