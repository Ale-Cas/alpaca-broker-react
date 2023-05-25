export function formatDate(dateString: string): string {
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // Return the date string as is if it matches the format YYYY-MM-DD
        return `${dateString} GMT`;
    }
    else {
        return new Date(dateString).toUTCString();
    }
}