import { Topic, TopicLocationMap } from "./topic";

export interface Quote {
    id: string
    lang: string
    country: string
    /** Source news url */
    source: QuoteSource
    /** Author details */
    author: QuoteAuthor
    text: string

    topics?: Topic[]
    topicsLocation?: TopicLocationMap

    lastFoundAt: Date
    createdAt: Date
    expiresAt: Date
}

export type QuoteAuthor = {
    name: string
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
    topics?: Topic[]
    topicsLocation?: TopicLocationMap
    text: string

    lastFoundAt?: Date
    createdAt?: Date
    expiresAt?: Date
}
