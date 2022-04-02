import axios from 'axios'
import PlaceOrder from '../../src/application/useCases/place_order/PlaceOrder'
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter'
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory'
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase'

let placeOrder: PlaceOrder
let orderRepository: OrderRepositoryDatabase

beforeEach(() => {
    const connection = PgPromiseConnectionAdapter.getInstance()
    orderRepository = new OrderRepositoryDatabase(connection)
    const repositoryFactory = new DatabaseRepositoryFactory()
    placeOrder = new PlaceOrder(repositoryFactory)
})

test('Deve testar a api /orders (POST)', async () => {
    const response = await axios({
        url: "http://localhost:3000/orders",
        method: "post",
        data: {
            cpf: '060.433.151-73',
            orderItems: [
                { idItem: 1, quantity: 1},
                { idItem: 2, quantity: 1},
                { idItem: 3, quantity: 3},
            ],
            date: new Date('2021-10-10'),
            coupon: 'VALE20'
        }
    })
    const order = response.data
    expect(order.total).toBe(138)
})

test('Deve testar a api /simulateFreight', async () => {
    const response = await axios({
        url: "http://localhost:3000/simulateFreight",
        method: "post",
        data: {
            items: [
                { idItem: 1, quantity: 1},
                { idItem: 2, quantity: 1},
                { idItem: 3, quantity: 3},
            ]          
        }
    })
    const output = response.data
    expect(output.amount).toBe(260)
})

test('Deve testar a api /orders (GET)', async () => {
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

    const response = await axios({
        url: "http://localhost:3000/orders",
        method: "get"
    })
    const orders = response.data
    expect(orders.orders).toHaveLength(1)
})


test('Deve testar a api /orders/code (GET)', async () => {
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

    const response = await axios({
        url: "http://localhost:3000/orders/2021000001",
        method: "get"
    })
    const orders = response.data
    expect(orders.code).toBe('2021000001')
})

afterEach(async () => {
    await orderRepository.clear()
})