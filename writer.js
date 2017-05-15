var writer = angular.module('arkad-search', [])

writer.controller('writerCtrl', [
    '$scope', 'entities',s
    function($scope, posts) {
        $scope.addPost = function() {
            if ($scope.title == '') {
                return;
            }
            $scope.posts.push({
                title: $scope.title,
                info: $scope.info,
				tid: $scope.timeDate                

            });
            $scope.title = '';
            $scope.info = '';
            $scope.timeDate = '';
        }

    }
]);
var express = require('express')
var app = express()
 
app.get('/search', function (req, res) {
  res.render('writerhome')
})

app.post('/search', function (req, res) {

  res.send(console.log('Title ' + ))
})
app.set('view engine', 'ejs')	
 
app.listen(3000)