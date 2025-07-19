


export default function FormatCurrency(amount:number){
    const value = Math.floor(amount);

    return new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD',
        maximumFractionDigits:0,
    }).format(value)

}