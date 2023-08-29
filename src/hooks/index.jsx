// Hooks
import { useEffect, useState } from 'react'

// Data Tools
import { EntityFactory } from '../data/EntityFactory'

export function useData(json_data, entityFormat) {
    const [data, setData] = useState({})

    useEffect(() => {
        if (!json_data) return

        setData(new EntityFactory(json_data.data, entityFormat))
    }, [entityFormat, json_data])

    return { data }
}
