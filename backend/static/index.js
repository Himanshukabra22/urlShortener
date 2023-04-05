const submit = document.querySelector('#submit')
const value = document.querySelector('#textbox')

submit.addEventListener('click',async()=>{
    let data = await fetch('/',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { url: `${value.value}`}
    })
})