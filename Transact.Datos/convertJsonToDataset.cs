using System;
using System.Data;
using Newtonsoft.Json;
using System.Xml;


namespace Transact.Datos
{
    public class ConvertJsonToDataset
    {

        public DataSet ConvertJsonStringToDataSet(string jsonString)
        {
            XmlDocument xd = new XmlDocument();
            DataSet ds = new DataSet();
            Console.WriteLine(xd);
            try
            {              
                jsonString = "{ \"rootNode\": {" + jsonString.Trim().TrimStart('{').TrimEnd('}') + "} }";
                xd = (XmlDocument)JsonConvert.DeserializeXmlNode(jsonString);        
                ds.ReadXml(new XmlNodeReader(xd));
                
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }

            return ds;
        }

        public DataTable DTCabecero(DataTable dtCAbe)
        {
            DataTable dtCabecero = new DataTable();
            DataTable dtCabeMerge = new DataTable();
            Console.WriteLine(dtCabeMerge);
            int contador = 0;

            foreach (DataRow rows in dtCAbe.Rows)
            {
                
                contador++;

                dtCabeMerge = dtCAbe;

                if (contador == 1)
                {
                    dtCabecero = dtCabeMerge;
                }
                if (contador > 1) { dtCabecero.Merge(dtCabeMerge, false, MissingSchemaAction.Add); }

            }

            return dtCabecero;

        }

        public DataTable DTDetalle(DataTable dtDet)
        {
            DataTable dtDetalle = new DataTable();
            DataTable dtDetMerge = new DataTable();
            Console.WriteLine(dtDetMerge);
            int contador = 0;

            foreach (DataRow rows in dtDet.Rows)
            {

                contador++;

                dtDetMerge = dtDet;

                if (contador == 1)
                {
                    dtDetalle = dtDetMerge;
                }
                if (contador > 1) { dtDetalle.Merge(dtDetMerge, false, MissingSchemaAction.Add); }

            }

            return dtDetalle;

        }



    }
}
