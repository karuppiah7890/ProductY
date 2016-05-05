angular.module('starter.controllers',[])

.factory('URLService', function () {

  var locally = 0;

  if(locally==1)
    return {
      url : 'http://localhost/producty/',
      debug : 1
    };

  else
    return {
      url : 'http://54.169.109.234/',
      debug : 0
    };

})

.controller('SignupCtrl',[ '$scope' ,'$http', '$state', '$ionicLoading', 'URLService' , function ($scope,$http,$state,$ionicLoading,URLService) {

      var storage = window.localStorage;
      var id = storage.getItem("id");

      if(id!=null)
      {
        if(URLService.debug==1)
        console.log('No Signup required. Already Signed in. ID is : ' + id);

        $state.go('menu.home');
      }

      $scope.register = function (user) {
        $scope.submitting = true;

        if(URLService.debug==1)
        console.log(user);

        $scope.show();

        //$http.post('http://54.169.109.234/producty/customerSignup.php',user) - Shortcut Method Doesn't Work
        // Above thing results in "POST Request Failed" error. We need to pass some Content-Type header
        // to resolve it

          $http({
            method : "POST",
            url : URLService.url + 'customerSignup.php',
            data : user,
            headers: {'Content-Type': undefined }
          })
          .then(function (response) {

              if(URLService.debug==1)
              console.log(response);

              $scope.hide();

              if(response.data.Mystatus=='Success')
              {
                $scope.submitting = false;
                var storage = window.localStorage;
                storage.setItem("id",response.data.id);
                $state.go('menu.home');
              }

              else
              {
                $scope.submitting = false;

                if(URLService.debug==1)
                console.log(response.data.Mystatus);
              }

          },function () {
            $scope.hide();
            $scope.submitting = false;

            if(URLService.debug==1)
            console.log("Signup Post Request failed");
          });


      };

      $scope.show = function() {
        $ionicLoading.show({
          template: 'Signing up...'
        });
      };
      $scope.hide = function(){
        $ionicLoading.hide();
      };

      $scope.removeEmailMarks = function (valid){

        if(valid)
        {
          if($scope.emailNotAvailable)
            $scope.emailNotAvailable = false;

          if($scope.emailAvailable)
            $scope.emailAvailable = false;
        }

      };

      $scope.checkEmailAvailable = function (valid,email) {

          if(valid)
          {
            if($scope.emailAvailable)
              $scope.emailAvailable = false;

            $scope.emailCheck = true;

            $http.get( URLService.url + 'checkEmail.php?email='+email)
              .then(function (response) {
                  // success in GET method
                  // response contains actual HTTP response with status values etc.
                  // eg response.status will be 200
                  // response.data has the data of the URL eg JSON data

                  if(URLService.debug==1)
                  console.log("Email Check : " + response);

                  if(response.data.Mystatus=='Success') {
                    $scope.emailCheck = false;
                    $scope.emailAvailable = true;
                  }
                  else {
                    $scope.emailCheck = false;
                    $scope.emailAvailable = false;
                    $scope.emailNotAvailable = true;
                  }

              }, function () {
                // error in GET method. Network problems or server down or DNS lookup problem etc
                $scope.emailCheck = false;
                $scope.emailAvailable = false;
                $scope.emailNotAvailable = true;
              });

          }

          else
            $scope.emailAvailable = false;
      };

      $scope.removeMobileMarks = function (valid){

        if(valid)
        {
            if($scope.mobileNotAvailable)
              $scope.mobileNotAvailable = false;

            if($scope.mobileAvailable)
              $scope.mobileAvailable = false;
        }

      };

      $scope.checkMobileAvailable = function (valid,mobile) {

        if(valid)
        {
          if($scope.mobileAvailable)
            $scope.mobileAvailable = false;

          $scope.mobileCheck = true;

          $http.get(URLService.url + 'checkMobile.php?mobile='+mobile)
            .then(function (response) {
              // success in GET method
              // response contains actual HTTP response with status values etc.
              // eg response.status will be 200
              // response.data has the data of the URL eg JSON data

              if(URLService.debug==1)
                console.log("Mobile Check : " + response);

              if(response.data.Mystatus=='Success') {
                $scope.mobileCheck = false;
                $scope.mobileAvailable = true;
              }
              else {
                $scope.mobileCheck = false;
                $scope.mobileAvailable = false;
                $scope.mobileNotAvailable = true;
              }

            }, function () {
              // error in GET method. Network problems or server down or DNS lookup problem etc
              $scope.mobileCheck = false;
              $scope.mobileAvailable = false;
              $scope.mobileNotAvailable = true;
            });

        }

        else
          $scope.mobileAvailable = false;
      };
  }
])

