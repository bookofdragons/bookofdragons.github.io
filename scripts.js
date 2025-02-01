// Fetch the dragons data
fetch('dragons.json')
    .then(response => response.json())
    .then(data => {
        if (data && data.rows) {
            const dragonList = document.getElementById('dragonList');
            data.rows.forEach((dragon) => {
                const dragonName = dragon[1];
                const dragonClass = dragon[2];
                const imageUrl = dragon[4];
                const dragonId = dragon[0];

                const dragonCard = document.createElement('div');
                dragonCard.classList.add('dragon-card');
                dragonCard.setAttribute('data-dragon-name', dragonName.toLowerCase()); // Store dragon name for search
                dragonCard.innerHTML = `
                    <img src="${imageUrl}" alt="${dragonName}">
                    <h3>${dragonName}</h3>
                    <p><strong>Class:</strong> ${dragonClass}</p>
                    <a href="dragon_detail.html?id=${dragonId}" class="button">More Info</a>
                `;
                dragonList.appendChild(dragonCard);
            });

            // After the data is loaded, run the filter to apply search and class values
            applySavedValues();
        } else {
            console.error('Invalid data format:', data);
        }
    })
    .catch(error => {
        console.error('Error loading dragon data:', error);
    });

// Function to filter dragons by name and class
function filterDragons() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const selectedClass = document.getElementById('classFilter').value;
    const dragonCards = document.querySelectorAll('.dragon-card');

    dragonCards.forEach(card => {
        const dragonName = card.getAttribute('data-dragon-name');
        const dragonClass = card.querySelector('p').textContent.toLowerCase();

        const matchesName = dragonName.includes(searchQuery);
        const matchesClass = selectedClass === "all" || dragonClass.includes(selectedClass.toLowerCase());

        if (matchesName && matchesClass) {
            card.style.display = ''; // Show the card
        } else {
            card.style.display = 'none'; // Hide the card
        }
    });
}

// Store search and filter values when they change
document.getElementById('searchBar').addEventListener('input', function () {
    localStorage.setItem('searchQuery', this.value);
    filterDragons(); // Call filter immediately on input change
});

document.getElementById('classFilter').addEventListener('change', function () {
    localStorage.setItem('selectedClass', this.value);
    filterDragons(); // Call filter immediately on dropdown change
});

// Retrieve values on page load and apply them
function applySavedValues() {
    const savedSearchQuery = localStorage.getItem('searchQuery');
    const savedClassFilter = localStorage.getItem('selectedClass');

    // Set the saved search query and class filter
    if (savedSearchQuery) {
        document.getElementById('searchBar').value = savedSearchQuery;
    }

    if (savedClassFilter) {
        document.getElementById('classFilter').value = savedClassFilter;
    }

    // Trigger the filter function to apply the saved values and display filtered results
    filterDragons();
}

// Prevent page reload on "Back to Dragon List" button click
document.getElementById('backToListButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent page reload
    window.location.href = "index.html"; // Navigate to the list page
});
