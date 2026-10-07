/**
 * Helper formatter function for price display in INR xxxx/- format
 * Example: 1499 -> "₹1,499/-"
 */
export function formatPrice(amount: number): string {
  if (amount === undefined || amount === null || isNaN(amount)) return "₹0/-";
  return `₹${amount.toLocaleString("en-IN")}/-`;
}
