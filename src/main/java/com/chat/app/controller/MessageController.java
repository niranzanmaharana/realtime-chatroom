/**
 * 
 */
package com.chat.app.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.chat.app.model.Message;
import com.chat.app.model.User;

/**
 * @author NMA343
 *
 */

@RestController
public class MessageController {

	/***
	 * 
	 * @MessaageMapping annotation is used to capture the message
	 * @SendTo annotation will broadcast this return value to all the subscribers subscribed to this topic
	 * 
	 * @param message
	 * @return
	 */
	@MessageMapping("/message")
	@SendTo("/topic/message")
	public Message newMessage(@RequestBody Message message) {
		// Process the message like storing or something before pushing to websocket
		return message;
	}
	
	@MessageMapping("/user")
	@SendTo("/topic/user")
	public User newUser(@RequestBody User user) {
		return user;
	}
}
