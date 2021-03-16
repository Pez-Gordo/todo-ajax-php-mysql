$(document).ready(function() {

  let edit = false

  console.log('jQuery is working')

  $('#task-result').hide()
  fetchTasks()

  $('#search').keyup(function(e) {
    if($('#search').val()) {
      let search = $('#search').val()
      $.ajax({
        url: './php/task-search.php',
        type: 'POST',
        data: { search },
        success: function(response) {
          let tasks = JSON.parse(response)
          let template = ''
          tasks.forEach(task => {
            template += `<li>
              ${task.name}
            </li>`
          })
          $('#container').html(template)
          $('#task-result').show()
        }
      })
    }
  })
  $('#task-form').submit(function (e) {
    const postData = {
      name: $('#name').val(),
      description: $('#description').val(),
      id: $('#taskId').val()
    }

    let url = edit === false ? './php/task-add.php' : './php/task-edit.php'

    $.post(url , postData, function(response) {
      fetchTasks()
      $('#task-form').trigger('reset')
    })
    e.preventDefault()
  })


  function fetchTasks() {
    $.ajax({
      url: './php/task-list.php',
      type: 'GET',
      success: function(response) {
        let tasks = JSON.parse(response)
        let template = ''
        tasks.forEach(task => {
          template += `
            <tr taskId="${task.id}">
              <td>${task.id}</td>
              <td><a href="#" class="task-item">${task.name}</a></td>
              <td>${task.description}</td>
              <td>
                  <button class="task-delete btn btn-danger">Delete</button>
              </td>
            </tr>
          `
        })
        $('#tasks').html(template)
        edit = false
      }
    })
  }

  $(document).on('click', '.task-delete', function () {
    if(confirm('Are you sure you want to delete?')) {
      let element = $(this)[0].parentElement.parentElement
      let id = $(element).attr('taskId')
      $.post('./php/task-delete.php', {id}, function (response) {
        fetchTasks()
      })
    }
  })

  $(document).on('click', '.task-item', function() {
    let element = $(this)[0].parentElement.parentElement
    let id = $(element).attr('taskId')
    $.post('./php/task-single.php', {id}, function(response) {
      const task = JSON.parse(response)
      $('#name').val(task.name)
      $('#description').val(task.description)
      $('#taskId').val(task.id)
      edit = true
    })
  })

})
