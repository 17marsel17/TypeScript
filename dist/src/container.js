System.register(["inversify", "./Repository/app"], function (exports_1, context_1) {
    "use strict";
    var inversify_1, app_1, container;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (inversify_1_1) {
                inversify_1 = inversify_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            }
        ],
        execute: function () {
            exports_1("container", container = new inversify_1.Container());
            container.bind(app_1.BookRepository).toSelf();
        }
    };
});
