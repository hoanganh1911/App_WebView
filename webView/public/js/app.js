function getTempColor(t) { //Lấy màu của nhiệt độ để hiển thị
    if (t >= 35) {
        return '#ff5722';
    } else if (t >= 30) {
        return '#ff9800';
    } else if (t >= 25) {
        return '#ffc107';
    } else if (t >= 18) {
        return '#4caf50';
    } else if (t > 10) {
        return '#8bc34a';
    } else if (t >= 5) {
        return '#00bcd4';
    } else if (t >= -5) {
        return '#03a9f4';
    } else {
        return '#2196f3';
    }
}

function getHumColor(x) { //Lấy màu của độ ẩm  để hiển thị 
    var colors = ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#0D47A1'];
    if (x < 100)
        return colors[Math.round(x / 10)];
    else
        return colors[10];
}

document.addEventListener('DOMContentLoaded', function() {
    var humMax = 100
    var humMin = 0
    var tempMax
    var tempMin
    var modeValue
    var speedValue
    var tempGauge
    var humGauge
    var tempValue = 30
    var humValue = 70
    var timeStart
    var timeStop
    var timeBoard
    var dateObj = new Date()
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var DateNow = String(month + '/' + day + '/' + year)
    var typeAUTO
    firebase.database().ref('/DuLieuGuiXuongBoard/MODE').get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log(modeValue)
            modeValue = snapshot.val()
                // if (modeValue == 1) {
                //     document.getElementById("mode").innerHTML = "Mode: By Hand" //Với trường hợp thao tác bằng tay => Thực hiện được thanh trượt, giới hạn nhiệt độ từ -20 - 60 , độ ẩm 0-100
                //     tempGauge = createVerGauge('temp', -20, 60, ' °C')
                //     humGauge = createRadGauge('hum', 0, 100, '%')
                //     tempGauge.setVal(tempValue).setColor(getTempColor(tempValue))
                //     humGauge.setVal(humValue).setColor(getHumColor(humValue))
                //     document.getElementById("myRange").oninput = function() {
                //         writeUserSpeedData(parseInt(this.value))
                //     }
                // } else if (modeValue == 0) {
                //     document.getElementById("mode").innerHTML = "Mode: Auto"
                //     tempGauge = createVerGauge('temp', tempMin, tempMax, ' °C')
                //     humGauge = createRadGauge('hum', humMin, humMax, '%')
                //     tempGauge.setVal(tempValue).setColor(getTempColor(tempValue))
                //     humGauge.setVal(humValue).setColor(getHumColor(humValue))
                // }
        }
    })
    firebase.database().ref('/DuLieuBoard/NhietDo').get().then((snapshot) => {
        if (snapshot.exists()) {
            tempValue = snapshot.val()
        }
    })
    firebase.database().ref('/DuLieuBoard/DoAm').get().then((snapshot) => {
        if (snapshot.exists()) {
            humValue = snapshot.val()
        }
    })

    function writeUserSpeedData(value) { //Ghi trạng thái tốc độ vào server
        firebase.database().ref('/DuLieuGuiXuongBoard/SPEED').set(value);
    }
    document.getElementById("myRange").oninput = function() {
        writeUserSpeedData(parseInt(this.value))
    }
    firebase.database().ref("ThongSoBoard").on("value", (snapshot) => {
        console.log("đã đọc thông số board")
        var _data = snapshot.val();
        tempMax = _data["NhietDoMax"]
        tempMin = _data["NhietDoMin"]
        humMax = 100
        humMin = 0
        timeStart = Date.parse(DateNow + ' ' + _data["TimeStart"])
        timeStop = Date.parse(DateNow + ' ' + _data["TimeStop"])
        typeAUTO = _data["TYPE"]
    })
    firebase.database().ref("DuLieuGuiXuongBoard").on("value", (snapshot) => {
        var _data = snapshot.val();
        modeValue = _data['MODE']
        if (modeValue == 1) {
            document.getElementById("mode").innerHTML = "Mode: By Hand" //Với trường hợp thao tác bằng tay => Thực hiện được thanh trượt, giới hạn nhiệt độ từ -20 - 60 , độ ẩm 0-100

        } else if (modeValue == 0) {

            if (typeAUTO == 0) {
                document.getElementById("mode").innerHTML = "Mode: By Auto Temp"
            } else {
                document.getElementById("mode").innerHTML = "Mode: By Auto Time"
            }
        }
        speedValue = _data["SPEED"]
        var dictspeedValue = { "0": "OFF", "25": "LOW", "50": "MEDIUM", "75": "HIGH", "100": "VERY HIGH" }
        document.getElementById("speedValue").innerHTML = dictspeedValue[String(speedValue)]
        document.getElementById("myRange").value = speedValue
            // if (modeValue == 1) {
            //     tempGauge = createVerGauge('temp', -20, 60, ' °C')
            //     humGauge = createRadGauge('hum', 0, 100, '%')
            //     tempGauge.setVal(tempValue).setColor(getTempColor(tempValue))
            //     humGauge.setVal(humValue).setColor(getHumColor(humValue))
            // } else if (modeValue == 0) {
            //     tempGauge = createVerGauge('temp', tempMin, tempMax, ' °C')
            //     humGauge = createRadGauge('hum', humMin, humMax, '%')
            //     tempGauge.setVal(tempValue).setColor(getTempColor(tempValue))
            //     humGauge.setVal(humValue).setColor(getHumColor(humValue))
            // }
    })
    firebase.database().ref("DuLieuBoard").on("value", (snapshot) => {
        console.log("Dữ liệu board đc cập nhật")

        var _data = snapshot.val();
        var FloatStatus = _data['FLOAT'];
        tempValue = _data['NhietDo'];
        humValue = _data['DoAm'];
        timeBoard = Date.parse(DateNow + ' ' + _data["ThoiGian"].slice(0, 9))
        document.getElementById("thoigiantrenboard").innerHTML = _data["ThoiGian"]
        document.getElementById("swtLed").checked = 1 - Boolean(FloatStatus)

        if (FloatStatus == 1) {
            var dictspeedValue = { "0": "OFF", "25": "LOW", "50": "MEDIUM", "75": "HIGH", "100": "VERY HIGH" }
            document.getElementById("speedValue").innerHTML = dictspeedValue[String(speedValue)]
            document.getElementById("myRange").value = speedValue
        } else {
            document.getElementById("speedValue").innerHTML = "LOW"
            document.getElementById("myRange").value = 0
        }
        if (modeValue == 1) {
            tempGauge = createVerGauge('temp', -20, 60, ' °C')
            humGauge = createRadGauge('hum', 0, 100, '%')
            tempGauge.setVal(tempValue).setColor(getTempColor(tempValue))
            humGauge.setVal(humValue).setColor(getHumColor(humValue))
        } else if (modeValue == 0) {
            tempGauge = createVerGauge('temp', tempMin, tempMax, ' °C')
            humGauge = createRadGauge('hum', humMin, humMax, '%')
            tempGauge.setVal(tempValue).setColor(getTempColor(tempValue))
            humGauge.setVal(humValue).setColor(getHumColor(humValue))
            if ((tempValue < tempMin || tempValue > tempMax) && typeAUTO == 0 && FloatStatus == 1) {
                writeUserSpeedData(50)
            } else if ((tempValue > tempMin && tempValue < tempMax && typeAUTO == 0) || FloatStatus == 0) {
                writeUserSpeedData(0)
            }
            // console.log(DateNow + ' ' + _data["ThoiGian"].slice(0, 9))
            // console.log(timeBoard)
            // console.log(timeStart)
            // console.log(timeStop)
            // console.log(FloatStatus)
            // console.log(typeAUTO)
            // console.log(timeBoard > timeStart && timeBoard < timeStop && typeAUTO == 1 && FloatStatus == 1)
            // console.log(((timeBoard < timeStart || timeBoard > timeStop) && typeAUTO == 1) || FloatStatus == 0)
            if (timeBoard > timeStart && timeBoard < timeStop && typeAUTO == 1 && FloatStatus == 1) {
                writeUserSpeedData(50)
            } else if (((timeBoard < timeStart || timeBoard > timeStop) && typeAUTO == 1) || FloatStatus == 0) {
                writeUserSpeedData(0)
            }
        }

    })
})