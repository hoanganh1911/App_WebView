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

    firebase.database().ref("Mode").on('value', (snapshot) => { //Set chức năng ko thao tác được khi ở chế độ auto
        if (snapshot.exists()) {
            if (snapshot.val() == 1) {
                document.body.innerHTML += '<div id= "overlay" style="bottom: 0;left: 0;position: fixed;right: 0;top: 0;"></div>'
            }
            if (snapshot.val() == 0) {
                var element = document.getElementById('overlay');
                if (typeof(element) != 'undefined' && element != null) { element.remove() }
            }
        } else {
            console.log("No data available");
        }
    });

    firebase.database().ref().on('value', (snapshot) => { //Lấy dữ liệu realtime và xử lý
        var _data = snapshot.val();
        var ledStatus = _data['ledStatus'];
        var tempValue = _data['NhietDo'];
        var humValue = _data['DoAm'];
        var speedValue = _data['Speed'];
        var modeValue = _data['Mode'];
        var humMax = _data['DoAmMax']
        var humMin = _data['DoAmMin']
        var tempMax = _data['NhietDoMax']
        var tempMin = _data['NhietDoMin']
        var dictspeedValue = { "0": "OFF", "25": "LOW", "50": "MEDIUM", "75": "HIGH", "100": "VERY HIGH" }

        // Phần này tạo sự liên kết giữa các máy ( Khi máy này thay đổi thì máy kia cũng đổi)
        // Cùng với đó cập nhật trạng thái lên các switch or slider
        document.getElementById("speedValue").innerHTML = dictspeedValue[String(speedValue)]
        document.getElementById("myRange").value = speedValue
        document.getElementById("swtLed").checked = Boolean(ledStatus)
        if (modeValue == 1) // Với hai trạng thái mode nên có if else
            document.getElementById("mode").innerHTML = "Mode: Auto"
        else if (modeValue == 0)
            document.getElementById("mode").innerHTML = "Mode: By Hand"

        function writeUserSpeedData(value) { //Ghi trạng thái tốc độ vào server
            firebase.database().ref('Speed').set(value);
        }
        if (ledStatus == 1) {
            firebase.database().ref('Speed').set(0);
        } else {
            document.getElementById("myRange").oninput = function() {
                console.log("Da truot")
                writeUserSpeedData(parseInt(this.value))
            };
        }
        if (modeValue == 0) { //Với trường hợp thao tác bằng tay => Thực hiện được thanh trượt, giới hạn nhiệt độ từ -20 - 60 , độ ẩm 0-100
            var tempGauge = createVerGauge('temp', -20, 60, ' °C')
            var humGauge = createRadGauge('hum', 0, 100, '%')
            document.getElementById("myRange").oninput = function() {
                console.log("Da truot")
                writeUserSpeedData(parseInt(this.value))
            };
        } else if (modeValue == 1) { //Với trường hợp thao tác tự động => Thực hiện theo giới hạn nhiệt độ được xét
            var tempGauge = createVerGauge('temp', tempMin, tempMax, ' °C');
            var humGauge = createRadGauge('hum', humMin, humMax, '%');
            if (tempValue < tempMin || tempValue > tempMax) {
                writeUserSpeedData(50)
            } else {
                writeUserSpeedData(0)
            }
        }
        tempGauge.setVal(tempValue).setColor(getTempColor(tempValue));
        humGauge.setVal(humValue).setColor(getHumColor(humValue));
    })
})