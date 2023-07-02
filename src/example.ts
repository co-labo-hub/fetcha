import { FetchaError } from "./FetchaError";
import { fetcha } from "./fetcha";

(async () => {
  fetcha("/get?value=get")
    .origin("https://httpbin.org")
    .get()
    .then((resp) => resp.toJson<{ args: { value: string } }>())
    .then(({ args }) => console.log("get", args.value === "get"))
    .catch((e) => console.error("get", e));

  /*
  fetcha('/get?value=head')
    .origin('https://httpbin.org')
    .head()
    .then(resp => console.log('head', resp.headers))
    .catch(console.error);
    */

  await new Promise((resolve) => setTimeout(resolve, 1000));

  fetcha("/delete?value=delete")
    .origin("https://httpbin.org")
    .delete()
    .then((resp) => resp.toJson<{ args: { value: string } }>())
    .then(({ args }) => console.log("delete", args.value === "delete"))
    .catch((e) => console.error("delete", e));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  fetcha("/post")
    .origin("https://httpbin.org")
    .contentType("application/json")
    .post({ value: "post" })
    .then((resp) => resp.toJson<{ json: { value: string } }>())
    .then(({ json }) => console.log("post", json.value === "post"))
    .catch((e) => console.error("post", e));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const form = new URLSearchParams();
  form.set("name", "foo");
  fetcha("/post")
    .origin("https://httpbin.org")
    .post(form)
    .then((resp) => resp.toJson<{ form: { name: string } }>())
    .then(({ form }) => console.log("post(form)", form.name === "foo"))
    .catch((e) => console.error("post(form)", e));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  fetcha("/put")
    .origin("https://httpbin.org")
    .contentType("application/json")
    .put({ value: "put" })
    .then((resp) => resp.toJson<{ json: { value: string } }>())
    .then(({ json }) => console.log("put", json.value === "put"))
    .catch((e) => console.error("put", e));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  fetcha("/patch")
    .origin("https://httpbin.org")
    .contentType("application/json")
    .patch({ value: "patch" })
    .then((resp) => resp.toJson<{ json: { value: string } }>())
    .then(({ json }) => console.log("patch", json.value === "patch"))
    .catch((e) => console.error("patch", e));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  fetcha("/basic-auth/foo/bar")
    .origin("https://httpbin.org")
    .header("Authorization", `Basic ${btoa("foo:bar")}`)
    .get()
    .then((resp) => resp.toJson<{ authenticated: boolean }>())
    .then(({ authenticated }) => console.log("basic-auth", authenticated))
    .catch((e) => console.error("basic-auth", e));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  fetcha("/bearer")
    .origin("https://httpbin.org")
    .header("Authorization", `Bearer ${"foo"}`)
    .get()
    .then((resp) => resp.toJson<{ authenticated: boolean }>())
    .then(({ authenticated }) => console.log("bearer", authenticated))
    .catch((e) => console.error("bearer", e));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  fetcha("/status/500")
    .origin("https://httpbin.org")
    .get()
    .then((resp) => resp.toJson())
    .then((data) => console.error(data))
    .catch((e: FetchaError) => console.log("500", e.status === 500));
})();
