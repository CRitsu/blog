
export class ErrorWithResponse extends Error {
  public response: Response;
  constructor(msg: string, response: Response) {
    super(msg);
    this.response = response;
  }
}

export function checkStatus(response: Response) {
  const status = response.status;
  if ((status >= 200 && status < 300) || status === 304) {
    return response;
  }
  throw new ErrorWithResponse(response.statusText, response);
}

export function parseJson(response: Response) {
  return response.json();
}

export function catchError(error: ErrorWithResponse) {
  return error.response.status;
}
