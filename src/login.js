function login() {
    return (
      <div >
        <header>
        <form>
              <label for="username">User Name: </label>
              <input type="text" id="username"></input><br></br>
              <label for="password">Password:</label>
              <input type="text" id="password"></input><br></br>
              <button onClick="Login">Submit</button>
            </form>
        </header>
      </div>
    );
  }
  
  
  
  export default login;