/*  
  agent.js
  ----------------
  SAFE VERSION — prevents crashes on pages without certain elements.
*/

// 1. CHECK LOGIN
const token = localStorage.getItem('token')
const role = localStorage.getItem('role')
const branch = localStorage.getItem('branch')
const username = localStorage.getItem('username')

if (!token || role !== 'agent') {
  window.location.href = 'login.html'
}

// 2. FETCH DATA
async function fetchData(endpoint) {
  try {
    const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    const result = await response.json()
    if (!response.ok) return []

    return result
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    return []
  }
}

/* ============================================================
   3. LOAD SUMMARY CARDS (SAFE)
============================================================ */
async function loadSummaryCards() {
  const card1 = document.getElementById('my-sales')
  const card2 = document.getElementById('my-credit')
  const card3 = document.getElementById('branch-products')

  if (!card1 || !card2 || !card3) return // PAGE DOES NOT HAVE CARDS

  const mySales = await fetchData('sales/my-sales')
  const myCredit = await fetchData('credit-sales/my-credit-sales')
  const branchProducts = await fetchData(`products/branch/${branch}`)

  card1.textContent = mySales.length
  card2.textContent = myCredit.length
  card3.textContent = branchProducts.length
}

/* ============================================================
   4. LOAD PRODUCTS TABLE (SAFE)
============================================================ */
async function loadProductsTable() {
  const tbody = document.getElementById('products-table')
  if (!tbody) return // PAGE DOES NOT HAVE THIS TABLE

  const branchProducts = await fetchData(`products/branch/${branch}`)
  tbody.innerHTML = ''

  branchProducts.forEach((p) => {
    tbody.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.tonnage}</td>
      </tr>
    `
  })
}

/* ============================================================
   5. LOAD SALES TABLE (SAFE)
============================================================ */
async function loadSalesTable() {
  const tbody = document.getElementById('sales-table')
  if (!tbody) return // PAGE DOES NOT HAVE THIS TABLE

  const mySales = await fetchData('sales/my-sales')
  tbody.innerHTML = ''

  mySales.forEach((s) => {
    tbody.innerHTML += `
      <tr>
        <td>${s.productName}</td>
        <td>${s.tonnage}</td>
        <td>${s.amountPaid}</td>
        <td>${s.buyerName}</td>
        <td>${s.date}</td>
      </tr>
    `
  })
}

/* ============================================================
   6. LOAD CREDIT SALES TABLE (SAFE)
============================================================ */
async function loadCreditTable() {
  const tbody = document.getElementById('credit-table')
  if (!tbody) return // PAGE DOES NOT HAVE THIS TABLE

  const myCredit = await fetchData('credit-sales/my-credit-sales')
  tbody.innerHTML = ''

  myCredit.forEach((c) => {
    tbody.innerHTML += `
      <tr>
        <td>${c.buyerName}</td>
        <td>${c.amountDue}</td>
        <td>${c.productName}</td>
        <td>${c.tonnage}</td>
        <td>${c.dueDate}</td>
      </tr>
    `
  })
}

/* ============================================================
   7. LOAD STOCK ALERTS (SAFE)
============================================================ */
async function loadStockAlerts() {
  const alertContainer = document.getElementById('stock-alerts')
  if (!alertContainer) return // PAGE DOES NOT HAVE ALERTS

  const lowStock = await fetchData(`products/low-stock/${branch}`)
  alertContainer.innerHTML = ''

  if (lowStock.length === 0) {
    alertContainer.innerHTML = `
      <div class="alert alert-success">
        No low stock alerts. All products are above minimum level.
      </div>
    `
    return
  }

  let listItems = ''
  lowStock.forEach((p) => {
    listItems += `<li>${p.name} — only ${p.tonnage} tons left</li>`
  })

  alertContainer.innerHTML = `
    <div class="alert alert-warning">
      <strong>Stock Alerts:</strong>
      <ul>${listItems}</ul>
    </div>
  `
}

/* ============================================================
   8. RUN FUNCTIONS SAFELY
============================================================ */
loadSummaryCards()
loadProductsTable()
loadSalesTable()
loadCreditTable()
loadStockAlerts()

/* ============================================================
   9. LOGOUT
============================================================ */
function logout() {
  localStorage.clear()
  window.location.href = 'login.html'
}
