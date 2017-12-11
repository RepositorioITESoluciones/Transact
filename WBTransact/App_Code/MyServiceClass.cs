using System;
using System.Collections.Generic;
using System.Web.Services;
using Transact.Entidades;
using System.Data;




/// <summary>
/// Summary description for MyServiceClass
/// </summary>
/// 
[System.Web.Script.Services.ScriptService]

public class MyServiceClass : System.Web.Services.WebService
{
    public MyServiceClass() { }

    readonly Transact.Negocio.RegistrarTransaccion arma = new Transact.Negocio.RegistrarTransaccion();
    readonly Transact.Negocio.Transacciones tran = new Transact.Negocio.Transacciones();
    readonly Transact.Negocio.AltaTipoTransaccionNeg AltaDatos = new Transact.Negocio.AltaTipoTransaccionNeg();
    readonly Transact.Negocio.ValidaUsuario ChecaLogin = new Transact.Negocio.ValidaUsuario();
    readonly Transact.Negocio.BandejaNegocio BandejaNegocio = new Transact.Negocio.BandejaNegocio();

    readonly Transact.Negocio.NegocioDatosEmpresariales metodoNegocioEmpre = new Transact.Negocio.NegocioDatosEmpresariales();
    readonly Transact.Negocio.RegistroCategoriaTrans metodoNegocioCateTransaccion = new Transact.Negocio.RegistroCategoriaTrans();
    readonly Transact.Negocio.NegocioProceso metodoNegocioProceso = new Transact.Negocio.NegocioProceso();
    readonly Transact.Negocio.NegocioArea negocioArea = new Transact.Negocio.NegocioArea();
    readonly Transact.Negocio.NegocioRoles negocioRoles = new Transact.Negocio.NegocioRoles();
    readonly Transact.Negocio.NegocioMenus negocioMenus = new Transact.Negocio.NegocioMenus();



    #region Armaformulario
    [WebMethod]
    public CamposTransaccion ArmaFormulario(int idtransa)
    {
        CamposTransaccion campos;
        campos = arma.ArmaCampos(idtransa);
        return campos;

    }
    [WebMethod]
    public Combo CrearCombo(string idTransaccion, string idRef, string nomRef)
    {
        Combo campos;
        if (idTransaccion.Length < 13) {
            campos = arma.ArmaSelect(idTransaccion, idRef, nomRef);
        } else {
            campos = arma.ArmaSelectDetalle(idTransaccion, idRef, nomRef);
        }
        return campos;
    }
    [WebMethod]
    public bool InsertarTransaccion(string json, string idTransaccion, string Categoria, int idEtapa, int idAccion)
    {

       
            return arma.insert(json, idTransaccion, Categoria, idEtapa, idAccion);

        
    }

    public bool InsertarTransaccionxEtapa(string json, string idTransaccion, string Categoria, int idEtapa, int idAccion) {

       return arma.insertXetapa(json, idTransaccion, Categoria, idEtapa, idAccion); 

    }


    [WebMethod]
    public EntidadCategoriaTransa TiposTrans()
    {
        EntidadCategoriaTransa campos;
        campos = arma.CategoriasTrans();
        return campos;
    }
    [WebMethod]
    public comboTransac camposTrans(int idtipo)
    {
        comboTransac campos;
        campos = arma.CatCompTrans(idtipo);
        return campos;
    }
    [WebMethod]
    public ValoresComplemento CamposComplemento(int idTransaccion, string primarykey, string Valor, string IdRef, string CampRef)
    {
        ValoresComplemento campos;
        campos = arma.AutoComplit(idTransaccion, primarykey, Valor, IdRef, CampRef);
        return campos;
    }
    [WebMethod]
    public int AutoIncrementWS(int idTipoTransaccion, string CAuto)
    {
        return arma.AutoIncrementN(idTipoTransaccion, CAuto);
    }
    [WebMethod]
    public DetalleTransaccionBit detalleTBWS(string idTransaccion)
    {
        return arma.detalleTBN(idTransaccion);
    }



    #endregion
    /*******    Métodos de AltaTipoTransacción     *****/
    #region AltaTipoTransacción
    //Método Insertar
    #region Insert 
    [WebMethod]
    public int InsertDatosGenerales(int proceso, string nombre1, string clave, int categoria)
    {



        int resp = AltaDatos.InDGral(proceso, nombre1, clave, categoria);




        return resp;

    }

    [WebMethod]
    public void InsertCampos(int idTipoTran, int idNivel, string nombreCampo, string descripcion, int idTipoDatoCampo, int idTipoOperacion, string longitudCampo)
    {



        AltaDatos.InDCampo(idTipoTran, idNivel, nombreCampo, descripcion, idTipoDatoCampo, idTipoOperacion, longitudCampo);






    }



    [WebMethod]
    public bool InsertEtapas(int idTipoTran, string descripcion, int orden)
    {



        return AltaDatos.InEtapas(idTipoTran, descripcion, orden);




    }

    [WebMethod]
    public bool InsertAcciones(int idTipoTran, string claveAccion, string descripcion, int orden)
    {



        return AltaDatos.InAcciones(idTipoTran, claveAccion, descripcion, orden);




    }

    [WebMethod]
    public bool InsertAccEtap(int idTipoTransaccion, int idEtapa, string NomAccion)
    {



        return AltaDatos.InInsertAccEtap(idTipoTransaccion, idEtapa, NomAccion);




    }

    [WebMethod]
    public bool InsertEtapasAccRol(int idTipoTransaccion, string nomEtapa, string NomAccion, string nombreRol)
    {



        return AltaDatos.InInsertEtapasAccRol(idTipoTransaccion, nomEtapa, NomAccion, nombreRol);




    }


    [WebMethod]
    public bool InsertRNC(string jsonRG)
    {
        return AltaDatos.inInsertReglasNC(jsonRG);

    }
    [WebMethod]
    public bool InsertFormulaWS(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo, string cadenaGenerada)
    {
        return AltaDatos.InsertFormulaN(idTipoTransaccion, idEtapa, idAccion, idCampo, cadenaGenerada);
    }


