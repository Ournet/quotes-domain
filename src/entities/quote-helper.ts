import { BuildQuoteParams, Quote } from "./quote";
import { sha1, cleanText, atonic, md5 } from '@ournet/domain';
import { truncateAt } from "../helpers";
import { QUOTE_TEXT_MAX_LENGTH, QUOTE_EXPIRE_DAYS } from "../config";

export class QuoteHelper {

    static build(params: BuildQuoteParams): Quote {
        const text = truncateAt(params.text.trim(), QUOTE_TEXT_MAX_LENGTH);
        const textHash = QuoteHelper.textHash(text);
        const id = md5([params.lang.trim(), params.country.trim(), textHash, params.author.id].join('|'));

        const createdAt = params.createdAt || new Date();
        const expiresAt = QuoteHelper.expiresAt(createdAt);

        const quote: Quote = {
            id,
            text,
            author: params.author,
            source: params.source,
            country: params.country,
            lang: params.lang,
            topics: params.topics,
            topicsLocation: params.topicsLocation,
            createdAt,
            expiresAt,
        };

        return quote;
    }

    static textHash(text: string) {
        return sha1(atonic(cleanText(text.toLowerCase())));
    }

    static expiresAt(createdAt: Date) {
        const expiresAt = new Date(createdAt);
        expiresAt.setDate(expiresAt.getDate() + QUOTE_EXPIRE_DAYS);

        return expiresAt;
    }
}
