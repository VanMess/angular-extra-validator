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
