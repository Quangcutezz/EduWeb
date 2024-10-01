const CurrencyFormatter = ({ amount }: { amount: number }) => {
    const formattedAmount = amount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return <span className="text-orange-500">{formattedAmount}</span>;
};

export default CurrencyFormatter;
