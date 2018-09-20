function handleDomLoaded(){
    function handleKeyUp(evt){
        if(evt.keyCode === 13){
            searchRepo(this.value);
        }
    }

    function handleButtonCLick(evt){
        const enteredText = document.querySelector("#search-box").value;
        searchRepo(enteredText);
    }

    async function searchRepo(repoName) {
        const response = await fetch(`https://api.github.com/search/repositories?q=${repoName}`);
        const repos = await response.json();

        const containerElem = document.querySelector("#search-result");
        containerElem.innerHTML = "";
        repos.items.filter(({name}) => name.includes(repoName)).map(({name}) => {
            const liElem = document.createElement("LI");
            const textElem = document.createTextNode(name);
            
            liElem.appendChild(textElem);
            containerElem.appendChild(liElem);
        })
      }

    document.querySelector("#search-box").addEventListener('keyup', handleKeyUp);
    document.querySelector("#search-button").addEventListener('click', handleButtonCLick);
    
};

document.addEventListener('DOMContentLoaded', handleDomLoaded, false);