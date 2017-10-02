var search = null;

(function($, _M) {
  'use strict';

  var $searchbar = $('#search');



  var dex = [{
    name: 'Lunch: Måndag',
    nat: 'Maträtt1',
    index: 1,
    cat: 'Lunch',
    language: ['Plats 1', 'Plats 2']//language is placeholder for Tetra Pak
  }, {
    name: 'Lunch: Tisdag',
    nat: 'Maträtt 2',
    index: 2,
    cat: 'Lunch',
    language: ['Plats 2']//language is placeholder for Tetra Pak
  }, {
    name: 'Lunch: Onsdag',
    nat: 'Maträtt 3',
    index: 3,
    cat: 'Lunch',
    language: ['Plats 2', 'Plats 3']//language is placeholder for Tetra Pak
  }, {
    name: 'Lunch: Torsdag',
    nat: 'Maträtt 4',
    index: 4,
    cat: 'Lunch',
    language: ['Plats 4']//language is placeholder for Tetra Pak
  }, {
    name: 'Gasque',
    nat: 'Mörk kostym',
    index: 5,
    cat: 'Middag',
    language: ['Plats 6',] //language is placeholder for Tetra Pak


  }];

  var options = {
    shouldSort: true,
    threshold: 0.5,
    minMatchCharLength: 0,
    keys: [{
      name: 'name',
      weight: 0.75
    }, {
      name: 'time',
      weight: 0.5
    }, {
      name: 'date',
      weight: 0.5
    }, {
      name: 'info',
      weight: 0.25
    }]
  };
  var fuse = new Fuse(dex, options);

  $searchbar.keyup(function() {
    var search = fuse.search($searchbar.val());
    var $res = $('#results');
    var check = 0;
    $res.empty();
    if (search[0] === undefined && ($searchbar.val()) ) {
      $res.append('<h4 class="rip">No results</h4>');
    }
    $res.append('<h4>Closest result: ' + search[0].name + '</h4>');
    $res.append('<h5>All results:</h5>');

    search.forEach(function(el){
      if(check < 2) {
        check ++;
      $res.append(
        el.nat + ': ' + el.name + ' (' + el.language + ') <br>'
      );
    }
    });
  });

})(jQuery, Materialize)
