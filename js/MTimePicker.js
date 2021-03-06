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
    inputHour.style.width = "80px";
    inputHour.style.height = "50px";
    inputHour.style.display = "inline-block";
    inputHour.style.cssFloat = "left";
    inputHour.style.textAlign = "center";
    inputHour.style.fontSize = "26px";
    inputHour.style.borderRadius = "0px";    
    inputHour.className = MTimePicker.Config.InputClass;
    inputHour.onblur = function() {
      inputHour.value = formatHour(inputHour.value);
    };
    inputHour.addEventListener("touchstart", function(e) {
      inputHour.select();
    },true);
    
    var inputMinute = document.createElement("input");
    inputMinute.type = "number";
    inputMinute.value = formatMinute(arrayTime[1]);
    inputMinute.maxlength = "2";
    inputMinute.min = 0;
    inputMinute.max = 59;
    inputMinute.style.width = "80px";
    inputMinute.style.height = "50px";
    inputMinute.style.display = "inline-block";
    inputMinute.style.cssFloat = "left";
    inputMinute.style.textAlign = "center";
    inputMinute.style.fontSize = "26px";
    inputMinute.style.marginLeft = "15px";
    inputMinute.style.borderRadius = "0px";
    inputMinute.className = MTimePicker.Config.InputClass;
    inputMinute.onblur = function() {
      inputMinute.value = formatMinute(inputMinute.value);
    };
    inputMinute.addEventListener("touchstart", function(e) {
      inputMinute.select();
    },true);
    
    var btnHoursPlus = document.createElement("button");
    btnHoursPlus.innerHTML = "+";
    btnHoursPlus.style.width = "80px";
    btnHoursPlus.style.height = "40px";
    btnHoursPlus.style.fontSize = "22px";
    btnHoursPlus.style.borderRadius = "0px";
    btnHoursPlus.style.borderTopLeftRadius = MTimePicker.Config.BorderRadius;
    btnHoursPlus.style.borderTopRightRadius = MTimePicker.Config.BorderRadius;
    btnHoursPlus.className = MTimePicker.Config.ButtonClass;
    btnHoursPlus.addEventListener("click", HourPlus);
    btnHoursPlus.addEventListener("touchstart", function(e){
      btnHoursPlus.removeEventListener("click",HourPlus);
      HourPlus();      
    },true);
    timePicker.appendChild(btnHoursPlus);

    var btnMinutesPlus = document.createElement("button");
    btnMinutesPlus.innerHTML = "+";
    btnMinutesPlus.style.width = "80px";
    btnMinutesPlus.style.height = "40px";
    btnMinutesPlus.style.marginLeft = "15px";
    btnMinutesPlus.style.fontSize = "22px";
    btnMinutesPlus.style.borderRadius = "0px";
    btnMinutesPlus.style.borderTopLeftRadius = MTimePicker.Config.BorderRadius;
    btnMinutesPlus.style.borderTopRightRadius = MTimePicker.Config.BorderRadius;
    btnMinutesPlus.className = MTimePicker.Config.ButtonClass;
    btnMinutesPlus.addEventListener("click", MinutePlus);
    btnMinutesPlus.addEventListener("touchstart", function(e){
      btnMinutesPlus.removeEventListener("click",MinutePlus);
      MinutePlus();      
    },true);
    timePicker.appendChild(btnMinutesPlus);  
    
    timePicker.appendChild(document.createElement("br"));

    var divInputs = document.createElement("div");
    divInputs.style.width = "175px";
    //divInputs.style.cssFloat = "left";
    divInputs.style.backgroundColor = "lightblue";
    divInputs.style.textAlign = "center";
    divInputs.style.marginLeft = "auto";
    divInputs.style.marginRight = "auto";
    divInputs.appendChild(inputHour);
        
    divInputs.appendChild(inputMinute);
    timePicker.appendChild(divInputs);

    timePicker.appendChild(document.createElement("br"));
    
    var btnHoursMinus = document.createElement("button");
    btnHoursMinus.innerHTML = "-";
    btnHoursMinus.style.width = "80px";
    btnHoursMinus.style.height = "40px";
    btnHoursMinus.style.fontSize = "22px";
    btnHoursMinus.style.borderRadius = "0px";
    btnHoursMinus.style.borderBottomLeftRadius = MTimePicker.Config.BorderRadius;
    btnHoursMinus.style.borderBottomRightRadius = MTimePicker.Config.BorderRadius;
    btnHoursMinus.className = MTimePicker.Config.ButtonClass;
    btnHoursMinus.addEventListener("click", HourMinus);
    btnHoursMinus.addEventListener("touchstart", function(e){
      btnHoursMinus.removeEventListener("click",HourMinus);
      HourMinus();      
    },true);
    timePicker.appendChild(btnHoursMinus);

    var btnMinutesMinus = document.createElement("button");
    btnMinutesMinus.innerHTML = "-";
    btnMinutesMinus.style.width = "80px";
    btnMinutesMinus.style.height = "40px";
    btnMinutesMinus.style.marginLeft = "15px";
    btnMinutesMinus.style.fontSize = "22px";
    btnMinutesMinus.style.borderRadius = "0px";
    btnMinutesMinus.style.borderBottomLeftRadius = MTimePicker.Config.BorderRadius;
    btnMinutesMinus.style.borderBottomRightRadius = MTimePicker.Config.BorderRadius;
    btnMinutesMinus.className = MTimePicker.Config.ButtonClass;
    btnMinutesMinus.addEventListener("click", MinuteMinus);
    btnMinutesMinus.addEventListener("touchstart", function(e){
      btnMinutesMinus.removeEventListener("click",MinuteMinus);
      MinuteMinus();      
    },true);
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
        var hour = formatHour(arrayTime[0]);
        var minute = formatMinute(arrayTime[1]);
        return [hour,minute];
      } else {
        return [0,0];
      }
    }
    
    // [12,50] > "12:50"
    function arrayToTime(arrayTime) {
      if(arrayTime.length == 2) {
        var hour = formatHour(arrayTime[0]);
        var minute = formatMinute(arrayTime[1]);
        return hour + ":" + minute;
      } else {
        return "0:00";
      }
    }
    
    function formatZero(number) {
      var newValue = parseInt(number, 10);
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
      hour = parseInt(hour, 10);
      if(isNaN(hour) || hour > 23) {
        hour = 0;
      } else if(hour < 0) {
        hour = 23;
      }
      return formatZero(hour);
    }
    
    function formatMinute(minute) {
      minute = parseInt(minute, 10);
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
    btnCancel.style.marginTop = "15px";
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
    btnOK.style.marginLeft = "15px";
    btnOK.style.marginTop = "15px";
    btnOK.style.width = "80px";
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
    TitleClass: "",
    BorderRadius: "5px"
  }
};

var styleFixNumberCSS = document.createElement("style");
styleFixNumberCSS.innerHTML = ".ModalDialog input[type=number]::-webkit-outer-spin-button,.ModalDialog input[type=number]::-webkit-inner-spin-button {    -webkit-appearance: none;    margin: 0;}.ModalDialog input[type=number] {   -moz-appearance:textfield;}";
document.body.appendChild(styleFixNumberCSS);