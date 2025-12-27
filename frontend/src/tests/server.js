import { rest } from "msw";
import { setupServer } from "msw/node";

const handlers = [
  rest.get("http://localhost:5000/api/hello", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ hello: "world" }));
  }),

  rest.post("http://localhost:5000/api/reports", (req, res, ctx) => {
    const body = req.body;
    if (body && body.fail) {
      return res(ctx.status(400), ctx.json({ message: "Invalid payload" }));
    }
    return res(ctx.status(201), ctx.json({ message: "Report submitted" }));
  }),
];

export const server = setupServer(...handlers);
export { rest };
