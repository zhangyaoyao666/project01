//获取评论列表函数
function getCommentList(){
    $.ajax({
        method:'GET',
        url:'http://www.liulongbin.top:3006/api/cmtlist',

        success:function(res){
            // console.log(res);
            if(res.status !== 200) return alert('获取数据失败')
            var rows = []
            $.each(res.data, function(i,item){
                var str = '<li class="list-group-item"><span class="badge" style="background-color:#F0AD4E;">'+ item.time +'</span><span class="badge" style="background-color:#5BC0DE;">'+ item.username +'</span>'+ item.content +'</li>'
                rows.push(str)
            })
            $('#cmt-list').empty().append(rows.join(''))
        }
    })
}
//调用函数
getCommentList()


//发表评论
$(function(){
    $('#formAddCmt').submit(function(e){
        e.preventDefault();
        var data = $(this).serialize();
        // console.log(data);
        $.post('http://www.liulongbin.top:3006/api/addcmt',data,
        function(res){
           if(res.status !== 201) {
               return alert('发表评论失败');
           }
           getCommentList();
           //重置表单，[0]jquery转原生
           $('#formAddCmt')[0].reset();
        })
        
    })
})