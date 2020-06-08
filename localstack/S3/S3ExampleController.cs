using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Amazon.S3;
using Amazon.S3.Model;

namespace LocalStackExamples.S3
{
    [Route("localstack-examples/s3/")]
    [ApiController]
    public class S3ExampleController : Controller
    {
        private readonly IAmazonS3 _s3Client;

        public S3ExampleController(IAmazonS3 s3Client) { 
            _s3Client = s3Client;
        }

        [HttpGet("get-file")]      
        public Task<JsonResult> GetFile() {
            return Task.FromResult(Json(new { ok = true }));
        }

        [HttpPost("add-file")]      
        public async Task<OkObjectResult> AddText([FromBody] FilePostData file) {
            var result = await _s3Client.PutObjectAsync(new PutObjectRequest
            {
                BucketName = "example-bucket",
                Key = file.FileName,
                ContentBody = file.Text,
    
            });

            return Ok(new { result });
        }
    }
}