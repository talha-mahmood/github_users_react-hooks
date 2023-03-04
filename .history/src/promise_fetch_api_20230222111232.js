import fetch from "node-fetch";
async function fetchData(){
    try{
        const response=await fetch('https://api.github.com/users')
        const data=await response.json()
        console.log(data)
        return data;

    }
    catch(error){
        console.error(error)
    }
}
fetchData()