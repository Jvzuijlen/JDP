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

namespace JusDanceProjects.MVC.Controllers
{
    public class DanceCourseTypesController : Controller
    {
        private readonly IDanceRepository _repo;

        public DanceCourseTypesController(IDanceRepository repo)
        {
            _repo = repo;
        }

        // GET: DanceCourseTypes
        public IActionResult Index()
        {
            var courses = _repo.GetDanceCourseTypes();
            List<DanceCourseTypeVM> courseList = new List<DanceCourseTypeVM>();
            foreach(DanceCourseType course in courses)
            {
                courseList.Add(ViewModelCreator.IndexAnimalCatVm(course));
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
        public IActionResult Create([Bind("Id,Title,Description,Visible,Photo.Url,Photo.Description")] DanceCourseType danceCourseType)
        {
            if (ModelState.IsValid)
            {
                _repo.SaveDanceCourseType(danceCourseType);
                return RedirectToAction(nameof(Index));
            }
            return View(danceCourseType);
        }

        // GET: DanceCourseTypes/Edit/5
        public IActionResult Edit(int? id)
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

        // POST: DanceCourseTypes/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, [Bind("Id,Title,Description,Visible")] DanceCourseType danceCourseType)
        {
            if (id != danceCourseType.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _repo.SaveDanceCourseType(danceCourseType);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DanceCourseTypeExists(danceCourseType.Id))
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
        public IActionResult Delete(int? id)
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

        // POST: DanceCourseTypes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            _repo.DeleteDanceCourseType(id);
            return RedirectToAction(nameof(Index));
        }

        private bool DanceCourseTypeExists(int id)
        {
            var danceCourseTypes = _repo.GetDanceCourseTypes();
            return danceCourseTypes.Any(e => e.Id == id);
        }
    }
}
