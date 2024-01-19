window.onload = function() {
    // Fetch the saved notes from the API
    const username = localStorage.getItem('username');
    console.log(username);
    const token = localStorage.getItem('token');
    if(username){
        var user = document.getElementById('username');
        user.innerHTML = username;
    }

    const server = 'https://20.40.102.186:443';
    const update_notes = () => {
        var savedNotesContainer = document.getElementById('savedNotes');
        savedNotesContainer.innerHTML = ''; // Clear the saved notes 
        fetch(server+'/getNotes')
        .then(response => response.json())
        .then(notes => {
            // Display the saved notes
            notes.forEach(note => {
                var noteElement = document.createElement('div');
                noteElement.className = 'note';
    
                var titleElement = document.createElement('h3');
                titleElement.textContent = note.title;
                noteElement.appendChild(titleElement);
    
                var contentElement = document.createElement('pre');
                contentElement.textContent = note.content;
                contentElement.style.display = 'none'; // Hide the content initially
                noteElement.appendChild(contentElement);
    
                noteElement.addEventListener('click', () => {
                    // Toggle the display of the content when the note is clicked
                    contentElement.style.display = contentElement.style.display === 'none' ? 'block' : 'none';
                });
    
                savedNotesContainer.appendChild(noteElement);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    update_notes();
    const get_notes = () => {
        var title = document.getElementById("title").value;
        var content = document.getElementById("content").value;
        fetch(server+'/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: title, content: content }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            // Clear the textareas
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    const button = document.getElementById("save");
    button.addEventListener("click", get_notes);
    button.addEventListener("click", update_notes);
  


    // Keep update the date and time of the page
    const update_date_time = () => {
        var date_time = document.getElementById('date_time');
        var date = new Date();
        date_time.innerHTML = date.toLocaleString();
    };
    setInterval(update_date_time, 1000);


    const testProtected = () => {
        const token = localStorage.getItem('token');
        const server = 'https://20.40.102.186:443';
        fetch(server+'/testProtected', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
        })
    }
    
    const B = document.getElementById("testProtected");
    B.addEventListener("click", testProtected);


};

// window.onload = function(){
//     // Fetch the fetch to days weather
//     const server = 'https://weatherapi2021.azurewebsites.net';
//     const update_weather = () => {
//         var weatherContainer = document.getElementById('weather');
//         weatherContainer.innerHTML = ''; // Clear the saved notes 
//         fetch(server+'/getWeather')
//         .then(response => response.json())
//         .then(weather => {
//             // Display the saved notes
//             weather.forEach(weather => {
//                 var weatherElement = document.createElement('div');
//                 weatherElement.className = 'weather';
    
//                 var titleElement = document.createElement('h3');
//                 titleElement.textContent = weather.title;
//                 weatherElement.appendChild(titleElement);
    
//                 var contentElement = document.createElement('pre');
//                 contentElement.textContent = weather.content;
//                 contentElement.style.display = 'none'; // Hide the content initially
//                 weatherElement.appendChild(contentElement);
    
//                 weatherElement.addEventListener('click', () => {
//                     // Toggle the display of the content when the note is clicked
//                     contentElement.style.display = contentElement.style.display === 'none' ? 'block' : 'none';
//                 });
    
//                 weatherContainer.appendChild(weatherElement);
//             });
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
//     };

// }