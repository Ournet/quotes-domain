import { Quote } from "./quote";
import { QUOTE_TEXT_MIN_LENGTH, QUOTE_TEXT_MAX_LENGTH } from "./config";
import { JoiEntityValidator } from "@ournet/domain";
import Joi = require('joi');

export class QuoteValidator extends JoiEntityValidator<Quote> {
    constructor() {
        super({ createSchema, updateSchema });
    }
}

const schema = {
    id: Joi.string().regex(/^[a-z0-9]{36}$/),

    lang: Joi.string().regex(/^[a-z]{2}$/),
    country: Joi.string().regex(/^[a-z]{2}$/),

    source: Joi.object().keys({
        id: Joi.string().min(16).max(40).required(),
        host: Joi.string().min(4).max(100).required(),
        path: Joi.string().min(1).max(800).required(),
        title: Joi.string().min(2).max(200).truncate(true).required(),
    }),
    sourcesIds: Joi.array().items(Joi.string().min(16).max(40)).unique().min(1).max(100),

    author: Joi.object().keys({
        id: Joi.string().min(4).max(40).required(),
        slug: Joi.string().min(2).max(100).required(),
        name: Joi.string().min(2).max(200).required(),
    }),

    text: Joi.string().min(QUOTE_TEXT_MIN_LENGTH).max(QUOTE_TEXT_MAX_LENGTH).truncate(true),

    topics: Joi.array().items(Joi.object().keys({
        id: Joi.string().min(4).max(40).required(),
        name: Joi.string().min(2).max(200).required(),
        slug: Joi.string().min(2).max(200).required(),
        abbr: Joi.string().min(2).max(50),
        type: Joi.string().valid(['PERSON', 'ORG', 'PLACE', 'PRODUCT', 'WORK', 'EVENT']),
        rel: Joi.string().valid(['MENTION']),
    })).min(1).max(6).unique(),

    lastFoundAt: Joi.string().isoDate(),
    createdAt: Joi.string().isoDate(),
    expiresAt: Joi.date().timestamp().raw(),

    countViews: Joi.number().integer().min(0),
    countSources: Joi.number().integer().min(0),

    popularity: Joi.number().integer(),
};

const createSchema = Joi.object().keys({
    id: schema.id.required(),
    lang: schema.lang.required(),
    country: schema.country.required(),

    source: schema.source.required(),
    sourcesIds: schema.sourcesIds.required(),

    author: schema.author.required(),

    text: schema.text.required(),

    topics: schema.topics,

    lastFoundAt: schema.lastFoundAt.required(),
    createdAt: schema.createdAt.required(),
    expiresAt: schema.expiresAt.required(),

    countViews: schema.countViews.required(),
    countSources: schema.countSources.required(),
    popularity: schema.popularity,
}).required();

const updateSchema = Joi.object().keys({
    id: schema.id.required(),
    set: Joi.object().keys({
        source: schema.source,
        sourcesIds: schema.sourcesIds,
        topics: schema.topics,

        lastFoundAt: schema.lastFoundAt,
        expiresAt: schema.expiresAt,

        countViews: schema.countViews,
        countSources: schema.countSources,

        popularity: schema.popularity,
    }),
    delete: Joi.array().items(Joi.valid(['topics', 'popularity'])),
}).or('set', 'delete').required();
