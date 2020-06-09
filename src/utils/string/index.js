import {URL} from 'utils/constants';
export function extractFileNameFromPublicURL(url)
{
    var slice = url.split('/');
    var a = slice[slice.length-1];
    var aa = a.split('%');
    var b = aa[aa.length-1];
    var bb = b.split('?')[0];
    var c = bb.split('2F');
    return c[c.length-1];
}
export function extensionExtractor(fileName)
{
    var slice = fileName.split('.');
    var ext = slice[slice.length-1];
    return ext;
}
export function getUrlFromString(str)
{
    let slice = str.match(URL);
    return slice;
        
}
export function trimQuots(str)
{
    let trimmed = str.replace("\"","");
    return trimmed;
}
export function getStringMonth(month)
{
    switch(month)
    {
        case 1: return 'Jan';
        case 2: return 'Feb';
        case 3: return 'Mar';
        case 4: return 'Apr';
        case 5: return 'May';
        case 6: return 'Jun';
        case 7: return 'Jul';
        case 8: return 'Aug';
        case 9: return 'Sep';
        case 10: return 'Oct';
        case 11: return 'Nov';
        case 12: return 'Dec';
        default: return null;
    }
}