document.addEventListener('DOMContentLoaded', function() {
  "use strict";

  var date = new Date();
  var hours = date.getHours();
  var cash = document.querySelector('#cash');
  var rate = document.querySelector('#rate');
  var unit = document.querySelector('#unit');
  var tenner = document.querySelector('#tenner');
  var rateRadios = document.querySelector('#radios-rate');
  var unitRadios = document.querySelector('#radios-unit');
  var share = document.querySelector('#share');

  if (hours > 22 || hours < 7) {
    document.body.classList.add('night');
  }

  var cashInput = function() {
    var value = cash.value;
    var rateValue = rate.value;
    var unitValue = unit.value;

    if (!parseInt(rateValue)) {
      unit.value = 0;
      return;
    }

    var newUnitValue = (value / rateValue).toFixed(2);
    if (newUnitValue.match(/.00/)) {
      newUnitValue = parseInt(newUnitValue);
    }

    unit.value = newUnitValue;
  }

  cash.addEventListener('input', cashInput);

  rate.addEventListener('input', function() {
    var value = this.value;
    var cashValue = cash.value;
    var unitValue = unit.value;

    var radio = rateRadios.querySelector('input:checked').value;

    if (radio == 'cash') {
      var newCashValue = (value * unitValue).toFixed(2);
      if (newCashValue.match(/.00/)) {
        newCashValue = parseInt(newCashValue);
      }

      cash.value = newCashValue;
    }
    else if (radio == 'unit') {
      if (!parseInt(value)) {
        unit.value = 0;
        return;
      }

      var newUnitValue = (cashValue / value).toFixed(2);
      if (newUnitValue.match(/.00/)) {
        newUnitValue = parseInt(newUnitValue);
      }

      unit.value = newUnitValue;
    }
  });

  unit.addEventListener('input', function() {
    var value = this.value;
    var rateValue = rate.value;
    var cashValue = cash.value;

    var radio = unitRadios.querySelector('input:checked').value;

    if (radio == 'cash') {
      var newCashValue = (value * rateValue).toFixed(2);
      if (newCashValue.match(/.00/)) {
        newCashValue = parseInt(newCashValue);
      }

      cash.value = newCashValue;
    }
    else if (radio == 'rate') {
      if (!value) {
        rate.value = 0;
        return;
      }

      var newRateValue = (cashValue / value).toFixed(2);
      if (newRateValue.match(/.00/)) {
        newRateValue = parseInt(newRateValue);
      }

      rate.value = newRateValue;
    }
  });

  unit.addEventListener('focus', function() {
    rateRadios.classList.remove('active');
    unitRadios.classList.add('active');
  });

  unit.addEventListener('blur', function() {
   if (!unitRadios.querySelector('*:hover')) {
      unitRadios.classList.remove('active');
    }
  });

  rate.addEventListener('focus', function() {
    unitRadios.classList.remove('active');
    rateRadios.classList.add('active');
  });

  rate.addEventListener('blur', function() {
    if (!rateRadios.querySelector('*:hover')) {
      rateRadios.classList.remove('active');
    }
  });

  tenner.addEventListener('click', function(e) {
    cash.value = 10;
    cashInput();

    e.preventDefault();
  });

  document.addEventListener('keyup', function(e) {
    if (document.activeElement == rate || document.activeElement == unit) {
      var radioInputs = document.querySelectorAll('#radios-' + document.activeElement.id + ' input');

      if (e.keyCode === 37 || e.keyCode === 39) {
        if (e.keyCode === 37) {
          radioInputs[0].checked = true;
          radioInputs[1].checked = false;
        }
        else if (e.keyCode === 39) {
          radioInputs[0].checked = false;
          radioInputs[1].checked = true;
        }

        e.preventDefault();
      }
    }
  })

  var playableAudio = document.querySelectorAll('[data-type="audio"]');
  Array.prototype.forEach.call(playableAudio, function(playableElement) {
    var src = playableElement.getAttribute('data-src');
    var audio = new Audio(src);

    playableElement.style.cursor = 'pointer';

    playableElement.addEventListener('click', function() {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    });
  });

  if (playableAudio.length == 1) {
    document.addEventListener('keydown', function(e) {
      if (e.keyCode === 32) {
        playableAudio[0].click();
        e.preventDefault();
      }
    });
  }

  share.addEventListener('click', function() {
    var width = share.getAttribute('data-width'), height = share.getAttribute('data-height'), url = share.getAttribute('data-url');
    var wx = (screen.width - width) >> 1, wy = (screen.height - height) >> 1;

    window.open(share.getAttribute('data-url'), '', "top=" + wy + ",left=" + wx + ",width=" + width + ",height=" + height);
    return false;
  });
});
