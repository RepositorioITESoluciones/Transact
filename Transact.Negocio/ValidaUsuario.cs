using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Negocio
{
    public class ValidaUsuario
    {
        readonly Datos.LoginData Login = new Datos.LoginData();

        public Entidades.Usuario ChecarExitencia(string nameUser, string password)
        {
            Entidades.Usuario secion = new Entidades.Usuario();
            Console.WriteLine(secion);

            secion = Login.Validausuario(nameUser, password);


            return secion;




        }


    }
}
