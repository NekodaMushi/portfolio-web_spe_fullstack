// types/node-mocks-http.d.ts
declare module 'node-mocks-http' {
  import { IncomingHttpHeaders } from 'http';
  import { Readable } from 'stream';
  
  type Method =
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'OPTIONS'
    | 'HEAD';

  interface MockRequestOptions {
    method?: Method;
    url?: string;
    headers?: IncomingHttpHeaders;
    body?: any;
    query?: any;
    cookies?: { [key: string]: any };
  }

  interface MockResponseOptions {
    eventEmitter?: any;
    writableStream?: any;
  }

  interface MockRequest<Body = any> extends Readable {
    method: Method;
    url: string;
    headers: IncomingHttpHeaders;
    body: Body;
    cookies: { [key: string]: any };
    query: any;
  }

  interface MockResponse<Body = any> extends Readable {
    statusCode: number;
    _getData(): Body;
    _isEndCalled(): boolean;
    _getJSONData(): Body;
    _getBuffer(): Buffer;
  }

  export function createRequest<Body = any>(options?: MockRequestOptions): MockRequest<Body>;
  export function createResponse<Body = any>(options?: MockResponseOptions): MockResponse<Body>;
  export function createMocks<Body = any>(
    reqOptions?: MockRequestOptions,
    resOptions?: MockResponseOptions
  ): { req: MockRequest<Body>; res: MockResponse<Body> };
}
