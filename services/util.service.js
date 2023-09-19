export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    debounce,
    formatDate
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function debounce(fn, wait) {
    let timer
    return function (...args) {
        if (timer) {
            clearTimeout(timer) // clear any pre-existing timer
        }
        const context = this // get the current context
        timer = setTimeout(() => {
            fn.apply(context, args) // call the function if time expires
        }, wait)
    }
}


// function formatDate(timestamp) {
//     const date = new Date(timestamp);
//     const day = date.getDate().toString().padStart(2, '0')
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
//     const month = monthNames[date.getMonth()]; 
//     return `${day} ${month}`;
// }


function formatDate(timestamp) {
    const now = new Date().getTime();
    const differenceInMilliseconds = now - timestamp;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);
    
    if (differenceInMinutes < 1) {
        return "just now";
    } else if (differenceInMinutes < 60) {
        return differenceInMinutes + " min ago";
    } else if (differenceInHours < 24) {
        return differenceInHours + " hours ago";
    } else {
        return differenceInDays + " days ago";
    }
}