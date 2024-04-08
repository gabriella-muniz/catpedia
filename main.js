document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'live_uWECtJEa9IWjKvq7nGXj88oREmwmJHRWPXTkirBDlcLooZmYD2jqdmGbqJXheA6L';
    const apiUrl = `https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`;
    const card = document.getElementById('card');

    fetch(apiUrl, {
        headers: {
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        window.catBreeds = data;
        displayCatBreeds(window.catBreeds);
    })
    .catch(error => console.error('Erro ao buscar informações das raças de gatos:', error));

    function displayCatBreeds(catBreeds) {
        card.innerHTML = '';
        catBreeds.forEach(cat => {
            const catCard = createCatCard(cat);
            card.appendChild(catCard);
        });

        createChart('temperament-chart', getTopBreeds(catBreeds, 'affection_level', 5), 'Nível de Afeto');
        createChart('social-needs-chart', getTopBreeds(catBreeds, 'social_needs', 5), 'Necessidade Social');
        createChart('life-expectancy-chart', getTopLifeExpectancyBreeds(catBreeds, 5), 'Expectativa de Vida Média');
        createChart('affection-level-chart', getTopBreeds(catBreeds, 'affection_level', 5), 'Nível de Afeto');
        createChart('energy-level-chart', getTopBreeds(catBreeds, 'energy_level', 5), 'Nível de Energia');
    }

    function createCatCard(cat) {
        const catCard = document.createElement('div');
        catCard.classList.add('cat-card');
        const imageUrl = cat.image ? cat.image.url : 'placeholder.jpg';

        catCard.innerHTML = `
            <h2 class="cat-name">${cat.name}</h2>
            <img class="cat-image" src="${imageUrl}" alt="${cat.name}">
            <p><strong>Origem:</strong> <span class="cat-origin">${cat.origin}</span></p>
            <p><strong>Descrição:</strong> <span class="cat-description">${cat.description}</span></p>
            <p><strong>Temperamento:</strong> <span class="cat-temperament">${cat.temperament}</span></p>
            <p><strong>Nível de Afeto:</strong> <span class="cat-affection-level">${cat.affection_level}</span></p>
            <p><strong>Nível de Energia:</strong> <span class="cat-energy-level">${cat.energy_level}</span></p>
        `;

        return catCard;
    }

    function createChart(chartId, breeds, label) {
        const ctx = document.getElementById(chartId).getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: breeds.map(breed => breed.name),
                datasets: [{
                    label: label,
                    data: breeds.map(breed => breed.value),
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: Math.max(...breeds.map(breed => breed.value)) + 1
                    }
                }
            }
        });
    }

    function getTopBreeds(catBreeds, attribute, count) {
        const sortedBreeds = catBreeds.sort((a, b) => b[attribute] - a[attribute]);
        return sortedBreeds.slice(0, count).map(breed => ({ name: breed.name, value: breed[attribute] }));
    }

    function getTopLifeExpectancyBreeds(catBreeds, count) {
        const breedsWithLifeExpectancy = catBreeds.filter(cat => cat.life_span);
        const sortedBreeds = breedsWithLifeExpectancy.sort((a, b) => {
            const lifeSpanA = parseInt(a.life_span.split(' ')[0]);
            const lifeSpanB = parseInt(b.life_span.split(' ')[0]);
            return lifeSpanB - lifeSpanA;
        });
        return sortedBreeds.slice(0, count).map(breed => ({ name: breed.name, value: parseInt(breed.life_span.split(' ')[0]) }));
    }

    function buscar() {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const raceFilter = window.catBreeds.filter(cat => cat.name.toLowerCase().includes(searchTerm));
        displayCatBreeds(raceFilter);
    }

    const buttonSearch = document.querySelector('.button-search');
    buttonSearch.addEventListener('click', buscar);
});
