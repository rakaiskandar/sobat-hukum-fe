import LandingPageLayout from "@/components/layout/LandingPageLayout";

export default function About() {
    return (
        <LandingPageLayout>
            <main class="container mx-auto py-16 text-center">
                <h1 class="text-4xl font-bold mb-6">Tentang Kami</h1>
                <p class="text-gray-700 mb-12 max-w-3xl mx-auto">
                "Sobat Hukum" adalah platform berbasis web yang dirancang untuk memberikan layanan bantuan hukum kepada masyarakat. Sistem ini memungkinkan klien untuk mengajukan kasus hukum, pengacara untuk menangani kasus, dan admin untuk mengelola aktivitas dan verifikasi. Sistem juga mendukung komunikasi real-time antara klien dan pengacara serta memungkinkan pengajuan kasus secara anonim.
                </p>
            </main>
        </LandingPageLayout>
    );
};