    [WebMethod]
    public bool InsertReglasNegocioxAWS(int idTipoTransaccion, int idEtapa, int idAccion, string cadenaGenerada, int idEtapaDestino)
    {
        return AltaDatos.InsertReglasNegocioxAN(idTipoTransaccion, idEtapa, idAccion, cadenaGenerada, idEtapaDestino);
    }
    #endregion
    // metodos de consulta
    #region consultas
    [WebMethod]
    public TiposDatosCampos tipoDatosATT()
    {
        TiposDatosCampos datosCampos = new TiposDatosCampos();
        Console.WriteLine(datosCampos);
        datosCampos = AltaDatos.CatTiposDatosCamposN();
        return datosCampos;
    }
    [WebMethod]
    public NivelesTransacciones nivelTransATT()
    {
        NivelesTransacciones nivTrans = new NivelesTransacciones();
        Console.WriteLine(nivTrans);
        nivTrans = AltaDatos.CatNivelesTransaccionesN();
        return nivTrans;
    }
    [WebMethod]
    public TiposOperaciones operacionTransATT()
    {
        TiposOperaciones opeTrnas = new TiposOperaciones();
        Console.WriteLine(opeTrnas);
        opeTrnas = AltaDatos.CatTiposOperacionesN();
        return opeTrnas;
    }
    [WebMethod]
    public RolesTransaccion rolesTransATT()
    {
        RolesTransaccion rolTrans = new RolesTransaccion();
        Console.WriteLine(rolTrans);
        rolTrans = AltaDatos.CatTiposRolesTransaccionN();
        return rolTrans;
    }
    [WebMethod]
    public AreasTipoTransaccion areasTransATT()
    {
        AreasTipoTransaccion areaTrans = new AreasTipoTransaccion();
        Console.WriteLine(areaTrans);
        areaTrans = AltaDatos.CatAreasTipoTransaccionN();
        return areaTrans;
    }
    [WebMethod]
    public ProcesosTipoTransaccion procesosTransATT(int idArea)
    {
        ProcesosTipoTransaccion procTrans = new ProcesosTipoTransaccion();
        Console.WriteLine(procTrans);
        procTrans = AltaDatos.CatProcesoTransaccionN(idArea);
        return procTrans;
    }
    [WebMethod]
    public TiposVisualizacion visualizacionTansATT(int idTipoDatoCampo)
    {
        TiposVisualizacion visTrans = new TiposVisualizacion();
        Console.WriteLine(visTrans);
        visTrans = AltaDatos.TiposVisualizacion(idTipoDatoCampo);
        return visTrans;
    }
    [WebMethod]
    public EntEtapas.EtapasCombo llenaComboEtapas(int idTipoTran)
    {



        return AltaDatos.CatTEtapasN(idTipoTran);


    }
    [WebMethod]
    public EntEtapas.EtapasCombo llenaComboSoloEtapas(int idTipoTran)
    {



        return AltaDatos.CatTsoloEtapasN(idTipoTran);


    }
    [WebMethod]
    public AccionesEnt.AccionesCombo llenaComboAcciones(int idTipoTran, int idEtapas)
    {



        return AltaDatos.CatTAccionesN(idTipoTran, idEtapas);


    }

    [WebMethod]
    public TipoTransaccion LlenaTipoTransaccion()
    {

        return AltaDatos.LlenaTipoTran();
    }
    [WebMethod]
    public EntEtapas.EtapasCombo CatETapasAcionesWS(int idTipoTransaccion, int idEtapa)
    {
        return AltaDatos.CatETapasAcionesN(idTipoTransaccion, idEtapa);
    }
    [WebMethod]
    public RolesTransaccion CatRolesWS(int idTipoTransaccion, int idEtapa, string descripcion)
    {
        return AltaDatos.CatRolesN(idTipoTransaccion, idEtapa, descripcion);
    }

    [WebMethod]
    public EnFormula CatformulasWS(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo)
    {
        return AltaDatos.CatformulasN(idTipoTransaccion, idEtapa, idAccion, idCampo);
    }

