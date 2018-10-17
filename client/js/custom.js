"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wsaction_1 = require("./wsaction");
window.onload = function () {
    var session = document.getElementById('session');
    var token = document.getElementById('token');
    var login_path = document.getElementById('login_path');
    // let rightClickTarger: string;
    var currentTab;
    var composeCount = 0;
    var logout = document.getElementById('logout');
    if (logout != null) {
        // logout.addEventListener('click', Logout)
    }
    var websocket_server = new WebSocket("ws://localhost:5501/Chilro/");
    var mobj = new wsaction_1.wsaction(websocket_server, session.value, token.value);
    function mContextMenu(e) {
        var liemele = e.currentTarget;
        var intxt = liemele.innerHTML;
        intxt = intxt.split('href="#">')[1];
        intxt = intxt.split('</a>')[0];
        // rightClickTarger = intxt
    }
    function mtrim(myString) {
        return myString.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    $("#roomlist li").on("click", function () {
        mobj.JoinJoin(mtrim($(this).text()));
        console.log(mtrim($(this).text()));
    });
    var roomTxtCountReset = document.getElementById('totalroommsg');
    roomTxtCountReset.addEventListener('click', function (e) {
        var pps = document.getElementById('ttcount');
        pps.innerHTML = "0";
        pps.style.visibility = 'hidden';
    });
};
//# sourceMappingURL=custom.js.map