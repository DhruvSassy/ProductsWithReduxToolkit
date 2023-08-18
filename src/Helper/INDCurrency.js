

const INDCurrency = (value) => {
  return Number(value).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
};

export default INDCurrency;
