using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using JusDanceProjects.API.Data;
using JusDanceProjects.API.Models;
using Microsoft.AspNetCore.Authorization;
using JusDanceProjects.MVC.Models.ViewModels;

namespace JusDanceProjects.MVC.Controllers
{
    [Authorize]
    public class DanceCoursesController : Controller
    {
        private readonly IDanceRepository _danceRepository;
        private readonly IUserRepository _userRepository;

        public DanceCoursesController(IDanceRepository danceRepository, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _danceRepository = danceRepository;
        }

        // GET: DanceCourses
        public async Task<IActionResult> Index()
        {
            var courses = await _danceRepository.GetDanceCourses();

            return View(courses);
        }

        // // GET: DanceCourses/Details/5
        // public async Task<IActionResult> Details(int? id)
        // {
        //     if (id == null)
        //     {
        //         return NotFound();
        //     }

        //     var danceCourse = await _context.DanceCourses
        //         .Include(d => d.DanceCourseType)
        //         .FirstOrDefaultAsync(m => m.Id == id);
        //     if (danceCourse == null)
        //     {
        //         return NotFound();
        //     }

        //     return View(danceCourse);
        // }

        // GET: DanceCourses/Create
        public async Task<IActionResult> Create()
        {
            ViewData["DanceCourseTypeId"] = new SelectList(await _danceRepository.GetDanceCourseTypes(), "Id", "Title");
            ViewData["TeacherId"] = new SelectList(await _userRepository.GetUsers(), "Id", "FirstName");
            return View();
        }

        // POST: DanceCourses/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Location,DanceCourseTypeId,TeacherId")] DanceCourse danceCourse)
        {
            if (ModelState.IsValid)
            {
                await _danceRepository.SaveDanceCourse(danceCourse);
                return RedirectToAction(nameof(Index));
            }

            ViewData["DanceCourseTypeId"] = new SelectList(await _danceRepository.GetDanceCourseTypes(), "Id", "Title");
            ViewData["TeacherId"] = new SelectList(await _userRepository.GetUsers(), "Id", "FirstName");
            return View(danceCourse);
        }

        // // GET: DanceCourses/Edit/5
        // public async Task<IActionResult> Edit(int? id)
        // {
        //     if (id == null)
        //     {
        //         return NotFound();
        //     }

        //     var danceCourse = await _context.DanceCourses.FindAsync(id);
        //     if (danceCourse == null)
        //     {
        //         return NotFound();
        //     }
        //     ViewData["DanceCourseTypeId"] = new SelectList(_context.DanceCourseTypes, "Id", "Id", danceCourse.DanceCourseTypeId);
        //     return View(danceCourse);
        // }

        // // POST: DanceCourses/Edit/5
        // // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        // [HttpPost]
        // [ValidateAntiForgeryToken]
        // public async Task<IActionResult> Edit(int id, [Bind("Id,Location,DanceCourseTypeId")] DanceCourse danceCourse)
        // {
        //     if (id != danceCourse.Id)
        //     {
        //         return NotFound();
        //     }

        //     if (ModelState.IsValid)
        //     {
        //         try
        //         {
        //             _context.Update(danceCourse);
        //             await _context.SaveChangesAsync();
        //         }
        //         catch (DbUpdateConcurrencyException)
        //         {
        //             if (!DanceCourseExists(danceCourse.Id))
        //             {
        //                 return NotFound();
        //             }
        //             else
        //             {
        //                 throw;
        //             }
        //         }
        //         return RedirectToAction(nameof(Index));
        //     }
        //     ViewData["DanceCourseTypeId"] = new SelectList(_context.DanceCourseTypes, "Id", "Id", danceCourse.DanceCourseTypeId);
        //     return View(danceCourse);
        // }

        // GET: DanceCourses/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var danceCourse = await _danceRepository.GetDanceCourse((int)id);

            if (danceCourse == null)
            {
                return NotFound();
            }

            return View(danceCourse);
        }

        // POST: DanceCourses/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await _danceRepository.DeleteDanceCourse(id);
            return RedirectToAction(nameof(Index));
        }

        // private bool DanceCourseExists(int id)
        // {
        //     return _context.DanceCourses.Any(e => e.Id == id);
        // }
    }
}
