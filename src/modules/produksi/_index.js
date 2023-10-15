const module = {
  config: {
    name: "Produksi Barang",
    icon: "ri-donut-chart-fill",
    desc: "Konfigurasi Data Produksi Barang",
    layout: true
  },
  routes: [
    {
      name: "produksi",
      label: "Produksi Barang",
      icon: "ri-stack-line",
      path: "/produksi",
      component: () => import("./produksi.vue")
    },
    {
      name: "produksi detail",
      label: "Detail Produksi",
      icon: "ri-stack-line",
      path: "/produksi-detail",
      component: () => import("./produksi-detail.vue")
    }
  ]
}
export default module
