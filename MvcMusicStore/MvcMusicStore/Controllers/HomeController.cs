using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcMusicStore.Models;

namespace MvcMusicStore.Controllers
{
    public class HomeController : Controller
    {
        private MusicStoreEntities storeDB = new MusicStoreEntities();
        public ActionResult Index()
        {
            var albums = GetTopSellingAlbums(10);
            return View(albums);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        private List<Album> GetTopSellingAlbums(int count)
        {
            return storeDB.Albums.OrderByDescending(a => a.OrderDetails.Count()).Take(count).ToList();
        }
    }
}