using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kvorum_App.Disp_Admin.Utilities
{
    public class RequestTenant
    {
        public string ACCOUNT_NAME { get; set; }
        public string INDIVIDUAL_ID { get; set; }
        public string OBJECT_ID { get; set; }
        public string ROOM_T { get; set; }
        public string ROOM_NUMBER { get; set; }
        public string NUMBER { get; set; }
        public string FIRST_NAME { get; set; }
        public string PHONE { get; set; }
        public int  SERVICE_GROUP_ID{ get; set; }
        public string REQUEST_TEXT { get; set; }//,,,
        public bool EMERGENCY_TREATMENT { get; set; }
        public bool PAYMENT { get; set; }
        public string PLAN_END_DATE { get; set; }
        public string PLAN_END_TIME { get; set; }
        public string TOTAL_COST { get; set; }
        public int SPECIALIST_ID { get; set; }
        public string MOBILE_NUMBER { get; set; }
        public string STATUS { get; set; }
        public string RESPONSIBLE_ID { get; set; }

    }
}