export const projects = [
  {
    slug: "whatsapp-bot",
    name: "WhatsApp Bot",
    category: "Bots",
    description:
      "Bot automation untuk WhatsApp dengan sistem command dan plugin.",
    tech: ["Node.js", "JavaScript", "REST API"],
    status: "active",
    github: null,
    demo: null,
    detail: {
      problem:
        "Butuh cara cepat untuk menjalankan perintah dan automasi harian lewat WhatsApp tanpa membuka banyak aplikasi.",
      approach:
        "Dibangun dengan sistem plugin supaya setiap command bisa ditambah atau dimatikan tanpa mengubah core bot.",
      learned:
        "Belajar menata struktur plugin supaya bot tetap mudah dirawat walau jumlah command bertambah.",
    },
  },
  {
    slug: "telegram-auto-order",
    name: "Telegram Auto Order",
    category: "Bots",
    description:
      "Bot Telegram untuk sistem order otomatis, referral, deposit, dan panel.",
    tech: ["Node.js", "Telegram Bot API", "REST API"],
    status: "active",
    github: null,
    demo: null,
    detail: {
      problem:
        "Proses order dan deposit manual memakan waktu dan rawan salah catat.",
      approach:
        "Membuat alur order, deposit, dan referral otomatis lewat bot, dengan panel sederhana untuk memantau transaksi.",
      learned:
        "Belajar menangani state per-user dan validasi transaksi supaya sistem tetap konsisten.",
    },
  },
  {
    slug: "rest-api",
    name: "REST API",
    category: "API",
    description:
      "Website/service yang menyediakan REST API untuk kebutuhan project.",
    tech: ["Node.js", "REST API", "Vercel"],
    status: "active",
    github: null,
    demo: null,
    detail: {
      problem:
        "Beberapa project butuh backend yang bisa dipakai bersama tanpa membangun ulang dari nol tiap kali.",
      approach:
        "Menyediakan endpoint umum yang bisa dipakai lintas project, dengan dokumentasi singkat untuk tiap endpoint.",
      learned:
        "Belajar pentingnya konsistensi response format supaya mudah dipakai dari sisi client mana pun.",
    },
  },
  {
    slug: "web-store",
    name: "Web Store",
    category: "Web",
    description: "Website penjualan dengan UI modern dan sistem order.",
    tech: ["React", "Node.js", "CSS"],
    status: "active",
    github: null,
    demo: null,
    detail: {
      problem:
        "Perlu tempat jualan online yang tampilannya rapi tapi tidak berat dan gampang dikelola sendiri.",
      approach:
        "Dibangun sebagai web app ringan dengan alur order yang sederhana, fokus ke kecepatan dan kejelasan UI.",
      learned:
        "Belajar menyeimbangkan tampilan yang menarik dengan performa loading yang tetap cepat.",
    },
  },
];

export const currentlyBuilding = [
  {
    name: "Panel Automation v2",
    status: "building",
    description: "Refactor panel automation supaya lebih mudah dikembangkan.",
  },
  {
    name: "Multi-platform Bot Framework",
    status: "experimenting",
    description:
      "Mencoba satu base code yang bisa dipakai untuk WhatsApp dan Telegram bot sekaligus.",
  },
  {
    name: "Personal API Gateway",
    status: "planned",
    description: "Satu pintu masuk untuk semua REST API yang sudah dibuat.",
  },
];
