document.addEventListener('DOMContentLoaded', function() { //Khi khởi tạo HTML thành công ko chờ các thành phần như stylesheet,images và subframes

    firebase.database().ref('ThongSoBoard').get().then((snapshot) => { // Bấm nút update => Cập nhật lên server => Nhận thấy dữ liệu thay đổi => Cập nhật vào hiển thị màn hình
        document.getElementById("nhietdomax").value = String(snapshot.val()['NhietDoMax'])
        document.getElementById("nhietdomin").value = String(snapshot.val()['NhietDoMin'])
        document.getElementById("caidatthoigianbatdau").value = String(snapshot.val()['TimeStart'])
        document.getElementById("caidatthoigianketthuc").value = String(snapshot.val()['TimeStop'])
        document.getElementById("mode_select").value = String(1 - snapshot.val()['TYPE'])
    })
    firebase.database().ref("DuLieuGuiXuongBoard").on('value', (snapshot) => {
        document.getElementById("mode").value = snapshot.val()['MODE']
    })
    document.getElementById("updateBtn").onclick = function() {
        firebase.database().ref('/ThongSoBoard/TYPE').set(1 - parseInt(document.getElementById("mode_select").value))
        firebase.database().ref('/DuLieuGuiXuongBoard/MODE').set(parseInt(document.getElementById("mode").value))
        if (document.getElementById("mode").value == 0) {
            if (document.getElementById("mode_select").value == 0) {
                console.log(document.getElementById("caidatthoigianbatdau").value)
                console.log(document.getElementById("caidatthoigianketthuc").value)
                firebase.database().ref('/ThongSoBoard/TimeStart').set(document.getElementById("caidatthoigianbatdau").value)
                firebase.database().ref('/ThongSoBoard/TimeStop').set(document.getElementById("caidatthoigianketthuc").value)
            } else {
                firebase.database().ref('/ThongSoBoard/NhietDoMax').set(parseFloat(document.getElementById("nhietdomax").value))
                firebase.database().ref('/ThongSoBoard/NhietDoMin').set(parseFloat(document.getElementById("nhietdomin").value));
            }
        }
        document.getElementById("showDone").style.display = "block"
        firebase.database().ref('/DuLieuGuiXuongBoard/StateDown').set(1)
        if (document.getElementById("mode").value == 0) {
            firebase.database().ref('/DuLieuGuiXuongBoard/MODE').set(0);
        } else if (document.getElementById("mode").value == 1) {
            firebase.database().ref('/DuLieuGuiXuongBoard/MODE').set(1);
        }
        document.getElementById("showDone").innerHTML = "Đang xử lý ...(10s)"
    }
    firebase.database().ref('/DuLieuBoard/Statesuccess').on('value', (snapshot) => {
        if (snapshot.val() == 1) {
            firebase.database().ref('/DuLieuGuiXuongBoard/StateDown').set(0)
            document.getElementById("showDone").innerHTML = "Cập nhật thành công ..."
        }
    })

    function showDoneFunc() {
        document.getElementById("showDone").style.display = "none"
    }
    document.getElementById("mode").addEventListener("change", showDoneFunc)
    document.getElementById("nhietdomax").addEventListener("input", showDoneFunc);
    document.getElementById("nhietdomin").addEventListener("input", showDoneFunc);

})