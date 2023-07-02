# fetcha!

## comparison

- fetch

```typescript
fetch("https://example.com/api", {
  method: "POS", // typo
  headers: {
    "Content-Typ": "application/jso", // typo
    Authorization: `Bearer ${"foo"}`,
  },
  credentials: "include",
  mode: "no-cors",
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
  .catch(({ id }: { id: number }) => console.log(id))
  .catch((e) => alert(e.message));
```

- fetcha!

```typescript
fetcha("https://example.com/api")
  .contentType("application/json")
  .header("Authrization", `Bearer ${"foo"}`)
  .credentials("include")
  .mode("no-cors")
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

## examples

- /src/example.ts

## fetcha methods

| methods                                          | type      | description |
| ------------------------------------------------ | --------- | ----------- |
| `url(url: string \| URL \| Request)`             | setting   |             |
| `origin(origin?: string \| URL)`                 | setting   |             |
| `header(name: string, value?: string)`           | setting   |             |
| `contentType(mime: "application/json" \| "")`    | setting   |             |
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
| `post(body?: BodyInit \| Json)`                  | execution |             |
| `patch(body?: BodyInit \| Json)`                 | execution |             |
| `put(body?: BodyInit \| Json)`                   | execution |             |
| `head()`                                         | execution |             |
| `delete()`                                       | execution |             |

## fetcha Error

constructor:

`constructor({ message, request, response }: FetchaErrorProps, options?: ErrorOptions)`

| properties                                                  | description       |
| ----------------------------------------------------------- | ----------------- |
| `request: RequestInit & { url?: string \| URL \| Request }` | request and url   |
| `response?: Response`                                       | original response |
| `headers?: Headers`                                         | of response       |
| `ok?: boolean`                                              | of response       |
| `redirected?: boolean`                                      | of response       |
| `status?: number`                                           | of response       |
| `statusText?: string`                                       | of response       |
| `type?: ResponseType`                                       | of response       |
| `url?: string`                                              | of response       |
| `body?: ReadableStream<Uint8Array> \| null`                 | of response       |
| `bodyUsed?: boolean`                                        | of response       |
