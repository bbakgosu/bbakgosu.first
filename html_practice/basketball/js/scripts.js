var computer = {
    score : 0,
    percent2: 0.5,
    percent3: 0.33
};

var user = {
    score: 0,
    percent2: 0.5,
    percent3: 0.33
};

var game = {
    isComputerTurn : true,
    shotsLeft : 15
};

// var comScore = 0;
// var isComputerTurn = true;
// var userScore = 0;
// var shotsLeft = 15;
// var comPercent2 = 0.5;
// var comPercent3 = 0.33;
//
// var userScore =0;
// var userPercent2 = 0.5;
// var userPercent3 = 0.33;

function onComputerShoot() {
    if (!game.isComputerTurn){
        return;
    }
    updateAI();
    var shootType = Math.random() < 0.5? 2:3;
    var $textElem = $('#text');
    var $comScoreElem = $('#computer-score');
    game.isComputerTurn = false;
    if (Math.random() < computer['percent' + shootType]) {
        showText('Computer scored ' + shootType + '-point shoot!');

        updateComputerScore(shootType);
    } else {
        showText('Computer failed ' + shootType + '-point shoot!');
    }
    disableComputerButtons(true);
    disableUserButtons(false);
}

function onUserShoot(shootType) {
    if (game.isComputerTurn)
        return;
    var $textElem = $('#text');
    var $userScoreElem = $('#user-score');

    if (Math.random() < user['percent' + shootType]) {
        showText('You scored ' + shootType + '-point shoot!');

        updateUserScore(shootType);
    } else {
        showText('You failed ' + shootType + '-point shoot!');
    }
    game.shotsLeft--;

    var $shotsLeftElem = $('#shots-left');
    $shotsLeftElem.html(game.shotsLeft);
    game.isComputerTurn = true;
    disableUserButtons(true);
    disableComputerButtons(false);
    if (game.shotsLeft === 0) {
        if (user.score > computer.score)
            $textElem.html('Victory!');
        else if (user.score < computer.score)
            $textElem.html('You Lose...');
        else
            $textElem.html('Draw');
        disableComputerButtons(true)
        disableUserButtons(true)
    }
}
function showText(s) {
    var $textElem = $('#text');
    $textElem.fadeOut(300,function () {
        $textElem.html(s);
        $textElem.fadeIn(100);
    })
}

function updateComputerScore(score) {
    computer.score +=score;
    var $comScoreElem = $('#computer-score');

    $comScoreElem.animateNumber({
        number: computer.score
    });

}

function updateUserScore(score) {
    user.score +=score;
    var $userScoreElem = $('#user-score');
    $userScoreElem.animateNumber({
        number: user.score
    });
}

function disableComputerButtons(flag) {
    var $computerButtons = $('.btn-computer');
    $computerButtons.prop('disabled',flag);
}

function disableUserButtons(flag) {
    var $userButtons = $('.btn-user');
    $userButtons.prop('disabled', flag);
}
function updateAI() {
    var diff = user.score - computer.score;
    if (diff >= 10) {
        computer.percent2 = 0.7;
        computer.percent3 = 0.43;
    } else if (diff >= 6) {
        computer.percent2 = 0.6;
        computer.percent3 = 0.38;
    } else if (diff <= -6) {
        computer.percent2 = 0.28;
    } else if (diff <= -10) {
        computer.percent2 = 0.3;
        computer.percent3 = 0.23;
    }
}
$(function () {
    showText(3);

    setTimeout(function () {
        showText(2);

        setTimeout(function () {
            showText(1);

            setTimeout(function () {
                showText('Computer goes first!');
                disableComputerButtons(false);
            },1000)
        },1000)
    }, 1000)
});
