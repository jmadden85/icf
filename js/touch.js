$(document).ready(function() {


  $('header ul li span')
  .hammer({
            // options...
          })
  .bind("tap", function(ev) {
    console.log(ev);
    var that = $(this),
    clickedNum = that.attr('data-boxNum'),
    spans = $('header ul li span'),
    questions= $('.slide'),
    thatQuestion = $('.slide[data-slide=' + clickedNum + ']');

    ev.preventDefault();


    if ( that.hasClass('active') ) {
      return false;
    }

    spans.removeClass('active');
    questions.addClass('hidden')
    .removeClass('shown');
    thatQuestion.removeClass('hidden')
    .addClass('shown');
    that.addClass('active');
  });

  $('.btn-group button').click(function(ev) {
    console.log(ev);
    ev.preventDefault();
    return false;
  });

  $('.btn-group button')
  .hammer({
            // options...
          })
  .bind("tap", function(ev) {
    var that = $(this),
    thisQuestionNum = that.parent().parent().parent().attr('data-slide');
    nextQuestionNum = parseInt(thisQuestionNum) + 1,
    saidYes = that.html() === '<i class="icon-ok"></i>' ? true : false;
    questions= $('.slide'),
    spans = $('header ul li span'),
    thisSpan = $('header ul li span[data-boxNum=' + thisQuestionNum + ']'),
    nextQuestion = $('.slide[data-slide=' + nextQuestionNum + ']'),
    nextSpan = $('header ul li span[data-boxNum=' + nextQuestionNum + ']');

    ev.preventDefault();

    that.addClass('active');
    questions.addClass('hidden')
    .removeClass('shown');
    spans.removeClass('active');
    nextQuestion.removeClass('hidden')
    .addClass('shown');
    nextSpan.addClass('active');


    if ( saidYes ) {
      thisSpan.removeClass('btn-danger')
      .addClass('btn-success');
    } else {
      thisSpan.addClass('btn-danger')
      .removeClass('btn-success');
    }


  });

  $('.touchMe')
  .hammer({
            // options...
          })
  .bind("swipe", function(ev) {
    var shownQuestion = parseInt($('.shown').attr('data-slide')),
    nextNum = shownQuestion + 1,
    prevNum = shownQuestion - 1,
    next = $('[data-slide=' + nextNum + ']'),
    nextSpan = $('header ul li span[data-boxNum=' + nextNum + ']'),
    prev = $('[data-slide=' + prevNum  + ']'),
    prevSpan = $('header ul li span[data-boxNum=' + prevNum + ']'),
    questions= $('.slide'),
    spans = $('header ul li span');

    ev.preventDefault();

    if ( shownQuestion === 1 && ev.direction === 'right' ) {
      return false;
    } else if ( shownQuestion === 14 && ev.direction === 'left' ) {
      return false;
    }

    if ( ev.direction === 'left' ) {
      questions.addClass('hidden')
      .removeClass('shown');
      spans.removeClass('active');
      next.removeClass('hidden')
      .addClass('shown');
      nextSpan.addClass('active');
    } else if ( ev.direction === 'right' ) {
      questions.addClass('hidden')
      .removeClass('shown');
      spans.removeClass('active');
      prev.removeClass('hidden')
      .addClass('shown');
      prevSpan.addClass('active');
    } else {
      return false;
    }

  });

    // $('.btn-group button').click(function() {
    //     var that = $(this),
    //          thisQuestionNum = that.parent().parent().parent().attr('data-slide');
    //           nextQuestionNum = parseInt(thisQuestionNum) + 1,
    //           saidYes = that.html() === '<i class="icon-ok"></i>' ? true : false;
    //           questions= $('.slide'),
    //           spans = $('header ul li span'),
    //           thisSpan = $('header ul li span[data-boxNum=' + thisQuestionNum + ']'),
    //           nextQuestion = $('.slide[data-slide=' + nextQuestionNum + ']'),
    //           nextSpan = $('header ul li span[data-boxNum=' + nextQuestionNum + ']');

    //           questions.addClass('hidden');
    //           spans.removeClass('active');
    //           nextQuestion.removeClass('hidden');
    //           nextSpan.addClass('active');

    //           console.log(thisSpan);

    //           if ( saidYes ) {
    //             thisSpan.removeClass('btn-danger')
    //                             .addClass('btn-success');
    //           } else {
    //             thisSpan.addClass('btn-danger')
    //                             .removeClass('btn-success');
    //           }


    // });


});