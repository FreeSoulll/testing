(function (galleryId) {

    // //default variables
    // =========================================
    var DOMstrings = {
        next: '.next',
        prev: '.prev',
        overlay: '.overlay',
        headerBlock: '.header_text',
        parent: '.gallery_items',
        galleryContainer: '.gallery_container',
        imgGallery: '.container_small_img',
        popup: '.popup',
        smallImg: '.small_img'
    };
    //init prototype
    function parameters(id) {
        this.id = id,
        this.albumId(),
        this.overlay(),
        this.bigImg(),
        this.title(),
        this.albumLength()
    };
    //album id
    // =========================================
    parameters.prototype.albumId = function () {
        fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + this.id)
            .then(response => response.json())
            .then(json => json.forEach(function (obj) {
                var img = document.createElement("img");
                var link = document.createElement("div");
                img.src = obj.thumbnailUrl;
                link.setAttribute('data-images', obj.url);
                link.classList.add('container_small_img');
                img.classList.add('small_img');
                document.querySelector(DOMstrings.parent).appendChild(link).appendChild(img);
            }))
    };
    //overlay
    // =========================================
    parameters.prototype.overlay = function () {
        fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + this.id)
            .then(response => response.json())
            .then(() => {
                var overlay = document.createElement('div');
                overlay.classList.add('overlay');
                document.querySelector('.gallery_block').appendChild(overlay);
            })
    };
    //big img from prev
    // =========================================
    parameters.prototype.bigImg = function () {
        fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + this.id)
            .then(response => response.json())
            .then(() => {
                document.querySelectorAll(DOMstrings.imgGallery).forEach(elem => elem.addEventListener('click', function () {
                    var popup = document.createElement("img");
                    document.querySelector(DOMstrings.overlay).classList.add('show');
                    popup.src = this.getAttribute('data-images');
                    popup.classList.add('big_img');
                    popup.classList.add('show');
                    document.querySelector(DOMstrings.galleryContainer).appendChild(popup);
                }));
                document.querySelector(DOMstrings.overlay).addEventListener('click', function () {
                    document.querySelector(DOMstrings.overlay).classList.remove('show');
                    var popup = document.querySelector('.big_img');
                    document.querySelector(DOMstrings.overlay).classList.remove('show');
                    document.querySelector(DOMstrings.galleryContainer).removeChild(popup);
                });
            })
    };
    // titles album
    // =========================================
    parameters.prototype.title = function () {
        fetch('https://jsonplaceholder.typicode.com/albums/' + this.id)
            .then(response => response.json())
            .then(json => document.querySelector(DOMstrings.headerBlock).textContent = json.title)
    };
    //length album
    // =========================================
    parameters.prototype.albumLength = function () {
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
    };
    //click next album
    // =========================================
    document.querySelector(DOMstrings.next).addEventListener('click', function () {
        while (document.querySelector(DOMstrings.parent).firstChild) {
            document.querySelector(DOMstrings.parent).removeChild(document.querySelector(DOMstrings.parent).firstChild);
        }
        document.querySelector('.gallery_block').removeChild(document.querySelector('.overlay'));
        gallery.id++;
        var gallerys = new parameters(gallery.id);
    });
    //click prev album
    // =========================================
    document.querySelector(DOMstrings.prev).addEventListener('click', function () {
        while (document.querySelector(DOMstrings.parent).firstChild) {
            document.querySelector(DOMstrings.parent).removeChild(document.querySelector(DOMstrings.parent).firstChild);
        }
        document.querySelector('.gallery_block').removeChild(document.querySelector('.overlay'));
        gallery.id--;
        var gallerys = new parameters(gallery.id);
    })

    var gallery = new parameters(galleryId);
})('1');

