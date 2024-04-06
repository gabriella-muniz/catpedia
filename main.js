document.addEventListener("DOMContentLoaded", function() {
    //Chave da API
    const apiKey = 'live_uWECtJEa9IWjKvq7nGXj88oREmwmJHRWPXTkirBDlcLooZmYD2jqdmGbqJXheA6L';
    //URL da API 
    const apiUrl = `https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`;
    //Chamando elemento HTML
    const card = document.getElementById('card');

    //solicitação à API para obter informações
    fetch(apiUrl, {
        headers: {
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(cat => {
            const catCard = createCatCard(cat);
            card.appendChild(catCard);
        });
    })
    .catch(error => console.error('Erro ao buscar informações das raças de gatos:', error));

    // Função para criar um card 
    function createCatCard(cat) {
        const catCard = document.createElement('div');
        catCard.classList.add('cat-card');


        // Preenchendo o conteúdo do card com informações de forma dinâmica
        catCard.innerHTML = `
            <h2 class="cat-name">${cat.name}</h2>
            <img class="cat-image" src="${cat.image.url}" alt="${cat.name}">
            <p><strong>Origem:</strong> <span class="cat-origin">${cat.origin}</span></p>
            <p><strong>Descrição:</strong> <span class="cat-description">${cat.description}</span></p>
            <p><strong>Temperamento:</strong> <span class="cat-temperament">${cat.temperament}</span></p>
            <p><strong>Nível de Afeto:</strong> <span class="cat-affection-level">${cat.affection_level}</span></p>
            <p><strong>Nível de Energia:</strong> <span class="cat-energy-level">${cat.energy_level}</span></p>
        `;

        return catCard;
    }
});


