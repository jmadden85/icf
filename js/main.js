function validate (el) {

    var thisEl = $(el),
         radios = thisEl.children('.btn-group').children('.btn'),
         checked = false;

    for ( var i = 0, n = radios.length; i < n; i++ ) {

        if ( $(radios[i]).hasClass('active') ) {
            checked = true;
        }

    }

    return checked;

};

$(document).ready(function() {

    var commentsObject = {};

    if ( localStorage.length ) {
        var grabObject = localStorage.getItem('answerObject');
        commentsObject = JSON.parse(grabObject);
        console.log(commentsObject.oneanswer);
    }

    $('.iterations select').change(function() {
        var that = $(this),
              theForm = $('form');

        switch ( that.val() ) {

            case 'one' :
                theForm.removeClass('two')
                            .addClass('one');
                $('.question').show(0);
                $('.textarea').val('');
                $('.submit').show(0);
                break;

            default :
                theForm.removeClass('one')
                            .addClass('two');
                if ( commentsObject.oneanswer ) {
                    commentsObject.oneanswer === 'first' ? $($('.question.active .btn-group .btn')[0]).addClass('active') : $($('.question.active .btn-group .btn')[1]).addClass('active');
                    $('textarea').val(commentsObject.onecomment);
                }
                break;


        }

    });

    $('.prevNext .btn').click(function() {

        var that = $(this),
              thisSection = $('.question.active'),
              thisSectionNum = thisSection.attr('data-question'),
              selectedAnswer = $('.question.active .active').attr('data-answer'),
              prev = $('.prev'),
              next = $('.next'),
              text = $('textarea'),
              questions = $('.question'),
              questionNum = $('.questionNum'),
              questionsInt = parseInt(questionNum.html()),
              numQuestions = questions.length,
              submit = $('.submit');

        function repeater (whichWay) {

            var choice = whichWay;

            commentsObject[thisSectionNum + 'answer'] = selectedAnswer;
            commentsObject[thisSectionNum + 'comment'] = text.val();

            localStorage.setItem('answerObject', JSON.stringify(commentsObject));

            text.val('');
            questions.hide(0)
                          .removeClass('active');

            if ( choice === 'next' ) {
                thisSection.next().show(0)
                                     .addClass('active');
                prev.show(0);
                questionNum.html(questionsInt + 1);
                if ( questionsInt + 1 === numQuestions ) {
                    that.hide(0);
                    submit.show(0);
                }
            } else {
                questionsInt === 2 ? prev.hide(0) : prev;
                submit.hide(0);
                thisSection.prev().show(0)
                                         .addClass('active');
                next.show(0);
                questionNum.html(questionsInt - 1);
            }

            text.val(commentsObject[$('.question.active').attr('data-question') + 'comment']);

            if ( commentsObject[$('.question.active').attr('data-question') + 'answer'] ) {
                $('.question.active .btn-group [data-answer=' + commentsObject[$('.question.active').attr('data-question') + 'answer'] + ']').addClass('active');
            }

        };


        if ( !validate($('[data-question=' + thisSectionNum + ']')) && that.hasClass('next') ) {

            alert('Please select an answer.');
            return false;

        } else if ( that.hasClass('next') ) {

            repeater('next');

        } else {

            repeater('prev');

        }

        return false;

    });



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




    // $('header ul li span').click(function() {
    //     var that = $(this),
    //           clickedNum = that.attr('data-boxNum'),
    //           spans = $('header ul li span'),
    //           questions= $('.slide'),
    //           thatQuestion = $('.slide[data-slide=' + clickedNum + ']');


    //     if ( that.hasClass('active') ) {
    //         return false;
    //     }

    //     spans.removeClass('active');
    //     questions.addClass('hidden');
    //     thatQuestion.removeClass('hidden');
    //     that.addClass('active');

    // });

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

            questions.addClass('hidden')
                            .removeClass('shown');
              spans.removeClass('active');

              if ( ev.direction === 'left' ) {
                  next.removeClass('hidden')
                                        .addClass('shown');
                  nextSpan.addClass('active');
              } else if ( ev.direction === 'right' ) {
                prev.removeClass('hidden')
                .addClass('shown');
                prevSpan.addClass('active');
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