using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class Usuario
    { 
        public int idPersonal { get; set; }
        public string nombre { get; set; }
        public string apPaterno { get; set; }
        public string apMaterno { get; set; }
        public string RFC { get; set; }
        public int idPerfil { get; set; }
        public int idPuesto { get; set; }
        public int idArea { get; set; }
        public string CP { get; set; }
        public int idEstado { get; set; }
        public string email { get; set; }
        public string fechaAlta { get; set; }
        public string fechaModificacion { get; set; }
        public int idEstatus { get; set; }
        public bool activo { get; set; }

        public string nombreRol { get; set; }








    }
}
