using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Client_Admin
{
    public partial class CreateSupplier : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string GetSupplierDetail(string guid) {
            return Mydb.ExecuteReadertoDataTableAsJson("GetSupplierDetail", new SqlParameter[] { new SqlParameter("@guid",guid) }, CommandType.StoredProcedure);
        }



        [WebMethod]
        public static string UpdateSupplier(
       string guid
            ,string INN,
     string KPP,
      // string OKPO ,
      string OKVED,
      string OGRN_OGRNIP,
      string REGIST_ORGAN,
      string REGIST_DATE,
      string FULL_NAME,
      string NAME,
      string INFO_FOUNDERS,
      string BIRTH_DATE,
       string BIRTH_PLACE,
      string TYPE_DOCUMENT,
       string SERIES_DOCUMENT,
       string NUMBERS_DOCUMENT,
      string DATE_ISSUE,
      string CONTACT_PHONE,
       string DIVISION_CODE,
      int CLIENT_ID,
       string CHECKING_ACCOUNT,
       string CORRESP_ACCOUNT,
      string BANK_NAME,
      string BIK,
      string FIO,
       string PAYMENT,
       // string LICENCE ,
       string LEGAL_ADRESS,
      string ADRESS,
      string PHONE_FAKS,
      string EMAIL,
    string VK,
    string OK,
    string FB,
   string TW,
      string SHOP_ID,
      string ICON,
      //  bool VISIBLE ,

      string FEE,

        //   bool ACCEPTING ,

        string PASSWORD
         )
        {
            string result = "";
            try
            {
                Mydb.ExecuteNoNQuery("UpdateSupplier", new SqlParameter[] {
                    new SqlParameter("@guid",guid),
                 new SqlParameter("@INN",INN),
           new SqlParameter("@KPP",KPP),
          // new SqlParameter("@OKPO",OKPO),
           new SqlParameter("@OKVED",OKVED),
           new SqlParameter("@OGRN_OGRNIP",OGRN_OGRNIP),
           new SqlParameter("@REGIST_ORGAN",REGIST_ORGAN),
           new SqlParameter("@REGIST_DATE",REGIST_DATE),
           new SqlParameter("@FULL_NAME",FULL_NAME),
           new SqlParameter("@NAME",NAME),
           new SqlParameter("@INFO_FOUNDERS",INFO_FOUNDERS),
           new SqlParameter("@BIRTH_DATE",BIRTH_DATE),
           new SqlParameter("@BIRTH_PLACE",BIRTH_PLACE),
           new SqlParameter("@TYPE_DOCUMENT",TYPE_DOCUMENT),
           new SqlParameter("@SERIES_DOCUMENT",SERIES_DOCUMENT),
           new SqlParameter("@NUMBERS_DOCUMENT",NUMBERS_DOCUMENT),
           new SqlParameter("@DATE_ISSUE",DATE_ISSUE),
           new SqlParameter("@CONTACT_PHONE",CONTACT_PHONE),
           new SqlParameter("@DIVISION_CODE",DIVISION_CODE),
           new SqlParameter("@CLIENT_ID",CLIENT_ID),
           new SqlParameter("@CHECKING_ACCOUNT",CHECKING_ACCOUNT),
           new SqlParameter("@CORRESP_ACCOUNT",CORRESP_ACCOUNT),
           new SqlParameter("@BANK_NAME",BANK_NAME),
           new SqlParameter("@BIK",BIK),
           new SqlParameter("@FIO",FIO),
           new SqlParameter("@PAYMENT",PAYMENT),
           //new SqlParameter("@LICENCE",LICENCE),
           new SqlParameter("@LEGAL_ADRESS",LEGAL_ADRESS),
           new SqlParameter("@ADRESS",ADRESS),
           new SqlParameter("@PHONE_FAKS",PHONE_FAKS),
           new SqlParameter("@EMAIL",EMAIL),
           new SqlParameter("@VK",VK),
           new SqlParameter("@OK",OK),
           new SqlParameter("@FB",FB),
           new SqlParameter("@TW",TW),
           new SqlParameter("@SHOP_ID",SHOP_ID),
           new SqlParameter("@ICON",ICON),
          // new SqlParameter("@VISIBLE",VISIBLE),
          
           new SqlParameter("@FEE",FEE),

           //new SqlParameter("@ACCEPTING",ACCEPTING),
           
           new SqlParameter("@PASSWORD",PASSWORD)
            }, CommandType.StoredProcedure);
                result = "{\"result\" : \"ok\"}";

            }
            catch (Exception ex)
            {

                result = "{\"result\" : \"" + ex.ToString() + "\"}";
            }
            return result;
        }


        [WebMethod]
        public static string SaveSupplier(
          string INN ,
        string KPP ,
       // string OKPO ,
         string OKVED ,
         string OGRN_OGRNIP ,
         string REGIST_ORGAN ,
         string REGIST_DATE ,
         string FULL_NAME ,
         string NAME ,
         string INFO_FOUNDERS ,
         string BIRTH_DATE ,
          string BIRTH_PLACE ,
         string TYPE_DOCUMENT ,
          string SERIES_DOCUMENT ,
          string NUMBERS_DOCUMENT ,
         string DATE_ISSUE ,
         string CONTACT_PHONE ,
          string DIVISION_CODE ,
         int CLIENT_ID ,
          string CHECKING_ACCOUNT ,
          string CORRESP_ACCOUNT ,
         string BANK_NAME ,
         string BIK ,
         string FIO ,
          string PAYMENT  ,
         // string LICENCE ,
          string LEGAL_ADRESS ,
         string ADRESS ,
         string PHONE_FAKS ,
         string EMAIL ,
       string VK ,
       string OK ,
       string FB ,
      string TW ,
         string SHOP_ID ,
         string ICON ,
        //  bool VISIBLE ,
           
         string FEE ,
           
      //   bool ACCEPTING ,
          
           string PASSWORD 
            )
        {
            string result = "";
            try
            {
                Mydb.ExecuteNoNQuery("SaveSupplier", new SqlParameter[] {
                 new SqlParameter("@INN",INN),
           new SqlParameter("@KPP",KPP),
          // new SqlParameter("@OKPO",OKPO),
           new SqlParameter("@OKVED",OKVED),
           new SqlParameter("@OGRN_OGRNIP",OGRN_OGRNIP),
           new SqlParameter("@REGIST_ORGAN",REGIST_ORGAN),
           new SqlParameter("@REGIST_DATE",REGIST_DATE),
           new SqlParameter("@FULL_NAME",FULL_NAME),
           new SqlParameter("@NAME",NAME),
           new SqlParameter("@INFO_FOUNDERS",INFO_FOUNDERS),
           new SqlParameter("@BIRTH_DATE",BIRTH_DATE),
           new SqlParameter("@BIRTH_PLACE",BIRTH_PLACE),
           new SqlParameter("@TYPE_DOCUMENT",TYPE_DOCUMENT),
           new SqlParameter("@SERIES_DOCUMENT",SERIES_DOCUMENT),
           new SqlParameter("@NUMBERS_DOCUMENT",NUMBERS_DOCUMENT),
           new SqlParameter("@DATE_ISSUE",DATE_ISSUE),
           new SqlParameter("@CONTACT_PHONE",CONTACT_PHONE),
           new SqlParameter("@DIVISION_CODE",DIVISION_CODE),
           new SqlParameter("@CLIENT_ID",CLIENT_ID),
           new SqlParameter("@CHECKING_ACCOUNT",CHECKING_ACCOUNT),
           new SqlParameter("@CORRESP_ACCOUNT",CORRESP_ACCOUNT),
           new SqlParameter("@BANK_NAME",BANK_NAME),
           new SqlParameter("@BIK",BIK),
           new SqlParameter("@FIO",FIO),
           new SqlParameter("@PAYMENT",PAYMENT),
           //new SqlParameter("@LICENCE",LICENCE),
           new SqlParameter("@LEGAL_ADRESS",LEGAL_ADRESS),
           new SqlParameter("@ADRESS",ADRESS),
           new SqlParameter("@PHONE_FAKS",PHONE_FAKS),
           new SqlParameter("@EMAIL",EMAIL),
           new SqlParameter("@VK",VK),
           new SqlParameter("@OK",OK),
           new SqlParameter("@FB",FB),
           new SqlParameter("@TW",TW),
           new SqlParameter("@SHOP_ID",SHOP_ID),
           new SqlParameter("@ICON",ICON),
          // new SqlParameter("@VISIBLE",VISIBLE),
          
           new SqlParameter("@FEE",FEE),

           //new SqlParameter("@ACCEPTING",ACCEPTING),
           
           new SqlParameter("@PASSWORD",PASSWORD)
            }, CommandType.StoredProcedure);
                result = "{\"result\" : \"ok\"}";

            }
            catch (Exception ex)
            {

                result = "{\"result\" : \"" + ex.ToString() + "\"}";            }
            return result;
        }
    }
}