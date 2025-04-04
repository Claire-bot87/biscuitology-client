# General Assembly Project 4

### Table of Contents
* [Description](#description)
    - [Deployment Link](#deployment-link)
    - [Code Installation](#code-installation)
    - [Timeframe and Working Team](#timeframe-and-working-team)
    - [Technologies Used](#technologies-used)
    - [Brief](#brief)
* [Planning](#planning)
 
* [Build Process](#build-process)
  
* [Challenges](#challenges)
* [Wins](#wins)
* [Key Learnings](#key-learnings)
* [Bugs](#bugs)
* [Future Improvements](#future-improvements)

# Description
I did this project in the 12 and final week of the course. It was a full stack application. It had a Django backend and a React front end.  I chose to do a biscuit review site.

### Deployment Link 
https://biscuitology.netlify.app/

### Code Installation


#### For the frontend:
https://github.com/Claire-bot87/biscuitology-client

#### For the backend:
https://github.com/Claire-bot87/biscuitology-api

### Timeframe and Working Team
I had one week to complete this project and I worked independently.


### Technologies Used
Django Rest Framework
Python
React
GitHub
Netlify
Hiroku


### Brief
A full stack application 
A django Back end and a react fron tend
A user model and at least one other model. 
A relationship between the iser model and one other model.
Authentication. 
Full CRUD functionality
Styling.


## Planning
https://trello.com/b/ZW24K6LD/biscuitology
![Wireframe 1](https://res.cloudinary.com/dpv0j8frj/image/upload/v1743422242/Screenshot_2025-03-31_at_12.54.22_gwq4ob.png)

![Wireframe 2](https://res.cloudinary.com/dpv0j8frj/image/upload/v1743422242/Screenshot_2025-03-31_at_12.54.42_wnucnw.png)

## Build Process

First I built out the back end. I added: I added three applications in my project. They were 
-biscuits 
-pairings 
-users

Then I added into each of these applications: 
- Models (for the schemas)
- Views (handles the logic)
- Urls (routing)
  
Once I had completed these and tested them using Postman, I moved onto the front end. I created components , And placed them in my app.jsx file, which i imported into my Main.jsx file
I created a UserContext using React's prebuilt createContext. The conext had a UserProvider which I wrapped around the whole app in mian .jsx. This menat that all the components had access to the user data, and so I would not need to pass the data down as props repeatedly in each component that required the user data.
I also added BrowserRouter (a prebuilt component provided by react-router) which enavbeles client side routing throughout the app.

I enabled the user to add, delete and update a biscuit, ensuring my application had full CRUD functionality.

Here is one in-depth example of that CRUD functionality. I have cjhosen just to focus of a POST request, for brevity:

### Adding a biscuit: 

#### Created a form 
Used UseState to update the field as the user types into the form.

```.js
setFormData({...formData, [e.target.name]:e.target.value})
```

Then I passed that formData as props into a service function called biscuitCreate, which I had in a separate ‘services’ folder.

biscuitCreate sends an Axios POST request to the server to create a new biscuit.

```.js
 try {
        const res = await axios.post(`${BASE_URL}/`, formData,{
            headers: {
            Authorization: `Bearer ${getToken()}`,
        }})
```

The server deserializes this data, checks it is valid, and if it is , it

```.js
   def post(self, request):
        request.data['user'] = request.user.id
        biscuit_serializer = BiscuitsSerializer(data=request.data)# the data key is for data that will be added
        if biscuit_serializer.is_valid():
            biscuit_serializer.save()
    
```

It is then saved into the database. 
An ‘id’ property is added when the biscuit goes into the database, whereby the biscuit is assigned a unique id.

The server then returns a response which is the data key on the biscuit_serializer object
The response is an object (everything in python is an object).

```.js
        return Response(biscuit_serializer.data, 201)
        return Response(biscuit_serializer.errors, 422)
```

biscuitCreate returns the response data in the client. And the id key of that data is added to the url which we navigate to, to show the biscuit that has just been added.

```.js
const data = await biscuitCreate(formData)
console.log(data)
 navigate(`/biscuits/${data.id}`)
```




## Challenges


## Wins
Adding metrics and graphs was a win in this project.
Here i was setting state and state was an object, i wanted to update a particular property on the object.Until now, the value of that property was a number. I needed to use the values of two other properties from two other objects (both also numbers). I needed to join those two values together to make a string of numbers.

So i:
Accessed the properties using dot notation
Used the spread operator to copy the properties, avoiding mutations
Checked that the property from the form data array had pulled through correctly using(if the biscuit hadn’t been rate yet , just use ‘0’)
Then concatenated the two numbers with a comma.
And wrapped it in straight brackets to create an array.

``.js
    setSubmissionData({
            name: formData.name,
            description: formData.description,
            type: formData.type,
            image: formData.image,
            taste: [...(data.taste ? data.taste : 0), ...formData.taste]
            texture: [...(data.texture ? data.texture : 0), ...formData.texture], // concatenate the array
            dunkability: [...(data.dunkability ? data.dunkability : 0), ...formData.dunkability], // concatenate the array
``

So then I stored this in the database using a PUT request.
So every biscuit array has an array of numbers on the dunkalibility property, for example. 

So I used a PieChart to display the dunkability ratings. `so in my Piechart component , i needed to do a GET request to retrieve the data for each biscuit in the database, I then mapped through each object, accessed the dunkability key. I then map through each number in the array on the dunkability key and used the reduce() method  to reduce the array of numbers to one 1 number, by adding them together.
The value in stored in ‘sum’,which starts at zero,  then you loop through and add the next value to ‘sum’.


		

``.js
const formattedData = {
                    labels: data.map(item => item.name),
                    datasets: [{
                        label: 'Dunkability Sum',
data: data.map(item => item.dunkability.reduce((sum, val) => sum + val, 0)),
``

## Key Learnings


## Bugs


## Future Improvements
In gthe future I would like to add pairings. So should which drink would pair well with each biscuit.
