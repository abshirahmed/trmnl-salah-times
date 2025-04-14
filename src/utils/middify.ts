import { logger } from '@/utils/logger';
import { injectLambdaContext } from '@aws-lambda-powertools/logger/middleware';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpEventNormalizer from '@middy/http-event-normalizer';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpResponseSerializer from '@middy/http-response-serializer';
import { Handler } from 'aws-lambda';

export const middify = (handler: Handler) =>
  middy(handler, { timeoutEarlyInMillis: 0, timeoutEarlyResponse: () => {} })
    .use(
      injectLambdaContext(logger, {
        logEvent: true,
      }),
    )
    .use(
      httpErrorHandler({
        logger: (error) => {
          logger.error(error);
        },
      }),
    )
    .use(httpEventNormalizer())
    .use(jsonBodyParser())
    .use(
      httpResponseSerializer({
        serializers: [
          {
            regex: /^application\/json$/,
            serializer: ({ body }) => JSON.stringify(body),
          },
          {
            regex: /^text\/plain$/,
            serializer: ({ body }) =>
              typeof body === 'string' ? body : JSON.stringify(body),
          },
        ],
        defaultContentType: 'application/json',
      }),
    );
