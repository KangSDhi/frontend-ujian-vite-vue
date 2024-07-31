import HalamanLogin from "../views/auth/Login.vue";
import HalamanDashboardAdmin from "../views/admin/Dashboard.vue"
import HalamanDashboardSiswa from "../views/siswa/Dashboard.vue";
import HalamanMataUjianSiswa from "../views/siswa/MataUjian.vue";
import HalamanMulaiUjianSiswa from "../views/siswa/MulaiUjian.vue";
import HalamanUjianSiswa from "../views/siswa/Ujian.vue";
import HalamanSelesaiUjianSiswa from "../views/siswa/SelesaiUjian.vue";

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
            },
            {
                path: "mataujian",
                name: "Mata Ujian Siswa",
                component: HalamanMataUjianSiswa,
                meta: {
                    title: "Mata Ujian Siswa"
                }
            },
            {
                path: "mulaiujian/:idSoal",
                name: "Mulai Ujian Siswa",
                component: HalamanMulaiUjianSiswa,
                meta: {
                    title: "Mulai Ujian Siswa"
                }
            },
            {
                path: "ujian/:idSoal/:indexSoal",
                name: "Ujian Siswa",
                component: HalamanUjianSiswa,
                meta: {
                    title: "Ujian"
                }
            },
            {
                path: "selesaiujian/:idSoal",
                name: "Selesai Ujian Siswa",
                component: HalamanSelesaiUjianSiswa,
                meta: {
                    title: "Selesai Ujian"
                }
            }
        ]
    }
];

export default routes;