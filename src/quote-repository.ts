import {
    RepositoryAccessOptions,
    Repository,
} from '@ournet/domain';

import { Quote } from './quote';
import { QuoteTopicRelation } from './quote-topic';

export interface QuotesQueryParams {
    lang: string
    country: string
    lastFoundAt?: string
}

export interface LatestQuotesQueryParams extends QuotesQueryParams {
    limit: number
}

export interface LatestQuotesByAuthorQueryParams extends LatestQuotesQueryParams {
    authorId: string
}

export interface LatestQuotesByTopicQueryParams extends LatestQuotesQueryParams {
    topicId: string
    relation?: QuoteTopicRelation
}

export interface CountQuotesQueryParams extends QuotesQueryParams {
    // period: ?
}

export interface CountQuotesByAuthorQueryParams extends CountQuotesQueryParams {
    authorId: string
}

export interface CountQuotesByTopicQueryParams extends CountQuotesQueryParams {
    topicId: string
    relation?: QuoteTopicRelation
}

export interface QuoteRepository extends Repository<Quote> {
    latest(params: LatestQuotesQueryParams, options?: RepositoryAccessOptions<Quote>): Promise<Quote[]>
    latestByTopic(params: LatestQuotesByTopicQueryParams, options?: RepositoryAccessOptions<Quote>): Promise<Quote[]>
    latestByAuthor(params: LatestQuotesByAuthorQueryParams, options?: RepositoryAccessOptions<Quote>): Promise<Quote[]>

    count(params: CountQuotesQueryParams): Promise<number>
    countByTopic(params: CountQuotesByTopicQueryParams): Promise<number>
    countByAuthor(params: CountQuotesByAuthorQueryParams): Promise<number>
}
