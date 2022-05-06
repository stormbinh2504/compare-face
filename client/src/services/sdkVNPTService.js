
import axios from '../axios';
const URL_EKYC = 'https://api.idg.vnpt.vn';

const TOKEN_ID = 'db542f10-d32c-0481-e053-63199f0a6888';
const TOKEN_KEY = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJFuJ801Gfpu8K4kkHIN0J/kasfo1yvxRRkhi01zWKODme0vrDFDRHZ8YnyWK7JAqBvIoe8xGTXDbWvlh0vX9YsCAwEAAQ==';
const AUTHORIZATION = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYjU0MmRkMC01YjA5LTc5M2QtZTA1My02MzE5OWYwYTFjZjgiLCJhdWQiOlsicmVzdHNlcnZpY2UiXSwidXNlcl9uYW1lIjoibm5iaW5oMjUwNEBnbWFpbC5jb20iLCJzY29wZSI6WyJyZWFkIl0sImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0IiwibmFtZSI6Im5uYmluaDI1MDRAZ21haWwuY29tIiwidXVpZF9hY2NvdW50IjoiZGI1NDJkZDAtNWIwOS03OTNkLWUwNTMtNjMxOTlmMGExY2Y4IiwiYXV0aG9yaXRpZXMiOlsiVVNFUiJdLCJqdGkiOiJkZTNiMDkzZS0yNTFiLTRhNmUtYjRlYS0xNTQyOTA0ZjE1NTQiLCJjbGllbnRfaWQiOiJhZG1pbmFwcCJ9.09LnBRW62XMXKUgUFl-rKbbKgg84moIMjQuum7m892iN8ASvrrzSHogXMae4kRw3mPP5rguZE1AI-knER_ay1V9jDYnb2IIuydrP3RS2OmTFhZ9G9f8LK5NVpS9k10Id710ZMuP94smI0-fgI-1kScUiUqBt8YBPBVVHoPgQt_YpFv_mlWz3QRMuQANpiAivrh3fV_LRf7FQcCeoDV3IE7WVCsbuiMPx1jjQRJIxl_HFpo92X_PRgoz_wpIFgSLVQMrqd0-2OZS5sc9RPHGx114LoESSq3c0r5YRaDqbCTDqjM4piufFFFaLvV_x8CxX6HTmJUIZUWLmoHP4mqP2kA"


const sdkVNPTService = {
    addFileServerEkyc(data) {
        let url = `${URL_EKYC}/file-service/v1/addFile`;
        let header = {
            headers: {
                "Token-id": TOKEN_ID,
                "Token-key": TOKEN_KEY,
                "Authorization": `Bearer ` + AUTHORIZATION,
            },
        }
        let form = new FormData();
        form.append('file', data.file);
        form.append('title', data.title ? data.title : '',);
        form.append('description', data.description ? data.description : '')
        return axios.post(url, form, header);
    },


    compare2Faces(data) {
        let url = `${URL_EKYC}/ai/v1/face/compare`;
        let header = {
            headers: {
                "Token-id": TOKEN_ID,
                "Token-key": TOKEN_KEY,
                "Authorization": `Bearer ` + AUTHORIZATION,
            },
        }

        let body = {
            img_front: data && data.image_hash_front,
            img_face: data && data.image_hash_face,
            client_session: data.client_session,
            token: 'token'
        }
        return axios.post(url, body, header);
    },
}

export default sdkVNPTService

