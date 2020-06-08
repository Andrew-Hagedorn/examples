using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Amazon.S3;
using System.Text.Json.Serialization;

namespace LocalStackExamples.S3
{
    public class FilePostData
    {
        [JsonPropertyName("file_name")]
        public string FileName { get; set; }

        [JsonPropertyName("text")]
        public string Text { get; set; }
    }
}