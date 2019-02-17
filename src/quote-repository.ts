import {
    RepositoryAccessOptions,
    Repository,
} from '@ournet/domain';

import { Quote } from './quote';
import { QuoteTopicRelation } from './quote-topic';

export interface QuotesQueryParams {
    lang: string
    country: string
    maxDate?: string
    minDate?: string
    // afterKey?: string
}

export interface ListQuotesQueryParams extends QuotesQueryParams {
    limit: number
}

export interface ListQuotesByAuthorQueryParams extends ListQuotesQueryParams {
    authorId: string
}

export interface ListQuotesByTopicQueryParams extends ListQuotesQueryParams {
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

export interface TopItem {
    id: string
    count: number
}

export interface QuoteRepository extends Repository<Quote> {
    latest(params: ListQuotesQueryParams, options?: RepositoryAccessOptions<Quote>): Promise<Quote[]>
    latestByTopic(params: ListQuotesByTopicQueryParams, options?: RepositoryAccessOptions<Quote>): Promise<Quote[]>
    latestByAuthor(params: ListQuotesByAuthorQueryParams, options?: RepositoryAccessOptions<Quote>): Promise<Quote[]>

    count(params: CountQuotesQueryParams): Promise<number>
    countByTopic(params: CountQuotesByTopicQueryParams): Promise<number>
    countByAuthor(params: CountQuotesByAuthorQueryParams): Promise<number>

    // popularQuotes(params: ListQuotesQueryParams, options?: RepositoryAccessOptions<Quote>): Promise<Quote[]>
    // popularQuotesByTopic(params: ListQuotesByTopicQueryParams, options?: RepositoryAccessOptions<Quote>): Promise<Quote[]>
    popularQuotesByAuthor(params: ListQuotesByAuthorQueryParams, options?: RepositoryAccessOptions<Quote>): Promise<Quote[]>

    // countPopularQuotes(params: CountQuotesQueryParams): Promise<number>
    // countPopularQuotesByTopic(params: CountQuotesByTopicQueryParams): Promise<number>
    countPopularQuotesByAuthor(params: CountQuotesByAuthorQueryParams): Promise<number>

    /**
     * Top topics in a period. Expensive operation. Cache required!
     * @param params Filter params
     */
    topTopics(params: ListQuotesQueryParams): Promise<TopItem[]>
    /**
     * Top authors in a period. Expensive operation. Cache required!
     * @param params Filter params
     */
    topAuthors(params: ListQuotesQueryParams): Promise<TopItem[]>

    /**
     * Top author`s topics in a period. Expensive operation. Cache required!
     * @param params Filter params
     */
    topAuthorTopics(params: ListQuotesByAuthorQueryParams): Promise<TopItem[]>
}
