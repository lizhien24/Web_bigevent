$(function () {
    var layer = layui.layer
    var form = layui.form

    initArtCatelist()

    //获取文章分类的列表
    function initArtCatelist() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    //为添加类别按钮绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    //通过代理的方式为form-add 表单绑定 submit事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCatelist()
                layer.msg('新增分类成功！')
                layer.close(indexAdd)
            }
        })
    })
    //通过代理的方式为btn-edit 按钮绑定 submit事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit ', function () {
        //弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        var name = $(this).attr('data-name')
        var alias = $(this).attr('data-alias')

        form.val('form-edit', {
            Id: id,
            name: name,
            alias: alias
        })
    })
    //通过代理的方式为修改分类的表单绑定 submit事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCatelist()
            }
        })
    })
    //通过代理的方式为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete ', function () {
        var id = $(this).attr('data-id')
        //提示用户是否要删除
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除数据成功！')
                    layer.close(index)
                    initArtCatelist()
                }
            })
        })
    })

   
})