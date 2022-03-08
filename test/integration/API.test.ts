import axios from 'axios'

test('Deve testar a api /orders', async () => {
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