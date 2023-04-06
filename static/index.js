const submit = document.querySelector('#submit')
const value = document.querySelector('#textbox')

submit.addEventListener('click',async()=>{
    let data = await fetch('/',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: `${value.value}`})
    })
    data = await data.json()
    if(data.status === "ok")
    value.value = `https://s-url.onrender.com/s/${data.url}`
    else
    value.value = `${data.message}`
})