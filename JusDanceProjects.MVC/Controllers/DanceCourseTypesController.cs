using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using JusDanceProjects.API.Data;
using JusDanceProjects.API.Models;
using JusDanceProjects.MVC.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace JusDanceProjects.MVC.Controllers
{
    [Authorize]
    public class DanceCourseTypesController : Controller
    {
        private readonly IDanceRepository _repo;

        public DanceCourseTypesController(IDanceRepository repo)
        {
            _repo = repo;
        }

        // GET: DanceCourseTypes
        public async Task<IActionResult> Index()
        {
            var courses = await _repo.GetDanceCourseTypes();
            List<DanceCourseTypeVM> courseList = new List<DanceCourseTypeVM>();
            foreach(DanceCourseType course in courses)
            {
                courseList.Add(ViewModelCreator.IndexDanceCourseTypeVM(course));
            }

            return View(courseList);
        }

        // GET: DanceCourseTypes/Details/5
        public IActionResult Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var danceCourseType = _repo.GetDanceCourseType((int)id);
            if (danceCourseType == null)
            {
                return NotFound();
            }

            return View(danceCourseType);
        }

        // GET: DanceCourseTypes/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: DanceCourseTypes/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Title,Description,Visible,PhotoUrl")] DanceCourseTypeVM danceCourseTypeVM)
        {
            if (ModelState.IsValid)
            {
                Photo photo = null;

                if (danceCourseTypeVM.PhotoUrl != null)
                {
                    photo = new Photo() { Url = danceCourseTypeVM.PhotoUrl, DateAdded = DateTime.Now };
                }

                DanceCourseType danceCourse = new DanceCourseType()
                {
                    Title = danceCourseTypeVM.Title,
                    Description = danceCourseTypeVM.Description,
                    Visible = danceCourseTypeVM.Visible,
                    Photo = photo
                };

                await _repo.SaveDanceCourseType(danceCourse);
                return RedirectToAction(nameof(Index));
            }
            return View(danceCourseTypeVM);
        }

        // GET: DanceCourseTypes/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var danceCourseType = await _repo.GetDanceCourseType((int)id);
            if (danceCourseType == null)
            {
                return NotFound();
            }
            return View(danceCourseType);
        }

        // POST: DanceCourseTypes/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Title,Description,Visible")] DanceCourseType danceCourseType)
        {
            if (id != danceCourseType.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    await _repo.SaveDanceCourseType(danceCourseType);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!await DanceCourseTypeExists(danceCourseType.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(danceCourseType);
        }

        // GET: DanceCourseTypes/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var danceCourseType = await _repo.GetDanceCourseType((int)id);
            if (danceCourseType == null)
            {
                return NotFound();
            }

            return View(danceCourseType);
        }

        // POST: DanceCourseTypes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await _repo.DeleteDanceCourseType(id);
            return RedirectToAction(nameof(Index));
        }

        private async Task<bool> DanceCourseTypeExists(int id)
        {
            var danceCourseTypes = await _repo.GetDanceCourseTypes();
            return danceCourseTypes.Any(e => e.Id == id);
        }
    }
}
