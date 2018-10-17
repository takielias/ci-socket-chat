window.onload = function () {

    let currentTab;

    let composeCount = 0;

    let websocket_server = new WebSocket("ws://localhost:5501/");

    websocket_server.onopen = function (e: Event) {
        websocket_server.send(
            JSON.stringify({
                'type': 'socket',
                'user_id': "buzz4rd",
                'token': "<?=$token?>"
            })
        )
    };

    websocket_server.onerror = function (e: Event) {
        // Errorhandling
    }

    websocket_server.onmessage = function (e: MessageEvent) {
        var json = JSON.parse(e.data);

        switch (json.type) {
            case 'roomchat':
                //  $('#chat_output').append(json.msg);
            
                SendToRoomManagement(json.room_name, json.sender, json.receiver, json.msg)

                break;
        }
    }

    function ServerRequest(type: String, targetName: String, chat_msg: string) {

        websocket_server.send(
            JSON.stringify({
                'type': 'roomchat',
                'room_name': targetName,
                'user_id': "buzz4rd",
                'chat_msg': chat_msg
            })
        );

    }

    function SendToRoomManagement(room: string, sender: string, receiver: string, msg: string) {

        // let myElem = <HTMLElement>document.getElementById(room);
        
        console.log(room)

        let myElem = <HTMLElement>document.querySelector('#myTab a[href="#' + room + '"]')

        if (!myElem) {

            MakeNewRoom(room);

            senddataToRoom(room,sender,receiver,msg);
        }

        else {
            
            senddataToRoom(room,sender,receiver,msg);

        }

    }
    
    function MakeNewRoom(room: string) {
        /* just for this demo */
        let mroom = room;

        let tabId = room; //this is id on tab content div where the

        let ulname = <HTMLUListElement>document.getElementById('myTab')
       
        let li = <HTMLElement>document.createElement('li');
        li.innerHTML = '<a href="#' + tabId + '"><button class="close closeTab" type="button" >×</button>' + mroom + '</a>'
        ulname.appendChild(li)

        let tabContent = <HTMLElement>document.getElementById('tab-content')
        let tabContentLi = <HTMLElement>document.createElement('div');
        tabContentLi.className = 'tab-pane'
        tabContentLi.id = tabId
        tabContent.appendChild(tabContentLi)

        //ulname ('<li><a href="#' + tabId + '"><button class="close closeTab" type="button" >×</button>'+mroom+'</a></li>');

        // $('.tab-content').append('<div class="tab-pane" id="' + tabId + '"></div>');

        // $(this).tab('show');

        showTab(tabId);

        registerCloseEvent();
    }

    function senddataToRoom(loadDivSelector: string,sender:string,receiver:string,msg:string) {

        //let tabContent = <HTMLElement>document.querySelector('#myTab a[href="#' + loadDivSelector + '"]')

        let tabContent = <HTMLElement>document.querySelector('#' + loadDivSelector)

        let myElem = <HTMLElement>document.querySelector('#' + loadDivSelector + ' table')

        let tabble:HTMLElement ;

        if (!myElem) {

            tabble = <HTMLElement>document.createElement('table');

            tabContent.style.display = 'block'
        }
        else {

            tabble = myElem;
        }

        let tabbletr = <HTMLElement>document.createElement('tr');

        if(sender==receiver) {
            tabbletr.innerHTML = msg
        }
        else {
            tabbletr.innerHTML = sender + " : " + msg
        }

        tabble.appendChild(tabbletr)

        tabContent.appendChild(tabble)

        if (!myElem) {
            
        let inputBox = <HTMLElement>document.createElement('input');

        inputBox.id = 'sendText'

        tabContent.appendChild(inputBox)

        }
    }

    function showTab(tabId: string) {
        let tabContent = <HTMLElement>document.querySelector('#myTab a[href="#' + tabId + '"]')
        tabContent.style.display = 'block'
    }

    function registerCloseEvent() {

        $(".closeTab").click(function () {
            //there are multiple elements which has .closeTab icon so close the tab whose close icon is clicked
            let tabContentId:any = $(this).parent().attr("href");

            let tlrm:any= $(this).parent().attr("href");

            JoinLeave(tlrm.split('#')[1])

            $(this).parent().parent().remove(); //remove li of tab
            $('#myTab a:last').click
            $(tabContentId).remove(); //remove respective tab content
        });
    }

    let bdkey = <HTMLInputElement>document.getElementById('bd')

    bdkey.addEventListener('keydown', SendTextToRoom)

    function SendTextToRoom(e: KeyboardEvent) {

        if (e.keyCode == 13 && !e.shiftKey) {
            ServerRequest('roomchat', 'Bangladesh', bdkey.value)
            bdkey.value = ''
        }
    }

    $("#roomlist li").on("click", function () {
        websocket_server.send(
            JSON.stringify({
                'type': 'roomjoin',
                'room_name': $(this).text(),
                'user_id': "buzz4rd"
            })
        );

    });

    function JoinLeave(targetName: String) {

        websocket_server.send(
            JSON.stringify({
                'type': 'roomleave',
                'room_name': targetName,
                'user_id': "buzz4rd"
            })
        );

    }

}