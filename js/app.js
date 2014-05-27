document.addEventListener('DOMContentLoaded', function() {
  "use strict";

  var $ = document.querySelector.bind(document);
  var $$ = document.querySelectorAll.bind(document);

  var kashoderkurs = {

    hours: new Date().getHours(),
    cash: $('#cash'),
    rate: $('#rate'),
    unit: $('#unit'),
    input: [cash, rate, unit],
    tenner: $('#tenner'),
    rateRadios: $('#radios-rate'),
    unitRadios: $('#radios-unit'),
    share: $('#share'),

    run: function() {
      this.changeStyle();
      this.hash.handle();
      this.inputs.init();
    },

    changeStyle: function() {
      if (this.hours > 21 || this.hours < 7) {
        document.body.classList.add('night');
      }
    },

    hash: {
      handle: function() {
        if (location.hash) {
          var hash = location.hash.substr(1);
          var hashValues = hash.split('/');

          if (parseInt(hashValues[2]) == hashValues[2]) {
            hashValues[2] = parseFloat(hashValues[2]).toFixed(2);
          }

          if (hashValues.length == 3 && (hashValues[0] / hashValues[1]).toFixed(2) == hashValues[2]) {
            for (var i = 0, j = inputs.length; i < j; i++) {
              if (hashValues[i].match(/.00/)) {
                hashValues[i] = parseInt(hashValues[i]);
              }

              inputs[i].value = hashValues[i];
            }
          }
          else {
            for (var i = 0, j = inputs.length; i < j; i++) {
              inputs[i].value = '';
            }
            if (!!(window.history && history.pushState)) {
              history.pushState(document.title, '', window.location.protocol + '//' + location.host + window.location.pathname + window.location.search);
            }
          }
        }
      },

      update: function() {
        var hash = [];
        for (var i = 0, j = inputs.length; i < j; i++) {
          hash[i] = inputs[i].value;
        }

        location.hash = hash.join('/');
      }
    },

    inputs: {
      init: function() {
        console.log(kashoderkurs.inputs);
        Array.prototype.forEach.call(kashoderkurs.inputs, function(index, value) {
          console.log(index, value);
        });
      },
      cash: {
        init: function() {
          kashoderkurs.cash.addEventListener('input', this.update());
        },
        update: function() {
          var value = this.cash.value;
          var rateValue = kashoderkurs.rate.value;
          var unitValue = kashoderkurs.unit.value;

          if (!parseInt(rateValue)) {
            unit.value = 0;
            return;
          }

          var newUnitValue = (value / rateValue).toFixed(2);
          if (newUnitValue.match(/.00/)) {
            newUnitValue = parseInt(newUnitValue);
          }

          kashoderkurs.unit.value = newUnitValue;
        }
      },
      rate: {
        init: function() {
          kashoderkurs.rate.addEventListener('input', this.update());
        },
        update: function() {
          var value = this.value;
          var cashValue = kashoderkurs.cash.value;
          var unitValue = kashoderkurs.unit.value;

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
        }
      },
      unit: {
        init: function() {
          unit.addEventListener('input', this.update());
        },
        update: function() {
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
        }
      }
    }
  };

  kashoderkurs.run();

  rate.addEventListener('input', function() {

  });

  unit.addEventListener('input', function() {

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

  var updateHash = function() {
  };

  for (var i = 0, j = inputs.length; i < j; i++) {
    inputs[i].addEventListener('input', function() {
      updateHash();
    });
  }

  document.addEventListener('keyup', function(e) {
    if (document.activeElement == rate || document.activeElement == unit) {
      var radioInputs = $$('#radios-' + document.activeElement.id + ' input');

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

  var playableAudio = $$('[data-type="audio"]');
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
