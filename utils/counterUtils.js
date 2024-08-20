const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

const counterFilePath = path.resolve(__dirname, '../imageCounter.json');
const STORAGE_LIMIT = 10;

// Fetch oldest images from Cloudinary
const fetchImages = async (limit) => {
    try {
        const response = await cloudinary.api.resources({
            type: 'upload',
            max_results: limit,
            sort_by: { 'created_at': 'asc' }
        });

        if (!response || !response.resources) {
            console.error('No resources found in response.');
            return [];
        }

        return response.resources;
    } catch (error) {
        console.error("Error fetching images from Cloudinary:", error);
        throw error;
    }
};

// Delete a specific image by its public ID
const deleteImageId = async (publicId) => {
    if (!publicId) {
        console.error('No public ID provided for deletion.');
        return;
    }

    try {
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted image with public ID: ${publicId}`);
    } catch (error) {
        console.error(`Error deleting image with public ID ${publicId}:`, error);
        throw error;
    }
};

// Main function to check and delete images if needed
const deleteImageCheck = async () => {
    let data = fs.readFileSync(counterFilePath, 'utf8');
    let jsonData = JSON.parse(data);

    jsonData.counter += 1;

    if (jsonData.counter > STORAGE_LIMIT) {
        const imagesToDelete = await fetchImages(jsonData.counter - STORAGE_LIMIT);

        for (const image of imagesToDelete) {
            if (image.public_id) {
                await deleteImageId(image.public_id);
            } else {
                console.error('No public ID found for image:', image);
            }
        }

        // Reset counter
        jsonData.counter = STORAGE_LIMIT;
    }

    fs.writeFileSync(counterFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
};

module.exports = {
    deleteImageCheck
};
