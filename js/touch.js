function ICFForm () {

  var answers = {
    questionsAnswered : 0
  },
      submit = $('.donezo');

  this.actionTaken = function (buttonType, pressedButton, pressedButtonNum, direction) {

    var that = $(pressedButton),
          headerButtons = $('header ul li span'),
          answerButtons = $('.btn-group button'),
          nextNum = parseInt(pressedButtonNum) + 1,
          prevNum = parseInt(pressedButtonNum) - 1,
          swipeArea = $('.touchMe'),
          questionSlides = $('.slide');


    showHide = function (type, elNumber) {


      var correspondingQuestion = $('[data-slide="' + pressedButtonNum + '"]'),
            correspondingNav = $('[data-boxNum="' + pressedButtonNum + '"]');

      switch ( type ) {

        case 'answeryes' :

          correspondingNav.removeClass('btn-danger');
          correspondingNav.addClass('btn-success');
          break;

        case 'answerno' :

          correspondingNav.removeClass('btn-success');
          correspondingNav.addClass('btn-danger');
          break;

        case 'prev' :

          if ( pressedButtonNum === 1 ) {
            correspondingQuestion = $('[data-slide=14]');
            correspondingNav = $('[data-boxNum=14]');
          } else {
            correspondingQuestion = $('[data-slide="' + prevNum + '"]'),
            correspondingNav = $('[data-boxNum="' + prevNum + '"]');
          }



          break;

        default :
          break;
      }

      if ( answers['questionsAnswered'] === 14 ) {
        $('.instructions').addClass('hidden');
        submit.removeClass('hidden');
      }

      if ( elNumber === '14' && type === 'answeryes' || elNumber === '14' && type === 'answerno' ) {
        return false;
      } else if ( type === 'next' && pressedButtonNum === 14 ) {
        correspondingQuestion = $('[data-slide=1]');
        correspondingNav = $('[data-boxNum=1]');
      } else if ( type === 'answeryes' || type === 'answerno' || type === 'next' ) {
        correspondingQuestion = $('[data-slide="' + nextNum + '"]'),
        correspondingNav = $('[data-boxNum="' + nextNum + '"]');
      }


      headerButtons.removeClass('active');
      questionSlides.addClass('hidden').removeClass('shown');
      correspondingQuestion.addClass('shown').removeClass('hidden');
      correspondingNav.addClass('active');

    };


      switch ( buttonType ) {

        case 'nav' :
          var alreadySelected = that.hasClass('active');

          if ( alreadySelected ) {
            return false;
          }
          showHide('nav');

          break;

        case 'swipe' :
          direction === 'left' ? showHide('next') : showHide('prev');

        break;

        default :

          var clicked = that.attr('data-answer'),
                answeredQuestion = that.attr('data-answerFor'),
                isLast = answeredQuestion === '14';

          if ( answers['slide' + answeredQuestion] === undefined ) {
            answers['questionsAnswered'] += 1;
          }

          answers['slide' + answeredQuestion] = that.attr('data-answer');
          localStorage.setItem('answerObject', JSON.stringify(answers));


          that.parent().children().removeClass('active');
          that.addClass('active');
          showHide('answer' + clicked, answeredQuestion);

          break;

      }



  };


};


$(document).ready(function() {

  var thisForm = new ICFForm();

  // $(document).bind(
  //   'touchmove',
  // function(e) {
  //   e.preventDefault();
  // });

  $('.enterInfo button').click(function() {

    $('.logIn').addClass('hidden');
    $('.searching').removeClass('hidden');

    setTimeout(function() {

      $('.searching').html('<p>We\'ve found your ICF review form for Danny Lamborghini Mursa</p>');

      setTimeout(function() {

        $('.searching').addClass('hidden');
        $('.enterInfo').addClass('hidden');
        $('header').removeClass('hidden');
        $($('.instructions').add($('.instructions .first')).removeClass('hidden'));
        $('.slide[data-slide=1]').removeClass('hidden')
                                        .addClass('shown');
      }, 3000);

    }, 2000);

  });


  $('header ul li span')
  .hammer({
            // options...
          })
  .bind("tap", function(ev) {
    var that = $(this),
          thatNum = that.attr('data-boxNum'),
          instructions = $('.instructions'),
          instructionsTwo = $('.instructions .second'),
          instructionsTwoHidden = instructionsTwo.hasClass('hidden'),
          instructionsHidden = instructions.hasClass('hidden');

    ev.preventDefault();

    if ( !instructionsTwoHidden && !instructionsHidden ) {
      instructionsTwo.addClass('hidden');
      instructions.addClass('hidden');
      instructionsCycled = true;
    }


    thisForm.actionTaken('nav', that, thatNum);
  });

  $('.btn-group button').click(function(ev) {
    ev.preventDefault();
    return false;
  });

  $('.btn-group button')
  .hammer({
            // options...
          })
  .bind("tap", function(ev) {
    var that = $(this),
          thatNum = that.attr('data-answerFor');

    ev.preventDefault();
    // answers['slide' + thatNum] = that.attr('data-answer');
    // localStorage.setItem('answerObject', JSON.stringify(answers));
    thisForm.actionTaken('answer', that, thatNum);

  });

  $('.donezo').click(function() {
    $('.slide').add($('header')).add($(this)).addClass('hidden').removeClass('shown');
    $('.donezo').addClass('hidden');
    $('.finished').removeClass('hidden');
  });

  $('body')
  .hammer({
            // options...
          })
  .bind("swipe", function(ev) {
    var that = $('.shown'),
          shownQuestion = parseInt(that.attr('data-slide')),
          instructionsCycled = false,
          instructions = $('.instructions'),
          instructionsOne = $('.instructions .first'),
          instructionsOneHidden = instructionsOne.hasClass('hidden');
          instructionsTwo = $('.instructions .second'),
          instructionsTwoHidden = instructionsTwo.hasClass('hidden'),
          instructionsHidden = instructions.hasClass('hidden');

    if ( !shownQuestion ) {
      return false;
    }

    ev.preventDefault();
    if ( ev.direction === 'left' || ev.direction === 'right' ) {

      if ( !instructionsHidden && !instructionsOneHidden && !instructionsCycled ) {
        instructionsOne.addClass('hidden');
        instructionsTwo.removeClass('hidden');
      }

      thisForm.actionTaken('swipe', that, shownQuestion, ev.direction);
    }

  });


});