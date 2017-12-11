using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class PersonalUsuario
    {
        public CamposPersonalUsuario[] listaPersonalUsuario { get; set; }
    }

    public class CamposPersonalUsuario
    {
        public int idPersonal { get; set; }
        public int idUsuario { get; set; }
        public int idRol { get; set; }
        public String nombre { get; set; }
        public String rfc { get; set; }
        public String puesto { get; set; }
        public String email { get; set; }
        public String acceso { get; set; }
        public String nombreRol { get; set; }
        public String nombreUsuario { get; set; }
        public String privilegios { get; set; }
        public int idEstado { get; set; }
        public int c_CP { get; set; }
        public int idPuesto { get; set; }
        public String apPaterno { get; set; }
        public String apMaterno { get; set; }
        public String nombreSolo { get; set; }
        public String contrasena { get; set; }
    }
}
