Dota2Handbook
==========================

Simple DOTA 2 Guide Web Application

- heroes guide
- items guide
- and technical article with tips

### How to build app

- ready Node with npm, bower
- add Cordova
- add Android platform
- build

### Used library in this project

- React library for view component
- Kube library for css
- jQuery, Lodash for common util
- Cordova, Gulp for mobile package and build project

### Why this suite

no need to (router, model mapper), just really need a `View` manipulation solution

- need fast feedback in low performance mobile
- nice integrated with Webstorm IDE
- clean code and easy maintenance

#### list that i used before

- angular: two way bind performance (i'm a `noob` at this time, and still now on)
- knockout: bad event bind to other components
- riot: very rare reference, less documentation, how to figure out redraw code in global event


## Todo

- [x] apply React framework
- [x] load data at bootstrap, load detail data at event bind
- [x] responsive design, bind resize event to rearrange layout
- [x] tri-column mode and one vertical mode with selector
- [x] data list with sort and multi filter combination
- [ ] instant search list in each panel
- [x] toggle detail view
- [x] save previous panel for window resize event
- [x] random background image, transparent panel with color
- [x] individual scroll for tri-column mode
- [x] adjust font size with multi device
- [x] fix touch area for multi device
- [x] global notification in ajax load a data
- [ ] trim and resize images
- [ ] update data with markdown
- [ ] bind markdown renderer in detail view
- [ ] add gulp script with source management
- [ ] add gulp script with push gh-pages with git (like Hexo)
- [ ] add gulp script for package with Cordova
- [ ] upload Google PlayStore
