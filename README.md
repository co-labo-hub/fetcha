# fetcha!

## Comparison

- fetch

```typescript
fetch("https://example.com/api", {
  method: "POS", // typo
  headers: {
    "Content-Typ": "application/jso", // typo
    Authorization: `Bearer ${"foo"}`,
  },
  credentials: "include",
  mode: "cors",
  body: JSON.stringify({ name: "bar" }), // JSON.stringify
})
  .then((resp) => {
    // normal and abnormal.

    if (resp.ok) return resp.json();

    switch (resp.status) {
      case 500:
        location.href = "/500.html";
        return;
      case 404:
        location.href = "/404.html";
        return;
      case 401:
        location.href = "/login.html";
        return;
      default:
        alert(resp.statusText);
    }
  })
  .then(({ id }: { id: number }) => console.log(id))
  .catch((e) => alert(e.message));
```

- fetcha!

```typescript
fetcha("https://example.com/api")
  .contentType("application/json")
  .header("Authrization", `Bearer ${"foo"}`)
  .credentials("include")
  .mode("cors")
  .post({ name: "bar" })
  .then((resp) => resp.toJson<{ id: number }>())
  .then(({id}) => console.(id))
  .catch((e: FetchaError) => {
    switch (e.status) {
      case 500:
        location.href = "/500.html";
        return;
      case 404:
        location.href = "/404.html";
        return;
      case 401:
        location.href = "/login.html";
        return;
      default:
        alert(e.message);
    }
  });
```

## Install

```sh
npm install @co-labo-hub/fetcha
```

```typescript
import { fetcha, FetchaError } from "@co-labo-hub/fetcha";
```

## Examples

- /src/example.ts

## Methods

| methods                                          | type      | description |
| ------------------------------------------------ | --------- | ----------- |
| `url(url: string \| URL)`                        | setting   |             |
| `origin(origin?: string \| URL)`                 | setting   |             |
| `header(name: string, value?: string)`           | setting   | "": delete  |
| `contentType(mime: "application/json" \| "")`    | setting   | "": delete  |
| `body(body: BodyInit \| Json)`                   | setting   |             |
| `mode(mode: RequestMode)`                        | setting   |             |
| `credentials(credentials: RequestCredentials)`   | setting   |             |
| `cache(cache: RequestCache)`                     | setting   |             |
| `redirect(redirect: RequestRedirect)`            | setting   |             |
| `referrer(referrer: string)`                     | setting   |             |
| `referrerPolicy(referrerPolicy: ReferrerPolicy)` | setting   |             |
| `integrity(integrity: string)`                   | setting   |             |
| `keepalive(keepalive: boolean)`                  | setting   |             |
| `signal(signal: AbortSignal)`                    | setting   |             |
| `fetch(method: Method = "GET")`                  | execution |             |
| `get()`                                          | execution |             |
| `head()`                                         | execution |             |
| `delete()`                                       | execution |             |
| `post(body?: BodyInit \| Json)`                  | execution |             |
| `patch(body?: BodyInit \| Json)`                 | execution |             |
| `put(body?: BodyInit \| Json)`                   | execution |             |

## Response

additional properties

| properties  | return     |
| ----------- | ---------- |
| toJson<T>() | Promise<T> |

## Error

FetchaError:
`constructor({ message, request, response }: FetchaErrorProps)`

| properties   | description       | type                                            |
| ------------ | ----------------- | ----------------------------------------------- |
| `request`    | request and url   | RequestInit & { url?: string \| URL }           |
| `response`   | original response | Response \| undefined                           |
| `headers`    | of response       | Headers \| undefined                            |
| `ok`         | of response       | boolean \| undefined                            |
| `redirected` | of response       | boolean \| undefined                            |
| `status`     | of response       | number \| undefined                             |
| `statusText` | of response       | string \| undefined                             |
| `type`       | of response       | ResponseType \| undefined                       |
| `url`        | of response       | string \| undefined                             |
| `body`       | of response       | ReadableStream<Uint8Array> \| null \| undefined |
| `bodyUsed`   | of response       | boolean \| undefined                            |
