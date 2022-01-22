import photos from '$lib/photos'


let categories = new Set()

for (let photo of photos) {
    for (let category of photo['categories']) {
        categories.add(category)
    }
}
export default categories