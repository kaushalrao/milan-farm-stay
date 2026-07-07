const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src/config/data.ts');
let content = fs.readFileSync(dataPath, 'utf8');

const coords = {
  "Departure from Bangalore": [12.9716, 77.5946],
  "Shree Doddagaddavalli Temple": [13.0906, 76.0125],
  "Hoysaleswara Temple, Halebidu": [13.2132, 75.9942],
  "Yagachi Water Adventure": [13.1970, 75.8770],
  "Belur Chennakeshava Temple": [13.1627, 75.8593],
  "Mudigere": [13.1365, 75.6429],
  "Arrival at Milan Farm Stay": [13.1300, 75.6400],
  "Mango Tree Veg Restaurant, Halebidu": [13.2100, 75.9900],
  "Mullayanagiri Base Point": [13.3850, 75.7200],
  "Jhari Waterfalls": [13.3980, 75.7450],
  "Datta Peeta (Baba Budangiri)": [13.4150, 75.7550],
  "Manikyadhara Falls": [13.4250, 75.7650],
  "Hirekolale Lake": [13.3300, 75.7150],
  "Freedom Park (Chikmagalur)": [13.3200, 75.7700],
  "Mayura Deluxe": [13.3150, 75.7750],
  "Hotel Adrika": [13.3160, 75.7760],
  "Chikmagalur Food Court": [13.3170, 75.7770],
  "Devaramane View Point": [13.0600, 75.5400],
  "Bettada Bhairaveshwara Temple": [13.0650, 75.5450],
  "Majagadahalli Waterfalls": [13.0700, 75.5500],
  "Kelagur Tea Estate": [13.1200, 75.4500],
  "Ranijhari Viewpoint": [13.1300, 75.4600],
  "Kodige Falls": [13.1400, 75.4700],
  "Maidadi View Point": [13.1500, 75.4800],
  "Hornadu Annapoorneshwari Temple": [13.2700, 75.3400],
  "Netravati Peak Trek": [13.1200, 75.3500],
  "Bandaje Falls Trek": [13.1300, 75.3600],
  "Ettina Bhuja Trek": [13.1400, 75.3700]
};

for (const [title, [lat, lng]] of Object.entries(coords)) {
  const regex = new RegExp(`(title: "${title}",[\\s\\S]*?mapsUrl: "[^"]*")`, 'g');
  content = content.replace(regex, `$1,\n    lat: ${lat},\n    lng: ${lng}`);
  
  // also handle places with localTips/entryFee after mapsUrl
  const regex2 = new RegExp(`(title: "${title}",[\\s\\S]*?bookingLink: "[^"]*")`, 'g');
  content = content.replace(regex2, `$1,\n    lat: ${lat},\n    lng: ${lng}`);
}

fs.writeFileSync(dataPath, content, 'utf8');
console.log('Coordinates added successfully.');
