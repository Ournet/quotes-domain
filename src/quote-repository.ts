import {
    RepositoryAccessOptions,
    Repository,
} from '@ournet/domain';

import { Quote } from './quote';

export interface QuotesQueryParams {
    lang: string
    country: string
    limit: number
}

export interface LatestQuotesQueryParams extends QuotesQueryParams {
    lastFoundAt?: string
}

export interface LatestQuotesByAuthorQueryParams extends QuotesQueryParams {
    lastFoundAt?: string
    authorId: string
}

export interface LatestQuotesByTopicQueryParams extends QuotesQueryParams {
    lastFoundAt?: string
    topicId: string
}

export interface QuoteRepository extends Repository<Quote> {
    latest(params: LatestQuotesQueryParams, options?: RepositoryAccessOptions<Quote>): Promise<Quote[]>
    latestByTopic(params: LatestQuotesByTopicQueryParams, options?: RepositoryAccessOptions<Quote>): Promise<Quote[]>
    latestByAuthor(params: LatestQuotesByAuthorQueryParams, options?: RepositoryAccessOptions<Quote>): Promise<Quote[]>
}
