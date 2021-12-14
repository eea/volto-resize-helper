# volto-resize-helper
[![Releases](https://img.shields.io/github/v/release/eea/volto-resize-helper)](https://github.com/eea/volto-resize-helper/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-resize-helper%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-resize-helper/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-resize-helper-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-resize-helper-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-resize-helper-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-resize-helper-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-resize-helper-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-resize-helper-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-resize-helper-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-resize-helper-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-resize-helper%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-resize-helper/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-resize-helper-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-resize-helper-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-resize-helper-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-resize-helper-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-resize-helper-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-resize-helper-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-resize-helper-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-resize-helper-develop)

[Volto](https://github.com/plone/volto) add-on: Window resize helper

## Getting started

### Try volto-resize-helper with Docker

1. Get the latest Docker images

   ```
   docker pull plone
   docker pull plone/volto
   ```

1. Start Plone backend
   ```
   docker run -d --name plone -p 8080:8080 -e SITE=Plone -e PROFILES="profile-plone.restapi:blocks" plone
   ```

1. Start Volto frontend

   ```
   docker run -it --rm -p 3000:3000 --link plone -e ADDONS="@eeacms/volto-resize-helper" plone/volto
   ```

1. Go to http://localhost:3000

### Add volto-resize-helper to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-resize-helper"
   ],

   "dependencies": {
       "@eeacms/volto-resize-helper": "^1.0.0"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --addon @eeacms/volto-resize-helper
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-resize-helper/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-resize-helper/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
u)
