document.addEventListener('DOMContentLoaded', function() {
    firebase.database().ref().on('value', (snapshot) => {
        document.getElementById("mode").value = snapshot.val()['Mode']
        document.getElementById("nhietdomax").value = String(snapshot.val()['NhietDoMax'])
        document.getElementById("nhietdomin").value = String(snapshot.val()['NhietDoMin'])
    })
    document.getElementById("updateBtn").onclick = function() {
        firebase.database().ref('Mode').set(parseInt(document.getElementById("mode").value));
        firebase.database().ref('NhietDoMax').set(parseFloat(document.getElementById("nhietdomax").value))
        firebase.database().ref('NhietDoMin').set(parseFloat(document.getElementById("nhietdomin").value));
        alert("Update done !! ");
    }
})