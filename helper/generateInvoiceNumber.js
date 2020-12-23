function generateInvoice(policy) {
  // Get last invoice number
  const lastInvoiceNUmber = policy.length > 0 ? policy[policy.length - 1].invoiceNumber : null;
  const temp = lastInvoiceNUmber ? lastInvoiceNUmber.split('.') : null;

  // Create Cutome Invoice Number
  const pattern = '00000';
  const number = temp ? Number(temp[2]) + 1 : 1;
  const invoiceNumber = `K.001.${(pattern + number).slice(-5)}`;
  return invoiceNumber;
}

module.exports = {
  generateInvoice,
};
