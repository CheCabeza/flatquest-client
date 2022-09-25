const _Environments = {
    APIFLATS: 'http://localhost:4040/api/flats',
    APIAUTH: 'http://localhost:4040',
    APIUSER: 'http://localhost:4040/api/user',

}
function getEnvironment() {
return _Environments
}
export const env = getEnvironment()