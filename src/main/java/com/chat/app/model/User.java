/**
 * 
 */
package com.chat.app.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author NMA343
 *
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
	private String username;
	private boolean connected;
	private String colorCode;
}
