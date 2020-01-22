# models.py
from django.db import models


class Test(models.Model):
    name = models.CharField(max_length=20)


class cube(models.Model):
    # 学号 primary_key=True: 该字段为主键
    id = models.IntegerField('id', primary_key=True)
    x = models.IntegerField('id',null=False)
    y = models.IntegerField('id', null=False)
    z = models.IntegerField('id', null=False)

    # 指定表名 不指定默认APP名字——类名(app_demo_Student)
    class Meta:
        db_table = 'cube'