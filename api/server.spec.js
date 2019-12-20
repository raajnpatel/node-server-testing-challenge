const request = require("supertest");
const server = require("./server");

describe("Running Server", () => {
    describe("GET /", () => {
        it("returns 200 OK & type is JSON", () => {
            return request(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res.type).toMatch(/json/i);
                });
        });
    });
    describe("GET Teams /", () => {
        it("returns an array of teams", async () => {
            const expected = [{ team: "Lakers" }];
            const res = await request(server).get("/teams");
            expect(res.body).toEqual(expect.arrayContaining(expected));
            expect(res.body.length).toEqual(3);
        });
    });
    describe("POST Teams/", () => {
        it("returns team added successfully", async () => {
            const newTeam = { team: "Rockets" };
            const res = await request(server)
                .post("/teams")
                .send(newTeam);
            expect(res.status).toBe(201);
            //Retreive the team added
            const expected = [{ team: "Rockets" }];
            const nextres = await request(server).get("/teams");
            expect(nextres.body).toEqual(expect.arrayContaining(expected));
        });
        it("POST request checks if there is no data", async () => {
            const res = await request(server).post("/teams");
            expect(res.status).toBe(401);
        });
    });
    describe("Delete a Team", () => {
        it("returns team is successfully deleted and Checks new length", async () => {
            const deleteTeam = { team: "Clippers" };
            const res = await request(server)
                .delete("/teams")
                .send(deleteTeam);

            expect(res.status).toBe(201);
            const expected = [{ team: "Clippers" }];
            const newres = await request(server).get("/teams");
            expect(newres.body).toEqual(expect.not.arrayContaining(expected));
        });
        it("Delete request checks if there is no team", async () => {
            const res = await request(server).delete("/teams");
            expect(res.status).toBe(401);
        });
    });
});