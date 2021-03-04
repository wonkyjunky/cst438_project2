import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import login from './Login'
import App from './App'

function Login() {
  return (
    <div>
        <header><h1>Login</h1></header>
        <br/><br/>
		<form method='get'>			
				<input id="username" type="text" placeholder="Username"/><br/>
				<input id="password" type="text" placeholder="password"/><br/><br/>
				<button>Login</button><br/><br/>
		</form>
			<p>You don't have account?</p>
			<a href="Account">Create an Account</a>
    </div>
  );
}

export default Login;
