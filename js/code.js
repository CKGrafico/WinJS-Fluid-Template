///#source 1 1 /js/Data.js
(function () {
    'use strict';

    // Namespace
    WinJS.Namespace.define("Data", {
        initialize: initialize,
        dataSecondPage: dataSecondPage
    });

    // Initialize
    function initialize() {
        return new WinJS.Promise(function (complete) {

            // Get Items
            Data.itemList = getItems();
    
            /*
            getItemsAsync().then(function (results) {
                Data.itemsAsync = results;
            }).then(complete);
            */

            // Get ...

            // Complete (but check async methods..)
            complete();
        });
    }

    // Data
    function getItems() {
        return [
            { title: "Marvelous Mint", text: "Gelato", picture: "/images/fruits/60Mint.png" },
            { title: "Succulent Strawberry", text: "Sorbet", picture: "/images/fruits/60Strawberry.png" },
            { title: "Banana Blast", text: "Low-fat frozen yogurt", picture: "/images/fruits/60Banana.png" },
            { title: "Lavish Lemon Ice", text: "Sorbet", picture: "/images/fruits/60Lemon.png" },
            { title: "Creamy Orange", text: "Sorbet", picture: "/images/fruits/60Orange.png" },
            { title: "Very Vanilla", text: "Ice Cream", picture: "/images/fruits/60Vanilla.png" },
            { title: "Banana Blast", text: "Low-fat frozen yogurt", picture: "/images/fruits/60Banana.png" },
            { title: "Lavish Lemon Ice", text: "Sorbet", picture: "/images/fruits/60Lemon.png" }
        ];
    }

    function getItemsAsync() {
        return WinJS.xhr({
            url: '',
            type: 'GET'
        });
    }

    function dataSecondPage() {
        return new WinJS.Promise(function (complete) {
            // Get information about this page

            complete();
        });
    }
})();
///#source 1 1 /js/default.js
(function (app, nav) {
    "use strict";

    app.onactivated = function (args) {

        // Initialize all
        WinJS.Promise.sequence([Data.initialize, Lists.initialize, WinJS.UI.processAll])
            .then(function () {

                // Navigate to home
                nav.navigate(Application.navigator.home);
        });
    };

    app.oncheckpoint = function (args) {
        
    };

    app.start();

    // WinJS secuence https://github.com/winjs/winjs/issues/165#issuecomment-40871159
    WinJS.Promise.sequence = function (operations) {
        return operations.reduce(function (p, op) {
            return p.then(op);
        }, WinJS.Promise.as());
    };
})(WinJS.Application, WinJS.Navigation);

