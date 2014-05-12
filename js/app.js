document.addEventListener('DOMContentLoaded', function() {
  var cash = document.querySelector('#cash');
  var rate = document.querySelector('#rate');
  var weight = document.querySelector('#weight');
  var tenner = document.querySelector('#tenner');
  var rateRadios = document.querySelector('#radios-rate');
  var weightRadios = document.querySelector('#radios-weight');
  var share = document.querySelector('#share');

  var cashInput = function() {
    var value = cash.value;
    var rateValue = rate.value;
    var weightValue = weight.value;

    weight.value = (value / rateValue).toFixed(1);
  }

  cash.addEventListener('input', cashInput);

  rate.addEventListener('input', function() {
    var value = this.value;
    var cashValue = cash.value;
    var weightValue = weight.value;

    var radio = rateRadios.querySelector('input:checked').value;

    if (radio == 'cash') {
      var newCashValue = (value * weightValue).toFixed(2);
      if (newCashValue.match(/.00/)) {
        newCashValue = parseInt(newCashValue);
      }

      cash.value = newCashValue;
    }
    else if (radio == 'weight') {
      var newWeightValue = (cashValue / value).toFixed(2);
      if (newWeightValue.match(/.00/)) {
        newWeightValue = parseInt(newWeightValue);
      }

      weight.value = newWeightValue;
    }
  });

  weight.addEventListener('input', function() {
    var value = this.value;
    var rateValue = rate.value;
    var cashValue = cash.value;

    var radio = weightRadios.querySelector('input:checked').value;

    if (radio == 'cash') {
      var newCashValue = (value * rateValue).toFixed(2);
      if (newCashValue.match(/.00/)) {
        newCashValue = parseInt(newCashValue);
      }

      cash.value = newCashValue;
    }
    else if (radio == 'rate') {
      var newRateValue = (cashValue / value).toFixed(2);
      if (newRateValue.match(/.00/)) {
        newRateValue = parseInt(newRateValue);
      }

      rate.value = newRateValue;
    }
  });

  weight.addEventListener('focus', function() {
    rateRadios.classList.remove('active');
    weightRadios.classList.add('active');
  });

  weight.addEventListener('blur', function() {
   if (!weightRadios.querySelector('*:hover')) {
      weightRadios.classList.remove('active');
    }
  });

  rate.addEventListener('focus', function() {
    weightRadios.classList.remove('active');
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
    if (document.activeElement == rate || document.activeElement == weight) {
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
