
import { parse as parseUrl } from 'url';

export function splitUrl(url: string): { host: string | undefined, path: string | undefined } {
    const data = parseUrl(url, true, false);
    return {
        host: data.host,
        path: data.path,
    }
}
