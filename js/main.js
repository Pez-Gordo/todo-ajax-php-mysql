$(function() {

  console.log('jQuery is working')

  $('#search').keyup(function() {
    let search = $('#search').val()
    $.ajax({
      url: './php/task-search.php',
      type: 'POST',
      data: { search: search },
      //data: { search }, // esta linea hace lo mismo que la anterior
      success: function() {
        console.log('response')
      }
    })
  })

})
