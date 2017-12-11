using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Transact.Datos;
using Transact.Entidades;

namespace Transact.Negocio
{
    public class NegocioSucursal
    {

        DatosSucursal clasedatos = new DatosSucursal();

        public Sucursal LlenaComboDatosFiscales()
        {
            Sucursal listadatos;

            listadatos = clasedatos.LlenaComboDatosFiscales();

            return listadatos;
        }
        public TipoPersona LlenaComboTipoPersona()
        {
            TipoPersona listadatos;

            listadatos = clasedatos.LlenaComboTipoPersona();

            return listadatos;
        }
        public ComboCP LlenaComboCP(int idEstado)
        {
            ComboCP listaDatos;

            listaDatos = clasedatos.LlenaComboCP(idEstado);

            return listaDatos;
        }
        public Estado LlenaComboEstados()
        {
            Estado listadatos;

            listadatos = clasedatos.LlenaComboEstados();

            return listadatos;
        }
        public Sucursal LlenaTablaSucursales()
        {
            Sucursal listadatos;

            listadatos = clasedatos.LlenaTablaSucursales();

            return listadatos;
        }
        public bool InsertaSucursalNegocio(CamposSucursal campos)
        {
            bool respuesta = false;
            try
            {

                clasedatos.InsertaSucursalBySP(campos);
                respuesta = true;

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

            }

            return respuesta;
        }
        public bool actualizarSucursalNegocio(CamposSucursal campos)
        {
            bool respuesta = false;

            respuesta = clasedatos.actualizarSucursalBySP(campos);
            return respuesta;
        }
        public bool eliminarSucursalNegocio(CamposSucursal campos)
        {
            bool respuesta = false;

            respuesta = clasedatos.EliminaSucursalBySP(campos);
            return respuesta;
        }
        public Sucursal LlenaComboEmpresa()
        {
            Sucursal listaEmpresas;

            listaEmpresas = clasedatos.LlenaComboEmpresa();

            return listaEmpresas;
        }



    }



}