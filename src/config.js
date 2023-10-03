const app = {
  name: "Konfigurasi Website",
  fullname: "Landing Page EPC",
  company: "EPC Energy Singapore",
  guide: "#",
  site: "#",
  code: "#",
  logo: {
    sm: "./static/img/logo/240x240.png",
    md: "./static/img/logo/480x480.png",
    lg: "./static/img/logo/720x720.png"
  },
  server: {
    local: "http://127.0.0.1:8000/api/",
    stagging: "/api/",
    development: "http://127.0.0.1:8000/api/",
    production: "/api/",
    demo: "/api/"
  },
  sso: {
    stagging: "http://127.0.0.1:8000/api/",
    development: "http://127.0.0.1:8000/api/",
    production: "#",
    demo: "http://127.0.0.1:8000/api/"
  },
  download: {
    android: "http://play.google.com/store/",
    ios: "http://www.apple.com/id/app-store/"
  },
  options: {
    allowRegister: false,
    forgetPassword: false,
    autofill: false,
    myAction: false,
    asideRight: false,
    sso: false
  }
};

// =========================================================
// File CUSTOM Variable SCSS
// static\assets\sass\components\_variables.demo.scss
// =========================================================

export default app;
