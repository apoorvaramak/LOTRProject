document.addEventListener('DOMContentLoaded', (e) => {
    fetch('https://the-one-api.dev/v2/movie', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer FtLlNgZmTREbtCV1equj'
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
})