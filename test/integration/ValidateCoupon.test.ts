import ValidateCoupon from "../../src/application/useCases/validate_coupon/ValidateCoupon"
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter"
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase"

test('deve validar um cupom de desconto', async () => {
    const connection =  PgPromiseConnectionAdapter.getInstance()
    const couponRepository = new CouponRepositoryDatabase(connection)
    const validateCoupon = new ValidateCoupon(couponRepository)
    const isValid = await validateCoupon.execute("VALE20")
    expect(isValid).toBeTruthy()
})