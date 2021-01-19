using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kvorum_App.Super_Disp.Helpers
{
    public class ProductService_
    {
        public int SERVICE_ID { get; set; }
        public string SERVICE_NAME { get; set; }
        public string SERVICE_TYPE_NAME { get; set; }
        public int DISCRIPTION { get; set; }
        public string COST { get; set; }
        public bool QUANTITY_IS { get; set; }
        public int SERVICE_TYPE_ID { get; set; }
        public int RESPONSE_TIME_ID { get; set; }
        public int DELIVERY_TYPE_ID { get; set; }
        public int COST_TYPE_ID { get; set; }
        public int RESERVATION_TYPE_ID { get; set; }
        public int R_TERM_LIMIT_ID { get; set; }
        public decimal QUANTITY { get; set; }
        public string SERVICE_GUID { get; set; }
    }
}