
/**
 * Define error class.
 */
export class ErrorWithResponse extends Error {
  public response: Response;
  constructor(msg: string, response: Response) {
    super(msg);
    this.response = response;
  }
}


/**
 * Check status.
 * - between 200 and 300 or equals to 304 is ok
 * - otherwise throw error
 * @param response response
 */
export function checkStatus(response: Response) {
  const status = response.status;
  if ((status >= 200 && status < 300) || status === 304) {
    return response;
  }
  throw new ErrorWithResponse(response.statusText, response);
}


/**
 * Simply convert response data to json format.
 * @param response response
 */
export function parseJson(response: Response) {
  return response.json();
}

