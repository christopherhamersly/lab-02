'use strict';

let allHorns =[];
let keywordArray = [];
const newTemplate = $('#photo-template').html();

function Horn(obj){
  this.title = obj.title;
  this.keyword = obj.keyword;
  this.description = obj.description;
  this.image_url = obj.image_url;
  this.horns = obj.horns;
  allHorns.push(this);
}

Horn.prototype.render = function (){
  const $newSection = $(`<section>${newTemplate}</section>`);
  $newSection.find('h2').text(this.keyword);
  $newSection.find('p').text(this.description);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('title', this.title);
  $('main').append($newSection);
};

$(document).ready(function(){
  $.ajax('data/page-1.json', {method: 'GET', dataType:'JSON'})
    .then(allHornAnimal => {
      allHornAnimal.forEach(value => {
        new Horn(value).render();
        keywordFiller(allHorns);
      });
      keywordFiller(allHorns);
      populateBox();
    });
});

let keywordFiller = (obj) => {
  obj.forEach(value=>{
    if(!keywordArray.includes(value.keyword)){
      keywordArray.push(value.keyword);
    }
  });
};

const boxFiller = () => {
  keywordArray.forEach(value => {
    let $newOption = $(`<option>${value}</option>`);
    $newOption.attr(`value`, `${value}`);
    $('select').append($newOption);
  });
}

const populateBox= () => {
  keywordFiller(allHorns);
  boxFiller();
}



$('select').on('change', function(event){
  event.preventDefault();
  if ($(this).val() !== 'default'){
    $('main').empty();
    allHorns.forEach(value => {
      if($(this).val() === value.keyword){
        value.render();
      }
    });
  } else {
    $('main').empty();
    allHorns.forEach(value => value.render());
  }
});







