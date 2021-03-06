﻿using Kvorum_App.Client_Admin.Utilities;
using Kvorum_App.DB;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Kvorum_App.Client_Admin
{
    public partial class ProfileSettings : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static string ChkPass(int Log,string Pass)
        {
            string dbPass = Mydb.ExecuteScalar("select PASSWORD from ACCOUNT where LOG_IN_ID=@L", new SqlParameter[] { new SqlParameter("@L", Log) }, CommandType.Text).ToString();
            Pass = GetMd5HashData(Pass);
            if (dbPass==Pass)
            {
              return  "{\"result\" : \"0\"}";
            }
            else
            {
                return "{\"result\" : \"1\"}";
            }
        }
        [WebMethod]
        public static string GetEntityType()
        {
            //List<Entity_Type> ets = new List<Entity_Type>();
            //DataTable dt = Mydb.ExecuteReadertoDataTable("select * from ENTITY_TYPE", new SqlParameter[] { }, CommandType.Text);
            //foreach (DataRow item in dt.Rows)
            //{
            //    Entity_Type et = new Entity_Type();
            //    et.ENTITY_TYPE_ID = Convert.ToInt32(item["ENTITY_TYPE_ID"]);
            //    et.ENTITY_TYPE_NAME = item["ENTITY_TYPE_NAME"].ToString();
            //    ets.Add(et);
            //}
            //JavaScriptSerializer js = new JavaScriptSerializer();
            return Mydb.ExecuteAsJson("GetEntityType", new SqlParameter[] { }, CommandType.StoredProcedure);
        }
        [WebMethod]
        public static string GetDetailClient(int Cl)
        {
            return Mydb.ExecuteAsJson("getDetailClient", new SqlParameter[] { new SqlParameter("@c", Cl) }, CommandType.StoredProcedure);
            //int countRelationalDatas =(int) Mydb.ExecuteScalar("select count(*)from ACCOUNT a,CLIENT c, ENTITY_ADRESS e, ENTITY_TYPE et where et.ENTITY_TYPE_ID = c.ENTITY_TYPE_ID and e.ADRESS_ID = c.ADRESS_ID and c.CLIENT_ID = @c", new SqlParameter[] {new SqlParameter("@c",Cl) }, CommandType.Text);

            //if (countRelationalDatas==0)
            //{
            //    DataTable dt = Mydb.ExecuteReadertoDataTable("select E_MAIL,PASSWORD from ACCOUNT where CLIENT_ID=@cl and LOGIN is null", new SqlParameter[] { new SqlParameter("@cl", Cl) }, CommandType.Text);
            //    List < Account_ > accs = new List<Account_>();
            //    foreach (DataRow item in dt.Rows)
            //    {
            //        Account_ acc = new Account_();

            //        acc.E_MAIL = item["E_MAIL"].ToString();

            //        acc.PASSWORD = item["PASSWORD"].ToString();


            //        accs.Add(acc);
            //    }
            //    JavaScriptSerializer js = new JavaScriptSerializer();
            //    return js.Serialize(accs);
            //}
            //else
            //{
            //    List<Account_> accs = new List<Account_>();
            //    DataTable dt = Mydb.ExecuteReadertoDataTable("getDetailClient", new SqlParameter[] { new SqlParameter("@c", Cl) }, CommandType.StoredProcedure);

            //    foreach (DataRow item in dt.Rows)
            //    {
            //        Account_ acc = new Account_();
            //        acc.ACCOUNT_NAME = item["ACCOUNT_NAME"].ToString();
            //        acc.COMPANY_NAME = item["COMPANY_NAME"].ToString();
            //        acc.ENTITY_TYPE_ID = Convert.ToInt32(item["ENTITY_TYPE_ID"]);
            //        acc.E_MAIL = item["E_MAIL"].ToString();
            //        acc.HOUSE = item["HOUSE"].ToString();
            //        acc.INN = item["INN"].ToString();
            //        acc.KPP = item["KPP"].ToString();
            //        acc.BNAME = item["BNAME"].ToString();
            //        acc.INNB = item["INNB"].ToString();
            //        acc.KPPB = item["KPPB"].ToString();
            //        acc.ADRESS_ID = item["ADRESS_ID"].ToString();
            //        acc.BIK = item["BIK"].ToString();
            //        acc.BKRS = item["BKRS"].ToString();
            //        acc.RS = item["RS"].ToString();
            //        acc.LOG_IN_ID = Convert.ToInt32(item["LOG_IN_ID"]);
            //        acc.OGRN_OGRNIP = item["OGRN_OGRNIP"].ToString();
            //        acc.OKPO = item["OKPO"].ToString();
            //        acc.PASSWORD = item["PASSWORD"].ToString();
            //        acc.PHONE_NUMBER = item["PHONE_NUMBER"].ToString();

            //        accs.Add(acc);
            //    }
            //    JavaScriptSerializer js = new JavaScriptSerializer();
            //    return js.Serialize(accs);
            //}

        }
        public static string GetMd5HashData(string yourString)
        {
            return string.Join("", MD5.Create().ComputeHash(Encoding.ASCII.GetBytes(yourString)).Select(s => s.ToString("x2")));
        }
        public static void UpdateAccuntIdendity(string OldEmail, string NewEmail ,string Password_, string PhoneNumber, string FirstName, string SecondName, string MiddleName, string roles)
        {
            NewEmail = (NewEmail.Length == 0) ? OldEmail : NewEmail;
            ApplicationDbContext dbcontext_ = new ApplicationDbContext();
            var userStore = new UserStore<ApplicationUser>(dbcontext_);
            var manager = new UserManager<ApplicationUser>(userStore);
        
            ApplicationUser user = manager.FindByEmail(OldEmail);
            Password_ = (Password_.Length == 0) ? user.Password_deser : Password_;
            if (Password_.Length!=0)
            {
                var PasswordHasher = manager.PasswordHasher.HashPassword(Password_);
                userStore.SetPasswordHashAsync(user, PasswordHasher);
               // var userP = manager.ChangePassword(user.Id, user.Password_deser, Password_);//.AddPassword(user.Id, Password_);//
            }
              user.Email = NewEmail;
             user.UserName = NewEmail;
               user.NormalizedUserName = NewEmail.ToUpper();
            user.Password_deser = Password_;
            user.PhoneNumber = PhoneNumber;
            user.LockoutEnabled = true;
            user.EmailConfirmed = true;
            user.PhoneNumberConfirmed = true;
            user.TwoFactorEnabled = false;
            user.FirstName = FirstName;
            user.SecondName = SecondName;
            user.MiddleName = MiddleName;
            user.TypeOrgName = roles;
            user.NormalizedEmail = NewEmail.ToUpper();
            IdentityResult Mresult = manager.Update(user);
            if (Mresult.Succeeded == true)
            {
                var userClaims = manager.GetClaims(user.Id);
                foreach (var item in userClaims)
                {
                    manager.RemoveClaim(user.Id, item);
                }
                var resultClaim_name = manager.AddClaimAsync(user.Id, new Claim("name", FirstName)).Result;
                var resultClaim_email_given_name = manager.AddClaimAsync(user.Id, new Claim("given_name", SecondName)).Result;
                var resultClaim_family_name = manager.AddClaimAsync(user.Id, new Claim("family_name", MiddleName)).Result;
                var resultClaim_website = manager.AddClaimAsync(user.Id, new Claim("website", "http://lk.upravbot.ru:55555/CoreApi/api/v2/")).Result;
                var resultClaim_role = manager.AddClaimAsync(user.Id, new Claim("role", roles)).Result;
            }

        }
        [WebMethod]
        public static string Save_Changes(string PASSWORD,string FirstName, string SecondName,string MiddleName, string PHONE_NUMBER,string E_MAIL, string emailNew, string COMPANY_NAME,string INN,string KPP,string OGRN_OGRNIP,int ENTITY_TYPE_ID,string OKPO,string HOUSE, string BNAME,string INNB,string KPPB,string BIK,string BKRS,string RS,int CL,string Login_Id)
        {
           // string Id_idendity = Mydb.ExecuteScalar("GetId_idendity", new SqlParameter[] { new SqlParameter("@lg", Login_Id) }, CommandType.StoredProcedure).ToString();
            
              
               
                PHONE_NUMBER = PHONE_NUMBER.Replace("(", "").Replace(")", "").Replace("-", "").Replace("-", "").Replace(" ", "");
                UpdateAccuntIdendity(E_MAIL, emailNew, PASSWORD, PHONE_NUMBER, FirstName, SecondName, MiddleName, "УК");
            E_MAIL = (emailNew.Length == 0) ? E_MAIL : emailNew;
            Mydb.ExecuteNoNQuery("UpdateAcc", new SqlParameter[]  {new SqlParameter("@e",E_MAIL),
            new SqlParameter("@p",PHONE_NUMBER),
         
          new SqlParameter("@FirstName",FirstName),
          new SqlParameter("@SecondName",SecondName),
          new SqlParameter("@MiddleName",MiddleName),
            new SqlParameter("@L",Login_Id),
            new SqlParameter("@pas",PASSWORD)}, CommandType.StoredProcedure);

            Mydb.ExecuteNoNQuery("UpdateClient", new SqlParameter[] {
                new SqlParameter("@cn",COMPANY_NAME),
                new SqlParameter("@enId",ENTITY_TYPE_ID),
                new SqlParameter("@inn",INN),
                new SqlParameter("@ogrn",OGRN_OGRNIP),
                new SqlParameter("@okpo",OKPO),
                new SqlParameter("@kpp",KPP),
                new SqlParameter("@bname",BNAME),
                new SqlParameter("@innb",INNB),
                new SqlParameter("@kppb",KPPB),
                new SqlParameter("@bik",BIK),
                new SqlParameter("@bkrs",BKRS),
                new SqlParameter("@rs",RS),
                new SqlParameter("@cl",CL),
                new SqlParameter("@adr",HOUSE)
            }, CommandType.StoredProcedure);

            



            return "{\"result\" : \"1\"}";


        }
    }
}