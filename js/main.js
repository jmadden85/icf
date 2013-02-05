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
              prev = $('.prev'),
              next = $('.next'),
              text = $('textarea'),
              questions = $('.question'),
              questionNum = $('.questionNum'),
              questionsInt = parseInt(questionNum.html()),
              numQuestions = questions.length,
              submit = $('.submit');

        if ( that.hasClass('next') ) {

            if ( !validate($('[data-question=' + thisSectionNum + ']')) ) {
                alert('Please select an answer.');
                return false;
            } else if ( questionsInt + 1 === numQuestions ) {
                that.hide(0);
                submit.show(0);
            }

            commentsObject[thisSectionNum] = text.val();
            text.val('');
            questions.hide(0)
                          .removeClass('active');
            thisSection.next().show(0)
                                     .addClass('active');
            text.val(commentsObject[$('.question.active').attr('data-question')]);
            prev.show(0);
            questionNum.html(questionsInt + 1);

        } else {

            questionsInt === 2 ? prev.hide(0) : prev;

            commentsObject[thisSectionNum] = text.val();
            text.val('');
            submit.hide(0);
            questions.hide(0)
                          .removeClass('active');
            thisSection.prev().show(0)
                                     .addClass('active');
            text.val(commentsObject[$('.question.active').attr('data-question')]);
            next.show(0);
            questionNum.html(questionsInt - 1);

        }

        return false;

    });

});