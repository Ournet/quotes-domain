
export type TopicType = 'PERSON' | 'ORG' | 'PLACE' | 'PRODUCT' | 'WORK';

export interface Topic {
    id: string
    name: string
    slug: string
    abbr?: string
    type?: TopicType
}

export type TopicLocationMap = {
    [key: string]: {
        index: number
        length: number
    }
}
