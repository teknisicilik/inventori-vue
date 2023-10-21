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
    },
    {
      name: "batal produksi",
      label: "Produksi Dibatalkan",
      icon: "ri-stack-line",
      path: "/batal-produksi",
      component: () => import("./batal-produksi.vue")
    }
    // {
    //   name: "batal produksi detail",
    //   label: "Detail Produksi Dibatalkan",
    //   icon: "ri-stack-line",
    //   path: "/batal-detail",
    //   component: () => import("./batal-detail.vue")
    // }
  ]
}
export default module
