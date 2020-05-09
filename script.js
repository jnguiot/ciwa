var timeout;
var charID = 0;
var signID = 0;
var time;

const dit = 1;
const dah = 3;

const alphabet={
    'a' : [dit, dah],
    'b' : [dah, dit, dit, dit],
    'c' : [dah, dit, dah, dit],
    'd' : [dah, dit, dit],
    'e' : [dit],
    'f' : [dit, dit, dah, dit],
    'g' : [dah, dah, dit],
    'h' : [dit, dit, dit, dit],
    'i' : [dit, dit],
    'j' : [dit, dah, dah, dah],
    'k' : [dah, dit, dah],
    'l' : [dit, dah, dit, dit],
    'm' : [dah, dah],
    'n' : [dah, dit],
    'o' : [dah, dah, dah],
    'p' : [dit, dah, dah, dit],
    'q' : [dah, dah, dit, dah],
    'r' : [dit, dah, dit],
    's' : [dit, dit, dit],
    't' : [dah],
    'u' : [dit, dit, dah],
    'v' : [dit, dit, dit, dah],
    'w' : [dit, dah, dah],
    'x' : [dah, dit, dit, dah],
    'y' : [dah, dit, dah, dah],
    'z' : [dah, dah, dit, dit],
    '0' : [dah, dah, dah, dah, dah],
    '1' : [dit, dah, dah, dah, dah],
    '2' : [dit, dit, dah, dah, dah],
    '3' : [dit, dit, dit, dah, dah],
    '4' : [dit, dit, dit, dit, dah],
    '5' : [dit, dit, dit, dit, dit],
    '6' : [dah, dit, dit, dit, dit],
    '7' : [dah, dah, dit, dit, dit],
    '8' : [dah, dah, dah, dit, dit],
    '9' : [dah, dah, dah, dah, dit],
    '.' : [dit, dah, dit, dah, dit, dah],
    ', ' : [dah, dah, dit, dit, dah, dah],
    '?' : [dit, dit, dah, dah, dit, dit],
    '\'' : [dit, dah, dah, dah, dah, dit],
    '!' : [dit, dah, dah, dah, dah, dit],
    '/' : [dah, dit, dit, dah, dit],
    '(' : [dah, dit, dah, dah, dit],
    ')' : [dah, dit, dah, dah, dit, dah],
    '&' : [dit, dah, dit, dit, dit],
    ':' : [dah, dah, dah, dit, dit, dit],
    ';' : [dah, dit, dah, dit, dah, dit],
    '=' : [dah, dit, dit, dit, dah],
    '+' : [dit, dah, dit, dah, dit],
    '-' : [dah, dit, dit, dit, dit, dah],
    '"' : [dit, dah, dit, dit, dah, dit],
    ' ' : [0],
}

function setWPM(wpm){
    // We use PARIS (50 elements) to calculate WPM
    time = 60 * 1000 / wpm / 50 ;
    document.getElementById('wpm_display').innerHTML = wpm;
}

function setVolume(volume){
    audio.volume = volume / 100;
    document.getElementById('volume_display').innerHTML = volume;
}

function start(){
    startSign();
    audio.play();
}
function stop(){
    clearTimeout(timeout);
    audio.pause();
}
function reset(){
    stop();
    charID = 0;
    signID = 0;
    document.getElementById('prompter').innerHTML = '<div id="shader"></div>';
}

function getCurrentChar(){
    return document.getElementById('data').value[charID];
}

function getCurrentCWChar(){
    return alphabet[getCurrentChar().toLowerCase()];
}

function getCurrentSign(){
    return getCurrentCWChar()[signID];
}


// Reader FSM
function startSign(){
    sign = getCurrentSign();
    if(getCurrentChar() != " ")
        audio.muted=false;
    timeout = setTimeout('stopSign()', time * sign);
}

function stopSign(){
    audio.muted=true;

    signID++;

    if (getCurrentSign() != undefined )
        timeout = setTimeout('startSign()', time);
    else {
        // If unable to get current sign, it means we have played the character. Next one.
        document.getElementById('prompter').innerHTML += getCurrentChar();

        if(getCurrentChar() != undefined)
            charID++;
        signID = 0;
        if(getCurrentChar() == " ")
            audio.currentTime = 0;

        timeout = setTimeout('startSign()', time * 3);
    }
}

window.onload = function(){
    setWPM(document.querySelector("#wpm input").value);
    setVolume(document.querySelector("#volume input").value);
}
