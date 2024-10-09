import {Location, LocationData} from "../types/api.ts";

export function mapLocations(locations: LocationData[]): Location[] {
    return locations.map(location => ({
        id: location.id,
        name: location.name,
        type: location.type,
        dimension: location.dimension,
    }))
}