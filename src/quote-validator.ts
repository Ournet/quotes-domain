import { EntityValidator, Joi } from "@ournet/domain";
import { Quote } from "./quote";
import { QUOTE_TEXT_MIN_LENGTH, QUOTE_TEXT_MAX_LENGTH } from "./config";

export class QuoteValidator extends EntityValidator<Quote> {
    constructor() {
        super({ createSchema, updateSchema });
    }
}

const schema = {
    id: Joi.string().hex().length(36),

    lang: Joi.string().regex(/^[a-z]{2}$/),
    country: Joi.string().regex(/^[a-z]{2}$/),

    source: Joi.object().keys({
        id: Joi.string().hex().min(16).max(40),
        host: Joi.string().hex().min(4).max(100).required(),
        path: Joi.string().hex().min(1).max(800).required(),
        title: Joi.string().hex().min(2).max(200).required(),
    }),

    author: Joi.object().keys({
        id: Joi.string().hex().min(4).max(40).required(),
        name: Joi.string().hex().min(2).max(200).required(),
    }),

    text: Joi.string().min(QUOTE_TEXT_MIN_LENGTH).max(QUOTE_TEXT_MAX_LENGTH),

    topics: Joi.array().items(Joi.object().keys({
        id: Joi.string().hex().min(4).max(40).required(),
        name: Joi.string().hex().min(2).max(200).required(),
        slug: Joi.string().hex().min(2).max(200).required(),
        abbr: Joi.string().hex().min(2).max(50),
        type: Joi.string().valid(['PERSON', 'ORG', 'PLACE', 'PRODUCT', 'WORK']),
    })),

    topicsLocation: Joi.object()
        .pattern(/^[a-z0-9_-]{4,40}$/,
            Joi.object().keys({
                index: Joi.number().integer().min(0).required(),
                length: Joi.number().integer().min(2).required(),
            })),

    lastFoundAt: Joi.date(),
    createdAt: Joi.date(),
    expiresAt: Joi.date(),

    countViews: Joi.number().integer().min(0),
};

const createSchema: Joi.SchemaMap = {
    id: schema.id.required(),
    lang: schema.lang.required(),
    country: schema.country.required(),

    source: schema.source.required(),

    author: schema.author.required(),

    text: schema.text.required(),

    topics: schema.topics,

    topicsLocation: schema.topicsLocation,

    lastFoundAt: schema.lastFoundAt.required(),
    createdAt: schema.createdAt.required(),
    expiresAt: schema.expiresAt.required(),

    countViews: schema.countViews.required(),
}

const updateSchema: Joi.SchemaMap = {
    id: schema.id.required(),
    source: schema.source,
    author: schema.author,
    text: schema.text,
    topics: schema.topics,
    topicsLocation: schema.topicsLocation,

    lastFoundAt: schema.lastFoundAt,
    expiresAt: schema.expiresAt,

    countViews: schema.countViews,
}
