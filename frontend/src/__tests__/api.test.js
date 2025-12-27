import { getData, postData } from "../api/axios";
import { describe, test, expect } from "vitest";
describe("api helpers", () => {
  test("getData returns data", async () => {
    const res = await getData("/hello");
    expect(res).toEqual({ hello: "world" });
  });

  test("postData returns message on success", async () => {
    const res = await postData("/reports", { foo: "bar" });
    expect(res.message).toBe("Report submitted");
  });

  test("postData throws normalized error on failure", async () => {
    await expect(postData("/reports", { fail: true })).rejects.toThrow(
      "Invalid payload"
    );
  });
});