    [WebMethod]
    public ENReglasNeg CatReglasNegocioWS(int idTipoTransaccion, int idEtapa, int idAccion)
    {
        return AltaDatos.CatReglasNegocioN(idTipoTransaccion, idEtapa, idAccion);
    }
    [WebMethod]
    public CamposConbo CatCamposconboboxWS(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo)
    {
        return AltaDatos.CatCamposconboboxN(idTipoTransaccion, idEtapa, idAccion, idCampo);
    }
    [WebMethod]
    public int CountReglasWS(int idTipoTransaccion, string nombreCampo, int idEtapa, int idAccion)
    {
        return AltaDatos.CountReglasN(idTipoTransaccion, nombreCampo, idEtapa, idAccion);
    }
    [WebMethod]
    public DTCamposDinamicos DTCamposWS(int idTipoTransaccion)
    {

        return AltaDatos.DTCamposN(idTipoTransaccion);
    }
    [WebMethod]
    public LisFormula DTFormulaWS(int idTipoTransaccion, int idEtapa, int idAccion)
    {

        return AltaDatos.DTFormulasN(idTipoTransaccion, idEtapa, idAccion);
    }
    [WebMethod]
    public DTCamposDinamicos DTDetalleNS(int idTipoTransaccion)
    {

        return AltaDatos.DTDetalleN(idTipoTransaccion);
    }
    [WebMethod]
    public DTCamposDinamicos DTCabezeraNS(int idTipoTransaccion)
    {

        return AltaDatos.DTCabezeraN(idTipoTransaccion);
    }
    [WebMethod]
    public List<Transaccion> ObtenerTransaccionesN()
    {

        DataTable dt = tran.ObtieneTransacciones();

        List<Transaccion> List = new List<Transaccion>();
        foreach (DataRow row in dt.Rows)
        {
            Transaccion tr = new Transaccion();
            tr.idTransaccion = Convert.ToInt32(row["idTransaccion"].ToString());
            tr.idTipoTrasaccion = Convert.ToInt32(row["idTipoTransaccion"].ToString());
            tr.tipo = row["Tipo"].ToString();
            tr.fechaTransaccion = row["fechaIniTransaccion"].ToString();
            tr.idEstatus = Convert.ToInt32(row["idEstatus"].ToString());
            tr.claveTT = row["cveTipoTransaccion"].ToString();
            tr.idUsuario = Convert.ToInt32(row["idUsuario"].ToString());
            List.Add(tr);
        }


        return List;
    }
    [WebMethod]
    public String ObtenerCampos(int idTransaccion)
    {

        String json = tran.ObtenerTransaccion(idTransaccion);


        return json;
    }
    [WebMethod]
    public TransaccionGralA EtapasTransaccionN(int idTipoTransaccion)
    {
        return AltaDatos.EtapasTransaccionN(idTipoTransaccion);
    }
    [WebMethod]
    public DTCamposDinamicos ListCamposAbiertoWS(int idTipotransaccion)
    {

        return AltaDatos.ListCamposAbiertoN(idTipotransaccion);
    }
    [WebMethod]
    public AltaTiposTransacciones CatTiposTransaccionesWS(int idTipoTransaccion)
    {
        return AltaDatos.CatTiposTransaccionesN(idTipoTransaccion);
    }
    [WebMethod]
    public ReglasxCampo ReglasxCamposWS(int idTipoTransaccion, int idEtapa, int idAccion)
    {
        return AltaDatos.ReglasxCamposN(idTipoTransaccion, idEtapa, idAccion);
    }
    public CatCombobox CatComboboxWS(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo)
    {
        return AltaDatos.CatComboboxN(idTipoTransaccion, idEtapa, idAccion, idCampo);
    }
    [WebMethod]
    public DTCamposDinamicos CamposConboboxWS(int idTipotransaccion, int idEtapa, int idAccion)
    {
        return AltaDatos.CamposConboboxN(idTipotransaccion, idEtapa, idAccion);

    }
    [WebMethod]
    public DTCamposDinamicos CamposWS(int idTipotransaccion)
    {
        return AltaDatos.CamposN(idTipotransaccion);

    }
    [WebMethod]
    public camposConboboxId CatConboboxRNGWS(int idTipoTransaccion, int idEtapa, int idAccion)
    {
        return AltaDatos.CatConboboxRNGN(idTipoTransaccion, idEtapa, idAccion);
    }
    [WebMethod]
    public DTCamposDinamicos CamposCabeceraWS(int idTipotransaccion, int idEtapa, int idAccion)
    {
        return AltaDatos.CamposCabeceraN(idTipotransaccion, idEtapa, idAccion);
    }
    [WebMethod]
    public DTCamposDinamicos CamposDetalleWS(int idTipotransaccion, int idEtapa, int idAccion)
    {
        return AltaDatos.CamposDetalleN(idTipotransaccion, idEtapa, idAccion);
    }

    [WebMethod]
    public ENReglasNeg CattooltipWS(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo)
    {
        return AltaDatos.CattooltipN(idTipoTransaccion, idEtapa, idAccion, idCampo);
    }

    [WebMethod]
    public ReglasNegocioxAccion CatReglasNegocioxAccionWS(int idTipoTransaccion, int idEtapa, int idAccion, int idEtapaF)
    {
        return AltaDatos.CatReglasNegocioxAccionN(idTipoTransaccion, idEtapa, idAccion, idEtapaF);
    }
    [WebMethod]
    public DTCamposDinamicos campCombWS(int idTipotransaccion, int idEtapa, int idAccion)
    {
        return AltaDatos.campCombN(idTipotransaccion, idEtapa, idAccion);
    }
    [WebMethod]
    public Autocompletar campNCombWS(int idTipotransaccion, int idEtapa, int idAccion, int idCampo)
    {
        return AltaDatos.campNCombN(idTipotransaccion, idEtapa, idAccion, idCampo);
    }
    [WebMethod]
    public DTCamposDinamicos campJsonWS(int idTipotransaccion, int idEtapa, int idAccion, string nombreCampo)
    {
        return AltaDatos.campJsonN(idTipotransaccion, idEtapa, idAccion, nombreCampo);
    }

    [WebMethod]
    public DTCamposDinamicos selectDeleteCampoDinamicoW(int idTipotransaccion, int idCampo)
    {
        return AltaDatos.selectDeleteCampoDinamicoN(idTipotransaccion, idCampo);
    }
    [WebMethod]
    public DTCamposDinamicos selectDeleteCampoEtapaW(int idTipotransaccion, string nombre)
    {
        return AltaDatos.selectDeleteEtapaN(idTipotransaccion, nombre);
    }
    [WebMethod]
    public DTCamposDinamicos selectDeleteAccionRncW(int idTipotransaccion, int idAccion)
    {
        return AltaDatos.selectDeleteAccionRncN(idTipotransaccion, idAccion);
    }
    [WebMethod]
    public DTCamposDinamicos selectDeleteAccionxComboW(int idTipotransaccion, int idAccion)
    {
        return AltaDatos.selectDeleteAccionxComboN(idTipotransaccion, idAccion);
    }
    [WebMethod]
    public DTCamposDinamicos selectDeleteAccionxAutoW(int idTipotransaccion, int idAccion)
    {
        return AltaDatos.selectDeleteAccionxAutoN(idTipotransaccion, idAccion);
    }
    [WebMethod]
    public DTCamposDinamicos selectDeleteAccionxFormulaW(int idTipotransaccion, int idAccion)
    {
        return AltaDatos.selectDeleteAccionxFormulaN(idTipotransaccion, idAccion);
    }
    [WebMethod]
    public DTCamposDinamicos selectDeleteAccionxRnAW(int idTipotransaccion, int idAccion)
    {
        return AltaDatos.selectDeleteAccionxRnAN(idTipotransaccion, idAccion);
    }


