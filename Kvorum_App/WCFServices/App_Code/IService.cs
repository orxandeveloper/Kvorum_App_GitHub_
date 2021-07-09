using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;

using System.ServiceModel.Web;
using System.Text;


namespace Server
{

    [ServiceContract]

    public interface IService
    {
        [OperationContract]
        [WebGet(ResponseFormat = WebMessageFormat.Json)]
        MetersData Check();


        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        PassResponse Get_pass(string tokenID, string login, string ID);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare)]
        [return: MessageParameter(Name = "ResultData")]
        DomainData UploadFile(Stream stream);


        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        Profile3 Auth3(string login, string pass, string device_id);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/Auth2/{log}/{pass}/{device_id}")]
        [return: MessageParameter(Name = "ResultData")]
        SingleType Auth2(string log, string pass, string device_id);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        SingleTypeIOS Auth(string log, string pass);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        SingleType2 Get_object(string tokenID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GO2/{tokenID}")]
        [return: MessageParameter(Name = "ResultData")]
        SingleType2 Get_object2(string tokenID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/DA2?id={id}")]
        [return: MessageParameter(Name = "ResultData")]
        Simple Delete_account2(string id);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        Simple Delete_account(string ID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GPL2?tokenID={tokenID}")]
        [return: MessageParameter(Name = "ResultData")]
        PaymentBill Get_payments2(string tokenID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        PaymentBill Get_payments(string tokenID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        MetersData Get_meter_list(string tokenID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GML2/{tokenID}")]
        [return: MessageParameter(Name = "ResultData")]
        MetersData Get_meter_list2(string tokenID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        Accounts Get_accounts(string device_id);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GA2/{device_id}")]
        [return: MessageParameter(Name = "ResultData")]
        Accounts Get_accounts2(string device_id);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/EA2/{id}")]
        [return: MessageParameter(Name = "ResultData")]
        Profile2 Enter_account2(string id);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        Profile3 Enter_account(string ID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        MetersData Meter_value_add(string ID, string Value);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/MVA2/{ID}/{Value}")]
        [return: MessageParameter(Name = "ResultData")]
        MetersData Meter_value_add2(string ID, string Value);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/UP2?tokenID={tokenID}&phone={phone}&fio={fio}")]
        [return: MessageParameter(Name = "ResultData")]
        Simple Update_profile2(string tokenID, string phone, string fio);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        Simple Update_profile(string tokenID, string phone, string fio);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        ServiceList Get_service_list();

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GSL2")]
        [return: MessageParameter(Name = "ResultData")]
        ServiceList Get_service_list2();

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        OneRequest New_request_add(string tokenID, string phone_number, string description, string work_kind, string files, string workdate, string workbegin, string workend, string destination);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/NRA2?tokenID={tokenID}&phone_number={phone_number}&description={description}&work_kind={work_kind}&files={files}&workdate={workdate}&workbegin={workbegin}&workend={workend}&destination={destination}")]
        [return: MessageParameter(Name = "ResultData")]
        OneRequest New_request_add2(string tokenID, string phone_number, string description, string work_kind, string files, string workdate, string workbegin, string workend, string destination);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        NewPassAdded New_pass(PassRequest passRequest);
        /*
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        Simple New_pass_add(string tokenID, string phone, string description, string rubric, string comment, string files, string Date, string begin, string end, string login, string fio);

        [OperationContract]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        UriTemplate = "/PASS2?token={token}&phone={phone}&description={description}&rubric={rubric}&comment={comment}&files={files}&date={date}&begin={begin}&end={end}&login={login}&fio={fio}")]
        [return: MessageParameter(Name = "ResultData")]
        Simple New_pass_add2(string token, string phone, string description, string rubric, string comment, string files, string date, string begin, string end, string login, string fio);
*/
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        RequestData Get_request_list(string tokenID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GRL2/tokenID={tokenID}")]
        [return: MessageParameter(Name = "ResultData")]
        RequestData Get_request_list2(string tokenID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        RequestData Get_request(string tokenID, string id, string cancel);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GR2/tokenID={tokenID}/id={id}/cancel={cancel}")]
        [return: MessageParameter(Name = "ResultData")]
        RequestData Get_request2(string tokenID, string id, string cancel);


        /*
         [OperationContract]
         PassList Get_pass2(string tokenID, string login, string id );
         [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/GP2?tokenID={tokenID}&login={login}&id={id}")]
         [return: MessageParameter(Name = "ResultData")]
        */
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        Payments Get_payments_list(string tokenID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        NewsFeed Get_news_feed(string tokenID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        OneNews Show_news(string ID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        QuestionList Get_question_list(string tokenID);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        Simple New_question_add(string tokenID, string title, string description);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        Simple New_answer_add(string tokenID, string question_id, string title, string description);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        QuestionWAnswers Get_question(string question_id);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        [return: MessageParameter(Name = "ResultData")]
        SingleType Payment(string tokenID, string AMOUNT, string MONTH, string YEAR, string CUSTOM, string MODE);

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, UriTemplate = "/PAY/tokenID={tokenID}/AMOUNT={AMOUNT}/MONTH={MONTH}/YEAR={YEAR}/CUSTOM={CUSTOM}/MODE={MODE}")]
        [return: MessageParameter(Name = "ResultData")]
        SingleType Payment2(string tokenID, string AMOUNT, string MONTH, string YEAR, string CUSTOM, string MODE);

    }
        [DataContract]
        public class SingleType
        {
            [DataMember]
            public string Result { get; set; }
        [DataMember]
            public string ErrNo { get; set; }
        [DataMember]
            public string ErrMsg { get; set; }
        [DataMember]
            public string TokenId { get; set; }
        [DataMember]
            public string Name { get; set; }
        [DataMember]
            public string Phone { get; set; }
        [DataMember]
            public string Photo { get; set; }

    }
    [DataContract]
    public class SingleTypeIOS
    {
        [DataMember]
        public string Result { get; set; }
        [DataMember]
        public string ErrNo { get; set; }
        [DataMember]
        public string ErrMsg { get; set; }
        [DataMember]
        public string TokenId { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Phone { get; set; }
        [DataMember]
        public string photo { get; set; }

    }

    [DataContract]
    public class SingleTypeIOS2
    {
        [DataMember]
        public string Result { get; set; }
        [DataMember]
        public string ErrNo { get; set; }
        [DataMember]
        public string ErrMsg { get; set; }
        [DataMember]
        public string tokenId { get; set; }
        [DataMember (IsRequired = false)]
        public string name { get; set; }
        [DataMember (IsRequired = false)]
        public string phone { get; set; }
        [DataMember (IsRequired = false)]
        public string photo { get; set; }

    }

    [DataContract]
        public class SingleType2
        {
            string result = "";
            string errNo = "";
            string errMsg = "";
            string object_name = "";
            string flatno = "";
            string photo = "";

            [DataMember]
            public string Result
            {
                get { return result; }
                set { result = value; }
            }
            [DataMember]
            public string ErrNo
            {
                get { return errNo; }
                set { errNo = value; }
            }
            [DataMember]
            public string ErrMsg
            {
                get { return errMsg; }
                set { errMsg = value; }
            }
            [DataMember]
            public string Object_name
            {
                get { return object_name; }
                set { object_name = value; }
            }
            [DataMember]
            public string Flatno
            {
                get { return flatno; }
                set { flatno = value; }
            }
            [DataMember]
            public string Photo
            {
                get { return photo; }
                set { photo = value; }
            }

        }

        [DataContract]
        public class Meter_
        {
            string result = "";
            string errNo = "";
            string errMsg = "";
            //string id = "";
            //string value_ = "";

            [DataMember]
            public string Result
            {
                get { return result; }
                set { result = value; }
            }
            [DataMember]
            public string ErrNo
            {
                get { return errNo; }
                set { errNo = value; }
            }
            [DataMember]
            public string ErrMsg
            {
                get { return errMsg; }
                set { errMsg = value; }
            }
        }
        [DataContract]
        public class Meter
        {
            [DataMember]
            public string USER_ID { get; set; }
            [DataMember]
            public string ID { get; set; }
            [DataMember]
            public string TYPE { get; set; }
            [DataMember]
            public string METER_NUMBER { get; set; }
            [DataMember]
            public string PREVIOUS_DATE_CONTROL { get; set; }
            [DataMember]
            public string NEXT_DATE_CONTROL { get; set; }
            [DataMember]
            public string DATE { get; set; }
            [DataMember]
            public string VALUE { get; set; }

        }
        [DataContract(Name = "MetersDataDC")]
        public class MetersData
        {
            [DataMember]
            public string Result { get; set; }
            [DataMember]
            public string ErrNo { get; set; }
            [DataMember]
            public string ErrMsg { get; set; }
            [DataMember]
            public List<Meter> METERS = new List<Meter>();

            public void AddData(Meter item)
            {
                METERS.Add(item);
            }
        }
        [DataContract(Name = "AccountsDC")]
        public class Accounts
        {
            [DataMember]
            public string Result { get; set; }
            [DataMember]
            public string ErrNo { get; set; }
            [DataMember]
            public string ErrMsg { get; set; }
            [DataMember]
            public List<Account> ACCOUNTS = new List<Account>();

            public void AddData(Account item)
            {
                ACCOUNTS.Add(item);
            }
        }
        public class Account
        {
            [DataMember]
            public string ID { get; set; }
            [DataMember]
            public string LOGIN { get; set; }
            [DataMember]
            public string TOKEN_ID { get; set; }
            [DataMember]
            public string DEVICE_ID { get; set; }
            [DataMember]
            public string CITY { get; set; }
            [DataMember]
            public string ADDRESS { get; set; }
        }

        [DataContract]
        public class OneAcc : Simple
        {
            [DataMember]
            public string LOGIN { get; set; }
            [DataMember]
            public string TOKEN_ID { get; set; }

        }
        [DataContract]
        public class PaymentBill : Simple
        {
            [DataMember]
            public string LS { get; set; }
            [DataMember]
            public string MONTH { get; set; }
            [DataMember]
            public string ONBEGIN { get; set; }
            [DataMember]
            public string SUMM { get; set; }
            [DataMember]
            public string ONEND { get; set; }
        }

        public class Pass2
        {
            public string ID { get; set; }
            [DataMember]
            public string LS { get; set; }
            [DataMember]
            public string TOKEN_ID { get; set; }
            [DataMember]
            public string PASS_TYPE { get; set; }
            [DataMember]
            public string PERIOD_START { get; set; }
            [DataMember]
            public string PERIOD_END { get; set; }
            [DataMember]
            public string PERIOD { get; set; }
            [DataMember]
            public string CAR_MODEL { get; set; }
            [DataMember]
            public string CAR_NUMBER { get; set; }
            [DataMember]
            public string FIO { get; set; }
            [DataMember]
            public string PHONE { get; set; }
            [DataMember]
            public string COMMENT { get; set; }
        }
        [DataContract(Name = "PassDC")]
        public class OnePass
        {
            [DataMember]
            public string tokenID { get; set; }
            [DataMember]
            public string login { get; set; }
            [DataMember]
            public string PERSON_CAR { get; set; }
            [DataMember]
            public string NAME { get; set; }
            [DataMember]
            public string CAR_MODEL { get; set; }
            [DataMember]
            public string CAR_NUMBER { get; set; }
            [DataMember]
            public string PARKING_TYPE { get; set; }
            [DataMember]
            public string CAR_PARKING_NUMBER { get; set; }
            [DataMember]
            public string CAR_TYPE { get; set; }
            [DataMember]
            public string phone { get; set; }            
        }
        [DataContract(Name = "PassRequestDC")]
        public class PassRequest
        {
            [DataMember]
        public string tokenID { get; set; }
        [DataMember]
        public string login { get; set; }
        [DataMember]
        public string STATUS { get; set; }
        [DataMember]
        public string AUTHOR { get; set; }
        [DataMember]
        public string OBJECT { get; set; }
        [DataMember (IsRequired = false)]
        public string ROOM { get; set; }
        [DataMember]
        public string CLIENT { get; set; }
        [DataMember]
        public string phone { get; set; }
        [DataMember]
        public string comment { get; set; }
        [DataMember]
        public string FILES { get; set; }
        [DataMember]
        public string PASS_FOR { get; set; }
        [DataMember]
        public string PASS_TYPE { get; set; }
        [DataMember]
        public string DATE_FROM { get; set; }
        [DataMember]
        public string DATE_TO { get; set; }
        [DataMember]
        //public List<OnePass> PASSES { get; set; }
        public List<OnePass> PASSES = new List<OnePass>();
        }

        [DataContract(Name = "NewPassRequestAddedDC")]
        public class NewPassAdded
        {
            [DataMember]
            public string Result { get; set; }
            [DataMember]
            public string ErrNo { get; set; }
            [DataMember]
            public string ErrMsg { get; set; }
            [DataMember]
            public string ID { get; set; }
            [DataMember]
            public string COUNT { get; set; }
        }



        [DataContract(Name = "PassResponseDC")]
        public class PassResponse : PassRequest
        {
            [DataMember]
            public string Result { get; set; }
            [DataMember]
            public string ErrNo { get; set; }
            [DataMember]
            public string ErrMsg { get; set; }
            [DataMember]
            public string ID { get; set; }
            [DataMember]
            public string CRDATE { get; set; }
        //[DataMember]
        //public List<OnePass> PASSES = new List<OnePass>();
        public void AddData(OnePass item)
            {
                PASSES.Add(item);
            }
        }


        [DataContract]
        public class Service
        {
            [DataMember]
            public string kGUID { get; set; }
            [DataMember]
            public string WORK_KIND { get; set; }
            [DataMember]
            public string VISIBLE { get; set; }
        }
        [DataContract(Name = "ServiceListDC")]
        public class ServiceList
        {
            [DataMember]
            public string Result { get; set; }
            [DataMember]
            public string ErrNo { get; set; }
            [DataMember]
            public string ErrMsg { get; set; }
            [DataMember]
            public List<Service> SERVICES = new List<Service>();

            public void AddData(Service item)
            {
                SERVICES.Add(item);
            }
        }

        [DataContract(Name = "ProfileDC")]
        public class Profile
        {
            [DataMember]
            public string Result { get; set; }
            [DataMember]
            public string ErrNo { get; set; }
            [DataMember]
            public string ErrMsg { get; set; }
            [DataMember]
            public string ID { get; set; }
            [DataMember]
            public string FIO { get; set; }
            [DataMember]
            public string ADDRESS { get; set; }
            [DataMember]
            public string ROOM { get; set; }
            [DataMember]
            public string EMAIL { get; set; }
            [DataMember]
            public string PHONE_NUMBER { get; set; }
            [DataMember]
            public string LOGIN { get; set; }
            [DataMember]
            public string TOKENID { get; set; }
        }

        [DataContract(Name = "Profile2DC")]
        public class Profile2
        {
            [DataMember]
            public string Result { get; set; }
            [DataMember]
            public string ErrNo { get; set; }
            [DataMember]
            public string ErrMsg { get; set; }
            [DataMember]
            public string ID { get; set; }
            [DataMember]
            public string FIO { get; set; }
            [DataMember]
            public string ADDRESS { get; set; }
            [DataMember]
            public string ROOM { get; set; }
            [DataMember]
            public string EMAIL { get; set; }
            [DataMember]
            public string PHONE_NUMBER { get; set; }
            [DataMember]
            public string PHOTO { get; set; }
            [DataMember]
            public string LOGIN { get; set; }
            [DataMember]
            public string TOKENID { get; set; }
        }
    [DataContract(Name = "Profile3DC")]
    public class Profile3
    {
        [DataMember]
        public string Result { get; set; }
        [DataMember]
        public string ErrNo { get; set; }
        [DataMember]
        public string ErrMsg { get; set; }
        [DataMember]
        public string ID { get; set; }
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public string Object_name { get; set; }
        [DataMember]
        public string Flatno { get; set; }
        [DataMember]
        public string EMAIL { get; set; }
        [DataMember]
        public string phone { get; set; }
        [DataMember]
        public string photo { get; set; }
        [DataMember]
        public string login { get; set; }
        [DataMember]
        public string tokenId { get; set; }
    }


    [DataContract(Name = "OneServiceDC")]
        public class OneRequest
        {
            [DataMember]
            public string Result { get; set; }
            [DataMember]
            public string ErrNo { get; set; }
            [DataMember]
            public string ErrMsg { get; set; }
            [DataMember]
            public string NUMBER { get; set; }
            [DataMember]
            public string ID { get; set; }
            [DataMember]
            public string AUTHOR { get; set; }
            [DataMember]
            public string OBJECT { get; set; }
            [DataMember]
            public string ROOM { get; set; }
            [DataMember]
            public string CLIENT { get; set; }
            [DataMember]
            public string PHONE_NUMBER { get; set; }
            [DataMember]
            public string WORK_KIND { get; set; }
            [DataMember]
            public string WORK_DESCR { get; set; }
            [DataMember]
            public string COMMENT { get; set; }
            [DataMember]
            public string CRDATE { get; set; }

        }
        [DataContract(Name = "RequestListDC")]
        public class RequestData
        {
            [DataMember]
            public string Result { get; set; }
            [DataMember]
            public string ErrNo { get; set; }
            [DataMember]
            public string ErrMsg { get; set; }
            [DataMember]
            public List<Request> REQUESTS = new List<Request>();

            public void AddData(Request item)
            {
                REQUESTS.Add(item);
            }
        }
        [DataContract(Name = "ServiceDC")]
        public class Request
        {
            [DataMember]
            public string NUMBER { get; set; }
            [DataMember]
            public string ID { get; set; }
            [DataMember]
            public string AUTHOR { get; set; }
            [DataMember]
            public string OBJECT { get; set; }
            [DataMember]
            public string ROOM { get; set; }
            [DataMember]
            public string CLIENT { get; set; }
            [DataMember]
            public string STATUS { get; set; }
            [DataMember]
            public string STATUS_ID { get; set; }
            [DataMember]
            public string STATUS_NAME { get; set; }
            [DataMember]
            public string PHONE_NUMBER { get; set; }
            [DataMember]
            public string WORK_CAT { get; set; }
            [DataMember]
            public string WORK_KIND { get; set; }
            [DataMember]
            public string WORK_DESCR { get; set; }
            [DataMember]
            public string COMMENT { get; set; }
            [DataMember]
            public string CRDATE { get; set; }
            [DataMember]
            public string DESTINATION { get; set; }
            [DataMember]
            public string WORKDATE { get; set; }
            [DataMember]
            public string WORKBEGIN { get; set; }
            [DataMember]
            public string WORKEND { get; set; }
            [DataMember]
            public string FILES { get; set; }
            [DataMember]
            public string CUSTOM { get; set; }

        }
       
        [DataContract(Name = "PaymentsDC")]
        public class Payments
        {
            [DataMember]
            public string Result { get; set; }
            [DataMember]
            public string ErrNo { get; set; }
            [DataMember]
            public string ErrMsg { get; set; }
            [DataMember]
            public List<Payment> PAYMENTS = new List<Payment>();

            public void AddData(Payment item)
            {
                PAYMENTS.Add(item);
            }
        }
        [DataContract(Name = "PaymentDC")]
        public class Payment
        {
            [DataMember]
            public string PERSONAL_ACCOUNT { get; set; }
            [DataMember]
            public string SUMM { get; set; }
            [DataMember]
            public string MONTH_YEAR { get; set; }

        }
        [DataContract(Name = "NewsFeedDC")]
        public class NewsFeed
        {
            [DataMember]
            public string Result { get; set; }
            [DataMember]
            public string ErrNo { get; set; }
            [DataMember]
            public string ErrMsg { get; set; }
            [DataMember]
            public List<News> NEWS = new List<News>();

            public void AddData(News item)
            {
                NEWS.Add(item);
            }
        }
        [DataContract(Name = "NewsDC")]
        public class News
        {
            [DataMember]
            public string ID { get; set; }
            [DataMember]
            public string NAME { get; set; }
            [DataMember]
            public string PREVIEW_TEXT { get; set; }
            [DataMember]
            public string PREVIEW_PICTURE { get; set; }
            [DataMember]
            public string PREVIEW_TEXT_TYPE { get; set; }
            [DataMember]
            public string DATE_CREATE { get; set; }
        }
        [DataContract(Name = "OneNewsDC")]
        public class OneNews
        {
            [DataMember]
            public string Result { get; set; }
            [DataMember]
            public string ErrNo { get; set; }
            [DataMember]
            public string ErrMsg { get; set; }
            [DataMember]
            public string DETAIL_PICTURE { get; set; }
            [DataMember]
            public string DETAIL_TEXT { get; set; }
            [DataMember]
            public string DETAIL_TEXT_TYPE { get; set; }
            [DataMember]
            public string SEARCHABLE_CONTENT { get; set; }
        }

        [DataContract(Name = "QuestionListDC")]
        public class QuestionList
        {
            [DataMember]
            public string Result { get; set; }
            [DataMember]
            public string ErrNo { get; set; }
            [DataMember]
            public string ErrMsg { get; set; }
            [DataMember]
            public List<Question> QUESTIONS = new List<Question>();

            public void AddData(Question item)
            {
                QUESTIONS.Add(item);
            }
        }
        [DataContract(Name = "QuestionDC")]
        public class Question
        {
            [DataMember]
            public string ID { get; set; }
            [DataMember]
            public string TITLE { get; set; }
            [DataMember]
            public string PREVIEW_TEXT { get; set; }
            [DataMember]
            public string PREVIEW_TEXT_TYPE { get; set; }
            [DataMember]
            public string DATE_CREATE { get; set; }
            [DataMember]
            public string UNAME { get; set; }
        }
        [DataContract(Name = "SimpleDC")]
        public class Simple
        {
            [DataMember]
            public string Result { get; set; }
            [DataMember]
            public string ErrNo { get; set; }
            [DataMember]
            public string ErrMsg { get; set; }
        }

        [DataContract(Name = "DomainDataDC")]
        public class DomainData
        {
            [DataMember]
            public string Result { get; set; }
            [DataMember]
            public string ErrNo { get; set; }
            [DataMember]
            public string ErrMsg { get; set; }
            [DataMember]
            public string URL { get; set; }
        }

        public class QuestionWAnswers : Question
        {
            [DataMember]
            public string Result { get; set; }
            [DataMember]
            public string ErrNo { get; set; }
            [DataMember]
            public string ErrMsg { get; set; }
            [DataMember]
            public string DETAIL_TEXT { get; set; }
            [DataMember]
            public List<Answer> ANSWERS = new List<Answer>();

            public void AddData(Answer item)
            {
                ANSWERS.Add(item);
            }
        }

        [DataContract(Name = "AnswerDC")]
        public class Answer
        {
            [DataMember]
            public string ID { get; set; }
            [DataMember]
            public string TITLE { get; set; }
            [DataMember]
            public string DETAIL_TEXT { get; set; }
            [DataMember]
            public string DATE_CREATE { get; set; }
            [DataMember]
            public string UNAME { get; set; }
        }
    }