// 1. CHECK IF USER IS LOGGED IN AND IS A MANAGER
const token = localStorage.getItem('token')
const role = localStorage.getItem('role')
const branch = localStorage.getItem('branch')

if (!token || role !== 'manager') {
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
   3. LOAD SUMMARY CARDS (SAFE)
============================================================ */
async function loadSummaryCards() {
  const stockEl = document.getElementById('branch-stock')
  const salesEl = document.getElementById('branch-sales')
  const creditEl = document.getElementById('branch-credit')
  const procEl = document.getElementById('branch-procurements')

  if (!stockEl || !salesEl || !creditEl || !procEl) return

  const products = await fetchData(`products/branch/${branch}`)
  const sales = await fetchData(`sales/branch/${branch}`)
  const credit = await fetchData(`credit-sales/branch/${branch}`)
  const procurements = await fetchData(`procurements/branch/${branch}`)

  stockEl.textContent = products.length
  salesEl.textContent = sales.length
  creditEl.textContent = credit.length
  procEl.textContent = procurements.length
}

/* ============================================================
   4. LOAD BRANCH STOCK TABLE (SAFE)
============================================================ */
async function loadBranchStockTable() {
  const tbody = document.getElementById('stock-table')
  if (!tbody) return

  const products = await fetchData(`products/branch/${branch}`)
  tbody.innerHTML = ''

  products.forEach((p) => {
    tbody.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.tonnage}</td>
      </tr>
    `
  })
}

/* ============================================================
   5. LOAD BRANCH SALES TABLE (SAFE)
============================================================ */
async function loadBranchSalesTable() {
  const tbody = document.getElementById('sales-table')
  if (!tbody) return

  const sales = await fetchData(`sales/branch/${branch}`)
  tbody.innerHTML = ''

  sales.forEach((s) => {
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
   6. LOAD BRANCH CREDIT SALES TABLE (SAFE)
============================================================ */
async function loadBranchCreditTable() {
  const tbody = document.getElementById('credit-table')
  if (!tbody) return

  const credit = await fetchData(`credit-sales/branch/${branch}`)
  tbody.innerHTML = ''

  credit.forEach((c) => {
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
   7. LOAD BRANCH PROCUREMENT TABLE (FIXED + SAFE)
============================================================ */
async function loadBranchProcurementTable() {
  const tbody = document.getElementById('procurement-table')
  if (!tbody) return

  const procurements = await fetchData(`procurements/branch/${branch}`)
  tbody.innerHTML = ''

  procurements.forEach((p) => {
    tbody.innerHTML += `
      <tr>
        <td>${p.produceName}</td>
        <td>${p.tonnage}</td>
        <td>${p.cost}</td>
        <td>${p.dealerName}</td>
        <td>${p.date}</td>
      </tr>
    `
  })
}

/* ============================================================
   8. LOAD STOCK ALERTS (SAFE)
============================================================ */
async function loadStockAlerts() {
  const alertContainer = document.getElementById('stock-alerts')
  if (!alertContainer) return

  const lowStock = await fetchData(`products/low-stock/${branch}`)
  alertContainer.innerHTML = ''

  if (lowStock.length === 0) {
    alertContainer.innerHTML = `
      <div class="alert alert-success">
        No low stock alerts for this branch.
      </div>
    `
    return
  }

  let rows = ''
  lowStock.forEach((p) => {
    rows += `
      <tr>
        <td>${p.name}</td>
        <td>${p.tonnage}</td>
        <td>${p.alertLevel}</td>
      </tr>
    `
  })

  alertContainer.innerHTML = `
    <div class="alert alert-warning mb-3">
      <strong>Stock Alerts for ${branch} Branch</strong>
    </div>

    <table class="table table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Product</th>
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
   9. RUN ALL FUNCTIONS WHEN PAGE LOADS
============================================================ */
loadSummaryCards()
loadBranchStockTable()
loadBranchSalesTable()
loadBranchCreditTable()
loadBranchProcurementTable()
loadStockAlerts()

/* ============================================================
   10. LOGOUT FUNCTION
============================================================ */
function logout() {
  localStorage.clear()
  window.location.href = 'login.html'
}
