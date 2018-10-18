import {
	wsaction
} from './wsaction'

window.onload = function () {

	let session = <HTMLInputElement>document.getElementById('session')

	let token = <HTMLInputElement>document.getElementById('token')

	let login_path = <HTMLInputElement>document.getElementById('login_path')

	// let rightClickTarger: string;

	let currentTab;

	let composeCount = 0;

	let logout = <HTMLInputElement>document.getElementById('logout')

	if (logout != null) {

		// logout.addEventListener('click', Logout)
	}

	let siteUrl = "localhost/cisocket/server";
	let wsUrl = "localhost";

	// let siteUrl = "chilro.com";
	// let wsUrl = "chilro.com"; 


	let websocket_server = new WebSocket("ws://" + wsUrl + ":8282/");

	let mobj = new wsaction(websocket_server, siteUrl, session.value, token.value)

	function mContextMenu(e: PointerEvent) {
		let liemele: any = e.currentTarget
		let intxt = liemele.innerHTML
		intxt = intxt.split('href="#">')[1]
		intxt = intxt.split('</a>')[0]
		// rightClickTarger = intxt
	}
	function mtrim(myString: string) {
		return myString.replace(/^\s+/, '').replace(/\s+$/, '')
	}

	$("#roomlist li").on("click", function () {
		mobj.JoinJoin(mtrim($(this).text()));
		// console.log(mtrim($(this).text()))
	});

	let roomTxtCountReset = <HTMLElement>document.getElementById('totalroommsg')
	roomTxtCountReset.addEventListener('click', (e) => {
		let pps = <HTMLElement>document.getElementById('ttcount')
		pps.innerHTML = "0"
		pps.style.visibility = 'hidden'
	})

}


