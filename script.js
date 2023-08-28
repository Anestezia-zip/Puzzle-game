
Puzzle()


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

      $('.start').prop("disabled", true).css("opacity", "0.7");
      $('.check').prop("disabled", false).css("opacity", "1");

      if (timeLeft < 0) { // коли відлік закінчиться
        clearInterval(countdown);
        $(".timer-clock").text("Time's up!");
        $("#start-btn").prop("disabled", false);
        $("#check-btn").prop("disabled", true);
      }
      Puzzle();
    })
});


// Functions
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




















// document.getElementById('answer-box').addEventListener('keydown', function(event) {
//     if (event.key === 'Enter') {
//         checkSmth()
//     }
// })