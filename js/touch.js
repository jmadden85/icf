function buttonPressed (buttonType, pressedButton, pressedButtonNum, direction) {

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
          return false;
        }

        correspondingQuestion = $('[data-slide="' + prevNum + '"]'),
        correspondingNav = $('[data-boxNum="' + prevNum + '"]');

        break;

      default :
        break;
    }

    if ( elNumber === '14' && type === 'answeryes' || elNumber === '14' && type === 'answerno' || type === 'next' && elNumber === '14' ) {
      return false;
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

        that.parent().children().removeClass('active');
        that.addClass('active');
        showHide('answer' + clicked, answeredQuestion);

        break;

    }

};




$(document).ready(function() {


  // $(document).bind(
  //   'touchmove',
  // function(e) {
  //   e.preventDefault();
  // });


  $('header ul li span')
  .hammer({
            // options...
          })
  .bind("tap", function(ev) {
    // console.log(ev);
    var that = $(this),
          thatNum = that.attr('data-boxNum');
    // clickedNum = that.attr('data-boxNum'),
    // spans = $('header ul li span'),
    // questions= $('.slide'),
    // thatQuestion = $('.slide[data-slide=' + clickedNum + ']');

    ev.preventDefault();
    buttonPressed('nav', that, thatNum);


    // if ( that.hasClass('active') ) {
    //   return false;
    // }

    // spans.removeClass('active');
    // questions.addClass('hidden')
    // .removeClass('shown');
    // thatQuestion.removeClass('hidden')
    // .addClass('shown');
    // that.addClass('active');
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
    // thisQuestionNum = that.parent().parent().parent().attr('data-slide');
    // nextQuestionNum = parseInt(thisQuestionNum) + 1,
    // saidYes = that.html() === '<i class="icon-ok"></i>' ? true : false;
    // questions= $('.slide'),
    // spans = $('header ul li span'),
    // thisSpan = $('header ul li span[data-boxNum=' + thisQuestionNum + ']'),
    // nextQuestion = $('.slide[data-slide=' + nextQuestionNum + ']'),
    // nextSpan = $('header ul li span[data-boxNum=' + nextQuestionNum + ']');
    ev.preventDefault();
    buttonPressed('answer', that, thatNum);

    // that.parent().children().removeClass('active');
    // that.addClass('active');

    // if ( saidYes ) {
    //   thisSpan.removeClass('btn-danger')
    //   .addClass('btn-success');
    // } else {
    //   thisSpan.addClass('btn-danger')
    //   .removeClass('btn-success');
    // }


    // if ( thisQuestionNum === '14') {
    //   return false;
    // }

    // questions.addClass('hidden')
    // .removeClass('shown');
    // spans.removeClass('active');
    // nextQuestion.removeClass('hidden')
    // .addClass('shown');
    // nextSpan.addClass('active');


  });

  $('.touchMe')
  .hammer({
            // options...
          })
  .bind("swipe", function(ev) {
    var that = $('.shown'),
          shownQuestion = parseInt(that.attr('data-slide'));
          // nextNum = shownQuestion + 1,
          // prevNum = shownQuestion - 1,
          // next = $('[data-slide=' + nextNum + ']'),
          // nextSpan = $('header ul li span[data-boxNum=' + nextNum + ']'),
          // prev = $('[data-slide=' + prevNum  + ']'),
          // prevSpan = $('header ul li span[data-boxNum=' + prevNum + ']'),
          // questions= $('.slide'),
          // spans = $('header ul li span');

    ev.preventDefault();
    if ( ev.direction === 'left' || ev.direction === 'right' ) {
      buttonPressed('swipe', that, shownQuestion, ev.direction);
    }

    // if ( shownQuestion === 1 && ev.direction === 'right' ) {
    //   return false;
    // } else if ( shownQuestion === 14 && ev.direction === 'left' ) {
    //   return false;
    // }

    // if ( ev.direction === 'left' ) {
    //   questions.addClass('hidden')
    //   .removeClass('shown');
    //   spans.removeClass('active');
    //   next.removeClass('hidden')
    //   .addClass('shown');
    //   nextSpan.addClass('active');
    // } else if ( ev.direction === 'right' ) {
    //   questions.addClass('hidden')
    //   .removeClass('shown');
    //   spans.removeClass('active');
    //   prev.removeClass('hidden')
    //   .addClass('shown');
    //   prevSpan.addClass('active');
    // } else {
    //   return false;
    // }

  });


});