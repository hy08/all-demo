using MvcMusicStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcMusicStore.Controllers
{
    public class StoreController : Controller
    {
        MusicStoreEntities storeDB = new MusicStoreEntities();
        // GET: Store
        public ActionResult Index()
        {
            var genres = storeDB.Genres.ToList();
            return View(genres);
        }
        //浏览
        public ActionResult Browse(string genre)
        {
            var genreModel = storeDB.Genres.Include("Albums").SingleOrDefault(g => g.Name == genre);
            return View(genreModel);
        }
        //详情,只有方法参数名为id(不区分大小写)，URL自动映射为控制器/方法/参数值

        public ActionResult Details(int id)
        {
            var album = storeDB.Albums.Find(id);
            return View(album);
        }
        [ChildActionOnly]
        public ActionResult GenerMenu()
        {
            var geners = storeDB.Genres.ToList();
            return PartialView(geners);
        }
    }
}