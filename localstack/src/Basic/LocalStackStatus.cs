using System.Text.Json.Serialization;

namespace LocalStackExamples.Basic
{
    public class LocalStackStatus
    {
        [JsonPropertyName("status")]
        public string Status { get; set; }
    }
}