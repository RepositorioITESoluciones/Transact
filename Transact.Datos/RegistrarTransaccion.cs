using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using Transact.Framework.AccesoDatos;
using Newtonsoft.Json;
using System.Xml;
using System.Xml.Serialization;
using Transact.Entidades;
using System.IO;


namespace Transact.Datos
{
    public class RegistrarTransaccion
    {

        public CamposTransaccion ArmaFormulario(int idTransaccion)
        {
            CamposTransaccion comptran = new CamposTransaccion();
            SqlConnection connection = null;
            DataTable Transacciones = new DataTable();
            Console.WriteLine(Transacciones);

            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    var parametros = new[]
                     {
                    ParametroAcceso.CrearParametro("@idTransaccion", SqlDbType.Int, idTransaccion , ParameterDirection.Input)
                    };

                    connection.Open();
                    Transacciones = Ejecuta.EjecutarConsulta(connection, parametros, "[dbo].[SpObtenerTransaccion]");
                    connection.Close();

                    foreach (DataRow Transaccion in Transacciones.Rows)
                    {
                        comptran.idTipoTrasaccion = Convert.ToInt32(Transaccion["idTipoTransaccion"].ToString());
                        comptran.descripcion = Transaccion["descripcion"].ToString();
                        comptran.cveTipoTransaccion = Transaccion["cveTipoTransaccion"].ToString();
                        comptran.categoriaTransac = Transaccion["categoriaTransac"].ToString();
                        comptran.idEtapa = Convert.ToInt32(Transaccion["idEtapa"].ToString());
                        comptran.idAccion = Convert.ToInt32(Transaccion["idAccion"].ToString());
                        comptran.activo = Convert.ToBoolean(Transaccion["activo"].ToString());


                        CamposTransaccion(ref comptran);



                    }



                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

            return comptran;

        }
        public static void CamposTransaccion(ref CamposTransaccion campos)
        {
            SqlConnection connection = null;
            DataTable CamposComplemento;
            List<CampCabecera> ListaCamposComplementoCab = new List<CampCabecera>();
            List<CampDetalle> ListaCamposComplementoDet = new List<CampDetalle>();
            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    var parametros = new[]
                    {
                          ParametroAcceso.CrearParametro("@idTransaccion", SqlDbType.Int, campos.idTipoTrasaccion , ParameterDirection.Input)
                    };
                    connection.Open();
                    CamposComplemento = Ejecuta.EjecutarConsulta(connection, parametros, "[dbo].[SpObtener_x_Transacciones]");
                    connection.Close();
                    if (CamposComplemento.Rows.Count > 0)
                    {
                        DataSet dtCampos = new DataSet();

                        dtCampos.Tables.Add(CamposComplemento);



                        if (1 == (int)Entidades.nivel.cabecera)

                            foreach (DataRow Campo in CamposComplemento.Rows)
                            {
                                if ((Convert.ToInt32(Campo["idnivel"].ToString())) == (int)Entidades.nivel.cabecera)
                                {
                                    Entidades.CampCabecera CampoCabecera = new Entidades.CampCabecera();

                                    CampoCabecera.idCampo = Convert.ToInt32(Campo["idCampo"].ToString());
                                    CampoCabecera.idnivel = Convert.ToInt32(Campo["idnivel"].ToString());
                                    CampoCabecera.nombreCampo = Campo["nombreCampo"].ToString();
                                    CampoCabecera.descripcionCampo = Campo["descripcionCampo"].ToString();
                                    CampoCabecera.TipoDatoCampo = Campo["tipoDato"].ToString();
                                    CampoCabecera.Visualisacion = Campo["visualisacion"].ToString();
                                    CampoCabecera.TipoOperacion = Campo["tipoOperacion"].ToString();
                                    CampoCabecera.activo = Convert.ToBoolean(Campo["activo"].ToString());
                                    CampoCabecera.logitudCampo = Convert.ToDouble(Campo["longitudCampo"].ToString());
                                    CampoCabecera.visible = Convert.ToBoolean(Campo["visible"].ToString());
                                    CampoCabecera.editable = Convert.ToBoolean(Campo["editable"].ToString());
                                    CampoCabecera.obligatorio = Campo["obligatorio"].ToString();
                                    if (Campo["CadenaComplementos"].ToString() != "")
                                    {
                                        CampoCabecera.CadenaComplementos = Campo["CadenaComplementos"].ToString();
                                    }
                                    if (Campo["formula"].ToString() != "")
                                    {
                                        CampoCabecera.formula = Campo["formula"].ToString();
                                    }
                                    if (Campo["TipoTransaccion"].ToString() != "")
                                    {
                                        CampoCabecera.TransaccionReferencia = Campo["TipoTransaccion"].ToString();
                                        CampoCabecera.idRef = Campo["IdReferencia"].ToString();
                                        CampoCabecera.nomRef = Campo["NombreReferencia"].ToString();
                                    }
                                    ListaCamposComplementoCab.Add(CampoCabecera);
                                }

                                if ((Convert.ToInt32(Campo["idnivel"].ToString())) == (int)Entidades.nivel.detalle)
                                {
                                    Entidades.CampDetalle CampoDet = new Entidades.CampDetalle();
                                    CampoDet.idCampo = Convert.ToInt32(Campo["idCampo"].ToString());
                                    CampoDet.idnivel = Convert.ToInt32(Campo["idnivel"].ToString());
                                    CampoDet.nombreCampo = Campo["nombreCampo"].ToString();
                                    CampoDet.descripcionCampo = Campo["descripcionCampo"].ToString();
                                    CampoDet.TipoDatoCampo = Campo["tipoDato"].ToString();
                                    CampoDet.Visualisacion = Campo["visualisacion"].ToString();
                                    CampoDet.TipoOperacion = Campo["tipoOperacion"].ToString();
                                    CampoDet.activo = Convert.ToBoolean(Campo["activo"].ToString());
                                    CampoDet.logitudCampo = Convert.ToDouble(Campo["longitudCampo"].ToString());
                                    CampoDet.visible = Convert.ToBoolean(Campo["visible"].ToString());
                                    CampoDet.editable = Convert.ToBoolean(Campo["editable"].ToString());
                                    CampoDet.obligatorio = Campo["obligatorio"].ToString();
                                    if (Campo["CadenaComplementos"].ToString() != "")
                                    {
                                        CampoDet.CadenaComplementos = Campo["CadenaComplementos"].ToString();
                                    }
                                    if (Campo["formula"].ToString() != "")
                                    {
                                        CampoDet.formula = Campo["formula"].ToString();
                                    }

                                    if (Campo["TipoTransaccion"].ToString() != "")
                                    {
                                        CampoDet.TransaccionReferencia = Campo["TipoTransaccion"].ToString();
                                        CampoDet.idRef = Campo["IdReferencia"].ToString();
                                        CampoDet.nomRef = Campo["NombreReferencia"].ToString();
                                    }
                                    ListaCamposComplementoDet.Add(CampoDet);
                                }


                            }
                        campos.CamposCabecera = ListaCamposComplementoCab.ToArray();
                        campos.CamposDetalle = ListaCamposComplementoDet.ToArray();
                    }
                    else
                    {
                        campos.CamposCabecera = ListaCamposComplementoCab.ToArray();
                        campos.CamposDetalle = ListaCamposComplementoDet.ToArray();
                    }

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error en obtener las transacciones  \r\nError: " + ex.Message, ex); ;
                throw;

            }
        }
        public Combo LlenaCombo(string idTransaccion, string idRef, string nomref)
        {
            List<Entidades.CampCatalogo> ListaCampCatalogo = new List<Entidades.CampCatalogo>();
            Entidades.Combo row = new Entidades.Combo();
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT * FROM Configuracion.ValoresCamposTransacciones VCT, Configuracion.MAETransacciones MAE WHERE VCT.idTransaccion = MAE.idTransaccion AND MAE.idTipoTransaccion = " + idTransaccion);
                    dt.Load(consulta);
                    connection.Close();

                }

