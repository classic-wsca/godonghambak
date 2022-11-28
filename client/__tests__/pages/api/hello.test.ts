import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks, RequestMethod } from 'node-mocks-http';

import handler from '~pages/api/hello';

describe('/api/hello', () => {
  const mockRequestResponse = (method: RequestMethod) => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method,
    });

    req.headers = {
      'content-type': 'application/json',
    };

    return { req, res };
  };

  it('should return a successful response', async () => {
    const { req, res } = mockRequestResponse('GET');

    handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.statusMessage).toEqual('OK');
    expect(res._getJSONData()).toEqual({ name: 'John Doe' });
  });
});