    #endregion
    // Metodos para Actualizar
    #region Actualizar
    [WebMethod]
    public bool UpdateCamposWS(int idTipoTransaccion, string nombreUP, string nombreCampo, string descCampo, int tipoDato, string longitud, int nivel, int tipoOperacion)
    {
        return AltaDatos.UpdateCamposN(idTipoTransaccion, nombreUP, nombreCampo, descCampo, tipoDato, longitud, nivel, tipoOperacion);
    }
    [WebMethod]
    public bool UpdateEtapasWS(int IdTipoTransaccion, String nombreUPE, String descripcionE, int ordenE)
    {
        return AltaDatos.UpdateEtapasN(IdTipoTransaccion, nombreUPE, descripcionE, ordenE);
    }
    [WebMethod]
    public bool UpdateAccionesWS()
    {
        return false;
    }
    [WebMethod]
    public bool ActualisarComboboxWS(string JsonConbobox)
    {
        return AltaDatos.ActualisarComboboxN(JsonConbobox);

    }
    [WebMethod]
    public bool UpdateTipoTransaccionN(int IdTipoTransaccion, string descripcion, string clave, int idProceso, int idCatTipoTransac)
    {
        return AltaDatos.UpdateTipoTransaccionN(IdTipoTransaccion, descripcion, clave, idProceso, idCatTipoTransac);
    }
    [WebMethod]
    public bool UpdateCicloVidaWS(string descripcion, int orden, string cveAccion, string descripcionN, int ordenN, string cveAccionN)
    {
        return AltaDatos.UpdateCicloVidaN(descripcion, orden, cveAccion, descripcionN, ordenN, cveAccionN);
    }
    [WebMethod]
    public bool updateReglasNegocioCamposxTTWS(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo, string nombreReferencia, string idReferencia, int idTipoTransaccionReferencia)
    {
        return AltaDatos.updateReglasNegocioCamposxTTN(idTipoTransaccion, idEtapa, idAccion, idCampo, nombreReferencia, idReferencia, idTipoTransaccionReferencia);
    }
    [WebMethod]
    public bool updateCOMBOBOXWS(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo, bool newnombreReferencia, bool newidReferencia, bool newidTipoTransaccionReferencia)
    {
        return AltaDatos.updateCOMBOBOXN(idTipoTransaccion, idEtapa, idAccion, idCampo, newnombreReferencia, newidReferencia, newidTipoTransaccionReferencia);

    }
    [WebMethod]
    public bool UpdateStatusWS(int IdTipoTransaccion, int estatus)
    {

        return AltaDatos.UpdateStatusN(IdTipoTransaccion, estatus);
    }
    [WebMethod]
    public bool UpdateJsonAutoN(int idTipoTransaccion, int idEtapa, int idAccion, int idCampo, string CadenaJson)
    {
        return AltaDatos.UpdateJsonAutoN(idTipoTransaccion, idEtapa, idAccion, idCampo, CadenaJson);

    }

    #endregion
    // Metodos para Eliminar
    #region eliminar
    [WebMethod]
    public bool DeleteCamposWS(string nombreCampo)
    {
        return AltaDatos.DeleteCamposN(nombreCampo);
    }
    [WebMethod]
    public bool DeleteEtapasWS(string descripcion, int idTipoTransaccion)
    {
        return AltaDatos.DeleteEtapasN(descripcion, idTipoTransaccion);
    }
    [WebMethod]
    public bool DeleteAccionesWS(string descripcion)
    {
        return AltaDatos.DeleteAccionesN(descripcion);
    }

    [WebMethod]
    public bool DeleteEtapasAccionesRolesWS(int idTipoTransaccion, int idEtapa, int idAccion)
    {
        return AltaDatos.DeleteEtapasAccionesRolesN(idTipoTransaccion, idEtapa, idAccion);
    }
    [WebMethod]
    public bool DeleteEtapasAccionesTipoTransaccionesWS(int idTipoTransaccion, int idEtapa, int idAccion)
    {
        return AltaDatos.DeleteEtapasAccionesTipoTransaccionesN(idTipoTransaccion, idEtapa, idAccion);
    }

    [WebMethod]
    public bool DeleteFormulaWS(int idTipoTransaccion, int idEtapa, int idAccion, int idcampo)
    {
        return AltaDatos.DeleteFormulaN(idTipoTransaccion, idEtapa, idAccion, idcampo);
    }
    [WebMethod]
    public bool ReglasNegocioXCampoWS(int idTipoTransaccion, int idEtapa, int idAccion, int idcampo)
    {
        return AltaDatos.DeleteFormulaN(idTipoTransaccion, idEtapa, idAccion, idcampo);
    }
    [WebMethod]
    public bool DeleteReglasCamposWS(int idTipoTransaccion, int idcampo)
    {
        return AltaDatos.DeleteReglasCamposN(idTipoTransaccion, idcampo);
    }
    [WebMethod]
    public bool DeleteCamposDinamicosWS(int idTipoTransaccion, int idcampo)
    {
        return AltaDatos.DeleteCamposDinamicosN(idTipoTransaccion, idcampo);
    }
    #endregion
    [WebMethod]
    public bool ActuaInsertWS(string jsonDatos)
    {
        return AltaDatos.ActuaInsert(jsonDatos);
    }
    [WebMethod]
    public bool DeleteCamposConboboxWS(int idTipoTransaccion, int idcampo)
    {
        return AltaDatos.DeleteCamposConboboxN(idTipoTransaccion, idcampo);
    }
    [WebMethod]
    public bool DeleteReglasNegocioxAWS(int idTipoTransaccion, int idEtapa, int idAccion, int idEtapaF)
    {
        return AltaDatos.DeleteReglasNegocioxAN(idTipoTransaccion, idEtapa, idAccion, idEtapaF);
    }
    [WebMethod]
    public string DeleteTransaccion(int idTipoTransaccion)
    {
        return AltaDatos.DeleteTransaccion(idTipoTransaccion);
    }

