using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.ServiceModel.Web;
using System.Text;
using System.Web.Configuration;
using System.Web.Script.Serialization;
using System.ServiceModel.Activation;
using System.Runtime.Serialization.Json;
//using Newtonsoft.Json;
using System.Dynamic;
using System.Collections;
using System.Collections.ObjectModel;
using System.Security.Permissions;
using System.IO;
using HttpUtils;

namespace Server
{
    
    public static class DataTableExtensions
    {
        
        public static List<dynamic> ToDynamic(this DataTable dt)
        {
            var dynamicDt = new List<dynamic>();
            foreach (DataRow row in dt.Rows)
            {
                dynamic dyn = new ExpandoObject();
                dynamicDt.Add(dyn);
                foreach (DataColumn column in dt.Columns)
                {
                    var dic = (IDictionary<string, object>)dyn;
                    dic[column.ColumnName] = row[column];
                }
            }
            return dynamicDt;
        }
        public static List<Dictionary<string, object>> ToDictionary(this DataTable dt)
        {
            var columns = dt.Columns.Cast<DataColumn>();
            var Temp = dt.AsEnumerable().Select(dataRow => columns.Select(column =>
                                 new { Column = column.ColumnName, Value = dataRow[column] })
                             .ToDictionary(data => data.Column, data => data.Value)).ToList();
            return Temp.ToList();
        }

    }
     
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(AddressFilterMode = AddressFilterMode.Any)]
    [SecurityPermission(SecurityAction.LinkDemand, Flags = SecurityPermissionFlag.SerializationFormatter)]

    public class QUICK_API : IService
    {

       public SingleTypeIOS Auth(string log, string pass)
        {

            SingleTypeIOS ret = new SingleTypeIOS
            {
                Result = "",
                ErrNo = "",
                ErrMsg = "",
                TokenId = "",
                Name = "",
                Phone = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_auth");
                            cmd.Parameters.AddWithValue("@log", log);
                            cmd.Parameters.AddWithValue("@pwd", pass);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "auth";
                                sda.Fill(dt);
                                ret.Result = dt.Rows[0]["RESULT"].ToString();
                                ret.ErrNo = dt.Rows[0]["ERRNO"].ToString();
                                ret.ErrMsg = dt.Rows[0]["ERRMSG"].ToString();
                                ret.TokenId = dt.Rows[0]["TOKENID"].ToString();
                                ret.Name = dt.Rows[0]["NAME"].ToString();
                                ret.Phone = dt.Rows[0]["PHONE"].ToString();
                                var json = new JavaScriptSerializer().Serialize(ret);
                                return ret;
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                ret.TokenId = "GLOBAL ERROR";
                ret.Name = "SERVER IS DOWN";
                ret.Phone = "?";
                var json = new JavaScriptSerializer().Serialize(ret);
                return ret;
            }
        }
        //------------------------------------------------------------------------
        public SingleType Auth2(string log, string pass, string device_id)
        {
            SingleType ret = new SingleType
            {
                Result = "",
                ErrNo = "",
                ErrMsg = "",
                TokenId = "",
                Name = "",
                Phone = "",
                Photo = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_auth");
                            cmd.Parameters.AddWithValue("@log", System.Text.RegularExpressions.Regex.Unescape(log));
                            cmd.Parameters.AddWithValue("@pwd", System.Text.RegularExpressions.Regex.Unescape(pass));
                            cmd.Parameters.AddWithValue("@DEVICE_ID", device_id);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "auth";
                                sda.Fill(dt);
                                ret.Result = dt.Rows[0]["RESULT"].ToString();
                                ret.ErrNo = dt.Rows[0]["ERRNO"].ToString();
                                ret.ErrMsg = dt.Rows[0]["ERRMSG"].ToString();
                                ret.TokenId = dt.Rows[0]["TOKENID"].ToString();
                                ret.Name = dt.Rows[0]["NAME"].ToString();
                                ret.Phone = dt.Rows[0]["PHONE"].ToString();
                                ret.Photo = dt.Rows[0]["PHOTO"].ToString();
                                var json = new JavaScriptSerializer().Serialize(ret);
                                return ret;
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                ret.TokenId = "GLOBAL ERROR";
                ret.Name = "SERVER IS DOWN";
                ret.Phone = "?";
                var json = new JavaScriptSerializer().Serialize(ret);
                return ret;
            }
        }
        //----------------------------------------------------------------------
        public Profile3 Auth3(string login, string pass, string device_id)
        {
            Profile3 ret = new Profile3
            {
                Result = "",
                ErrNo = "",
                ErrMsg = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_auth_ios");
                            cmd.Parameters.AddWithValue("@log", login);
                            cmd.Parameters.AddWithValue("@pwd", pass);
                            cmd.Parameters.AddWithValue("@DEVICE_ID", device_id);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "profile";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "500.1";
                                    ret.ErrMsg = "Нет данных для отображения";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    ret.ID = dr["id"].ToString();
                                    ret.login = dr["LOGIN"].ToString();
                                    ret.Object_name = dr["ADDRESS"].ToString();
                                    ret.tokenId = dr["TOKEN_ID"].ToString();
                                    ret.phone = dr["PHONE"].ToString();
                                    ret.photo = dr["PHOTO"].ToString();
                                    ret.name = dr["FIO"].ToString();
                                    ret.EMAIL = dr["EMAIL"].ToString();
                                    ret.Flatno = dr["ROOM"].ToString();
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }
        }

        public PaymentBill Get_payments2(string tokenID)
        {
            PaymentBill ret = new PaymentBill();
            
            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_payments2");
                            cmd.Parameters.AddWithValue("@tokenid", tokenID);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "payments";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "500.1";
                                    ret.ErrMsg = "Нет данных для отображения";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    ret.LS = dr["LS"].ToString();
                                    ret.MONTH = dr["MONTH"].ToString();
                                    ret.ONBEGIN = dr["ONBEGIN"].ToString();
                                    ret.ONEND = dr["ONEND"].ToString();
                                    ret.SUMM = dr["SUMM"].ToString();                                    
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;                
                return ret;
            }
        }

        public PaymentBill Get_payments(string tokenID)
        {
            PaymentBill ret = new PaymentBill();

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_payments2");
                            cmd.Parameters.AddWithValue("@tokenid", tokenID);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "payments";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "500.1";
                                    ret.ErrMsg = "Нет данных для отображения";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    ret.LS = dr["LS"].ToString();
                                    ret.MONTH = dr["MONTH"].ToString();
                                    ret.ONBEGIN = dr["ONBEGIN"].ToString();
                                    ret.ONEND = dr["ONEND"].ToString();
                                    ret.SUMM = dr["SUMM"].ToString();
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }
        }


        //----------------------------------------------------------------------
        public SingleType2 Get_object(string tokenID)
        {
            SingleType2 ret = new SingleType2
            {
                Result = "",
                ErrNo = "",
                ErrMsg = "",
                Object_name = "",
                Flatno = ""
            };

            //OutgoingWebResponseContext context = WebOperationContext.Current.OutgoingResponse;
            //context.ContentType = "text/plain";

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_object");
                            cmd.Parameters.AddWithValue("@tokenid", tokenID);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "object";
                                sda.Fill(dt);
                                ret.Result = dt.Rows[0]["RESULT"].ToString();
                                ret.ErrNo = dt.Rows[0]["ERRNO"].ToString();
                                ret.ErrMsg = dt.Rows[0]["ERRMSG"].ToString();
                                ret.Object_name = dt.Rows[0]["OBJ_NAME"].ToString();
                                ret.Flatno = dt.Rows[0]["FLATNO"].ToString();
                                var json = new JavaScriptSerializer().Serialize(ret);
                                return ret;
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                ret.Object_name = "GLOBAL ERROR";
                ret.Flatno = "SERVER IS DOWN";
                var json = new JavaScriptSerializer().Serialize(ret);
                return ret;
            }
        }

        public SingleType2 Get_object2(string tokenID)
        {
            SingleType2 ret = new SingleType2
            {
                Result = "",
                ErrNo = "",
                ErrMsg = "",
                Object_name = "",
                Flatno = ""
            };

            //OutgoingWebResponseContext context = WebOperationContext.Current.OutgoingResponse;
            //context.ContentType = "text/plain";

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_object");
                            cmd.Parameters.AddWithValue("@tokenid", tokenID);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "object";
                                sda.Fill(dt);
                                ret.Result = dt.Rows[0]["RESULT"].ToString();
                                ret.ErrNo = dt.Rows[0]["ERRNO"].ToString();
                                ret.ErrMsg = dt.Rows[0]["ERRMSG"].ToString();
                                ret.Object_name = dt.Rows[0]["OBJ_NAME"].ToString();
                                ret.Flatno = dt.Rows[0]["FLATNO"].ToString();
                                var json = new JavaScriptSerializer().Serialize(ret);
                                return ret;
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                ret.Object_name = "GLOBAL ERROR";
                ret.Flatno = "SERVER IS DOWN";
                var json = new JavaScriptSerializer().Serialize(ret);
                return ret;
            }
        }


        public Profile2 Enter_account2(string id)
        {
            Profile2 ret = new Profile2
            {
                Result = "",
                ErrNo = "",
                ErrMsg = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_profile");
                            cmd.Parameters.AddWithValue("@id", id);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "profile";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "500.1";
                                    ret.ErrMsg = "Нет данных для отображения";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    ret.ID = dr["id"].ToString();
                                    ret.LOGIN = dr["LOGIN"].ToString();
                                    ret.ADDRESS = dr["ADDRESS"].ToString();
                                    ret.TOKENID = dr["TOKEN_ID"].ToString();
                                    ret.PHONE_NUMBER = dr["PHONE"].ToString();
                                    ret.PHOTO = dr["PHOTO"].ToString();
                                    ret.FIO = dr["FIO"].ToString();
                                    ret.EMAIL = dr["EMAIL"].ToString();
                                    ret.ROOM = dr["ROOM"].ToString();
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }
        }


        public Simple Update_profile2(string tokenID, string phone, string fio)
        {
            Simple ret = new Simple
            {
                Result = "",
                ErrNo = "",
                ErrMsg = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    string json2;
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_update_profile");
                            cmd.Parameters.AddWithValue("@tokenID", tokenID);
                            cmd.Parameters.AddWithValue("@phone", System.Web.HttpUtility.UrlDecode(phone));
                            cmd.Parameters.AddWithValue("@fio", System.Web.HttpUtility.UrlDecode(fio));
                            

                            sda.InsertCommand = cmd;
                            if (cmd.ExecuteNonQuery() > 0)
                            {
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "Данные профиля сохранены!";
                            }
                            else
                            {
                                ret.Result = "Fail";
                                ret.ErrNo = "300.2";
                                ret.ErrMsg = "Не удалось сохранить данные профиля.";
                            }
                        }
                    }
                    con.Close();
                    json2 = new JavaScriptSerializer().Serialize(ret);
                    return ret;
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                var json = new JavaScriptSerializer().Serialize(ret);
                return ret;
            }

        }
        public Simple Update_profile(string tokenID, string phone, string fio)
        {
            Simple ret = new Simple
            {
                Result = "",
                ErrNo = "",
                ErrMsg = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    string json2;
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_update_profile");
                            cmd.Parameters.AddWithValue("@tokenID", tokenID);
                            cmd.Parameters.AddWithValue("@phone", System.Web.HttpUtility.UrlDecode(phone));
                            cmd.Parameters.AddWithValue("@fio", System.Web.HttpUtility.UrlDecode(fio));


                            sda.InsertCommand = cmd;
                            cmd.ExecuteNonQuery();
                            ret.Result = "Success";
                            ret.ErrNo = "0";
                            ret.ErrMsg = "Данные профиля сохранены!";
                            /*
                            if (cmd.ExecuteNonQuery() >= 0)
                            {
                                
                            }
                            else
                            {
                                ret.Result = "Fail";
                                ret.ErrNo = "300.2";
                                ret.ErrMsg = "Не удалось сохранить данные профиля.";
                            }
                            */
                        }
                    }
                    con.Close();
                    json2 = new JavaScriptSerializer().Serialize(ret);
                    return ret;
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                var json = new JavaScriptSerializer().Serialize(ret);
                return ret;
            }

        }

        public Simple Delete_account2(string id)
        {
            Simple ret = new Simple
            {
                Result = "",
                ErrNo = "",
                ErrMsg = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    string json2;
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_del_account_by_id");
                            cmd.Parameters.AddWithValue("@id", id);
                            
                            sda.DeleteCommand = cmd;
                            if (cmd.ExecuteNonQuery() > 0)
                            {
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "Лицевой счет удален!";
                            }
                            else
                            {
                                ret.Result = "Fail";
                                ret.ErrNo = "300.2";
                                ret.ErrMsg = "Не удалось удалить лицевой счет.";
                            }
                        }
                    }
                    con.Close();
                    json2 = new JavaScriptSerializer().Serialize(ret);
                    return ret;
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                var json = new JavaScriptSerializer().Serialize(ret);
                return ret;
            }

        }

        public Simple Delete_account(string ID)
        {
            Simple ret = new Simple
            {
                Result = "",
                ErrNo = "",
                ErrMsg = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    string json2;
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_del_account_by_id");
                            cmd.Parameters.AddWithValue("@id", ID);

                            sda.DeleteCommand = cmd;
                            if (cmd.ExecuteNonQuery() > 0)
                            {
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "Лицевой счет удален!";
                            }
                            else
                            {
                                ret.Result = "Fail";
                                ret.ErrNo = "300.2";
                                ret.ErrMsg = "Не удалось удалить лицевой счет.";
                            }
                        }
                    }
                    con.Close();
                    json2 = new JavaScriptSerializer().Serialize(ret);
                    return ret;
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                var json = new JavaScriptSerializer().Serialize(ret);
                return ret;
            }

        }

        public Accounts Get_accounts2(string device_id)
        {
            Accounts ret = new Accounts
            {
                Result = "",
                ErrNo = "",
                ErrMsg = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_accounts_by_device");
                            cmd.Parameters.AddWithValue("@device_id", device_id);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "accounts_list";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "500.1";
                                    ret.ErrMsg = "Нет лицевых счетов для отображения";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    var row = new Account();
                                    row.ID = dr["id"].ToString();
                                    row.LOGIN = dr["LOGIN"].ToString();
                                    row.TOKEN_ID = dr["TOKEN_ID"].ToString();
                                    row.DEVICE_ID = dr["DEVICE_ID"].ToString();
                                    row.CITY = System.Text.RegularExpressions.Regex.Unescape(dr["CITY"].ToString());
                                    row.ADDRESS = System.Text.RegularExpressions.Regex.Unescape(dr["ADDRESS"].ToString());
                                    ret.AddData(row);
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }

        }
        public Accounts Get_accounts(string device_id)
        {
            Accounts ret = new Accounts
            {
                Result = "",
                ErrNo = "",
                ErrMsg = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_accounts_by_device");
                            cmd.Parameters.AddWithValue("@device_id", device_id);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "accounts_list";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "500.1";
                                    ret.ErrMsg = "Нет лицевых счетов для отображения";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    var row = new Account();
                                    row.ID = dr["id"].ToString();
                                    row.LOGIN = dr["LOGIN"].ToString();
                                    row.TOKEN_ID = dr["TOKEN_ID"].ToString();
                                    row.DEVICE_ID = dr["DEVICE_ID"].ToString();
                                    row.CITY = System.Text.RegularExpressions.Regex.Unescape(dr["CITY"].ToString());
                                    row.ADDRESS = System.Text.RegularExpressions.Regex.Unescape(dr["ADDRESS"].ToString());
                                    ret.AddData(row);
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }

        }

        public Profile3 Enter_account(string ID)
        {
            Profile3 ret = new Profile3
            {
                Result = "",
                ErrNo = "",
                ErrMsg = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_profile");
                            cmd.Parameters.AddWithValue("@id", ID);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "profile";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "500.1";
                                    ret.ErrMsg = "Нет данных для отображения";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    ret.ID = dr["id"].ToString();
                                    ret.login = dr["LOGIN"].ToString();
                                    ret.Object_name = dr["ADDRESS"].ToString();
                                    ret.tokenId = dr["TOKEN_ID"].ToString();
                                    ret.phone = dr["PHONE"].ToString();
                                    ret.photo = dr["PHOTO"].ToString();
                                    ret.name = dr["FIO"].ToString();
                                    ret.EMAIL = dr["EMAIL"].ToString();
                                    ret.Flatno = dr["ROOM"].ToString();
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }
        }

        /*  public OneAcc Enter_account2(string id)
          {
              OneAcc ret = new OneAcc
              {
                  Result = "",
                  ErrNo = "",
                  ErrMsg = ""
              };

              var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
              var address = msg.Address;


              string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
              try
              {
                  using (SqlConnection con = new SqlConnection(constr))
                  {
                      using (SqlCommand cmd = new SqlCommand())
                      {
                          using (SqlDataAdapter sda = new SqlDataAdapter())
                          {
                              cmd.Connection = con;
                              cmd.CommandType = CommandType.StoredProcedure;
                              cmd.CommandText = ("sp_QUICK_API_get_account_by_id");
                              cmd.Parameters.AddWithValue("@id", id);
                              sda.SelectCommand = cmd;
                              using (DataTable dt = new DataTable())
                              {
                                  dt.TableName = "account";
                                  sda.Fill(dt);

                                  if (dt.Rows.Count == 0)
                                  {
                                      ret.Result = "Fail";
                                      ret.ErrNo = "500.1";
                                      ret.ErrMsg = "Нет лицевых счетов для входа";
                                      return ret;
                                  }
                                  foreach (DataRow dr in dt.Rows)
                                  {
                                      ret.LOGIN = dr["LOGIN"].ToString();
                                      ret.TOKEN_ID = dr["TOKEN_ID"].ToString();
                                  }
                                  ret.Result = "Success";
                                  ret.ErrNo = "0";
                                  ret.ErrMsg = "OK";
                                  return ret;

                              }
                          }
                      }
                  }
              }
              catch (Exception e)
              {
                  ret.Result = "Fail";
                  ret.ErrNo = "666";
                  ret.ErrMsg = e.Message;
                  return ret;
              }

          }
          */
        public MetersData Check()
        {
            MetersData ret = new MetersData
            {
                Result = "",
                ErrNo = "",
                ErrMsg = ""
            };

            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_meter_list");
                            cmd.Parameters.AddWithValue("@tokenid", "C21314A9-09D9-F89D-4325-818E0069F145");
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "meter_list";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "300.1";
                                    ret.ErrMsg = "Ваши счетчики не были зарегистрированы в системе";
                                    return ret;
                                }

                                //Dictionary<string, object> row;
                                //foreach (DataRow dr in dt.Rows)
                                //{
                                //    row = new Dictionary<string, object>();
                                //    foreach (DataColumn col in dt.Columns)
                                //    {
                                //        row.Add(col.ColumnName, dr[col].ToString());                                        
                                //    }                                    
                                //    ret.AddData(row);
                                //}
                                foreach (DataRow dr in dt.Rows)
                                {
                                    //    row = new Dictionary<string, object>();
                                    //    foreach (DataColumn col in dt.Columns)
                                    //    {
                                    //        row.Add(col.ColumnName, dr[col].ToString());                                        
                                    //    }         
                                    var row = new Meter();
                                    row.USER_ID = dr["USER_ID"].ToString();
                                    row.ID = dr["ID"].ToString();
                                    row.TYPE = dr["TYPE"].ToString();
                                    row.METER_NUMBER = dr["METER_NUMBER"].ToString();
                                    row.PREVIOUS_DATE_CONTROL = dr["PREVIOUS_DATE_CONTROL"].ToString();
                                    row.NEXT_DATE_CONTROL = dr["NEXT_DATE_CONTROL"].ToString();
                                    row.DATE = dr["DATE"].ToString();
                                    row.VALUE = dr["VALUE"].ToString();

                                    ret.AddData(row);
                                }

                                //ret.Data = dt.Rows.OfType<DataRow>().Select(row => dt.Columns.OfType<DataColumn>()
                                //.ToDictionary(col => col.ColumnName, col => row[col] != null ? row[col].ToString() : null)).ToList();
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }


        }

        public MetersData Get_meter_list(string tokenID)
        {
            MetersData ret = new MetersData
            {
                Result = "",
                ErrNo = "",
                ErrMsg = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_meter_list");
                            cmd.Parameters.AddWithValue("@tokenid", tokenID);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "meter_list";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "300.1";
                                    ret.ErrMsg = "Ваши счетчики не были зарегистрированы в системе";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    var row = new Meter();
                                    row.USER_ID = dr["USER_ID"].ToString();
                                    row.ID = dr["ID"].ToString();
                                    row.TYPE = dr["TYPE"].ToString();
                                    row.METER_NUMBER = dr["METER_NUMBER"].ToString();
                                    row.PREVIOUS_DATE_CONTROL = dr["PREVIOUS_DATE_CONTROL"].ToString();
                                    row.NEXT_DATE_CONTROL = dr["NEXT_DATE_CONTROL"].ToString();
                                    row.DATE = dr["DATE"].ToString();
                                    row.VALUE = dr["VALUE"].ToString();

                                    ret.AddData(row);
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;
                                
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }

        }
        //public PassList Get_pass2(string tokenID, string login, string id)
        //{
        //    PassList ret = new PassList
        //    {
        //        Result = "",
        //        ErrNo = "",
        //        ErrMsg = ""
        //    };

        //    var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
        //    var address = msg.Address;


        //    string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
        //    try
        //    {
        //        using (SqlConnection con = new SqlConnection(constr))
        //        {
        //            using (SqlCommand cmd = new SqlCommand())
        //            {
        //                using (SqlDataAdapter sda = new SqlDataAdapter())
        //                {
        //                    cmd.Connection = con;
        //                    cmd.CommandType = CommandType.StoredProcedure;
        //                    cmd.CommandText = ("sp_QUICK_API_get_pass");
        //                    cmd.Parameters.AddWithValue("@tokenid", tokenID);
        //                    cmd.Parameters.AddWithValue("@login", login);
        //                    cmd.Parameters.AddWithValue("@id", id);
        //                    sda.SelectCommand = cmd;
        //                    using (DataTable dt = new DataTable())
        //                    {
        //                        dt.TableName = "meter_list";
        //                        sda.Fill(dt);

        //                        if (dt.Rows.Count == 0)
        //                        {
        //                            ret.Result = "Fail";
        //                            ret.ErrNo = "300.1";
        //                            ret.ErrMsg = "Невозможно отобразить заявку на допуск №" + id;
        //                            return ret;
        //                        }
        //                        foreach (DataRow dr in dt.Rows)
        //                        {
        //                            var row = new Pass2();
        //                            row.ID = dr["ID"].ToString();
        //                            row.LS = dr["LOGIN"].ToString();
        //                            row.PHONE = dr["PHONE"].ToString();
        //                            row.TOKEN_ID = dr["TOKEN"].ToString();
        //                            row.COMMENT = dr["COMMENT"].ToString();
                                    
        //                            foreach (string str in dr["DESCRIPTION"].ToString().Split(new string[] { "|--|" }, StringSplitOptions.None))
        //                            {
        //                                row.PASS_TYPE = str.Split(';')[0].Replace("\"Тип пропуска - ", "");
        //                                row.PERIOD = str.Split(';')[1].Replace("Срок действия - ", "");
        //                                var per = str.Split(';')[2].Replace("Период действия -с ", "");
        //                                row.PERIOD_START = per.Split(new string[] { " по " }, StringSplitOptions.None)[0];
        //                                row.PERIOD_END = per.Split(new string[] { " по " }, StringSplitOptions.None)[1];
        //                                if (row.PASS_TYPE.Contains("Для машины"))
        //                                {
        //                                    row.CAR_MODEL = str.Split(';')[3].Replace("Марка авто - ", "");
        //                                    row.CAR_NUMBER = str.Split(';')[4].Replace("Номер авто - ", "").Replace("\"", ""); 
                                            
        //                                }
        //                                else
        //                                {

        //                                    row.FIO = str.Split(';')[3].Replace("ФИО - ", "").Replace("\"", "");
        //                                }


        //                            }


        //                            ret.AddData(row);
        //                        }
        //                        ret.Result = "Success";
        //                        ret.ErrNo = "0";
        //                        ret.ErrMsg = "OK";
        //                        return ret;

        //                    }
        //                }
        //            }
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        ret.Result = "Fail";
        //        ret.ErrNo = "666";
        //        ret.ErrMsg = e.Message;
        //        return ret;
        //    }

        //}

        public PassResponse Get_pass(string tokenID, string login, string ID)
        {
            PassResponse ret = new PassResponse
            {
                Result = "",
                ErrNo = "",
                ErrMsg = ""
            };
            
            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_pass");
                            cmd.Parameters.AddWithValue("@tokenid", tokenID);
                            cmd.Parameters.AddWithValue("@login", login);
                            cmd.Parameters.AddWithValue("@id", ID);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "pass_list";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "300.1";
                                    ret.ErrMsg = "Невозможно отобразить заявку на допуск №" + ID;
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    
                                    ret.ID = dr["ID"].ToString();
                                    ret.tokenID = dr["TOKENID"].ToString();
                                    ret.login = dr["LOGIN"].ToString();
                                    ret.STATUS = dr["STATUS"].ToString();
                                    ret.AUTHOR = dr["AUTHOR"].ToString();
                                    ret.OBJECT = dr["OBJECT"].ToString();
                                    ret.ROOM = dr["ROOM"].ToString();
                                    ret.CLIENT = dr["CLIENT"].ToString();
                                    ret.phone = dr["PHONE_NUMBER"].ToString();
                                    ret.comment = dr["COMMENT"].ToString();
                                    ret.FILES = dr["FILES"].ToString();
                                    ret.CRDATE = dr["CRDATE"].ToString();
                                    ret.PASS_FOR = dr["PASS_FOR"].ToString();
                                    ret.PASS_TYPE = dr["PASS_TYPE"].ToString();
                                    ret.DATE_FROM = dr["DATE_FROM"].ToString();
                                    ret.DATE_TO = dr["DATE_TO"].ToString();
                                    var row = new OnePass();
                                    row.PERSON_CAR = dr["PERSON_CAR"].ToString();
                                    row.NAME = dr["NAME"].ToString();
                                    row.CAR_MODEL = dr["CAR_MODEL"].ToString();
                                    row.CAR_NUMBER = dr["CAR_NUMBER"].ToString();
                                    row.PARKING_TYPE = dr["PARKING_TYPE"].ToString();
                                    row.CAR_PARKING_NUMBER = dr["CAR_PARKING_NUMBER"].ToString();
                                    row.CAR_TYPE = dr["CAR_TYPE"].ToString();
                                    row.phone = dr["PHONE"].ToString();
                                    row.tokenID = dr["slaveID"].ToString();


                                    ret.AddData(row);
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                var json = new JavaScriptSerializer().Serialize(ret);
                ret.ErrMsg = e.Message +"\n"+ ret.ToString();
                return ret;
            }

        }


        public MetersData Get_meter_list2(string tokenID)
        {
            MetersData ret = new MetersData
            {
                Result = "",
                ErrNo = "",
                ErrMsg = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_meter_list");
                            cmd.Parameters.AddWithValue("@tokenid", tokenID);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "meter_list";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "300.1";
                                    ret.ErrMsg = "Ваши счетчики не были зарегистрированы в системе";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    var row = new Meter();
                                    row.USER_ID = dr["USER_ID"].ToString();
                                    row.ID = dr["ID"].ToString();
                                    row.TYPE = dr["TYPE"].ToString();
                                    row.METER_NUMBER = dr["METER_NUMBER"].ToString();
                                    row.PREVIOUS_DATE_CONTROL = dr["PREVIOUS_DATE_CONTROL"].ToString();
                                    row.NEXT_DATE_CONTROL = dr["NEXT_DATE_CONTROL"].ToString();
                                    row.DATE = dr["DATE"].ToString();
                                    row.VALUE = dr["VALUE"].ToString();

                                    ret.AddData(row);
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }

        }

        public MetersData Meter_value_add(string ID, string Value)
        {
            MetersData ret = new MetersData
            {
                Result = "",
                ErrNo = "",
                ErrMsg = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    string json2;
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_meter_value_add");
                            cmd.Parameters.AddWithValue("@ID", ID);
                            cmd.Parameters.AddWithValue("@Value", Value);

                            sda.InsertCommand = cmd;
                            if (cmd.ExecuteNonQuery() > 0)
                            {
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "Ваши показания переданы. Спасибо!";                                
                            }
                            else
                            {
                                ret.Result = "Fail";
                                ret.ErrNo = "300.2";
                                //ret.ErrMsg = "Текущие показания счетчика не могут быть меньше показателей за предыдущий период. Проверьте правильность переданных показаний.";
                                ret.ErrMsg = "Показания принимаются до 25 числа текущего месяца.";
                            }                                
                        }
                    }
                    con.Close();
                    json2 = new JavaScriptSerializer().Serialize(ret);
                    return ret;
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                var json = new JavaScriptSerializer().Serialize(ret);
                return ret;
            }

        }
        public MetersData Meter_value_add2(string ID, string Value)
        {
            MetersData ret = new MetersData
            {
                Result = "",
                ErrNo = "",
                ErrMsg = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    string json2;
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_meter_value_add");
                            cmd.Parameters.AddWithValue("@ID", ID);
                            cmd.Parameters.AddWithValue("@Value", Value);

                            sda.InsertCommand = cmd;
                            if (cmd.ExecuteNonQuery() > 0)
                            {
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "Ваши показания переданы. Спасибо!";
                            }
                            else
                            {
                                ret.Result = "Fail";
                                ret.ErrNo = "300.2";
                                //ret.ErrMsg = "Текущие показания счетчика не могут быть меньше показателей за предыдущий период. Проверьте правильность переданных показаний.";
                                ret.ErrMsg = "Показания принимаются до 25 числа текущего месяца.";
                            }
                        }
                    }
                    con.Close();
                    json2 = new JavaScriptSerializer().Serialize(ret);
                    return ret;
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                var json = new JavaScriptSerializer().Serialize(ret);
                return ret;
            }

        }

        public ServiceList Get_service_list()
        {
            ServiceList ret = new ServiceList
            {
                Result = "",
                ErrNo = "",
                ErrMsg = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_service_list");
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "service_list";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "500.2";
                                    ret.ErrMsg = "Пустой список";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    var row = new Service();                                    
                                    row.kGUID = dr["kGUID"].ToString();
                                    row.WORK_KIND = dr["WORK_KIND"].ToString();
                                    row.VISIBLE = dr["VISIBLE"].ToString();

                                    ret.AddData(row);
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }
        }
        public ServiceList Get_service_list2()
        {
            ServiceList ret = new ServiceList
            {
                Result = "",
                ErrNo = "",
                ErrMsg = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_service_list");
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "service_list";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "500.2";
                                    ret.ErrMsg = "Пустой список";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    var row = new Service();
                                    row.kGUID = dr["kGUID"].ToString();
                                    row.WORK_KIND = dr["WORK_KIND"].ToString();
                                    row.VISIBLE = dr["VISIBLE"].ToString();

                                    ret.AddData(row);
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }
        }

        public OneRequest New_request_add(string tokenID, string phone_number, string description, string work_kind, string files, string workdate, string workbegin, string workend, string destination)
        {
            OneRequest ret = new OneRequest();

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;

            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            description = description.Replace("__DEFAULT_VALUE__", "");
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_new_request_add2");
                            cmd.Parameters.AddWithValue("@tokenid", tokenID);
                            cmd.Parameters.AddWithValue("@phone_number", phone_number.Replace("__DEFAULT_VALUE__", ""));
                            try
                            {
                                cmd.Parameters.AddWithValue("@description", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(Encoding.UTF8.GetString(Convert.FromBase64String(description)))).Replace("__DEFAULT_VALUE__", ""));
                            }
                            catch
                            {
                                cmd.Parameters.AddWithValue("@description", description);
                            }
                            //cmd.Parameters.AddWithValue("@description", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(Encoding.UTF8.GetString(Convert.FromBase64String(description)))).Replace("__DEFAULT_VALUE__", ""));
                            //cmd.Parameters.AddWithValue("@description", description);
                            cmd.Parameters.AddWithValue("@work_kind", work_kind);
                            //cmd.Parameters.AddWithValue("@files", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(Encoding.UTF8.GetString(Convert.FromBase64String(files)))).Replace("__DEFAULT_VALUE__", ""));
                            cmd.Parameters.AddWithValue("@files", files);
                            if (workdate.Contains("."))
                            {
                                cmd.Parameters.AddWithValue("@workdate", workdate.Replace("__DEFAULT_VALUE__", "").Equals("") ? "" : DateTime.ParseExact(workdate, "dd.MM.yyyy", System.Globalization.CultureInfo.InvariantCulture).ToShortDateString());
                            }
                            else
                            {
                                cmd.Parameters.AddWithValue("@workdate", workdate.Replace("__DEFAULT_VALUE__", "").Equals("") ? "" : DateTime.ParseExact(workdate, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture).ToShortDateString());
                            }
                            cmd.Parameters.AddWithValue("@workbegin", workbegin.Replace("__DEFAULT_VALUE__", "").Replace("-", ":"));
                            cmd.Parameters.AddWithValue("@workend", workend.Replace("__DEFAULT_VALUE__", "").Replace("-", ":"));
                            cmd.Parameters.AddWithValue("@destination", destination.Replace("__DEFAULT_VALUE__", ""));
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "request_add";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "200.2";
                                    ret.ErrMsg = "Ошибка отправки заказа";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    ret.NUMBER = dr["NUMBER"].ToString();
                                    ret.ID = dr["ID"].ToString();
                                    ret.AUTHOR = dr["AUTHOR"].ToString();
                                    ret.OBJECT = dr["OBJECT"].ToString();
                                    ret.ROOM = dr["ROOM"].ToString();
                                    ret.CLIENT = dr["CLIENT"].ToString();
                                    ret.PHONE_NUMBER = dr["PHONE_NUMBER"].ToString();
                                    ret.WORK_KIND = dr["WORK_KIND"].ToString();
                                    ret.WORK_DESCR = dr["WORK_DESCR"].ToString();
                                    ret.COMMENT = dr["COMMENT"].ToString();
                                    ret.CRDATE = dr["CRDATE"].ToString();
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "Ваш заказ №" + ret.NUMBER + " успешно добавлен.";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }
        }
        public OneRequest New_request_add2(string tokenID, string phone_number, string description, string work_kind, string files, string workdate, string workbegin, string workend, string destination)
        {
            OneRequest ret = new OneRequest();

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;
            
            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            description = description.Replace("__DEFAULT_VALUE__", "");
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_new_request_add2");
                            cmd.Parameters.AddWithValue("@tokenid", tokenID);
                            cmd.Parameters.AddWithValue("@phone_number", phone_number.Replace("__DEFAULT_VALUE__", ""));
                            cmd.Parameters.AddWithValue("@description", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(Encoding.UTF8.GetString(Convert.FromBase64String(description)))).Replace("__DEFAULT_VALUE__", ""));
                            cmd.Parameters.AddWithValue("@work_kind", work_kind);
                            cmd.Parameters.AddWithValue("@files", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(Encoding.UTF8.GetString(Convert.FromBase64String(files)))).Replace("__DEFAULT_VALUE__", ""));
                            cmd.Parameters.AddWithValue("@workdate", workdate.Replace("__DEFAULT_VALUE__", "").Equals("") ? "" : DateTime.ParseExact(workdate, "dd.MM.yyyy", System.Globalization.CultureInfo.InvariantCulture).ToShortDateString());
                            cmd.Parameters.AddWithValue("@workbegin", workbegin.Replace("__DEFAULT_VALUE__", "").Replace("-", ":"));
                            cmd.Parameters.AddWithValue("@workend", workend.Replace("__DEFAULT_VALUE__", "").Replace("-", ":"));
                            cmd.Parameters.AddWithValue("@destination", destination.Replace("__DEFAULT_VALUE__", ""));
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "request_add";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "200.2";
                                    ret.ErrMsg = "Ошибка отправки заказа";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    ret.NUMBER = dr["NUMBER"].ToString();
                                    ret.ID = dr["ID"].ToString();
                                    ret.AUTHOR = dr["AUTHOR"].ToString();
                                    ret.OBJECT = dr["OBJECT"].ToString();
                                    ret.ROOM = dr["ROOM"].ToString();
                                    ret.CLIENT = dr["CLIENT"].ToString();
                                    ret.PHONE_NUMBER = dr["PHONE_NUMBER"].ToString();
                                    ret.WORK_KIND = dr["WORK_KIND"].ToString();
                                    ret.WORK_DESCR = dr["WORK_DESCR"].ToString();
                                    ret.COMMENT = dr["COMMENT"].ToString();
                                    ret.CRDATE = dr["CRDATE"].ToString();
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "Ваш заказ №" + ret.NUMBER + " успешно добавлен.";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }
        }

        public string New_request_add3(string tokenID, string phone_number, string description, string work_kind, string files, string workdate, string workbegin, string workend, string destination)
        {
            string NewID = "";
            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            description = description.Replace("__DEFAULT_VALUE__", "");
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_new_request_add2");
                            cmd.Parameters.AddWithValue("@tokenid", tokenID);
                            cmd.Parameters.AddWithValue("@phone_number", phone_number.Replace("__DEFAULT_VALUE__", ""));
                            cmd.Parameters.AddWithValue("@description", description);
                            cmd.Parameters.AddWithValue("@work_kind", "60178B6B-226C-6FBB-4325-8025002D3EC0");
                            cmd.Parameters.AddWithValue("@files", "");
                            cmd.Parameters.AddWithValue("@workdate", "");
                            cmd.Parameters.AddWithValue("@workbegin", "");
                            cmd.Parameters.AddWithValue("@workend", "");
                            cmd.Parameters.AddWithValue("@destination", "Пропуск");
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "request_add";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {   
                                    return "Ошибка отправки заказа";
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    NewID = dr["id"].ToString();                                    
                                }                                
                                return NewID;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {                
                return "Ошибка при добавлении заказа на пропуск " + e.Message;
            }
        }

        public NewPassAdded New_pass(PassRequest passRequest)
        {
            NewPassAdded ret = new NewPassAdded();
            string ID = "";
            string GUID = Guid.NewGuid().ToString();
            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_new_master_pass_add");
                            cmd.Parameters.AddWithValue("@TOKENID", passRequest.tokenID);
                            cmd.Parameters.AddWithValue("@LOGIN", passRequest.login);
                            cmd.Parameters.AddWithValue("@GUID", GUID);
                            cmd.Parameters.AddWithValue("@STATUS", passRequest.STATUS);
                            cmd.Parameters.AddWithValue("@AUTHOR", passRequest.AUTHOR);
                            cmd.Parameters.AddWithValue("@OBJECT", passRequest.OBJECT);
                            cmd.Parameters.AddWithValue("@ROOM", passRequest.ROOM);
                            cmd.Parameters.AddWithValue("@CLIENT", passRequest.CLIENT);
                            cmd.Parameters.AddWithValue("@PHONE_NUMBER", passRequest.phone);
                            cmd.Parameters.AddWithValue("@COMMENT", passRequest.comment);
                            cmd.Parameters.AddWithValue("@FILES", passRequest.FILES);
                            cmd.Parameters.AddWithValue("@PASS_FOR", passRequest.PASS_FOR);
                            cmd.Parameters.AddWithValue("@PASS_TYPE", passRequest.PASS_TYPE);
                            cmd.Parameters.AddWithValue("@DATE_FROM", passRequest.DATE_FROM);
                            cmd.Parameters.AddWithValue("@DATE_TO", passRequest.DATE_TO);
            
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "pass_master_add";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "200.2";
                                    ret.ErrMsg = "Ошибка отправки заказа на допуск";
                                    ret.ID = "-1";
                                    ret.COUNT = "0";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    ID = dr["ID"].ToString();
                                }

                                for (int i = 0; i < passRequest.PASSES.Count<OnePass>(); i++)
                                {
                                    New_pass_slave(ID, GUID, passRequest.PASSES[i]);
                                }

                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ID = ID;
                                ret.COUNT = passRequest.PASSES.Count<OnePass>().ToString();
                                ret.ErrMsg = "Ваша заявка № " + ID + " успешно отправлена.";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }
        }

        public int New_pass_slave(string ID, string GUID, OnePass pass)
        {
            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_new_slave_pass_add");
                   
                            cmd.Parameters.AddWithValue("@PARENT_ID", ID);
                            cmd.Parameters.AddWithValue("@TOKENID", pass.tokenID);
                            cmd.Parameters.AddWithValue("@LOGIN", pass.login);
                            cmd.Parameters.AddWithValue("@REQGUID", GUID);
                            cmd.Parameters.AddWithValue("@PERSON_CAR", pass.PERSON_CAR);
                            cmd.Parameters.AddWithValue("@NAME", pass.NAME);
                            cmd.Parameters.AddWithValue("@CAR_MODEL", pass.CAR_MODEL);
                            cmd.Parameters.AddWithValue("@CAR_NUMBER", pass.CAR_NUMBER);
                            cmd.Parameters.AddWithValue("@PARKING_TYPE", pass.PARKING_TYPE);
                            cmd.Parameters.AddWithValue("@CAR_PARKING_NUMBER", pass.CAR_PARKING_NUMBER);
                            cmd.Parameters.AddWithValue("@CAR_TYPE", pass.CAR_TYPE);
                            cmd.Parameters.AddWithValue("@PHONE", pass.phone);
                            
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "pass_slave_add";
                                sda.Fill(dt);
                                return dt.Rows.Count;
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return -1;
            }
        }


        public RequestData Get_request_list(string tokenID)
        {
            RequestData ret = new RequestData();

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_request_list3");
                            cmd.Parameters.AddWithValue("@tokenid", tokenID);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "request_list";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "500.1";
                                    ret.ErrMsg = "Нет заказов для отображения";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    var row = new Request();
                                    row.NUMBER = dr["NUMBER"].ToString();
                                    row.ID = dr["id"].ToString();
                                    row.AUTHOR = dr["AUTHOR"].ToString();
                                    row.OBJECT = dr["OBJECT"].ToString();
                                    row.ROOM = dr["ROOM"].ToString();
                                    row.CLIENT = dr["CLIENT"].ToString();
                                    row.STATUS = dr["STATUS"].ToString();
                                    row.PHONE_NUMBER = dr["PHONE_NUMBER"].ToString();
                                    row.WORK_CAT = dr["WORK_CAT"].ToString();
                                    row.WORK_KIND = dr["WORK_KIND"].ToString();
                                    row.WORK_DESCR = dr["WORK_DESCR"].ToString();
                                    row.COMMENT = dr["COMMENT"].ToString();
                                    row.CRDATE = dr["CRDATE2"].ToString();                                    
                                    row.STATUS_NAME = dr["STATUS_NAME"].ToString();
                                    row.DESTINATION = dr["DESTINATION"].ToString();
                                    row.STATUS_ID = dr["STATUS_ID"].ToString();
                                    row.WORKDATE = dr["WORKDATE"].ToString();
                                    row.WORKBEGIN = dr["WORKBEGIN"].ToString();
                                    row.WORKEND = dr["WORKEND"].ToString();
                                    row.FILES = dr["FILES"].ToString();

                                    ret.AddData(row);
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }

        }
        public RequestData Get_request_list2(string tokenID)
        {
            RequestData ret = new RequestData();

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_request_list3");
                            cmd.Parameters.AddWithValue("@tokenid", tokenID);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "request_list";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "500.1";
                                    ret.ErrMsg = "Нет заявок для отображения";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    var row = new Request();
                                    //row.NUMBER = dr["NUMBER"].ToString();
                                    row.NUMBER = dr["NUMBER"].ToString();
                                    row.ID = dr["id"].ToString();
                                    row.AUTHOR = dr["AUTHOR"].ToString();
                                    row.OBJECT = dr["OBJECT"].ToString();
                                    row.ROOM = dr["ROOM"].ToString();
                                    row.CLIENT = dr["CLIENT"].ToString();
                                    row.STATUS = dr["STATUS"].ToString();
                                    row.PHONE_NUMBER = dr["PHONE_NUMBER"].ToString();
                                    row.WORK_CAT = dr["WORK_CAT"].ToString();
                                    row.WORK_KIND = dr["WORK_KIND"].ToString();
                                    row.WORK_DESCR = dr["WORK_DESCR"].ToString();
                                    row.COMMENT = dr["COMMENT"].ToString();
                                    row.CRDATE = dr["CRDATE2"].ToString();

                                    row.STATUS_NAME = dr["STATUS_NAME"].ToString();
                                    row.DESTINATION = dr["DESTINATION"].ToString();
                                    row.STATUS_ID = dr["STATUS_ID"].ToString();
                                    row.WORKDATE = dr["WORKDATE"].ToString();
                                    row.WORKBEGIN = dr["WORKBEGIN"].ToString();
                                    row.WORKEND = dr["WORKEND"].ToString();
                                    row.FILES = dr["FILES"].ToString();
                                    ret.AddData(row);
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }

        }

        public RequestData Get_request(string tokenID, string id, string cancel)
        {
            RequestData ret = new RequestData();

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_request");
                            cmd.Parameters.AddWithValue("@tokenid", tokenID);
                            cmd.Parameters.AddWithValue("@id", id);
                            cmd.Parameters.AddWithValue("@cancel", cancel);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "request";
                                sda.Fill(dt);

                                if (cancel.Contains('1'))
                                {
                                    ret.Result = "Success";
                                    ret.ErrNo = "0";
                                    ret.ErrMsg = "Заявка отменена";
                                    return ret;
                                }

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "500.1";
                                    ret.ErrMsg = "Нет заявок для отображения";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    var row = new Request();
                                    //row.NUMBER = dr["NUMBER"].ToString();
                                    row.ID = dr["ID"].ToString();
                                    row.AUTHOR = dr["AUTHOR"].ToString();
                                    row.OBJECT = dr["OBJECT"].ToString();
                                    row.ROOM = dr["ROOM"].ToString();
                                    row.CLIENT = dr["CLIENT"].ToString();
                                    row.STATUS = dr["STATUS"].ToString();
                                    row.STATUS_NAME = dr["STATUS_NAME"].ToString();
                                    row.PHONE_NUMBER = dr["PHONE_NUMBER"].ToString();
                                    row.WORK_CAT = dr["WORK_CAT"].ToString();
                                    row.WORK_KIND = dr["WORK_KIND"].ToString();
                                    row.WORK_DESCR = dr["WORK_DESCR"].ToString();
                                    row.COMMENT = dr["COMMENT"].ToString();
                                    row.CRDATE = dr["CRDATE"].ToString();
                                    row.DESTINATION = dr["DESTINATION"].ToString();
                                    row.STATUS_ID = dr["STATUS_ID"].ToString();
                                    row.WORKDATE = dr["WORKDATE"].ToString();
                                    row.WORKBEGIN = dr["WORKBEGIN"].ToString();
                                    row.WORKEND = dr["WORKEND"].ToString();
                                    row.FILES = dr["FILES"].ToString();

                                    ret.AddData(row);
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }

        }
        public RequestData Get_request2(string tokenID, string id, string cancel)
        {
            RequestData ret = new RequestData();

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_request");
                            cmd.Parameters.AddWithValue("@tokenid", tokenID);
                            cmd.Parameters.AddWithValue("@id", id);
                            cmd.Parameters.AddWithValue("@cancel", cancel);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "request";
                                sda.Fill(dt);

                                if (cancel.Contains('1'))
                                {
                                    ret.Result = "Success";
                                    ret.ErrNo = "0";
                                    ret.ErrMsg = "Заявка отменена";
                                    return ret;
                                }

                                if (dt.Rows.Count == 0) 
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "500.1";
                                    ret.ErrMsg = "Нет заявок для отображения";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    var row = new Request();
                                    //row.NUMBER = dr["NUMBER"].ToString();
                                    row.ID = dr["ID"].ToString();
                                    row.AUTHOR = dr["AUTHOR"].ToString();
                                    row.OBJECT = dr["OBJECT"].ToString();
                                    row.ROOM = dr["ROOM"].ToString();
                                    row.CLIENT = dr["CLIENT"].ToString();
                                    row.STATUS = dr["STATUS"].ToString();
                                    row.STATUS_NAME = dr["STATUS_NAME"].ToString();
                                    row.PHONE_NUMBER = dr["PHONE_NUMBER"].ToString();
                                    row.WORK_CAT = dr["WORK_CAT"].ToString();
                                    row.WORK_KIND = dr["WORK_KIND"].ToString();
                                    row.WORK_DESCR = dr["WORK_DESCR"].ToString();
                                    row.COMMENT = dr["COMMENT"].ToString();
                                    row.CRDATE = dr["CRDATE"].ToString();
                                    row.DESTINATION = dr["DESTINATION"].ToString();
                                    row.STATUS_ID = dr["STATUS_ID"].ToString();
                                    row.WORKDATE = dr["WORKDATE"].ToString();
                                    row.WORKBEGIN = dr["WORKBEGIN"].ToString();
                                    row.WORKEND = dr["WORKEND"].ToString();
                                    row.FILES = dr["FILES"].ToString();

                                    ret.AddData(row);
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }

        }

        public Simple New_pass_add(string tokenID, string phone, string description, string rubric, string comment, string files, string Date, string begin, string end, string login, string fio)
        {
            Simple ret = new Simple();

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;

            //OneRequest request = new OneRequest();
            //OneRequest request = New_request_add3(tokenID, phone, description, "", "", "", "", "", rubric);
            string ID = "";
            ID = New_request_add3(tokenID, phone, description, "", "", "", "", "", rubric);
            //request.ID = "666";
            if (ID == "")
            {
                ret.Result = "Fail";
                ret.ErrNo = "113";
                ret.ErrMsg = "Ошибка! Пустой отклик...";
                return ret;
            }

            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {

                            if (ID.Length == 0)
                            {
                                ret.Result = "Fail";
                                ret.ErrNo = "113";
                                ret.ErrMsg = "Ошибка! " + "ID = " + ID;
                                con.Close();
                                return ret;
                            }

                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_new_pass_add");
                            cmd.Parameters.AddWithValue("@token", tokenID);
                            cmd.Parameters.AddWithValue("@phone", phone == null ? "" : phone);
                            //cmd.Parameters.AddWithValue("@rubric", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(rubric)));
                            //cmd.Parameters.AddWithValue("@rubric", System.Web.HttpUtility.UrlDecode(rubric, Encoding.UTF8));
                            /////cmd.Parameters.AddWithValue("@rubric", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(Encoding.UTF8.GetString(Convert.FromBase64String(rubric)))).Replace("__DEFAULT_VALUE__", ""));
                            cmd.Parameters.AddWithValue("@rubric", rubric);
                            //cmd.Parameters.AddWithValue("@description", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(description)));
                            //cmd.Parameters.AddWithValue("@description", System.Web.HttpUtility.UrlDecode(description, Encoding.UTF8));
                            /////cmd.Parameters.AddWithValue("@description", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(Encoding.UTF8.GetString(Convert.FromBase64String(description)))).Replace("__DEFAULT_VALUE__", ""));
                            cmd.Parameters.AddWithValue("@description", description);
                            /////cmd.Parameters.AddWithValue("@comment", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(Encoding.UTF8.GetString(Convert.FromBase64String(comment)))).Replace("__DEFAULT_VALUE__", ""));
                            cmd.Parameters.AddWithValue("@comment", comment);
                            cmd.Parameters.AddWithValue("@files", files == null ? "" : files);
                            cmd.Parameters.AddWithValue("@date", Date == null ? "" : Date);
                            cmd.Parameters.AddWithValue("@begin", begin == null ? "" : begin);
                            cmd.Parameters.AddWithValue("@end", end == null ? "" : end);
                            cmd.Parameters.AddWithValue("@login", login);
                            //cmd.Parameters.AddWithValue("@fio", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(fio)));
                            ////cmd.Parameters.AddWithValue("@fio", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(Encoding.UTF8.GetString(Convert.FromBase64String(fio)))).Replace("__DEFAULT_VALUE__", ""));
                            cmd.Parameters.AddWithValue("@fio", fio);
                            cmd.Parameters.AddWithValue("@id", ID);

                            sda.InsertCommand = cmd;
                            cmd.ExecuteNonQuery();
                            if (ID == "")
                            {
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "Ваша заявка №" + ID + " отправлена. Спасибо!";
                            }
                            else
                            {
                                ret.Result = "Fail";
                                ret.ErrNo = "700.1";
                                //ret.ErrMsg = "Ошибка при отправке заявки на допуск.";
                                ret.ErrMsg = "Не удалось отправить заявку на допуск " + ID + ". Обратитесь в службу поддержки";
                            }
                        }
                    }
                    con.Close();
                    return ret;
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "900.1";
                //ret.ErrMsg = e.Message + "BEGIN "+token+phone+description+rubric+comment+files+date+begin+end+login+fio+" END";
                ret.ErrMsg = e.Message + " Ошибка отправки пропуска ID = " + ID + ".";
                return ret;
            }

        }




        public Simple New_pass_add2(string tokenID, string phone, string description, string rubric, string comment, string files, string Date, string begin, string end, string login, string fio)
        {
            Simple ret = new Simple();

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;

            //OneRequest request = new OneRequest();
            //OneRequest request = New_request_add3(tokenID, phone, description, "", "", "", "", "", rubric);
            string ID = "";
            ID = New_request_add3(tokenID, phone, description, "", "", "", "", "", rubric);
            //request.ID = "666";
            if (ID == "")
            {
                ret.Result = "Fail";
                ret.ErrNo = "113";
                ret.ErrMsg = "Ошибка! Пустой отклик...";
                return ret;
            }

            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {

                            if (ID.Length == 0)
                            {
                                ret.Result = "Fail";
                                ret.ErrNo = "113";
                                ret.ErrMsg = "Ошибка! " + "ID = " + ID;
                                con.Close();
                                return ret;
                            }

                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_new_pass_add");
                            cmd.Parameters.AddWithValue("@token", tokenID);
                            cmd.Parameters.AddWithValue("@phone", phone == null ? "" : phone);
                            //cmd.Parameters.AddWithValue("@rubric", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(rubric)));
                            //cmd.Parameters.AddWithValue("@rubric", System.Web.HttpUtility.UrlDecode(rubric, Encoding.UTF8));
                            /////cmd.Parameters.AddWithValue("@rubric", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(Encoding.UTF8.GetString(Convert.FromBase64String(rubric)))).Replace("__DEFAULT_VALUE__", ""));
                            cmd.Parameters.AddWithValue("@rubric", rubric);
                            //cmd.Parameters.AddWithValue("@description", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(description)));
                            //cmd.Parameters.AddWithValue("@description", System.Web.HttpUtility.UrlDecode(description, Encoding.UTF8));
                            /////cmd.Parameters.AddWithValue("@description", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(Encoding.UTF8.GetString(Convert.FromBase64String(description)))).Replace("__DEFAULT_VALUE__", ""));
                            cmd.Parameters.AddWithValue("@description", description);
                            /////cmd.Parameters.AddWithValue("@comment", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(Encoding.UTF8.GetString(Convert.FromBase64String(comment)))).Replace("__DEFAULT_VALUE__", ""));
                            cmd.Parameters.AddWithValue("@comment", comment);
                            cmd.Parameters.AddWithValue("@files", files == null ? "" : files);
                            cmd.Parameters.AddWithValue("@date", Date == null ? "" : Date);
                            cmd.Parameters.AddWithValue("@begin", begin == null ? "" : begin);
                            cmd.Parameters.AddWithValue("@end", end == null ? "" : end);
                            cmd.Parameters.AddWithValue("@login", login);
                            //cmd.Parameters.AddWithValue("@fio", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(fio)));
                            ////cmd.Parameters.AddWithValue("@fio", System.Web.HttpUtility.UrlDecode(System.Text.RegularExpressions.Regex.Unescape(Encoding.UTF8.GetString(Convert.FromBase64String(fio)))).Replace("__DEFAULT_VALUE__", ""));
                            cmd.Parameters.AddWithValue("@fio", fio);
                            cmd.Parameters.AddWithValue("@id", ID);

                            sda.InsertCommand = cmd;
                            cmd.ExecuteNonQuery();
                            if (ID == "")
                            {
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "Ваша заявка №" + ID + " отправлена. Спасибо!";
                            }
                            else
                            {
                                ret.Result = "Fail";
                                ret.ErrNo = "700.1";
                                //ret.ErrMsg = "Ошибка при отправке заявки на допуск.";
                                ret.ErrMsg = "Не удалось отправить заявку на допуск " + ID + ". Обратитесь в службу поддержки";
                            }
                        }
                    }
                    con.Close();
                    return ret;
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "900.1";
                //ret.ErrMsg = e.Message + "BEGIN "+token+phone+description+rubric+comment+files+date+begin+end+login+fio+" END";
                ret.ErrMsg = e.Message + " Ошибка отправки пропуска ID = " +ID+".";
                return ret;
            }

        }



        public SingleType Payment(string tokenID, string AMOUNT, string MONTH, string YEAR, string CUSTOM, string MODE)
        {
            SingleType ret = new SingleType
            {
                Result = "",
                ErrNo = "",
                ErrMsg = "",
                Name = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_payment");
                            cmd.Parameters.AddWithValue("@tokenID", tokenID);
                            cmd.Parameters.AddWithValue("@AMOUNT", AMOUNT);
                                cmd.Parameters.AddWithValue("@MONTH", MONTH);
                                cmd.Parameters.AddWithValue("@YEAR", YEAR);
                                cmd.Parameters.AddWithValue("@CUSTOM", CUSTOM);
                                cmd.Parameters.AddWithValue("@MODE", MODE);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "PAYMENT";
                                sda.Fill(dt);
                                if (dt.Rows.Count > 0)
                                {
                                    ret.Result = "Success";
                                    ret.ErrNo = "0";
                                    ret.ErrMsg = "Ссылка на оплату";
                                    ret.TokenId = tokenID;
                                    ret.Name = dt.Rows[0]["URL"].ToString();
                                    return ret;
                                }
                                else
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "200.5";
                                    ret.ErrMsg = "Не удалось сформировать ссылку на оплату";
                                    ret.TokenId = tokenID;
                                    ret.Name = "ERROR";
                                    return ret;
                                }
                                
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                ret.TokenId = "GLOBAL ERROR";
                ret.Name = "SERVER IS DOWN";
                ret.Phone = "?";
                return ret;
            }
        }
        public SingleType Payment2(string tokenID, string AMOUNT, string MONTH, string YEAR, string CUSTOM, string MODE)
        {
            SingleType ret = new SingleType
            {
                Result = "",
                ErrNo = "",
                ErrMsg = "",
                Name = ""
            };

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_payment");
                            cmd.Parameters.AddWithValue("@tokenID", tokenID);
                            cmd.Parameters.AddWithValue("@AMOUNT", AMOUNT);
                            cmd.Parameters.AddWithValue("@MONTH", MONTH);
                            cmd.Parameters.AddWithValue("@YEAR", YEAR);
                            cmd.Parameters.AddWithValue("@CUSTOM", CUSTOM);
                            cmd.Parameters.AddWithValue("@MODE", MODE);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "PAYMENT";
                                sda.Fill(dt);
                                if (dt.Rows.Count > 0)
                                {
                                    ret.Result = "Success";
                                    ret.ErrNo = "0";
                                    ret.ErrMsg = "Ссылка на оплату";
                                    ret.TokenId = tokenID;
                                    ret.Name = dt.Rows[0]["URL"].ToString();
                                    return ret;
                                }
                                else
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "200.5";
                                    ret.ErrMsg = "Не удалось сформировать ссылку на оплату";
                                    ret.TokenId = tokenID;
                                    ret.Name = "ERROR";
                                    return ret;
                                }

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                ret.TokenId = "GLOBAL ERROR";
                ret.Name = "SERVER IS DOWN";
                ret.Phone = "?";
                return ret;
            }
        }


        public Payments Get_payments_list(string tokenID)
        {
            Payments ret = new Payments();

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_payments");
                            cmd.Parameters.AddWithValue("@tokenid", tokenID);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "payments_list";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "400.3";
                                    ret.ErrMsg = "Нет квитанций для оплаты";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    var row = new Payment();
                                    row.PERSONAL_ACCOUNT = dr["PERSONAL_ACCOUNT"].ToString();
                                    row.SUMM = dr["SUMM"].ToString();
                                    row.MONTH_YEAR = dr["MONTH_YEAR"].ToString();
                                    ret.AddData(row);
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }

        }
        public NewsFeed Get_news_feed(string tokenID)
        {
            NewsFeed ret = new NewsFeed();

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_news_feed");
                            cmd.Parameters.AddWithValue("@tokenid", tokenID);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "news_feed";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "500.2";
                                    ret.ErrMsg = "Пустой список";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    var row = new News();
                                    row.ID = dr["ID"].ToString();
                                    row.NAME = dr["NAME"].ToString();
                                    row.PREVIEW_TEXT = dr["PREVIEW_TEXT"].ToString();
                                    row.PREVIEW_PICTURE = dr["PREVIEW_PICTURE"].ToString();
                                    row.PREVIEW_TEXT_TYPE = dr["PREVIEW_TEXT_TYPE"].ToString();
                                    row.DATE_CREATE = dr["DATE_CREATE"].ToString();
                                    ret.AddData(row);
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }

        }
        public OneNews Show_news(string ID)
        {
            OneNews ret = new OneNews();
            
            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_show_news");
                            cmd.Parameters.AddWithValue("@id", ID);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "one_news";
                                sda.Fill(dt);
                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "600.1";
                                    ret.ErrMsg = "Новость недоступна";
                                    return ret;
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                ret.DETAIL_TEXT = dt.Rows[0]["DETAIL_TEXT"].ToString();
                                ret.DETAIL_PICTURE = dt.Rows[0]["DETAIL_PICTURE"].ToString();
                                ret.DETAIL_TEXT_TYPE = dt.Rows[0]["DETAIL_TEXT_TYPE"].ToString();
                                return ret;
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                var json = new JavaScriptSerializer().Serialize(ret);
                return ret;
            }
        }

        public QuestionList Get_question_list(string tokenID)
        {
            QuestionList ret = new QuestionList();

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_question_list");
                            cmd.Parameters.AddWithValue("@tokenid", tokenID);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "question_list";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "500.2";
                                    ret.ErrMsg = "Пустой список";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    var row = new Question();
                                    row.ID = dr["ID"].ToString();
                                    row.TITLE = dr["TITLE"].ToString();
                                    row.PREVIEW_TEXT = dr["PREVIEW_TEXT"].ToString();
                                    row.PREVIEW_TEXT_TYPE = dr["PREVIEW_TEXT_TYPE"].ToString();
                                    row.DATE_CREATE = dr["DATE_CREATE"].ToString();
                                    row.UNAME = dr["UNAME"].ToString();
                                    ret.AddData(row);
                                }
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }
        }
        public Simple New_question_add(string tokenID, string title, string description)
        {
            Simple ret = new Simple();
            
            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_new_question_add");
                            cmd.Parameters.AddWithValue("@tokenID", tokenID);
                            cmd.Parameters.AddWithValue("@title", title);
                            cmd.Parameters.AddWithValue("@description", description);

                            sda.InsertCommand = cmd;
                            if (cmd.ExecuteNonQuery() > 0)
                            {
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "Ваш вопрос добавлен. Спасибо!";
                            }
                            else
                            {
                                ret.Result = "Fail";
                                ret.ErrNo = "700.1";
                                ret.ErrMsg = "Ошибка при отправке вопроса.";
                            }
                        }
                    }
                    con.Close();
                    return ret;
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }
        }
        public Simple New_answer_add(string tokenID, string question_id, string title, string description)
        {
            Simple ret = new Simple();

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_new_answer_add");
                            cmd.Parameters.AddWithValue("@tokenID", tokenID);
                            cmd.Parameters.AddWithValue("@question_id", question_id);
                            cmd.Parameters.AddWithValue("@title", title);
                            cmd.Parameters.AddWithValue("@description", description);

                            sda.InsertCommand = cmd;
                            if (cmd.ExecuteNonQuery() > 0)
                            {
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "Ваш ответ отправлен. Спасибо!";
                            }
                            else
                            {
                                ret.Result = "Fail";
                                ret.ErrNo = "700.1";
                                ret.ErrMsg = "Ошибка при отправке ответа.";
                            }
                        }
                    }
                    con.Close();
                    return ret;
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }

        }
        public QuestionWAnswers Get_question(string question_id)
        {
            QuestionWAnswers ret = new QuestionWAnswers();

            var msg = OperationContext.Current.IncomingMessageProperties[RemoteEndpointMessageProperty.Name] as RemoteEndpointMessageProperty;
            var address = msg.Address;


            string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(constr))
                {
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_get_question");
                            cmd.Parameters.AddWithValue("@question_id", question_id);
                            sda.SelectCommand = cmd;
                            using (DataTable dt = new DataTable())
                            {
                                dt.TableName = "question_w_answers";
                                sda.Fill(dt);

                                if (dt.Rows.Count == 0)
                                {
                                    ret.Result = "Fail";
                                    ret.ErrNo = "500.2";
                                    ret.ErrMsg = "Пустой список";
                                    return ret;
                                }
                                foreach (DataRow dr in dt.Rows)
                                {
                                    var row = new Answer();
                                    row.ID = dr["aID"].ToString();
                                    row.DETAIL_TEXT = dr["aDETAIL_TEXT"].ToString();
                                    row.TITLE= dr["aTITLE"].ToString();
                                    row.UNAME = dr["aNAME"].ToString();
                                    row.DATE_CREATE = dr["aDATE_CREATE"].ToString();
                                    ret.AddData(row);
                                }
                                ret.ID = dt.Rows[0]["qID"].ToString();
                                ret.TITLE = dt.Rows[0]["qTITLE"].ToString();
                                ret.PREVIEW_TEXT = dt.Rows[0]["qPREVIEW_TEXT"].ToString();
                                ret.DETAIL_TEXT = dt.Rows[0]["qDETAIL_TEXT"].ToString();
                                ret.UNAME = dt.Rows[0]["qNAME"].ToString();
                                ret.DATE_CREATE = dt.Rows[0]["qDATE_CREATE"].ToString();
                                ret.ID = dt.Rows[0]["qID"].ToString();

                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "OK";
                                return ret;

                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                ret.Result = "Fail";
                ret.ErrNo = "666";
                ret.ErrMsg = e.Message;
                return ret;
            }
        }


        public DomainData UploadFile(Stream stream)
        {
            HttpMultipartParser parser = new HttpMultipartParser(stream, "file");
            DomainData ret = new DomainData();
            string tokenID;
            string sign;
            if (parser.Success)
            {
                //string o_id = parser.Parameters["object_id"];
                var gname = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(parser.Filename);
                //var path = HttpContext.Current.Server.MapPath(".");
                //HttpRuntime.AppDomainAppPat
                var rootpath = AppDomain.CurrentDomain.BaseDirectory;
                rootpath = @"C:\inetpub\wwwroot\";
                tokenID = parser.Parameters["tokenid"];
                //tokenID = "TESRrr";
                //sign = "1";
                sign = parser.Parameters["sign"];
                if (!Directory.Exists(rootpath + @"\Files\"))
                {
                    Directory.CreateDirectory(rootpath + @"\Files\");
                }
                if (!Directory.Exists(rootpath + @"\Files\" + tokenID))
                {
                    Directory.CreateDirectory(rootpath + @"\Files\" + tokenID);
                }
                var path = rootpath + @"Files\" + tokenID + @"\" + gname + extension;
                var url = @"http://31.3.22.226:12480/Files/" + tokenID + @"/" + gname + extension;
                File.WriteAllBytes(path, parser.FileContents);

                string constr = WebConfigurationManager.ConnectionStrings["MATORIN"].ConnectionString;
                using (SqlConnection con = new SqlConnection(constr))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        using (SqlDataAdapter sda = new SqlDataAdapter())
                        {
                            cmd.Connection = con;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.CommandText = ("sp_QUICK_API_save_file");
                            cmd.Parameters.AddWithValue("@tokenID", tokenID);
                            cmd.Parameters.AddWithValue("@sign", sign);
                            cmd.Parameters.AddWithValue("@url", url);

                            sda.InsertCommand = cmd;
                            if (cmd.ExecuteNonQuery() > 0)
                            {
                                ret.Result = "Success";
                                ret.ErrNo = "0";
                                ret.ErrMsg = "Файл сохранен!";
                            }
                            else
                            {
                                ret.Result = "Fail";
                                ret.ErrNo = "320.4";
                                ret.ErrMsg = "Не удалось сохранить файл!";
                            }
                        }
                    }
                    con.Close();
                }

                ret.URL = url;
                ret.Result = "Success";
                ret.ErrNo = "0";
                ret.ErrMsg = "OK";
                return ret;
            }
            else
            {
                ret.URL = "UNDEFINED";
                ret.Result = "Fail";
                ret.ErrNo = "200.5";
                ret.ErrMsg = "Не удалось сохранить файл!";
                return ret;
            }
        }

    }

    





    public sealed class DynamicJsonConverter : JavaScriptConverter
    {
        public override object Deserialize(IDictionary<string, object> dictionary, Type type, JavaScriptSerializer serializer)
        {
            if (dictionary == null)
                throw new ArgumentNullException("dictionary");

            return type == typeof(object) ? new DynamicJsonObject(dictionary) : null;
        }

        public override IDictionary<string, object> Serialize(object obj, JavaScriptSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override IEnumerable<Type> SupportedTypes
        {
            get { return new ReadOnlyCollection<Type>(new List<Type>(new[] { typeof(object) })); }
        }

        #region Nested type: DynamicJsonObject

        private sealed class DynamicJsonObject : DynamicObject
        {
            private readonly IDictionary<string, object> _dictionary;

            public DynamicJsonObject(IDictionary<string, object> dictionary)
            {
                if (dictionary == null)
                    throw new ArgumentNullException("dictionary");
                _dictionary = dictionary;
            }

            public override string ToString()
            {
                var sb = new StringBuilder("{");
                ToString(sb);
                return sb.ToString();
            }

            private void ToString(StringBuilder sb)
            {
                var firstInDictionary = true;
                foreach (var pair in _dictionary)
                {
                    if (!firstInDictionary)
                        sb.Append(",");
                    firstInDictionary = false;
                    var value = pair.Value;
                    var name = pair.Key;
                    if (value is string)
                    {
                        sb.AppendFormat("{0}:\"{1}\"", name, value);
                    }
                    else if (value is IDictionary<string, object>)
                    {
                        new DynamicJsonObject((IDictionary<string, object>)value).ToString(sb);
                    }
                    else if (value is ArrayList)
                    {
                        sb.Append(name + ":[");
                        var firstInArray = true;
                        foreach (var arrayValue in (ArrayList)value)
                        {
                            if (!firstInArray)
                                sb.Append(",");
                            firstInArray = false;
                            if (arrayValue is IDictionary<string, object>)
                                new DynamicJsonObject((IDictionary<string, object>)arrayValue).ToString(sb);
                            else if (arrayValue is string)
                                sb.AppendFormat("\"{0}\"", arrayValue);
                            else
                                sb.AppendFormat("{0}", arrayValue);

                        }
                        sb.Append("]");
                    }
                    else
                    {
                        sb.AppendFormat("{0}:{1}", name, value);
                    }
                }
                sb.Append("}");
            }

            public override bool TryGetMember(GetMemberBinder binder, out object result)
            {
                if (!_dictionary.TryGetValue(binder.Name, out result))
                {
                    // return null to avoid exception.  caller can check for null this way...
                    result = null;
                    return true;
                }

                result = WrapResultObject(result);
                return true;
            }

            public override bool TryGetIndex(GetIndexBinder binder, object[] indexes, out object result)
            {
                if (indexes.Length == 1 && indexes[0] != null)
                {
                    if (!_dictionary.TryGetValue(indexes[0].ToString(), out result))
                    {
                        // return null to avoid exception.  caller can check for null this way...
                        result = null;
                        return true;
                    }

                    result = WrapResultObject(result);
                    return true;
                }

                return base.TryGetIndex(binder, indexes, out result);
            }

            private static object WrapResultObject(object result)
            {
                var dictionary = result as IDictionary<string, object>;
                if (dictionary != null)
                    return new DynamicJsonObject(dictionary);

                var arrayList = result as ArrayList;
                if (arrayList != null && arrayList.Count > 0)
                {
                    return arrayList[0] is IDictionary<string, object>
                        ? new List<object>(arrayList.Cast<IDictionary<string, object>>().Select(x => new DynamicJsonObject(x)))
                        : new List<object>(arrayList.Cast<object>());
                }

                return result;
            }
        }

        #endregion
    }
}