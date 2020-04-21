/************************************************************************** 
// CS: Page 
// Permite leer una pagina SVG a un objeto de DOM
 ************************************************************************/

function Page(_selector) {

    /** PRIVATE PROPERTIES **/
    var page = this;
    var fpageorm = this;
    var jqPage = $(_selector);
    var file = 'pages/' + _selector.replace(".", "") + ".svg";

    /** PUBLIC PROPERTIES **/
    this.file = file;

    /** PRIVATE FUNCTIONS **/
    function init() {
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", eventLoad);
        oReq.open("GET", file);
        oReq.send();
    }

    function eventLoad() {
        jqPage.html("").append(this.responseXML.documentElement)
        addEvents();
        page.endLoad();
    }

    function addEvents() {
        //get images dialog and create event dialog
        jqPage.find(".dlg-img").bind("click", openImage);
        jqPage.find(".dlg-txt").bind("click", openText);
    }

    function openImage() {
        var img = $(this)
        var dlg = $(".dialog")
        dlg.find(".item").hide();
        dlg.find(".dlg-img").show();
        dlg.find(".dlg-img img").attr("src", img.attr("xlink:href").replace("min/", "").replace("min\\", ""));
        dlg[0].showModal();
    }

    function openText() {
        var dlg = $(".dialog");
        dlg.txt = dlg.find(".dlg-txt");
        dlg.txt.find(".text").html("<svg/>");

        var svg = dlg.find("svg");
        svg.group = $(this).clone();
        svg.group.rect = svg.group.find("rect");
        svg.group.rect.width = parseInt(svg.group.rect.attr("width"));
        svg.group.rect.height = parseInt(svg.group.rect.attr("height"));

        var scale = Math.floor10((dlg.width() - 0.02 * dlg.width()) / svg.group.rect.width, -1);
        console.log(`la escala es de ${scale}`)
        calcDimension(scale, dlg, svg);

        //hide all elements, show this element and open modal.

        dlg.find(".item").hide();
        dlg.txt.show();
        dlg[0].showModal();

        //show scroll
        if (dlg.height() < dlg.txt.height()) {
            dlg.txt.find(".text").css("height", `${dlg.height() - 65}px`);
        }
    }

    function calcDimension(scale, dlg, svg) {
        svg.group.rect.x = parseInt(svg.group.rect.attr("x"));
        svg.group.rect.y = parseInt(svg.group.rect.attr("y"));

        svg.width = parseInt(svg.group.rect.width);
        svg.height = parseInt(svg.group.rect.height + svg.group.rect.height * 0.1);

        svg.attr("width", svg.width);
        svg.attr("height", svg.height);

        svg.group.x = parseInt(-svg.group.rect.x * scale);
        svg.group.y = parseInt(-svg.group.rect.y * scale);

        svg.group.attr("transform", `translate(${svg.group.x}, ${svg.group.y}) scale(${scale}, ${scale})`);
        svg.append(svg.group);


    }

    /** PRIVILEGED METHODS **/
    /*     this.render = function (options) {
    
        } */

    init();
}

Page.prototype = {
    constructor: Page,

    //Plublic: Funcion que se ejecuta cuando la obtencion es satisfactoria
    endLoad: function () {
        console.info("Termino la carga de archivo de SVG");
    },

    //Plublic: Funcion que se ejecuta cuando la obtencion fallo
    fail: function () {
        console.error("Fallo la creación" + this.error.args.get_message())
    }
}

/************************************************************************** 
// CS: Page UI
// Permite configurar las paginas para la animacion de paginas
 ************************************************************************/

function PageUI() {

    /** PRIVATE PROPERTIES **/
    var config = {
        $bookBlock: $('#bb-bookblock'),
        $navNext: $('#bb-nav-next'),
        $navPrev: $('#bb-nav-prev'),
        $navFirst: $('#bb-nav-first'),
        $navLast: $('#bb-nav-last')
    }

    /** PUBLIC PROPERTIES **/
    //this.config = file;

    /** PRIVATE FUNCTIONS **/
    function init() {
        config.$bookBlock.bookblock({
            speed: 1000,
            shadowSides: 0.8,
            shadowFlip: 0.4
        });
        initEvents();
    }

    function initEvents() {
        var $slides = config.$bookBlock.children();

        // add navigation events
        config.$navNext.on('click touchstart', function () {
            config.$bookBlock.bookblock('next');
            return false;
        });

        config.$navPrev.on('click touchstart', function () {
            config.$bookBlock.bookblock('prev');
            return false;
        });

        config.$navFirst.on('click touchstart', function () {
            config.$bookBlock.bookblock('first');
            return false;
        });

        config.$navLast.on('click touchstart', function () {
            config.$bookBlock.bookblock('last');
            return false;
        });

        // add swipe events
        $slides.on({
            'swipeleft': function (event) {
                config.$bookBlock.bookblock('next');
                return false;
            },
            'swiperight': function (event) {
                config.$bookBlock.bookblock('prev');
                return false;
            }
        });

        // add keyboard events
        $(document).keydown(function (e) {
            var keyCode = e.keyCode || e.which,
                arrow = {
                    left: 37,
                    up: 38,
                    right: 39,
                    down: 40
                };

            switch (keyCode) {
                case arrow.left:
                    config.$bookBlock.bookblock('prev');
                    break;
                case arrow.right:
                    config.$bookBlock.bookblock('next');
                    break;
                case arrow.up:
                    config.$bookBlock.bookblock('first');
                    break;
                case arrow.down:
                    config.$bookBlock.bookblock('last');
                    break;
            }
        });
    }

    /** PRIVILEGED METHODS **/
    /*     this.init = function () {
            init();
        } */

    init();
}

PageUI.prototype = {
    constructor: PageUI,

    //Plublic: Funcion que se ejecuta cuando la obtencion es satisfactoria
    endLoad: function () {
        console.info("Termino la carga de archivo de SVG");
    },

    //Plublic: Funcion que se ejecuta cuando la obtencion fallo
    fail: function () {
        console.error("Fallo la creación" + this.error.args.get_message())
    }
}