    #endregion
    // Metodo Para Login 
    #region Login
    [WebMethod]
    public Usuario Login(string Usuario, string contraseña)
    {
        Usuario SecionUser = new Usuario();

        Console.WriteLine(SecionUser);
        SecionUser = ChecaLogin.ChecarExitencia(Usuario, contraseña);




        return SecionUser;


    }
    [WebMethod(EnableSession = true)]
    public string GetSessionValue(String Name)
    {

        Session["nombre"] = Name;

        return (Session["nombre"]).ToString();
    }
    #endregion
    //Metodos para Bandeja
    #region Bandeja
    [WebMethod]
    public EstatusTransacciones ObtenerStatusWS()
    {
        return BandejaNegocio.ObtenerStatusNeg();
    }
    [WebMethod]
    public TransactBitacora DetalleTransaccionesWS(int idEstatus)
    {
        return BandejaNegocio.DetalleTransaccionesN(idEstatus);
    }
    [WebMethod]
    public CamposTransaccion ArmaFormularioxEtapa(int idTipoTransaccion, string idtransaccion)
    {
        return BandejaNegocio.ArmaFormularioxEtapa(idTipoTransaccion, idtransaccion);
    }
    [WebMethod]
    public BitacoraTransacciones DetalleBitacoraWS(int idTipoTransaccion, string idtransaccion)
    {
        return BandejaNegocio.DetalleBitacoraN(idtransaccion);
    }
    #endregion

    #region catDatosAplicaciones

    readonly Transact.Negocio.NegocioAplicaciones NegocioAplicaciones = new Transact.Negocio.NegocioAplicaciones();

    [WebMethod]
    public Aplicaciones llenaTablaAplicaciones()
    {
        Aplicaciones listaCampos;
        listaCampos = NegocioAplicaciones.llenaTablaAplicaciones();
        return listaCampos;
    }

    [WebMethod]
    public bool insertaAplicaciones(string nombreAplicacion, string descripcionAplicacion, string idioma, double version)
    {
        CamposAplicaciones campos = new CamposAplicaciones();
        campos.nombreAplicacion = nombreAplicacion;
        campos.descripcionAplicacion = descripcionAplicacion;
        campos.idioma = idioma;
        campos.version = version;
        return NegocioAplicaciones.insertarAplicaciones(campos);
    }

    [WebMethod]
    public bool modificarAplicaciones(string nombreAplicacion, string descripcionAplicacion, string idioma, double version, int idAplicacion)
    {
        CamposAplicaciones campos = new CamposAplicaciones();
        campos.nombreAplicacion = nombreAplicacion;
        campos.descripcionAplicacion = descripcionAplicacion;
        campos.idioma = idioma;
        campos.version = version;
        campos.idAplicacion = idAplicacion;
        return NegocioAplicaciones.modificarAplicaciones(campos);
    }

    [WebMethod]
    public bool eliminarAplicaciones(int idAplicacion)
    {
        return NegocioAplicaciones.eliminarAplicaciones(idAplicacion);
    }

    #endregion
    #region personalUsuario

    readonly Transact.Negocio.NegocioPersonalUsuario NegocioPersonalUsuario = new Transact.Negocio.NegocioPersonalUsuario();

    [WebMethod]
    public PersonalUsuario llenaTablaPersonalUsuario()
    {
        PersonalUsuario listaCampos;
        listaCampos = NegocioPersonalUsuario.llenaTablaPersonalUsuario();
        return listaCampos;
    }

    [WebMethod]
    public ComboPuestos LlenaComboPuesto()
    {
        ComboPuestos listaCampos;
        listaCampos = NegocioPersonalUsuario.LlenaComboPuesto();
        return listaCampos;
    }

    [WebMethod]
    public Roles LlenaComboRoles()
    {
        Roles listaCampos;
        listaCampos = NegocioPersonalUsuario.LlenaComboRoles();
        return listaCampos;
    }

    [WebMethod]
    public ComboPrivilegios LlenaCheckBoxPrivilegios()
    {
        ComboPrivilegios listaCampos;
        listaCampos = NegocioPersonalUsuario.LlenaCheckBoxPrivilegios();
        return listaCampos;
    }

    [WebMethod]
    public ComboPrivilegiosCHK LlenaCheckBoxPrivilegiosEdit(int idPersonal, int idUsuario, int idRol)
    {
        ComboPrivilegiosCHK listaCampos;
        listaCampos = NegocioPersonalUsuario.LlenaCheckBoxPrivilegiosEdit(idPersonal, idUsuario, idRol);
        return listaCampos;
    }

    [WebMethod]
    public ComboPersonal LlenaComboPersonal()
    {
        ComboPersonal listaCampos;
        listaCampos = NegocioPersonalUsuario.LlenaComboPersonal();
        return listaCampos;
    }

    [WebMethod]
    public ComboEstados LlenaComboEstados()
    {
        ComboEstados listaCampos;
        listaCampos = NegocioPersonalUsuario.LlenaComboEstados();
        return listaCampos;
    }

    [WebMethod]
    public ComboCP LlenaComboCP(int idEstado)
    {
        ComboCP listaCampos;
        listaCampos = NegocioPersonalUsuario.LlenaComboCP(idEstado);
        return listaCampos;
    }

    [WebMethod]
    public bool insertaPersonal(string nombre, string apPaterno, string apMaterno, string rfc, string estadoC, string cpC, string idPuesto, string email, string idRol, string usuario, string pwd, string accesarSistema, int[] privilegios)
    {
        bool respuesta = false;
        respuesta = NegocioPersonalUsuario.insertaPersonal(nombre, apPaterno, apMaterno, rfc, estadoC, cpC, idPuesto, email, idRol, usuario, pwd, accesarSistema, privilegios);
        return respuesta;
    }

    [WebMethod]
    public bool insertaUsuario(string personaC, string idRol, string usuario, string pwd, int[] privilegios)
    {
        bool respuesta = false;
        respuesta = NegocioPersonalUsuario.insertaUsuario(personaC, idRol, usuario, pwd, privilegios);
        return respuesta;
    }

    [WebMethod]
    public bool modificarPersonalUsuario(string nombre, string apPaterno, string apMaterno, string rfc, string estadoC, string cpC, string idPuesto, string email, string idRol, string usuario, string pwd, string accesarSistema, int[] privilegios, int idPersonal, int idUsuario, int idRolAnterior)
    {
        bool respuesta = false;
        respuesta = NegocioPersonalUsuario.modificarPersonalUsuario(nombre, apPaterno, apMaterno, rfc, estadoC, cpC, idPuesto, email, idRol, usuario, pwd, accesarSistema, privilegios, idPersonal, idUsuario, idRolAnterior);
        return respuesta;
    }

