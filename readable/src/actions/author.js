export const Author = "Author";

export function setAuthor(name) {
    return {
        type: Author,
        name
    }
}