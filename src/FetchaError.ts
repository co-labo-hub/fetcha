type FetchaErrorProps = {
  message?: string;
  request?: RequestInit & { url?: string | URL | Request };
  response?: Response;
};

export class FetchaError extends Error {
  public request: FetchaErrorProps["request"];
  public response?: Response;
  public headers?: Headers;
  public ok?: boolean;
  public redirected?: boolean;
  public status?: number;
  public statusText?: string;
  public type?: ResponseType;
  public url?: string;
  public body?: ReadableStream<Uint8Array> | null;
  public bodyUsed?: boolean;

  constructor({ message, request, response }: FetchaErrorProps) {
    super(message || response?.statusText);
    this.name = "FetchaError";

    this.request = request;
    this.response = response;
    this.headers = response?.headers;
    this.ok = response?.ok;
    this.redirected = response?.redirected;
    this.status = response?.status;
    this.statusText = response?.statusText;
    this.type = response?.type;
    this.url = response?.url;
    this.body = response?.body;
    this.bodyUsed = response?.bodyUsed;
  }
}
