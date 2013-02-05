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

            localStorage.setItem[thisSectionNum + 'answer'] = selectedAnswer;
            localStorage.setItem[thisSectionNum + 'comment'] = text.val();

            text.val('');
            questions.hide(0)
                          .removeClass('active');

            if ( choice === 'next' ) {
                thisSection.next().show(0)
                                     .addClass('active');
                text.val(commentsObject[$('.question.active').attr('data-question') + 'comment']);
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
                text.val(commentsObject[$('.question.active').attr('data-question') + 'comment']);
                next.show(0);
                questionNum.html(questionsInt - 1);
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