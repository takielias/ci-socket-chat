"use strict";
window.onload = function () {
    var currentTab;
    var composeCount = 0;
    var websocket_server = new WebSocket("ws://localhost:5501/");
    websocket_server.onopen = function (e) {
        websocket_server.send(JSON.stringify({
            'type': 'socket',
            'user_id': "buzz4rd",
            'token': "<?=$token?>"
        }));
    };
    websocket_server.onerror = function (e) {
        // Errorhandling
    };
    websocket_server.onmessage = function (e) {
        var json = JSON.parse(e.data);
        switch (json.type) {
            case 'roomchat':
                //  $('#chat_output').append(json.msg);
                SendToRoomManagement(json.room_name, json.sender, json.receiver, json.msg);
                break;
        }
    };
    function ServerRequest(type, targetName, chat_msg) {
        websocket_server.send(JSON.stringify({
            'type': 'roomchat',
            'room_name': targetName,
            'user_id': "buzz4rd",
            'chat_msg': chat_msg
        }));
    }
    function SendToRoomManagement(room, sender, receiver, msg) {
        // let myElem = <HTMLElement>document.getElementById(room);
        console.log(room);
        var myElem = document.querySelector('#myTab a[href="#' + room + '"]');
        if (!myElem) {
            MakeNewRoom(room);
            senddataToRoom(room, sender, receiver, msg);
        }
        else {
            senddataToRoom(room, sender, receiver, msg);
        }
    }
    function MakeNewRoom(room) {
        /* just for this demo */
        var mroom = room;
        var tabId = room; //this is id on tab content div where the
        var ulname = document.getElementById('myTab');
        var li = document.createElement('li');
        li.innerHTML = '<a href="#' + tabId + '"><button class="close closeTab" type="button" >×</button>' + mroom + '</a>';
        ulname.appendChild(li);
        var tabContent = document.getElementById('tab-content');
        var tabContentLi = document.createElement('div');
        tabContentLi.className = 'tab-pane';
        tabContentLi.id = tabId;
        tabContent.appendChild(tabContentLi);
        //ulname ('<li><a href="#' + tabId + '"><button class="close closeTab" type="button" >×</button>'+mroom+'</a></li>');
        // $('.tab-content').append('<div class="tab-pane" id="' + tabId + '"></div>');
        // $(this).tab('show');
        showTab(tabId);
        registerCloseEvent();
    }
    function senddataToRoom(loadDivSelector, sender, receiver, msg) {
        //let tabContent = <HTMLElement>document.querySelector('#myTab a[href="#' + loadDivSelector + '"]')
        var tabContent = document.querySelector('#' + loadDivSelector);
        var myElem = document.querySelector('#' + loadDivSelector + ' table');
        var tabble;
        if (!myElem) {
            tabble = document.createElement('table');
            tabContent.style.display = 'block';
        }
        else {
            tabble = myElem;
        }
        var tabbletr = document.createElement('tr');
        if (sender == receiver) {
            tabbletr.innerHTML = msg;
        }
        else {
            tabbletr.innerHTML = sender + " : " + msg;
        }
        tabble.appendChild(tabbletr);
        tabContent.appendChild(tabble);
        if (!myElem) {
            var inputBox = document.createElement('input');
            inputBox.id = 'sendText';
            tabContent.appendChild(inputBox);
        }
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
    var bdkey = document.getElementById('bd');
    bdkey.addEventListener('keydown', SendTextToRoom);
    function SendTextToRoom(e) {
        if (e.keyCode == 13 && !e.shiftKey) {
            ServerRequest('roomchat', 'Bangladesh', bdkey.value);
            bdkey.value = '';
        }
    }
    $("#roomlist li").on("click", function () {
        websocket_server.send(JSON.stringify({
            'type': 'roomjoin',
            'room_name': $(this).text(),
            'user_id': "buzz4rd"
        }));
    });
    function JoinLeave(targetName) {
        websocket_server.send(JSON.stringify({
            'type': 'roomleave',
            'room_name': targetName,
            'user_id': "buzz4rd"
        }));
    }
};
