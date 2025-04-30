function hitungBahan(kategori) {
  let jumlahPorsi = parseInt(document.getElementById(`jumlah${capitalize(kategori)}`).value) || 0;
  let bahan = '';

  const data = {
    makanan: {
      mochi: ["Telor Ayam", 10],
      ramen: ["RamenX", 10],
      udon: ["UdonX", 10]
    },
    minum: {
      iceOcha: ["Ice ochaX", 10],
      colacola: ["Cola-ColaX", 10],
      redvelvet: ["Red VelvetX", 10]
    },
    barang: {
      hp: [["Dummy", 10]],
      radio: [["Dummy", 10]],
      sake: [
        ["Bambu", 10], ["Botol", 10], ["Sawit", 5], ["Kecubung", 7],
        ["Micin", 7], ["Beras", 3], ["Cengkeh", 5], ["Buah2an", 10]
      ],
      rokok: [
        ["Daun", 5], ["Tembakau", 10], ["Kecubung", 2], ["Cengkeh", 10],
        ["Ranting Kayu", 5], ["Buah2an", 5], ["Micin", 2]
      ],
      rokokkoi: [
        ["Daun", 5], ["Tembakau", 10], ["Kecubung", 2], ["Cengkeh", 10],
        ["Ranting Kayu", 5], ["Buah2an", 5], ["Micin", 2]
      ],
      korek: [
        ["Kecubung", 5], ["Tembaga", 10], ["Micin", 10], ["Kayu", 5], ["Besi", 10]
      ]
    }
  };

  const bahanDiv = document.getElementById(`bahan${capitalize(kategori)}`);
  bahanDiv.innerHTML = '';

  const selected = document.querySelectorAll(`input[name="crafting${capitalize(kategori)}"]:checked`);

  selected.forEach((item) => {
    let key = item.value;
    let itemData = data[kategori][key];
    let bahanList = [];

    if (Array.isArray(itemData[0])) {
      // Array of arrays (barang kompleks)
      itemData.forEach(([nama, jumlah]) => {
        bahanList.push(`<li>${nama}: ${jumlah * jumlahPorsi} pcs</li>`);
      });
    } else {
      // Satu bahan
      bahanList.push(`<li>${itemData[0]}: ${itemData[1] * jumlahPorsi} pcs</li>`);
    }

    bahan += `
      <div class="card-bahan">
        <h4>${formatNama(key)} (${jumlahPorsi} Paket)</h4>
        <ul>${bahanList.join("")}</ul>
      </div>
    `;
  });

  bahanDiv.innerHTML = bahan;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatNama(nama) {
  const mapping = {
    mochi: "Mochi", ramen: "Ramen", udon: "Udon",
    iceOcha: "Ice Ocha", colacola: "Cola-Cola", redvelvet: "Red Velvet",
    hp: "HP", radio: "Radio", sake: "Sake",
    rokok: "Rokok Batang (12)", rokokkoi: "Rokok Batang (10)", korek: "Korek"
  };
  return mapping[nama] || nama;
}
