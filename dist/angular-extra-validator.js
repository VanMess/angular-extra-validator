/*
 * angular-extra-validator - v0.0.1 - 2015-10-14
 * https://github.com/VanMess/angular-extra-validator
 * Copyright (c) 2014 Van (http://vanmess.github.io/)
 */
 !(function(factory) {
   if (typeof define === 'function' && define.amd) {
        // AMD
        define(['angular'], factory);
    } else {
        // Global Variables
        factory(window.angular);
    }
    factory(window.angular);
})(function(ng) {
    'use strict';

Object.keys = Object.keys || (function(obj) { //ecma262v5 15.2.3.14
    var hasOwn = Object.prototype.hasOwnProperty,
        DONT_ENUM = 'propertyIsEnumerable,isPrototypeOf,hasOwnProperty,toLocaleString,toString,valueOf,constructor'.split(',');
    return function(obj) {
        var result = [];
        for (var key in obj)
            if (hasOwn.call(obj, key)) {
                result.push(key);
            }
        if (DONT_ENUM && obj) {
            for (var i = 0; key = DONT_ENUM[i++];) {
                if (hasOwn.call(obj, key)) {
                    result.push(key);
                }
            }
        }
        return result;
    };
})();

var libraryName = 'vgValidator';
ng.module(libraryName, []);

/*
 *   用于检测字段是否为空对象
 */
ng.module(libraryName).directive('tmpvgNoEmpty', [

    function() {

        return {
            restrict: 'A',
            replace: false,
            require: 'ngModel',
            link: function($scope, $element, $attrs, c) {
                $scope.$watch($attrs.ngModel, function(v) {
                    c.$setValidity('noEmpty', !_isEmpty(v));
                });
            }
        };

        function _isEmpty() {
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                toString = Object.prototype.toString;

            if (obj == null) return true;
            if (obj + '' === 'undefined') return true;
            if (hasOwnProperty.call(obj, 'length') && (toString.call(obj) === '[object Array]' || toString.call(obj) === '[object String]' || hasOwnProperty.call(obj, 'callee'))) {
                return obj.length === 0;
            }
            return Object.keys(obj).length === 0;
        }
    }
]);

/*
 * 检测两个值是否一致
 * 可用于form中两个input必须相等的场景
 * 如 密码与确认密码
 */
ng.module(libraryName).directive('vgSameTo', ['$parse',
    function($parse) {
        return {
            require: '?ngModel',
            link: function(scope, elem, attrs, ctrl) {
                var anotherGetter = $parse(attrs['vgSameTo']),
                    result = false,
                    detect = function(newVal, oldVal) {
                        if (newVal === oldVal) return;
                        ctrl.$setValidity('sameTo', ctrl.$modelValue === anotherGetter(scope));
                        if (!scope.$$phase) {
                            scope.$digest();
                        }
                    };

                if (!ctrl) return;

                scope.$watch(function() {
                    return anotherGetter(scope);
                }, detect);
                scope.$watch(function() {
                    return ctrl.$modelValue;
                }, detect);
            }
        }
    }
]);

});
