import { EntityFactory, EntityFormats } from './EntityFactory'

const Entity = {
    formats: EntityFormats,
    create: (data, entityFormat) => {
        return new EntityFactory(data, entityFormat)
    },
}

export default Entity
