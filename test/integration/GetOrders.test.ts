import GetOrder from "../../src/application/useCases/get_order/GetOrder"
import GetOrders from "../../src/application/useCases/get_orders/GetOrders"
import PlaceOrder from "../../src/application/useCases/place_order/PlaceOrder"
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter"
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory"
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase"

let placeOrder: PlaceOrder
let orderRepository: OrderRepositoryDatabase
let getOrders: GetOrders

beforeEach(() => {
    const connection = PgPromiseConnectionAdapter.getInstance()
    orderRepository = new OrderRepositoryDatabase(connection)
    const repositoryFactory = new DatabaseRepositoryFactory()
    placeOrder = new PlaceOrder(repositoryFactory)
    getOrders = new GetOrders(repositoryFactory)
})

test('deve obter todos os pedidos', async () => {

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
    await placeOrder.execute(input)
    const getOrdersOutput = await getOrders.execute()
    expect(getOrdersOutput.orders).toHaveLength(1)
})

afterEach(async () => {
    await orderRepository.clear()
})