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
