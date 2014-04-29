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