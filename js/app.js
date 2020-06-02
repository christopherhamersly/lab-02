'use strict';



let allHorns =[];

function Horn(obj){
  this.title = obj.title;
  this.keyword = obj.keyword;
  this.description = obj.description;
  this.image_url = obj.image_url;
  this.horns = obj.horns;
  allHorns.push(this);
}

Horn.prototype.render = function (){
  const newTemplate = $('#photo-template').html();
  const $newSection = $(`<section>${newTemplate}</section>`);
  $newSection.find('h2').text(this.keyword);
  $newSection.find('p').text(this.description);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('title', this.title);
  $('main').append($newSection);
};

$(document).ready(function(){
  $.ajax('page-1.json', {method: 'GET', dataType:'JSON'})
    .then(allHornAnimal => {
      allHornAnimal.forEach(value => {
        new Horn(value).render();
      });
    });
});
