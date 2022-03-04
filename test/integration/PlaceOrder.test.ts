import PlaceOrder from "../../src/application/useCases/place_order/PlaceOrder"
import OrderRepository from "../../src/domain/repository/OrderRepository"
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter"
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase"
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase"
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase"
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory"
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory"
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory"

let placeOrder: PlaceOrder
let orderRepository: OrderRepositoryDatabase

beforeEach(() => {
    const connection = PgPromiseConnectionAdapter.getInstance()
    const itemRepository = new ItemRepositoryDatabase(connection)
     orderRepository = new OrderRepositoryDatabase(connection)
    const couponRepository = new CouponRepositoryDatabase(connection)
    placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository)
})

test('deve fazer um pedido', async () => {

    const input = {
        cpf: '060.433.151-73',
        orderItems: [
            { idItem: 1, quantity: 1},
            { idItem: 2, quantity: 1},
            { idItem: 3, quantity: 3},
        ],
        date: new Date('2021-10-10'),
        coupon: 'VALE20'
    }
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(138)
})

test('deve fazer um pedido com frete', async () => {
  
    const input = {
        cpf: '060.433.151-73',
        orderItems: [
            { idItem: 4, quantity: 1},
            { idItem: 5, quantity: 1},
            { idItem: 6, quantity: 3},
        ],
        date: new Date('2021-10-10'),
        coupon: 'VALE20'
    }
    const output = await placeOrder.execute(input)
    expect(output.total).toBe(5102)
})


test('deve fazer um pedido com codigo', async () => {

    const input = {
        cpf: '060.433.151-73',
        orderItems: [
            { idItem: 4, quantity: 1},
            { idItem: 5, quantity: 1},
            { idItem: 6, quantity: 3},
        ],
        date: new Date('2021-10-10'),
        coupon: 'VALE20'
    }
    const output = await placeOrder.execute(input)
    expect(output.code).toBe('202100000001')
})

afterEach(async () => {
    await orderRepository.clear()
})