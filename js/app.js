
'use strict';
//global variables
let allHorns =[];
let keywordArray = [];
const newTemplate = $('#photo-template').html();

//constructor function
function Horn(obj){
  this.title = obj.title;
  this.keyword = obj.keyword;
  this.description = obj.description;
  this.image_url = obj.image_url;
  this.horns = obj.horns;
  allHorns.push(this);
}

// Horn.prototype.render = function (){
//   const $newSection = $(`<section>${newTemplate}</section>`);
//   $newSection.find('h2').text(this.keyword);
//   $newSection.find('p').text(this.description);
//   $newSection.find('img').attr('src', this.image_url);
//   $newSection.find('img').attr('title', this.title);
//   $('main').append($newSection);
// };

//render sections using {{Mustache}}
Horn.prototype.render = function(){
  const template = $('#mustache-template').html();
  const myTemplate = Mustache.render(template, this);
  $('main').append(myTemplate);
}


//synchronus code
$(document).ready(function(){

  //pull images and info from JSON
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

//filling the keyword
let keywordFiller = (obj) => {
  obj.forEach(value=>{
    if(!keywordArray.includes(value.keyword)){
      keywordArray.push(value.keyword);
    }
  });
};

//rendering images to the DOM for page two
const ajaxPopulater = () => {
  $.ajax('data/page-2.json', {method: 'GET', dataType:'JSON'})
    .then(allHornAnimal => {
      allHornAnimal.forEach(value => {
        new Horn(value).render();
        keywordFiller(allHorns);
      });
      keywordFiller(allHorns);
      populateBox();
    });
};

//rendering images to the DOM for page one
const ajaxPopulaterOne = () => {
  $.ajax('data/page-1.json', {method: 'GET', dataType:'JSON'})
    .then(allHornAnimal => {
      allHornAnimal.forEach(value => {
        new Horn(value).render();
        keywordFiller(allHorns);
      });
      keywordFiller(allHorns);
      populateBox();
    });
  $('main').empty();
};

//rendering the selection box
const boxFiller = () => {
  $('select').empty();
  let $newOption = $(`<option></option>`);
  $newOption.text('Filter By Category');
  $newOption.attr('value', 'default');
  $('select').append($newOption);
  //looping over keyword array
  keywordArray.forEach(value => {
    $newOption = $(`<option>${value}</option>`);
    $newOption.attr(`value`, `${value}`);
    $('select').first().append($newOption);
  });
}

//filling the selector box
const populateBox = () => {
  keywordFiller(allHorns);
  boxFiller();
}

//event listener for selector box
$('select').on('change', function(event){
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
  boxFiller;
});

//sorting the horns
const hornSort = () => {
  allHorns.sort(( a, b ) => {
    return a.horns > b.horns ? 1 : -1;
  });
  return allHorns;
}

//sorting the titles
const titleSort = () => {
  allHorns.sort(( a, b ) =>{
    if (a.toLowerCase() > b.toLowerCase){
      return 1;
    } else if (a.toLowerCase() < b.toLowerCase()){
      return -1;
    }
  });
  return allHorns;
}

//event listener for page one
$('#button1').on('click', function(){
  // wipe the previous shown data
  $('main').empty();
  // populate it with information
  ajaxPopulaterOne();
});


// event listener for page two
$('#button2').on('click', function(){
  // wipe the previous shown data
  $('main').empty();
  // populate it with information
  ajaxPopulater();
});


//event listener for horn sort button
$('#hornsorter').on('click', function(){
  // wipe the previous shown data
  event.preventDefault();
  //fill it with data
  // hornSort(allHorns);
 
  // populate it with information
  ajaxPopulaterOne(hornSort);
});

$('#titlesorter').on('click', function(){
  // wipe the previous shown data
  event.preventDefault();
  //fill it with data
  // hornSort(allHorns);
  $('main').empty();
  // populate it with information
  ajaxPopulater(titleSort);
});



// create sorting for the horns array


//publish the content to the page 

