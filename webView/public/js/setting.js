document.addEventListener('DOMContentLoaded', function() { //Khi khởi tạo HTML thành công ko chờ các thành phần như stylesheet,images và subframes

    firebase.database().ref().on('value', (snapshot) => { // Bấm nút update => Cập nhật lên server => Nhận thấy dữ liệu thay đổi => Cập nhật vào hiển thị màn hình
        document.getElementById("mode").value = snapshot.val()['Mode']
        document.getElementById("nhietdomax").value = String(snapshot.val()['NhietDoMax'])
        document.getElementById("nhietdomin").value = String(snapshot.val()['NhietDoMin'])
    })
    document.getElementById("updateBtn").onclick = function() { // Thực hiện việc gửi lên server các thông số đã điền; khi xong hiển thị thông báo update thành công
        firebase.database().ref('Mode').set(parseInt(document.getElementById("mode").value));
        firebase.database().ref('NhietDoMax').set(parseFloat(document.getElementById("nhietdomax").value))
        firebase.database().ref('NhietDoMin').set(parseFloat(document.getElementById("nhietdomin").value));
        document.getElementById("showDone").style.display = "block"
    }
    document.getElementById("mode").addEventListener("change", function() { // Mỗi khi bấm, chạm, thay đổi thì hiển thị thông báo update sẽ mất
        document.getElementById("showDone").style.display = "none"
    })

    function showDoneFunc() {
        document.getElementById("showDone").style.display = "none"
    }
    document.getElementById("nhietdomax").addEventListener("input", showDoneFunc);
    document.getElementById("nhietdomin").addEventListener("input", showDoneFunc);

})