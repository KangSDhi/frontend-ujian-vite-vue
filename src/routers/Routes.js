import LoginPage from "../views/auth/Login.vue";
import DashboardAdminPage from "../views/admin/Dashboard.vue"
import DashboardSiswaPage from "../views/siswa/Dashboard.vue";
import MataUjianSiswaPage from "../views/siswa/MataUjian.vue";
import MulaiUjianSiswaPage from "../views/siswa/MulaiUjian.vue";
import UjianSiswaPage from "../views/siswa/Ujian.vue";
import SelesaiUjianSiswaPage from "../views/siswa/SelesaiUjian.vue";

const routes = [
    {
        path: "/",
        name: "Login Page",
        component: LoginPage,
        meta: {
            title: "Halaman Login"
        }
    },
    {
        path: "/admin/",
        children: [
            {
                path: "dashboard",
                name: "Dashboard Admin Page",
                component: DashboardAdminPage,
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
                name: "Dashboard Siswa Page",
                component: DashboardSiswaPage,
                meta: {
                    title: "Dashboard Siswa"
                }
            },
            {
                path: "mataujian",
                name: "Mata Ujian Siswa Page",
                component: MataUjianSiswaPage,
                meta: {
                    title: "Mata Ujian Siswa"
                }
            },
            {
                path: "mulaiujian/:idSoal",
                name: "Mulai Ujian Siswa Page",
                component: MulaiUjianSiswaPage,
                meta: {
                    title: "Mulai Ujian Siswa"
                }
            },
            {
                path: "ujian/:idSoal/:indexSoal",
                name: "Ujian Siswa Page",
                component: UjianSiswaPage,
                meta: {
                    title: "Ujian"
                }
            },
            {
                path: "selesaiujian/:idSoal",
                name: "Selesai Ujian Siswa Page",
                component: SelesaiUjianSiswaPage,
                meta: {
                    title: "Selesai Ujian"
                }
            }
        ]
    }
];

export default routes;