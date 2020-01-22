from django.conf.urls import url
 
from . import view,testdb
from django.urls import include, re_path

urlpatterns = [
    re_path(r'^$', view.hello),
    url(r'^testdb$', testdb.insert),
    url(r'^find$', testdb.find),
]