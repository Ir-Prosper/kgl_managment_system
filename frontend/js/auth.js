/*  
  auth.js  
  -------------
  This file handles:
  - Sending login details to the backend
  - Receiving token + role + branch
  - Saving them in localStorage
  - Redirecting the user to the correct dashboard
*/

// Select the login form from login.html
const loginForm = document.getElementById('login-form')

if (loginForm) {
  loginForm.addEventListener('submit', async function (event) {
    // Stop page from refreshing
    event.preventDefault()

    // Collect username and password from the form
    const username = loginForm.username.value
    const password = loginForm.password.value

    // Prepare data to send to backend
    const loginData = {
      username: username,
      password: password,
    }

    try {
      // Send login request to backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })

      // Convert backend response to JSON
      const data = await response.json()

      // If login failed, show error message
      if (!response.ok) {
        alert(data.message || 'Login failed')
        return
      }

      /*  
        If login is successful, backend returns:
        - token
        - role (director, manager, agent)
        - branch (Maganjo, Matugga)
      */

      // Save login details in localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      localStorage.setItem('branch', data.branch)
      localStorage.setItem('username', username)

      // Redirect user based on their role
      if (data.role === 'director') {
        window.location.href = 'director-dashboard.html'
      } else if (data.role === 'manager') {
        window.location.href = 'manager-dashboard.html'
      } else if (data.role === 'agent') {
        window.location.href = 'agent-dashboard.html'
      } else {
        alert('Unknown role. Contact system admin.')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Unable to connect to server')
    }
  })
}
/*  
  LOGOUT FUNCTION  
  ----------------
  This function clears all saved login data
  and sends the user back to the login page.
*/
function logout() {
  localStorage.clear()
  window.location.href = 'login.html'
}
