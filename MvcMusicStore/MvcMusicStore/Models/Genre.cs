using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcMusicStore.Models
{
    /// <summary>
    /// 类型
    /// </summary>
    public class Genre
    {
        public int GenreId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Album> Albums { get; set; }
    }
}