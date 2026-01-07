// Select the procurement form
const procurementForm = document.getElementById('procurement-form')

// Listen for form submission
procurementForm.addEventListener('submit', function (event) {
  // Stop the page from reloading
  event.preventDefault()

  // Collect form values
  const produceName = procurementForm.produceName.value
  const produceType = procurementForm.produceType.value
  const date = procurementForm.date.value
  const time = procurementForm.time.value
  const tonnage = procurementForm.tonnage.value
  const cost = procurementForm.cost.value
  const dealerName = procurementForm.dealerName.value
  const branch = procurementForm.branch.value
  const contact = procurementForm.contact.value
  const salePrice = procurementForm.salePrice.value

  // Basic validation
  if (produceType.length < 2) {
    alert('Type of produce must be at least 2 letters')
    return
  }

  if (tonnage < 1000) {
    alert('Tonnage must be at least 1000 kg (1 ton)')
    return
  }

  if (cost.length < 5) {
    alert('Cost must be at least 5 digits')
    return
  }

  if (!/^[0-9]{10}$/.test(contact)) {
    alert('Contact must be a valid 10-digit phone number')
    return
  }

  // If everything is valid
  alert('Procurement recorded successfully!')
})

/*=================
    SALES PRODUCE
  =================*/
// Select the selling form
const sellingForm = document.getElementById('selling-form')

sellingForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const sellProduceName = sellingForm.sellProduceName.value
  const sellTonnage = sellingForm.sellTonnage.value
  const amountPaid = sellingForm.amountPaid.value
  const buyerName = sellingForm.buyerName.value
  const salesAgent = sellingForm.salesAgent.value
  const sellDate = sellingForm.sellDate.value
  const sellTime = sellingForm.sellTime.value

  if (amountPaid.length < 5) {
    alert('Amount paid must be at least 5 digits')
    return
  }

  if (buyerName.length < 2) {
    alert('Buyer name must be at least 2 characters')
    return
  }

  if (salesAgent.length < 2) {
    alert('Sales agent name must be at least 2 characters')
    return
  }

  alert('Sale recorded successfully!')
})

/*=================
    CREDIT SAES
  =================*/
// Select the credit sales form
const creditForm = document.getElementById('credit-form')

creditForm.addEventListener('submit', function (event) {
  event.preventDefault()

  const buyerName = creditForm.creditBuyerName.value
  const nin = creditForm.creditNIN.value
  const location = creditForm.creditLocation.value
  const contact = creditForm.creditContact.value
  const amountDue = creditForm.creditAmountDue.value
  const salesAgent = creditForm.creditSalesAgent.value
  const dueDate = creditForm.creditDueDate.value
  const produceName = creditForm.creditProduceName.value
  const produceType = creditForm.creditProduceType.value
  const tonnage = creditForm.creditTonnage.value
  const dispatchDate = creditForm.creditDispatchDate.value

  if (buyerName.length < 2) {
    alert('Buyer name must be at least 2 characters')
    return
  }

  if (!/^[0-9]{10}$/.test(contact)) {
    alert('Contact must be a valid 10-digit phone number')
    return
  }

  if (amountDue.length < 5) {
    alert('Amount due must be at least 5 digits')
    return
  }

  if (salesAgent.length < 2) {
    alert('Sales agent name must be at least 2 characters')
    return
  }

  alert('Credit sale recorded successfully!')
})
