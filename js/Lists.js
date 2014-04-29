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