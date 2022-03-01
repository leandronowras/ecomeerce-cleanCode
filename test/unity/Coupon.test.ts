import Coupon from "../../src/domain/entity/Coupon"

test('Deve criar um cupom de desconto valido', () => {
    const coupon = new Coupon('VALE20', 20)
    const isValid = coupon.isValid()
    expect(isValid).toBeTruthy()
})

test('Deve criar um cupom de desconto invalido', () => {
    const coupon = new Coupon('VALE20', 20, new Date('2021-10-10'))
    const isExpired = coupon.isExpired()
    expect(isExpired).toBeTruthy()
})