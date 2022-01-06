import photos from '$lib/photos'


let categories = new Set()

for (let photo of photos) {
    for (let category of photo['categories']) {
        categories.add(category)
    }
}
categories.delete('home-page')
export default categories