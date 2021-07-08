using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Security;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Kvorum_App.Client_Admin.Utilities;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;
using Kvorum_App.DB;
using System.Security.Claims;
using Newtonsoft.Json;

namespace Kvorum_App.Client_Admin
{
    public partial class CreateAccount : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
       

        [WebMethod]
        public static string CheckMail(string email)
        {
            ApplicationDbContext dbcontext_ = new ApplicationDbContext();
            var userStore = new UserStore<ApplicationUser>(dbcontext_);
            var _userManager = new UserManager<ApplicationUser>(userStore);
            bool IsEmailAlreadyRegistered = _userManager.Users.Any(item => item.Email == email);
            string a = "1";
            if (IsEmailAlreadyRegistered == true)
            {
                a = "Данный e-mail уже зарегистрирован в системе.";

            }
            return "{\"result\" : \"" + a + "\"}";
        }
        public static string GetMd5HashData(string yourString)
        {
            return string.Join("", MD5.Create().ComputeHash(Encoding.ASCII.GetBytes(yourString)).Select(s => s.ToString("x2")));
        }
        [WebMethod]
        public static string SaveAcc(List<MR>SMSR,string PNumb_,string Email_,string Pass_,string ClId_,string Login_,string FirstName,string SecondName,string MiddleName)
        {
            string NonEncryptedPass = Pass_;
            string roles = "";
            int i = 0;
            foreach (MR mr in SMSR)
            {
                int M_Id = Convert.ToInt32(mr.sm);
                int R_Id = Convert.ToInt32(mr.sr);
               string role= GiveRole(R_Id);
                roles = (i == 0) ? role : roles + ";" + role;
                i++;
            }
            PNumb_ = PNumb_.Replace("(", "").Replace(")", "").Replace("-", "").Replace("-", "").Replace(" ", "");
            
              dynamic ResultJson  = CreateAccoountIdendity(Email_, NonEncryptedPass, PNumb_.Trim(), FirstName, SecondName, MiddleName, roles);
            ResultJson = JsonConvert.DeserializeObject(ResultJson);
            string error = ResultJson.error;
            if (error.Length==0)
            {
                error = "1";
                string Id_idendity= ResultJson.result;
                Pass_ = GetMd5HashData(Pass_);
                int LogId = Convert.ToInt32(Mydb.ExecuteScalar("InsertAccount", new SqlParameter[]
                {
               // new SqlParameter("@accName",accName_),
                new SqlParameter("@PNumb",PNumb_),
                new SqlParameter("@Email",Email_),
                new SqlParameter("@Pass",Pass_),
                new SqlParameter("@ClId",ClId_),
                new SqlParameter("@Login",Login_),
                new SqlParameter("@Id_idendity",Id_idendity),
                new SqlParameter("@FirstName",FirstName),
                new SqlParameter("@SecondName",SecondName),
                new SqlParameter("@MiddleName",MiddleName)

                }, CommandType.StoredProcedure));

                foreach (MR mr in SMSR)
                {
                    int M_Id = Convert.ToInt32(mr.sm);
                    int R_Id = Convert.ToInt32(mr.sr);

                    Mydb.ExecuteNoNQuery("InsertModulesAndRoles", new SqlParameter[] { new SqlParameter("@Mid", M_Id), new SqlParameter("@Rid", R_Id), new SqlParameter("@l", LogId) }, CommandType.StoredProcedure);


                    SendMail(Email_, NonEncryptedPass, Email_);
                } 
            }
            
            return "{\"result\" : \""+error+"\"}";
        }
        public static string CreateAccoountIdendity(string Email, string Password_, string PhoneNumber, string FirstName, string SecondName, string MiddleName, string roles)
        {
            ApplicationDbContext dbcontext_ = new ApplicationDbContext();
            var userStore = new UserStore<ApplicationUser>(dbcontext_);
            var manager = new UserManager<ApplicationUser>(userStore);
            ApplicationUser user = new ApplicationUser
            {
                Email = Email,
                UserName = Email,
                NormalizedUserName = Email.ToUpper(),
                Password_deser = Password_,
                PhoneNumber = PhoneNumber,
                LockoutEnabled = true,
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                TwoFactorEnabled = false,
                FirstName = FirstName,
                SecondName = SecondName,
                MiddleName = MiddleName,
                TypeOrgName = roles,
                NormalizedEmail = Email.ToUpper(),
                ConcurrencyStamp = Guid.NewGuid().ToString()
            };
           
            IdentityResult result = manager.Create(user, Password_);
            string result_ = "";
            string error = "";
            if (result.Succeeded)
            {
                var resultClaim_name = manager.AddClaimAsync(user.Id, new Claim("name", FirstName)).Result;
                var resultClaim_email_given_name = manager.AddClaimAsync(user.Id, new Claim("given_name", SecondName)).Result;
                var resultClaim_family_name = manager.AddClaimAsync(user.Id, new Claim("family_name", MiddleName)).Result;
                var resultClaim_website = manager.AddClaimAsync(user.Id, new Claim("website", "http://lk.upravbot.ru:55555/CoreApi/api/v2/")).Result;
                var resultClaim_role = manager.AddClaimAsync(user.Id, new Claim("role", roles)).Result;
                result_ = user.Id;
            }
            else
            {
                error= result.Errors.FirstOrDefault();
            }


            return "{\"result\" : \""+result_+"\",\"error\":\""+error+"\"}" ;
        }

