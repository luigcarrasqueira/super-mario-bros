export function loadJSON(url) {
    return fetch(url).then(function(res) {
        return res.json();
    })
}