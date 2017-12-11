using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class Menus
    {
        public CamposMenus[] listaRegistrosMenu;
       
    }
    public class CamposMenus
    {
        public int idMenu { set; get; }
        public int idPadre { set; get; }
        public int idNivelPadre { set; get; }
        public string nombreMenu { set; get; }
        public string nombreMenuPadre { set; get; }
        public string nombreMenuHijo { set; get; }
        public string descripcionMenu { set; get; }
        public string liga { set; get; }
        public string icono { set; get; }
        public string chkAplicacion { set; get; }
        public CamposAplicaciones camposAplicaciones { set; get; }
    }
}
