import {expect} from 'chai';
import {agent as request} from 'supertest';
import app from '../src/app';
import StatusCodes from 'http-status-codes';

const {OK} = StatusCodes;

describe("Index test", () => {
    it("should always pass", () => {
        expect(true).to.be.equal(true);
    });

    it("should pass if app comes up correctly", async () => {
        const res = await request(app).get("/");
    
        expect(res.status).to.equal(OK);
        expect(res.headers["content-type"]).to.contain("text/html");
        expect(res.text).not.to.be.empty;
    });
});