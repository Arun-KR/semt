import request from "supertest";
import mongoose from "mongoose";
import { describe, it, expect, vi, afterEach } from "vitest";
import app from "../src/server.js";

describe("Backend API (smoke)", () => {
  it("GET / should return running message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("SeMT Report API Running");
  });

  it("POST /api/reports with invalid body should return 400", async () => {
    const res = await request(app).post("/api/reports").send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Validation failed");
  });

  it("POST /api/reports with valid body should return 201 and reportId", async () => {
    // Mock Mongoose save to avoid DB interactions
    const saveSpy = vi
      .spyOn(mongoose.Model.prototype, "save")
      .mockResolvedValue({ _id: "mockId123" });

    const validPayload = {
      stateName: "State",
      reportingMonth: "2025-12",
      semtTeam: [{ name: "Alice", designation: "Lead" }],
      ongoingProjects: [
        {
          projectName: "Project X",
          currentStage: "Design",
          description: "Desc",
        },
      ],
      proposedActivities: ["Activity1"],
    };

    const res = await request(app).post("/api/reports").send(validPayload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Report submitted successfully");
    expect(res.body).toHaveProperty("reportId", "mockId123");

    saveSpy.mockRestore();
  });

  it("POST /api/reports constructs model with payload shape (mocked model)", async () => {
    vi.resetModules();
    vi.mock("../src/models/report.js", () => {
      class MockReport {
        static lastData = null;
        constructor(data) {
          MockReport.lastData = data;
        }
        async save() {
          return { _id: "mockId789" };
        }
      }
      return { default: MockReport };
    });

    const { default: mockedApp } = await import("../src/server.js");
    const { default: MockReport } = await import("../src/models/report.js");

    const validPayload = {
      stateName: "Kerala",
      reportingMonth: "2025-12",
      semtTeam: [{ name: "Bob", designation: "Member" }],
      ongoingProjects: [
        {
          projectName: "Project Y",
          currentStage: "POC",
          description: "Testing",
        },
      ],
      proposedActivities: ["Activity2"],
    };

    const res = await request(mockedApp)
      .post("/api/reports")
      .send(validPayload);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("reportId", "mockId789");
    expect(MockReport.lastData).toEqual(validPayload);
  });
});
