var $messages = $('.messages-content'), sessionId, d, h, m;

async function initChat() {
    let raw = await fetch("https://api.d8.run/createSession");
    sessionId = (await raw.json()).sessionId;
    $(".avenue-messenger").show();
}

$(window).on('ready', function() {
    $messages.mCustomScrollbar();
    initChat();
});


function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'));
    $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'));
  }
}

async function insertMessage() {
    msg = $('.message-input').val();
    if ($.trim(msg) == '') {
        return false;
    }
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.messages-content')).addClass('new');
    setDate();
    $('.message-input').val(null);
    updateScrollbar();
    replyMessage(msg);
}

$('.message-submit').on('click', function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

async function replyMessage(msg) {
    if ($('.message-input').val() != '') {
        return false;
    }
    $('<div class="message loading new"><figure class="avatar"><img src="/assets/img/havatar.jpeg" /></figure><span></span></div>').appendTo($('.messages-content'));
    updateScrollbar();
    sendToBot(msg);
}

async function sendToBot(msg) {
    let res = await fetch('https://api.d8.run/ask', {
        method: 'POST',
        body: JSON.stringify({
            sessionId: sessionId,
            prompt: msg
        })
    });
    let raw = await res.json();
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="/assets/img/havatar.jpeg" /></figure>' + raw.text + '</div>').appendTo($('.messages-content')).addClass('new');
    setDate();
    updateScrollbar();
}

$('.button').click(function(){
  $('.menu .items span').toggleClass('active');
   $('.menu .button').toggleClass('active');
});
