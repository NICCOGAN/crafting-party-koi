
function hitungBahan(kategori) {
  const resep = {
    Mochi: {
      TelurAyam: 25, BuahBuahan: 5, Sawit: 5, Beras: 5,
      Gula: 5, Zatkim: 1, Susu: 5, Akua: 5
    },
    Ramen: {
      BotolGaram: 5, Sambal: 5, Lemak: 5, TelurAyam: 5, Daun: 5,
      DagingSapi: 25, Arang: 5, Zatkim: 1, Bambu: 6, AyamPotong: 25
    },
    Udon: {
      BotolGaram: 5, Sambal: 5, Lemak: 5, TelurAyam: 5, Daun: 5,
      DagingSapi: 25, Arang: 5, Zatkim: 1, Bambu: 6, AyamPotong: 25
    },
    IceOcha: {
      Zatkim: 1, Akua: 5, Daun: 16, Gula: 5, TehCelup: 8
    },
    RokokBatang: {
      Daun: 5, Tembakau: 10, Cubung: 2, Cengkeh: 10,
      RantingKayu: 5, BuahBuahan: 5, Micin: 2
    },
    RokokKoi7Star: {
      RokokBatang: 24, Kecubung: 1, Micin: 1
    },
    Korek: {
      Sawit: 10, Kayu: 5, Tembaga: 5, Besi: 5, Micin: 5, Kecubung: 5
    },
    SakeSobaCha: {
      Bambu: 10, Botol: 10, Sawit: 5, Kecubung: 7, Micin: 7, Beras: 3, Cengkeh: 5, Buahbuahan: 10
    },
    HP: {
      Tembaga: 25, Glass: 75, Steel: 25, Besi: 25, Plastic: 100, AluminiumPowder: 100
    },
    Radio: {
      Tembaga: 10, IronPowder: 50, Emas: 10, Aluminium: 10, Rubber: 25, Steel: 10, Plastic: 25
    }
  };

  const kategoriOutput = {
    makanan: "bahanMakanan",
    minuman: "bahanMinuman",
    barang: "bahanBarang"
  };

  const outputDiv = document.getElementById(kategoriOutput[kategori]);
  outputDiv.innerHTML = "";

  const items = Object.keys(resep).filter(item => {
    return document.querySelector(`input[name="${kategori}"][value="${item}"]`);
  });

  items.forEach(item => {
    const checkbox = document.querySelector(`input[name="${kategori}"][value="${item}"]`);
    if (checkbox && checkbox.checked) {
      const jumlah = parseInt(document.getElementById(`jumlah${item}`).value) || 0;
      if (jumlah <= 0) return;

      const bahan = resep[item];
      const resultCard = document.createElement("div");
      resultCard.className = "card-bahan";

      let html = `<h4>${item.replace(/([A-Z])/g, ' $1')} x${jumlah * (item === "RokokBatang" ? 12 : item === "RokokKoi7Star" ? 10 : item === "SakeSobaCha" ? 10 : item === "Korek" ? 10 : item === "HP" ? 5 : item === "Radio" ? 5 : 50)}:</h4><ul>`;
      for (const bahanNama in bahan) {
        const total = bahan[bahanNama] * jumlah;
        if (total > 0) {
          html += `<li>${bahanNama.replace(/([A-Z])/g, ' $1')}: ${total} pcs</li>`;
        }
      }
      html += `</ul>`;
      resultCard.innerHTML = html;
      outputDiv.appendChild(resultCard);
    }
  });
}
document.querySelectorAll('.navbar a').forEach(a => a.classList.remove('active'));
this.classList.add('active');
