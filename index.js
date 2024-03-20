const qrcode = require("qrcode-terminal");
const axios = require("axios");
const config = require("./config.json");
const { Client } = require("whatsapp-web.js");
const adhan = require("adhan");
const client = new Client();
// const targetNumber = "6281299115053@c.us";
const targetNumber = "6287883762759@c.us"; //tiffany number
const items = [
  { waktu: "🌅 Subuh", jadwal: "4.41" },
  { waktu: "⛅ Dhuha", jadwal: "6.30" },
  { waktu: "🌞 Dzuhur", jadwal: "12.02" },
  { waktu: "🌤️ Ashar", jadwal: "15.10" },
  { waktu: "🌆 Maghrib", jadwal: "18.07" },
  { waktu: "🌃 Isya", jadwal: "19.16" },
];

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");

  for (const item of items) {
    const [jam, menit] = item.jadwal.split(".").map(Number);
    const pesan = `🕌 Assalamualaikum Tiffany,
  
Hi Tiffany, I hope this day is blessed for you. Remember to take a moment out of your busy schedule to get closer to Allah. Here is today's prayer time schedule for you:
    
${item.waktu} ${item.jadwal}
    
Don't forget to manage your time and take the time to pray. May Allah always bless your every step. Greetings from me, and may this day be filled with peace and happiness. If you need anything, I am here for you.
    
Wassalamualaikum. 🤲🌟
Your lovely Ayang🤍🤍`;

    scheduleMessage(jam, menit, pesan);
  }

  // scheduleMessage(3, 5, "Ayang Sahur!");
  // scheduleMessage(4, 41, "Ayang Sholat Subuh");
  // scheduleMessage(7, 5, "Semangat Harinya Ayang");
  // scheduleMessage(12, 3, "Ayang Sholat Zuhur!");
  // scheduleMessage(15, 15, "Ayang Sholat Ashar");
  // scheduleMessage(18, 7, "Ayang Bukaaa! Jangan lupa Sholat Maghrib");
  // scheduleMessage(19, 1, "Ayang Terawehhhh");

  function scheduleMessage(hour, minutes, message) {
    const now = new Date();
    let eta_ms =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hour,
        minutes,
        0,
        0
      ).getTime() - now;
    if (eta_ms < 0) {
      eta_ms += 86400000;
    }
    setTimeout(function () {
      sendMessage(message);
      setInterval(() => sendMessage(message), 86400000);
    }, eta_ms);
  }

  async function sendMessage(message) {
    try {
      await client.sendMessage(targetNumber, message);
      console.log("Successfully sent message");
    } catch (error) {
      console.log(error);
    }
  }
});

client.on("message", async (message) => {
  //   if (message.body === "!menu") {
  //     await message.reply(`Berikut beberapa fitur yang tersedia pada bot ini:
  // 1. *!ping* untuk test connectivity bot
  // 2. *!everyone* untuk memanggil semua member dalam grup
  // 3. *!tiktok [url]* untuk mendownload video tiktok (underdevelopment)
  // 4. *!ytvideo [url] [quality]* untuk mendownload video youtube (underdevelopment)
  //        note: kualitas default adalah 480p, tambahkan tag quality untuk memilih kualitas:
  //        _*380 | 480 | 720 | 1080*_
  // 5. *!sticker* untuk mengubah gambar menjadi sticker whatsapp`);
  //   }
  if (message.body === "!ping") {
    await message.reply("pong");
    await client.sendMessage(message.from, "testing" + message.from);
  }

  // if (message.body === "!everyone") {
  //   try {
  //     const isGroups = message.from.endsWith("@g.us") ? true : false;
  //     if (isGroups) {
  //       const chat = await message.getChat();

  //       let text = "";
  //       let mentions = [];

  //       for (let participant of chat.participants) {
  //         mentions.push(`${participant.id.user}@c.us`);
  //         text += `@${participant.id.user} `;
  //       }

  //       await chat.sendMessage(text, { mentions });
  //     } else {
  //       await message.reply("Lu mau manggil siapa blok?");
  //     }
  //   } catch (error) {
  //     client.sendMessage(message.from, "Failed! " + error);
  //   }
  // }

  // if (message.body === "#sticker") {
  //   try {
  //     const media = await message.downloadMedia();
  //     if (!media) {
  //       await message.reply("Fotonya mana blok!" + message);
  //     } else {
  //       client.sendMessage(message.from, media, {
  //         sendMediaAsSticker: true,
  //         stickerName: config.name,
  //         stickerAuthor: config.author,
  //       });
  //     }
  //   } catch (error) {
  //     client.sendMessage(message.from, "Failed!");
  //   }
  // }

  // if (message.body.startsWith("#tiktok")) {
  //   const tiktokUrl = message.body.split(" ")[1];
  //   try {
  //     let url = await tikdown(tiktokUrl);
  //     const videoUrl = tiktokData.data.video;
  //     // Download the video as a buffer
  //     const response = await axios.get(videoUrl, {
  //       responseType: "arraybuffer",
  //     });

  //     client.sendMessage(message.from, url.data.video);

  //     // Send the video as a buffer
  //     await client.sendMessage(message.from, response.data, {
  //       sendVideoAsGif: false,
  //       caption: "Here's the TikTok video you requested:",
  //       replyTo: message.id,
  //     });
  //   } catch (error) {
  //     console.error("Error downloading or sending TikTok video:", error);
  //     await client.sendMessage(
  //       message.from,
  //       "Failed to download TikTok video."
  //     );
  //   }
  // }
});

client.initialize();
