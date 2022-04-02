import Connection from "../../../infra/database/Connection";
import OrderDao from "../../dao/OrderDAO";
import GetOrdersOutput from "./GetOrdersOutput";

export default class GetOrders {
    constructor(readonly orderDao: OrderDao) {}

    async execute(): Promise<GetOrdersOutput> {
        const ordersData = await this.orderDao.findAll()
        const getOrdersOutput = new GetOrdersOutput()
        for (const orderData of ordersData) {
            getOrdersOutput.addOrder(orderData.code, orderData.total)
        }
        return getOrdersOutput
    }
}