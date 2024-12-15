import Image from "next/image";
import LandingPageLayout from "@/components/layout/LandingPageLayout";

export default function Home() {
  return (
    <LandingPageLayout>
    <div class="py-12 bg-gray-100">
        <div class="flex flex-col items-start px-12">
            <h1 class="text-3xl font-bold text-gray-800">Anda ada masalah ??<br>Datang ke Sobat Hukum!</h1>
            <p class="text-gray-600 mt-4">Web dengan Solusi Hukum Terpercaya, Mudah, dan Tepat Sasaran.</p>
            <button class="mt-6 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Mulai Sekarang</button>
        </div>
        <div class="mt-8">
            <img src="Landing page main pict.jpeg" alt="Gambar Utama" class="mx-auto w-[1165px] h-[640px]">
        </div>
    </div>

    <div class="py-12 items-start px-12">
        <h2 class="text-2xl font-bold text-gray-800">Layanan Utama</h2>
        <div class="flex justify-center gap-32 mt-8">
            <div class="w-[300px] h-[450px] bg-yellow-400 border border-gray-300 rounded-lg p-4 flex flex-col justify-end">
                <img src="Lawyer-pana 1.png" alt="Konsultasi Hukum Online" class="w-45 h-45 mb-auto">
                <p class="text-center font-bold text-blue-500 mb-8">Konsultasi Hukum Online</p>
            </div>
            <div class="w-[300px] h-[450px] bg-blue-500 border border-gray-300 rounded-lg p-4 flex flex-col justify-end">
                <img src="Judge-pana 1.png" alt="Penyelesaian Kasus" class="w-45 h-45 mb-auto">
                <p class="text-center font-bold text-yellow-400 mb-8">Penyelesaian Kasus</p>
            </div>
            <div class="w-[300px] h-[450px] bg-yellow-400 border border-gray-300 rounded-lg p-4 flex flex-col justify-end">
                <img src="Accept terms-pana 1.png" alt="Pembuatan Dokumen Hukum" class="w-45 h-45 mb-auto">
                <p class="text-center font-bold text-blue-500 mb-8">Pembuatan Dokumen Hukum</p>
            </div>
        </div>
    </div>

    <div class="py-12 items-start px-12">
        <h2 class="text-2xl font-bold text-center text-gray-800">Detail Layanan Hukum</h2>
        <div class="flex mt-8 justify-center gap-8">
            <div class="w-2/3">
                <div class="w-[230px] bg-blue-500 text-yellow-400 text-center font-bold p-4 rounded">Deskripsi Layanan</div>
                <ul class="list-disc px-8 mt-4">
                    <li>Litigasi</li>
                    <li>Mediasi dan Arbitrase</li>
                    <li>Konsultasi Hukum</li>
                    <li>Pembuatan Kontrak</li>
                    <li>Pendampingan Hukum</li>
                </ul>

                <div class="w-[230px] bg-yellow-400 text-blue-500 text-center font-bold p-4 rounded mt-8">Bidang Spesialisasi</div>
                <ul class="list-disc px-8 mt-4">
                    <li>Hukum Perdata</li>
                    <li>Hukum Pidana</li>
                    <li>Hukum Bisnis dan Korporasi</li>
                    <li>Hukum Teknologi dan Privasi Data</li>
                    <li>Hukum Ketenagakerjaan</li>
                </ul>

                <div class="w-[230px] bg-blue-500 text-yellow-400 text-center font-bold p-4 rounded mt-8">Proses Layanan</div>
                <ul class="list-disc px-8 mt-4">
                    <li>Penyerahan dan Penyusunan Dokumen</li>
                    <li>Konsultasi Awal</li>
                    <li>Analisis Kasus</li>
                    <li>Pemantauan dan Pelaporan Perkembangan Kasus</li>
                </ul>
            </div>
            <div class="w-1/1">
                <img src="Self confidence-bro 1.png" alt="Detail Layanan" class="rounded shadow">
            </div>
        </div>
    </div>

    <div class="py-12 bg-gray-100">
        <h2 class="text-2xl font-bold items-start px-12 text-gray-800">FAQ</h2>
        <div class="mt-8 space-y-4">
            <div class="w-[1165px] h-[80px] bg-yellow-400 mx-auto p-4 rounded-lg flex justify-between items-center cursor-pointer" onclick="toggleFaq(this)">
                <span class="font-bold text-blue-500">Apa itu Sobat Hukum?</span>
                <div class="hidden mt-2 bg-white rounded p-2 text-gray-600">Sobat Hukum adalah ...</div>
            </div>
            <div class="w-[1165px] h-[80px] bg-yellow-400 mx-auto p-4 rounded-lg flex justify-between items-center cursor-pointer" onclick="toggleFaq(this)">
                <span class="font-bold text-blue-500">Bagaimana cara penggunaannya?</span>
                <div class="hidden mt-2 bg-white rounded p-2 text-gray-600">Penggunaannya adalah ...</div>
            </div>
            <div class="w-[1165px] h-[80px] bg-yellow-400 mx-auto p-4 rounded-lg flex justify-between items-center cursor-pointer" onclick="toggleFaq(this)">
                <span class="font-bold text-blue-500">Kebijakan Pengguna</span>
                <div class="hidden mt-2 bg-white rounded p-2 text-gray-600">Kebijakan pengguna sebagai berikut ...</div>
            </div>
            <div class="w-[1165px] h-[80px] bg-yellow-400 mx-auto p-4 rounded-lg flex justify-between items-center cursor-pointer" onclick="toggleFaq(this)">
                <span class="font-bold text-blue-500">Regulasi dan Kepatuhan?</span>
                <div class="hidden mt-2 bg-white rounded p-2 text-gray-600">Regulasi dan kepatuhan meliputi ...</div>
            </div>
            <div class="w-[1165px] h-[80px] bg-yellow-400 mx-auto p-4 rounded-lg flex justify-between items-center cursor-pointer" onclick="toggleFaq(this)">
                <span class="font-bold text-blue-500">Persiapan Dokumen dan Layanan Online</span>
                <div class="hidden mt-2 bg-white rounded p-2 text-gray-600">Persiapan meliputi ...</div>
            </div>
        </div>
    </div>

    <div class="py-12 text-center">
        <h2 class="text-2xl font-bold text-gray-800">Kontak</h2>
        <p class="text-gray-600 mt-4">Sampaikan saran atau pesan Anda.</p>
        <form class="mt-6 max-w-md mx-auto space-y-4">
            <input type="text" placeholder="Masukkan nama" class="w-full p-2 border border-gray-300 rounded">
            <input type="email" placeholder="Masukkan email" class="w-full p-2 border border-gray-300 rounded">
            <textarea rows="5" placeholder="Masukkan pesan" class="w-full p-2 border border-gray-300 rounded"></textarea>
            <button type="submit" class="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Kirim</button>
        </form>
    </div>

    </LandingPageLayout>
  );
}
