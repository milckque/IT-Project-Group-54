import type { BuyingGroup, BuyingGroupRaw } from '../types/api';

export function coerceGroupType(group: BuyingGroupRaw): BuyingGroup {
    const tempGroup = {
        id: group.id,
        location: group.location,
        active: group.active,
        created_at: group.created_at,
        product: group.Products,
    };
    return tempGroup as unknown as BuyingGroup;
}