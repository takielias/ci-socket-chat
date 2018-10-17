export class wsaction {

	private ws: WebSocket

	private token: string

	private session: string

	private siteUrl: string

	private connm: HTMLElement;

	private ctab: number;

	private audioNote: any;

	private currentRoom: string
	private currentAction: string

	constructor(websocket_server: WebSocket, _siteUrl: string, session: string, token: string) {

		this.siteUrl = "http://" + _siteUrl + "/";

		let mthis = this

		this.ctab = 1

		this.currentRoom = ""
		this.currentAction = ""

		let rml = < HTMLInputElement > document.getElementById('rmldiv')

		rml.addEventListener("click", (e) => {
			mthis.Setctab(1)
		})

		let clogout = < HTMLAnchorElement > document.getElementById('clogout')

		clogout.addEventListener("click", (e) => {
			mthis.Logout(e)
		})

		let status = < HTMLInputElement > document.getElementById('totalroommsg')
		status.addEventListener("click", (e) => {
			mthis.Setctab(2)
		})

		this.ws = websocket_server

		this.session = session

		this.token = token

		this.audioNote = new Audio(this.siteUrl + 'asset/sound/notification_6.mp3');

		this.connm = < HTMLInputElement > document.getElementById('contextMenu')

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

		this.ws.onopen = function (e: Event) {
			mthis.ws.send(
				JSON.stringify({
					'type': 'socket',
					'user_id': session,
					'token': token
				})
			)
		};

		this.ws.onerror = function (e: Event) {
			alert("You are not connected to the Server. Please try Again Later.")
		}

		this.ws.onmessage = function (e: MessageEvent) {

			let json = JSON.parse(e.data);

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
		}

	}

	private playSound() {

		this.audioNote.play();
	}

	private GetLocalStorageValue(key: any): string {
		let retval = window.localStorage.getItem(key)
		if (retval === null) {
			return ""
		} else {
			return retval
		}
	}

	private Setctab(val: number) {
		this.ctab = val
	}

	private SetRoomUserList(targetRoom: string, userlist: string) {

		let mthis = this

		let msgholder = < HTMLUListElement > document.querySelector('#userlist-' + targetRoom + ' ul')

		if (msgholder != null) {

			let listLength = msgholder.children.length;

			for (let i = 0; i < listLength; i++) {
				msgholder.removeChild(msgholder.children[0]);
			}

			let jsonData = JSON.parse(userlist);

			for (let i = 0; i < jsonData.length; i++) {

				let username: string = jsonData[i];

				let ulli = < HTMLElement > document.createElement('a');

				// ulli.addEventListener('click', (e) => {
				// 	console.log('kop')
				// 	return false
				// })

				ulli.setAttribute("href", "#")

				ulli.setAttribute("class", "mnuclick")

				ulli.innerHTML = username

				msgholder.appendChild(ulli)

			}

		}

		this.clickUser()
	}

	private ulistListner() {

		$('.ulli').on('click touchstart', function () {

			let mthis = this

			// 'console.log('kop')

		});
	}


	private ShowMenu(e: MouseEvent) {
		let control = < HTMLElement > document.getElementById('contextMenu');
		let posx = e.clientX + window.pageXOffset + 'px'; //Left Position of Mouse Pointer
		let posy = e.clientY + window.pageYOffset + 'px'; //Top Position of Mouse Pointer
		let kopMnu = < HTMLElement > document.getElementById('contextMenu');
		kopMnu.style.position = 'absolute'
		kopMnu.style.display = 'inline';
		kopMnu.style.left = posx;
		kopMnu.style.top = posy;

		control.style.zIndex = "-1"

		let liemele: any = e.target


		let intxt = liemele.innerHTML

		window.localStorage.setItem('actionTarget', intxt)

		let roomname: HTMLElement = liemele.parentElement.parentElement.parentElement

		let roomnameid = roomname.id

		window.localStorage.setItem('currentRoomName', roomnameid.split('closenav-')[1])

	}

	private SetTempVar(str: string) {
		let tempvar = < HTMLInputElement > document.getElementById('tempvar');
		tempvar.value = str
	}

	public mtrim(myString: string) {
		return myString.replace(/^\s+/, '').replace(/\s+$/, '')
	}

	private SendToRoomManagement(room: string, sender: string, receiver: string, power: string, msg: string) {

		room = this.mtrim(room)

		sender = this.mtrim(sender)

		receiver = this.mtrim(receiver)

		let myElem = < HTMLElement > document.querySelector('#' + room)

		if (!myElem) {

			this.MakeNewRoom(room, sender, receiver, msg);

			this.senddataToRoom(room, sender, receiver, power, msg);

			this.RoomUserList(room);

			this.roomTxtSendBtn()

		} else {

			this.insertTextToroom(room, sender, receiver, power, msg)

		}

		if (sender != this.session) {
			this.playSound()
		}

	}


	private MakeNewRoom(room: string, sender: string, receiver: string, msg: string) {

		let tco = < HTMLElement > document.querySelector('#tab-contacts-outter')

		let tabble: HTMLElement;

		tabble = < HTMLElement > document.createElement('li');

		tabble.setAttribute('data-target', '#' + room)

		tabble.setAttribute('data-toggle', 'tab')

		let mdiv = < HTMLElement > document.createElement('div');

		mdiv.className = 'vcentered info-combo'

		let mh3 = < HTMLElement > document.createElement('h3');

		mh3.className = 'no-margin-bottom name'

		mh3.innerHTML = room

		mdiv.appendChild(mh3)

		tabble.appendChild(mdiv)

		tabble.innerHTML = '<a class = "resetclass" id ="resetcount-' + room + '" href="#' + room + '"><button class="close closeTab" type="button" >×</button>' + room + '</a> <a style = "visibility:hidden;" id ="txtcount-' + room + '" >0</a>'

		tco.appendChild(tabble)

		tco.appendChild(tabble)

		tco.style.display = 'block'

		let roomTxtCountReset = < HTMLAnchorElement > document.getElementById('resetcount-' + room)

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
	}


	//  resetRoomTxtCount(e: Event) {
	// 	let rstc: any = e.target
	// 	let roomname:string = rstc.id.split('-')[1]
	// 	let roomTxtCount:HTMLAnchorElement = < HTMLAnchorElement > document.getElementById('txtcount-' + roomname)
	// 	roomTxtCount.innerHTML = "0"
	// 	roomTxtCount.style.visibility = 'hidden'
	// }

	private registerCloseEvent() {

		let mthis = this

		$(".closeTab").click(function () {
			//there are multiple elements which has .closeTab icon so close the tab whose close icon is clicked
			let tabContentId: any = $(this).parent().attr("href");
			let tlrm: any = $(this).parent().attr("href");
			mthis.JoinLeave(tlrm.split('#')[1])
			$(this).parent().parent().remove(); //remove li of tab
			$('#myTab a:last').click
			$(tabContentId).remove(); //remove respective tab content
		});
	}

	private resetRoomTxtCountEvent() {
		let mthis = this
		$(".resetclass").click(function () {
			let tabContentId: any = $(this).attr("href");
			let resettxtid: string = tabContentId.split('#')[1];
			$('#txtcount-' + resettxtid).text(0)
			$('#txtcount-' + resettxtid).css("visibility", "hidden")

		});
	}


	private senddataToRoom(loadDivSelector: string, sender: string, receiver: string, power: string, msg: string) {

		this.insertTextToroom(loadDivSelector, sender, receiver, power, msg)

	}

	private insertTextToroom(loadDivSelector: string, sender: string, receiver: string, power: string, msg: string) {

		let mthis = this

		let msgholder = < HTMLElement > document.querySelector('#allmsg')

		let createdChat = < HTMLElement > document.querySelector('#' + loadDivSelector + ' .message-chat .chat-body .tab-pane')

		let divmmm

		if (createdChat != null) {

			let divold = < HTMLElement > document.createElement('div');

			divold.innerHTML = this.SenderColor(sender, receiver, power, msg)

			createdChat.appendChild(divold)

			let roomTxtCount = < HTMLAnchorElement > document.getElementById('txtcount-' + loadDivSelector)

			roomTxtCount.style.visibility = 'visible'

			let cval = parseInt(roomTxtCount.innerHTML) + 1

			roomTxtCount.innerHTML = cval.toString()

			// console.log(mthis.ctab)

			if (mthis.ctab == 1) {

				let allcount = < HTMLElement > document.getElementById('ttcount')

				let strVal = parseInt(allcount.innerHTML) + 1

				allcount.innerHTML = strVal.toString()

				allcount.style.visibility = 'visible'

			}


		} else {

			let divtpmb = < HTMLElement > document.createElement('div');

			divtpmb.className = 'tab-pane message-body'

			divtpmb.id = loadDivSelector

			let opmsgdiv = < HTMLElement > document.createElement('div');

			opmsgdiv.innerHTML = `
            <div class="message-top">
                    <a id="opennav-` + loadDivSelector + `" style="font-size:30px;cursor:pointer" class="btn btn btn-success opennav"> &#9776; ` + loadDivSelector + ` </a>

                    <div class="new-message-wrapper">
                        <div class="form-group">
                            <input class="form-control" placeholder="Send message to..." type="text">
                            <a class="btn btn-danger close-new-message" href="#"><i class="fa fa-times"></i></a>
                        </div>

						<div class="col-md-8 chat-footer new-message-textarea">
							<textarea class = "send-message-text"></textarea>
                            <button type="button" id="msg-send-btn-` + loadDivSelector + `" class="send-message-button"> <i class="fa fa-send"></i> </button>
                        </div>
                    </div>
                </div>
            `

			let divmc = < HTMLElement > document.createElement('div');

			divmc.className = 'message-chat'

			divmmm = < HTMLElement > document.createElement('div');

			divmmm.className = 'chat-body'

			divmmm.innerHTML = `<div class="tab-pane col-md-9">` +
				this.SenderColor(sender, receiver, power, msg) + `</div>
            
            <div class="tab-pane col-md-3">


			<div class="sidenav" id="closenav-` + loadDivSelector + `">
			<a href="javascript:void(0)" class="closenav">&times;</a>

			<a href="#" class="mnli">Kick</a>

		    </div>			


            <div class="list-group lg-alt" id="userlist-` + loadDivSelector + `">

			<div class="usernav" id="userclosenav-` + loadDivSelector + `">
			
			<a href="javascript:void(0)" class="closenav">&times;</a>

            <ul style="list-style-type:none">

            </ul>

		    </div>

			</div>


            </div>
			`
			let chatFooter = < HTMLElement > document.createElement('div');
			chatFooter.innerHTML = `<div class="col-md-8 chat-footer">
	   <textarea class = "send-message-text" id="msg-btn-` + loadDivSelector + `"></textarea>
       <button type="button" id="msg-send-btn-` + loadDivSelector + `" class="send-message-button btn btn-info"> <i class="fa fa-send"></i> </button>
	   </div>
	   `
			divmc.appendChild(divmmm)
			divmc.appendChild(chatFooter)
			divtpmb.appendChild(opmsgdiv)
			divtpmb.appendChild(divmc)
			msgholder.appendChild(divtpmb)

			let bdkey = < HTMLInputElement > document.getElementById('msg-btn-' + loadDivSelector)

			let msgSendButton = < HTMLButtonElement > document.getElementById('msg-send-btn-' + loadDivSelector)

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
			createdChat.scrollTop = createdChat.scrollHeight - createdChat.clientHeight
		}

		this.openNav()

		this.closeNav()

		this.userNav()

		this.sendTxtjq(loadDivSelector);

	}

	private sendTxtjq(id: string) {
		let mthis = this
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

					keyup: function (editor: any, event: any) {

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
	}

	private openNav() {

		let mthis = this

		$('a.opennav').on('click touchstart', function () {

			let roomname: any = $(this).attr("id");

			roomname = roomname.split('-')[1]

			mthis.currentRoom = roomname

			$('#closenav-' + roomname).css("width", "250px")

		});

	}

	private closeNav() {

		let mthis = this

		$('.closenav').on('click touchstart', function () {

			let btnid: any = $(this).parent().css("width", "0");

		});
	}

	private userNav() {

		let mthis = this

		$('a.mnli').on('click touchstart', function (e) {

			e.preventDefault();

			mthis.currentAction = $(this).text()

			mthis.RoomUserList(mthis.currentRoom);

			$(this).parent().css("width", "0");

			$('#userclosenav-' + mthis.currentRoom).css("width", "250px")

		});

	}

	private clickUser() {

		let mthis = this

		$('a.mnuclick').on('click touchstart', function (e) {

			e.preventDefault();

			let username: any = $(this).text();

			$('#userclosenav-' + mthis.currentRoom).css("width", "0px")

			mthis.userClickAction(username, mthis.currentAction)

		});

	}

	private userClickAction(user: string, actionname: string) {

		if (actionname === 'Kick') {
			this.KickUser(this.currentRoom, user)
		}
	}

	private roomTxtSendBtn() {

		let mthis = this

		$('.send-message-button').on('click', function () {

			let btnid: any = $(this).attr("id");

			if (btnid !== undefined) {

				let romname: string = btnid.split('msg-send-btn-')[1];

				let usertxt: string = $("#msg-btn-" + romname).data("emojioneArea").getText() // $("#msg-btn-" + romname).text();

				if ($.trim(usertxt).length > 0) {

					mthis.ServerRequest('roomchat', romname, usertxt);

				}

				$("#msg-btn-" + romname).data("emojioneArea").setText("");

			}

		});

	}

	private addListenerMulti(element: any, eventNames: any, listener: any) {
		var events = eventNames.split(' ');
		for (var i = 0, iLen = events.length; i < iLen; i++) {
			element.addEventListener(events[i], listener, false);
		}
	}

	private ServerRequest(type: string, targetName: string, chat_msg: string) {

		this.ws.send(
			JSON.stringify({
				'type': 'roomchat',
				'room_name': targetName,
				'user_id': this.session,
				'chat_msg': chat_msg,
				'token': this.token
			})
		);

	}

	private SenderColor(sender: string, receiver: string, power: string, msg: string) {

		let retstring: string;

		if (sender == receiver) {

			// if (power == "2") {
			// retstring = '<span style="color:#FF4500;">' + sender + '</span> : <span>' + msg + `</span>`
			// } else {
			retstring = '<span style="color:#FF4500;">' + sender + '</span> : <span>' + msg + `</span>`
			// }

		} else {

			// console.log(power);

			if (power == "2") {
				retstring = '<span style="color:#FF6347;">' + sender + '</span> : <span>' + msg + `</span>`
			} else {
				retstring = '<span style="color:#000080;">' + sender + '</span> : <span>' + msg + `</span>`
			}
		}
		return retstring
	}

	private showTab(tabId: string) {
		let tabContent = < HTMLElement > document.querySelector('#myTab a[href="#' + tabId + '"]')
		tabContent.style.display = 'block'
	}


	public JoinLeave(targetName: string) {
		this.ws.send(
			JSON.stringify({
				'type': 'roomleave',
				'room_name': targetName,
				'user_id': this.session,
				'token': this.token
			})
		);

	}

	public JoinJoin(targetName: string) {
		this.ws.send(
			JSON.stringify({
				'type': 'roomjoin',
				'room_name': targetName,
				'user_id': this.session,
				'token': this.token
			})
		);

	}

	private RoomUserList(targetName: string) {

		this.ws.send(
			JSON.stringify({
				'type': 'roomuserlist',
				'room_name': targetName,
				'user_id': this.session,
				'token': this.token
			})
		);

	}

	private KickUser(room: string, targetName: string) {

		this.ws.send(
			JSON.stringify({
				'type': 'kick',
				'room_name': room,
				'target_name': targetName,
				'user_id': this.session,
				'token': this.token
			})
		);

	}

	private Alive() {

		this.ws.send(
			JSON.stringify({
				'type': 'alive',
				'user_id': this.session,
				'token': this.token
			})
		);

	}

	private Logout(e: MouseEvent) {

		if (confirm('Do you want to Logout?')) {
			this.ws.send(
				JSON.stringify({
					'type': 'logout',
					'user_id': this.session,
					'token': this.token
				})
			);
			window.location.href = this.siteUrl + "index.php/Logout";
		}

	}


}