const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      console.log('localStorage is currently:', localStorage.getItem('jwtToken'),localStorage.getItem('email'),localStorage.getItem('expiration'),);

      // remove token for localStorage
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('email');
      localStorage.removeItem('expiration');
      localStorage.removeItem('userData');
    }
    console.log('Logging out');
    console.log('localStorage is now:', localStorage.getItem('jwtToken'),localStorage.getItem('email'),localStorage.getItem('expiration'),);
  }

export default handleLogout;