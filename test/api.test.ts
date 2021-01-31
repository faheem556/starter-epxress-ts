import { expect } from 'chai';
import {agent as request} from 'supertest';
import app from '../src/app';
import StatusCodes from 'http-status-codes';
import { inspect } from 'util';

const {OK} = StatusCodes;

describe("API Test", () => {
    it("GET /version", async () => {
        const res = await request(app).get("/api/version");

        expect(res.status).to.equal(OK);
        expect(res.body).to.be.not.empty;
        expect(res.body.version).to.not.be.empty;
    });
});