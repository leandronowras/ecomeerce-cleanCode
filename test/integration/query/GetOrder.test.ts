import GetOrder from "../../../src/application/query/get_order/GetOrder"
import PlaceOrder from "../../../src/application/useCases/place_order/PlaceOrder"
import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter"
import DatabaseRepositoryFactory from "../../../src/infra/factory/DatabaseRepositoryFactory"
import OrderRepositoryDatabase from "../../../src/infra/repository/database/OrderRepositoryDatabase"

let placeOrder: PlaceOrder
let orderRepository: OrderRepositoryDatabase
let getOrder: GetOrder

beforeEach(() => {
    const connection = PgPromiseConnectionAdapter.getInstance()
    orderRepository = new OrderRepositoryDatabase(connection)
    const repositoryFactory = new DatabaseRepositoryFactory()
    placeOrder = new PlaceOrder(repositoryFactory)
    getOrder = new GetOrder(connection)
})

test('deve obter um pedido pelo codigo', async () => {

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
    const placeOrderOutput = await placeOrder.execute(input)
    const getOrderOutput = await getOrder.execute(placeOrderOutput.code)
    expect(getOrderOutput.code).toBe('2021000000001')
    expect(getOrderOutput.total).toBe(0)
})

afterEach(async () => {
    await orderRepository.clear()
})