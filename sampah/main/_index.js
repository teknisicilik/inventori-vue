const module = {
  config: {
    name: "Konfigurasi Landing",
    icon: 'ri-shield-star-line',
    desc: "Konfigurasi Laman Landing EPC Energy Singapore",
    layout: true
  },
  routes: [
    {
      name: "home",
      label: "Beranda",
      icon: "ri-stack-line",
      path: "/home",
      component: () => import("./home/home.vue")
    },
    {
      name: "project",
      label: "Proyek",
      icon: "ri-community-line",
      path: "/project",
      component: () => import("./project/project.vue")
    },
    // {
    //   name: "report",
    //   label: "Laporan Perusahaan",
    //   icon: "ri-file-list-3-line",
    //   path: "/report",
    //   component: () => import("./report/report.vue")
    // },
    {
      name: "blog",
      label: "Berita",
      icon: "ri-book-2-line",
      path: "/blog",
      component: () => import("./blog/blog.vue")
    },
    // {
    //   name: "career",
    //   label: "Karir",
    //   icon: "ri-suitcase-line",
    //   path: "/career",
    //   component: () => import("./career/career.vue")
    // },
    {
      name: "about",
      separator: "Profil Perusahaan",
      label: "Sekilas EPC Singapore",
      icon: "ri-profile-line",
      path: "/about",
      component: () => import("./about/about.vue")
    },
    {
      name: "visi",
      separator: "Profil Perusahaan",
      label: "Visi Perusahaan",
      icon: "ri-profile-line",
      path: "/visi",
      component: () => import("./visi/visi.vue")
    },
    {
      name: "misi",
      separator: "Profil Perusahaan",
      label: "Misi Perusahaan",
      icon: "ri-profile-line",
      path: "/misi",
      component: () => import("./misi/misi.vue")
    },
    {
      name: "tata-nilai",
      separator: "Profil Perusahaan",
      label: "Tata Nilai Perusahaan",
      icon: "ri-profile-line",
      path: "/tata-nilai",
      component: () => import("./corporate-value/corporate-value.vue")
    },
    {
      name: "organization-structure",
      separator: "Profil Perusahaan",
      label: "Struktur Organisasi",
      icon: "ri-profile-line",
      path: "/organization-structure",
      component: () =>
        import("./organization-structure/organization-structure.vue")
    },
    // {
    //   name: "iso",
    //   separator: "Profil Perusahaan",
    //   label: "Standar Internasional",
    //   icon: "ri-profile-line",
    //   path: "/iso",
    //   component: () => import("./iso/iso.vue")
    // },
    // {
    //   name: "csr",
    //   separator: "Profil Perusahaan",
    //   label: "Tanggung Jawab Sosial",
    //   icon: "ri-profile-line",
    //   path: "/csr",
    //   component: () => import("./csr/csr.vue")
    // },
    // {
    //   name: "gcg",
    //   separator: "Profil Perusahaan",
    //   label: "Tata Kelola Perusahaan",
    //   icon: "ri-profile-line",
    //   path: "/gcg",
    //   component: () => import("./gcg/gcg.vue")
    // },
    // {
    //   name: "subsidiary-company",
    //   separator: "Profil Perusahaan",
    //   label: "Anak Perusahaan",
    //   icon: "ri-profile-line",
    //   path: "/subsidiary-company",
    //   component: () => import("./subsidiary-company/subsidiary-company.vue")
    // },
    // {
    //   name: "honor",
    //   separator: "Profil Perusahaan",
    //   label: "Penghargaan",
    //   icon: "ri-profile-line",
    //   path: "/honor",
    //   component: () => import("./honor/honor.vue")
    // },
    {
      name: "footer",
      separator: "Konfigurasi Lainnya",
      label: "Footer",
      icon: "ri-layout-bottom-line",
      path: "/footer",
      component: () => import("./footer/footer.vue")
    },
    {
      name: "blog-category",
      separator: "Konfigurasi Lainnya",
      label: "Kategori Berita",
      icon: "ri-database-2-fill",
      path: "/blog-category",
      component: () => import("./../master/blog-category/blog-category.vue")
    }
    // {
    //   name: "career-category",
    //   separator: "Konfigurasi Lainnya",
    //   label: "Kategori Karir",
    //   icon: "ri-database-2-fill",
    //   path: "/career-category",
    //   component: () => import("./../master/career-category/career-category.vue")
    // }
  ]
}
export default module
