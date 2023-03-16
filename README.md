# iLost App

## Introduction

This app was inspired when I found a key on the street and I was wondering how can I find out who has lost it and return it to them. Not having found any option I decided to create one.

### Description

In this app the users can post their lost belongings or items they have found and browse between the published items.
They can provide essential information as type color, date, and location with a certain radius of the place where it was found or lost, they can even add title, description upload photo of it. Everyone can browse and filter through the posted items based on their location, type and color. 
However only autenticated users can publish new items, delete them, and see the contact details of the publishers.

### Instructions to test the application
Currently there are around 400 dummy items uploaded to the database with the locations of 
* Lima, Peru
* Buenos Aires, Argentina
* Budapest, Hungary
The item data such as image text and user data are randomly generated.

##### You can also register your own user and publish items yourself or use a test account:
User: test@test.hu <br>
Pwd: testtest


### Technologies used
The application is built with ReactJS.
In this application I have used the GoogleMaps API with [React Google Maps](https://tomchentw.github.io/react-google-maps/) library to embed a Map which shows users location on the map, enables them to pinpoint a location , and also to display the matched items. With [GoogleMaps Places Autocomplete](https://developers.google.com/maps/documentation/javascript/place-autocomplete) they can also look for a specific location they would like to pinpoint.

The user's current location in coordinates retrieved using the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) which afterwards fetches the place data from [Google Maps Places API](https://developers.google.com/maps/documentation/places/web-service/details) .

[Firebase](https://firebase.google.com/) is serving as a backend for the application, as for authentication, storing user and item data, and also fetching and posting it to the NoSQL database.

I have used [React Router](https://reactrouter.com/en/main) for routing and the React Context API to hold and provide the userdata and authentication data for the application.

### Screenshots

![Screenshot](https://firebasestorage.googleapis.com/v0/b/frontendportfolio-b0a92.appspot.com/o/ilost%20(2).jpeg?alt=media&token=0ec9be18-15c8-43cd-a5fb-5c3e2fcbb2e3)

![Screenshot](https://firebasestorage.googleapis.com/v0/b/frontendportfolio-b0a92.appspot.com/o/ilost%20(1).jpeg?alt=media&token=d66e762a-8d40-4652-9e87-072b86bd19a4)

##### Item Page
![Screenshot](https://firebasestorage.googleapis.com/v0/b/frontendportfolio-b0a92.appspot.com/o/ilost%20(2).jpeg?alt=media&token=0ec9be18-15c8-43cd-a5fb-5c3e2fcbb2e3)

##### Add item
![Screenshot](https://firebasestorage.googleapis.com/v0/b/frontendportfolio-b0a92.appspot.com/o/ilost%20(4).jpeg?alt=media&token=4fb7228e-97de-4b54-ac7d-7dcb0d527802)

##### Filter by type color and location
![Screenshot](https://firebasestorage.googleapis.com/v0/b/frontendportfolio-b0a92.appspot.com/o/ilost%20(5).jpeg?alt=media&token=573f6083-8467-452b-97c5-c3d465fd25aa)

