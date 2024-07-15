import HalamanLogin from "../views/auth/Login.vue";
import HalamanDashboardAdmin from "../views/admin/Dashboard.vue"
import HalamanDashboardSiswa from "../views/siswa/Dashboard.vue";

const routes = [
    {
        path: "/",
        name: "Halaman Login",
        component: HalamanLogin,
        meta: {
            title: "Halaman Login"
        }
    },
    {
        path: "/admin/",
        children: [
            {
                path: "dashboard",
                name: "Dashboard Admin",
                component: HalamanDashboardAdmin,
                meta: {
                    title: "Dashboard Admin"
                }
            }
        ]
    },
    {
        path: "/siswa/",
        children: [
            {
                path: "dashboard",
                name: "Dashboard Siswa",
                component: HalamanDashboardSiswa,
                meta: {
                    title: "Dashboard Siswa"
                }
            }
        ]
    }
];

export default routes;