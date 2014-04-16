'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
        controller('mainCTRL', function($scope, $rootScope) {
            var timeline = new TimelineMax();



            $rootScope.activateAnalytics = false;

            //var idleview = false;
            $(document).idle({
                onIdle: function() {
                    console.log('idle started');
                    $rootScope.activateAnalytics = false;

                    timeline.play(0);

                    $('.dynaDiv').animate({height: '360px'});
                    $('.midSized').animate({width: '44%'});
                },
                idle: 60000
            });


            $(".overlay").click(function() {
                $rootScope.activateAnalytics = true;
                timeline.pause();
                timeline.seek(0);

            });



            $(function() {
                var clickit = function(whatToClick) {
                    console.log(whatToClick + ' before clicked')

                    $(whatToClick).click();

                };
                var cta = '.cta';
                timeline.to('.overlay', .2, {
                    width: '100%'
                });

                timeline.to(cta, 2, {
                    delay: 2,
                    opacity: 1

                });

                timeline.to(cta, 3, {
                    left: "40%",
                    bottom: "68%"

                });

                timeline.to(cta, .5, {
                    width: "150px"
                });


                timeline.to(cta, .5, {
                    width: "210px"
                }
                );
                timeline.call(function() {

                    clickit(".promos img")
                });

                timeline.to(cta, 2, {
                    left: "40%",
                    bottom: "14%"

                });

                timeline.to(cta, .5, {
                    delay: 2.5,
                    width: "150px"
                });
                timeline.call(function() {
                    clickit("#mprod")
                });

                timeline.to(cta, .5, {
                    width: "210px"
                });


                timeline.to(cta, 1, {left: "40%",
                    bottom: "3%"

                });

                timeline.to(cta, .5, {
                    delay: 2.5,
                    width: "150px"
                });


                timeline.to(cta, .5, {
                    width: "210px"
                });


                timeline.to(cta, 2, {
                    left: "20%",
                    bottom: "-6%"
                });


                timeline.to(cta, .5, {
                    delay: 2.5,
                    width: "150px"
                });

                timeline.call(function() {
                    clickit(".miniHalfs");
                });

                timeline.to(cta, .5, {
                    width: "210px"
                });
                timeline.to(cta, 1.5, {
                    left: "82%",
                    bottom: "-6%"
                });

                timeline.to(cta, .5, {
                    delay: 2.5,
                    width: "150px"
                });

                timeline.call(function() {
                    clickit(".tallHalfsE");
                });
                timeline.to(cta, .5, {
                    width: "210px"
                });
                  timeline.to(cta, 2, {
                    width: "0px"
                });
                timeline.call(function() {

                    $('.dynaDiv').animate({height: '360px'});
                    $('.midSized').animate({width: '44%'});
                });
                timeline.play();
            })



 
            $scope.resetApp = function() {

                ga('send', 'pageview', 'Idle View');
                $('.dynaDiv').animate({height: '360px'});
                $('.midSized').animate({width: '44%'});

            };

            //  
            $(".dynaDiv").resize(function( ) {


                
            });

            $('.dynaDiv').click(function(event) {



                if (event.target.id === "resetButton") {
                    return;
                }

                $('.dynaDiv').not(this).animate({height: '150px'});
                $(this).animate({height: '1000px'});
                if ($(this).hasClass("midSized")) {
                    $(this).animate({width: '79%'});
                    $('.midSized').not(this).animate({width: '9%', height: '1000px'});
                } else {
                    $('.midSized').animate({width: '44%', height: '150px'});
                }



            });
        })
        .controller('promotionCTRL', function($scope, $rootScope) {
            var counter = 0;
            $scope.myInterval = 5000;
            $scope.products = [
                {sliderImage: 'img/promos/promo1s.jpg'
                    , bigSlider: 'img/promos/promo1b.jpg'
                }, {sliderImage: 'img/promos/promo2s.jpg'
                    , bigSlider: 'img/promos/promo2b.jpg'
                }, {sliderImage: 'img/promos/promo3s.jpg'
                    , bigSlider: 'img/promos/promo3b.jpg'
                }, {sliderImage: 'img/promos/promo4s.jpg'
                    , bigSlider: 'img/promos/promo4b.jpg'
                }, {sliderImage: 'img/promos/promo5s.jpg'
                    , bigSlider: 'img/promos/promo5b.jpg'
                }
            ];
            $scope.nextProduct = function() {
                if (counter === 4) {
                    counter = -1;
                }
                $scope.currenProduct = $scope.products[++counter  ];

            };

            $scope.prevProduct = function() {
                if (counter === 0) {
                    counter = 5;
                }
                $scope.currenProduct = $scope.products[--counter];
            };

            $scope.changeProduct = function(product) {
                $scope.promoPivot = 'expanded';
                $scope.currenProduct = product;
                if ($rootScope.activateAnalytics) {
                    console.log("did send something");
                    ga('send', 'pageview', "Promotions");
                }
            };
            $scope.showSelector = function() {

                $scope.promoPivot = 'expandedMini';
            };

            $(function() {

                $("#Promotions").resize(function( ) {
                    if ($(this).height() <= 150) {
                        $scope.$apply(function() {
                            $scope.promoPivot = 'mini';

                        });

                    } else if ($(this).height() === 360) {
                        $scope.$apply(function() {
                            $scope.promoPivot = 'normal';

                        });

                    }
                });


            });

        }).controller('productsCTRL', function($scope, $http, $modal, $rootScope) {
    $scope.productFilter = {};

    $scope.open = function(product) {
        ga('send', 'pageview', "Moroccanoil modal");
        ga('send', 'event', 'Moroccanoil', 'product clicked', product.name);


        var modalInstance = $modal.open({
            templateUrl: 'partials/products/mOilproductModal.html',
            controller: ModalInstanceCtrl,
            resolve: {
                items: function() {
                    return product;
                }
            }
        });

    };
    $scope.backToMCat = function() {


        $scope.productsPivot = 'mOilexpanded';
        if ($rootScope.activateAnalytics) {
            ga('send', 'pageview', "Moroccanoil Categories");
        }
    };
    $scope.backToNCat = function() {
        $scope.productsPivot = 'nioxinExpanded';

        ga('send', 'pageview', "Nioxin Categories");

    };
    $scope.openN = function(product) {


        ga('send', 'pageview', "Nioxin modal");
        ga('send', 'event', 'Nioxin', 'product clicked', product.name);

        var modalInstance = $modal.open({
            templateUrl: 'partials/products/nioxinModal.html',
            controller: ModalInstanceCtrl,
            resolve: {
                items: function() {
                    return product;
                }
            }
        });

    };
    $scope.setFilter = function(filter) {
        $scope.productFilter.category = filter;

        if ($rootScope.activateAnalytics) {
            ga('send', 'event', 'Moroccanoil', 'filter clicked', filter);
        }

    };

    $scope.setNFilter = function(filter) {
        $scope.productFilter.category = filter.cat;
        $scope.currentCategory = filter;

        ga('send', 'event', 'Nioxin', 'filter clicked', filter.cat);
    };
    $scope.myInterval = 2500;

    $scope.showProductInNCat = function(data) {

        ga('send', 'pageview', "Nioxin Products");
        ga('send', 'event', 'Nioxin', 'category clicked', data.cat);

        $scope.productsPivot = 'nioxinProducts';
        $scope.productFilter.category = data.cat;
        $scope.currentCategory = data;


    };
    $scope.showProductInMCat = function(data) {
        if ($rootScope.activateAnalytics) {
            ga('send', 'pageview', "Moroccanoil Products");
            ga('send', 'event', 'Moroccanoil', 'category clicked', data);
        }

        $scope.productsPivot = 'MproductDisplay';
        $scope.productFilter.category = data;
    };
    $scope.expandMProducts = function() {
        $scope.productsPivot = 'mOilexpanded';
        $http.get('js/data/products.json').success(function(data) {
            $scope.products = data.mOilProducts;
            $scope.cats = data.mOilCat;

            if ($rootScope.activateAnalytics) {

                ga('send', 'pageview', "Moroccanoil Category");
            }
        });

    };
    $scope.expandNProducts = function() {
        $scope.productsPivot = 'nioxinExpanded';
        $http.get('js/data/products.json').success(function(data) {
            $scope.products = data.nioxinProducts;
            $scope.cats = data.nioxinCat;

            ga('send', 'pageview', "Nioxin Category");
        });

    };
    var ModalInstanceCtrl = function($scope, $modalInstance, items, $rootScope) {
        $(function() {
            if (items.videos) {
                $scope.currentVideo = items.videos[0].url;
                console.log(items.videos[0].name);

                ga('send', 'event', 'video', 'viewed', items.videos[0].name);
            }
            ;

        });
        $scope.item = items;

        $scope.changeVid = function(vid) {

            $scope.currentVideo = vid.url;

            ga('send', 'event', 'video', 'viewed', vid.name);

        };


        $scope.ok = function() {

            $modalInstance.close();
        };

        $scope.cancel = function() {
            if ($scope.productsPivot === "MproductDisplay") {
                ga('send', 'pageview', "Moroccanoil Products");

            }
            else {
                ga('send', 'pageview', "Nioxin Products");

            }


            $modalInstance.dismiss('cancel');
        };
    };

    $(function() {
        $("#Products").resize(function( ) {
            if ($(this).height() <= 150) {
                $scope.$apply(function() {
                    $scope.productsPivot = 'mini';
                });
            } else if ($(this).height() === 360) {
                $scope.$apply(function() {
                    $scope.productsPivot = 'normal';

                });

            }
        });
    });

}).controller('repcharge', function($scope, $http, $modal, $rootScope) {
    $scope.productFilter = {};

    $http.get('js/data/products.json').success(function(data) {
        $scope.products = data.repProducts;
        $scope.cats = data.repChargeCat;
    });

    $scope.showproducts = function(cat) {
        $scope.repchargePivot = 'products';
        $scope.productFilter.category = cat;

        if ($rootScope.activateAnalytics) {
            ga('send', 'event', 'Repechage', 'category clicked', cat);
            ga('send', 'pageview', "Repechage products");
        }
    };

    $scope.showCat = function() {
        $scope.repchargePivot = 'expanded';

        if ($rootScope.activateAnalytics) {
            ga('send', 'pageview', "Repechage category");
        }
    };

    $scope.setFilter = function(filter) {

        if ($rootScope.activateAnalytics) {
            ga('send', 'event', 'Repechage', 'filter clicked', filter);
        }
        $scope.productFilter.category = filter;
    };


    $scope.open = function(product) {

        ga('send', 'pageview', "Repechage modal");

        ga('send', 'event', 'Repechage', 'product clicked', product.name);
        var modalInstance = $modal.open({
            templateUrl: 'partials/repcharge/repModal.html',
            controller: ModalInstanceCtrl,
            resolve: {
                items: function() {
                    return product;
                }
            }
        });

    };
    var ModalInstanceCtrl = function($scope, $modalInstance, items) {

        $scope.item = items;

        $scope.ok = function() {
            $modalInstance.close();
        };

        $scope.cancel = function() {
            if ($rootScope.activateAnalytics) {
                ga('send', 'pageview', "Repechage products");
            }
            $modalInstance.dismiss('cancel');
        };
    };

    $(function() {

        $("#repechage").resize(function( ) {
            if ($(this).height() <= 150) {
                $scope.$apply(function() {
                    $scope.repchargePivot = 'mini';

                });

            } else if ($(this).height() === 360) {
                $scope.$apply(function() {
                    $scope.repchargePivot = 'normal';

                });

            }
        });


    });

}).controller('events', function($scope, $http, $modal, $rootScope) {



    $scope.expand = function() {
        $scope.eventsPivot = 'expanded';

    };
    $(function() {

        $("#events").resize(function() {
            if ($(this).height() <= 150) {
                $scope.$apply(function() {
                    $scope.eventsPivot = 'miniHeight';

                });

            } else if ($(this).width() <= 150) {
                $scope.$apply(function() {
                    $scope.eventsPivot = 'miniWidth';
                });

            } else if ($(this).height() === 360) {
                $scope.$apply(function() {
                    $scope.eventsPivot = 'normal';

                });

            } else if ($(this).width() > 800) {
                $scope.$apply(function() {
                    $scope.eventsPivot = 'expanded';

                });

            }

        });


    });

}).controller('designer', function($scope, $http, $modal, $timeout, $rootScope) {


    $scope.desin = {};
    $scope.open = function(desginers) {

        //if ($rootScope.activateAnalytics) {
        ga('send', 'event', 'Designer', 'clicked', desginers.name);
        ga('send', 'pageview', "Designer Modal");
        //}
        var modalInstance = $modal.open({
            templateUrl: 'partials/Designers/modal.html',
            controller: ModalInstanceCtrl,
            resolve: {
                designer: function() {
                    return desginers;
                }
            }
        });

    };

    var ModalInstanceCtrl = function($scope, $modalInstance, designer, $timeout) {

        $scope.item = designer;

        $scope.ok = function() {
            $modalInstance.close();
        };

        $scope.cancel = function() {
            if ($rootScope.activateAnalytics) {
                ga('send', 'pageview', "Designer Selection");
            }
            $modalInstance.dismiss('cancel');
        };
    };


    $scope.designerPivot;
    $http.get('js/data/designers.json').success(function(data) {
        $scope.designers = data.designers;
        console.log(data.designers);

    });

    $scope.expand = function() {
        $scope.designerPivot = 'expanded';

        $timeout(function() {
            $('#desginerSearch').on('change', function() {
                $scope.desin.name = $('#desginerSearch').val();

            });
            $('#desginerSearch').keyboard({layout: 'qwerty'});
            $(".carousels").animate({scrollLeft: 3300}, 3500);

        }, 1000);

    };
    $(function() {


        $("#designer").resize(function( ) {

            if ($(this).height() <= 150) {
                $scope.$apply(function() {
                    $scope.designerPivot = 'miniHeight';

                });

            } else if ($(this).width() <= 150) {
                $scope.$apply(function() {
                    $scope.designerPivot = 'miniWidth';
                });

            } else if ($(this).height() === 360) {
                $scope.$apply(function() {
                    $scope.designerPivot = 'normal';

                });

            } else {
                $scope.$apply(function() {
                    $scope.designerPivot = 'expanded';

                });

            }
        });


    });
});