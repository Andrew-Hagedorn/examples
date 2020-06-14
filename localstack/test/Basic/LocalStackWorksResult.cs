using System.Text.Json.Serialization;

namespace IntegrationTests.Basic
{
    public class LocalStackStatus
    {
        [JsonPropertyName("status")]
        public string Status { get; set; }
    }

    public class LocalStackWorksResult
    {
        [JsonPropertyName("statusCode")]
        public int StatusCode {get; set;}

        [JsonPropertyName("contents")]
        public LocalStackStatus Contents {get; set;}
    }
}

