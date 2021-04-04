using Microsoft.Owin;
using Owin;
[assembly:OwinStartup(typeof(Kvorum_App.Startup))]
namespace Kvorum_App
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}