using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kvorum_App.Manager.Helpers
{
    public class AccountDatas_Base
    {
        public string  ENTRANCE { get; set; }
        public string NUMBER { get; set; }
        public string FLOOR { get; set; }
        public int OWNERSHIP_TYPE_ID { get; set; }
        public List<AccountDatas> A_D { get; set; }
        public string LIVE_SQUARE { get; set; }
        public string GEN_SQUARE { get; set; }
        public string WITHOUT_SUMMER_SQUARE { get; set; }
        public string ROOM_QUANT { get; set; }
        public string  ID { get; set; }

    }
}