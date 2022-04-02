export default class GetOrderOutput {
    orders: {code: string, total: number}[];
    constructor(
    ){
        this.orders = []
    }

    addOrder(code: string, total: number) {
        this.orders.push({
            code, total
        })
    }
}