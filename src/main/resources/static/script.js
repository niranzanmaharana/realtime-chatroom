$( document ).ready(function() {
	var stompClient = null;

	function connect() {
		let socket = new SockJS('/server1');
		stompClient = Stomp.over(socket);
		stompClient.connect({}, function(frame) {
			$('#login-form').addClass('d-none');
			$('#chat-room').removeClass('d-none');
			// notify new user joining
			notifyNewUserJoing();
			// subscribe to the topic to listen to new messages
			stompClient.subscribe('/topic/message', function(response){
				showMessage(JSON.parse(response.body));
			});
			
			stompClient.subscribe('/topic/user', function(response){
				showUser(JSON.parse(response.body));
			});
		});
	}
	
	function notifyNewUserJoing() {
		let user = {
			username: sessionStorage.getItem('username'),
			connected: true
		};
		stompClient.send('/app/user', {}, JSON.stringify(user));
	}

	function showUser(user) {
		$('#username-title').html($('#username').val());
		if (user.username !== sessionStorage.getItem('username')) {
			$("#message-container").prepend(`<tr><td class='text-muted'>${user.username} </td><td class='text-muted'> ${user.connected ? ' joined ' : ' left '} the chat</td></tr>`);
		}
	}

	function showMessage(message) {
		$("#message-container").prepend(`<tr><th>${message.username}: </th><td>${message.content}</td></tr>`);
	}

	function sendMessage() {
		let message = {
			username: sessionStorage.getItem('username'),
			content: $('#content').val()
		};
		stompClient.send('/app/message', {}, JSON.stringify(message));
		$('#content').val('');
	}
	
	function checkSession() {
		if (sessionStorage.getItem('username') != undefined 
			&& sessionStorage.getItem('username') != null 
			&& sessionStorage.getItem('username') != '') {
			$("#username").val(sessionStorage.getItem('username'));
			$('#login').trigger('click');
		}
	}

    $("#login").click(function() {
		let username = $("#username").val();
		if (username == undefined || username == '') {
			alert('Please enter your name to proceed!');
			return;
		}
		sessionStorage.setItem('username', username);
		connect();
	});
	
	$('#send').click(function() {
		sendMessage();
	});
	
	$("#logout").click(function() {
		let user = {
			username: sessionStorage.getItem('username'),
			connected: false
		};
		stompClient.send('/app/user', {}, JSON.stringify(user));
		sessionStorage.removeItem('username');
		if (stompClient != null) {
			stompClient.disconnect();
			$('#login-form').removeClass('d-none');
			$('#chat-room').addClass('d-none');
		}
	});

	checkSession();
});