import { getPort } from "./utils";
import { HonoRequest } from "hono/dist/types";
import { HTTPException } from "hono/http-exception";

class AuthService {
  private port: number = getPort("auth");

  constructor() {}

  public async handle(action: string, req: HonoRequest) {
    const token = req.header("authorization")!;
    
    switch (action) {
      case "verify":
        return await this.isAuthenticated(token);
      case "user":
        return await this.getUser(token)
    }
  }

  private async isAuthenticated(token: string) {
    const url = new URL(`http://127.0.0.1:${this.port}/auth/verify`);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        authorization: token,
      },
    });

    const data = await response.json();

    if (response.status === 401) throw new HTTPException(401, { message: data.message ?? data });

    return undefined;
  }

  private async getUser(token: string) {
    const url = new URL(`http://127.0.0.1:${this.port}/auth/verify`);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        authorization: token,
      },
    });

    const data = await response.json();

    if (response.status === 401) throw new HTTPException(401, { message: data.message ?? data });

    return data.user;
  }
}

export default new AuthService();
