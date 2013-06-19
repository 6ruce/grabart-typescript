/// <reference path="GApp/Application.ts" />

// ==UserScript==
// @name        GrabArt
// @namespace   GrabArtSpace
// @version     2
// @description grab separated into pieces `googleart` pictures
// @match       http://www.google.com/*/asset-viewer/*
// ==/UserScript==

declare var $;
$(document).ready(function() {
    new GrabArt.GApp.Application($('body')).run();
});