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
