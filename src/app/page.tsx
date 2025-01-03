import Image from "next/image";
import LandingPageLayout from "@/components/layout/LandingPageLayout";
import ContactForm from "@/components/form/ContactForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function Home() {
  const layananUtamaItem = [
    {
      title: "Konsultasi Hukum Online",
      image: "/Lawyer-pana 1.svg",
      bgColor: "bg-yellow-400",
      textColor: "text-blue-600",
    },
    {
      title: "Penyelesaian Kasus",
      image: "/Judge-pana 1.svg",
      bgColor: "bg-blue-600",
      textColor: "text-yellow-400",
    },
    {
      title: "Pembuatan Dokumen Hukum",
      image: "/Accept terms-pana 1.svg",
      bgColor: "bg-yellow-400",
      textColor: "text-blue-600",
    },
  ];

  const detailLayananHukum = [
    {
      title: "Deskripsi Layanan",
      bgColor: "bg-blue-600",
      textColor: "text-yellow-400",
      items: [
        "Litigasi",
        "Mediasi dan Arbitrase",
        "Konsultasi Hukum",
        "Pembuatan Kontrak",
        "Pendampingan Hukum",
      ],
    },
    {
      title: "Bidang Spesialisasi",
      bgColor: "bg-yellow-400",
      textColor: "text-blue-600",
      items: [
        "Hukum Perdata",
        "Hukum Pidana",
        "Hukum Bisnis dan Korporasi",
        "Hukum Teknologi dan Privasi Data",
        "Hukum Ketenagakerjaan",
      ],
    },
    {
      title: "Proses Layanan",
      bgColor: "bg-blue-600",
      textColor: "text-yellow-400",
      items: [
        "Penyerahan dan Penyusunan Dokumen",
        "Konsultasi Awal",
        "Analisis Kasus",
        "Pemantauan dan Pelaporan Perkembangan Kasus",
      ],
    },
  ];

  return (
    <LandingPageLayout>
      {/* Hero Section */}
      <div className="py-12 bg-gray-50">
        <div className="flex flex-col items-start px-24">
          <h1 className="text-4xl font-bold text-gray-800">
            Anda ada masalah??
            <br />
            <span className="text-primary">Datang ke Sobat Hukum!</span>
          </h1>
          <p className="mt-4">
            Web dengan Solusi Hukum Terpercaya, Mudah, dan Tepat Sasaran.
          </p>
          <Link href={"/login"} className="mt-4 px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-600">
            Mulai Sekarang
          </Link>
        </div>
        <div className="flex justify-center items-center mt-10 lg:mt-8">
          <Image
            src="/Hero Image.jpg"
            alt="Gambar Utama"
            width={1165}
            height={640}
            className="rounded shadow-lg"
            priority
          />
        </div>
      </div>

      {/* Layanan Utama Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Layanan Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {layananUtamaItem.map(
              ({ title, image, bgColor, textColor }, index) => (
                <div
                  key={index}
                  className={`w-full h-[300px] ${bgColor} border border-gray-300 rounded-lg p-6 flex flex-col items-center`}
                >
                  <Image src={image} alt={title} width={200} height={200} />
                  <p className={`mt-auto text-lg font-bold ${textColor} mb-4`}>
                    {title}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Detail Layanan Hukum Section */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-24">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Detail Layanan Hukum
          </h2>
          <div className="mt-8 flex flex-col lg:flex-row items-start gap-8">
            <div className="lg:w-2/3">
              {detailLayananHukum.map(
                ({ title, bgColor, textColor, items }, index) => (
                  <div key={index} className="mb-8">
                    <div
                      className={`w-[230px] ${bgColor} ${textColor} text-center font-bold p-4 rounded`}
                    >
                      {title}
                    </div>
                    <ul className="list-disc px-8 mt-4 space-y-2">
                      {items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
            <div className="lg:w-1/2">
              <Image
                src="/Self confidence-bro 1.svg"
                alt="Detail Layanan"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-left text-gray-800">FAQ</h2>
          <div className="mt-8">
            <Accordion type="single" collapsible>
              <AccordionItem value="faq1">
                <AccordionTrigger className="w-[1165px] text-base bg-yellow-400 mx-auto p-6 rounded-lg flex justify-between items-center">
                  <span className="text-blue-600">
                    Apa itu Sobat Hukum?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="mt-2 text-base rounded p-4 text-gray-600">
                    Sobat Hukum adalah platform digital yang bertujuan untuk mempermudah akses masyarakat terhadap layanan hukum. Kami menyediakan berbagai informasi, 
                    panduan, serta layanan konsultasi dan pengurusan dokumen legal yang dapat diakses secara mudah dan cepat. Sobat Hukum hadir untuk membantu Anda 
                    menyelesaikan permasalahan hukum dengan solusi yang praktis, terpercaya, dan sesuai dengan regulasi yang berlaku.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq2">
                <AccordionTrigger className="w-[1165px] text-base bg-yellow-400 mx-auto p-6 rounded-lg flex justify-between items-center">
                  <span className="text-blue-600">
                    Bagaimana cara penggunaannya?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="mt-2 text-base rounded p-4 text-gray-600">
                1. Registrasi: Buat akun dengan mengisi data pribadi atau masuk menggunakan akun yang sudah ada.
                2. Ajukan Permintaan: Isi formulir sesuai kebutuhan, unggah dokumen yang diperlukan, dan ikuti langkah pembayaran jika diperlukan.
                3. Konsultasi atau Proses Layanan: Anda akan terhubung dengan ahli hukum atau tim kami yang akan membantu penyelesaian masalah Anda.
                4. Selesaikan & Pantau Status: Pantau progres layanan Anda langsung melalui akun Sobat Hukum.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq3">
                <AccordionTrigger className="w-[1165px] text-base bg-yellow-400 mx-auto p-6 rounded-lg flex justify-between items-center">
                  <span className="text-blue-600">
                    Kebijakan Pengguna
                  </span>
                </AccordionTrigger>
                <AccordionContent className="mt-2 text-base rounded p-4 text-gray-600">
                Sobat Hukum mengutamakan keamanan dan kenyamanan Anda. Beberapa poin kebijakan pengguna kami meliputi:
                - Privasi Data: Informasi pribadi Anda akan kami jaga dengan standar keamanan tinggi dan tidak akan dibagikan tanpa izin.
                - Kewajiban Pengguna: Anda wajib memberikan informasi yang akurat dan sesuai kebutuhan layanan. Kesalahan data dapat memengaruhi hasil layanan.
                - Batasan Layanan: Sobat Hukum memberikan informasi hukum dan layanan administratif, namun tidak mewakili Anda di pengadilan tanpa perjanjian khusus.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq4">
                <AccordionTrigger className="w-[1165px] text-base bg-yellow-400 mx-auto p-6 rounded-lg flex justify-between items-center">
                  <span className="text-blue-600">
                    Regulasi dan Kepatuhan
                  </span>
                </AccordionTrigger>
                <AccordionContent className="mt-2 text-base rounded p-4 text-gray-600">
                Sobat Hukum berkomitmen untuk mematuhi semua regulasi dan peraturan hukum yang berlaku, termasuk:
                - Perlindungan Data Pribadi: Kami memastikan kepatuhan terhadap Undang-Undang Perlindungan Data Pribadi (UU PDP).
                - Etika Hukum: Semua layanan kami diberikan oleh profesional yang terdaftar dan sesuai dengan standar hukum dan etika profesi.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq5">
                <AccordionTrigger className="w-[1165px] text-base bg-yellow-400 mx-auto p-6 rounded-lg flex justify-between items-center">
                  <span className="text-blue-600">
                    Persiapan Dokumen dan Layanan Online
                  </span>
                </AccordionTrigger>
                <AccordionContent className="mt-2 text-base rounded p-4 text-gray-600">
                - Pembuatan Dokumen Legal: Seperti perjanjian kerja, kontrak, surat kuasa, dan dokumen lainnya.
                - Pengurusan Izin: Termasuk izin usaha, akta pendirian perusahaan, dan izin-izin lainnya.
                - Konsultasi Hukum: Dapatkan panduan langsung dari ahli hukum terkait kasus atau kebutuhan hukum Anda.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-12 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800">Kontak</h2>
        <p className="text-gray-600 mt-4">Sampaikan saran atau pesan Anda.</p>
        <ContactForm />
      </div>
    </LandingPageLayout>
  );
}
