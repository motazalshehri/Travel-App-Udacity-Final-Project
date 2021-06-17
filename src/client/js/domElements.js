const uiDataEls = document.querySelectorAll('.ui-data')
const btnSubEl = document.querySelector('.submit')
const btnRemoveEl = document.querySelector('.remove')
const errorEl = document.querySelector('.error')


export const btnRemoveElement = btnRemoveEl.addEventListener('click', () => {
    document.querySelector('.city-entered').value = ''
    document.querySelector('.date').value = ''

    uiDataEls.forEach(uiDataEl => {
        uiDataEl.classList.add('hide')
    })
    errorEl.classList.add('hide')
    localStorage.clear()
})


export const btnSubmitElement = btnSubEl.addEventListener('click', async () => {
    const city = document.querySelector('.city-entered').value
    const date = document.querySelector('.date').value

    if(city == '' || date == '') {
        errorEl.innerHTML = '<i class="fas fa-exclamation-triangle"></i>City or Date incorrect, please re-enter input'
        errorEl.classList.remove('hide')
        return
    }
    const serverRespsponse = await Client.makePost('/getCityInfo', {city, date})
    Client.updateUI(serverRespsponse)
})
