const submit = document.querySelector('#submit')
const value = document.querySelector('#textbox')
const urlvalue = document.querySelector('#urlvalue')

submit.addEventListener('click',async()=>{
    let data = await fetch('/',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: `${value.value}`})
    })
    data = await data.json()
    urlvalue.innerText = data.url
})