    [WebMethod]
    public bool eliminarPersonalUsuario(int idPersonal, int idUsuario, int idRolAnterior)
    {
        return NegocioPersonalUsuario.eliminarPersonalUsuario(idPersonal, idUsuario, idRolAnterior);
    }

    #endregion
    #region Sucursales
    readonly Transact.Negocio.NegocioSucursal metodosSucursal = new Transact.Negocio.NegocioSucursal();
    [WebMethod]
    public Sucursal LlenaTablaSucursales()
    {
        Sucursal listcampos;
        listcampos = metodosSucursal.LlenaTablaSucursales();
        return listcampos;

    }
    [WebMethod]
    public bool ActualizarSucursal(string nombre, int idEmpresa, string RS, int TipoPer, string RFC, string Calle, string NumExt, string NumInt, int ComboEstado, int ComboCP, int idSucursal)
    {

        if (NumInt == null)
        {
            NumInt = "Sin Numero Interior";
        }

        CamposSucursal campos = new CamposSucursal();
        campos.DatosFiscales = new CamposDatosFiscales();
        campos.DatosFiscales.TipoPersona = new CamposTipoPersona();
        campos.DatosFiscales.Estado = new CamposEstado();


        campos.nombre = nombre;
        campos.idEmpresa = idEmpresa;
        campos.DatosFiscales.RazonSocial = RS;
        campos.DatosFiscales.TipoPersona.IdTipoPersona = TipoPer;
        campos.DatosFiscales.RFC = RFC;
        campos.DatosFiscales.Calle = Calle;
        campos.DatosFiscales.NumeroExterior = NumExt;

        campos.DatosFiscales.NumeroInterior = NumInt;
        campos.DatosFiscales.Estado.idEstado = ComboEstado;
        campos.DatosFiscales.C_CP = ComboCP;
        campos.idSucursal = idSucursal;

        return metodosSucursal.actualizarSucursalNegocio(campos);

    }
    [WebMethod]
    public bool EliminarSucursal(int idSucursal)
    {
        CamposSucursal campos = new CamposSucursal();


        campos.idSucursal = idSucursal;

        return metodosSucursal.eliminarSucursalNegocio(campos);

    }
    [WebMethod]
    public bool InsertarSucursal(string nombre, int idEmpresa, string RFC, int ComboTPer, string RS, string Calle, string NumExt, string NumInt, int ComboEstado, int ComboCP)
    {
        CamposSucursal campos = new CamposSucursal();
        campos.DatosFiscales = new CamposDatosFiscales();
        campos.DatosFiscales.TipoPersona = new CamposTipoPersona();
        campos.DatosFiscales.Estado = new CamposEstado();


        campos.nombre = nombre;
        campos.idEmpresa = idEmpresa;
        campos.DatosFiscales.RazonSocial = RS;
        campos.DatosFiscales.TipoPersona.IdTipoPersona = ComboTPer;
        campos.DatosFiscales.RFC = RFC;
        campos.DatosFiscales.Calle = Calle;
        campos.DatosFiscales.NumeroExterior = NumExt;
        campos.DatosFiscales.NumeroInterior = NumInt;
        campos.DatosFiscales.Estado.idEstado = ComboEstado;
        campos.DatosFiscales.C_CP = ComboCP;



        return metodosSucursal.InsertaSucursalNegocio(campos);

    }

    /*
    [WebMethod]
    public CodigoPostal LlenaComboCP(int idEstado)
    {

        CodigoPostal listaCP;
        listaCP = metodosSucursal.LlenaComboCP(idEstado);
        return listaCP;

    }
    */
    [WebMethod]
    public Sucursal LlenaComboEmpresa()
    {
        Sucursal listaEmpresa;
        listaEmpresa = metodosSucursal.LlenaComboEmpresa();
        return listaEmpresa;

    }
    [WebMethod]
    public TipoPersona LlenaComboTipoPersona()
    {
        TipoPersona listaTipoPersona;
        listaTipoPersona = metodosSucursal.LlenaComboTipoPersona();
        return listaTipoPersona;

    }
    [WebMethod]
    public Sucursal LlenaComboDatosFiscales()
    {
        Sucursal listaDatosFiscales;
        listaDatosFiscales = metodosSucursal.LlenaComboDatosFiscales();

        return listaDatosFiscales;
    }
    [WebMethod]
    public Estado LlenaComboEstado()
    {
        Estado ListaRegistrosEstado;
        ListaRegistrosEstado = metodosSucursal.LlenaComboEstados();

        return ListaRegistrosEstado;
    }
    #endregion
    #region Categoria de Transaccion

    [WebMethod]
    public EntidadCategoriaTransa LlenaTablaCategoriaTransaccion()
    {
        EntidadCategoriaTransa listcampos;
        listcampos = metodoNegocioCateTransaccion.LlenaTablaTransaccion();
        return listcampos;
    }

    [WebMethod]
    public bool InsertarCategoriaTransaccion(string categoriaTransac, string descripcionCategoria)
    {
        CamposCategoriaTrans campos = new CamposCategoriaTrans();

        campos.categoriaTransac = categoriaTransac;
        campos.descripcionCategoria = descripcionCategoria;

        return metodoNegocioCateTransaccion.InsertarCategoriaTransaccionNegocio(campos);

    }
    [WebMethod]
    public bool ActualizarCategoriaTransaccion(int idCatTipoTransac, string categoriaTransac, string descripcionCategoria)
    {

        CamposCategoriaTrans campos = new CamposCategoriaTrans();
        campos.idCatTipoTransac = idCatTipoTransac;
        campos.categoriaTransac = categoriaTransac;
        campos.descripcionCategoria = descripcionCategoria;

        return metodoNegocioCateTransaccion.ActualizarCategoriaTransaccionNegocio(campos);
    }

