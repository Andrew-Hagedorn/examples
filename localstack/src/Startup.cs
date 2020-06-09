using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Amazon.S3;

namespace LocalStackExamples
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IWebHostEnvironment env) {
            Configuration = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables()
                .Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpClient();
            services.AddControllers();

            var options = Configuration.GetAWSOptions();
            services.AddDefaultAWSOptions(options);

            var config = new AmazonS3Config{
                ServiceURL = options.DefaultClientConfig.ServiceURL,
                ForcePathStyle = true
            };
            var client = new AmazonS3Client(config);
            services.AddSingleton<IAmazonS3, AmazonS3Client>(s => client);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting(); 
            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }
    }
}
