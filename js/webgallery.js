
function Galery(elem, start) {
    this.elem = elem;

    if (window.XMLHttpRequest) {
        this.xmlhttp = new XMLHttpRequest();
    } else {
        if (window.ActiveXObject) {
            this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            alert("Bummer! Your browser does not support XMLHTTP!");
        }
    }

    if (start)
    {
        this.start();
    }
}

Galery.prototype.nextRequest = 0;
Galery.prototype.perPage = 24;

Galery.prototype.start = function() {

    var inst = this;
    this.interval = window.setInterval(function() {
        inst.scroll();
    }, 250);
};




Galery.prototype.stop = function() {
    window.clearInterval(this.interval);
};

Galery.prototype.scroll = function() {

    var scrollPosition;

    if (navigator.appName == "Microsoft Internet Explorer")
    {
        scrollPosition = document.documentElement.scrollTop;
    } else {
        scrollPosition = window.pageYOffset;
    }

    if (this.elem.clientHeight + this.elem.offsetTop < document.documentElement.clientHeight + scrollPosition + 100) {
        this.stop();

        var url = "./store.php?posi=" + this.nextRequest + "&posf=" + (this.nextRequest + this.perPage - 1);

        this.xmlhttp.open("GET", url, true);
        this.xmlhttp.send();

        this.nextRequest += (this.perPage);

        var self = this;

        this.xmlhttp.onreadystatechange = function() {
            self.putImages();
        };
    }
}


Galery.prototype.putImages = function() {

    if (this.xmlhttp.readyState == 4)
    {
        if (this.xmlhttp.responseText) {

            var files = JSON.parse(this.xmlhttp.responseText);

            var count = files.items.length;

            if (count > 0)
            {
                for (i = 0; i < count; i++) {
                    document.getElementById("container").innerHTML += '<img src="./thumb/' + files.items[i].icon + '">';
                }
                this.start();
            }
        }
    }

}
