angular.module('starter.controllers',[])

.controller('SignupCtrl',[ '$scope' ,'$http', '$state' , function ($scope,$http,$state) {

      $scope.register = function (user) {
        $scope.submitting = true;

        console.log(user);

        //$http.post('http://localhost/producty/customerSignup.php',user) - Shortcut Method Doesn't Work
        // Above thing results in "POST Request Failed" error. We need to pass some Content-Type header
        // to resolve it

          $http({
            method : "POST",
            url : 'http://localhost/producty/customerSignup.php',
            data : user,
            headers: {'Content-Type': undefined }
          })
          .then(function (response) {

              console.log(response);

              if(response.data.Mystatus=='Success')
              $state.go('home');

              else
              {
                $scope.submitting = false;
                console.log(response.data.Mystatus);
              }
          },function () {
            $scope.submitting = false;
            console.log("Post Request failed");
          });


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

            $http.get('http://localhost/producty/checkEmail.php?email='+email)
              .then(function (response) {
                  // success in GET method
                  // response contains actual HTTP response with status values etc.
                  // eg response.status will be 200
                  // response.data has the data of the URL eg JSON data

                  if(response.data.Mystatus=='Success') {
                    $scope.emailCheck = false;
                    $scope.emailAvailable = true;
                  }
                  else {
                    $scope.emailCheck = false;
                    $scope.emailAvailable = false;
                    $scope.emailNotAvailable = true;
                    //console.log(response);
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

          $http.get('http://localhost/producty/checkMobile.php?mobile='+mobile)
            .then(function (response) {
              // success in GET method
              // response contains actual HTTP response with status values etc.
              // eg response.status will be 200
              // response.data has the data of the URL eg JSON data

              if(response.data.Mystatus=='Success') {
                $scope.mobileCheck = false;
                $scope.mobileAvailable = true;
              }
              else {
                $scope.mobileCheck = false;
                $scope.mobileAvailable = false;
                $scope.mobileNotAvailable = true;
                //console.log(response);
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
]);
