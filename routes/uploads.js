const express = require('express');

const multer = require('multer');
const { v4: uuid } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, `${uuid()}-${originalname}`)
    }
});
// const upload = multer({ dest: 'uploads/' });
const upload = multer({ storage: storage });

// upload.single('reports'),

function uploadsApi(app) {
    const router = express.Router();
    app.use('/api/uploads', router);

    router.post(
        '/',
        upload.array('reports'),
        async (req, res, next) => {
        try {
            console.log(req.files, req.body);

            res.status(200).json({
                status: 'succes',
                message: 'files upload',
                data: req.files.length
            });
        } catch (e) {
            next(e);
        }
    });
}

module.exports = uploadsApi;
