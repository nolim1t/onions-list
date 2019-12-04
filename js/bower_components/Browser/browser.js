window.Browser = (function(window){
    /**
     * Browser helper library for common things we need to know.
     * Access via get method: Browser.get("clickEvent");
     * ----------------------------------------------------------------------------
     */
    var BrowserHelpers = {
        clickEvent: function() {
            return "ontouchstart" in window ? "touchend" : "click";
        },
        cssPrefix: function() {
            var el = document.createElement( "div" ),
            prefixes = ["Webkit", "Moz", "O", "ms"];
            for ( var i = 0; i < prefixes.length; i++ ) {
                if ( prefixes[i] + "Transition" in el.style ) {
                    return prefixes[i];
                }
            }
            return "transition" in el.style ? "" : false;
        },
        getPrefixedCssProp: function(baseProp) {
            var str = this.cssPrefix();
            if (!str) return false;
            str = str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
            return str;
        },
        transitionEvent: function() {
            var prefix = this.cssPrefix(),
                cssProp = this.getPrefixedCssProp(prefix),
                transitionEvent;

            switch(prefix) {
                case "Moz":
                    transitionEvent = "transitionend";
                    break;
                case "Webkit":
                    transitionEvent = "webkitTransitionEnd";
                    break;
                case "O":
                    transitionEvent = "oTransitionEnd";
                    break;
                case "ms":
                    transitionEvent = "MSTransitionEnd";
                    break;
                case "":
                    transitionEvent = "transitionend";
                    break;
            }
            return transitionEvent;
        },
        animationEvent: function() {
            var prefix = this.cssPrefix(),
                cssProp = this.getPrefixedCssProp(prefix),
                animationEvent;

            switch(prefix) {
                case "Moz":
                    animationEvent = "animationend";
                    break;
                case "Webkit":
                    animationEvent = "webkitAnimationEnd";
                    break;
                case "O":
                    animationEvent = "oAnimationEnd";
                    break;
                case "ms":
                    animationEvent = "MSAnimationEnd";
                    break;
                case "":
                    animationEvent = "animationend";
                    break;
            }
            return animationEvent;
        },
        _getHelper: function(key) {
            if (!arguments.length) {
                return false;
            }
            var self = this,
                helperFunc;
            helperFunc = self[key];
            if (typeof(helperFunc) === "function") {
                return helperFunc.call(self);
            }
            return false;
        }
    };

    /**
     * Default tests
     * ----------------------------------------------------------------------------
     */
    var DefaultTests = {
        modern: function(){
            return 'querySelector' in document && 'localStorage' in window && 'addEventListener' in window;
        }
    };

    /**
     * Browser object
     * ----------------------------------------------------------------------------
     */
    var Browser = {
        tests: {},
        results: {},
        init: function(tests) {
            var self = this;
            if (!arguments.length) {
                self.addTests(DefaultTests);
            } else {
                self.addTests(Tests);
            }
        },
        _getResult: function(key) {
            if (!arguments.length) {
                return false;
            }
            var self = this;
            return self.results[key];
        },
        _run: function(testName) {
            var self = this;
            var testFunc = self.tests[testName];
            if (typeof(testFunc) === "function") {
                self.results[testName] = testFunc();
            }
        },
        _remove: function(testName) {
            var self = this;
            var _test = self.tests[testName];
            var _result = self.results[testName];
            if (_test) {
                _test = undefined;
            }
            if (_result) {
                _result = undefined;
            }
        },
        addTests: function(object) {
            if (!arguments.length) {
                return false;
            }
            var self = this,
                testFunc;
            switch (typeof(object)) {
                case "object":
                    for (var testName in object) {
                        testFunc = object[testName];
                        self.addTest(testName, testFunc);
                    }
                    break;
                case "function":
                    this.addTest("userTest", object);
                    break;
                default:
                    return false;
            }

            return this;
        },
        runTests: function(){
            var self = this;
            if (!self.tests) {
                return false;
            }
            for (var testName in self.tests) {
                self._run(testName);
            }
            self.updateHtml();
            return self.results;
        },
        updateHtml: function() {
            var self = this;
            for (var res in self.results) {
                if (self.results[res]) {
                    document.documentElement.className += " " + res;
                }
            }
            document.documentElement.className = document.documentElement.className.replace("no-js", "js");
        },
        runTest: function(testName){
            var self = this;
            self._run(testName);
        },
        addTest: function(testName, testFunc){
            var self = this;
            if (!self.tests[testName]) {
                self.tests[testName] = testFunc;
            }
        },
        removeTest: function(testName){
            var self = this;
            self._remove(testName);
            return true;
        },
        removeTests: function() {
            var self = this;
            self.tests = {};
            self.results = {};
            return true;
        }
    };

    /**
     * Run the test package
     */
//    Browser.init();
//    Browser.runTests();

    /**
     * Expose the Browser object to the window
     */
    return {
        features: function() {
            return Browser.results;
        },
        is: function(key) {
            return Browser._getResult(key);
        },
        has: function(key) {
            return Browser._getResult(key);
        },
        supports: function(key) {
            return Browser._getResult(key);
        },
        get: function(key) {
            return BrowserHelpers._getHelper(key);
        },
        removeTest: function(testName){
            return Browser.removeTest(testName);
        },
        removeTests: function(){
            return Browser.removeTests();
        },
        addTest: function(testName, testFunc){
            return Browser.addTest();
        },
        addTests: function(tests){
            return Browser.addTests(tests);
        },
        runTest: function(testName){
            return Browser.runTest(testName);
        },
        runTests: function(){
            return Browser.runTests();
        },
        init: function(tests){
            return Browser.init(tests);
        }
    };

})(window);


