export function loadJSONData(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error loading JSON:', error));
}

export function displayList(data, containerId, templateFunction) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear existing content

    if (!data || data.length === 0) {
        container.textContent = 'No results found.';
        return;
    }

    data.forEach(item => {
        const element = templateFunction(item);
        container.appendChild(element);
    });
}