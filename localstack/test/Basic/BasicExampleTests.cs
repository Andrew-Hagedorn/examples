using System;
using System.Net.Http;
using Xunit;
using FluentAssertions;
using System.Net;
using System.Text.Json;

namespace IntegrationTests.Basic
{
    public class BasicExampleTests
    {
        [Fact]
        public async void ReturnsResultsFromLocalstack()
        {
            var client = new HttpClient();
            var response = await client.GetAsync("http://localhost:5000/localstack-examples/works");

            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var contents = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<LocalStackWorksResult>(contents);

            result.Should().BeEquivalentTo(new LocalStackWorksResult{
                Contents = new LocalStackStatus {
                    Status = "running"
                },
                StatusCode = 404,
            });
        }
    }
}

