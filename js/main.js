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

});