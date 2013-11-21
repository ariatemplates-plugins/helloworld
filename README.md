# HelloWorld plugin for Aria Templates #

This **plugin** is a sample which shows how to write plugins for [Aria Templates](http://ariatemplates.com/ "Aria Templates").
Following this structure is highly recommended in order to ease plugins adoption.

## Usage ##

To use it, there is a set a scripts that are available after the usual *npm install*:
 - *npm run-script lint* : runs JShint, verifies lowercaseand checks files indentation
 - *npm run-script build* : packages the plugin only with [atpackager](https://github.com/ariatemplates/atpackager "atpackager") and put the results in build/output folder
 - *npm run-script test* : run all unit tests in PhantomJS with [attester](http://attester.ariatemplates.com "attester")
 - *npm run-script start* : starts [attester](http://attester.ariatemplates.com "attester") and waits for real browsers to connect
 - *npm run-script sample* : starts a webserver to run the samples (at <http://localhost:8080/> or <http://localhost:8080/index.html?devMode=true> )


## Structure ##

Here is the description of the different elements of the package:

|               | Description                                         |
| ------------- |-----------------------------------------------------|
|[build]	 	|Scripts and configuration files to package the plugin|
|Gruntfile.js	|One build scripts|
|package.json	|Meta-data
|README.md	 	|Documentation|
|[sample]	 	|Code of the sample|
|server.js 		|Script to launch the sample webserver|
|[src]			|Source code|
|[test]	 		|Test suites and test configuration|

## Creating a new plugin ##

The easiest way to create a new plugin is to duplicate this HelloWorldPlugin and to modify it.
All scripts described above are fully generic and will be usable in the newly created plugin.

### Modifications for the creation ###
- README.md : the documentation of the plugin
- package.json : the name field must be the classpath of the root of the plugin, and meta information should be updated (author, description, homepage, repository, etc)
- /src/atplugins : to be replaced by the source code of the plugin (folder structure to follow the classpath of the plugin)
- /test//atplugins : to be replaced by the unit tests of the plugin (folder structure to follow the classpath of the plugin)
- /test/PluginTestSuite.js : to be updated with the path to the main test suite
- /sample/ : to be replaced by the sample of the plugin (using the CDN is recommended)

### Changing the version of Aria Templates ###
 The version of Aria Templates used in the plugin is referenced in 3 different places:
 - package.json : in the dependencies (e.g. "ariatemplates": "1.4.12")
 - /sample/index.html : as a link to the cdn (e.g. http://cdn.ariatemplates.com/at1412.js?skin)
 - /test/attester.yml : as a link to the cdn (e.g. http://cdn.ariatemplates.com/at1412.js?skin)

## Registering a new plugin ##

The list of plugins which is displayed on http://www.ariatemplates.com/plugins is stored in GitHub.
More precisely, it is a json file in its own repository: https://github.com/ariatemplates-plugins/plugins-list  
To register a new plugin in this list, just do a pull request on this repository.