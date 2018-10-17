"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// let kopa = new wsaction
window.onload = function () {
    var session = document.getElementById('session');
    var token = document.getElementById('token');
    var login_path = document.getElementById('login_path');
    var conm = document.getElementById('contextMenu');
    var rightClickTarger;
    conm.addEventListener('click', HideMenu);
    var currentTab;
    var composeCount = 0;
    var logout = document.getElementById('logout');
    if (logout != null) {
        logout.addEventListener('click', Logout);
    }
    var websocket_server = new WebSocket("ws://localhost:5501/");
    websocket_server.onopen = function (e) {
        websocket_server.send(JSON.stringify({
            'type': 'socket',
            'user_id': session.value,
            'token': token.value
        }));
    };
    websocket_server.onerror = function (e) {
        // Errorhandling
    };
    function Logout(e) {
        websocket_server.send(JSON.stringify({
            'type': 'logout',
            'user_id': session
        }));
        window.location.href = login_path.value;
    }
    websocket_server.onmessage = function (e) {
        var json = JSON.parse(e.data);
        switch (json.type) {
            case 'roomchat':
                console.log(json.msg);
                SendToRoomManagement(json.room_name, json.sender, json.receiver, json.msg);
                break;
            case 'roomuserlist':
                SetRoomUserList(json.room_name, json.list);
                break;
        }
    };
    function mContextMenu(e) {
        var liemele = e.currentTarget;
        var intxt = liemele.innerHTML;
        intxt = intxt.split('href="#">')[1];
        intxt = intxt.split('</a>')[0];
        rightClickTarger = intxt;
    }
    function ShowMenu(e) {
        var control = document.getElementById('contextMenu');
        var posx = e.clientX + window.pageXOffset + 'px'; //Left Position of Mouse Pointer
        var posy = e.clientY + window.pageYOffset + 'px'; //Top Position of Mouse Pointer
        var kopMnu = document.getElementById('contextMenu');
        kopMnu.style.position = 'absolute';
        kopMnu.style.display = 'inline';
        kopMnu.style.left = posx;
        kopMnu.style.top = posy;
    }
    function HideMenu(e) {
        var kopMnu = document.getElementById('contextMenu');
        kopMnu.style.display = 'none';
        var txttarget = e.target;
        RightClickAction(txttarget.innerHTML);
    }
    function RightClickAction(sttr) {
    }
    function SetRoomUserList(targetRoom, userlist) {
        var msgholder = document.querySelector('#userlist-' + targetRoom + ' ul');
        if (msgholder != null) {
            var jsonData = JSON.parse(userlist);
            for (var i = 0; i < jsonData.length; i++) {
                var username = jsonData[i];
                var ulli = document.createElement('li');
                ulli.oncontextmenu = function (e) {
                    ShowMenu(e);
                    return false;
                };
                ulli.innerHTML = "\n                    <a class=\"list-group-item\" href=\"#\">" +
                    username
                    + "</a>\n                    ";
                msgholder.appendChild(ulli);
            }
        }
    }
    function ServerRequest(type, targetName, chat_msg) {
        websocket_server.send(JSON.stringify({
            'type': 'roomchat',
            'room_name': targetName,
            'user_id': session,
            'chat_msg': chat_msg
        }));
    }
    function mtrim(myString) {
        return myString.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    function SendToRoomManagement(room, sender, receiver, msg) {
        room = mtrim(room);
        sender = mtrim(sender);
        receiver = mtrim(receiver);
        var myElem = document.querySelector('#' + room);
        if (!myElem) {
            MakeNewRoom(room, sender, receiver, msg);
            senddataToRoom(room, sender, receiver, msg);
            RoomUserList(room);
        }
        else {
            insertTextToroom(room, sender, receiver, msg);
        }
    }
    function MakeNewRoom(room, sender, receiver, msg) {
        var tco = document.querySelector('#tab-contacts-outter');
        var tabble;
        tabble = document.createElement('li');
        tabble.setAttribute('data-target', '#' + room);
        tabble.setAttribute('data-toggle', 'tab');
        var mdiv = document.createElement('div');
        mdiv.className = 'vcentered info-combo';
        var mh3 = document.createElement('h3');
        mh3.className = 'no-margin-bottom name';
        mh3.innerHTML = room;
        mdiv.appendChild(mh3);
        tabble.appendChild(mdiv);
        tabble.innerHTML = '<a href="#' + room + '"><button class="close closeTab" type="button" >×</button>' + room + '</a>';
        tco.appendChild(tabble);
        tco.appendChild(tabble);
        tco.style.display = 'block';
        registerCloseEvent();
    }
    function senddataToRoom(loadDivSelector, sender, receiver, msg) {
        insertTextToroom(loadDivSelector, sender, receiver, msg);
    }
    function insertTextToroom(loadDivSelector, sender, receiver, msg) {
        var msgholder = document.querySelector('#allmsg');
        var createdChat = document.querySelector('#' + loadDivSelector + ' .message-chat .chat-body .tab-pane');
        var divmmm;
        if (createdChat != null) {
            var divold = document.createElement('div');
            divold.innerHTML = SenderColor(sender, receiver, msg);
            createdChat.appendChild(divold);
        }
        else {
            var divtpmb = document.createElement('div');
            divtpmb.className = 'tab-pane message-body';
            divtpmb.id = loadDivSelector;
            var opmsgdiv = document.createElement('div');
            opmsgdiv.innerHTML = "\n            <div class=\"message-top\">\n                    <a class=\"btn btn btn-success new-message\"> <i class=\"fa fa-envelope\"></i> New Message </a>\n\n                    <div class=\"new-message-wrapper\">\n                        <div class=\"form-group\">\n                            <input class=\"form-control\" placeholder=\"Send message to...\" type=\"text\">\n                            <a class=\"btn btn-danger close-new-message\" href=\"#\"><i class=\"fa fa-times\"></i></a>\n                        </div>\n\n                        <div class=\"chat-footer new-message-textarea\">\n                            <textarea class=\"send-message-text\"></textarea>\n                            <label class=\"upload-file\">\n                                <input required=\"\" type=\"file\">\n                                <i class=\"fa fa-paperclip\"></i>\n                            </label>\n                            <button type=\"button\" class=\"send-message-button btn-info\"> <i class=\"fa fa-send\"></i> </button>\n                        </div>\n                    </div>\n                </div>\n            ";
            var divmc = document.createElement('div');
            divmc.className = 'message-chat';
            divmmm = document.createElement('div');
            divmmm.className = 'chat-body';
            divmmm.innerHTML = "<div class=\"tab-pane col-md-9\">"
                + SenderColor(sender, receiver, msg) + "</div>\n            \n            <div class=\"tab-pane col-md-3\">\n\n            <div class=\"list-group lg-alt\" id=\"userlist-" + loadDivSelector + "\">\n\n            <ul style=\"list-style-type:none\">\n\n            </ul>\n\n            </div>\n\n        </div>\n            ";
            var chatFooter = document.createElement('div');
            chatFooter.innerHTML = "<div class=\"chat-footer\">\n   <textarea class=\"send-message-text\" id=\"msg-btn-" + loadDivSelector + "\"></textarea>\n   <label class=\"upload-file\">\n       <input required=\"\" type=\"file\">\n       <i class=\"fa fa-paperclip\"></i>\n   </label>\n   <button type=\"button\" class=\"send-message-button btn-info\"> <i class=\"fa fa-send\"></i> </button>\n</div>";
            divmc.appendChild(divmmm);
            divmc.appendChild(chatFooter);
            divtpmb.appendChild(opmsgdiv);
            divtpmb.appendChild(divmc);
            msgholder.appendChild(divtpmb);
            var bdkey = document.getElementById('msg-btn-' + loadDivSelector);
            if (bdkey != null) {
                bdkey.addEventListener('keydown', SendTextToRoom);
            }
        }
        if (createdChat != null) {
            createdChat.scrollTop = createdChat.scrollHeight - createdChat.clientHeight;
        }
    }
    function SenderColor(sender, receiver, msg) {
        var retstring;
        if (sender == receiver) {
            retstring = '<span style="color:#FF4500;">' + sender + '</span> : <span>' + msg + "</span>";
        }
        else {
            retstring = '<span style="color:#000080;">' + sender + '</span> : <span>' + msg + "</span>";
        }
        return retstring;
    }
    function showTab(tabId) {
        var tabContent = document.querySelector('#myTab a[href="#' + tabId + '"]');
        tabContent.style.display = 'block';
    }
    function registerCloseEvent() {
        $(".closeTab").click(function () {
            //there are multiple elements which has .closeTab icon so close the tab whose close icon is clicked
            var tabContentId = $(this).parent().attr("href");
            var tlrm = $(this).parent().attr("href");
            JoinLeave(tlrm.split('#')[1]);
            $(this).parent().parent().remove(); //remove li of tab
            $('#myTab a:last').click;
            $(tabContentId).remove(); //remove respective tab content
        });
    }
    function SendTextToRoom(e) {
        if (e.keyCode == 13 && !e.shiftKey) {
            var txtData = e.target;
            var rmnm = txtData.id;
            rmnm = rmnm.split('msg-btn-')[1];
            ServerRequest('roomchat', rmnm, txtData.value);
            txtData.value = "";
        }
    }
    function deleteFirstRow(btn) {
        console.log(btn);
    }
    $("#roomlist li").on("click", function () {
        websocket_server.send(JSON.stringify({
            'type': 'roomjoin',
            'room_name': mtrim($(this).text()),
            'user_id': session
        }));
    });
    function JoinLeave(targetName) {
        websocket_server.send(JSON.stringify({
            'type': 'roomleave',
            'room_name': mtrim(targetName),
            'user_id': session
        }));
    }
    function RoomUserList(targetName) {
        websocket_server.send(JSON.stringify({
            'type': 'roomuserlist',
            'room_name': mtrim(targetName),
            'user_id': session
        }));
    }
    //Calling context menu
};
//# sourceMappingURL=custom - Copy.js.map