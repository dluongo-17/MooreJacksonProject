{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // create map with simple CRS (no lat/long)\
var map = L.map('map', \{\
  crs: L.CRS.Simple,\
  minZoom: -2\
\});\
\
// image dimensions (IMPORTANT)\
var width = 3000;\
var height = 2000;\
\
// define bounds (top-left, bottom-right)\
var bounds = [[0, 0], [height, width]];\
\
// add image\
L.imageOverlay('img/map.png', bounds).addTo(map);\
\
// fit map to image\
map.fitBounds(bounds);}