    [WebMethod]
    public bool EliminarCategoriaTransaccion(int idCatTipoTransac)
    {
        CamposCategoriaTrans campos = new CamposCategoriaTrans();
        campos.idCatTipoTransac = idCatTipoTransac;

        return metodoNegocioCateTransaccion.EliminarCategoriaTransaccionNegocio(campos);
    }

    #endregion
    #region Datos empresariales

    [WebMethod]
    public DatosEmpresariales LlenaTablaDE()
    {
        DatosEmpresariales listcampos;
        listcampos = metodoNegocioEmpre.LlenaTablaDE();
        return listcampos;
    }

    [WebMethod]
    public bool InsertarDatosEmpresariales(string nombre, string fechaRegistro, int idGiro, int ComboTPer, string RazonSocial, string RFC, int ComboEstado, int ComboCP, string Calle, string NumExt, string NumInt)
    {
        CamposDatosEmpresariales campos = new CamposDatosEmpresariales();
        campos.DatosFiscales = new CamposDatosFiscales();
        campos.DatosFiscales.TipoPersona = new CamposTipoPersona();
        campos.DatosFiscales.Estado = new CamposEstado();


        campos.nombre = nombre;
        campos.fechaRegistro = fechaRegistro;
        campos.idGiro = idGiro;

        campos.DatosFiscales.RazonSocial = RazonSocial;
        campos.DatosFiscales.TipoPersona.IdTipoPersona = ComboTPer;
        campos.DatosFiscales.RFC = RFC;
        campos.DatosFiscales.Calle = Calle;
        campos.DatosFiscales.NumeroExterior = NumExt;
        campos.DatosFiscales.NumeroInterior = NumInt;
        campos.DatosFiscales.Estado.idEstado = ComboEstado;
        campos.DatosFiscales.C_CP = ComboCP;

        return metodoNegocioEmpre.InsertaDatosEmpresariales(campos);

    }
    [WebMethod]
    public bool ActualizarDatosEmpresariales(int idEmpresa, string nombre, string fechaRegistro, int idGiro, int ComboTPer, string RazonSocial, string RFC, int ComboEstado, int ComboCP, string Calle, string NumExt, string NumInt)
    {

        if (NumInt == null)
        {
            NumInt = "Sin Numero Interior";
        }
        CamposDatosEmpresariales campos = new CamposDatosEmpresariales();
        campos.DatosFiscales = new CamposDatosFiscales();
        campos.DatosFiscales.TipoPersona = new CamposTipoPersona();
        campos.DatosFiscales.Estado = new CamposEstado();
        campos.idEmpresa = idEmpresa;
        campos.nombre = nombre;
        campos.fechaRegistro = fechaRegistro;
        campos.idGiro = idGiro;

        campos.DatosFiscales.RazonSocial = RazonSocial;
        campos.DatosFiscales.TipoPersona.IdTipoPersona = ComboTPer;
        campos.DatosFiscales.RFC = RFC;
        campos.DatosFiscales.Calle = Calle;
        campos.DatosFiscales.NumeroExterior = NumExt;
        campos.DatosFiscales.NumeroInterior = NumInt;
        campos.DatosFiscales.Estado.idEstado = ComboEstado;
        campos.DatosFiscales.C_CP = ComboCP;


        return metodoNegocioEmpre.ActualizarDatosEmpresariales(campos);

    }

    [WebMethod]
    public bool EliminarDatosEmpresariales(int idEmpresa)
    {
        CamposDatosEmpresariales campos = new CamposDatosEmpresariales();
        campos.idEmpresa = idEmpresa;

        return metodoNegocioEmpre.EliminarDatosEmpresariales(campos);

    }

    [WebMethod]
    public TipoPersona LlenaComboTipoPersonaEmpre()
    {
        TipoPersona listaTipoPersona;
        listaTipoPersona = metodoNegocioEmpre.LlenaComboTipoPersona();
        return listaTipoPersona;

    }


    [WebMethod]
    public CodigoPostal LlenaComboCPEmpre(int idEstado)
    {

        CodigoPostal listaCP;
        listaCP = metodoNegocioEmpre.LlenaComboCP(idEstado);
        return listaCP;

    }

    [WebMethod]
    public Estado LlenaComboEstadoEmpre()
    {
        Estado ListaRegistrosEstado;
        ListaRegistrosEstado = metodosSucursal.LlenaComboEstados();

        return ListaRegistrosEstado;
    }

    #endregion
    #region Gestión de Procesos

    [WebMethod]
    public EntidadProceso LlenaTablaProcesos()
    {
        EntidadProceso listcampos;
        listcampos = metodoNegocioProceso.LlenaTablaProceso();
        return listcampos;
    }

    [WebMethod]
    public bool InsertarProceso(string nombreProceso, string descripcion, int idArea)
    {
        CamposProceso campos = new CamposProceso();
        campos.idArea = new CamposAreaByProceso();

        campos.nombreProceso = nombreProceso;
        campos.descripcion = descripcion;
        campos.idArea.idArea = idArea;

        return metodoNegocioProceso.InsertaProcesos(campos);

    }
    [WebMethod]
    public bool ActualizarProceso(int idProceso, string nombreProceso, string descripcion, int idArea)
    {

        CamposProceso campos = new CamposProceso();
        campos.idArea = new CamposAreaByProceso();

        campos.idProceso = idProceso;
        campos.nombreProceso = nombreProceso;
        campos.descripcion = descripcion;
        campos.idArea.idArea = idArea;

        return metodoNegocioProceso.ActualizarProceso(campos);
    }

    [WebMethod]
    public bool EliminarProceso(int idProceso)
    {
        CamposProceso campos = new CamposProceso();
        campos.idProceso = idProceso;

        return metodoNegocioProceso.EliminarProceso(campos);
    }

    [WebMethod]
    public AreasBYProceso LlenaComboAreaByProceso()
    {
        AreasBYProceso listaArea;
        listaArea = metodoNegocioProceso.LlenaComboArea();
        return listaArea;
    }

#endregion
    //Metodos para Áreas
    #region CrudAreas

