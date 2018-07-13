import MsgPack from "msgpack-lite";
import gzip from "gzip-js";
import { encode as Base64FromArrayBuffer } from "base64-arraybuffer";
import { decode as ArrayBufferFromBase64 } from "base64-arraybuffer";
export default class Jase64 {
    /* These are for testing relative compression of just Base64 vs. MsgPack+Base64 etc */
    // JSON->Base64
    static base64json(data) {
        return btoa(JSON.stringify(data));
    }
    // JSON->MsgPack->Base64
    static base64MsgPackedjson(data) {
        const packed = MsgPack.encode(data);
        // const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(packed)));
        const base64String = Base64FromArrayBuffer(packed.buffer);
        return base64String;
    }
    /* MsgPack encoded JSON, gzipped and base64url encoded (URL safe).
       For larger data structures this has significant size savings.
       (x2 compression for small data, x4 compression for large data like package-lock.json)

       Quick test shows Firefox (62) and Chrome (67) will keep at least ~150000 characters
       in the address bar.
    */
    // JSON->MsgPack->Gzipped->Base64
    static compress(data, gz = true) {
        let base64ed;
        const packed = MsgPack.encode(data);
        if (gz) {
            const gzed = gzip.zip(String.fromCharCode.apply(null, new Uint8Array(packed)));
            base64ed = Base64FromArrayBuffer(new Uint8Array(gzed).buffer);
            // base64ed = btoa(String.fromCharCode.apply(null, new Uint8Array(gzed)));
        }
        else {
            // base64ed = btoa(String.fromCharCode.apply(null, new Uint8Array(packed)));
            base64ed = Base64FromArrayBuffer(packed.buffer);
        }
        // make URL safe
        base64ed = base64ed
            .replace(/\//g, "_")
            .replace(/\+/g, "-");
        return base64ed;
    }
    // Base64->Gunzip->UnMsgPack->JSON
    static decompress(b64url) {
        const b64 = b64url.replace(/_/g, "/").replace(/-/g, "+");
        const binary = ArrayBufferFromBase64(b64);
        const gunzipped = gzip.unzip(new Buffer(binary));
        const data = MsgPack.decode(gunzipped);
        return data;
    }
}
//# sourceMappingURL=index.js.map