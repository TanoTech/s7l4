const apiKey = '9Y8oukMuXwN8vl58de0U007TqsS7D35MoyF63LHjydaEQkiwWQWeFhhZ'
const perPage = 20
const apiUrlCat = `https://api.pexels.com/v1/search?query=cat&per_page=${perPage}`

async function fetchCat() {
  try {
    const response = await fetch(apiUrlCat, {
      method: 'GET',
      headers: {
        'Authorization': apiKey,
      },
    })

    if (!response.ok) {
      throw new Error(`Errore nella richiesta:' ${response.status}`)
    }

    const data = await response.json()

    console.log(data)


    const photos = data.photos

    const container = document.getElementById('catContainer')

    photos.forEach(photo => {

      const card = createCard(photo)

      container.innerHTML += card
      
    })
    
  } catch (error) {
    console.error('Errore durante la richiesta:', error)
  }
}

function createCard(photo) {
  return `
    <div class="card" style="width: 18rem;">
      <img src="${photo.src.small}" class="card-img-top img-fluid" alt="${photo.alt}">
      <div class="card-body">
        <h5 class="card-title">${photo.alt}</h5>
        <p class="card-text">${photo.photographer}</p>
        <a href="/details.html?id=${photo.id}" class="btn btn-primary">Dettagli</a>
        <button class='btn btn-danger' onclick="deleteCard(this)">Nascondi</button>
      </div>
    </div>
  `;
}

async function deleteCard(button){
  const card = button.closest('.card')
  card.style.display = 'none'
}

fetchCat()
