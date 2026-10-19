// CD-13 Specific Counties and Cities Mapping
const CD13_DATA = {
  "Caswell": ["Milton", "Yanceyville"],
  "Franklin": ["Bunn", "Franklinton", "Louisburg", "Youngsville"],
  "Granville": ["Butner", "Creedmoor", "Oxford", "Stem", "Stovall"],
  "Harnett": ["Angier", "Coats", "Dunn", "Erwin", "Lillington"],
  "Johnston": ["Archer Lodge", "Benson", "Clayton", "Four Oaks", "Kenly", "Micro", "Pine Level", "Princeton", "Selma", "Smithfield", "Wilson's Mills"],
  "Lee": ["Broadway", "Sanford"],
  "Person": ["Rougemont", "Roxboro"],
  "Wake": ["Apex", "Cary", "Fuquay-Varina", "Garner", "Holly Springs", "Knightdale", "Morrisville", "Raleigh", "Rolesville", "Wake Forest", "Wendell", "Zebulon"]
};

document.addEventListener("DOMContentLoaded", () => {
  const countySelect = document.getElementById("countySelect");
  const citySelect = document.getElementById("citySelect");

  if (!countySelect) return;

  // Clear existing options
  countySelect.innerHTML = '<option value="">-- Choose County --</option>';

  // Populate CD-13 Counties
  Object.keys(CD13_DATA).sort().forEach(county => {
    const opt = document.createElement("option");
    opt.value = county;
    opt.textContent = `${county} County`;
    countySelect.appendChild(opt);
  });

  // Handle Dynamic City Population
  countySelect.addEventListener("change", () => {
    const selectedCounty = countySelect.value;
    if (citySelect) {
      citySelect.innerHTML = '<option value="">-- Choose City --</option>';

      if (!selectedCounty || !CD13_DATA[selectedCounty]) {
        citySelect.disabled = true;
        citySelect.innerHTML = '<option value="">-- Choose County First --</option>';
        return;
      }

      CD13_DATA[selectedCounty].sort().forEach(city => {
        const opt = document.createElement("option");
        opt.value = city;
        opt.textContent = city;
        citySelect.appendChild(opt);
      });

      citySelect.disabled = false;
    }
  });
});