                int contador = 0;
                int contador2 = 0;
                DataSet RegistrosBD = new DataSet();
                DataTable Registros = new DataTable();
                DataTable DatosCabecero = new DataTable();
                DataTable DatosDet = new DataTable();
                DataTable DatosGral = new DataTable();
                DataTable DatosPrincipales = new DataTable();
                foreach (DataRow rows in dt.Rows)
                {
                    RegistrosBD = ConvertJsonStringToDataSet(rows["camposTransaccion"].ToString());




                    if (RegistrosBD.Tables.Contains("Cabecera"))
                    {

                        contador2++;

                        DatosPrincipales = RegistrosBD.Tables["Cabecera"];
                        if (contador2 == 1)
                        {
                            DatosGral = RegistrosBD.Tables["informacionTransaccion"];
                            DatosCabecero = DatosPrincipales;
                        }
                        if (contador2 > 1) { DatosCabecero.Merge(DatosPrincipales, false, MissingSchemaAction.Add); }


                    }
                    else
                    {
                        DatosGral = RegistrosBD.Tables["informacionTransaccion"];
                    }

                    if (RegistrosBD.Tables.Contains("Detalle"))
                    {
                        contador++;
                        Registros = RegistrosBD.Tables["Detalle"];

                        if (contador == 1)
                        {
                            DatosGral = RegistrosBD.Tables["informacionTransaccion"];
                            DatosDet = Registros;
                        }
                        if (contador > 1) { DatosDet.Merge(Registros, false, MissingSchemaAction.Add); }
                    }
                    else
                    {
                        DatosGral = RegistrosBD.Tables["informacionTransaccion"];
                    }
                }




