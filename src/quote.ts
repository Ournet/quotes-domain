import { QuoteTopic } from "./quote-topic";

export interface Quote {
    id: string
    lang: string
    country: string
    /** Source news url */
    source: QuoteSource
    /** Author details */
    author: QuoteAuthor
    text: string

    topics?: QuoteTopic[]

    lastFoundAt: string
    createdAt: string
    expiresAt: number

    countViews: number
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
    id?: string
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
}
