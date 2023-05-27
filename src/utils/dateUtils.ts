export function formatDate(dateString: string): string {
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // Convert Thu, 25 May 2023 17:59:38 GMT into Thu, 25 May 2023 
        const utcString = new Date(dateString).toUTCString();
        const delimeter = " ";
        const parts = utcString.split(delimeter);
        // Return the date string as is if it matches the format YYYY-MM-DD
        return parts.slice(0, 4).join(delimeter);
    }
    else {
        return new Date(dateString).toUTCString();
    }
}