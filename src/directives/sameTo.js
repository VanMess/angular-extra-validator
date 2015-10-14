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
