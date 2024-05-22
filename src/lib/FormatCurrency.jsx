function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat("ID", {
    style: "currency",
    currency: "IDR",
  });
  return formatter.format(amount);
}

export { formatCurrency };
