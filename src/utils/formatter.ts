export function currencyFormatter(params: { value: string; }) {
    // return '\xA3' + formatNumber(params.value);
    return formatNumber(Number(params.value));
}
function formatNumber(number: number) {
    return Math.floor(number)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}