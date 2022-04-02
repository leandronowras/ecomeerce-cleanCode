import OrderDao from "../../application/dao/OrderDAO"
import GetOrder from "../../application/query/get_order/GetOrder"
import RepositoryFactory from "../../domain/factory/RepositoryFactory"
import Connection from "../database/Connection"

export default class GetOrderController {
    constructor(
        readonly orderDAO: OrderDao
    ) {

    }

    async execute(params: any, body: any) {
       const getOrder = new GetOrder(this.orderDAO)
       const getOrderOuput = await getOrder.execute(params.code)
       return getOrderOuput
    }
}