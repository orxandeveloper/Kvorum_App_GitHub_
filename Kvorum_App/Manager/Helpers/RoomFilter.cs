using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kvorum_App.Manager.Helpers
{
    public class RoomFilter
    {
        //public string ROOM_FOR_ID { get; set; }
        //public int ROOM_TYPE_ID { get; set; }
        //public string ROOM_NUMBER { get; set; }
        //public string FIRST_NAME { get; set; }
        //public string NUMBER { get; set; }
        public List<Rooms> RM_FOR { get; set; }
        public List<Rooms> RM_TYPE { get; set; }
        public List<Rooms> RM_NUMBER { get; set; }
        public string  FIRST_NAME { get; set; }
        public string NUMBER { get; set; }
    }
}