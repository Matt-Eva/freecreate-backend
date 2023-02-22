console.log("running")

const login = document.getElementById('login')
const logout = document.getElementById('logout')

const getMe = async () =>{
    const res = await fetch("http://localhost:4000/me")
    const data = await res.json()
    console.log()
    if (data.message){
        login.disabled=true
        logout.disabled=false
    } else{
        login.disabled=false
        logout.disabled=true
    }
}

getMe()

login.addEventListener('click', async () =>{
    try{
        const res = await fetch('http://localhost:4000/login', {withCredentials: true})
        // const data = await res.json()
        console.log('logged in')
        console.log(res)
        login.disabled = true
        logout.disabled = false
    }catch(error){
        console.error(error)
    }
})

logout.addEventListener('click', async ()=>{
   try{
    const res = await fetch('http://localhost:4000/logout', {withCredentials: true})
    const data = await res.json()
    console.log(data)
    logout.disabled=true
    login.disabled = false
   } catch(error){
    console.error(error)
   }
})