const module = {
  config: {
    name: "Data Master",
    icon: "ri-shield-star-line",
    desc: "Konfigurasi master data untuk transaksi",
    layout: true
  },
  routes: [
    {
      name: "kategori-barang",
      label: "Kategori Barang",
      icon: "ri-stack-line",
      path: "/kategori-barang",
      component: () => import("./kategori-barang/kategori-barang.vue")
    },
    {
      name: "barang",
      label: "Barang",
      icon: "ri-stack-line",
      path: "/barang",
      component: () => import("./barang/barang.vue")
    }
  ]
}
export default module
