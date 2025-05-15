function copyTotalGlobal() {
  let textToCopy = "Total Semua Bahan:\n";

  for (const namaBahan in totalGlobalBahan) {
    const namaFormat = namaBahan.replace(/([A-Z])/g, " $1");
    textToCopy += `${namaFormat}: ${totalGlobalBahan[namaBahan]}\n`;
  }

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      alert("Total bahan berhasil disalin ke clipboard!");
    })
    .catch(err => {
      alert("Gagal menyalin: " + err);
    });
}

const totalGlobalBahan = {};
function updateTotalGlobal(bahan, jumlah) {
  for (const namaBahan in bahan) {
    if (!totalGlobalBahan[namaBahan]) {
      totalGlobalBahan[namaBahan] = 0;
    }
    totalGlobalBahan[namaBahan] += bahan[namaBahan] * jumlah;
  }
}

function tampilkanTotalGlobal() {
  const globalDiv = document.getElementById("totalGlobal");
  globalDiv.innerHTML = "<h3>Total Semua Bahan:</h3><ul>";

  for (const namaBahan in totalGlobalBahan) {
    const namaFormat = namaBahan.replace(/([A-Z])/g, " $1");
    globalDiv.innerHTML += `<li>${namaFormat}: ${totalGlobalBahan[namaBahan]}</li>`;
  }

  globalDiv.innerHTML += "</ul>";
}

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

  const paketJumlah = {
    RokokBatang: 12,
    RokokKoi7Star: 10,
    SakeSobaCha: 10,
    Korek: 10,
    HP: 5,
    Radio: 5
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

      const totalPaket = jumlah * (paketJumlah[item] || 50);

      let html = `<h4>${item.replace(/([A-Z])/g, ' $1')} x${totalPaket}:</h4><ul>`;
      for (const bahanNama in bahan) {
        const total = bahan[bahanNama] * jumlah;
        html += `<li>${bahanNama.replace(/([A-Z])/g, ' $1')}: ${total}</li>`;
      }
      html += `</ul>`;
      resultCard.innerHTML = html;
      outputDiv.appendChild(resultCard);

      updateTotalGlobal(bahan, jumlah);
    }
  });

  tampilkanTotalGlobal();
  
}
