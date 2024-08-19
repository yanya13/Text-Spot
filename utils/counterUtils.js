const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;



const counterFilePath = path.resolve(__dirname, '../imageCounter.json')
const STORAGE_LIMIT = 2;

// fetch oldest images from cloudinary
const fetchImages = async (limit) => {

    console.log('Fetching images with limit:', limit);

    try{
        const response = await cloudinary.api.resources({
            type: 'upload',
            max_results: limit,
            sort_by: { 'created_at': 'asc'}
        });

        console.log('Response from Cloudinary API:', response);
        console.log('Images fetched:', response.resources);
        
        if (!response || !response.resources) {
            console.error('No resources found in response.');
            return [];
        }


        return response.resources;
    } catch(error){
        console.error("Error fetching images from Cloudinary: ", error);
        throw error;
    }

};

// delete a specific image by its public ID
const deleteImageId = async (publicId) => {

    if (!publicId) {
        console.error('No public ID provided for deletion.');
        return;
    }

    try {
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted image with public ID: ${publicId}`);
    } catch (error){
        console.error(`Error deleting image with public ID ${publicId}:  `, error);
        throw error;
    }
};



// main function to check and delete images if needed

const deleteImageCheck = async() => {

    let data = fs.readFileSync(counterFilePath, 'utf8');
    let jsonData = JSON.parse(data);

    console.log('Current counter value before increment:', jsonData.counter);
    jsonData.counter += 1;
    console.log('Updated counter value:', jsonData.counter);

    if(jsonData.counter > STORAGE_LIMIT) {

        const imagesToDelete = await fetchImages(jsonData.counter - STORAGE_LIMIT);

        // Check the images to delete
        console.log('Images to delete:', imagesToDelete);

        for(const image of imagesToDelete) {
            if (image.public_id) {
                await deleteImageId(image.public_id);
            } else {
                console.error('No public ID found for image:', image);
            }
        }

        // reset counter
        jsonData.counter = STORAGE_LIMIT;
        console.log('Counter reset to:', jsonData.counter);

    }

    fs.writeFileSync(counterFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
    console.log('Counter file updated successfully');

};

module.exports = {
    deleteImageCheck
};