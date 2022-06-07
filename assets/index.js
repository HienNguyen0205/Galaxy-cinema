$(function(){

    function date (){
        const dates = []
        const date = new Date()
        const nextDate = new Date(date)
        for(let i = 0; i < 10 ; i++){
            nextDate.setDate(date.getDate() + i)
            dates.push(nextDate.toString().slice(4,10))
        }
        return dates
    }

    let day
    let type = '2D-VI'
    let time
    let selected = []
    let purchased = []

    $('.card').click(function(){
        const modal = new bootstrap.Modal('#ticket-modal')
        const name = $(this).attr('name')
        $('.title').text(name)
        const dates = date()
        $('#date').html('')
        dates.forEach((date,index) => {
            if(index == 0){
                day = date
                $('#date').append(
                    `<button class="btn btn-outline-success date-actived date-btn w-auto" value="${date}">${date}</button>`
                )
            }else{
                $('#date').append(
                    `<button class="btn date-btn w-auto" value="${date}">${date}</button>`
                )
            }
        })
        $('.date-btn').click(function() {
            $('.date-actived').removeClass('btn-outline-success date-actived')
            $(this).addClass('btn-outline-success date-actived')
            day = $(this).attr('value')
        })
        updateSeat()
        modal.show()
    })

    function updateSeat(){
        $('#seat-select').html('')
        const aphabeth = ['A','B','C','D','E','F','G','H','J','K','L']
        for(let i = 0; i< 11; i++){
            $('#seat-select').append('<div class="d-flex justify-content-center my-2"></div>')
            for(let j = 0; j < 9; j++){
                if(purchased.includes(aphabeth[i]+j)){
                    $('#seat-select .d-flex:last-child').append(
                        `<div class="seat seat-purchased mx-2" value="${aphabeth[i]+j}">${aphabeth[i]+j}</div>`
                    )
                }
                else if(selected.includes(aphabeth[i]+j)){
                    $('#seat-select .d-flex:last-child').append(
                        `<div class="seat seat-selected mx-2" value="${aphabeth[i]+j}">${aphabeth[i]+j}</div>`
                    )
                }else{
                    $('#seat-select .d-flex:last-child').append(
                        `<div class="seat mx-2" value="${aphabeth[i]+j}">${aphabeth[i]+j}</div>`
                    )
                }
            }
        }
        $('.seat').click(function() {
            const value = $(this).attr('value')
            if(purchased.includes(value)){
                return false
            }else if(selected.includes(value)){
                selected.splice(selected.indexOf(value),1)
            }else{
                selected.push(value)
            }
            updateSeat()
        })
    }

    $('.type').click(function() {
        $('.type-actived').removeClass('btn-outline-success type-actived')
        $(this).addClass('btn-outline-success type-actived')
        type = $(this).attr('value')
    })

    $('.time').click(function() {
        $('.time-actived').removeClass('btn-outline-success time-actived')
        $(this).addClass('btn-outline-success time-actived')
        time = $(this).attr('value')
    })
})