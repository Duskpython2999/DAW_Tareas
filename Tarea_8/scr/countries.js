
function loadCountries() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
            const nationalitySelect = document.getElementById('nacionalidad');
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.cca3;
                option.textContent = country.translations.spa.common;
                nationalitySelect.appendChild(option);
            });

            
            const savedCountry = localStorage.getItem('nationality') || 'CRI';
            nationalitySelect.value = savedCountry;
        });
}


document.addEventListener("DOMContentLoaded", function() {
    loadCountries();
});