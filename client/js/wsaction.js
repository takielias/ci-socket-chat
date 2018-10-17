"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wsaction = /** @class */ (function () {
    function wsaction(websocket_server, session, token) {
        var _this = this;
        var mthis = this;
        this.ctab = 1;
        var rml = document.getElementById('rmldiv');
        rml.addEventListener("click", function (e) {
            mthis.Setctab(1);
        });
        var status = document.getElementById('totalroommsg');
        status.addEventListener("click", function (e) {
            mthis.Setctab(2);
        });
        this.ws = websocket_server;
        this.session = session;
        this.token = token;
        this.connm = document.getElementById('contextMenu');
        this.connm.addEventListener('click', function (e) {
            var mthis = _this;
            var kopMnu = document.getElementById('contextMenu');
            kopMnu.style.display = 'none';
            var txttarget = e.target;
            if (txttarget.innerHTML == "Kick") {
                var target = mthis.GetLocalStorageValue('actionTarget');
                var roomName = mthis.GetLocalStorageValue('currentRoomName');
                mthis.KickUser(roomName, target);
            }
        });
        this.ws.onopen = function (e) {
            mthis.ws.send(JSON.stringify({
                'type': 'socket',
                'user_id': session,
                'token': token
            }));
        };
        this.ws.onerror = function (e) {
            // Errorhandling
        };
        this.ws.onmessage = function (e) {
            var json = JSON.parse(e.data);
            switch (json.type) {
                case 'roomchat':
                    console.log(json.msg);
                    mthis.SendToRoomManagement(json.room_name, json.sender, json.receiver, json.msg);
                    break;
                case 'roomuserlist':
                    mthis.SetRoomUserList(json.room_name, json.list);
                    break;
            }
        };
    }
    wsaction.prototype.GetLocalStorageValue = function (key) {
        var retval = window.localStorage.getItem(key);
        if (retval === null) {
            return "";
        }
        else {
            return retval;
        }
    };
    wsaction.prototype.Setctab = function (val) {
        this.ctab = val;
    };
    wsaction.prototype.SetRoomUserList = function (targetRoom, userlist) {
        var mthis = this;
        var msgholder = document.querySelector('#userlist-' + targetRoom + ' ul');
        if (msgholder != null) {
            var jsonData = JSON.parse(userlist);
            for (var i = 0; i < jsonData.length; i++) {
                var username = jsonData[i];
                var ulli = document.createElement('li');
                ulli.oncontextmenu = function (e) {
                    mthis.ShowMenu(e);
                    return false;
                };
                ulli.innerHTML = "\n                    <a class=\"list-group-item\" href=\"#\">" +
                    username
                    + "</a>\n                    ";
                msgholder.appendChild(ulli);
            }
        }
    };
    wsaction.prototype.ShowMenu = function (e) {
        var control = document.getElementById('contextMenu');
        var posx = e.clientX + window.pageXOffset + 'px'; //Left Position of Mouse Pointer
        var posy = e.clientY + window.pageYOffset + 'px'; //Top Position of Mouse Pointer
        var kopMnu = document.getElementById('contextMenu');
        kopMnu.style.position = 'absolute';
        kopMnu.style.display = 'inline';
        kopMnu.style.left = posx;
        kopMnu.style.top = posy;
        var liemele = e.target;
        var intxt = liemele.innerHTML;
        window.localStorage.setItem('actionTarget', intxt);
        var roomname = liemele.parentElement.parentElement.parentElement;
        var roomnameid = roomname.id;
        window.localStorage.setItem('currentRoomName', roomnameid.split('userlist-')[1]);
    };
    wsaction.prototype.SetTempVar = function (str) {
        var tempvar = document.getElementById('tempvar');
        tempvar.value = str;
    };
    wsaction.prototype.mtrim = function (myString) {
        return myString.replace(/^\s+/, '').replace(/\s+$/, '');
    };
    wsaction.prototype.SendToRoomManagement = function (room, sender, receiver, msg) {
        room = this.mtrim(room);
        sender = this.mtrim(sender);
        receiver = this.mtrim(receiver);
        var myElem = document.querySelector('#' + room);
        if (!myElem) {
            this.MakeNewRoom(room, sender, receiver, msg);
            this.senddataToRoom(room, sender, receiver, msg);
            this.RoomUserList(room);
        }
        else {
            this.insertTextToroom(room, sender, receiver, msg);
        }
    };
    wsaction.prototype.RoomUserList = function (targetName) {
        this.ws.send(JSON.stringify({
            'type': 'roomuserlist',
            'room_name': targetName,
            'user_id': this.session
        }));
    };
    wsaction.prototype.KickUser = function (room, targetName) {
        this.ws.send(JSON.stringify({
            'type': 'kick',
            'room_name': room,
            'target_name': targetName,
            'user_id': this.session
        }));
    };
    wsaction.prototype.MakeNewRoom = function (room, sender, receiver, msg) {
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
        tabble.innerHTML = '<a id ="resetcount-' + room + '" href="#' + room + '"><button class="close closeTab" type="button" >×</button>' + room + '</a> <span style = "visibility:hidden;" class="button" id ="txtcount-' + room + '" >0</span>';
        tco.appendChild(tabble);
        tco.appendChild(tabble);
        tco.style.display = 'block';
        this.registerCloseEvent();
        var roomTxtCountReset = document.getElementById('resetcount-' + room);
        roomTxtCountReset.addEventListener('click', function (e) {
            var roomTxtCount = document.getElementById('txtcount-' + room);
            roomTxtCount.innerHTML = "0";
            roomTxtCount.style.visibility = 'hidden';
        });
    };
    wsaction.prototype.senddataToRoom = function (loadDivSelector, sender, receiver, msg) {
        this.insertTextToroom(loadDivSelector, sender, receiver, msg);
    };
    wsaction.prototype.insertTextToroom = function (loadDivSelector, sender, receiver, msg) {
        var _this = this;
        var mthis = this;
        var msgholder = document.querySelector('#allmsg');
        var createdChat = document.querySelector('#' + loadDivSelector + ' .message-chat .chat-body .tab-pane');
        var divmmm;
        if (createdChat != null) {
            var divold = document.createElement('div');
            divold.innerHTML = this.SenderColor(sender, receiver, msg);
            createdChat.appendChild(divold);
            var roomTxtCount = document.getElementById('txtcount-' + loadDivSelector);
            roomTxtCount.style.visibility = 'visible';
            var cval = parseInt(roomTxtCount.innerHTML) + 1;
            roomTxtCount.innerHTML = cval.toString();
            console.log(mthis.ctab);
            if (mthis.ctab == 1) {
                var allcount = document.getElementById('ttcount');
                var strVal = parseInt(allcount.innerHTML) + 1;
                allcount.innerHTML = strVal.toString();
                allcount.style.visibility = 'visible';
            }
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
                + this.SenderColor(sender, receiver, msg) + "</div>\n            \n            <div class=\"tab-pane col-md-3\">\n\n            <div class=\"list-group lg-alt\" id=\"userlist-" + loadDivSelector + "\">\n\n            <ul style=\"list-style-type:none\">\n\n            </ul>\n\n            </div>\n\n        </div>\n            ";
            var chatFooter = document.createElement('div');
            chatFooter.innerHTML = "<div class=\"chat-footer\">\n       <textarea class=\"send-message-text\" id=\"msg-btn-" + loadDivSelector + "\"></textarea>\n       <label class=\"upload-file\">\n       <input required=\"\" type=\"file\">\n       <i class=\"fa fa-paperclip\"></i>\n       </label>\n       <button type=\"button\" class=\"send-message-button btn-info\"> <i class=\"fa fa-send\"></i> </button>\n       </div>";
            divmc.appendChild(divmmm);
            divmc.appendChild(chatFooter);
            divtpmb.appendChild(opmsgdiv);
            divtpmb.appendChild(divmc);
            msgholder.appendChild(divtpmb);
            var bdkey = document.getElementById('msg-btn-' + loadDivSelector);
            if (bdkey != null) {
                bdkey.addEventListener('keydown', function (e) {
                    if (e.keyCode == 13 && !e.shiftKey) {
                        var txtData = e.target;
                        var rmnm = txtData.id;
                        rmnm = rmnm.split('msg-btn-')[1];
                        _this.ServerRequest('roomchat', rmnm, txtData.value);
                        console.log(txtData.value);
                        console.log(rmnm);
                        txtData.value = "";
                    }
                });
            }
        }
        if (createdChat != null) {
            createdChat.scrollTop = createdChat.scrollHeight - createdChat.clientHeight;
        }
    };
    wsaction.prototype.SendTextToRoom = function (e) {
        if (e.keyCode == 13 && !e.shiftKey) {
            var txtData = e.target;
            var rmnm = txtData.id;
            rmnm = rmnm.split('msg-btn-')[1];
            this.ServerRequest('roomchat', rmnm, txtData.value);
            // console.log(txtData.value)
            // console.log(rmnm)
            txtData.value = "";
        }
    };
    wsaction.prototype.ServerRequest = function (type, targetName, chat_msg) {
        this.ws.send(JSON.stringify({
            'type': 'roomchat',
            'room_name': targetName,
            'user_id': this.session,
            'chat_msg': chat_msg
        }));
    };
    wsaction.prototype.SenderColor = function (sender, receiver, msg) {
        var retstring;
        if (sender == receiver) {
            retstring = '<span style="color:#FF4500;">' + sender + '</span> : <span>' + msg + "</span>";
        }
        else {
            retstring = '<span style="color:#000080;">' + sender + '</span> : <span>' + msg + "</span>";
        }
        return retstring;
    };
    wsaction.prototype.showTab = function (tabId) {
        var tabContent = document.querySelector('#myTab a[href="#' + tabId + '"]');
        tabContent.style.display = 'block';
    };
    wsaction.prototype.registerCloseEvent = function () {
        var mthis = this;
        $(".closeTab").click(function () {
            //there are multiple elements which has .closeTab icon so close the tab whose close icon is clicked
            var tabContentId = $(this).parent().attr("href");
            var tlrm = $(this).parent().attr("href");
            mthis.JoinLeave(tlrm.split('#')[1]);
            $(this).parent().parent().remove(); //remove li of tab
            $('#myTab a:last').click;
            $(tabContentId).remove(); //remove respective tab content
        });
    };
    wsaction.prototype.JoinLeave = function (targetName) {
        this.ws.send(JSON.stringify({
            'type': 'roomleave',
            'room_name': targetName,
            'user_id': this.session
        }));
    };
    wsaction.prototype.JoinJoin = function (targetName) {
        this.ws.send(JSON.stringify({
            'type': 'roomjoin',
            'room_name': targetName,
            'user_id': this.session
        }));
    };
    wsaction.prototype.Logout = function (e) {
        this.ws.send(JSON.stringify({
            'type': 'logout',
            'user_id': this.session
        }));
        // window.location.href = login_path.value;
    };
    return wsaction;
}());
exports.wsaction = wsaction;
//# sourceMappingURL=wsaction.js.map