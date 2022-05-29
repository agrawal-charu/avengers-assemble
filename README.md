# Avengers Assemble - a face recognition based game
## Table of contents
* [Introduction](#introduction)
* [Technologies](#technologies)
* [Features](#features)
* [Functioning](#functioning)
## Introduction
This is a game inspired by the Avengers: Endgame movie. It uses face recognition and is controlled by the user's head movements. The game is in the form of a falling blocks puzzle and the aim is to obtain all six infinity stones. 
## Technologies
Project is created with:
* HTML, CSS, JavaScript 
* TensorFlow (BlazeFace Model)
## Features 
* 6 levels to find the 6 infinity stones 
* Filters (glasses) applied to user's face
## Functioning
1. The model is first loaded and then the game starts.
2. When the game ends i.e. either the user loses or wins, the model stops collecting data and the web cam pauses. 
3. The position of the block is based on the angle the head is tilted in. It is calculated by using the two eye landmarks.
4. The angle of the filter changes with the angle of the head tilt. 
