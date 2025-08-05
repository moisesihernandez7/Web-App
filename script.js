const AIRTABLE_TOKEN = 'pat2M85yLHUq4EhQ5.17c220c5c54d06fe43cecd4fdeb0fbdb3a7cde9beffc7eed3ba9f80cd1b24f69';
const BASE_ID = 'app0YtQhdoBjI5PgO';

console.log('✅ script.js is running');

////////////////////////////////////////////////////
// FETCH COURT-DATA
////////////////////////////////////////////////////

fetch(`https://api.airtable.com/v0/${BASE_ID}/Court-Data`, {
  headers: {
    Authorization: `Bearer ${AIRTABLE_TOKEN}`
  }
})
  .then(res => res.json())
  .then(data => {
    console.log('✅ Court data:', data);

    const courts = data.records;
    const indoorContainer = document.getElementById('indoor-courts');
    const outdoorContainer = document.getElementById('outdoor-courts');

    courts.forEach(record => {
      const f = record.fields;
      const imageUrl = f["img"]?.[0]?.url || '';
      const type = f['Indoor/Outdoor']?.toLowerCase();

      const card = document.createElement('div');
      card.className = 'court-card';
      card.innerHTML = `
        <div class="court-image">
          ${imageUrl ? `<img src="${imageUrl}" alt="${f.Name || 'Court'}">` : ''}
        </div>
        <div class="court-info">
          <h3>${f.Name || 'Unknown Court'}</h3>
          <p><strong>Indoor/Outdoor:</strong> ${f['Indoor/Outdoor'] || 'N/A'}</p>
          <p><strong>Location:</strong> ${f.Location || 'N/A'}</p>
          <p><strong>Hoops:</strong> ${f['Amount of Hoops'] || 'N/A'}</p>
          <p><strong>Hours:</strong> ${f.Hours || 'N/A'}</p>
          <p><strong>Busy?</strong> ${f['Busy?'] || 'N/A'}</p>
          <p><strong>Cost:</strong> ${f.Cost || 'Free'}</p>
          <p><strong>Description:</strong> ${f.Discription || 'No description'}</p>
          <p><strong>Phone:</strong> ${f['Phone numbers'] || 'N/A'}</p>
          <p><strong>Rating:</strong> ${renderStars(f.Rating)}</p>
        </div>
      `;

      if (type === 'indoor') {
        indoorContainer?.appendChild(card);
      } else if (type === 'outdoor') {
        outdoorContainer?.appendChild(card);
      }
    });
  })
  .catch(error => console.error('❌ Court-Data error:', error));

////////////////////////////////////////////////////
// FETCH BASKETBALL SHOES
////////////////////////////////////////////////////

fetch(`https://api.airtable.com/v0/${BASE_ID}/Basketball%20Shoes`, {
  headers: {
    Authorization: `Bearer ${AIRTABLE_TOKEN}`
  }
})
  .then(res => res.json())
  .then(data => {
    console.log('✅ Shoe data:', data);

    const shoes = data.records;
    const indoorShoeContainer = document.getElementById('indoor-shoes');
    const outdoorShoeContainer = document.getElementById('outdoor-shoes');

    shoes.forEach(record => {
      const f = record.fields;
      const imageUrl = f["Attachments"]?.[0]?.url || '';
      const type = f['Court Type']?.toLowerCase();

      const card = document.createElement('div');
      card.className = 'shoe-card';
      card.innerHTML = `
        <div class="shoe-image">
          ${imageUrl ? `<img src="${imageUrl}" alt="${f.Name || 'Shoe'}">` : ''}
        </div>
        <div class="shoe-info">
          <h3>${f.Name || 'Unknown Shoe'}</h3>
          <p><strong>Price:</strong> ${f.Price ? `$${f.Price}` : 'N/A'}</p>
          <p><strong>Description:</strong> ${f.Description || 'N/A'}</p>
          <p><strong>Traction:</strong> ${f.Traction || 'N/A'}</p>
          <p><strong>Cushioning:</strong> ${f.Cushioning || 'N/A'}</p>
          <p><strong>Support:</strong> ${f.Support || 'N/A'}</p>
          <p><strong>Rating:</strong> ${renderStars(f.Rating)}</p>
        </div>
      `;

      if (type === 'indoor') {
        indoorShoeContainer?.appendChild(card);
      } else if (type === 'outdoor') {
        outdoorShoeContainer?.appendChild(card);
      }
    });
  })
  .catch(error => console.error('❌ Shoe error:', error));

////////////////////////////////////////////////////
// RENDER STARS
////////////////////////////////////////////////////

function renderStars(rating) {
  const stars = typeof rating === 'number' ? '★'.repeat(rating) : '';
  return `<span style="color: orange;">${stars}</span>`;
}

