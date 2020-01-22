from django.http import HttpResponse
import random
import math
import sys
sys.path.append("..")
from WebModel.models import cube


# # 数据库操作
# def testdb(request):
#     test1 = Test(name='runoob')
#     test1.save()
#     return HttpResponse("<p>数据添加成功！</p>")


"""
插入测试数据
"""
def insert(request):
    # 随机整数
    for i in range(0, 500):
        x = int(random.uniform(0, 1) * 20-10)*20
        y=int(random.uniform(0, 1) * 20)*20+10
        z=int(random.uniform(0,1)*20-10)*20
        # 从models文件中获取student对象
        cube_ins = cube()
        # 给对象赋值
        cube_ins.x = x
        cube_ins.y=y
        cube_ins.z=z
        # 插入数据
        cube_ins.save()

    return HttpResponse('数据插入完毕')

"""
查询
"""
def find(request):
    #sql = 'select * from student'
    # django 也可以执行原生的sql语句
    #result = Student.objects.raw(sql)

    # 查询name = tom1的数据
    result = cube.objects.filter()
    """
    result为<class 'django.db.models.query.QuerySet'>的对象
    需要进行数据处理
    """
    maxn=0
    arr = []
    for i in result:
        content = {'x': i.x, 'y': i.y, 'z': i.z}
        if(i.y==390.0):
            print(str(i.x)+" "+str(i.y)+" "+str(i.z))
        arr.append(content)
    print(arr.__len__())


    return HttpResponse(arr)

def find_func():
    #sql = 'select * from student'
    # django 也可以执行原生的sql语句
    #result = Student.objects.raw(sql)

    # 查询name = tom1的数据
    result = cube.objects.filter()
    """
    result为<class 'django.db.models.query.QuerySet'>的对象
    需要进行数据处理
    """
    arr = []
    for i in result:
        content = {'x': i.x, 'y': i.y, 'z': i.z}
        arr.append(content)
    print(arr.__len__())

    return arr