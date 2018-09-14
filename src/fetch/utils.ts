
export class ErrorWithResponse extends Error {
  public response: Response;
  constructor(msg: string, response: Response) {
    super(msg);
    this.response = response;
  }
}

export function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error: ErrorWithResponse = new ErrorWithResponse(response.statusText, response);
  throw error;
}

export function parseJson(response: Response) {
  return response.json();
}
