$(function(){
    function buildHTML(message){
      if ( message.content && message.image ) {
        var html =
          `<div class="main_chat__message--list__data" data-message-id= ${message.id} >
            <div class="main_chat__message--list__data__list">
              <div class="main_chat__message--list__data__list__name">
                ${message.user_name}
              </div>
              <div class="main_chat__message--list__data__list__time">
                ${message.created_at}
              </div>
            </div>
            <div class="main_chat__message--list__data__text">
              <p class="lower-message__content">
                ${message.content}
              </p>
              <img src=${message.image} >
            </div>
          </div>`
      } else if (message.content) {
        var html =
          `<div class="main_chat__message--list__data" data-message-id= ${message.id}  >
            <div class="main_chat__message--list__data__list">
              <div class="main_chat__message--list__data__list__name">
                ${message.user_name}
              </div>
              <div class="main_chat__message--list__data__list__time">
                ${message.created_at}
              </div>
            </div>  
            <div class="main_chat__message--list__data__text">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
      } else if (message.image) {
        var html =
        `<div class="main_chat__message--list__data" data-message-id=  ${message.id} >
          <div class="main_chat__message--list__data__list">
            <div class="main_chat__message--list__data__list__name">
              ${message.user_name}
            </div>
            <div class="main_chat__message--list__data__list__time">
              ${message.created_at}
            </div>
          </div>
          <div class="main_chat__message--list__data__text">
            <img src=${message.image} >
          </div>
        </div>`
      };
      return html;
    };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_chat__message--list').append(html);
      $('form')[0].reset();
      $('.main_chat__message--list').animate({ scrollTop: $('.main_chat__message--list')[0].scrollHeight});
      $('Send').prop('disabled', false)
    })
    
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
    return false;
  })

  var reloadMessages = function() {
    var last_message_id = $('.main_chat__message--list__data:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main_chat__message--list').append(insertHTML);
        $('.main_chat__message--list').animate({ scrollTop: $('.main_chat__message--list')[0].scrollHeight});
      }
    })

    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});