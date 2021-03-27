/**
 * Checks if a password meets criteria
 * 
 * @param	password	the password to examine
 * 
 * @return	bool value, true if password is valid
 */
 function validpassword(password)
 {
	 if (password.length < 6) return false;
	 // special characters that are allowed in passwords
	 let specials = "`~!@#$%^&*()-_=+[{]}\\|'\":;?/>.<,";
 
	 for (let i = 0; i < password.length; i++) {
		 for (let j = 0; j < specials.length; j++) {
			 // check every password character for special as at least one is required
			 if (password[i] == specials[j]) {
				 return true;
			 }
		 }
	 }
	 // no specials found, invalid password
	 return false;
 }
 