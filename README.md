# Orbital-2017-NUShortcuts [![Code Climate](http://img.shields.io/codeclimate/github/lincredibleJC/Orbital-2017-NUShortcuts.svg)](https://codeclimate.com/github/lincredibleJC/Orbital-2017-NUShortcuts)[![Build Status](https://travis-ci.org/lincredibleJC/Orbital-2017-NUShortcuts.svg?branch=master)](https://travis-ci.org/lincredibleJC/Orbital-2017-NUShortcuts)

# Setup with Meteor
Install [meteorjs](https://www.meteor.com)
```
$ cd Orbital-2017-NUShortcuts
$ meteor npm install --save babel-runtime
$ meteor
```

# Description
Mobile application to provide step by step picture guides to for shortcuts around NUS.


# Introduction

Time is wasted travelling around NUS and there are no working NUS shuttle bus navigation apps.

We spend lots of time travelling around the campus on a daily basis. I'm sure nobody likes to do that, walking under the scorching sun, squeezing on the bus and all that. So since we're going to take those routes so often, why not learn the shortcuts around NUS to save you time (waiting for buses) and energy (climbing stairs). So here's our solution.

# Our Solution:
We plan to build out very own internal NUS navigation app, featuring shortcuts around major points in NUS, with full photo guides and a working shuttle bus estimates.

# Data processes:
We plan to use Dijkstra's algorithm to calculate the shortest paths for the different queries.

For that, we have to learn about all the possible shortcuts in school before deciding on which places to use as vertexes and which routes are accessible to count as edges. Then, we plot the map on a digital version in another github repo and use that to create out graph. Then with that graph, we can run Dijkstra's algorithm to find the shortest paths depending on the chosen weight type: time, stairs and shelter. 

Currently, we are verifying shortcuts and collecting map data in NUS from Engineering (almost done), UTown, FASS, Computing, Business and Science.(the rest will be done after engineering)

# Currently implemented features:
#### Navigation
* Route types (Core)
  1. Fastest Route (Done)
  1. Sheltered route (Done)
  1. Least Stairs (Done)
  
* Integrated bus timings (On the way)
* Reactive geolocation (On the way)
* Snapchat style photo guides (On the way)

#### Location Search
* Location Details (Done)
* One click directions to the location (On the way)

#### Popular locations
* Ranking system (not in this sprint)
* One click directions to the location  (not in this sprint)

#### Settings (On the way)
  1. Persistent settings (Done)
  1. Transport mode (not in this sprint)
  1. Customise walking speed (not in this sprint)
  1. Dark mode (not in this sprint)
