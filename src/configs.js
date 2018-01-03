//server configs
  const dev_server: "http://localhost:3000"; //dev server
  const live_server: "https://urbanapplause.flannerykj.com"; //staging server
  const uploads_subpath: "api/uploads";

module.exports = {
  SERVER_URL: dev_server,
  WORK_UPLOADS_PATH: dev_server + '/' + uploads_subpath + '/works',
  PROFILE_PIC_UPLOADS_PATH: dev_server + '/' + uploads_subpath + 'profile_pics'
}




