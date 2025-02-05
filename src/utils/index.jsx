export const generateSelectAmount = (amount) => {
    return Array.from({ length: amount }, (_, index) => {
        const amount = index + 1
        return (
            <option key={amount} value={amount}>
                {amount}
            </option>
        )
    })
}

export const priceFormat = (price) => {
    const rupiahFormat = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
    return rupiahFormat
}

export const delayForLoading = async (promise) => {
    return new Promise(resolve => {
        setTimeout(resolve, 1000);
    }).then(() => promise);
}