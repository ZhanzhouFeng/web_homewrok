from __future__ import unicode_literals
from django.shortcuts import render
from web_big_hm.testdb import find_func
import json

def hello(request):
    # context = {}
    # context['hello'] = 'Hello World!'
    # return render(request, 'hello.html', context)
    raw=find_func()
    cubes=[]
    for i in raw:
        cube=[]
        cube.append(i['x'])
        cube.append(i['y'])
        cube.append(i['z'])
        cubes.append(cube)
    # print(cubes)
    return render(request, 'add_grass.html',{
            'Cubes': json.dumps(cubes),
        })