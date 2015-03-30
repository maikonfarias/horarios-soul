var MTimePicker = {
  Create: function(inputValue) {
    var timePicker = document.createElement("div");
    timePicker.style.textAlign = "center";
    timePicker.style.marginTop = "10px";
    timePicker.draggable = false;
    
    var arrayTime = timeToArray(inputValue);
    
    var inputHour = document.createElement("input");
    inputHour.type = "number";
    inputHour.value = formatHour(arrayTime[0]);
    inputHour.maxlength = "2";
    inputHour.min = 0;
    inputHour.max = 23;
    inputHour.style.width = "70px";
    inputHour.style.height = "50px";
    inputHour.style.display = "inline-block";
    inputHour.style.textAlign = "center";
    inputHour.style.fontSize = "26px";
    inputHour.style.marginTop = "5px";
    inputHour.style.marginBottom = "5px";
    inputHour.className = MTimePicker.Config.InputClass;
    inputHour.onblur = function() {
      inputHour.value = formatHour(inputHour.value);
    };
    
    var inputMinute = document.createElement("input");
    inputMinute.type = "number";
    inputMinute.value = formatMinute(arrayTime[1]);
    inputMinute.maxlength = "2";
    inputMinute.min = 0;
    inputMinute.max = 59;
    inputMinute.style.width = "70px";
    inputMinute.style.height = "50px";
    inputMinute.style.display = "inline-block";
    inputMinute.style.textAlign = "center";
    inputMinute.style.fontSize = "26px";
    inputMinute.style.marginTop = "5px";
    inputMinute.style.marginBottom = "5px";
    inputMinute.className = MTimePicker.Config.InputClass;
    inputMinute.onblur = function() {
      inputMinute.value = formatMinute(inputMinute.value);
    };
    
    var btnHoursPlus = document.createElement("button");
    btnHoursPlus.innerHTML = "+";
    btnHoursPlus.style.width = "40px";
    btnHoursPlus.style.height = "40px";
    btnHoursPlus.style.fontSize = "22px";
    btnHoursPlus.className = MTimePicker.Config.ButtonClass;
    btnHoursPlus.onclick = function() {
      HourPlus();
    };
    btnHoursPlus.addEventListener("touchstart", HourPlus);
    timePicker.appendChild(btnHoursPlus);

    var btnMinutesPlus = document.createElement("button");
    btnMinutesPlus.innerHTML = "+";
    btnMinutesPlus.style.width = "40px";
    btnMinutesPlus.style.height = "40px";
    btnMinutesPlus.style.marginLeft = "10px";
    btnMinutesPlus.style.fontSize = "22px";
    btnMinutesPlus.className = MTimePicker.Config.ButtonClass;
    btnMinutesPlus.onclick = function() {
      MinutePlus();
    };
    timePicker.appendChild(btnMinutesPlus);  
    
    timePicker.appendChild(document.createElement("br"));

    timePicker.appendChild(inputHour);
    timePicker.appendChild(inputMinute);

    timePicker.appendChild(document.createElement("br"));
    
    var btnHoursMinus = document.createElement("button");
    btnHoursMinus.innerHTML = "-";
    btnHoursMinus.style.width = "40px";
    btnHoursMinus.style.height = "40px";
    btnHoursMinus.style.fontSize = "22px";
    btnHoursMinus.className = MTimePicker.Config.ButtonClass;
    btnHoursMinus.onclick = function() {
      HourMinus();
    };
    timePicker.appendChild(btnHoursMinus);

    var btnMinutesMinus = document.createElement("button");
    btnMinutesMinus.innerHTML = "-";
    btnMinutesMinus.style.width = "40px";
    btnMinutesMinus.style.height = "40px";
    btnMinutesMinus.style.marginLeft = "10px";
    btnMinutesMinus.style.fontSize = "22px";
    btnMinutesMinus.className = MTimePicker.Config.ButtonClass;
    btnMinutesMinus.onclick = function() {
      MinuteMinus();
    };
    timePicker.appendChild(btnMinutesMinus);
    
    //Begin Methods
    timePicker.SetValue = function(value) {
      arrayTime = timeToArray(value);
      inputHour.value = arrayTime[0];
      inputMinute.value = arrayTime[1];
    }
    
    timePicker.GetValue = function() {
      return inputHour.value + ":" + inputMinute.value;
    }
    
    // "12:50" > [12,50]
    function timeToArray(value) {
      var arrayTime = value.split(":");
      if(arrayTime.length == 2) {
        var hour = parseInt(arrayTime[0]);
        if(isNaN(hour)) {
          hour = 0;
        }
        var minute = parseInt(arrayTime[1]);
        if(isNaN(minute)) {
          minute = 0;
        }
        return [hour,minute];
      } else {
        return [0,0];
      }
    }
    
    // [12,50] > "12:50"
    function arrayToTime(arrayTime) {
      if(arrayTime.length == 2) {
        var hour = parseInt(arrayTime[0]);
        if(isNaN(hour)) {
          hour = "00";
        } else {
          if(hour < 10) {
            hour = "0" + hour
          }
        }
        var minute = parseInt(arrayTime[1]);
        if(isNaN(minute)) {
          minute = "00";
        } else {
          if(minute < 10) {
            minute = "0" + minute
          }
        }
        return hour + ":" + minute;
      } else {
        return "0:00";
      }
    }
    
    function formatZero(number) {
      var newValue = parseInt(number);
        if(isNaN(newValue)) {
          newValue = "00";
        } else {
          if(newValue < 10) {
            newValue = "0" + newValue
          }
        }
        return newValue;
    }
    
    function formatHour(hour) {
      hour = parseInt(hour);
      if(isNaN(hour) || hour > 23) {
        hour = 0;
      } else if(hour < 0) {
        hour = 23;
      }
      return formatZero(hour);
    }
    
    function formatMinute(minute) {
      minute = parseInt(minute);
      if(isNaN(minute) || minute > 59) {
        minute = 0;
      } else if(minute < 0) {
        minute = 59;
      }
      return formatZero(minute);
    }
    
    function HourPlus() {
      var arrayTime = timeToArray(timePicker.GetValue());
      arrayTime[0]++;      
      inputHour.value = formatHour(arrayTime[0]);
    }
    
    function HourMinus() {
      var arrayTime = timeToArray(timePicker.GetValue());
      arrayTime[0]--;
      inputHour.value = formatHour(arrayTime[0]);
    }
    
    function MinutePlus() {
      var arrayTime = timeToArray(timePicker.GetValue());
      arrayTime[1]++;
      inputMinute.value = formatMinute(arrayTime[1]);
    }
    
    function MinuteMinus() {
      var arrayTime = timeToArray(timePicker.GetValue());
      arrayTime[1]--;
      inputMinute.value = formatMinute(arrayTime[1]);
    }
    //End Methods
    
    return timePicker;
  },
  ShowModal: function (input, callback, title) {
    function EnableAllInputs() { 
      for(var i=0; i<(document.getElementsByTagName('input').length); i++) {
        document.getElementsByTagName('input')[i].removeAttribute('disabled');
      }
      for(var i=0; i<(document.getElementsByTagName('select').length); i++) {
        document.getElementsByTagName('select')[i].removeAttribute('disabled');
      }
    }
    
    function DisableAllInputs() {
      for(var i=0; i<(document.getElementsByTagName('input').length); i++) {
        document.getElementsByTagName('input')[i].setAttribute('disabled', 'disabled');
      }
      for(var i=0; i<(document.getElementsByTagName('select').length); i++) {
        document.getElementsByTagName('select')[i].setAttribute('disabled', 'disabled');
      }
    }
    var MTimePicker_back = function() {
      var modalOpened = document.getElementById("MTimePickerModal");
      if(modalOpened) {
        document.removeEventListener("backbutton", MTimePicker_back, false);
        document.body.removeChild(modalOpened);
        EnableAllInputs();
        return false;
      }
    };
    
    var modalAlreadyOpened = document.getElementById("MTimePickerModal");
    if(modalAlreadyOpened) {
      document.removeEventListener("backbutton", MTimePicker_back, false);
      document.body.removeChild(modalAlreadyOpened);
      EnableAllInputs();
    }
    
    // android please
    DisableAllInputs();
    
    var divModalBG = document.createElement("div");
    divModalBG.id = "MTimePickerModal";
    divModalBG.style.overflow = "auto";
    divModalBG.style.position = "fixed";
    divModalBG.style.left = "0px";
    divModalBG.style.top = "0px";
    divModalBG.style.width = "100%";
    divModalBG.style.height = "100%";
    divModalBG.style.zIndex = "9999";
    divModalBG.style.display = "block";
    divModalBG.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    divModalBG.addEventListener(
      "touchmove",
      function(e) {
        e.preventDefault();
      }
    );
    divModalBG.draggable = false;
    
    var divModal = document.createElement("div");
    divModal.className = "ModalDialog";
    divModal.style.position = "absolute";
    divModal.style.left = "50%";
    divModal.style.top = "50%";    
    divModal.style.marginLeft = "-100px";
    divModal.style.marginTop = "-125px";  
    divModal.style.width = "200px";
    divModal.style.height = "250px";
    divModal.style.backgroundColor = "white";
    divModal.style.textAlign = "center";
    divModal.style.verticalAlign = "middle";
    divModal.draggable = false;
    
    var divTitle = document.createElement("div");
    divTitle.innerHTML = title||"Escolha uma Hora:";
    divTitle.style.fontSize = "18px";
    divTitle.style.height = "20px";
    divTitle.style.marginTop = "10px";
    divTitle.style.marginBottom = "20px";
    divTitle.className = MTimePicker.Config.TitleClass;
    divTitle.draggable = false;
    divModal.appendChild(divTitle);
    
    var timePicker = MTimePicker.Create(input);
    divModal.appendChild(timePicker);
    
    var btnCancel = document.createElement("button");
    btnCancel.innerHTML = "Cancelar";
    btnCancel.style.marginTop = "10px";
    btnCancel.style.width = "80px";
    btnCancel.className = MTimePicker.Config.ButtonClass;
    btnCancel.onclick = function() {
      document.removeEventListener("backbutton", MTimePicker_back, false);
      document.body.removeChild(divModalBG);  
      EnableAllInputs();     
    };
    divModal.appendChild(btnCancel);
    
    var btnOK = document.createElement("button");
    btnOK.innerHTML = "OK";    
    btnOK.style.marginLeft = "10px";
    btnOK.style.marginTop = "10px";
    btnOK.style.width = "50px";
    btnOK.className = MTimePicker.Config.ButtonClass;
    btnOK.onclick = function() {
      if(callback){
        callback(timePicker.GetValue());        
      }
      document.removeEventListener("backbutton", MTimePicker_back, false);
      document.body.removeChild(divModalBG);  
      EnableAllInputs();      
    };
    divModal.appendChild(btnOK);    
    divModalBG.appendChild(divModal);
    document.body.appendChild(divModalBG);
    
    document.addEventListener("backbutton", MTimePicker_back, false);
  },
  Apply: function(elementOrId, title) {
    if(typeof elementOrId == "string") {
      elementOrId = document.getElementById(elementOrId);
    }
    elementOrId.type = "text";
    elementOrId.readOnly = "readonly";
    elementOrId.style.backgroundColor = "white";
    elementOrId.style.cursor = "default";
    elementOrId.onclick = function() {
      MTimePicker.ShowModal(
        elementOrId.value,
        function(newValue) {
          elementOrId.value = newValue;
        },
        title
      );
    };
  },
  Config: {
    ButtonClass: "",
    InputClass: "",
    TitleClass: ""
  }
};









