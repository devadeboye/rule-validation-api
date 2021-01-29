const assert = require('assert');
const chai = require('chai');
const app = require('../app');
const chaiHttp = require('chai-http');

chai.use(chaiHttp)
chai.should();

const gte0 = {
    "rule": {
        "field":"missions",
        "condition":"gte",
        "condition_value":30,
    },
    "data": {
        "name":"John Doe",
        "crew":"foo",
        "age":33,
        "position":"captain",
        "missions":45
    },
};

const gte1 = {
    "rule": {
        "field":"missions",
        "condition":"gte",
        "condition_value":30,
    },
    "data": 20,
};

const gte2 = {
    "ball": {
        "field":"missions",
        "condition":"gte",
        "condition_value":30,
    },
    "eye": {
        "name":"John Doe",
        "crew":"foo",
        "age":33,
        "position":"captain",
        "missions":45
    },
};

const gte3 = {
    "ball": 30,
    "eye": {
        "name":"John Doe",
        "crew":"foo",
        "age":33,
        "position":"captain",
        "missions":45
    },
};

const gte4 = {
    "rule": {
        "field":"missions",
        "condition":"gte",
        "condition_value":30,
    },
    "data": {
        "name":"John Doe",
        "crew":"foo",
        "age":33,
        "position":"captain",
        "missions":20
    },
};

const gte5 = {
    "rule": {
        "field":"missions",
        "condition":"gte",
        "condition_value":30,
    },
    "data": {
        "name":"John Doe",
        "crew":"foo",
        "age":33,
        "position":"captain",
        "missions":30
    },
};

const eq0 = {
    "rule": {
        "field":"missions",
        "condition":"eq",
        "condition_value":30,
    },
    "data": {
        "name":"John Doe",
        "crew":"foo",
        "age":33,
        "position":"captain",
        "missions":30
    },
};

const eq1 = {
    "rule": {
        "field":"missions",
        "condition":"eq",
        "condition_value":30,
    },
    "data": {
        "name":"John Doe",
        "crew":"foo",
        "age":33,
        "position":"captain",
        "missions":"30"
    },
};

const eq2 = {
    "rule": {
        "field":"missions",
        "condition":"eq",
        "condition_value":30,
    },
    "data": {
        "name":"John Doe",
        "crew":"foo",
        "age":33,
        "position":"captain",
        "missions":31
    },
};

const neq0 = {
    "rule": {
        "field":"missions",
        "condition":"neq",
        "condition_value":30,
    },
    "data": {
        "name":"John Doe",
        "crew":"foo",
        "age":33,
        "position":"captain",
        "missions":30
    },
};


describe('user tests', () => {

    it('should pass - rule present', (done) => {
        chai.request(app).post('/validate-rule').send(gte0)
        .end((err, res) => {
            console.log(err)
            res.should.have.status(200);
            done();
        })
    })

    it('should fail - no rule', (done) => {
        chai.request(app).post('/validate-rule').send(gte2)
        .end((err, res) => {
            console.log(res.body.message)
            res.should.have.status(400);
            assert.strictEqual(res.body.status, 'error');
            done();
        })
    })

    it('should fail - invalid data field type', (done) => {
        chai.request(app).post('/validate-rule').send(gte1)
        .end((err, res) => {
            console.log(res.body.message)
            res.should.have.status(400);
            done();
        })
    })

    it('should fail - invalid rule field type', (done) => {
        chai.request(app).post('/validate-rule').send(gte3)
        .end((err, res) => {
            console.log(res.body.message)
            res.should.have.status(400);
            done();
        })
    })

    it('should fail - mission value less than 30', (done) => {
        chai.request(app).post('/validate-rule').send(gte4)
        .end((err, res) => {
            console.log(res.body.message)
            res.should.have.status(400);
            done();
        })
    })

    it('should pass - mission value equals 30', (done) => {
        chai.request(app).post('/validate-rule').send(gte5)
        .end((err, res) => {
            console.log(res.body.message)
            res.should.have.status(200);
            done();
        })
    })

    it('should pass - mission value equals 30', (done) => {
        chai.request(app).post('/validate-rule').send(eq0)
        .end((err, res) => {
            console.log(res.body.message)
            res.should.have.status(200);
            done();
        })
    })

    it('should fail - value type is different', (done) => {
        chai.request(app).post('/validate-rule').send(eq1)
        .end((err, res) => {
            console.log(res.body.message)
            res.should.have.status(400);
            done();
        })
    })

    it('should fail - value is different from rule', (done) => {
        chai.request(app).post('/validate-rule').send(eq2)
        .end((err, res) => {
            console.log(res.body.message)
            res.should.have.status(400);
            done();
        })
    })

    it('should fail - value is equal to rule value', (done) => {
        chai.request(app).post('/validate-rule').send(neq0)
        .end((err, res) => {
            console.log(res.body.message)
            res.should.have.status(400);
            done();
        })
    })


})