                foreach (DataRow rowGral in DatosGral.Rows)
                {
                    row.idTransaccion = Convert.ToInt64(rowGral["idTransaccion"].ToString());

                    row.NombreTransaccion = rowGral["nombreTransaccion"].ToString();


                }
                if (DatosCabecero.Columns.Contains(idRef) && DatosCabecero.Columns.Contains(nomref))
                {

                    foreach (DataRow rowDet in DatosCabecero.Rows)
                    {
                        Entidades.CampCatalogo valores1 = new Entidades.CampCatalogo();
                        valores1.id = rowDet[idRef].ToString();
                        valores1.Nombre = rowDet[nomref].ToString();
                        ListaCampCatalogo.Add(valores1);

                    }


                }

                if (DatosDet.Columns.Contains(idRef) && DatosDet.Columns.Contains(nomref))
                {

                    foreach (DataRow rowDet in DatosDet.Rows)
                    {
                        Entidades.CampCatalogo valores1 = new Entidades.CampCatalogo();
                        valores1.id = rowDet[idRef].ToString();
                        valores1.Nombre = rowDet[nomref].ToString();
                        ListaCampCatalogo.Add(valores1);

                    }
                }


                row.CamposCat = ListaCampCatalogo.ToArray();


                Console.WriteLine(RegistrosBD);
                Console.WriteLine(Registros);
                Console.WriteLine(DatosPrincipales);


            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

