


export default function FormatCurrency(amount:number){
    const value = Math.floor(amount);

    return new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD',
        maximumFractionDigits:0,
    }).format(value)

}


export function formatDate(dateStr: string | Date) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}