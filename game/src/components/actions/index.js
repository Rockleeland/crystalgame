import AuthService from '../AuthService';


const getID = () => {
	const Auth = new AuthService()  
	let currentProfile = Auth.getProfile()
	console.log(currentProfile.id)

	return currentProfile.id 
}
export const getProfileFetch = () => {
	let x = getID()
	return dispatch => {
		const token = localStorage.id_token;
	  if (token) {
		return fetch(`/api/user/${x}`, {
		  method: "GET",
		  headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			'Authorization': `Bearer ${token}`
		  }
		})
		  .then(res => res.json())
		  .then(data => {
			if (data.message) {
				// Here you should have logic to handle invalid creation of a user.
				// This assumes your Rails API will return a JSON object with a key of
				// 'message' if there is an error with creating the user, i.e. invalid username
			  } else {
				localStorage.setItem("token", data.jwt)
				dispatch(loginUser(data))
				
			  }
		  })
	  }
	}
  }

  const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})