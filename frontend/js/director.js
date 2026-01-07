/*  
  director.js
  ----------------
  This file loads all data for the Director Dashboard.
  The director has FULL ACCESS to:
  - All products (all branches)
  - All sales (all branches)
  - All credit sales (all branches)
  - Low stock alerts for ALL branches
*/

// 1. CHECK IF USER IS LOGGED IN AND IS A DIRECTOR
const token = localStorage.getItem('token')
const role = localStorage.getItem('role')

if (!token || role !== 'director') {
  window.location.href = 'login.html'
}

// 2. FUNCTION TO FETCH DATA FROM BACKEND
async function fetchData(endpoint) {
  try {
    const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const result = await response.json()

    if (!response.ok) {
      console.error(`Error fetching ${endpoint}:`, result.message)
      return []
    }

    return result
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    return []
  }
}

/* ============================================================
   3. LOAD SUMMARY CARDS
============================================================ */
async function loadSummaryCards() {
  const allProducts = await fetchData('products')
  const allSales = await fetchData('sales')
  const allCredit = await fetchData('credit-sales')

  document.getElementById('total-products').textContent = allProducts.length
  document.getElementById('total-sales').textContent = allSales.length
  document.getElementById('total-credit').textContent = allCredit.length
}

/* ============================================================
   4. LOAD ALL PRODUCTS TABLE
============================================================ */
async function loadProductsTable() {
  const products = await fetchData('products')

  const tbody = document.getElementById('products-table')
  tbody.innerHTML = ''

  products.forEach((p) => {
    tbody.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.type}</td>
        <td>${p.tonnage}</td>
        <td>${p.branch}</td>
        <td>${p.alertLevel}</td>
      </tr>
    `
  })
}

/* ============================================================
   5. LOAD ALL SALES TABLE
============================================================ */
async function loadSalesTable() {
  const sales = await fetchData('sales')

  const tbody = document.getElementById('sales-table')
  tbody.innerHTML = ''

  sales.forEach((s) => {
    tbody.innerHTML += `
      <tr>
        <td>${s.productName}</td>
        <td>${s.tonnage}</td>
        <td>${s.amountPaid}</td>
        <td>${s.buyerName}</td>
        <td>${s.salesAgent}</td>
        <td>${s.branch}</td>
        <td>${s.date}</td>
      </tr>
    `
  })
}

/* ============================================================
   6. LOAD ALL CREDIT SALES TABLE
============================================================ */
async function loadCreditTable() {
  const credit = await fetchData('credit-sales')

  const tbody = document.getElementById('credit-table')
  tbody.innerHTML = ''

  credit.forEach((c) => {
    tbody.innerHTML += `
      <tr>
        <td>${c.buyerName}</td>
        <td>${c.amountDue}</td>
        <td>${c.productName}</td>
        <td>${c.tonnage}</td>
        <td>${c.salesAgent}</td>
        <td>${c.branch}</td>
        <td>${c.dueDate}</td>
      </tr>
    `
  })
}

/* ============================================================
   7. LOAD LOW STOCK ALERTS FOR ALL BRANCHES (NEW FEATURE)
============================================================ */
async function loadStockAlerts() {
  const products = await fetchData('products')

  const alertContainer = document.getElementById('stock-alerts')
  if (!alertContainer) return

  alertContainer.innerHTML = ''

  // Filter low stock items
  const lowStock = products.filter((p) => p.tonnage < p.alertLevel)

  // No alerts
  if (lowStock.length === 0) {
    alertContainer.innerHTML = `
      <div class="alert alert-success">
        No low stock alerts across all branches.
      </div>
    `
    return
  }

  // Alerts exist
  let rows = ''
  lowStock.forEach((p) => {
    rows += `
      <tr>
        <td>${p.name}</td>
        <td>${p.branch}</td>
        <td>${p.tonnage}</td>
        <td>${p.alertLevel}</td>
      </tr>
    `
  })

  alertContainer.innerHTML = `
    <div class="alert alert-warning mb-3">
      <strong>Low Stock Alerts (All Branches)</strong>
    </div>

    <table class="table table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Product</th>
          <th>Branch</th>
          <th>Current Stock</th>
          <th>Alert Level</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `
}

/* ============================================================
   8. RUN ALL FUNCTIONS WHEN PAGE LOADS
============================================================ */
loadSummaryCards()
loadProductsTable()
loadSalesTable()
loadCreditTable()
loadStockAlerts() // NEW

/* ============================================================
   9. LOGOUT FUNCTION
============================================================ */
function logout() {
  localStorage.clear()
  window.location.href = 'login.html'
}
