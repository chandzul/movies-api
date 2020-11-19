const { Upload } = require('../lib/mysql');

class UploadsService {

    constructor() {
        this.collection = 'uploads';
    }

    async createUpload(data) {
        const upload = await  Upload.create(data);
        return upload || [];
    }
}

module.exports = UploadsService;
