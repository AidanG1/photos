import photos from '$lib/photos';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
    // the `slug` parameter is available because this file
    // is called [slug].json.js
    const { category, width } = params;

    let category_photos = []
    let photoCopy = {}
    for (let photo of photos) {
        photoCopy = Object.assign({}, photo); // shallow copy
        if (photo.categories.includes(category)) {
            // photoCopy.src = photoCopy.src.substring(0, 50) + `c_scale,w_${width}/` + photoCopy.src.substring(50, photoCopy.src.length)
            photoCopy.src = photoCopy.src.substring(0, 50) + `c_scale,w_${width}/` + photoCopy.src.substring(50, photoCopy.src.length-3) + 'webp'
            category_photos.push(photoCopy)
        }
    }
    category_photos = category_photos.sort((a, b) => parseFloat(a.rank) - parseFloat(b.rank))

    return {
        body:
            category_photos

    };
}