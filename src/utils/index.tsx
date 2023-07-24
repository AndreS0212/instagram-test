export const formatNumber = (number: number): string => {
    if (number >= 1000000) {
        // Formato en millones
        return (number / 1000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "M";
    } else if (number >= 1000) {
        // Formato en miles
        return (number / 1000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "K";
    } else {
        // Número sin formato
        return number.toString();
    }
}
