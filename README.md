# pet-supplies-client

pet-supplies-client is a pet supplies angular UI project with version 1.0.

Advice to developers install node & gulp js.
1)package as jar, run mvn install to get required dependency as jar.
2) while installing if u struct with any error as 
 Cannot find any-promise implementation nor global.Promise. You must install polyfill or call require("any-promise/register") 
 run > npm install --save bluebird
3)if error is Cannot find module 'event-stream' then run 
 
## DEV-ENV : Build & Development
building > gulp build:dev
preview > gulp serve:dev


## PROD-ENV : Build & PROD app
building > gulp build
preview > gulp serve:prod

## Testing

Running `gulp test` will run the unit tests with karma.
