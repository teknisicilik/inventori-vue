const module = {
  config: {
    name: "Pemasukan Barang",
    icon: "ri-inbox-archive-line",
    desc: "Konfigurasi Data Pemasukan Barang",
    layout: true
  },
  routes: [
    {
      name: "pemasukan",
      label: "Pemasukan Barang",
      icon: "ri-stack-line",
      path: "/pemasukan",
      component: () => import("./pemasukan.vue")
    },
    {
      name: "pemasukan detail",
      label: "Detail Pemasukan",
      icon: "ri-stack-line",
      path: "/pemasukan-detail",
      component: () => import("./pemasukan-detail.vue")
    }
  ]
}
export default module