/**
 * Your feature tests
 * ----------------------------------------------------------------------------
 */
var Tests = (function(window, Browser){

    // Define your test suite here. For more tests, visit the exhaustive list:
    // http://diveintohtml5.info/everything.html
    var Tests = {
        responsive: function() {
            return typeof(window.matchMedia) === "function" ? true : false;
        },
        modern: function(){
            return 'querySelector' in document && 'localStorage' in window && 'addEventListener' in window;
        },
        touchEvents: function() {
            return "ontouchstart" in window;
        },
        noTouchEvents: function() {
            return "ontouchstart" in window ? false : true;
        },
        placeholders: function() {
            return ('placeholder' in document.createElement('input'));
        },
        nativeOverflowScrolling: function() {
            var el = document.createElement('div');
            el.setAttribute('style', '-webkit-overflow-scrolling: touch;');
            return el.style.webkitOverflowScrolling == 'touch' ? true : false;
        },
        mobile: function() {
            var userAgent = navigator.userAgent.toLowerCase();
            return userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/) ? true : false;
        },
        fixed: function() {
            var test = document.createElement('div');
            var root = document.documentElement;
            test.style.cssText = 'position:fixed;top:0;';
            root.appendChild(test);
            var hasFixed = test.offsetTop === 0 ? true : false;
            root.removeChild(test);
            return hasFixed;
        },
        sticky: function() {
            var test = document.createElement('div');
            var root = document.documentElement;
            var hasSticky = false;
            var vendors = ["webkit","moz","o",""];
            for (var vendor in vendors) {
                var val = (vendors[vendor] == "") ? "sticky" : "-"+vendors[vendor]+"-sticky";
                test.style.position = val;
                root.appendChild(test);
                if(test.style.position === val) {
                    hasSticky = true;
                    break;
                }
                root.removeChild(test);
            }
            return hasSticky;
        },
        windowsPhoneMango: function() {
            return navigator.userAgent.match(/IEMobile9.0/) ? true : false;
        },
        retina: function() {
            var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
            if (window.devicePixelRatio > 1) {
                return true;
            }
            if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
                return true;
            }
            return false;
        },
        history: function() {
            return window.history && window.history.pushState ? true : false;
        },
        tel: function() {
            var i = document.createElement('input');
            i.setAttribute('type', 'tel');
            return i.type !== 'text';
        },
        postMessage: function() {
            return !!window.postMessage;
        },
        fileApi: function() {
            return typeof FileReader != 'undefined';
        },
        localStorage: function() {
            try {
              return 'localStorage' in window && window['localStorage'] !== null;
            } catch(e) {
              return false;
            }
        }
    };

    return Tests;

})(window, Browser);

// Run the test package
Browser.init(Tests);
Browser.runTests();
