// ################################# //
//
// Propogation Code
//
// ################################# //

$('.checkbox').change(function(e) {

  var checked = $(this).val();
  if (checked) {
    addPropogationListeners();
  } else {
    removePropogationListeners();
  }
});

function addPropogationListeners() {
  var els = document.querySelectorAll('.demo *');

  for (var i = 0; i < els.length; i++) {
    els[i].addEventListener('click', showBubble, false);
    els[i].addEventListener('click', showCapture, true);
  }
}

function removePropogationListeners() {
  var els = document.querySelectorAll('.demo *');

  for (var i = 0; i < els.length; i++) {
    els[i].removeEventListener('click', showBubble, false);
    els[i].removeEventListener('click', showCapture, true);
  }
}

function showCapture(e) {
  var id = '#' + this.id;
  if (e.eventPhase == 1) {
    // Capturing
    console.info('Capturing: ' + e.type + ' on ' + id);
  }
}

function showBubble(e) {
  var id = '#' + this.id;
  if (e.eventPhase == 2) {
    // On Target
    console.info('On Target: ' + e.type + ' on ' + id);
  } else if (e.eventPhase == 3) {
    // Bubbling
    console.info('Bubbling: ' + e.type + ' on ' + id);
  }
}


// ################################# //
//
// Event Visualization Code
//
// ################################# //

// Set hover behavior. This is a bummer because it sets additional events, but
// we are using it because default CSS hovers don't create the effect we want.
// See http://stackoverflow.com/q/17923922/1154642
function setHoverBehavior() {
  $('.box').mouseenter(function() {
    $('.box').removeClass('clickable');
    $(this).addClass('clickable');
  });
  $('.box').mouseleave(function() {
    $(this).removeClass('clickable');
    // This code is flawed. It assumes that every time we leave a .box element
    // then we are going into it's parent. Still, it works for these use cases so
    // we'll leave it as good enough for now.
    $(this).parent().addClass('clickable');
  });
}

function unsetHoverBehavior() {
  $('.box').unbind('mouseenter');
  $('.box').unbind('mouseleave');
}

function addShakeEvent(selector) {
  var els = document.querySelectorAll(selector);
  for (var i = 0; i < els.length; i++) {
    els[i].addEventListener('click', shake);
    els[i].classList.add("shake-listener");
  }
}

function addSmartShakeEvent(selector) {
  var els = document.querySelectorAll(selector);
  for (var i = 0; i < els.length; i++) {
    els[i].addEventListener('click', smartShake);
    els[i].classList.add("shake-listener");
  }
}

function addStopPropShakeEvent(selector) {
  var els = document.querySelectorAll(selector);
  for (var i = 0; i < els.length; i++) {
    els[i].addEventListener('click', stopPropShake);
    els[i].classList.add("shake-listener");
  }
}

function addDelegatedShakeEvent(selector) {
  var els = document.querySelectorAll(selector);
  for (var i = 0; i < els.length; i++) {
    els[i].addEventListener('click', delegatedShake);
    els[i].classList.add("shake-listener");
  }
}

function removeAllShakeEvents() {
  var els = document.querySelectorAll(".demo *");
  for (var i = 0; i < els.length; i++) {
    els[i].removeEventListener('click', shake);
    els[i].removeEventListener('click', smartShake);
    els[i].removeEventListener('click', delegatedShake);
    els[i].classList.remove("shake-listener");
  }
}


function shake(event, target) {
  var shakee = (typeof target !== 'undefined') ? target : event.currentTarget;
  var l = 20;
  for(var i = 0; i < 4; i++) {
    $(shakee).animate({
      'margin-left': "+=" + (l = -l) + 'px',
      'margin-right': "-=" + l + 'px'
    }, 100);
  }
}

function stopPropShake(event) {
  event.stopPropagation();
  shake(event);
}

function smartShake(event) {
  var tar = event.target; // The actual element we clicked. It could be a child of the one the event is on.
  var cTar = event.currentTarget; // The element the event is currently firing on. It could be anywhere in the propagation chain.

  if (tar == cTar) {
    shake(event);
  }
}

function delegatedShake(event) {
   // The actual element we clicked. It will likely a child of the one the event is on.
  var target = event.target;

  // We only want to shake list items from the target clicked.
  if (target && target.nodeName == "LI") {
    shake(event, target);
  }
}

// ################################# //
//
// Application Code
//
// ################################# //

$('.submit').click(function(e) {
  e.preventDefault();
  var field = $(this).siblings('.selector');
  var selector = field.val();
  addShakeEvent(selector);
  field.val('');
});

$('.submit-smart').click(function(e) {
  e.preventDefault();
  var field = $(this).siblings('.selector');
  var selector = field.val();
  addSmartShakeEvent(selector);
  field.val('');
});

$('.submit-stop-prop').click(function(e) {
  e.preventDefault();
  var field = $(this).siblings('.selector');
  var selector = field.val();
  addStopPropShakeEvent(selector);
  field.val('');
});

$('.submit-del').click(function(e) {
  e.preventDefault();
  var field = $(this).siblings('.selector');
  var selector = field.val();
  addDelegatedShakeEvent(selector);
  field.val('');
});

$('.reset').click(function(e) {
  e.preventDefault();
  $(this).siblings('.selector').val('');
  removeAllShakeEvents();
});