    [WebMethod]
    public Area LlenaTablaArea()
    {
        Area listcampos;
        listcampos = negocioArea.LlenaTabla();
        return listcampos;

    }

    [WebMethod]
    public bool insertaAreaWs(string nombreArea, string descripcion, int[] idSucursal)
    {
        bool respuesta = false;
        try
        {
            CamposArea campos = new CamposArea();
            campos.camposSucursal = new CamposSucursal();
            campos.nombreArea = nombreArea;
            campos.descripcion = descripcion;

            negocioArea.InsertaAreaNegocio(campos);

            foreach (int i in idSucursal)
            {
                Console.Write(i);
                campos.camposSucursal.idSucursal = i;
                negocioArea.InsertaAreaxSucursalNegocio(campos);
            }
            respuesta = true;

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);

        }

        return respuesta;

    }

    [WebMethod]
    public Sucursal LlenaComboSucursalWS()
    {
        Sucursal listcampos;
        listcampos = negocioArea.LlenacomboSucursalNegocio();
        return listcampos;
    }

    [WebMethod]
    public bool actualizarAreaWs(int idArea, string nombreArea, string descripcion, int[] idSucursal)
    {
        CamposArea campos = new CamposArea();
        campos.camposSucursal = new CamposSucursal();
        campos.nombreArea = nombreArea;
        campos.descripcion = descripcion;
        //campos.camposSucursal.idSucursal = idSucursal;
        campos.idArea = idArea;

        return negocioArea.actualizarAreaNegocio(campos, idSucursal);
    }

    [WebMethod]
    public Area LlenaCheckBoxAreasEdit(int idArea)
    {
        Area listcampos;
        CamposArea campos = new CamposArea();
        campos.camposSucursal = new CamposSucursal();
        campos.idArea = idArea;
        listcampos = negocioArea.LlenaCheckBoxAreasEdit(campos);
        return listcampos;
    }
    #endregion
    //Metodos para Roles
    #region CrudRoles

    [WebMethod]
    public Roles LlenaTablaRoles()
    {
        
        Roles listcampos;
        listcampos = negocioRoles.LlenaTabla();
        return listcampos;

    }

    [WebMethod]
    public bool insertaRolWs(string nombreRol, string descripcion, int[] idMenus)
    {
        bool respuesta = false;
        try
        {
            CamposRoles campos = new CamposRoles();
            campos.camposMenus = new CamposMenus();
            campos.nombreRol = nombreRol;
            campos.descripcionRol = descripcion;

            negocioRoles.InsertaRolNegocio(campos, idMenus);

            respuesta = true;

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);

        }

        return respuesta;

    }

    [WebMethod]
    public Menus LlenaCheckMenulWS()
    {
        Menus listcampos;
        listcampos = negocioRoles.LlenaCheckMenul();
        return listcampos;
    }

    [WebMethod]
    public bool actualizarRolWs(int idRol, string nombreRol, string descripcion, int[] idMenus)
    {
        CamposRoles campos = new CamposRoles();
        campos.camposMenus = new CamposMenus();
        campos.nombreRol = nombreRol;
        campos.descripcionRol = descripcion;
        campos.idRol = idRol;

        return negocioRoles.actualizarRolNegocio(campos, idMenus);
    }

    [WebMethod]
    public Roles LlenaCheckBoxRolEdit(int idRol)
    {
        Roles listcampos;
        CamposRoles campos = new CamposRoles();
        campos.camposMenus = new CamposMenus();
        campos.idRol = idRol;
        listcampos = negocioRoles.LlenaCheckBoxRolEdit(campos);
        return listcampos;
    }
    #endregion
    //Métodos para menús
    #region CrudMenu

    [WebMethod]
    public Menus LlenaTablaMenus()
    {
        Menus listcampos;
        listcampos = negocioMenus.LlenaTablaMenus();
        return listcampos;

    }

    //llenaCheckAplicaciones

    [WebMethod]
    public Aplicaciones LlenaCheckAplicaciones()
    {
        Aplicaciones listcampos;
        listcampos = negocioMenus.LlenaCheckAplicaciones();
        return listcampos;
    }

    [WebMethod]
    public bool insertaMenu(string nombreMenu, int idNivelPadre, int idPadre, string descripcion, string icono, string liga, int[] idAplicaciones)
    {
        bool respuesta = false;
        try
        {
            CamposMenus campos = new CamposMenus();
            campos.camposAplicaciones = new CamposAplicaciones();
            campos.nombreMenu = nombreMenu;
            campos.idNivelPadre = idNivelPadre;
            campos.idPadre = idPadre;
            campos.icono = icono;
            campos.liga = liga;
            campos.descripcionMenu = descripcion;

            negocioMenus.InsertaMenuNegocio(campos, idAplicaciones);

            respuesta = true;

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);

        }

        return respuesta;

    }


    [WebMethod]
    public bool actualizarMenu(int idMenu, string nombreMenu, int idNivelPadre, int idPadre, string descripcion, string icono, string liga, int[] idAplicaciones)
    {

        CamposMenus campos = new CamposMenus();
        campos.camposAplicaciones = new CamposAplicaciones();
        campos.idMenu = idMenu;
        campos.nombreMenu = nombreMenu;
        campos.idNivelPadre = idNivelPadre;
        campos.idPadre = idPadre;
        campos.icono = icono;
        campos.liga = liga;
        campos.descripcionMenu = descripcion;

        return negocioMenus.actualizarMenuNegocio(campos, idAplicaciones);
    }


    [WebMethod]
    public Menus LlenaComboMenuPadre()
    {
        Menus listcampos;
        listcampos = negocioMenus.LlenaComboMenuPadre();
        return listcampos;
    }

    [WebMethod]
    public Menus LlenaCheckBoxMenusEdit(int idMenu)
    {
        Menus listcampos;
        CamposMenus campos = new CamposMenus();
        campos.idMenu = idMenu;
        listcampos = negocioMenus.LlenaCheckBoxMenusEdit(campos);
        return listcampos;
    }

    #endregion


}

