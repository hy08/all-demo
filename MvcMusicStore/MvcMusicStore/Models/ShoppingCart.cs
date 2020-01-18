using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcMusicStore.Models
{
    public class ShoppingCart
    {
        MusicStoreEntities storeDb = new MusicStoreEntities();
        public string ShoppingCartId { get; set; }
        public const string CartSessionKey = "CartId";
        /// <summary>
        /// 通过HTTP请求上下文获取购物车
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public static ShoppingCart GetCart(HttpContextBase context)
        {
            var cart = new ShoppingCart();
            cart.ShoppingCartId = cart.GetCartId(context);
            return cart;
        }
        /// <summary>
        /// 通过控制器获取购物车
        /// </summary>
        /// <param name="controller"></param>
        /// <returns></returns>
        public static ShoppingCart GetCart(Controller controller)
        {
            return GetCart(controller.HttpContext);
        }
        /// <summary>
        /// 增加一张专辑到购物车中
        /// </summary>
        /// <param name="album"></param>
        public void AddToCart(Album album)
        {
            var cartItem = storeDb.Carts.SingleOrDefault(c => c.CartId == ShoppingCartId && c.AlbumId == album.AlbumId);
            if (cartItem == null)
            {
                cartItem = new Cart
                {
                    AlbumId = album.AlbumId,
                    CartId = ShoppingCartId,
                    Count = 1,
                    DateCreated = DateTime.Now
                };
                storeDb.Carts.Add(cartItem);
            }
            else
            {
                cartItem.Count++;
            }
            storeDb.SaveChanges();
        }
        /// <summary>
        /// 删除购物车中具体的商品
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int RemoveFromCart(int id)
        {
            var cartItem = storeDb.Carts.Single(cart => cart.CartId == ShoppingCartId && cart.RecordId == id);
            int itemCount = 0;
            if (cartItem != null)
            {
                if (cartItem.Count > 1)
                {
                    cartItem.Count--;
                    itemCount = cartItem.Count;
                }
                else
                {
                    storeDb.Carts.Remove(cartItem);
                }
                storeDb.SaveChanges();
            }
            return itemCount;
        }
        /// <summary>
        /// 清空HTTP上下文中的购物车中所有商品
        /// </summary>
        public void EmptyCart()
        {
            var cartItems = storeDb.Carts.Where(cart => cart.CartId == ShoppingCartId);
            foreach (var item in cartItems)
            {
                storeDb.Carts.Remove(item);
            }
            storeDb.SaveChanges();
        }
        /// <summary>
        /// 获取购物车中所有商品
        /// </summary>
        /// <returns></returns>
        public List<Cart> GetCartItems()
        {
            return storeDb.Carts.Where(cart => cart.CartId == ShoppingCartId).ToList();
        }
        /// <summary>
        /// 获取购物车中所有商品的数量，相当于所有商品数量求和
        /// </summary>
        /// <returns></returns>
        public int GetCount()
        {
            int? count = (from cartItems in storeDb.Carts
                          where cartItems.CartId == ShoppingCartId
                          select (int?)cartItems.Count).Sum();
            return count ?? 0;
        }
        /// <summary>
        /// 获取购物车中所有商品价格之和
        /// </summary>
        /// <returns></returns>
        public decimal GetTotal()
        {
            decimal? total = (from cartItems in storeDb.Carts
                              where cartItems.CartId == ShoppingCartId
                              select (int?)cartItems.Count * cartItems.Album.Price).Sum();
            return total ?? decimal.Zero;
        }
        /// <summary>
        /// 创建订单详情
        /// </summary>
        /// <param name="order"></param>
        /// <returns></returns>
        public int CreateOrder(Order order)
        {
            decimal orderTotal = 0;
            var cartItems = GetCartItems();
            foreach (var item in cartItems)
            {
                var orderDetail = new OrderDetail()
                {
                    Album = item.Album,
                    OrderId = order.OrderId,
                    UnitPrice = item.Album.Price,
                    Quantity = item.Count
                };
                orderTotal += (item.Count * item.Album.Price);
                storeDb.OrderDetails.Add(orderDetail);
            }
            order.Total = orderTotal;
            storeDb.SaveChanges();
            EmptyCart();
            return order.OrderId;
        }
        /// <summary>
        /// 通过请求上下文获取/设置session，为了将session值赋给ShoppingCartId
        /// </summary>
        /// <param name="context">http上下文</param>
        /// <returns></returns>
        public string GetCartId(HttpContextBase context)
        {
            if (context.Session[CartSessionKey] == null)
            {
                if (!string.IsNullOrWhiteSpace(context.User.Identity.Name))
                {
                    context.Session[CartSessionKey] = context.User.Identity.Name;
                }
                else
                {
                    Guid tempCartId = Guid.NewGuid();
                    context.Session[CartSessionKey] = tempCartId.ToString();
                }
            }
            return context.Session[CartSessionKey].ToString();
        }
        /// <summary>
        /// 将游客的购物车转移给登录进来的顾客
        /// </summary>
        /// <param name="userName"></param>
        public void MigrateCart(string userName)
        {
            var shoppingCart = storeDb.Carts.Where(cart => cart.CartId == ShoppingCartId);
            foreach (var item in shoppingCart)
            {
                item.CartId = userName;
            }
            storeDb.SaveChanges();
        }
    }
}