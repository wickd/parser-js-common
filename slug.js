const sluggify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '_')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '_')         // Replace multiple - with single -
        .replace(/\-/g, '_')         // Replace multiple - with single -
        .replace(/\_\_+/g, '_')         // Replace multiple - with single -
        // .replace(/^-+/, '')             // Trim - from start of text
        // .replace(/-+$/, '');            // Trim - from end of text
};
const uniquefy = text => {
    return text.toString().toUpperCase()
        .replace(/\s+/g, '')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}
const clear = (text) => {
    return text.toString().toLowerCase()
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/  +/g, ' ');
};

module.exports = {
    slug: sluggify,
    unique: uniquefy,
    clear: clear
}