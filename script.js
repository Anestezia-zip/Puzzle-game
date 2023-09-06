let onStartApp = function() {

    shufflePictures();
    Puzzle();

// -------------------------- Pop-up windows --------------------------

/**
 * A question box asking if you really want to check the puzzle
 */

    function promptForCheck(){
        $('.question-window').css({
            display: 'block',
            animation: '0.5s forwards fadeInDown',
        });
        $('body').css('animation', '1s forwards bgAppear');
    }
/**
 * Close the question box
 */

    function promptForClose(){
        $('.question-window').css({
            display: 'none',
            animation: 'none',
        });
        $('body').css('animation', 'none');
    }
/**
 * Сhecking for a well-folded puzzle
 */

    function onCheckPuzzle() {
        clearInterval(countdownInterval);
        checkPuzzle();
        $('.start, .check').prop("disabled", true).css("opacity", "0.7");
    }
/**
 * Event listeners for the pop-up windows
 */

$('.check').on('click', promptForCheck);
$('.close-btn').on('click', promptForClose);
$('.check-btn').on('click', onCheckPuzzle);
$(".new-game").on("click", () => {
    location.reload();
});

// ---------------------------- Functions ----------------------------

/**
 * Function for dragging and dropping blocks
 */
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
            }
        });

        /**
         * Added touch event processing separately
         */
        $('.number').on('touchstart', function (event) {
            if (!allowDragging) {
                return false;
            }
            if ($(this).hasClass('dropped-puzzle')) {
                $(this).removeClass('dropped-puzzle');
                $(this).parent().removeClass('puzzle-present');
            }
            // Save the coordinates of the touch
            let touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
            $(this).data('touch-start-x', touch.pageX);
            $(this).data('touch-start-y', touch.pageY);
        }).on('touchmove', function (event) {
            event.preventDefault();
            let touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
            let startX = $(this).data('touch-start-x');
            let startY = $(this).data('touch-start-y');
            let offsetX = touch.pageX - startX;
            let offsetY = touch.pageY - startY;
            $(this).css({
                top: offsetY + 'px',
                left: offsetX + 'px',
                position: 'relative'
            });
        });
            
    }

/**
 * Function for timer
 */
    let countdownTime = 120;
    let countdownInterval;
    function startTimer() {
        $('.start').prop("disabled", true).css("opacity", ".7");
        $('.check').prop("disabled", false).css("opacity", "1");

        countdownInterval = setInterval(function() {
            if (countdownTime <= 0) {
                clearInterval(countdownInterval);
                $(".timer-clock").text("Time's up!");
                $(".start").prop("disabled", true).css("opacity", ".7");
                $(".check").prop("disabled", true).css("opacity", ".7");
            } else {
                countdownTime--;  
                const minutes = Math.floor(countdownTime / 60);
                const seconds = countdownTime % 60;
                const formattedTime = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
                $(".timer-clock").text(formattedTime);
            }
        }, 1000);
    }

    $('.start').on('click', function() {
        startTimer();
        allowDragging = true;
        Puzzle();
    });

/**
 * Function for shuffling picture positions
 * Here I go through each block in the first box and randomly set a background-position percentage for it
 */
    function shufflePictures() {
        let arrRandom = ['0% 0%', '-100% 0%', '-200% 0%', '-300% 0%', '0% -100%', '-100% -100%', '-200% -100%', '-300% -100%', '0% -200%', '-100% -200%', '-200% -200%', '-300% -200%', '0% -300%', '-100% -300%', '-200% -300%', '-300% -300%'];
            arrRandom = arrRandom.sort(() => Math.random() - 0.5);
            $('.number').each(function (index) {
                $(this).css('background-position', arrRandom[index]);
            });
    } 

/**
 * Function for checking the puzzle
 * 
 */
    let winnerImage = ['0% 0%', '-100% 0%', '-200% 0%', '-300% 0%', '0% -100%', '-100% -100%', '-200% -100%', '-300% -100%', '0% -200%', '-100% -200%', '-200% -200%', '-300% -200%', '0% -300%', '-100% -300%', '-200% -300%', '-300% -300%'];
    function checkPuzzle() {
        if ($('#gamefield .dropped-puzzle').length != 16) {
            looseWindow();
            return false;
        } 
        for (let i = 0; i < 16; i++) {
            let item = $(`#gamefield .dropped-puzzle:eq(${i})`).css('background-position');
            let order = winnerImage[i];
            if (item != order) {
                looseWindow();
                return false;
            } 
            successWindow();
            return true;
        }
    }

    function looseWindow() {
        $('.loose-window').css({
            display: 'block',
            animation: '0.5s forwards fadeInDown',
        });
        $('.question-window').css({
            display: 'none',
        });
        $('.close-btn').on('click', function(){
            $('.loose-window').css({
                display: 'none',
            });
        });
    }

    function successWindow() {
        $('.success-window').css({
            display: 'block',
            animation: '0.5s forwards fadeInDown',
        });
        $('.question-window').css({
            display: 'none',
        });
        $('.close-btn').on('click', function(){
            $('.success-window').css({
                display: 'none',
            });
        });
    }


};

$(document).ready(() => {
    onStartApp();
});

