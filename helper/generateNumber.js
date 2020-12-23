function generateInvoice(insurance) {
  // Get last invoice number
  const lastInvoiceNumber =
    insurance.length > 0 ? insurance[insurance.length - 1].invoice.invoice_number : null;
  const temp = lastInvoiceNumber ? lastInvoiceNumber.split('.') : null;

  // Create Cutome Invoice Number
  const pattern = '00000';
  const number = temp ? Number(temp[2]) + 1 : 1;
  const invoiceNumber = `K.001.${(pattern + number).slice(-5)}`;
  return invoiceNumber;
}

function generatePolicy(insurance) {
  // Get last invoice number
  insurance.sort((a, b) => a.policy.policy_number - b.policy.policy_number);
  console.log(insurance);

  const lastInvoiceNumber =
    insurance.length > 0 ? insurance[insurance.length - 1].policy.policy_number : null;
  const temp = lastInvoiceNumber ? lastInvoiceNumber.split('.') : null;

  // Create Cutome Invoice Number
  const pattern = '00000';
  const number = temp ? Number(temp[2]) + 1 : 1;
  const invoiceNumber = `K.01.001.${(pattern + number).slice(-5)}`;
  return invoiceNumber;
}

module.exports = {
  generateInvoice,
  generatePolicy,
};