        [WebMethod]
        public static string UpdateAcc(List<MR> SMSR, string PNumb_, string Email_, string Pass_, string ClId_, string Login_, int LgId, string FirstName, string SecondName, string MiddleName)
        {
            //string Id_idendity = Mydb.ExecuteScalar("GetId_idendity", new SqlParameter[] { new SqlParameter("@lg", LgId) }, CommandType.StoredProcedure).ToString();
           
                string roles = "";
                int i = 0;
                foreach (MR mr in SMSR)
                {
                    int M_Id = Convert.ToInt32(mr.sm);
                    int R_Id = Convert.ToInt32(mr.sr);
                    string role = GiveRole(R_Id);
                    roles = (i == 0) ? role : roles + ";" + role;
                    i++;
                }
                PNumb_ = PNumb_.Replace("(", "").Replace(")", "").Replace("-", "").Replace("-", "").Replace(" ", "");
                UpdateAccuntIdendity(Email_, Pass_, PNumb_, FirstName, SecondName, MiddleName, roles);
           
            Mydb.ExecuteNoNQuery("DeleteAccRoles", new SqlParameter[] { new SqlParameter("@lg", LgId) }, CommandType.StoredProcedure);
            foreach (MR mr in SMSR)
            {
                int M_Id = Convert.ToInt32(mr.sm);
                int R_Id = Convert.ToInt32(mr.sr);

                Mydb.ExecuteNoNQuery("InsertModulesAndRoles", new SqlParameter[] {
                    new SqlParameter("@Mid", M_Id),
                new SqlParameter("@Rid",R_Id),
                new SqlParameter("@l",LgId)}, CommandType.StoredProcedure);

            }

            Pass_ = GetMd5HashData(Pass_);
            Mydb.ExecuteNoNQuery("UpdateAcc", new SqlParameter[]  {new SqlParameter("@e",Email_),
            new SqlParameter("@p",PNumb_),
          //  new SqlParameter("@acc",accName_),
          new SqlParameter("@FirstName",FirstName),
          new SqlParameter("@SecondName",SecondName),
          new SqlParameter("@MiddleName",MiddleName),
            new SqlParameter("@L",LgId),
            new SqlParameter("@pas",Pass_)}, CommandType.StoredProcedure);
            return "{\"result\" : \"1\"}";
        }

