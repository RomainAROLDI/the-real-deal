import { Context } from "hono";
import { BlankEnv, BlankInput } from "hono/dist/types/types";
import { StatusCode } from "hono/utils/http-status";

type options = {
  port: number;
  baseUri: string;
  service?: string;
};

class Controller {
  public name: string;
  private readonly port: number;
  private readonly baseUri: string;
  private readonly service?: string;

  constructor(name: string, options: options) {
    this.name = name;
    this.port = options.port;
    this.baseUri = options.baseUri;
    this.service = options.service;
  }

  public async fetch(c: Context<BlankEnv, any, BlankInput>) {
    const url = this.createURL();
    let body =
      c.req.method !== "GET" && c.req.method !== "HEAD" && c.req.method !== "OPTIONS"
        ? JSON.stringify(await c.req.json())
        : undefined;
    const serviceName = this.service?.split(":")[0];
    const serviceAction = this.service?.split(":")[1]
      ? this.service?.split(":")[1]
      : this.service?.split(":")[0];

    if (this.service) {
      const serviceModule = await import(`./${serviceName}.service.ts`);
      const service = serviceModule.default;

      const result = await service.handle(serviceAction, c.req);

      if (result) body = JSON.stringify(result);
    }

    let init: RequestInit = {
      method: c.req.method,
      headers: c.req.header(),
    };

    if (body) {
      init.body = body;
    }

    console.log(url.toString());
    const response = await fetch(url, init);
    const status = response.status as StatusCode;

    let data;
    if (response.headers.get("content-type")?.includes("application/json")) {
      data = await response.clone().json();
      return c.json(data, status);
    } else {
      data = await response.text();
      return c.text(data, status);
    }
  }

  private createURL() {
    console.log("args: ", this.port, this.name, this.baseUri);
    const url = `http://127.0.0.1:${this.port}/${this.name}/${this.baseUri}`;
    return new URL(url).toString();
  }
}

export default Controller;
