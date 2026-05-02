const mockPayment = async (amount) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const success = Math.random() > 0.2;
      resolve({
        success,
        transactionId: success ? `txn_${Date.now()}` : null,
        message: success ? 'Payment successful' : 'Payment failed'
      });
    }, 1000);
  });
};

module.exports = { mockPayment };
