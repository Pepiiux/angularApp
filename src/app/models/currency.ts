// Example data json: - {"amount":1.0,"base":"MXN","date":"2025-02-25","rates":{"USD":0.04884}}
export interface Currency {
    amount: number;
    base: string;
    date: string;
    rates: string;
}