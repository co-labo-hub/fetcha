import type { Json } from "./JsonType";
import { FetchaError } from "./FetchaError";

type Method = "GET" | "POST" | "PATCH" | "PUT" | "HEAD" | "DELETE";

class Fetcha {
  private _url;
  private _origin: string | URL | undefined;
  private headers = new Headers();
  private _body: BodyInit | Json | undefined;
  private _mode: RequestMode | undefined;
  private _credentials: RequestCredentials | undefined;
  private _cache: RequestCache | undefined;
  private _redirect: RequestRedirect | undefined;
  private _referrer: string | undefined;
  private _referrerPolicy: ReferrerPolicy | undefined;
  private _integrity: string | undefined;
  private _keepalive: boolean | undefined;
  private _signal: AbortSignal | undefined;

  constructor(url?: string | URL) {
    this._url = url;
  }
  public url(url: string | URL) {
    this._url = url;
    return this;
  }
  public origin(origin?: string | URL) {
    this._origin = origin;
    return this;
  }
  public header(name: string, value?: string) {
    value ? this.headers.append(name, value) : this.headers.delete(name);
    return this;
  }
  public contentType(mime: "application/json" | "") {
    if (!mime) {
      this.headers.delete("Content-Type");
      return this;
    }
    this.headers.set("Content-Type", mime);
    return this;
  }
  public body(body: BodyInit | Json) {
    this._body = body;
    return this;
  }
  public mode(mode: RequestMode) {
    this._mode = mode;
    return this;
  }
  public credentials(credentials: RequestCredentials) {
    this._credentials = credentials;
    return this;
  }
  public cache(cache: RequestCache) {
    this._cache = cache;
    return this;
  }
  public redirect(redirect: RequestRedirect) {
    this._redirect = redirect;
    return this;
  }
  public referrer(referrer: string) {
    this._referrer = referrer;
    return this;
  }
  public referrerPolicy(referrerPolicy: ReferrerPolicy) {
    this._referrerPolicy = referrerPolicy;
  }
  public integrity(integrity: string) {
    this._integrity = integrity;
    return this;
  }
  public keepalive(keepalive: boolean) {
    this._keepalive = keepalive;
    return this;
  }
  public signal(signal: AbortSignal) {
    this._signal = signal;
    return this;
  }
  public fetch(method: Method = "GET") {
    if (!this._url) throw new FetchaError({ message: "no url" });

    if (this._origin) this._url = new URL(this._url, this._origin);

    const init: RequestInit = { method };
    if (this._body) {
      //@ts-ignore
      init.body = this._body;
      if (init.body instanceof FormData
        || init.body instanceof Blob
        || init.body instanceof URLSearchParams
        /* || scalar value string */) {
          this.contentType("");
      } else if (
        this.headers.get("Content-Type")?.startsWith("application/json") &&
        typeof init.body === "object"
      ) {
        init.body = JSON.stringify(init.body);
      }
    }

    if ([...this.headers.keys()].length) {
      init.headers = this.headers;
    }
    if (this._mode) init.mode = this._mode;
    if (this._credentials) init.credentials = this._credentials;
    if (this._cache) init.cache = this._cache;
    if (this._redirect) init.redirect = this._redirect;
    if (this._referrer) init.referrer = this._referrer;
    if (this._referrerPolicy) init.referrerPolicy = this._referrerPolicy;
    if (this._integrity) init.integrity = this._integrity;
    if (this._keepalive) init.keepalive = this._keepalive;
    if (this._signal) init.signal = this._signal;

    return fetch(this._url, init).then((response) => {
      if (!response.ok) {
        return Promise.reject(
          new FetchaError({
            request: { url: this._url, ...init },
            response,
          })
        );
      }
      const _resp: Response & { toJson: <T>() => Promise<T> } = {
        ...response,
        json: () => response.json(),
        toJson: <T>() => response.json() as Promise<T>,
      };
      return _resp;
    });
  }
  public get() {
    return this.fetch("GET");
  }
  public head() {
    return this.fetch("HEAD");
  }
  public delete() {
    return this.fetch("DELETE");
  }
  public post(body?: BodyInit | Json) {
    if (body) this.body(body);
    return this.fetch("POST");
  }
  public patch(body?: BodyInit | Json) {
    if (body) this.body(body);
    return this.fetch("PATCH");
  }
  public put(body?: BodyInit | Json) {
    if (body) this.body(body);
    return this.fetch("PUT");
  }
}

export const fetcha = (url?: string | URL) => new Fetcha(url);