.controller('SigninCtrl',['$scope','$http','$state','$ionicLoading','URLService', function ($scope, $http, $state,$ionicLoading,URLService) {

      var storage = window.localStorage;
      var id = storage.getItem("id");

      if(id!=null)
      {
        if(URLService.debug==1)
        console.log('No Signin required. Already Signed in. ID is : ' + id);

        $state.go('menu.home');
      }

      $scope.signin = function (user) {
          $scope.submitting = true;

          if(URLService.debug==1)
          console.log(user);

          $scope.show();

          $http({
            url : URLService.url + 'loginUser.php',
            method : 'POST',
            data : user,
            headers : {'Content-Type' : undefined}
          }).then(function (response) {

              if(URLService.debug==1)
              console.log(response);

              $scope.hide();

              if(response.data.Mystatus=='Success')
              {
                $scope.submitting = false;
                var storage = window.localStorage;
                storage.setItem("id",response.data.id);
                $state.go('menu.home');
              }

              else {
                $scope.submitting = false;

                if(URLService.debug==1)
                console.log(response.data.Mystatus);
              }

          },function () {
            $scope.hide();
            $scope.submitting = false;

            if(URLService.debug==1)
            console.log("Signin Post Request failed");
          });
      };

      $scope.show = function() {
        $ionicLoading.show({
          template: 'Signing in...'
        });
      };
      $scope.hide = function(){
        $ionicLoading.hide();
      };

}])
.controller('MenuCtrl',['$scope',function($scope){





}
])

.controller('HomeCtrl',['$scope','$http','$state','$ionicModal','URLService', function ($scope,$http,$state,$ionicModal,URLService) {


    var storage = window.localStorage;
    var id = storage.getItem("id");

    if(id!=null)
    {
      if(URLService.debug==1)
      console.log('At home. ID is : ' + id);

      $scope.message = "ID is : " + id;
    }

    $scope.productimageurl = URLService.url;

    $scope.i=0;
    $scope.leftshow=false;
    $scope.rightshow=true;
    $http.get(URLService.url + 'productlist.php')
        .then(function (response) {
            // success in GET method
            // response contains actual HTTP response with status values etc.
            // eg response.status will be 200
            // response.data has the data of the URL eg JSON data

            if(response.data.Mystatus=='Success') {
                $scope.product=response.data.product;
                $scope.prodcount=response.data.prodcount;
            }

        });

    $scope.left = function () {

        if($scope.i!=0)
        {
            $scope.rightshow=true;
            $scope.i--;
        }
        if($scope.i==0)
            $scope.leftshow=false;

    };

    $scope.right = function () {

        if($scope.i<($scope.prodcount-1)) {

            $scope.leftshow=true;
            $scope.i++;
        }
        if($scope.i==($scope.prodcount-1))
            $scope.rightshow=false;

    };

    $ionicModal.fromTemplateUrl('templates/plist.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.select=function (id) {
        if(id==1)
        {
            $scope.leftshow = false;
            $scope.rightshow = true;
        }
        if(id==($scope.prodcount))
        {
            $scope.leftshow = true;
            $scope.rightshow = false;
        }
        $scope.i=id-1;
        $scope.modal.hide();
    };

    $scope.openlist=function () {
        $scope.modal.show();
    };




}
]);
