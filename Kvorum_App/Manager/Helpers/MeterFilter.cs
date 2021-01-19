using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kvorum_App.Manager.Helpers
{
    public class MeterFilter
    {
        public List<METERS> RM_TYPE { get; set; }
        public List<METERS> M_TYPE { get; set; }
        public string ROOM_NUMBER { get; set; }
        public string NUMBER { get; set; }
        public string  METER_NUMBER { get; set; }
    }
}