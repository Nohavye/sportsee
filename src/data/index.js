import apiRoutes from './apiConstants'
import { EntityFormats, EntityFactory } from './EntityFactory'

const entity = {
    formats: EntityFormats,
    create: (data, entityFormat) => {
        return new EntityFactory(data, entityFormat)
    },
}

export { apiRoutes, entity }
