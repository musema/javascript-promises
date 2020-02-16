// a utilty function to display some data in the ui, nothing related with promises
const displayReposInsideHtmlBody = (repos) => {
    const ul = document.getElementById("list"); // where we want to display the repos
    const reposToDisplay = repos.slice(0,5); // need only 5 repos
    reposToDisplay.forEach(repo => {
        const li = document.createElement("LI");
        const textnode = document.createTextNode(`name=${repo.full_name}, url=${repo.url}`);
        li.appendChild(textnode);
        ul.appendChild(li);
    });
}
// define a promise
const getGitReposPromise = new Promise((resolve, reject) => {
    let request = new XMLHttpRequest;
    request.open('GET', 'https://api.github.com/repositories', true);
    request.onload = function() {
        if(request.status === 200){
            const repos = JSON.parse(this.responseText);
            resolve(repos)
        } else {
            reject(request.statusText)
        }
    }
    request.send();
});

// run a promise
getGitReposPromise.then((repos) => { displayReposInsideHtmlBody(repos); })
                  .catch((error) => { console.log(`error getting repositories, status: ${error}`); })
