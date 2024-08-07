require('dotenv').config();

const cloudinary = require('./utils/cloudinary');

cloudinary.api
    .delete_resources(['1723009064160--test_img_jyz1om'],
    { type: 'upload', resource_type: 'image'})
    .then(result => 
        { console.log(result);
        }).catch(err => {
            console.error("Error deleting image: ", err);
        });