        public static void UpdateAccuntIdendity(string Email,string Password_, string PhoneNumber,string FirstName, string SecondName,string MiddleName,string roles)
        {
            ApplicationDbContext dbcontext_ = new ApplicationDbContext();
            var userStore = new UserStore<ApplicationUser>(dbcontext_);
            var manager = new UserManager<ApplicationUser>(userStore);
           
            ApplicationUser user = manager.FindByEmail(Email);
            Password_ = (Password_.Length == 0) ? user.Password_deser : Password_;
            if (Password_.Length != 0)
            {
                var PasswordHasher = manager.PasswordHasher.HashPassword(Password_);
                userStore.SetPasswordHashAsync(user, PasswordHasher);
                // var userP = manager.ChangePassword(user.Id, user.Password_deser, Password_);//.AddPassword(user.Id, Password_);//
            }

            //  user.Email = Email;
            // user.UserName = Email;
            //   user.NormalizedUserName = Email.ToUpper();
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
            user.NormalizedEmail = Email.ToUpper();
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
        public static string DeleteAccount(int LogId,string Email)
        {
           // string Id_idendity = Mydb.ExecuteScalar("GetId_idendity", new SqlParameter[] {new SqlParameter("@lg",LogId) }, CommandType.StoredProcedure).ToString();
            
                DeleteAccuntIdendity(Email);
           
            Mydb.ExecuteNoNQuery("DeleteAccount", new SqlParameter[] { new SqlParameter("@lg", LogId) }, CommandType.StoredProcedure);

            return "{\"result\" : \"1\"}";
        }
        public static void DeleteAccuntIdendity(string Email)
        {
            ApplicationDbContext dbcontext_ = new ApplicationDbContext();
            var userStore = new UserStore<ApplicationUser>(dbcontext_);
            var manager = new UserManager<ApplicationUser>(userStore);
            ApplicationUser user = manager.FindByEmail(Email);
            IdentityResult result = manager.Delete(user);
        }


        [WebMethod]
        public static string CHeckIdendityEmail(string Email)
        {
           // PNumb_ = PNumb_.Replace("(", "").Replace(")", "").Replace("-", "").Replace("-", "").Replace(" ", "");

            ApplicationDbContext dbcontext_ = new ApplicationDbContext();
            var userStore = new UserStore<ApplicationUser>(dbcontext_);
            var _userManager = new UserManager<ApplicationUser>(userStore);
            bool IsEmailAlreadyRegistered = _userManager.Users.Any(item => item.Email == Email);
            string a = "1";
            if (IsEmailAlreadyRegistered == true)
            {
                a = "Данный e-mail уже зарегистрирован в системе.";

            }
            return "{\"result\" : \"" + a + "\"}";
        }

  
        private static string GiveRole(int R_Id)
        {
          return  (R_Id == 1) ? "Управляющий" : (R_Id == 2) ? "Инженер" : (R_Id == 3) ? "Диспетчер" : (R_Id == 4) ? "Администратор" : (R_Id == 5) ? "Бизнес-администратор" : (R_Id == 6) ? "Техник" : (R_Id == 7) ? "Житель" : (R_Id == 8) ? "Паспортист" : (R_Id == 9) ? "Менеджер по работе с клиентами" : (R_Id == 10) ? "Начальник расчетного отдела" : (R_Id == 11) ? "Специалист расчетного отдела" : (R_Id == 12) ? "Начальник юридического отдела" : (R_Id == 13) ? "Юрист" : (R_Id == 14) ? "Администратор управляющей организации" : (R_Id == 15) ? "Диспетчер поставщика" : (R_Id == 16) ? "Ответственный" : "Супер Диспетчер";
        }

      

        public static string SendMail(string Login_Mail, string pass_, string Email_)
        {
            string succEm = "0";
            //string protocol = Mydb.ExecuteScalar("select DOMAIN_NAME from OBJECT_DOMAIN where OBJECT_ID=@o", new SqlParameter[] { new SqlParameter("@o", ObjecId) }, CommandType.Text).ToString();
            //protocol = protocol = protocol.Substring(0, protocol.IndexOf('.'));
            //protocol = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/" + protocol + "/LoginT.aspx";
            //string score = datas[0];
            string pass = pass_;



           
            string text_ = "Для Вас создана учётная запись";
          
            string body = @"<div style=""display: block; width: 100 %; height: 100 %; background - color: #f3f3f3; margin: 0px; padding: 0px; padding: 10px; font-family: sans-serif;""><div style=""display: block; max-width: 700px; margin-left: auto; margin-right: auto; background-color: #ffffff; padding: 20px;""><p>{0} в&nbsp;системе «УПРАВБОТ».</p><p>Ваш логин: <b>""{1}""</b></p><p>Ваш пароль:<b>""{2}""</b></p><p>Перейти в УправБот Вы можете по ссылке <a href=""https://upravbot.ru"">https://upravbot.ru</a></p<br><p>При возникновении вопросов по работе портала «УПРАВБОТ», пожалуйста, обратитесь в&nbsp;техподдержку: <a href=""mailto:helpdesk@upravbot.ru"">help-desk@upravbot.ru </a></p><br><p>C уважением, Ваш «УПРАВБОТ».</p></div></div>";
           //string mobile = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + "/getmobile.aspx";
            body = String.Format(body, text_, Login_Mail, pass );
            try
            {
                Mydb.ExecuteNoNQuery("sp_Send_Mail_Upravbot", new SqlParameter[] { new SqlParameter("@mailto", Email_), new SqlParameter("@theme", "Upravbot.ru"), new SqlParameter("@body", body) }, CommandType.StoredProcedure);
                succEm = "1";
            }
            catch (Exception)
            {

                succEm = "0";
            }
            return succEm;
        }
       

        [WebMethod]
        public static string GetRole(int M_Id )
        {
            //List<Kvorum_App.Client_Admin.Utilities.Roles> rs = new List<Kvorum_App.Client_Admin.Utilities.Roles>();
            //DataTable dt = Mydb.ExecuteReadertoDataTable("select * from ROLE", new SqlParameter[] {}, CommandType.Text);
            //foreach (DataRow item in dt.Rows)
            //{
            //    Kvorum_App.Client_Admin.Utilities.Roles role = new Kvorum_App.Client_Admin.Utilities.Roles();
            //    role.ROLE_NAME = item["ROLE_NAME"].ToString();
            //    role.ROLE_ID = Convert.ToInt32(item["ROLE_ID"]);
            //    rs.Add(role);
            //}
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //return js.Serialize(rs);

            List<Kvorum_App.Client_Admin.Utilities.Roles> rs = new List<Kvorum_App.Client_Admin.Utilities.Roles>();
            DataTable dt = Mydb.ExecuteReadertoDataTable("select r.ROLE_ID,r.ROLE_NAME from RolesForModul rm, ROLE r where r.ROLE_ID=rm.R_ID and M_ID=@m", new SqlParameter[] { new SqlParameter("@m", M_Id) }, CommandType.Text);
            foreach (DataRow item in dt.Rows)
            {
                Utilities.Roles r = new Utilities.Roles();
                r.ROLE_ID = Convert.ToInt32(item["ROLE_ID"]);
                r.ROLE_NAME = item["ROLE_NAME"].ToString();

                rs.Add(r);

            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(rs);
        }
        [WebMethod]
        public static string getModul()
        {
            List<Kvorum_App.Client_Admin.Utilities.MODUL> ms = new List<Kvorum_App.Client_Admin.Utilities.MODUL>();
            DataTable dt = Mydb.ExecuteReadertoDataTable("SELECT * FROM MODUL", new SqlParameter[] {  }, CommandType.Text);
            foreach (DataRow item in dt.Rows)
            {
                Kvorum_App.Client_Admin.Utilities.MODUL modul = new Kvorum_App.Client_Admin.Utilities.MODUL();
                modul.MODUL_ID = Convert.ToInt32(item["MODUL_ID"]);
                modul.MODUL_NAME = item["MODUL_NAME"].ToString();
                ms.Add(modul);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(ms);
        }
        [WebMethod]
        public static string getLogin()
        {
            string nextLoginId = Mydb.ExecuteScalar("SELECT isnull(IDENT_CURRENT('ACCOUNT') + IDENT_INCR('ACCOUNT'),1)", new SqlParameter[] { }, CommandType.Text).ToString();
            nextLoginId = "Login_" + nextLoginId;

            return "{\"result\" : \""+nextLoginId+"\"}";
        }
        [WebMethod]
        public static string GetModel_Role(int LogId)
        {
            DataTable dt_Acc_Role = Mydb.ExecuteReadertoDataTable("select * from ACCOUNT_ROLE where LOG_IN_ID=@lg", new SqlParameter[] { new SqlParameter("@lg", LogId) }, CommandType.Text);
            List<MR> mrs = new List<MR>();
            foreach (DataRow item in dt_Acc_Role.Rows)
            {
                DataTable dt_M_R = Mydb.ExecuteReadertoDataTable("select * from MODUL_ROLE where MR_ID=@mr", new SqlParameter[] { new SqlParameter("@mr", Convert.ToInt32(item["MR_ID"])) }, CommandType.Text);
                foreach (DataRow item2 in dt_M_R.Rows)
                {
                    MR mr = new MR();
                    mr.sm = item2["MODUL_ID"].ToString();
                    mr.sr = item2["ROLE_ID"].ToString();
                    mrs.Add(mr);
                }
            }
            JavaScriptSerializer js_mrs = new JavaScriptSerializer();

            return js_mrs.Serialize(mrs);
        }
    }
}