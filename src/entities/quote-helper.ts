import { BuildQuoteParams, Quote } from "./quote";
import { cleanText, atonic, md5 } from '@ournet/domain';
import { truncateAt } from "../helpers";
import { QUOTE_TEXT_MAX_LENGTH, QUOTE_EXPIRE_DAYS } from "../config";

export class QuoteHelper {

    static build(params: BuildQuoteParams): Quote {
        const text = truncateAt(params.text.trim(), QUOTE_TEXT_MAX_LENGTH);
        const textHash = QuoteHelper.textHash(text);
        const id = md5([params.lang.trim(), params.country.trim(), textHash, params.author.id].join('|'));

        const lastFoundAt = params.lastFoundAt || new Date();
        const createdAt = params.createdAt || lastFoundAt;
        const expiresAt = QuoteHelper.expiresAt(lastFoundAt);

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
            lastFoundAt,
        };

        return quote;
    }

    static textHash(text: string) {
        return md5(atonic(cleanText(text.toLowerCase())));
    }

    static expiresAt(refDate: Date) {
        const expiresAt = new Date(refDate);
        expiresAt.setDate(expiresAt.getDate() + QUOTE_EXPIRE_DAYS);

        return expiresAt;
    }
}
