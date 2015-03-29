var MTimePicker = {
  Create: function(inputValue) {
    var timePicker = document.createElement("div");
    timePicker.style.textAlign = "center";
    timePicker.style.marginTop = "10px";
    timePicker.draggable = false;
    
    var input = document.createElement("input");
    input.type = "text";
    input.value = inputValue;
    input.style.width = "100px";
    input.style.height = "50px";
    input.style.display = "inline-block";
    input.style.textAlign = "center";
    input.style.fontSize = "26px";
    input.style.marginTop = "5px";
    input.style.marginBottom = "5px";
    input.className = MTimePicker.Config.InputClass;
    
    var btnHoursPlus = document.createElement("button");
    btnHoursPlus.innerHTML = "+";
    btnHoursPlus.style.width = "40px";
    btnHoursPlus.style.height = "40px";
    btnHoursPlus.style.fontSize = "22px";
    btnHoursPlus.className = MTimePicker.Config.ButtonClass;
    btnHoursPlus.onclick = function() {
      HourPlus();
    };
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

    timePicker.appendChild(input);  

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
      input.value = value;
    }
    
    timePicker.GetValue = function() {
      return input.value;
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
          hour = "0";
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
    
    function HourPlus() {
      var arrayTime = timeToArray(input.value);
      if(arrayTime[0] > 22) {
        arrayTime[0] = 0;
      } else {
        arrayTime[0]++;        
      }
      input.value = arrayToTime(arrayTime);
    }
    
    function HourMinus() {
      var arrayTime = timeToArray(input.value);
      if(arrayTime[0] == 0) {
        arrayTime[0] = 23;
      } else {
        arrayTime[0]--;        
      }
      input.value = arrayToTime(arrayTime);
    }
    
    function MinutePlus() {
      var arrayTime = timeToArray(input.value);
      if(arrayTime[1] > 58) {
        arrayTime[1] = 0;
      } else {
        arrayTime[1]++;        
      }
      input.value = arrayToTime(arrayTime);
    }
    
    function MinuteMinus() {
      var arrayTime = timeToArray(input.value);
      if(arrayTime[1] == 0) {
        arrayTime[1] = 59;
      } else {
        arrayTime[1]--;        
      }
      input.value = arrayToTime(arrayTime);
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
    
    var divTitle = document.createElement("div");
    divTitle.innerHTML = title||"Escolha uma Hora:";
    divTitle.style.fontSize = "18px";
    divTitle.style.height = "20px";
    divTitle.style.marginTop = "10px";
    divTitle.style.marginBottom = "20px";
    divTitle.className = MTimePicker.Config.TitleClass;
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









