/// <reference path="application.ts" />

// ==UserScript==
// @name        GrabArt
// @namespace   GrabArtSpace
// @version     1
// @description grab separated into pieces `googleart` pictures
// @match       http://www.googleartproject.com/collection/*
// ==/UserScript==

declare var console;

var application = new GrabArt.Application();
try { application.run(); } catch (exc) { console.log(exc); }