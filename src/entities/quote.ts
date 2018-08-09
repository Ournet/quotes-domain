import { Topic, TopicLocationMap } from "./topic";

export interface Quote {
    id: string
    lang: string
    country: string
    /** Source news url */
    source: QuoteSource
    /** Author details */
    author: QuoteAuthor
    /** Phrases hashes */
    hashes: string[]
    /** Parent quote id. This quote is part of a longer one, that's the parent. */
    parentId?: string
    /** Quote's summary */
    summary: string

    topics?: Topic[]
    topicsLocation?: TopicLocationMap

    hasText: boolean
}

export type QuoteAuthor = {
    name: string
    id?: string
}

export type QuoteSource = {
    host: string
    path: string
    title: string
    id?: string
}

export interface QuoteText {
    id: string
    text: string
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
}
