/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./custom.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./custom.ts":
/*!*******************!*\
  !*** ./custom.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var wsaction_1 = __webpack_require__(/*! ./wsaction */ "./wsaction.ts");
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
    var siteUrl = "localhost/cisocket/server";
    var wsUrl = "localhost";
    // let siteUrl = "chilro.com";
    // let wsUrl = "chilro.com"; 
    var websocket_server = new WebSocket("ws://" + wsUrl + ":8282/");
    var mobj = new wsaction_1.wsaction(websocket_server, siteUrl, session.value, token.value);
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
        // console.log(mtrim($(this).text()))
    });
    var roomTxtCountReset = document.getElementById('totalroommsg');
    roomTxtCountReset.addEventListener('click', function (e) {
        var pps = document.getElementById('ttcount');
        pps.innerHTML = "0";
        pps.style.visibility = 'hidden';
    });
};


/***/ }),

/***/ "./wsaction.ts":
/*!*********************!*\
  !*** ./wsaction.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var wsaction = /** @class */ (function () {
    function wsaction(websocket_server, _siteUrl, session, token) {
        this.siteUrl = "http://" + _siteUrl + "/";
        var mthis = this;
        this.ctab = 1;
        this.currentRoom = "";
        this.currentAction = "";
        var rml = document.getElementById('rmldiv');
        rml.addEventListener("click", function (e) {
            mthis.Setctab(1);
        });
        var clogout = document.getElementById('clogout');
        clogout.addEventListener("click", function (e) {
            mthis.Logout(e);
        });
        var status = document.getElementById('totalroommsg');
        status.addEventListener("click", function (e) {
            mthis.Setctab(2);
        });
        this.ws = websocket_server;
        this.session = session;
        this.token = token;
        this.audioNote = new Audio(this.siteUrl + 'asset/sound/notification_6.mp3');
        this.connm = document.getElementById('contextMenu');
        console.log(token);
        // this.connm.addEventListener('click taphold', (e) => {
        // 	let mthis = this
        // 	let kopMnu = < HTMLElement > document.getElementById('contextMenu');
        // 	kopMnu.style.display = 'none';
        // 	let txttarget: any = e.target
        //     //  console.log(txttarget.innerHTML)
        // 	if (txttarget.innerHTML == "Kick") {
        // 		let target = mthis.GetLocalStorageValue('actionTarget')
        // 		let roomName = mthis.GetLocalStorageValue('currentRoomName')
        // 		mthis.KickUser(roomName, target)
        // 	} else if (txttarget.innerHTML == "Refresh") {
        // 		let roomName = mthis.GetLocalStorageValue('currentRoomName')
        // 		console.log(roomName)
        // 		mthis.RoomUserList(roomName);
        // 	}
        // })
        this.ws.onopen = function (e) {
            mthis.ws.send(JSON.stringify({
                'type': 'socket',
                'user_id': session,
                'token': token
            }));
        };
        this.ws.onerror = function (e) {
            alert("You are not connected to the Server. Please try Again Later.");
        };
        this.ws.onmessage = function (e) {
            var json = JSON.parse(e.data);
            switch (json.type) {
                case 'roomchat':
                    console.log(json.msg);
                    mthis.SendToRoomManagement(json.room_name, json.sender, json.receiver, json.power, json.msg);
                    break;
                case 'roomuserlist':
                    mthis.SetRoomUserList(json.room_name, json.list);
                    break;
                case 'error':
                    // console.log(json.msg)
                    alert(json.msg);
                    break;
                case 'alive':
                    mthis.Alive();
                    break;
            }
        };
    }
    wsaction.prototype.playSound = function () {
        this.audioNote.play();
    };
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
            var listLength = msgholder.children.length;
            for (var i = 0; i < listLength; i++) {
                msgholder.removeChild(msgholder.children[0]);
            }
            var jsonData = JSON.parse(userlist);
            for (var i = 0; i < jsonData.length; i++) {
                var username = jsonData[i];
                var ulli = document.createElement('a');
                // ulli.addEventListener('click', (e) => {
                // 	console.log('kop')
                // 	return false
                // })
                ulli.setAttribute("href", "#");
                ulli.setAttribute("class", "mnuclick");
                ulli.innerHTML = username;
                msgholder.appendChild(ulli);
            }
        }
        this.clickUser();
    };
    wsaction.prototype.ulistListner = function () {
        $('.ulli').on('click touchstart', function () {
            var mthis = this;
            // 'console.log('kop')
        });
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
        control.style.zIndex = "-1";
        var liemele = e.target;
        var intxt = liemele.innerHTML;
        window.localStorage.setItem('actionTarget', intxt);
        var roomname = liemele.parentElement.parentElement.parentElement;
        var roomnameid = roomname.id;
        window.localStorage.setItem('currentRoomName', roomnameid.split('closenav-')[1]);
    };
    wsaction.prototype.SetTempVar = function (str) {
        var tempvar = document.getElementById('tempvar');
        tempvar.value = str;
    };
    wsaction.prototype.mtrim = function (myString) {
        return myString.replace(/^\s+/, '').replace(/\s+$/, '');
    };
    wsaction.prototype.SendToRoomManagement = function (room, sender, receiver, power, msg) {
        room = this.mtrim(room);
        sender = this.mtrim(sender);
        receiver = this.mtrim(receiver);
        var myElem = document.querySelector('#' + room);
        if (!myElem) {
            this.MakeNewRoom(room, sender, receiver, msg);
            this.senddataToRoom(room, sender, receiver, power, msg);
            this.RoomUserList(room);
            this.roomTxtSendBtn();
        }
        else {
            this.insertTextToroom(room, sender, receiver, power, msg);
        }
        if (sender != this.session) {
            this.playSound();
        }
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
        tabble.innerHTML = '<a class = "resetclass" id ="resetcount-' + room + '" href="#' + room + '"><button class="close closeTab" type="button" >×</button>' + room + '</a> <a style = "visibility:hidden;" id ="txtcount-' + room + '" >0</a>';
        tco.appendChild(tabble);
        tco.appendChild(tabble);
        tco.style.display = 'block';
        var roomTxtCountReset = document.getElementById('resetcount-' + room);
        // roomTxtCountReset.addEventListener('click', this.resetRoomTxtCount)
        // roomTxtCountReset.addEventListener('change', function () {
        // 	this.resetRoomTxtCount.call(room);
        // }, false);
        // roomTxtCountReset.addEventListener('click', (e) => {
        // 	let rstc: any = e.target
        // 	let roomname:string = rstc.id.split('-')[1]
        // 	let roomTxtCount:HTMLAnchorElement = < HTMLAnchorElement > document.getElementById('txtcount-' + room)
        // 	roomTxtCount.innerHTML = "0"
        // 	roomTxtCount.style.visibility = 'hidden'
        // })
        this.registerCloseEvent();
        this.resetRoomTxtCountEvent();
    };
    //  resetRoomTxtCount(e: Event) {
    // 	let rstc: any = e.target
    // 	let roomname:string = rstc.id.split('-')[1]
    // 	let roomTxtCount:HTMLAnchorElement = < HTMLAnchorElement > document.getElementById('txtcount-' + roomname)
    // 	roomTxtCount.innerHTML = "0"
    // 	roomTxtCount.style.visibility = 'hidden'
    // }
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
    wsaction.prototype.resetRoomTxtCountEvent = function () {
        var mthis = this;
        $(".resetclass").click(function () {
            var tabContentId = $(this).attr("href");
            var resettxtid = tabContentId.split('#')[1];
            $('#txtcount-' + resettxtid).text(0);
            $('#txtcount-' + resettxtid).css("visibility", "hidden");
        });
    };
    wsaction.prototype.senddataToRoom = function (loadDivSelector, sender, receiver, power, msg) {
        this.insertTextToroom(loadDivSelector, sender, receiver, power, msg);
    };
    wsaction.prototype.insertTextToroom = function (loadDivSelector, sender, receiver, power, msg) {
        var mthis = this;
        var msgholder = document.querySelector('#allmsg');
        var createdChat = document.querySelector('#' + loadDivSelector + ' .message-chat .chat-body .tab-pane');
        var divmmm;
        if (createdChat != null) {
            var divold = document.createElement('div');
            divold.innerHTML = this.SenderColor(sender, receiver, power, msg);
            createdChat.appendChild(divold);
            var roomTxtCount = document.getElementById('txtcount-' + loadDivSelector);
            roomTxtCount.style.visibility = 'visible';
            var cval = parseInt(roomTxtCount.innerHTML) + 1;
            roomTxtCount.innerHTML = cval.toString();
            // console.log(mthis.ctab)
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
            opmsgdiv.innerHTML = "\n            <div class=\"message-top\">\n                    <a id=\"opennav-" + loadDivSelector + "\" style=\"font-size:30px;cursor:pointer\" class=\"btn btn btn-success opennav\"> &#9776; " + loadDivSelector + " </a>\n\n                    <div class=\"new-message-wrapper\">\n                        <div class=\"form-group\">\n                            <input class=\"form-control\" placeholder=\"Send message to...\" type=\"text\">\n                            <a class=\"btn btn-danger close-new-message\" href=\"#\"><i class=\"fa fa-times\"></i></a>\n                        </div>\n\n\t\t\t\t\t\t<div class=\"col-md-8 chat-footer new-message-textarea\">\n\t\t\t\t\t\t\t<textarea class = \"send-message-text\"></textarea>\n                            <button type=\"button\" id=\"msg-send-btn-" + loadDivSelector + "\" class=\"send-message-button\"> <i class=\"fa fa-send\"></i> </button>\n                        </div>\n                    </div>\n                </div>\n            ";
            var divmc = document.createElement('div');
            divmc.className = 'message-chat';
            divmmm = document.createElement('div');
            divmmm.className = 'chat-body';
            divmmm.innerHTML = "<div class=\"tab-pane col-md-9\">" +
                this.SenderColor(sender, receiver, power, msg) + "</div>\n            \n            <div class=\"tab-pane col-md-3\">\n\n\n\t\t\t<div class=\"sidenav\" id=\"closenav-" + loadDivSelector + "\">\n\t\t\t<a href=\"javascript:void(0)\" class=\"closenav\">&times;</a>\n\n\t\t\t<a href=\"#\" class=\"mnli\">Kick</a>\n\n\t\t    </div>\t\t\t\n\n\n            <div class=\"list-group lg-alt\" id=\"userlist-" + loadDivSelector + "\">\n\n\t\t\t<div class=\"usernav\" id=\"userclosenav-" + loadDivSelector + "\">\n\t\t\t\n\t\t\t<a href=\"javascript:void(0)\" class=\"closenav\">&times;</a>\n\n            <ul style=\"list-style-type:none\">\n\n            </ul>\n\n\t\t    </div>\n\n\t\t\t</div>\n\n\n            </div>\n\t\t\t";
            var chatFooter = document.createElement('div');
            chatFooter.innerHTML = "<div class=\"col-md-8 chat-footer\">\n\t   <textarea class = \"send-message-text\" id=\"msg-btn-" + loadDivSelector + "\"></textarea>\n       <button type=\"button\" id=\"msg-send-btn-" + loadDivSelector + "\" class=\"send-message-button btn btn-info\"> <i class=\"fa fa-send\"></i> </button>\n\t   </div>\n\t   ";
            divmc.appendChild(divmmm);
            divmc.appendChild(chatFooter);
            divtpmb.appendChild(opmsgdiv);
            divtpmb.appendChild(divmc);
            msgholder.appendChild(divtpmb);
            var bdkey = document.getElementById('msg-btn-' + loadDivSelector);
            var msgSendButton = document.getElementById('msg-send-btn-' + loadDivSelector);
            // if (bdkey != null) {
            // 	bdkey.addEventListener('keydown', (e) => {
            // 		if (e.keyCode == 13 && !e.shiftKey) {
            // 			let txtData: any = e.target
            // 			let rmnm: string = txtData.id
            // 			rmnm = rmnm.split('msg-btn-')[1]
            // 			this.ServerRequest('roomchat', rmnm, txtData.value)
            // 			// console.log(txtData.value)
            // 			// console.log(rmnm)
            // 			txtData.value = ""
            // 			let el = $(".send-message-text").emojioneArea();
            // 			el[0].emojioneArea.setText('')
            // 		}
            // 	})
            // }
            // if ("ontouchstart" in window || navigator.msMaxTouchPoints) {
            // 	['ontouchstart'].forEach(evt =>
            // 		msgSendButton.addEventListener(evt, (e) => {
            // 			let txtData: any = e.target
            // 			let rmnm: string = txtData.id
            // 			rmnm = rmnm.split('msg-send-btn-')[1]
            // 			this.ServerRequest('roomchat', rmnm, bdkey.value)
            // 			console.log(txtData.value)
            // 			console.log(rmnm)
            // 			bdkey.value = ""
            // 		}, false)
            // 	);
            // } else {
            // 	['click'].forEach(evt =>
            // 		msgSendButton.addEventListener(evt, (e) => {
            // 			let txtData: any = e.target
            // 			let rmnm: string = txtData.id
            // 			rmnm = rmnm.split('msg-send-btn-')[1]
            // 			this.ServerRequest('roomchat', rmnm, bdkey.value)
            // 			console.log(txtData.value)
            // 			console.log(rmnm)
            // 			bdkey.value = ""
            // 		}, false)
            // 	);
            // }
        }
        if (createdChat != null) {
            createdChat.scrollTop = createdChat.scrollHeight - createdChat.clientHeight;
        }
        this.openNav();
        this.closeNav();
        this.userNav();
        this.sendTxtjq(loadDivSelector);
    };
    wsaction.prototype.sendTxtjq = function (id) {
        var mthis = this;
        $(document).ready(function () {
            // $("#msg-btn-" + id).emojioneArea({
            // 	emojiPlaceholder: ":smile_cat:",
            // 	hidePickerOnBlur: false,
            // 	events: {
            // 		keypress: function (editor: any, event: any) {
            // 			console.log('event:keypress', event.which);
            // 			if (event.which == 13) {
            // 				console.log('event:keypress2', event.which);
            // 				console.log($("#msg-btn-" + id).data("emojioneArea").getText())
            // 				$("#msg-btn-" + id).data("emojioneArea").setText("");
            // 			}
            // 		}
            // 	}
            // });
            $("#msg-btn-" + id).emojioneArea({
                inline: true,
                pickerPosition: 'top',
                hideSource: true,
                events: {
                    // Enter key as submit button --> working
                    keyup: function (editor, event) {
                        if (event.which == 13 && $.trim($("#msg-btn-" + id).data("emojioneArea").getText()).length > 0) {
                            $('#msg-send-btn-' + id).click();
                            event.preventDefault();
                            // clear textArea after submit --> working
                            //$("#msg-btn-" + id).data("emojioneArea").setText("");
                            // keep focus in textarea after keyup --> working
                            editor.focus();
                        }
                    }
                }
            });
        });
    };
    wsaction.prototype.openNav = function () {
        var mthis = this;
        $('a.opennav').on('click touchstart', function () {
            var roomname = $(this).attr("id");
            roomname = roomname.split('-')[1];
            mthis.currentRoom = roomname;
            $('#closenav-' + roomname).css("width", "250px");
        });
    };
    wsaction.prototype.closeNav = function () {
        var mthis = this;
        $('.closenav').on('click touchstart', function () {
            var btnid = $(this).parent().css("width", "0");
        });
    };
    wsaction.prototype.userNav = function () {
        var mthis = this;
        $('a.mnli').on('click touchstart', function (e) {
            e.preventDefault();
            mthis.currentAction = $(this).text();
            mthis.RoomUserList(mthis.currentRoom);
            $(this).parent().css("width", "0");
            $('#userclosenav-' + mthis.currentRoom).css("width", "250px");
        });
    };
    wsaction.prototype.clickUser = function () {
        var mthis = this;
        $('a.mnuclick').on('click touchstart', function (e) {
            e.preventDefault();
            var username = $(this).text();
            $('#userclosenav-' + mthis.currentRoom).css("width", "0px");
            mthis.userClickAction(username, mthis.currentAction);
        });
    };
    wsaction.prototype.userClickAction = function (user, actionname) {
        if (actionname === 'Kick') {
            this.KickUser(this.currentRoom, user);
        }
    };
    wsaction.prototype.roomTxtSendBtn = function () {
        var mthis = this;
        $('.send-message-button').on('click', function () {
            var btnid = $(this).attr("id");
            if (btnid !== undefined) {
                var romname = btnid.split('msg-send-btn-')[1];
                var usertxt = $("#msg-btn-" + romname).data("emojioneArea").getText(); // $("#msg-btn-" + romname).text();
                if ($.trim(usertxt).length > 0) {
                    mthis.ServerRequest('roomchat', romname, usertxt);
                }
                $("#msg-btn-" + romname).data("emojioneArea").setText("");
            }
        });
    };
    wsaction.prototype.addListenerMulti = function (element, eventNames, listener) {
        var events = eventNames.split(' ');
        for (var i = 0, iLen = events.length; i < iLen; i++) {
            element.addEventListener(events[i], listener, false);
        }
    };
    wsaction.prototype.ServerRequest = function (type, targetName, chat_msg) {
        this.ws.send(JSON.stringify({
            'type': 'roomchat',
            'room_name': targetName,
            'user_id': this.session,
            'chat_msg': chat_msg,
            'token': this.token
        }));
    };
    wsaction.prototype.SenderColor = function (sender, receiver, power, msg) {
        var retstring;
        if (sender == receiver) {
            // if (power == "2") {
            // retstring = '<span style="color:#FF4500;">' + sender + '</span> : <span>' + msg + `</span>`
            // } else {
            retstring = '<span style="color:#FF4500;">' + sender + '</span> : <span>' + msg + "</span>";
            // }
        }
        else {
            // console.log(power);
            if (power == "2") {
                retstring = '<span style="color:#FF6347;">' + sender + '</span> : <span>' + msg + "</span>";
            }
            else {
                retstring = '<span style="color:#000080;">' + sender + '</span> : <span>' + msg + "</span>";
            }
        }
        return retstring;
    };
    wsaction.prototype.showTab = function (tabId) {
        var tabContent = document.querySelector('#myTab a[href="#' + tabId + '"]');
        tabContent.style.display = 'block';
    };
    wsaction.prototype.JoinLeave = function (targetName) {
        this.ws.send(JSON.stringify({
            'type': 'roomleave',
            'room_name': targetName,
            'user_id': this.session,
            'token': this.token
        }));
    };
    wsaction.prototype.JoinJoin = function (targetName) {
        this.ws.send(JSON.stringify({
            'type': 'roomjoin',
            'room_name': targetName,
            'user_id': this.session,
            'token': this.token
        }));
    };
    wsaction.prototype.RoomUserList = function (targetName) {
        this.ws.send(JSON.stringify({
            'type': 'roomuserlist',
            'room_name': targetName,
            'user_id': this.session,
            'token': this.token
        }));
    };
    wsaction.prototype.KickUser = function (room, targetName) {
        this.ws.send(JSON.stringify({
            'type': 'kick',
            'room_name': room,
            'target_name': targetName,
            'user_id': this.session,
            'token': this.token
        }));
    };
    wsaction.prototype.Alive = function () {
        this.ws.send(JSON.stringify({
            'type': 'alive',
            'user_id': this.session,
            'token': this.token
        }));
    };
    wsaction.prototype.Logout = function (e) {
        if (confirm('Do you want to Logout?')) {
            this.ws.send(JSON.stringify({
                'type': 'logout',
                'user_id': this.session,
                'token': this.token
            }));
            window.location.href = this.siteUrl + "index.php/Logout";
        }
    };
    return wsaction;
}());
exports.wsaction = wsaction;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map