import { QuoteTopic } from "./quote-topic";

export interface Quote {
    id: string
    lang: string
    country: string
    /** Source news url */
    source: QuoteSource
    sourcesIds: string[]
    /** Author details */
    author: QuoteAuthor
    text: string

    topics?: QuoteTopic[]

    lastFoundAt: string
    createdAt: string
    expiresAt: number

    countViews: number
    countSources: number

    popularity?: number

    events?: QuoteEvent[]
}

export type QuoteEvent = {
    title: string
    id: string
    imageId?: string
}

export type QuoteAuthor = {
    name: string
    slug: string
    id: string
}

export type QuoteSource = {
    host: string
    path: string
    title: string
    id: string
    imageId?: string
}

export interface BuildQuoteParams {
    lang: string
    country: string
    /** Source news url */
    source: QuoteSource
    /** Author details */
    author: QuoteAuthor
    topics?: QuoteTopic[]
    text: string

    lastFoundAt?: string
    createdAt?: string
    expiresAt?: number

    countViews?: number

    events?: QuoteEvent[]
}
