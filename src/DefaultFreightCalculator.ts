import FreightCalculator from "./FreightCalculator";
import Item from "./domain/entity/Item";

export default class DefaultFreightCalculator implements FreightCalculator {
    calculate(item: Item): number {
        if (!item.width || !item.height || !item.weight || !item.length) return 0
        const freight = (1000 * item.getVolume() * (item.getDensity()/100))
		if (freight < 10) return 10
		return freight    
    }
}