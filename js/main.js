var DOMstrings = {
    next: '.next',
    prev: '.prev',
    overlay: '.overlay',
    headerBlock: '.header_text',
    parent: '.gallery_items',
    galleryContainer: '.gallery_container',
    imgGallery: '.container_small_img',
    popup: '.popup'
};

var album = {
    id: 1,
    albumId: function gallery() {
        fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + this.id)
            .then(response => response.json())
            .then(json => json.forEach(function(obj) {
                var img = document.createElement("img");
                link = document.createElement("div")
                img.src = obj.thumbnailUrl;
                link.setAttribute('data-images', obj.url);
                link.classList.add('container_small_img');
                img.classList.add('small_img');
                document.querySelector(DOMstrings.parent).appendChild(link).appendChild(img);
                link.addEventListener('click', function() {
                    document.querySelector(DOMstrings.overlay).classList.add('show');
                    popup = document.createElement("img");
                    popup.src = obj.url;
                    popup.classList.add('big_img');
                    popup.classList.add('show');
                    document.querySelector(DOMstrings.galleryContainer).appendChild(popup);
                });
                document.querySelector(DOMstrings.overlay).addEventListener('click', function() {
                    document.querySelector(DOMstrings.overlay).classList.remove('show');
                    document.querySelector(DOMstrings.galleryContainer).removeChild(popup);
                });
            }))
    },
    title: function header() {
        fetch('https://jsonplaceholder.typicode.com/albums/' + this.id)
            .then(response => response.json())
            .then(json => document.querySelector(DOMstrings.headerBlock).textContent = json.title)
    },
    albumLength: function length() {
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then(response => response.json())
            .then(json => {
                if (this.id > 1) {
                    document.querySelector(DOMstrings.prev).removeAttribute('disabled');
                } else {
                    document.querySelector(DOMstrings.prev).setAttribute('disabled', 'true');
                }
                if (this.id <= json.length - 1) {
                    document.querySelector(DOMstrings.next).removeAttribute('disabled');
                } else {
                    document.querySelector(DOMstrings.next).setAttribute('disabled', 'true');
                }
            })
    },
};

function init() {
    album.albumId();
    album.title();
    album.albumLength();
};
init();

function click() {
    document.querySelector(DOMstrings.next).addEventListener('click', function() {
        while (document.querySelector(DOMstrings.parent).firstChild) {
            document.querySelector(DOMstrings.parent).removeChild(document.querySelector(DOMstrings.parent).firstChild);
        }
        album.id++;
        init();
    });
    document.querySelector(DOMstrings.prev).addEventListener('click', function() {
        while (document.querySelector(DOMstrings.parent).firstChild) {
            document.querySelector(DOMstrings.parent).removeChild(document.querySelector(DOMstrings.parent).firstChild);
        }
        album.id--;
        init();
    })
};
click();