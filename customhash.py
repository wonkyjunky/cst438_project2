def hash(s):
	tmp2 = s
	for j in range(len(s)):
		tmp =""
		for i in range(len(s)):
			if(i>=len(s)-1):
				tmp = tmp+chr(ord(tmp2[i])^ord(tmp2[0]))
			else:
				tmp = tmp+chr(ord(tmp2[i])^ord(tmp2[i+1]))
		tmp2 = tmp
		
	return tmp2
