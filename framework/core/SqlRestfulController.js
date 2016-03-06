class SqlRestfulController {
    constructor(urlExtention, model) {
        this.url = urlExtention;
        this.model = model;
    }
    onGet(req, resp, next) {
        (new this.model({
            id: req.params.id
        }))
            .fetch()
            .then(function (model) {
            resp.json(model);
        });
    }
    onPut(req, resp, next) {
        (new this.model({ id: req.params.id }))
            .save(req.body)
            .then(function (model) {
            resp.json(model);
        });
    }
    onPost(req, resp, next) {
        (new this.model(req.body))
            .save()
            .then(function (model) {
            resp.json(model);
        });
    }
    onList(req, resp, next) {
        this.model.fetchAll()
            .then(function (models) {
            resp.json(models);
        });
    }
    onQuery(req, resp, next) {
        this.model.where(req.body)
            .then(function (models) {
            resp.json(models);
        });
    }
    onDelete(req, resp, next) {
        (new this.model({ id: req.params.id }))
            .destroy()
            .then(function (model) {
            resp.json(model);
        });
    }
    onInstall(router) {
        router.get(this.url, this.onGet.bind(this));
        router.get(this.url.replace(/:id/, 'list'), this.onList.bind(this));
        router.put(this.url, this.onPut.bind(this));
        router.post(this.url.replace(/:id/, 'create'), this.onPost.bind(this));
        router.post(this.url.replace(/:id/, 'query'), this.onQuery.bind(this));
        router.delete(this.url, this.onDelete.bind(this));
    }
}
exports.SqlRestfulController = SqlRestfulController;
//# sourceMappingURL=SqlRestfulController.js.map