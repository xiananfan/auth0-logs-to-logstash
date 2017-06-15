module.exports=function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=30)}([function(e,t){e.exports=require("auth0-extension-tools@1.2.1")},function(e,t){e.exports=require("auth0-extension-express-tools@1.0.1")},function(e,t,n){"use strict";e.exports=n(0).config()},function(e,t,n){"use strict";var o=n(72);o.emitErrs=!0;var i=new o.Logger({transports:[new o.transports.Console({timestamp:!0,level:"debug",handleExceptions:!0,json:!1,colorize:!0})],exitOnError:!1});e.exports=i,e.exports.stream={write:function(e){i.info(e.replace(/\n$/,""))}}},function(e,t){var n=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(e,t){e.exports=require("express@4.12.4")},function(e,t,n){e.exports=!n(7)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t,n){function o(e){if(null===e||void 0===e)throw new c.ArgumentError("Must provide an options object");if(null===e.domain||void 0===e.domain)throw new c.ArgumentError("Must provide a valid domain");if("string"!=typeof e.domain||0===e.domain.length)throw new c.ArgumentError("The provided domain is invalid: "+e.domain);if(null===e.clientId||void 0===e.clientId)throw new c.ArgumentError("Must provide a valid clientId");if("string"!=typeof e.clientId||0===e.clientId.length)throw new c.ArgumentError("The provided clientId is invalid: "+e.clientId);if(null===e.clientSecret||void 0===e.clientSecret)throw new c.ArgumentError("Must provide a valid clientSecret");if("string"!=typeof e.clientSecret||0===e.clientSecret.length)throw new c.ArgumentError("The provided clientSecret is invalid: "+e.clientSecret);this.options=e,this.tokenCache=e.tokenCache||{getToken:function(){return i.resolve()},setToken:function(){return i.resolve()}}}const i=n(16),r=n(19),s=n(67),c=n(0);o.prototype.getAccessToken=function(){var e=this;return new i(function(t,n){r.post("https://"+e.options.domain+"/oauth/token").send({audience:"https://"+e.options.domain+"/api/v2/",client_id:e.options.clientId,client_secret:e.options.clientSecret,grant_type:"client_credentials"}).set("Accept","application/json").end(function(o,i){if(o&&401===o.status)return n(new c.ManagementApiError("unauthorized","Invalid credentials for "+e.options.clientId,o.status));if(o&&i&&i.body&&i.body.error)return n(new c.ManagementApiError(i.body.error,i.body.error_description||i.body.error,o.status));if(o)return n(o);if(!i.ok||!i.body.access_token)return n(new c.ManagementApiError("unknown_error","Unknown error from Management API or no access_token was provided: "+(i.text||i.status)));const r=new Date;return t({token:i.body.access_token,expiresAt:r.setSeconds(r.getSeconds()+i.body.expires_in)})})})},o.prototype.getAccessTokenCached=function(){var e=this;return e.tokenCache.getToken().then(function(t){if(t&&t.token){const n=(new Date).valueOf();if(t.expiresAt-n>1e4)return t}return e.getAccessToken(e.options).then(function(t){return e.tokenCache.setToken(t).then(function(){return t})})})},o.prototype.getLogs=function(e){const t=this;return new i(function(n,o){t.getAccessTokenCached(t.options,t.storage).then(function(i){const a=s.stringify(e);r.get("https://"+t.options.domain+"/api/v2/logs?"+a).set("Authorization","Bearer "+i.token).set("Content-Type","application/json").end(function(e,i){if(e&&403===e.status){const r=function(){return o(new c.ManagementApiError(i.body.error,i.body.error_description||i.body.error,e.status))};t.tokenCache.setToken(null).then(r).catch(r)}return e&&i&&i.body&&i.body.error?o(new c.ManagementApiError(i.body.error,i.body.error_description||i.body.error,e.status)):e?o(e):i.ok?n({logs:i.body,limits:{limit:i.headers["x-ratelimit-limit"],remaining:i.headers["x-ratelimit-remaining"],reset:i.headers["x-ratelimit-reset"]}}):o(new c.ManagementApiError("unknown_error","Unknown error from Management API: "+(i.text||i.status)))})})})},e.exports=o},function(e,t){const n={s:{name:"Success Login",icon:"icon-budicon-448",level:1},ssa:{name:"Success Silent Auth",icon:"icon-budicon-448",level:1},fsa:{name:"Failed Silent Auth",icon:"icon-budicon-448",level:3},seacft:{name:"Success Exchange",description:"Authorization Code for Access Token",icon:"icon-budicon-456",level:1},feacft:{name:"Failed Exchange",description:"Authorization Code for Access Token",icon:"icon-budicon-456",level:3},seccft:{name:"Success Exchange",description:"Client Credentials for Access Token",icon:"icon-budicon-456",level:1},feccft:{name:"Failed Exchange",description:"Client Credentials for Access Token",icon:"icon-budicon-456",level:3},sepft:{name:"Success Exchange",description:"Password for Access Token",icon:"icon-budicon-456",level:1},fepft:{name:"Failed Exchange",description:"Password for Access Token",icon:"icon-budicon-456",level:3},sertft:{name:"Success Exchange",description:"Refresh Token for Access Token",icon:"icon-budicon-456",level:1},fertft:{name:"Failed Exchange",description:"Refresh Token for Access Token",icon:"icon-budicon-456",level:3},seoobft:{name:"Success Exchange",description:"Password and OOB Challenge for Access Token",icon:"icon-budicon-456",level:1},feoobft:{name:"Failed Exchange",description:"Password and OOB Challenge for Access Token",icon:"icon-budicon-456",level:3},seotpft:{name:"Success Exchange",description:"Password and OTP Challenge for Access Token",icon:"icon-budicon-456",level:1},feotpft:{name:"Failed Exchange",description:"Password and OTP Challenge for Access Token",icon:"icon-budicon-456",level:3},sercft:{name:"Success Exchange",description:"Password and MFA Recovery code for Access Token",icon:"icon-budicon-456",level:1},fercft:{name:"Failed Exchange",description:"Password and MFA Recovery code for Access Token",icon:"icon-budicon-456",level:3},f:{name:"Failed Login",icon:"icon-budicon-448",level:3},w:{name:"Warning",icon:"icon-budicon-354",level:2},du:{name:"Deleted User",icon:"icon-budicon-311",level:3},fu:{name:"Failed Login (invalid email/username)",icon:"icon-budicon-311",level:3},fp:{name:"Failed Login (wrong password)",icon:"icon-budicon-311",level:3},fc:{name:"Failed by Connector",icon:"icon-budicon-313",level:3},fco:{name:"Failed by CORS",icon:"icon-budicon-313",level:3},con:{name:"Connector Online",icon:"icon-budicon-143",level:1},coff:{name:"Connector Offline",icon:"icon-budicon-143",level:3},fcpro:{name:"Failed Connector Provisioning",icon:"icon-budicon-143",level:4},ss:{name:"Success Signup",icon:"icon-budicon-314",level:1},fs:{name:"Failed Signup",icon:"icon-budicon-311",level:3},cs:{name:"Code Sent",icon:"icon-budicon-243",level:1},cls:{name:"Code/Link Sent",icon:"icon-budicon-781",level:1},sv:{name:"Success Verification Email",icon:"icon-budicon-781",level:1},fv:{name:"Failed Verification Email",icon:"icon-budicon-311",level:3},scp:{name:"Success Change Password",icon:"icon-budicon-280",level:1},fcp:{name:"Failed Change Password",icon:"icon-budicon-266",level:3},sce:{name:"Success Change Email",icon:"icon-budicon-266",level:1},fce:{name:"Failed Change Email",icon:"icon-budicon-266",level:3},scu:{name:"Success Change Username",icon:"icon-budicon-266",level:1},fcu:{name:"Failed Change Username",icon:"icon-budicon-266",level:3},scpn:{name:"Success Change Phone Number",icon:"icon-budicon-266",level:1},fcpn:{name:"Failed Change Phone Number",icon:"icon-budicon-266",level:3},svr:{name:"Success Verification Email Request",icon:"icon-budicon-781",level:0},fvr:{name:"Failed Verification Email Request",icon:"icon-budicon-311",level:3},scpr:{name:"Success Change Password Request",icon:"icon-budicon-280",level:1},fcpr:{name:"Failed Change Password Request",icon:"icon-budicon-311",level:3},fn:{name:"Failed Sending Notification",icon:"icon-budicon-782",level:3},sapi:{name:"API Operation",icon:"icon-budicon-546",level:1},fapi:{name:"Failed API Operation",icon:"icon-budicon-546",level:3},limit_wc:{name:"Blocked Account",icon:"icon-budicon-313",level:4},limit_mu:{name:"Blocked IP Address",icon:"icon-budicon-313",level:4},limit_ui:{name:"Too Many Calls to /userinfo",icon:"icon-budicon-313",level:4},api_limit:{name:"Rate Limit On API",icon:"icon-budicon-313",level:4},limit_delegation:{name:"Too Many Calls to /delegation",icon:"icon-budicon-313",level:4},sdu:{name:"Successful User Deletion",icon:"icon-budicon-312",level:1},fdu:{name:"Failed User Deletion",icon:"icon-budicon-311",level:3},slo:{name:"Success Logout",icon:"icon-budicon-449",level:1},flo:{name:"Failed Logout",icon:"icon-budicon-449",level:3},sd:{name:"Success Delegation",icon:"icon-budicon-456",level:1},fd:{name:"Failed Delegation",icon:"icon-budicon-456",level:3},gd_unenroll:{name:"Unenroll device account",icon:"icon-budicon-298",level:1},gd_update_device_account:{name:"Update device account",icon:"icon-budicon-257",level:1},gd_module_switch:{name:"Module switch",icon:"icon-budicon-329",level:1},gd_tenant_update:{name:"Guardian tenant update",icon:"icon-budicon-170",level:1},gd_start_auth:{name:"Second factor started",icon:"icon-budicon-285",level:1},gd_start_enroll:{name:"Enroll started",icon:"icon-budicon-299",level:1},gd_user_delete:{name:"User delete",icon:"icon-budicon-298",level:1},gd_auth_succeed:{name:"OTP Auth suceed",icon:"icon-budicon-mfa-login-succeed",level:1},gd_auth_failed:{name:"OTP Auth failed",icon:"icon-budicon-mfa-login-failed",level:3},gd_send_pn:{name:"Push notification sent",icon:"icon-budicon-mfa-send-pn",level:1},gd_auth_rejected:{name:"OTP Auth rejected",icon:"icon-budicon-mfa-login-failed",level:3},gd_recovery_succeed:{name:"Recovery succeed",icon:"icon-budicon-mfa-recovery-succeed",level:1},gd_recovery_failed:{name:"Recovery failed",icon:"icon-budicon-mfa-recovery-failed",level:3},gd_send_sms:{name:"SMS Sent",icon:"icon-budicon-799",level:1},gd_otp_rate_limit_exceed:{name:"Too many failures",icon:"icon-budicon-435",level:2},gd_recovery_rate_limit_exceed:{name:"Too many failures",icon:"icon-budicon-435",level:2},fui:{name:"Users import",icon:"icon-budicon-299",level:2},sui:{name:"Users import",icon:"icon-budicon-299",level:1},pwd_leak:{name:"Breached password",icon:"icon-budicon-313",level:3}};e.exports=n,e.exports.get=function(e){return n[e]&&n[e].name||"Unknown Log Type: "+e}},function(e,t,n){function o(e){if(null===e||void 0===e)throw new s.ArgumentError("Must provide an options object");r.call(this,{objectMode:!0}),this.client=new c(e),this.options=e,this.remaining=50,this.lastBatch=0,this.previousCheckpoint=e.checkpointId||null,this.lastCheckpoint=e.checkpointId||null,this.status={start:new Date,end:null,logsProcessed:0}}const i=n(71),r=n(69).Readable,s=n(0),c=n(10);i.inherits(o,r),o.prototype.getQuery=function(e){return e&&e.length?"type:"+e.join(" OR type:"):""},o.prototype.done=function(){this.status.end=new Date,this.push(null)},o.prototype.next=function(e){const t=this;if(t.remaining<1)t.status.warning="Auth0 Management API rate limit reached.",t.done();else{const n=t.lastCheckpoint?{take:100,from:t.lastCheckpoint}:{per_page:100,page:0};n.q=t.getQuery(t.options.types),n.sort="date:1",t.client.getLogs(n).then(function(n){const o=n.logs;if(t.remaining=n.limits.remaining,o&&o.length){const i=t.options.types&&t.options.types.length?o.filter(function(e){return t.options.types.indexOf(e.type)>=0}).slice(0,e||100):o;i.length?(t.lastCheckpoint=i[i.length-1]._id,t.lastBatch+=i.length,t.push({logs:i,limits:n.limits})):(t.lastCheckpoint=o[o.length-1]._id,t.lastBatch+=0,t.push({logs:[],limits:n.limits}))}else t.status.end=new Date,t.push(null);return o}).catch(function(e){t.emit("error",e)})}},o.prototype.batchSaved=function(){this.status.logsProcessed+=this.lastBatch,this.previousCheckpoint=this.lastCheckpoint,this.lastBatch=0},o.prototype._read=function(){},e.exports=o},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t){var n=Math.ceil,o=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?o:n)(e)}},function(e,t,n){var o=n(46),i=n(13);e.exports=function(e){return o(i(e))}},function(e,t){e.exports=require("bluebird@3.4.6")},function(e,t){e.exports=require("lodash@3.10.1")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("superagent@1.2.0")},function(e,t,n){"use strict";(function(t){var o=(n(70),n(18)),i=n(66),r=n(5),s=n(62),c=n(0),a=n(1),u=n(28),l=n(29),d=n(26),f=n(3),p=n(2),h=n(25);e.exports=function(e,n){p.setProvider(e);var g=n?new c.WebtaskStorageContext(n,{force:1}):new c.FileStorageContext(o.join(t,"./data.json"),{mergeWrites:!0}),m=new r;return m.use(i(":method :url :status :response-time ms - :res[content-length]",{stream:f.stream})),m.use("/meta",l()),m.use("/.extensions",d()),m.use(h(g)),m.use(s.json()),m.use(s.urlencoded({extended:!1})),m.use(a.routes.dashboardAdmins({secret:p("EXTENSION_SECRET"),audience:"urn:logs-to-logstash",rta:p("AUTH0_RTA").replace("https://",""),domain:p("AUTH0_DOMAIN"),baseUrl:p("PUBLIC_WT_URL")||p("WT_URL"),clientName:"Logs to Logstash",urlPrefix:"",sessionStorageKey:"logs-to-logstash:apiToken",scopes:"read:logs"})),m.use("/app",r.static(o.join(t,"../dist"))),m.use("/",u(g)),m.use(a.middlewares.errorHandler(f.error.bind(f))),m}}).call(t,"/")},function(e,t,n){const o=n(23);e.exports.LogsProcessor=n(22),e.exports.LogsApiClient=n(10),e.exports.LogsApiStream=n(12),e.exports.logTypes=n(11),e.exports.reporters={SlackReporter:o}},function(e,t,n){function o(e,t){if(null===t||void 0===t)throw new r.ArgumentError("Must provide an options object");this.storage=new a(e),this.options=i.assign({},{batchSize:100,maxRetries:5,maxRunTimeSeconds:20},t)}const i=n(17),r=n(0),s=n(11),c=n(12),a=n(24);o.prototype.hasTimeLeft=function(e){const t=(new Date).getTime();return e+1e3*this.options.maxRunTimeSeconds>=t},o.prototype.getLogFilter=function(e){var t=e.logTypes||[];if(e.logLevel){const n=i.map(s,function(e,t){const n=e;return n.type=t,n});t=t.concat(i.map(i.filter(n,function(t){return t.level>=e.logLevel}),"type"))}return i.uniq(t)},o.prototype.createStream=function(e){const t=this;return t.storage.getCheckpoint(e.startFrom).then(function(n){return t.options.logger&&t.options.logger.debug("Starting logs processor from checkpoint:",n),new c({checkpointId:n,types:t.getLogFilter(e),domain:e.domain,clientId:e.clientId,clientSecret:e.clientSecret,tokenCache:t.storage})})},o.prototype.run=function(e){const t=this;return new Promise(function(n,o){const i=(new Date).getTime();var r=0,s=0,c=[];const a=t.storage,u=(t.options,t.options.batchSize),l=t.options.maxRetries,d=function(e,i,r){t.options.logger&&t.options.logger.debug("Processor failed:",e),i.error=e,a.done(i,r).then(function(){return n({status:i,checkpoint:r})}).catch(o)},f=function(e,i){if(t.options.logger&&t.options.logger.debug("Processor run complete. Logs processed:",e.logsProcessed),e.logsProcessed>0){return(new Date).getTime()-s>=6048e5&&(e.warning="Logs are outdated more than for week. Last processed log has date is "+new Date(s)),a.done(e,i).then(function(){return n({status:e,checkpoint:i})}).catch(o)}return n({status:e,checkpoint:i})},p=function(){var e=u;return e-=c.length,e>100&&(e=100),e},h=function(n,o,s){if(!t.hasTimeLeft(i))return d(n,o.status,o.previousCheckpoint);if(r<l)return r+=1,e(c,s);const a=["Skipping logs from "+o.previousCheckpoint+" to "+o.lastCheckpoint+" after "+l+" retries.",n];return t.options.logger&&t.options.logger.error(a[0],a[1]),d(a,o.status,o.lastCheckpoint)};t.createStream(t.options).then(function(n){const o=p();t.options.logger&&t.options.logger.debug("Loading next batch of logs. Next limit:",o),n.next(o),n.on("data",function(o){const r=o.logs;if(c=c.concat(r),r&&r.length&&(s=new Date(r[r.length-1].date).getTime()),c.length<u&&t.hasTimeLeft(i))return n.next(p());const a=function(e){return e?h(e,n,a):(c=[],t.hasTimeLeft(i)?(n.batchSaved(),n.next(p())):n.done())};return e(c,a)}),n.on("end",function(){const t=function(e){return e?h(e,n,t):(n.batchSaved(),f(n.status,n.lastCheckpoint))};e(c,t)}),n.on("error",function(e){d(e,n.status,n.previousCheckpoint)})}).catch(o)})},e.exports=o},function(e,t,n){function o(e){this.options=e||{}}const i=n(16),r=n(19);o.prototype.send=function(e,t){if(!e||"object"!=typeof e)throw new Error("object status is required");const n=this.options,o=this.createMessage(this.options,e,t);return new i(function(e,t){return n.hook?r.post(n.hook).send(o).set("Accept","application/json").end(function(n){return n?t(n):e()}):e()})},o.prototype.createMessage=function(e,t,n){const o={username:e.username||"auth0-logger",icon_emoji:e.icon||":rocket:",attachments:[]},i=e.title||"Auth0 Logger",r=t.error?i+" Error":i+" Success",s=t.error?t.error.message||t.error[0]||"Error occurred":null,c={fallback:e.fallback||r,text:e.text||r,fields:[{title:"Start time",value:t.start,short:!0},{title:"End time",value:t.end,short:!0},{title:"Logs processed",value:t.logsProcessed,short:!0},{title:"Last checkpoint",value:n,short:!0}],error_field:{title:"Error",value:s,short:!1}},a=e.url?" (<"+e.url+"|Details>)":null,u=c.fields;return t.error&&u.push(c.error_field),o.attachments.push({color:"#7CD197",fallback:c.fallback,text:c.fallback+(a||""),fields:u}),o},e.exports=o},function(e,t,n){function o(e,t){if(!e)throw new r("The storageContext is required");this.storageContext=e,this.options=i({},{limit:400},t)}const i=n(17).assign,r=n(0).ArgumentError;o.prototype.read=function(){return this.storageContext.read().then(function(e){const t=e||{};return t.logs=t.logs||[],t})},o.prototype.write=function(e){return this.storageContext.write(e)},o.prototype.getCheckpoint=function(e){const t=this;return t.read().then(function(n){return e&&e!==n.startFrom?(n.startFrom=e,n.checkpointId=e,t.write(n).then(function(){return n.checkpointId||e||null})):n.checkpointId})},o.prototype.getToken=function(){return this.read().then(function(e){return e.logs_access_token||null})},o.prototype.setToken=function(e){const t=this;return t.read().then(function(n){return n.logs_access_token=e,t.write(n)})},o.prototype.done=function(e,t){const n=this;return n.read().then(function(o){return Buffer.byteLength(JSON.stringify(o),"utf8")>=1024*n.options.limit&&o.logs&&o.logs.length&&o.logs.splice(0,5),e.checkpoint=t,o.logs.push(e),o.checkpointId=t,n.write(o)})},e.exports=o},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=n(31),r=o(i),s=n(32),c=o(s),a=n(61),u=n(68),l=(n(65),n(21)),d=n(2),f=n(3);e.exports=function(e){return function(t,n,o){var i=t.webtaskContext&&t.webtaskContext.body||t.body||{},s=t.webtaskContext&&t.webtaskContext.headers||{};if(!(i.schedule&&"active"===i.state||"https://manage.auth0.com/"===s.referer&&s["if-none-match"]))return o();var p=Date.now(),h=function(e,t){if(!e)return t();var n=d("LOGSTASH_INDEX"),o={post_date:p,type_description:l.logTypes.get(e.type)};(0,c.default)(e).forEach(function(t){o[t]=e[t]}),o[n]=e[n]||"auth0",o.message=(0,r.default)(e);var i=d("LOGSTASH_TOKEN")?d("LOGSTASH_URL")+"?token="+d("LOGSTASH_TOKEN"):d("LOGSTASH_URL"),s={method:"POST",timeout:2e4,url:i,headers:{"cache-control":"no-cache","content-type":"application/json"},body:o,json:!0};d("LOGSTASH_USER")&&d("LOGSTASH_PASSWORD")&&(s.auth={user:d("LOGSTASH_USER"),pass:d("LOGSTASH_PASSWORD"),sendImmediately:!0}),u(s,function(e,n,o){var i=e||o&&o.error||null;t(i)})},g=function(e,t){if(!e||!e.length)return t();f.info("Sending "+e.length+" logs to Logstash."),a.eachLimit(e,100,h,t)},m=new l.reporters.SlackReporter({hook:d("SLACK_INCOMING_WEBHOOK_URL"),username:"auth0-logs-to-logstash",title:"Logs To Logstash"}),v={domain:d("AUTH0_DOMAIN"),clientId:d("AUTH0_CLIENT_ID"),clientSecret:d("AUTH0_CLIENT_SECRET"),batchSize:d("BATCH_SIZE"),startFrom:d("START_FROM"),logTypes:d("LOG_TYPES"),logLevel:d("LOG_LEVEL")};return new l.LogsProcessor(e,v).run(g).then(function(e){m.send(e.status,e.checkpoint),n.json(e)}).catch(function(e){m.send({error:e,logsProcessed:0},null),o(e)})}}},function(e,t,n){"use strict";var o=n(5).Router,i=n(1).middlewares,r=n(2),s=n(3);e.exports=function(){var e=o(),t=i.validateHookToken(r("AUTH0_DOMAIN"),r("WT_URL"),r("EXTENSION_SECRET"));return e.use("/on-uninstall",t("/.extensions/on-uninstall")),e.use(i.managementApiClient({domain:r("AUTH0_DOMAIN"),clientId:r("AUTH0_CLIENT_ID"),clientSecret:r("AUTH0_CLIENT_SECRET")})),e.delete("/on-uninstall",function(e,t){var n=r("AUTH0_CLIENT_ID");e.auth0.clients.delete({client_id:n}).then(function(){s.debug("Deleted client "+n),t.sendStatus(204)}).catch(function(e){s.debug("Error deleting client: "+r("AUTH0_CLIENT_ID")),s.error(e),t.sendStatus(204)})}),e}},function(e,t,n){"use strict";(function(t){var o=(n(64),n(63)),i=(n(18),n(1).urlHelpers),r=n(2);e.exports=function(){var e='\n  <!DOCTYPE html>\n  <html lang="en">\n  <head>\n    <title><%= config.TITLE %></title>\n    <meta charset="UTF-8" />\n    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <link rel="shortcut icon" href="https://cdn.auth0.com/styleguide/4.6.13/lib/logos/img/favicon.png">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styles/zocial.min.css" />\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/manage/v0.3.1672/css/index.min.css" />\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styleguide/4.6.13/index.min.css" />\n    <% if (assets.style) { %><link rel="stylesheet" type="text/css" href="/app/<%= assets.style %>" /><% } %>\n    <% if (assets.version) { %><link rel="stylesheet" type="text/css" href="//cdn.auth0.com/extensions/auth0-logs-to-logstash/assets/auth0-logs-to-logstash.ui.<%= assets.version %>.css" /><% } %>\n    <% if (assets.customCss) { %><link rel="stylesheet" type="text/css" href="<%= assets.customCss %>" /><% } %>\n  </head>\n  <body>\n    <div id="app"></div>\n    <script type="text/javascript" src="//cdn.auth0.com/w2/auth0-7.0.4.min.js"><\/script>\n    <script type="text/javascript" src="//cdn.auth0.com/manage/v0.3.1672/js/bundle.js"><\/script>\n    <script type="text/javascript">window.config = <%- JSON.stringify(config) %>;<\/script>\n    <% if (assets.vendors) { %><script type="text/javascript" src="<%= assets.vendors %>"><\/script><% } %>\n    <% if (assets.app) { %><script type="text/javascript" src="<%= assets.app %>"><\/script><% } %>\n    <% if (assets.version) { %>\n    <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-logs-to-logstash/assets/auth0-logs-to-logstash.ui.vendors.<%= assets.version %>.js"><\/script>\n    <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-logs-to-logstash/assets/auth0-logs-to-logstash.ui.<%= assets.version %>.js"><\/script>\n    <% } %>\n  </body>\n  </html>\n  ';return function(t,n,s){if(0===t.url.indexOf("/api"))return s();var c={AUTH0_DOMAIN:r("AUTH0_DOMAIN"),AUTH0_CLIENT_ID:r("EXTENSION_CLIENT_ID"),AUTH0_MANAGE_URL:r("AUTH0_MANAGE_URL")||"https://manage.auth0.com",BASE_URL:i.getBaseUrl(t),BASE_PATH:i.getBasePath(t),TITLE:r("TITLE")};return n.send(o.render(e,{config:c,assets:{customCss:r("CUSTOM_CSS"),version:"1.4.0"}}))}}}).call(t,"/")},function(e,t,n){"use strict";var o=n(5).Router,i=n(1).middlewares,r=n(2),s=n(27);e.exports=function(e){var t=o(),n=i.authenticateAdmins({credentialsRequired:!0,secret:r("EXTENSION_SECRET"),audience:"urn:logs-to-logstash",baseUrl:r("PUBLIC_WT_URL")||r("WT_URL"),onLoginSuccess:function(e,t,n){return n()}});return t.get("/",s()),t.get("/api/report",n,function(t,n,o){return e.read().then(function(e){return n.json(e&&e.logs||[])}).catch(o)}),t}},function(e,t,n){"use strict";var o=n(5),i=n(60);e.exports=function(){var e=o.Router();return e.get("/",function(e,t){t.status(200).send(i)}),e}},function(e,t,n){"use strict";var o=n(1),i=n(20),r=n(3);e.exports=o.createServer(function(e,t){return r.info("Starting Logs to Logstash extension - Version:","1.4.0"),i(e,t)})},function(e,t,n){e.exports={default:n(33),__esModule:!0}},function(e,t,n){e.exports={default:n(34),__esModule:!0}},function(e,t,n){var o=n(4),i=o.JSON||(o.JSON={stringify:JSON.stringify});e.exports=function(e){return i.stringify.apply(i,arguments)}},function(e,t,n){n(59),e.exports=n(4).Object.keys},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,n){var o=n(9);e.exports=function(e){if(!o(e))throw TypeError(e+" is not an object!");return e}},function(e,t,n){var o=n(15),i=n(55),r=n(54);e.exports=function(e){return function(t,n,s){var c,a=o(t),u=i(a.length),l=r(s,u);if(e&&n!=n){for(;u>l;)if((c=a[l++])!=c)return!0}else for(;u>l;l++)if((e||l in a)&&a[l]===n)return e||l||0;return!e&&-1}}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,n){var o=n(35);e.exports=function(e,t,n){if(o(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,o){return e.call(t,n,o)};case 3:return function(n,o,i){return e.call(t,n,o,i)}}return function(){return e.apply(t,arguments)}}},function(e,t,n){var o=n(9),i=n(8).document,r=o(i)&&o(i.createElement);e.exports=function(e){return r?i.createElement(e):{}}},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t,n){var o=n(8),i=n(4),r=n(39),s=n(44),c=function(e,t,n){var a,u,l,d=e&c.F,f=e&c.G,p=e&c.S,h=e&c.P,g=e&c.B,m=e&c.W,v=f?i:i[t]||(i[t]={}),x=v.prototype,b=f?o:p?o[t]:(o[t]||{}).prototype;f&&(n=t);for(a in n)(u=!d&&b&&void 0!==b[a])&&a in v||(l=u?b[a]:n[a],v[a]=f&&"function"!=typeof b[a]?n[a]:g&&u?r(l,o):m&&b[a]==l?function(e){var t=function(t,n,o){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,o)}return e.apply(this,arguments)};return t.prototype=e.prototype,t}(l):h&&"function"==typeof l?r(Function.call,l):l,h&&((v.virtual||(v.virtual={}))[a]=l,e&c.R&&x&&!x[a]&&s(x,a,l)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,e.exports=c},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,n){var o=n(47),i=n(51);e.exports=n(6)?function(e,t,n){return o.f(e,t,i(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){e.exports=!n(6)&&!n(7)(function(){return 7!=Object.defineProperty(n(40)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){var o=n(38);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==o(e)?e.split(""):Object(e)}},function(e,t,n){var o=n(36),i=n(45),r=n(57),s=Object.defineProperty;t.f=n(6)?Object.defineProperty:function(e,t,n){if(o(e),t=r(t,!0),o(n),i)try{return s(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t,n){var o=n(43),i=n(15),r=n(37)(!1),s=n(52)("IE_PROTO");e.exports=function(e,t){var n,c=i(e),a=0,u=[];for(n in c)n!=s&&o(c,n)&&u.push(n);for(;t.length>a;)o(c,n=t[a++])&&(~r(u,n)||u.push(n));return u}},function(e,t,n){var o=n(48),i=n(41);e.exports=Object.keys||function(e){return o(e,i)}},function(e,t,n){var o=n(42),i=n(4),r=n(7);e.exports=function(e,t){var n=(i.Object||{})[e]||Object[e],s={};s[e]=t(n),o(o.S+o.F*r(function(){n(1)}),"Object",s)}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,n){var o=n(53)("keys"),i=n(58);e.exports=function(e){return o[e]||(o[e]=i(e))}},function(e,t,n){var o=n(8),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});e.exports=function(e){return i[e]||(i[e]={})}},function(e,t,n){var o=n(14),i=Math.max,r=Math.min;e.exports=function(e,t){return e=o(e),e<0?i(e+t,0):r(e,t)}},function(e,t,n){var o=n(14),i=Math.min;e.exports=function(e){return e>0?i(o(e),9007199254740991):0}},function(e,t,n){var o=n(13);e.exports=function(e){return Object(o(e))}},function(e,t,n){var o=n(9);e.exports=function(e,t){if(!o(e))return e;var n,i;if(t&&"function"==typeof(n=e.toString)&&!o(i=n.call(e)))return i;if("function"==typeof(n=e.valueOf)&&!o(i=n.call(e)))return i;if(!t&&"function"==typeof(n=e.toString)&&!o(i=n.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},function(e,t){var n=0,o=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+o).toString(36))}},function(e,t,n){var o=n(56),i=n(49);n(50)("keys",function(){return function(e){return i(o(e))}})},function(e,t){e.exports={title:"Auth0 Logs to Logstash",name:"auth0-logs-to-logstash",version:"1.4.0",author:"auth0",description:"This extension will take all of your Auth0 logs and export them to Logstash",type:"cron",initialUrlPath:"/login",repository:"https://github.com/auth0/auth0-logs-to-logstash",keywords:["auth0","extension"],schedule:"0 */5 * * * *",auth0:{createClient:!0,onUninstallPath:"/.extensions/on-uninstall",scopes:"read:logs delete:clients"},secrets:{BATCH_SIZE:{description:"The ammount of logs to be read on each execution. Maximun is 100.",default:100},LOGSTASH_URL:{description:"Logstash URL (as defined for use with logstash-input-http plugin)",required:!0},LOGSTASH_INDEX:{description:"Logstash Index (as defined in logstash setup",required:!0},LOGSTASH_TOKEN:{description:"Logstash Token (optional)",type:"password"},LOGSTASH_USER:{description:"Logstash User (optional)"},LOGSTASH_PASSWORD:{description:"Logstash Password (optional)",type:"password"},START_FROM:{description:"CheckpointId of log to start with."},SLACK_INCOMING_WEBHOOK_URL:{description:"Slack webhook"},SLACK_SEND_SUCCESS:{description:"Send success messages to slack?",type:"select",allowMultiple:!0,options:[{value:"No",text:""},{value:"Yes",text:"true"}]},LOG_LEVEL:{description:"This allows you to specify the log level of events that need to be sent",type:"select",allowMultiple:!0,options:[{value:"-",text:""},{value:"0",text:"Debug"},{value:"1",text:"Info"},{value:"2",text:"Warning"},{value:"3",text:"Error"},{value:"4",text:"Critical"}]},LOG_TYPES:{description:"If you only want to send events with a specific type (eg: failed logins)",type:"select",allowMultiple:!0,options:[{value:"-",text:""},{value:"s",text:"Success Login (Info)"},{value:"seacft",text:"Success Exchange (Info)"},{value:"feacft",text:"Failed Exchange (Error)"},{value:"f",text:"Failed Login (Error)"},{value:"w",text:"Warnings During Login (Warning)"},{value:"du",text:"Deleted User (Info)"},{value:"fu",text:"Failed Login (invalid email/username) (Error)"},{value:"fp",text:"Failed Login (wrong password) (Error)"},{value:"fc",text:"Failed by Connector (Error)"},{value:"fco",text:"Failed by CORS (Error)"},{value:"con",text:"Connector Online (Info)"},{value:"coff",text:"Connector Offline (Error)"},{value:"fcpro",text:"Failed Connector Provisioning (Critical)"},{value:"ss",text:"Success Signup (Info)"},{value:"fs",text:"Failed Signup (Error)"},{value:"cs",text:"Code Sent (Debug)"},{value:"cls",text:"Code/Link Sent (Debug)"},{value:"sv",text:"Success Verification Email (Debug)"},{value:"fv",text:"Failed Verification Email (Debug)"},{value:"scp",text:"Success Change Password (Info)"},{value:"fcp",text:"Failed Change Password (Error)"},{value:"sce",text:"Success Change Email (Info)"},{value:"fce",text:"Failed Change Email (Error)"},{value:"scu",text:"Success Change Username (Info)"},{value:"fcu",text:"Failed Change Username (Error)"},{value:"scpn",text:"Success Change Phone Number (Info)"},{value:"fcpn",text:"Failed Change Phone Number (Error)"},{value:"svr",text:"Success Verification Email Request (Debug)"},{value:"fvr",text:"Failed Verification Email Request (Error)"},{value:"scpr",text:"Success Change Password Request (Debug)"},{value:"fcpr",text:"Failed Change Password Request (Error)"},{value:"fn",text:"Failed Sending Notification (Error)"},{value:"limit_wc",text:"Blocked Account (Critical)"},{value:"limit_ui",text:"Too Many Calls to /userinfo (Critical)"},{value:"api_limit",text:"Rate Limit On API (Critical)"},{value:"sdu",text:"Successful User Deletion (Info)"},{value:"fdu",text:"Failed User Deletion (Error)"}]}}}},function(e,t){e.exports=require("async@2.1.2")},function(e,t){e.exports=require("body-parser@1.12.4")},function(e,t){e.exports=require("ejs@2.3.1")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("moment@2.10.3")},function(e,t){e.exports=require("morgan@1.5.3")},function(e,t){e.exports=require("querystring")},function(e,t){e.exports=require("request@2.56.0")},function(e,t){e.exports=require("stream")},function(e,t){e.exports=require("url")},function(e,t){e.exports=require("util")},function(e,t){e.exports=require("winston@1.0.0")}]);
