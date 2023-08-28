shufflePictures()
Puzzle()


// -------------------------- Pop-up windows --------------------------

// a question box asking if you really want to check the puzzle
$('.check').on('click', function(){
    $('.question-window').css({
        display: 'block',
        animation: '0.5s forwards fadeInDown',
    })
    $('body').css('animation', '1s forwards bgAppear')
});

// close the question box
$('.close-btn').on('click', function(){
    $('.question-window').css({
        display: 'none',
        animation: 'none',
    })
    $('body').css('animation', 'none')
});

// ---------------------------- Functions ----------------------------

// Function for dragging and dropping blocks
let allowDragging = false;
function Puzzle() {
    $('.number').draggable({
        containment: 'gamefield',
        revert: 'invalid',
        start: function () {
            if (!allowDragging) {
                return false; // If the flag is set to false, cancel drag and drop
            }
            if ($(this).hasClass('dropped-puzzle')) {
                $(this).removeClass('dropped-puzzle');
                $(this).parent().removeClass('puzzle-present');
            }
        }
    });

    $('.droppable').droppable({
        accept: function () {
            return !$(this).hasClass('puzzle-present');
        },
        drop: function (event, ui) {
            let draggableElement = ui.draggable;
            let droppedOn = $(this);
            droppedOn.addClass('puzzle-present');
            $(draggableElement).addClass('dropped-puzzle');
            $(draggableElement).css({
                top: 0,
                left: 0,
                position: 'relative'
            }).appendTo(droppedOn);
        },
    });
}

// Function for the timer and start of the game
let countdown;
$('.start').on('click', function() {
    allowDragging = true;
    let countDownDate = new Date().getTime() + 2* 60 * 1000; // Setting the countdown time to 1 minute
    countdown = setInterval(function startTimer() {
      let now = new Date().getTime();
      let timeLeft = countDownDate - now;
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000); // number of seconds remaining
      const formattedTime = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      $(".timer-clock").text(formattedTime);

      $('.start').prop("disabled", true).css("opacity", ".7");
      $('.check').prop("disabled", false).css("opacity", "1");

      if (timeLeft < 0) { // коли відлік закінчиться
        clearInterval(countdown);
        $(".timer-clock").text("Time's up!");
        $(".start").prop("disabled", true).css("opacity", ".7");
        $(".check").prop("disabled", true).css("opacity", ".7");
      }
      Puzzle();
    })
});

// Function for shuffling picture positions
function shufflePictures() {
    let arrRandom = ['0% 0%', '-100% 0%', '-200% 0%', '-300% 0%', '0% -100%', '-100% -100%', '-200% -100%', '-300% -100%', '0% -200%', '-100% -200%', '-200% -200%', '-300% -200%', '0% -300%', '-100% -300%', '-200% -300%', '-300% -300%'];
        arrRandom = arrRandom.sort(() => Math.random() - 0.5);
        $('.number').each(function (index, element) {
            $(this).css('background-position', arrRandom[index]);
        });
} 


















// document.getElementById('answer-box').addEventListener('keydown', function(event) {
//     if (event.key === 'Enter') {
//         checkSmth()
//     }
// })