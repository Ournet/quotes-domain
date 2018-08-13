import { EntityValidator, Joi } from "@ournet/domain";
import { Quote } from "./quote";
import { QUOTE_TEXT_MIN_LENGTH, QUOTE_TEXT_MAX_LENGTH } from "./config";

export class QuoteValidator extends EntityValidator<Quote> {
    constructor() {
        super({ createSchema, updateSchema });
    }
}

const schema = {
    id: Joi.string().regex(/^[a-z0-9]{36}$/),

    lang: Joi.string().regex(/^[a-z]{2}$/),
    country: Joi.string().regex(/^[a-z]{2}$/),

    source: Joi.object().keys({
        id: Joi.string().min(16).max(40),
        host: Joi.string().min(4).max(100).required(),
        path: Joi.string().min(1).max(800).required(),
        title: Joi.string().min(2).max(200).required(),
    }),

    author: Joi.object().keys({
        id: Joi.string().min(4).max(40).required(),
        name: Joi.string().min(2).max(200).required(),
    }),

    text: Joi.string().min(QUOTE_TEXT_MIN_LENGTH).max(QUOTE_TEXT_MAX_LENGTH),

    topics: Joi.array().items(Joi.object().keys({
        id: Joi.string().min(4).max(40).required(),
        name: Joi.string().min(2).max(200).required(),
        slug: Joi.string().min(2).max(200).required(),
        abbr: Joi.string().min(2).max(50),
        type: Joi.string().valid(['PERSON', 'ORG', 'PLACE', 'PRODUCT', 'WORK']),
        rel: Joi.string().valid(['MENTION']),
    })),

    lastFoundAt: Joi.string().isoDate(),
    createdAt: Joi.string().isoDate(),
    expiresAt: Joi.date().timestamp().raw(),

    countViews: Joi.number().integer().min(0),
};

const createSchema = Joi.object().keys({
    id: schema.id.required(),
    lang: schema.lang.required(),
    country: schema.country.required(),

    source: schema.source.required(),

    author: schema.author.required(),

    text: schema.text.required(),

    topics: schema.topics,

    lastFoundAt: schema.lastFoundAt.required(),
    createdAt: schema.createdAt.required(),
    expiresAt: schema.expiresAt.required(),

    countViews: schema.countViews.required(),
}).required();

const updateSchema = Joi.object().keys({
    id: schema.id.required(),
    set: Joi.object().keys({
        source: schema.source,
        topics: schema.topics,

        lastFoundAt: schema.lastFoundAt,
        expiresAt: schema.expiresAt,

        countViews: schema.countViews,
    }),
    delete: Joi.array().items(Joi.valid(['topics']))
}).or('set', 'delete').required();
