window.onload = function() {
    // Fetch the saved notes from the API
    
    const update_notes = () => {
        var savedNotesContainer = document.getElementById('savedNotes');
        savedNotesContainer.innerHTML = ''; // Clear the saved notes 
        fetch('/getNotes')
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
        fetch('/save', {
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
};