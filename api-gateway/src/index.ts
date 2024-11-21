import { Hono } from "hono";
import { logger } from "hono/logger";
import Controller from "./controller";
import { getPort } from "./utils";

const api = new Hono().basePath("/v1");

api.use(logger());

api.all("*", async (c) => {
  const currentPath = c.req.path.replace("/v1/", "");
  const split = currentPath.split("/");

  const name = split[0] !== "api" ? split[0] : `${split[0]}/${split[1]}`;

  // get rest after name in url
  const baseUri = currentPath.replace(`${name}/`, "");

  const controller = new Controller(name, {
    port: getPort(name),
    baseUri,
    service: split[0] !== "api" ? `${name}:${currentPath.split("/")[1]}` : name,
  });

  return controller.fetch(c);
});

export default {
  port: process.env.PORT!,
  fetch: api.fetch,
};
