import {
    ReadRepository,
    WriteRepository,
    RepositoryAccessOptions,
} from '@ournet/domain';

import { Quote } from './quote';

export interface QuotesQueryParams {
    lang: string
    country: string
    limit: number
}

export interface LatestQuotesQueryParams extends QuotesQueryParams {
    lastFoundAt?: Date
}

export interface LatestQuotesByAuthorQueryParams extends QuotesQueryParams {
    lastFoundAt?: Date
    authorId: string
}

export interface LatestQuotesByTopicQueryParams extends QuotesQueryParams {
    lastFoundAt?: Date
    topicId: string
}

export interface QuoteReadRepository extends ReadRepository<Quote> {
    latest(params: LatestQuotesQueryParams, options?: RepositoryAccessOptions<Quote>): Promise<Quote>
    latestByTopic(params: LatestQuotesByTopicQueryParams, options?: RepositoryAccessOptions<Quote>): Promise<Quote>
    latestByAuthor(params: LatestQuotesByAuthorQueryParams, options?: RepositoryAccessOptions<Quote>): Promise<Quote>
}

export interface QuoteWriteRepository extends WriteRepository<Quote> {
}

export interface QuoteRepository extends QuoteReadRepository, QuoteWriteRepository { }
