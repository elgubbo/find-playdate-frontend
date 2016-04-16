var app = angular.module('findPlayDate');

app.directive('errSrc', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if (attrs.src !== attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                    element.css('visibility', 'initial');
                    if (element.parent().hasClass('steam-image')) {
                        element.css('margin-top', '-47%');
                    }
                }
            });
        }
    };
});


app.directive('errSrcModal', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if (attrs.src !== attrs.errSrcModal) {
                    attrs.$set('src', attrs.errSrcModal);
                    element.css('visibility', 'initial');
                }
            });
        }
    };
});


 app.directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background-image': 'url(' + value +')',
                'background-size' : 'cover'
            });
        });
    };
});

//Validators

app.directive('gameValidator', function() {
    return {
        require : 'ngModel',
        link : function($scope, element, attrs, ngModel) {
            ngModel.$validators.gameValidator = function(value) {
                var status = true;
                if (!angular.isObject(value)) {
                    status = false;
                } else {
                    if ((!value.value)) {
                        status = false;
                    }
                }
                return status;
            };
        }
    };
});
app.directive('regionValidator', function() {
    return {
        require : 'ngModel',
        link : function($scope, element, attrs, ngModel) {
            ngModel.$validators.regionValidator = function(value) {
                var status = true;
                if (!angular.isObject(value)) {
                    status = false;
                } else {
                    if (!(value.value)) {
                        status = false;
                    }
                }
                return status;
            };
        }
    };
});

app.directive('formLocator', function($parse) {
    return {
      link: function(scope, element, attrs) {
        scope.$emit('formLocator', $parse(attrs.playDate)(scope));
      }
    };
});
//REFACTOR THIS SHIT
app.directive('messageButton', function($parse, CardService) {
    return {
        scope: false,
        link: function(scope, element, attrs) {
            element.bind('click', function(ev) {
                var playdate = $parse(attrs.playDate)(scope);
                ev.preventDefault();
                var el = angular.element(ev.target);
                element.parent().parent().parent().parent().parent().parent().find('.shown').toggleClass( 'hidden-custom' );
                element.parent().parent().parent().parent().parent().parent().find('.shown').removeClass( 'shown' );
                element.parent().parent().parent().parent().parent().find('.paper').toggleClass( 'hidden-custom' );
                element.parent().parent().parent().parent().parent().find('.paper').toggleClass( 'shown' );
                CardService.showMessage[playdate._id] = true;
                CardService.startCardMessage(playdate);
                scope.$digest();
            });
        },
    };
});
app.directive('cancelButton', function($parse, CardService) {
    return {
        scope: false,
        link: function(scope, element, attrs) {
            element.bind('click', function(ev) {
                var playdate = $parse(attrs.playDate)(scope);
                ev.preventDefault();
                var el = angular.element(ev.target);
                el.parent().parent().parent().parent().parent().toggleClass( 'hidden-custom' );
                el.parent().parent().parent().parent().parent().toggleClass( 'shown' );
                CardService.showMessage[playdate._id] = false;
                scope.$digest();
            });
        },
    };
});

app.directive('sendButton', function($parse, CardService) {
    return {
        scope: false,
        link: function(scope, element, attrs) {
            element.bind('click', function(ev) {
                var playdate = $parse(attrs.playDate)(scope);
                CardService.getCardMessage(playdate).send();
                ev.preventDefault();
                var el = angular.element(ev.target);
                el.parent().parent().parent().parent().parent().toggleClass( 'hidden-custom' );
                el.parent().parent().parent().parent().parent().toggleClass( 'shown' );
                CardService.showMessage[playdate._id] = false;
                scope.$digest();
            });
        },
    };
});

app.directive('shareButton', function() {
    return {
        restrict: 'A',
        scope: true,
        controller: function($scope, $element){
            $element.bind('click', function(ev, $element) {
                ev.preventDefault();
                var el = angular.element(ev.target);
                el.parent().find( 'div' ).toggleClass( 'card__social--active' );
                el.toggleClass('share-expanded');
            });
        }
    };
});