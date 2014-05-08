#guestbook - MEAN

This simple guestbook is a showcase for an single page application (SPA) using the MEEN stack.

__M__ ongoDB  
__E__ xpress Framework  
__E__ mberJS  
__N__ odeJS  

##setup
###node
After downloading the project you need to setup the required dependencies. The setup is based on [npm](https://www.npmjs.org/) for the backend- and [bower](https://github.com/bower/bower) for the frontend dependencies. As bower itself is a node package, you need to install [node](http://nodejs.org/) (respectively npm) first. Please refer to this projects _package.json_ file for the required node version.  
After installing node, you should be abled to call ``npm help`` in a shell. It should list all options available for npm.  
###bower
OK, now it's time to install bower by typing ``npm -g install bower``. The ``-g`` results in installing bower _globally_. The package will be put to your personal folder instead of the node installation folder. If you prefer installing it _locally_ to your node installation folder, switch to _\{NODE_HOME\}/node_modules_ and type ``npm install bower``.  Make sure though, that the _\{NODE_HOME\}/node_modules.bin_ folder is on the path. Check it by typing ``bower --version`` in a shell. It should present the bower version installed.
### mongoDB
The other thing to install is [mongoDB](https://www.mongodb.org/). Just download and install it to whatever location you like. Make sure it is available on the path, so typing ``mongod --version`` in a shell should show you the version installed.
###dependencies
In order to successfully launch the guestbook showcase, you are required to download the dependencies now. Sounds an awful lot of work, but it isn't. You're just two shell commands away from glory.  
First switch to the guestbook showcase root folder.
``npm install`` will examine the _package.json_ file and install all backend dependencies to the _node_modules_ subfolder.
``bower install`` will install all frontend dependencies listed in the _bower.json_ file to the subfolder _public/bower_components_.
That's it...
##launch
You are now abled to run the guestbook showcase. npm supports defining commands for custom scripts pretty well. These commands are configured in the _package.json_ file.  
Here is the list of commands available for the guestbook showcase.

+  ``npm run db_setup`` creates a subfolder _mongoDB_ which hosts the data/configuration of mongoDB. This only has to be called once. (windows only, sorry for that...)
+  ``npm run db`` launches the mongoDB (blocking call)
+  ``npm run server`` will launch the guestbook HTTP server on port 3000. (blocking call)
+  ``npm run guestbook`` will open the guestbook web page in the browser (windows only, sorry for that...).
+  ``npm run tests_cleanup`` performs a cleanup of all test related content such as instrumented code, results from prior tests or former coverage reports. 
+  ``npm run tests`` runs the [mocha](http://visionmedia.github.io/mocha/) tests for the node application. It uses [chai](http://chaijs.com/) for the assert statements and [sinon](http://sinonjs.org/) for stubbing. The run will provide an [xunit](http://xunitjs.codeplex.com/) report and a [jscoverage coverage report](http://siliconforks.com/jscoverage).
+  ``npm run ui_tests`` runs the [jasmine](http://jasmine.github.io/) UI tests with [karma](http://karma-runner.github.io/0.12/index.html). The run will provide an [karma junit report](https://github.com/karma-runner/karma-junit-reporter) and a [karma coverage report](https://github.com/karma-runner/karma-coverage). (blocking call)

##overview
As already mentioned, the guestbook showcase is a pretty simple application.
### guestbook
It provides a list of yet added dedications.  

![guestbook - overview](documentation/guestbook_overview.png "guestbook - overview")  
### new dedications
When clicking _add dedication_, the lower part provides a form for details of a new dedication.  

![guestbook - new dedication](documentation/guestbook_newdedication.png "guestbook - new dedication")