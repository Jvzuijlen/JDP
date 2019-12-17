using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JusDanceProjects.API.Data;
using JusDanceProjects.API.Models;
using JusDanceProjects.MVC.Controllers;
using JusDanceProjects.MVC.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace JusDanceProjects.Test
{
    public class MVCDanceTest
    {
        [Fact]
        public async void TestIndexMethod_ReturnViewWithObjects()
        {
            // Arrange
            var mockDanceRepo = new Mock<IDanceRepository>();

            mockDanceRepo.Setup(repo => repo.GetDanceCourseTypes())
                .Returns(Task.FromResult(DataTestService.GetTestCoursesList()));

            var controller = new DanceCourseTypesController(mockDanceRepo.Object);

            // Act
            var result = await controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.NotNull(viewResult);

            var model = Assert.IsAssignableFrom<List<DanceCourseTypeVM>>(viewResult.ViewData.Model);
            Assert.Equal(2, model.Count);
        }

        [Fact]
        public async void TestCreatePostMethod_ReturnsViewWithObjects_WhenModelStateIsInvalid()
        {
            // Arrange
            var mockRepo = new Mock<IDanceRepository>();
            var controller = new DanceCourseTypesController(mockRepo.Object);

            controller.ModelState.AddModelError("Title", "Required");
            var courseTypeVM = new DanceCourseTypeVM() { Title = "", Description = "CourseType Description" };

            // Act
            var result = await controller.Create(courseTypeVM);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<DanceCourseTypeVM>(viewResult.ViewData.Model);
            Assert.IsType<DanceCourseTypeVM>(model);
        }

        [Fact]
        public async void TestCreatePostMethod_SaveThroughRepository_WhenModelStateIsValid()
        {
            // Arrange
            var mockRepo = new Mock<IDanceRepository>();
            mockRepo.Setup(repo => repo.SaveDanceCourseType(It.IsAny<DanceCourseType>()))
                .Returns(Task.CompletedTask)
                .Verifiable();
            var controller = new DanceCourseTypesController(mockRepo.Object);
            DanceCourseTypeVM s = new DanceCourseTypeVM()
            {
                Title = "Hiphop",
                Description = "A description"
            };

            // Act
            var result = await controller.Create(s);

            // Assert
            var redirectToActionResult = Assert.IsType<RedirectToActionResult>(result);
            Assert.Null(redirectToActionResult.ControllerName);
            Assert.Equal("Index", redirectToActionResult.ActionName);
            mockRepo.Verify();
        }
    }
}