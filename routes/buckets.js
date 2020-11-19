const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multers3 = require('multer-s3');
const { v4: uuid } = require('uuid');
const path = require('path');

function bucketsApi(app){
    const router = express.Router();
    app.use('/api/buckets', router);

    const s3 = new aws.S3({ apiVersion: "2006-03-01" });

    // aws.config.getCredentials(function(err) {
    //     if (err) console.log(err.stack);
    //     // credentials not loaded
    //     else {
    //         console.log("Access key:", aws.config.credentials.accessKeyId);
    //     }
    // });

    // filtrado de solo archivos aceptados
    const fileFilter = (req, file, cb) => {
        const types = ['application/pdf', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

        // if ( file.mimetype == 'application/pdf' || file.mimetype == 'text/plain' || file.mimetype == 'application/vnd.ms-excel' ) {
        if ( types.includes(file.mimetype) ) {
            // console.log(file.mimetype, types.includes(file.mimetype) )
            cb(null, true);
        } else {
            cb(null, false);
        }
    }

    // s3 nos retorna el zise en bytes
    const limits = { fileSize: 1024 * 1024 * 2 } //1024 * 1024 * 2 = archivos maximo 2MB || 30100=3kb

    const upload = multer({
        storage: multers3({
            s3: s3,
            bucket: 'simvalidation',
            metadata: (req, file, cb) => {
                cb(null, { fieldName: file.fieldname});
            },
            key: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                // console.log(`${uuid()}${ext}`);
                cb(null, `${uuid()}${ext}`);
            }
        }),
        fileFilter: fileFilter,
        limits: limits
    })

    router.post(
        '/',
        upload.array('reports'),
        async (req, res, next) => {
            try{
                console.log('body: ', req.body);
                console.log(req.files);
                // console.log(req.noFiles)
                const files = req.files;
                files.map((file) => {
                    console.info(`name: ${file.key} || filePath: ${file.location} \n`);
                });

                res.status(201).json({
                    status: 'success1',
                    message: 'files buckets',
                    data: 'OK ' + req.files.length
                });
            } catch (e) {
                next(e)
            }
        });

    router.get(
        '/:branchId',
        async (req, res, next) => {
            console.log('body: ', req.params);
            const id = req.params.branchId;

            try{
                s3.listObjects({ Bucket : 'simvalidation' }, function(err, data) {
                    if (err) {
                        console.log("Error ", err);
                    } else {
                        console.log("Success", data.Contents.length);
                    }
                });

                res.status(201).json({
                    status: 'success',
                    message: 'files listed',
                    data: id
                });
            } catch (e) {
                next(e)
            }
        });
}

module.exports = bucketsApi;
