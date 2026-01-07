/*
  CREDIT-SALES.JS
  ---------------------------------------------------------
  Handles Credit Sales for Agents.

  This script:
  - Ensures the user is logged in as an agent
  - Auto-fills agent name in navbar + hidden input
  - Collects form data from credit-sales.html
  - Sends the credit sale to the backend as JSON
  - Shows success or error messages
  ---------------------------------------------------------
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
   1B. AUTO-FILL AGENT NAME (NAV + HIDDEN INPUT)
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Fill navbar agent name
  const navAgent = document.getElementById('navAgentName')
  if (navAgent) navAgent.textContent = username

  // Fill hidden input for backend
  const hiddenAgent = document.getElementById('creditSalesAgentHidden')
  if (hiddenAgent) hiddenAgent.value = username
})

/* ============================================================
   2. HANDLE CREDIT SALES FORM SUBMISSION
============================================================ */
document.getElementById('credit-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const form = e.target

  // Build JSON payload using EXACT backend field names
  const payload = {
    buyerName: form.creditBuyerName.value,
    nin: form.creditNIN.value,
    location: form.creditLocation.value,
    contact: form.creditContact.value,
    amountDue: parseFloat(form.creditAmountDue.value),
    salesAgent: username, // auto-filled
    branch: branch, // auto-filled
    dueDate: form.creditDueDate.value,

    // IMPORTANT: match backend field names
    productName: form.creditProduceName.value,
    productType: form.creditProduceType.value,

    tonnage: parseFloat(form.creditTonnage.value),
    dispatchDate: form.creditDispatchDate.value,
  }

  try {
    const response = await fetch('http://localhost:5000/api/credit-sales', {
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

    alert('✅ Credit sale recorded successfully!')
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
