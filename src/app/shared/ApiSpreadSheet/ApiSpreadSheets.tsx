const apispreadsheets = 'https://opensheet.elk.sh/10vF3xs9sUG14BEXFk6vnUsiS0D0l6UNEQ4J2xVHLYuw';

const imgFromDriveUrl = (url: string) => url.replace('file/d/', 'thumbnail?id=').replace('/view?usp=sharing', '&sz=w500');

export {apispreadsheets, imgFromDriveUrl};