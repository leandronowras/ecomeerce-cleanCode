import PlaceOrder from "../../application/useCases/place_order/PlaceOrder"
import RepositoryFactory from "../../domain/factory/RepositoryFactory"
import Broker from "../broker/Broker"
import DatabaseRepositoryFactory from "../factory/DatabaseRepositoryFactory"

export default class PlaceOrderController {
    constructor(
        readonly repositoryFactory: RepositoryFactory, readonly broker: Broker
    ) {

    }

    async execute(params: any, body: any) {
        const placeOrder = new PlaceOrder(this.repositoryFactory, this.broker)
        const input = body
        input.data = new Date(input.date)
        return await placeOrder.execute(input)
    }
}