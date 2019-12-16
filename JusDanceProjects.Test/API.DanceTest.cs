using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JusDanceProjects.API;
using JusDanceProjects.API.Controllers;
using JusDanceProjects.API.Data;
using JusDanceProjects.API.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace JusDanceProjects.Test
{
    public class DanceTest
    {
        [Fact]
        public async void TestGetDanceCourseTypesMethodReturnObjects()
        {
            // Arrange
            var mockRepo = new Mock<IDanceRepository>();

            mockRepo.Setup(repo => repo.GetDanceCourseTypes())
                .Returns(Task.FromResult(DataTestService.GetTestCoursesList()));

            var controller = new DanceController(mockRepo.Object);

            // Act
            var result = await controller.GetDanceCourseTypes();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);

            var model = Assert.IsAssignableFrom<List<DanceCourseType>>(okResult.Value);
            Assert.Equal(2, model.Count);
        }
    }
}
