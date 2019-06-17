import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burger-app-7bd4e.firebaseio.com/'
});

export default instance;

// axios is 3rd party JS library / package
// here we are using Google Firebase to store our data in db.
// for these we create a Google Firebase account and then create a RealDB in that
// it gives the one unique URL for every creation of db
// using that URL we are going post the data from React to DB.