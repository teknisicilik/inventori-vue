const module = {
  config: {
    name: "Konfigurasi Data Master",
    icon: 'ri-database-line',
    desc: "Pengelolaan Data Master",
    layout: true
  },
  routes: [
    {
      name: "blog-category",
      label: "Kategori Berita",
      icon: "ri-database-2-fill",
      path: "/blog-category",
      component: () => import("./blog-category/blog-category.vue")
    },
    {
      name: "career-category",
      label: "Kategori Karir",
      icon: "ri-database-2-fill",
      path: "/career-category",
      component: () => import("./career-category/career-category.vue")
    }
  ]
}
export default module
