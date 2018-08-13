
export type QuoteTopicType = 'PERSON' | 'ORG' | 'PLACE' | 'PRODUCT' | 'WORK';
export type QuoteTopicRelation = 'MENTION';

export interface QuoteTopic {
    id: string
    name: string
    slug: string
    abbr?: string
    type?: QuoteTopicType
    rel?: QuoteTopicRelation
}
