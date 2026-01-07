/*
  SALES.JS
  ---------------------------------------------------------
  Handles Produce Selling for Agents.
*/

/* ============================================================
   1. VERIFY LOGIN + ROLE
============================================================ */
const token = localStorage.getItem('token')
const role = localStorage.getItem('role')
const branch = localStorage.getItem('branch')
const username = localStorage.getItem('username')

if (!token || role !== 'agent') {
  window.location.href = 'login.html'
}

/* ============================================================
   1B. SHOW LOGGED-IN AGENT NAME IN NAV + LABEL
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Top navigation bar (under "Produce Selling")
  const navAgent = document.getElementById('navAgentName')
  if (navAgent) navAgent.textContent = username

  // Inside the form label
  const formAgent = document.getElementById('loggedAgent')
  if (formAgent) formAgent.textContent = username

  // Hidden input for backend
  const hiddenInput = document.getElementById('salesAgentHidden')
  if (hiddenInput) hiddenInput.value = username
})

/* ============================================================
   2. HANDLE SALES FORM SUBMISSION
============================================================ */
document.getElementById('selling-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const form = e.target

  const payload = {
    productName: form.sellProduceName.value,
    tonnage: parseFloat(form.sellTonnage.value),
    amountPaid: parseFloat(form.amountPaid.value),
    buyerName: form.buyerName.value,
    salesAgent: username,
    date: form.sellDate.value,
    time: form.sellTime.value,
    branch: branch,
  }

  try {
    const response = await fetch('http://localhost:5000/api/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (!response.ok) {
      alert(`❌ Error: ${result.message}`)
      return
    }

    alert('✅ Sale recorded successfully!')
    form.reset()
  } catch (error) {
    console.error(error)
    alert('❌ Server error. Try again.')
  }
})

/* ============================================================
   3. LOGOUT FUNCTION
============================================================ */
function logout() {
  localStorage.clear()
  window.location.href = 'login.html'
}
