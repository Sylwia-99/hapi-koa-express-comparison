
$("#add_user").submit(function(event){ 
    alert("Data Inserted Successfully!");
    window.location.href = "http://localhost:3000/user"
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    var request = {
        "url" : `http://localhost:3000/api/users/${data.idnew_table}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

// if(window.location.pathname == "/"){
//     $ondelete = $(".table tbody td a.delete");
//     $ondelete.click(function(){
//         var id = $(this).attr("data-id")

//         var request = {
//             "url" : `http://localhost:3000/api/users/${id}`,
//             "method" : "DELETE"
//         }

//         if(confirm("Do you really want to delete this record?")){
//             $.ajax(request).done(function(response){
//                 alert("Data Deleted Successfully!");
//                 location.reload();
//             })
//         }

//     })
// }



$("#add_ticket").submit(function(event){ 
    alert("Data Inserted Successfully!");
    window.location.href = "http://localhost:3000"
})

$("#update_ticket").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    var request = {
        "url" : `http://localhost:3000/api/tickets/${data.ticket_id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!"); 
        window.location.href = "http://localhost:3000"
    })

})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/tickets/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}