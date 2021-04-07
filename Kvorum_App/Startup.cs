using Microsoft.Owin;
using Owin;
[assembly:OwinStartup(typeof(Kvorum_App.Startup))]
namespace Kvorum_App
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            /*'Could not load file or assembly 'Microsoft.Owin.Security, Version=4.0.1.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35' or one of its dependencies. The located assembly's manifest definition does not match the assembly reference.*/
            ConfigureAuth(app);
        }
    }
}