import { BuildQuoteParams, Quote } from "./quote";
import { clearText, atonic, md5, uniq } from '@ournet/domain';
import { truncateAt } from "./helpers";
import { QUOTE_TEXT_MAX_LENGTH, QUOTE_EXPIRE_DAYS } from "./config";

export class QuoteHelper {

    static build(params: BuildQuoteParams): Quote {
        const text = truncateAt(params.text.trim(), QUOTE_TEXT_MAX_LENGTH - 1);
        const textHash = QuoteHelper.textHash(text);
        const idHash = md5([params.author.id, textHash].join('|'));
        const id = [params.country.trim(), params.lang.trim(), idHash].join('');

        const lastFoundAt = params.lastFoundAt || new Date().toISOString();
        const createdAt = params.createdAt || lastFoundAt;
        const expiresAt = QuoteHelper.expiresAt(new Date(lastFoundAt));

        const quote: Quote = {
            id,
            text,
            author: params.author,
            source: params.source,
            country: params.country,
            lang: params.lang,
            topics: params.topics,
            createdAt,
            expiresAt,
            lastFoundAt,
            countViews: params.countViews || 0,
            countSources: 1,
            sourcesIds: [params.source.id],
        };

        QuoteHelper.setQuotePopularity(quote);

        return quote;
    }

    static textHash(text: string) {
        return md5(atonic(clearText(text.toLowerCase())));
    }

    static parseLocaleFromId(id: string): { country: string, lang: string } {
        return {
            country: id.substr(0, 2),
            lang: id.substr(2, 2),
        };
    }

    static expiresAt(refDate: Date) {
        const expiresAt = new Date(refDate);
        expiresAt.setDate(expiresAt.getDate() + QUOTE_EXPIRE_DAYS);

        return Math.floor(expiresAt.getTime() / 1000);
    }

    static quotePopularity(quote: Quote) {
        if (quote.sourcesIds && quote.sourcesIds.length > 1) {
            const popularity = uniq(quote.sourcesIds).length;
            if (popularity > 1) {
                return popularity;
            }
        }
    }

    static setQuotePopularity(quote: Quote) {
        const popularity = QuoteHelper.quotePopularity(quote);
        if (popularity) {
            quote.popularity = popularity;
        }
        return quote;
    }
}
