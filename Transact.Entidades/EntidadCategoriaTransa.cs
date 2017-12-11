using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transact.Entidades
{
    public class EntidadCategoriaTransa
    {
        public CamposCategoriaTrans[] ListaCategorias { get; set; }
    }

    public class CamposCategoriaTrans
    {
        public int idCatTipoTransac { get; set; }
        public String categoriaTransac { get; set; }
        public String descripcionCategoria { get; set; }
    }

} 
