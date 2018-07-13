export default class Jase64 {
    static base64json(data: any): string;
    static base64MsgPackedjson(data: any): string;
    static compress(data: any, gz?: boolean): string;
    static decompress(b64url: string): any;
}
