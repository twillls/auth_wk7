// this is a partially revealing module pattern - just a variation on what we've already done

const myVM = (() => {
    // get the user buttons and fire off an async DB query with Fetch

    let userButtons = document.querySelectorAll('.u-link'),
        lightbox = document.querySelector('.lightbox');

    function parseUserData(user) { // user is db result from getUserData fetch
        let targetDiv = document.querySelector('.lb-content'),
            targetImg = lightbox.querySelector('img');

        let bioContent = `
            <p>${user.bio}</p>
            <h4>Social Media:/</h4>
        `;

        console.log(bioContent);

        targetDiv.innerHTML = bioContent;
        targetImg.src = user.imgsrc;

        lightbox.classList.add('show-lb');
    }

    function getUserData(event) {
        event.preventDefault();
        // debugger;

        // find the img closest to the anchor tag and get its src
        let imgSrc = this.previousElementSibling.getAttribute('src');

        let url = `/users/${this.getAttribute('href')}`; // /1

        fetch(url) // go get the data
            .then(res => res.json()) // turn it into a file js can use, parse json res into plain obj
            .then(data => {
                console.log("My database result is: ", data)

                data[0].imgsrc = imgSrc;

                parseUserData(data[0]);
            })
            .catch((err) => {
                console.log(err)
            });
    }
        
    userButtons.forEach(button => button.addEventListener('click', getUserData))

    lightbox.querySelector('.close').addEventListener('click', function() {
        lightbox.classList.remove('show-lb');
    })
})();