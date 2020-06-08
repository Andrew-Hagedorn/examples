using System;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LocalStackExamples
{
    [Route("localstack-examples/")]
    [ApiController]
    public class LocalStackExampleController : Controller
    {
        private readonly IHttpClientFactory _clientFactory;

        public LocalStackExampleController(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        [HttpGet("works")]      
        public async Task<JsonResult> GetFile() {
            var result = await _clientFactory
                .CreateClient()
                .GetAsync("http://localhost:4566");

            var contents = await result.Content.ReadAsStringAsync();
            var deserialized = JsonSerializer.Deserialize<dynamic>(contents);

            return Json(new {
                contents = deserialized,
                statusCode = result.StatusCode
            });
        }
    }
}