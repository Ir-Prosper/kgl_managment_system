/*
  PROCUREMENT.JS
  ---------------------------------------
  Handles procurement form submission.
  - Validates manager login
  - Collects form data
  - Sends to backend
  - Shows success popup
  - Clears form
*/

const token = localStorage.getItem('token')
const role = localStorage.getItem('role')

// Only managers can access this page
if (!token || role !== 'manager') {
  window.location.href = 'login.html'
}

document.getElementById('procurement-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  // Collect form values using NAME attributes
  const form = e.target

  const payload = {
    produceName: form.produceName.value,
    produceType: form.produceType.value,
    date: form.date.value,
    time: form.time.value,
    tonnage: parseFloat(form.tonnage.value),
    cost: parseFloat(form.cost.value),
    dealerName: form.dealerName.value,
    branch: form.branch.value,
    contact: form.contact.value,
    salePrice: parseFloat(form.salePrice.value),
  }

  try {
    const response = await fetch('http://localhost:5000/api/procurements', {
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

    alert('✅ Procurement recorded successfully')

    // Clear form
    form.reset()
  } catch (error) {
    console.error(error)
    alert('❌ Server error. Try again.')
  }
})
function logout() {
  localStorage.clear()
  window.location.href = 'login.html'
}
