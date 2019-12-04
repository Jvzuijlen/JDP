using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JusDanceProjects.API.Data;
using JusDanceProjects.API.Models;
using Microsoft.AspNetCore.Authorization;

namespace JusDanceProjects.MVC.Controllers
{
    [Authorize]
    public class PhotosController : Controller
    {
        private readonly IMiscRepository _repo;

        public PhotosController(IMiscRepository repo)
        {
            _repo = repo;
        }

        // GET: Photos
        public IActionResult Index()
        {
            return View(_repo.GetPhotos());
        }

        // GET: Photos/Details/5
        public IActionResult Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var photo = _repo.GetPhoto((int)id);

            if (photo == null)
            {
                return NotFound();
            }

            return View(photo);
        }

        // GET: Photos/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Photos/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create([Bind("Id,Url,Description,DateAdded")] Photo photo)
        {
            if (ModelState.IsValid)
            {
                _repo.SavePhoto(photo);
                return RedirectToAction(nameof(Index));
            }
            return View(photo);
        }

        // GET: Photos/Edit/5
        public IActionResult Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var photo = _repo.GetPhoto((int)id);
            if (photo == null)
            {
                return NotFound();
            }
            return View(photo);
        }

        // POST: Photos/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, [Bind("Id,Url,Description,DateAdded")] Photo photo)
        {
            if (id != photo.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _repo.SavePhoto(photo);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PhotoExists(photo.Id))
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
            return View(photo);
        }

        // GET: Photos/Delete/5
        public IActionResult Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var photo = _repo.GetPhoto((int)id);
            if (photo == null)
            {
                return NotFound();
            }

            return View(photo);
        }

        // POST: Photos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            _repo.DeletePhoto(id);

            return RedirectToAction(nameof(Index));
        }

        private bool PhotoExists(int id)
        {
            var photos = _repo.GetPhotos();
            return photos.Any(e => e.Id == id);
        }
    }
}