                throw;
            }



            return row;
        }
        public Combo LlenaComboDetalle(string idTransaccion, string idRef, string nomref) {
            List<Entidades.CampCatalogo> ListaCampCatalogo = new List<Entidades.CampCatalogo>();
            Entidades.Combo row = new Entidades.Combo();
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            try {

                using (connection = Conexion.ObtieneConexion("ConexionBD")) {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT * FROM Configuracion.ValoresCamposTransacciones VCT, Configuracion.MAETransacciones MAE WHERE VCT.idTransaccion = MAE.idTransaccion AND MAE.idTransaccion = '" + idTransaccion+"'");
                    dt.Load(consulta);
                    connection.Close();

                }

                int contador = 0;
                int contador2 = 0;
                DataSet RegistrosBD = new DataSet();
                DataTable Registros = new DataTable();
                DataTable DatosCabecero = new DataTable();
                DataTable DatosDet = new DataTable();
                DataTable DatosGral = new DataTable();
                DataTable DatosPrincipales = new DataTable();
                foreach (DataRow rows in dt.Rows) {
                    RegistrosBD = ConvertJsonStringToDataSet(rows["camposTransaccion"].ToString());




                    if (RegistrosBD.Tables.Contains("Cabecera")) {

                        contador2++;

                        DatosPrincipales = RegistrosBD.Tables["Cabecera"];
                        if (contador2 == 1) {
                            DatosGral = RegistrosBD.Tables["informacionTransaccion"];
                            DatosCabecero = DatosPrincipales;
                        }
                        if (contador2 > 1) { DatosCabecero.Merge(DatosPrincipales, false, MissingSchemaAction.Add); }


                    } else {
                        DatosGral = RegistrosBD.Tables["informacionTransaccion"];
                    }

                    if (RegistrosBD.Tables.Contains("Detalle")) {
                        contador++;
                        Registros = RegistrosBD.Tables["Detalle"];

                        if (contador == 1) {
                            DatosGral = RegistrosBD.Tables["informacionTransaccion"];
                            DatosDet = Registros;
                        }
                        if (contador > 1) { DatosDet.Merge(Registros, false, MissingSchemaAction.Add); }
                    } else {
                        DatosGral = RegistrosBD.Tables["informacionTransaccion"];
                    }
                }




                foreach (DataRow rowGral in DatosGral.Rows) {
                    row.idTransaccion = Convert.ToInt64(rowGral["idTransaccion"].ToString());

                    row.NombreTransaccion = rowGral["nombreTransaccion"].ToString();


                }
                if (DatosCabecero.Columns.Contains(idRef) && DatosCabecero.Columns.Contains(nomref)) {

                    foreach (DataRow rowDet in DatosCabecero.Rows) {
                        Entidades.CampCatalogo valores1 = new Entidades.CampCatalogo();
                        valores1.id = rowDet[idRef].ToString();
                        valores1.Nombre = rowDet[nomref].ToString();
                        ListaCampCatalogo.Add(valores1);

                    }


                }

                if (DatosDet.Columns.Contains(idRef) && DatosDet.Columns.Contains(nomref)) {

                    foreach (DataRow rowDet in DatosDet.Rows) {
                        Entidades.CampCatalogo valores1 = new Entidades.CampCatalogo();
                        valores1.id = rowDet[idRef].ToString();
                        valores1.Nombre = rowDet[nomref].ToString();
                        ListaCampCatalogo.Add(valores1);

                    }
                }


                row.CamposCat = ListaCampCatalogo.ToArray();


                Console.WriteLine(RegistrosBD);
                Console.WriteLine(Registros);
                Console.WriteLine(DatosPrincipales);


            } catch (Exception ex) {
                Console.WriteLine(ex);

                throw;
            }



            return row;
        }
        private static DataSet ConvertJsonStringToDataSet(string jsonString)
        {
            try
            {
                XmlDocument xd = new XmlDocument();
                Console.WriteLine(xd);
                jsonString = "{ \"rootNode\": {" + jsonString.Trim().TrimStart('{').TrimEnd('}') + "} }";
                xd = (XmlDocument)JsonConvert.DeserializeXmlNode(jsonString);

                DataSet ds = new DataSet();
                ds.ReadXml(new XmlNodeReader(xd));

                return ds;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public bool inserta(string json, string idTransaccion, int idEtapa, int idAccion)
        {
            bool Respuesta = false;
            Int32 idbitacora = 0;
            SqlConnection connection = null;
            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    Int64 substring = 0;
                    Int64 resultadoid = 0;
                    StringBuilder folio = new StringBuilder();

                    DataTable p = new DataTable();
                    DataTable bitacora = new DataTable();
                    Console.WriteLine(p);
                    Console.WriteLine(bitacora);
                    connection.Open();

                    p = Ejecuta.EjecutarConsulta(connection, null, "SELECT MAX(SUBSTRING(idTransaccion, 7, 14))  idTransaccion FROM Configuracion.MAETransacciones", false);
                    if (p != null)
                    {
                        resultadoid = (long)Convert.ToDouble(p.Rows[0][0].ToString());
                    }


                    DateTime thisDay = DateTime.Today;
                    folio.Append(thisDay.ToString("ddMMyy"));
                    if (resultadoid != 0)
                    {
                        //substring = Convert.ToInt32(resultadoid.ToString().Substring(6));
                        substring = resultadoid + 1;

                    }


                    int count = 8 - substring.ToString().Length;
                    for (int i = 1; i <= count; i++)
                    {
                        folio.Append("0");
                    }


                    folio.Append(Convert.ToInt32(substring));

                    dynamic jsonObj = Newtonsoft.Json.JsonConvert.DeserializeObject(json);
                    jsonObj["informacionTransaccion"][0]["idTransaccion"] = folio.ToString();
                    string output = Newtonsoft.Json.JsonConvert.SerializeObject(jsonObj, Newtonsoft.Json.Formatting.Indented);
                    connection.Close();

                    int resultadoidB = 0;
                    connection.Open();
                    bitacora = Ejecuta.EjecutarConsulta(connection, null, "SELECT Max(idBitacora) FROM Configuracion.BitacoraTransacciones", false);

                    if (bitacora != null)
                    {
                        resultadoidB = Convert.ToInt32(bitacora.Rows[0][0].ToString());
                    }
                    idbitacora = resultadoidB + 1;
                    connection.Close();

                    connection.Open();
                    SqlTransaction sqlTran = connection.BeginTransaction();
                    SqlCommand command = connection.CreateCommand();

                    command.Transaction = sqlTran;
                    try
                    {
                        command.CommandText = "INSERT INTO Configuracion.MAETransacciones VALUES(@folio,@idTransaccion,@fecha,null,1,1,@idEtapa,1)";

                        command.Parameters.AddWithValue("@folio", folio.ToString());
                        command.Parameters.AddWithValue("@idTransaccion", idTransaccion);
                        command.Parameters.AddWithValue("@fecha", DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss"));
                        command.Parameters.AddWithValue("@idEtapa", idEtapa);
                        command.ExecuteNonQuery();

                        command.CommandText = "INSERT INTO Configuracion.ValoresCamposTransacciones VALUES(@folio1,@output)";
                        command.Parameters.AddWithValue("@folio1", folio.ToString());
                        command.Parameters.AddWithValue("@output", output);
                        command.ExecuteNonQuery();

                        command.CommandText = "INSERT INTO Configuracion.BitacoraTransacciones VALUES(@idBitacora,@folios,'Insert',@outputs,@idEtapa1,@idEtapa2,null)";
                        command.Parameters.AddWithValue("@idBitacora", idbitacora);
                        command.Parameters.AddWithValue("@folios", folio.ToString());
                        command.Parameters.AddWithValue("@outputs", output);
                        command.Parameters.AddWithValue("@idEtapa1", idEtapa);
                        command.Parameters.AddWithValue("@idEtapa2", idEtapa);
                        command.ExecuteNonQuery();

                        sqlTran.Commit();


                        Respuesta = true;

                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                        sqlTran.Rollback();
                        Respuesta = false;
                    }

                }


            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                return false;
            }

            return Respuesta;


        }

        public bool insertaxEtapa(string json, string idTransaccion, int idEtapa, int idAccion) {
            DataTable dt = new DataTable();
            DataSet datosBD = new DataSet();
            DataSet datosNew = new DataSet();
            bool Respuesta = false;
            Int32 idbitacora = 0;
            SqlConnection connection = null;
            DataTable bitacora = new DataTable();
            try {

                using (connection = Conexion.ObtieneConexion("ConexionBD")) {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT idTransaccion,camposTransaccion " +
                        "FROM Configuracion.ValoresCamposTransacciones " +
                        "where idTransaccion='" + idTransaccion + "'");
                    dt.Load(consulta);
                    connection.Close();

                    int resultadoidB = 0;
                    connection.Open();
                    bitacora = Ejecuta.EjecutarConsulta(connection, null, "SELECT Max(idBitacora) FROM Configuracion.BitacoraTransacciones", false);

                    if (bitacora != null) {
                        resultadoidB = Convert.ToInt32(bitacora.Rows[0][0].ToString());
                    }
                    idbitacora = resultadoidB + 1;
                    connection.Close();

                }

                foreach (DataRow reg in dt.Rows) {

                    datosBD = ConvertJsonStringToDataSet(reg["camposTransaccion"].ToString());
                }
                datosNew = ConvertJsonStringToDataSet(json);
                foreach (DataTable table in datosNew.Tables) {

                    if (table.TableName=="Detalle") {

                        foreach (DataColumn column in table.Columns) {

                            if (datosBD.Tables["Detalle"].Columns.Contains(column.ColumnName) != true && column.ColumnName != "Idrows") {

                                datosBD.Tables["Detalle"].Columns.Add(column.ColumnName);
                            }

                           

                        }
                    }

                    if (table.TableName == "Cabecera") {

                        foreach (DataColumn column in table.Columns) {

                            if (datosBD.Tables["Cabecera"].Columns.Contains(column.ColumnName) != true) {

                                datosBD.Tables["Cabecera"].Columns.Add(column.ColumnName);

                            }
                        }
                    }
                }

                foreach (DataRow drUp in datosNew.Tables["Detalle"].Rows) {

                    foreach (DataRow dr in datosBD.Tables["Detalle"].Rows) {

                        string var1 = dr["idrow"].ToString();
                        string var2 = drUp["Idrows"].ToString();

                        if (var1 == var2) {

                            foreach (DataColumn column in datosNew.Tables["Detalle"].Columns) {

                                if (datosBD.Tables["Detalle"].Columns.Contains(column.ColumnName)==true) {

                                    var query = from p in datosNew.Tables["Detalle"].AsEnumerable()
                                                where p.Field<string>("Idrows") == var1
                                                select new {
                                                    parametro = p.Field<string>(column.ColumnName)
                                                };
                                    string resultado = "";

                                    foreach (var item in query) {
                                        resultado = item.parametro.ToString();
                                    }


                                    dr[column.ColumnName] = resultado;

                                }

                            
                            }
                            
                        }
                    }
                }
                foreach (DataRow drUp in datosNew.Tables["Cabecera"].Rows) {

                    foreach (DataRow dr in datosBD.Tables["Cabecera"].Rows) {
                            foreach (DataColumn column in datosNew.Tables["Cabecera"].Columns) {

                                if (datosBD.Tables["Cabecera"].Columns.Contains(column.ColumnName) == true) {

                                    var query = from p in datosNew.Tables["Cabecera"].AsEnumerable()
                                                select new {
                                                    parametro = p.Field<string>(column.ColumnName)
                                                };
                                    string resultado = "";

                                    foreach (var item in query) {
                                        resultado = item.parametro.ToString();
                                    }


                                    dr[column.ColumnName] = resultado;

                                }


                            }
                    }
                }
                string cadena = JsonConvert.SerializeObject(datosBD);
                using (connection = Conexion.ObtieneConexion("ConexionBD")) {
                    connection.Open();
                    SqlTransaction sqlTran = connection.BeginTransaction();
                    SqlCommand command = connection.CreateCommand();

                    command.Transaction = sqlTran;

                    try {
                        command.CommandText = "UPDATE Configuracion.ValoresCamposTransacciones SET camposTransaccion = @jsonUpdate WHERE idTransaccion = @idTransaccion1";

                        command.Parameters.AddWithValue("@jsonUpdate", cadena);
                        command.Parameters.AddWithValue("@idTransaccion1", idTransaccion);
                        command.ExecuteNonQuery();


                        command.CommandText = "INSERT INTO Configuracion.BitacoraTransacciones VALUES(@idbitacora,@idTransaccion,'Update',@jsonnuevo,@idEtapa,@idEtapa1,null)";
                        command.Parameters.AddWithValue("@idbitacora", idbitacora);
                        command.Parameters.AddWithValue("@idTransaccion", idTransaccion);
                        command.Parameters.AddWithValue("@jsonnuevo", cadena);
                        command.Parameters.AddWithValue("@idEtapa", idEtapa);
                        command.Parameters.AddWithValue("@idEtapa1", idEtapa);
                        command.ExecuteNonQuery();
                        sqlTran.Commit();

                        Respuesta = true;

                    } catch (Exception ex) {
                        Console.WriteLine(ex);
                        sqlTran.Rollback();
                        Respuesta = false;
                    }


                    connection.Close();
                }
            } catch (Exception ex) {

                Console.WriteLine(ex);
                return false;
            }

            return Respuesta;


        }

        public EntidadCategoriaTransa Categtrans()
        {
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            Entidades.EntidadCategoriaTransa registros = new Entidades.EntidadCategoriaTransa();
            List<Entidades.CamposCategoriaTrans> tipostransa = new List<Entidades.CamposCategoriaTrans>();
            try
            {


                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT idCatTipoTransac,categoriaTransac FROM Configuracion.CategoriaTipoTransaccion order by categoriaTransac ASC");
                    dt.Load(consulta);
                    connection.Close();

                }


                foreach (DataRow row in dt.Rows)
                {
                    Entidades.CamposCategoriaTrans registrosdet = new Entidades.CamposCategoriaTrans();
                    registrosdet.idCatTipoTransac = Convert.ToInt32(row["idCatTipoTransac"].ToString());
                    registrosdet.categoriaTransac = row["categoriaTransac"].ToString();
                    tipostransa.Add(registrosdet);
                }

                registros.ListaCategorias = tipostransa.ToArray();



            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            return registros;

        }
        public comboTransac camposCategTransac(int idtipo)
        {
            DataTable dt = new DataTable();
            SqlConnection connection = null;
            Entidades.comboTransac registros = new Entidades.comboTransac();
            List<Entidades.camposCattransac> tipostransa = new List<Entidades.camposCattransac>();
            try
            {


                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT TT.idTipoTransaccion, TT.descripcion, TT.idCatTipoTransac"
                                                                      + " FROM Configuracion.TiposTransacciones TT, Configuracion.CategoriaTipoTransaccion CTT"
                                                                      + " WHERE TT.idCatTipoTransac = CTT.idCatTipoTransac"
                                                                      + " AND TT.idCatTipoTransac = " + idtipo + " order by TT.descripcion ASC");
                    dt.Load(consulta);
                    connection.Close();

                }


                foreach (DataRow row in dt.Rows)
                {
                    Entidades.camposCattransac camposCattransac = new Entidades.camposCattransac();
                    camposCattransac.idTipoTransaccion = Convert.ToInt32(row["idTipoTransaccion"].ToString());
                    camposCattransac.descripcion = row["descripcion"].ToString();
                    camposCattransac.idCategoria = Convert.ToInt32(row["idCatTipoTransac"].ToString());
                    tipostransa.Add(camposCattransac);
                }

                registros.camposCompTransac = tipostransa.ToArray();



            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            return registros;

        }
        public ValoresComplemento AutoCompletable(int idTransaccion, string primarykey, string Valor, string IdRef, string CampRef)
        {
            SqlConnection connection = null;
            DataTable dtAutoCompletable = new DataTable();
            DataSet valoresJson = new DataSet();
            Entidades.ValoresComplemento complemento = new Entidades.ValoresComplemento();
            using (connection = Conexion.ObtieneConexion("ConexionBD"))
            {
                SqlDataReader consulta;
                connection.Open();
                consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT camposTransaccion " +
                                                                    " FROM Configuracion.MAETransacciones MAE, Configuracion.ValoresCamposTransacciones VCT " +
                                                                    " WHERE MAE.idTransaccion = VCT.idTransaccion AND idTipoTransaccion = " + idTransaccion);
                dtAutoCompletable.Load(consulta);
                connection.Close();

            }

            try
            {
                foreach (DataRow row in dtAutoCompletable.Rows)
                {
                    valoresJson = ConvertJsonStringToDataSet(row["camposTransaccion"].ToString());
                }


                DataTable CompleDetalle = new DataTable();
                DataTable CompleCebecera = new DataTable();
                DataTable DTRegistros = new DataTable();

                Console.WriteLine(CompleDetalle);
                Console.WriteLine(CompleCebecera);


                CompleDetalle = valoresJson.Tables["Detalle"];
                CompleCebecera = valoresJson.Tables["Cabecera"];

                if (CompleDetalle != null && CompleDetalle.Columns.Contains(primarykey) && CompleDetalle.Columns.Contains(IdRef) && CompleDetalle.Columns.Contains(CampRef))
                {

                    DTRegistros = CompleDetalle;

                }
                if (CompleCebecera != null && CompleCebecera.Columns.Contains(primarykey) && CompleCebecera.Columns.Contains(IdRef) && CompleCebecera.Columns.Contains(CampRef))
                {
                    DTRegistros = CompleCebecera;
                }


                if (DTRegistros != null)
                {
                    var query1 =
                   from product in DTRegistros.AsEnumerable()
                   where product.Field<string>(primarykey) == Valor
                   select new
                   {
                       Idvalor = product.Field<string>(IdRef),
                       Valor = product.Field<string>(CampRef)
                   };

                    foreach (var item in query1)
                    {
                        complemento.Idvalor = item.Idvalor;
                        complemento.Valor = item.Valor;
                    }

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;

            }

            return complemento;
        }
        public bool InsertarCatalogos(string json, string idTransaccion, int idEtapa, int idAccion)
        {
            SqlConnection connection = null;
            DataTable dt = new DataTable();
            DataSet dtJson = new DataSet();
            DataSet dtJsonNew = new DataSet();
            Console.WriteLine(dtJsonNew);
            bool respuesta = true;
            string idTransaccion1 = "";
            ConvertJsonToDataset convert = new ConvertJsonToDataset();

            using (connection = Conexion.ObtieneConexion("ConexionBD"))
            {
                SqlDataReader consulta;
                connection.Open();
                consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT VCT.idTransaccion,camposTransaccion FROM Configuracion.ValoresCamposTransacciones VCT inner join Configuracion.MAETransacciones MT on VCT.idTransaccion=MT.idTransaccion  where MT.idTipoTransaccion = " + idTransaccion);
                dt.Load(consulta);
                connection.Close();

                try
                {


                    if (dt.Rows.Count != 0)
                    {

                        foreach (DataRow row in dt.Rows)
                        {

                            dtJson = convert.ConvertJsonStringToDataSet(row["camposTransaccion"].ToString());
                        }


                        dtJsonNew = convert.ConvertJsonStringToDataSet(json);

                        if (dtJson.Tables.Contains("Cabecera"))
                        {

                            dtJson.Tables["Cabecera"].Merge(dtJsonNew.Tables["Cabecera"], false, MissingSchemaAction.Add);

                        }
                        if (dtJson.Tables.Contains("Detalle"))
                        {

                            dtJson.Tables["Detalle"].Merge(dtJsonNew.Tables["Detalle"], false, MissingSchemaAction.Add);

                        }




                        foreach (DataRow rows in dtJson.Tables["informacionTransaccion"].Rows)
                        {

                            idTransaccion1 = rows["idTransaccion"].ToString();
                        }

                        string jsonnuevo = JsonConvert.SerializeObject(dtJsonNew);

                        String JsonUpdate = JsonConvert.SerializeObject(dtJson);

                        connection.Open();
                        SqlDataReader Resul = Ejecuta.ConsultaConRetorno(connection, "SELECT Max(idBitacora) FROM Configuracion.BitacoraTransacciones");
                        Resul.Read();
                        int resultadoid = Resul.GetInt32(0);
                        Int32 idbitacora = resultadoid + 1;
                        connection.Close();

                        connection.Open();
                        SqlTransaction sqlTran = connection.BeginTransaction();

                        // Enlist a command in the current transaction.
                        SqlCommand command = connection.CreateCommand();
                        command.Transaction = sqlTran;
                        try
                        {
                            command.CommandText = "UPDATE Configuracion.ValoresCamposTransacciones SET camposTransaccion = @jsonUpdate WHERE idTransaccion = @idTransaccion1";

                            command.Parameters.AddWithValue("@jsonUpdate", JsonUpdate);
                            command.Parameters.AddWithValue("@idTransaccion1", idTransaccion1);
                            command.ExecuteNonQuery();

                            //command.CommandText = "Update EtapasTipoTransaccion set estatus = 1 where idEtapa = "+ idEtapa;
                            //command.ExecuteNonQuery();

                            command.CommandText = "INSERT INTO Configuracion.BitacoraTransacciones VALUES(@idbitacora,@idTransaccion,'Insert',@jsonnuevo,@idEtapa,@idEtapa1,null)";
                            command.Parameters.AddWithValue("@idbitacora", idbitacora);
                            command.Parameters.AddWithValue("@idTransaccion", idTransaccion1);
                            command.Parameters.AddWithValue("@jsonnuevo", jsonnuevo);
                            command.Parameters.AddWithValue("@idEtapa", idEtapa);
                            command.Parameters.AddWithValue("@idEtapa1", idEtapa);
                            command.ExecuteNonQuery();
                            sqlTran.Commit();

                            respuesta = true;

                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex);
                            sqlTran.Rollback();
                            respuesta = false;
                        }

                        connection.Close();
                    }
                    else
                    {

                        respuesta = inserta(json, idTransaccion, idEtapa, idAccion);



                    }
                }
                catch (Exception ex)
                {

                    Console.WriteLine("" + ex.Message, ex);
                }
            }
            return respuesta;

        }

        public int AutoIncrement(int idTipoTransaccion, string CAuto)
        {
            SqlConnection connection = null;
            int Resultado = 0;
            int contador2 = 0;
            int contador = 0;
            SqlDataReader consulta;
            DataTable dt = new DataTable();
            DataSet RegistrosBD = new DataSet();
            DataTable DatosGral = new DataTable();
            DataTable DatosCabecero = new DataTable();
            DataTable DatosPrincipales = new DataTable();
            DataTable DatosDet = new DataTable();
            DataTable Registros = new DataTable();


            try
            {
                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {

                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "Select camposTransaccion"
                                                                      + " from Configuracion.ValoresCamposTransacciones VCT inner"
                                                                      + " join Configuracion.MAETransacciones MT"
                                                                      + " on VCT.idTransaccion = MT.idTransaccion"
                                                                      + " where idTipoTransaccion = " + idTipoTransaccion);
                    dt.Load(consulta);
                    connection.Close();
                }

                foreach (DataRow rows in dt.Rows)
                {
                    RegistrosBD = ConvertJsonStringToDataSet(rows["camposTransaccion"].ToString());




                    if (RegistrosBD.Tables.Contains("Cabecera"))
                    {

                        contador2++;

                        DatosPrincipales = RegistrosBD.Tables["Cabecera"];
                        if (contador2 == 1)
                        {
                            DatosGral = RegistrosBD.Tables["informacionTransaccion"];
                            DatosCabecero = DatosPrincipales;
                        }
                        if (contador2 > 1) { DatosCabecero.Merge(DatosPrincipales, false, MissingSchemaAction.Add); }


                    }
                    else
                    {
                        DatosGral = RegistrosBD.Tables["informacionTransaccion"];
                    }

                    if (RegistrosBD.Tables.Contains("Detalle"))
                    {
                        contador++;
                        Registros = RegistrosBD.Tables["Detalle"];

                        if (contador == 1)
                        {
                            DatosGral = RegistrosBD.Tables["informacionTransaccion"];
                            DatosDet = Registros;
                        }
                        if (contador > 1) { DatosDet.Merge(Registros, false, MissingSchemaAction.Add); }
                    }
                    else
                    {
                        DatosGral = RegistrosBD.Tables["informacionTransaccion"];
                    }
                }

                if (DatosCabecero.Columns.Contains(CAuto))
                {

                    Resultado = Convert.ToInt32(DatosCabecero.AsEnumerable()
                                                 .Select(x => Convert.ToInt32(x.Field<string>(CAuto)))
                                                 .DefaultIfEmpty(0)
                                                 .Max(x => x));

                }
                if (DatosDet.Columns.Contains(CAuto))
                {
                    Resultado = Convert.ToInt32(DatosDet.AsEnumerable()
                                                .Select(x => Convert.ToInt32(x.Field<string>(CAuto)))
                                                .DefaultIfEmpty(0)
                                                .Max(x => x));
                }




            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                Console.WriteLine(DatosGral);
                Console.WriteLine(RegistrosBD);
                Console.WriteLine(DatosPrincipales);
                Console.WriteLine(Registros);
                throw;
            }

            return Resultado + 1;
        }


        public DetalleTransaccionBit detalleTBD(string idTransaccion)
        {
            Entidades.DetalleTransaccionBit lista = new Entidades.DetalleTransaccionBit();
            List<Entidades.camposDetalleTB> campos = new List<Entidades.camposDetalleTB>();
            SqlConnection connection = null;
            DataTable Datos = new DataTable();
            try
            {

                using (connection = Conexion.ObtieneConexion("ConexionBD"))
                {
                    SqlDataReader consulta;
                    connection.Open();
                    consulta = Ejecuta.ConsultaConRetorno(connection, "SELECT  MAE.idTransaccion folioTransaccion,  TT.descripcion nombreTransaccion, " +
                        "MAE.fechaIniTransaccion, TT.cveTipoTransaccion Clave, R.nombreRol Rol, TT.idTipoTransaccion,ETT.descripcion EtapaAtual, " +
                        "(SELECT descripcion FROM Configuracion.EtapasTipoTransaccion WHERE idEtapa = (SELECT MAX(idEtapa) " +
                        "FROM Configuracion.EtapasTipoTransaccion WHERE idTipoTransaccion = ETT.idTipoTransaccion)) as EtapaSiguiente FROM Configuracion.MAETransacciones MAE, " +
                        "Configuracion.TiposTransacciones TT, Configuracion.EtapasAccionesRoles EAT, Seguridad.Roles R, Configuracion.EtapasTipoTransaccion ETT " +
                        "WHERE MAE.idTipoTransaccion = TT.idTipoTransaccion AND EAT.idRol = R.idRol AND EAT.idTipoTransaccion = TT.idTipoTransaccion AND ETT.idTipoTransaccion = TT.idTipoTransaccion " +
                        "AND MAE.idTransaccion = " + idTransaccion);
                    Datos.Load(consulta);
                    connection.Close();


                    foreach (DataRow rowD in Datos.Rows)
                    {
                        camposDetalleTB valores = new camposDetalleTB();

                        valores.folioTransaccion = Convert.ToInt64(rowD["folioTransaccion"].ToString());
                        valores.nombreTransaccion = rowD["nombreTransaccion"].ToString();
                        valores.fechaIniTransaccion = rowD["fechaIniTransaccion"].ToString();
                        valores.Clave = rowD["Clave"].ToString();
                        valores.Rol = rowD["Rol"].ToString();
                        valores.EtapaAtual = rowD["EtapaAtual"].ToString();
                        valores.etapaSiguiente = rowD["etapaSiguiente"].ToString();
                        campos.Add(valores);
                    }
                    lista.lisCamposDetalleTB = campos.ToArray();

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("" + ex.Message, ex);
                throw;
            }

            return lista;
        }




    }
}