///#source 1 1 /js/Lists.js
(function () {
    'use strict';

    // Namespace
    WinJS.Namespace.define("Lists", {
        initialize: initialize,
        getListsSecond: getListsSecond
    });

    // Initialize function
    function initialize() {
        return new WinJS.Promise(function (complete) {

            // List LastWeek
            Lists.ItemList = {
                items: new WinJS.Binding.List(Data.itemList)
            };

            // List ...

            // Complete
            complete();
        });
    }

    // Initialize function
    function getListsSecond() {
        return new WinJS.Promise(function (complete) {

            // List ...

            // Complete
            complete();
        });
    }
})();
///#source 1 1 /js/navigator.js
(function () {
    "use strict";

    var nav = WinJS.Navigation;

    WinJS.Namespace.define("Application", {
        PageControlNavigator: WinJS.Class.define(
            // Defina la función constructora para el elemento PageControlNavigator.
            function PageControlNavigator(element, options) {
                this._element = element || document.createElement("div");
                this._element.appendChild(this._createPageElement());

                this.home = options.home;

                this._eventHandlerRemover = [];

                var that = this;
                function addRemovableEventListener(e, eventName, handler, capture) {
                    e.addEventListener(eventName, handler, capture);
                    that._eventHandlerRemover.push(function () {
                        e.removeEventListener(eventName, handler);
                    });
                };

                addRemovableEventListener(nav, 'navigating', this._navigating.bind(this), false);
                addRemovableEventListener(nav, 'navigated', this._navigated.bind(this), false);

                window.onresize = this._resized.bind(this);

                Application.navigator = this;
            }, {
                home: "",
                /// <field domElement="true" />
                _element: null,
                _lastNavigationPromise: WinJS.Promise.as(),
                _lastViewstate: 0,

                // Este es el objeto Page cargado actualmente.
                pageControl: {
                    get: function () { return this.pageElement && this.pageElement.winControl; }
                },

                // Este es el elemento raíz de la página actual.
                pageElement: {
                    get: function () { return this._element.firstElementChild; }
                },

                // Esta función desecha el navegador de páginas y su contenido.
                dispose: function () {
                    if (this._disposed) {
                        return;
                    }

                    this._disposed = true;
                    WinJS.Utilities.disposeSubTree(this._element);
                    for (var i = 0; i < this._eventHandlerRemover.length; i++) {
                        this._eventHandlerRemover[i]();
                    }
                    this._eventHandlerRemover = null;
                },

                // Crea un contenedor para la carga de una nueva página.
                _createPageElement: function () {
                    var element = document.createElement("div");
                    element.setAttribute("dir", window.getComputedStyle(this._element, null).direction);
                    element.style.position = "absolute";
                    element.style.visibility = "hidden";
                    element.style.width = "100%";
                    element.style.height = "100%";
                    return element;
                },

                // Recupera una lista de elementos de animación para la página actual.
                // Si la página no define una lista, animar toda la página.
                _getAnimationElements: function () {
                    if (this.pageControl && this.pageControl.getAnimationElements) {
                        return this.pageControl.getAnimationElements();
                    }
                    return this.pageElement;
                },

                _navigated: function () {
                    this.pageElement.style.visibility = "";
                    WinJS.UI.Animation.enterPage(this._getAnimationElements()).done();
                },

                // Responde a la navegación al agregar páginas nuevas a DOM. 
                _navigating: function (args) {
                    var newElement = this._createPageElement();
                    this._element.appendChild(newElement);

                    this._lastNavigationPromise.cancel();

                    var that = this;

                    function cleanup() {
                        if (that._element.childElementCount > 1) {
                            var oldElement = that._element.firstElementChild;
                            // Limpiar y quitar el elemento anterior 
                            if (oldElement.winControl) {
                                if (oldElement.winControl.unload) {
                                    oldElement.winControl.unload();
                                }
                                oldElement.winControl.dispose();
                            }
                            oldElement.parentNode.removeChild(oldElement);
                            oldElement.innerText = "";
                        }
                    }

                    this._lastNavigationPromise = WinJS.Promise.as().then(function () {
                        return WinJS.UI.Pages.render(args.detail.location, newElement, args.detail.state);
                    }).then(cleanup, cleanup);

                    args.detail.setPromise(this._lastNavigationPromise);
                },

                // Responde a eventos de cambio de tamaño y llama a la función updateLayout
                // en la página cargada en ese momento.
                _resized: function (args) {
                    if (this.pageControl && this.pageControl.updateLayout) {
                        this.pageControl.updateLayout.call(this.pageControl, this.pageElement);
                    }
                },
            }
        )
    });
})();

///#source 1 1 /js/pages/home.js
(function (nav) {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {

        ready: function (element, options) {
            document.getElementsByClassName('navigator')[0].addEventListener('click', function () {
                var link = this.getAttribute('data-page');
                WinJS.Promise.join(Data.dataSecondPage(), Lists.getListsSecond(), WinJS.UI.processAll())
                    .then(function () {
                        nav.navigate(link);
               });
            }, false);
        }
    });
})(WinJS.Navigation);

///#source 1 1 /js/pages/page.js
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/page/page.html", {
        ready: function (element, options) {
            // Page loaded
        }
    });
})();

