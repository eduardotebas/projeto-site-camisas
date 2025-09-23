function search() {
    let input = document.getElementById('searchBar').value
    input = input.toLowerCase()
    let x = document.getElementsByClassName('')
}

let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function () {
    nextImage();
}, 5000)

function nextImage() {
    count++;
    if (count > 3) {
        count = 1;
    }


    document.getElementById("radio" + count).checked = true;
}