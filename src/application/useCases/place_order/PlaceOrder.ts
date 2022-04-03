import DefaultFreightCalculator from "../simulate_freight/DefaultFreightCalculator";
import Order from "../../../domain/entity/Order";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import CouponRepository from "../../../domain/repository/CouponRepository";
import ItemRepository from "../../../domain/repository/ItemRepository";
import OrderRepository from "../../../domain/repository/OrderRepository";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";
import OrderPlaced from "../../../domain/event/OrderPlaced";
import Broker from "../../../infra/broker/Broker";

export default class PlaceOrder {
    itemRepository: ItemRepository;
    orderRepository: OrderRepository;
    couponRepository: CouponRepository;
    
    constructor(readonly repositoryFactory: RepositoryFactory, readonly broker: Broker) {
        this.itemRepository = repositoryFactory.createItemRepository()
        this.orderRepository = repositoryFactory.createOrderRepository()
        this.couponRepository = repositoryFactory.createCouponRepository()
    }

    async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        const sequence = await this.orderRepository.count() + 1
        const order = new Order(input.cpf, input.date, new DefaultFreightCalculator(), sequence)
        for (const orderItem of input.orderItems) {
            const item = await this.itemRepository.findById(orderItem.idItem)
            if (!item) throw new Error("Item not found")
            order.addItem(item, orderItem.quantity)
        }
        if (input.coupon) {
            const coupon = await this.couponRepository.findByCode(input.coupon)
            if (coupon) order.addCoupon(coupon)
        }
        await this.orderRepository.save(order)

        await this.broker.publish(new OrderPlaced(order))
        const total = order.getTotal()
        const output = new PlaceOrderOutput(order.getCode(), total)
        return output
    }
}