# Orbital-2017-NUShortcuts [![Code Climate](http://img.shields.io/codeclimate/github/lincredibleJC/Orbital-2017-NUShortcuts.svg)](https://codeclimate.com/github/lincredibleJC/Orbital-2017-NUShortcuts)[![Build Status](https://travis-ci.org/lincredibleJC/Orbital-2017-NUShortcuts.svg?branch=master)](https://travis-ci.org/lincredibleJC/Orbital-2017-NUShortcuts)

# Setup with Meteor
Install [meteorjs](https://www.meteor.com)
```
$ cd Orbital-2017-NUShortcuts
$ meteor npm install --save babel-runtime
$ meteor npm install --save bcrypt
$ meteor
```

# Description
Web application to provide step by step picture guides to for shortcuts around NUS.


# Introduction

Time is wasted travelling around NUS and there are no working NUS shuttle bus navigation apps.

We spend lots of time travelling around the campus on a daily basis. I'm sure nobody likes to do that, walking under the scorching sun, squeezing on the bus and all that. So since we're going to take those routes so often, why not learn the shortcuts around NUS to save you time (waiting for buses) and energy (climbing stairs). So here's our solution.

# Our Solution:
We plan to build out an internal NUS navigation app, featuring shortcuts by foot, with photo guides and a bus routes.

# Data processes:
We plan to use Dijkstra's algorithm to calculate the shortest paths for the different queries.

For that, we model this as a graph problem, with buildings as vertices and edges as walkable paths.
Then we create the graph, and run Dijkstra's algorithm to find the shortest paths using the different weights: time, about of stairs and availability of shelter. 

Currently, we are left with FASS, Business and Science yet to be mapped.

# Currently implemented features:
#### Navigation
* Route types
  1. Fastest Route (Done)
  1. Sheltered route (Done)
  1. Least Stairs (Done)
  
* Bus routes (In the future)
* Reactive geolocation (In the future)
* Snapchat style photo guides (In progress)

#### Location Search
* Location Details (Done)
* One click directions to the location (In the future)

#### Popular locations
* Ranking system (In the future)
* One click directions to the location  (In the future)

#### Feedback Page
* Feedback page (Done)
* Guest-user accounts (Done)

#### Settings
  1. Persistent settings (Done)
  1. Change Transport mode (Done)
  1. Change walking speed (Done)
  1. Dark mode (In the future)
