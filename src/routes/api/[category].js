import photos from '$lib/photos';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
    // the `slug` parameter is available because this file
    // is called [slug].json.js
    const { category } = params;

    let category_photos = []
    let photo
    for (photo of photos) {
        if (photo.categories.contains(category)) {
            category_photos.push(photo)
        }
    }
    category_photos = category_photos.sort((a, b) => parseFloat(a.rank) - parseFloat(b.rank))

    let category_urls = []

    for (photo of category_photos) {
        category_urls.push(photo.url)
    }
    return {
        body: {
            category_urls
        }
    };
}